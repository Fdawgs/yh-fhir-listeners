/*
MedicationStatement Resource

oi.OEORI_Unit_DR->CTUOM_Desc dosage units:
     DO = Dose(s)
     M = Minute(s)
     H = Hour(s)
     D = Day(s)
     W = Week(s)

Status value	|    TrakCare value to map 
============================================================================
Active  	          Current date between start date and end date
Completed	          Current date after end date and status not discontinued
Entered in error 	Discontinued with reason entered in error
Intended	          Current date before start date
Stopped	          Discontinued without entered in error
On-hold	          N/A


*/

SELECT DISTINCT medstatId,
     medstatDateassertedDate,
     medstatDateassertedTime,
     medstatEffectiveStart_Datepart,
     medstatEffectiveStart_Timepart,
     medstatEffectiveEnd_Datepart,
     medstatEffectiveEnd_Timepart,
     medstatSubjectReference,
     medstatDosageTimingRepeatDuration,
     medstatDosageTimingRepeatDurationUnit,
     medstatDosagePatientinstruction,
     medstatDosageRouteText,
     medstatDosageDoseQuantityValue,
     medstatDosageDoseQuantityUnit,
     medstatStatusCode,
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
                         CASE
                         WHEN CURRENT_TIMESTAMP BETWEEN oi.OEORI_SttDat
                              AND oi.OEORI_EndDate
                              AND oi.OEORI_ItemStat_DR->OSTAT_Desc != ''Discontinued'' THEN ''active''
                         WHEN CURRENT_TIMESTAMP < oi.OEORI_SttDat
                              AND oi.OEORI_ItemStat_DR->OSTAT_Desc != ''Discontinued'' THEN ''intended''
                         WHEN CURRENT_TIMESTAMP > oi.OEORI_EndDate
                              AND oi.OEORI_ItemStat_DR->OSTAT_Desc != ''Discontinued'' THEN ''completed''
                         WHEN oi.OEORI_ItemStat_DR->OSTAT_Desc = ''Discontinued''
                              AND oi.OEORI_VarianceReason_DR->VR_Code IN (''DATA'', ''ERROR'') THEN ''entered-in-error''
                         WHEN oi.OEORI_ItemStat_DR->OSTAT_Desc = ''Discontinued'' THEN ''stopped''
                         END AS medstatStatusCode,
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
WHERE medstatStatusCode IS NOT NULL;