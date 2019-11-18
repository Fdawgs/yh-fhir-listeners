/*
MedicationStatement Resource

oi.OEORI_Unit_DR->CTUOM_Desc dosage units:
     DO = Dose(s) - ignore
     M = Minute(s) - min
     H = Hour(s) - h
     D = Day(s) - d
     W = Week(s) - map to wk


Status value	|    TrakCare value to map 
============================================================================
Active  	          Current date between start date and end date
Completed	          Current date after end date and status not discontinued
Entered in error 	Discontinued with reason entered in error
Intended	          Current date before start date
Stopped	          Discontinued without entered in error
On-hold	          N/A
*/

WITH medicationStatement_CTE
  AS (
SELECT DISTINCT medstatId,
     CONCAT(COALESCE(medstatDateassertedDate, ''),'T', COALESCE(medstatDateassertedTime, '')) AS medstatDateasserted,
     CONCAT(COALESCE(medstatEffectiveStart_Datepart, ''),'T', COALESCE(medstatEffectiveStart_Timepart, '')) AS medstatEffectiveStart,
     CONCAT(COALESCE(medstatEffectiveEnd_Datepart, ''),'T', COALESCE(medstatEffectiveEnd_Timepart, '')) AS medstatEffectiveEnd,
     medstatSubjectReference,
     medstatDosageTimingRepeatDuration,
     CASE medstatDosageTimingRepeatDurationUnit
     WHEN 'DO' THEN NULL
     WHEN 'M' THEN 'min'
     WHEN 'H' THEN 'h'
     WHEN 'D' THEN 'd'
     WHEN 'W' THEN 'wk'
     END AS medstatDosageTimingRepeatDurationUnit,
     medstatDosagePatientinstruction,
     medstatDosageRouteText,
     medstatDosageDoseQuantityValue,
     medstatDosageDoseQuantityUnit,
     CASE
     WHEN (CURRENT_TIMESTAMP BETWEEN CAST(medstatEffectiveStart_Datepart AS DATETIME) + CAST(medstatEffectiveStart_Timepart AS DATETIME)
               AND CAST(medstatEffectiveEnd_Datepart AS DATETIME) + CAST(medstatEffectiveEnd_Timepart AS DATETIME))
          AND orderItemStatus != 'Discontinued' THEN 'active'
     WHEN CURRENT_TIMESTAMP < CAST(medstatEffectiveStart_Datepart AS DATETIME) + CAST(medstatEffectiveStart_Timepart AS DATETIME)
          AND orderItemStatus != 'Discontinued' THEN 'intended'
     WHEN CURRENT_TIMESTAMP > CAST(medstatEffectiveEnd_Datepart AS DATETIME) + CAST(medstatEffectiveEnd_Timepart AS DATETIME)
          AND orderItemStatus != 'Discontinued' THEN 'completed'
     WHEN orderItemStatus = 'Discontinued'
          AND orderItemVariance IN ('DATA', 'ERROR') THEN 'entered-in-error'
     WHEN orderItemStatus = 'Discontinued' THEN 'stopped'
     END AS medstatStatusCode,
     medicationId,
     medicationCodeText,
     medicationCodeCodingDisplay,
     medicationCodeCodingCode

FROM OPENQUERY([ENYH-PRD-ANALYTICS],
                 'SELECT DISTINCT
                         -- MedicationStatement Resource Area
                         REPLACE(oi.OEORI_RowID, ''||'', ''-'') AS medstatId,
                         oi.OEORI_Date AS medstatDateassertedDate,
                         oi.OEORI_TimeOrd AS medstatDateassertedTime,
                         oi.OEORI_SttDat AS medstatEffectiveStart_Datepart,
                         oi.OEORI_SttTim AS medstatEffectiveStart_Timepart,
                         oi.OEORI_EndDate AS medstatEffectiveEnd_Datepart,
                         oi.OEORI_EndTime AS medstatEffectiveEnd_Timepart,
                         oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No AS medstatSubjectReference,
                         oi.OEORI_OEOrdItem2_DR->ITM2_DurationValue AS medstatDosageTimingRepeatDuration,
                         oi.OEORI_OEOrdItem2_DR->ITM2_DurationUnit AS medstatDosageTimingRepeatDurationUnit,
                         oi.OEORI_Instr_DR->PHCIN_Desc1 AS medstatDosagePatientinstruction,
                         oi.OEORI_AdminRoute_DR->ADMR_Desc AS medstatDosageRouteText,
                         oi.OEORI_DoseQty AS medstatDosageDoseQuantityValue,
                         oi.OEORI_Unit_DR->CTUOM_Desc AS medstatDosageDoseQuantityUnit,
                         oi.OEORI_ItemStat_DR->OSTAT_Desc AS orderItemStatus,
                         oi.OEORI_VarianceReason_DR->VR_Code AS orderItemVariance,
                        NULL AS RESOURCE_LINEBREAK,

                         -- Contained inline Medication Resource Area
                         oi.OEORI_ItmMast_DR->ARCIM_Abbrev AS medicationCodeText,
                         REPLACE(oi.OEORI_ItmMast_DR->ARCIM_RowID, ''||'', ''-'') AS medicationId,
                         arcex.EXT_Desc AS medicationCodeCodingDisplay,
                         arcex.EXT_Code AS medicationCodeCodingCode

                    FROM OE_OrdItem oi
                         LEFT JOIN ARC_ItmMast arc
                         ON oi.OEORI_ItmMast_DR = arc.ARCIM_RowId
                         LEFT JOIN ARC_ItemExternalCodes arcex
                         ON arc.ARCIM_RowId = arcex.EXT_ParRef
                         AND EXT_HL7SendingFacility = ''FDB''
                         AND EXT_HL7SendingApp IN (''AMPP'', ''VMPP'')
                   WHERE oi.OEORI_Categ_DR->ORCAT_Desc IN (''PHARMACY'', ''PHARM'')
                     AND oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No =''5484125''
                     ')
  )
SELECT *
  FROM medicationStatement_CTE
 WHERE medstatStatusCode IS NOT NULL;