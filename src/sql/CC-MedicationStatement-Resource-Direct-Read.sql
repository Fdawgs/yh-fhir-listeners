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
Enterred in error 	Discontinued with reason entered in error
Intended	          Current date before start date
Stopped	          Discontinued without entered in error
On-hold	          N/A


*/

SELECT TOP 100
     *
FROM OPENQUERY([ENYH-PRD-ANALYTICS],
                 'SELECT TOP 100
                         -- MedicationStatement Resource Area
                         REPLACE(oi.OEORI_RowID, ''||'', ''-'') AS medstat_id,
                         oi.OEORI_Date AS medstat_dateAsserted_date,
                         oi.OEORI_TimeOrd AS medstat_dateAsserted_time,
                         oi.OEORI_SttDat AS medstat_effective_start_datepart,
                         oi.OEORI_SttTim AS medstat_effective_start_timepart,
                         oi.OEORI_EndDate AS medstat_effective_end_datepart,
                         oi.OEORI_EndTime AS medstat_effective_end_timepart,
                         oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No AS medstat_subjectReference,
                         oi.OEORI_OEOrdItem2_DR->ITM2_DurationValue AS medstat_dosage_timing_repeat_duration,
                         oi.OEORI_OEOrdItem2_DR->ITM2_DurationUnit AS medstat_dosage_timing_repeat_durationUnit,
                         oi.OEORI_Instr_DR->PHCIN_Desc1 AS medstat_dosage_patientInstruction,
                         oi.OEORI_AdminRoute_DR->ADMR_Desc AS medstat_dosage_route_text,
                         oi.OEORI_DoseQty AS medstat_dosage_dose_quantity_value,
                         oi.OEORI_Unit_DR->CTUOM_Desc AS medstat_dosage_dose_quantity_unit,

                        NULL AS RESOURCE_LINEBREAK,

                         -- Contained inline Medication Resource Area
                         oi.OEORI_ItmMast_DR->ARCIM_Abbrev AS medication_code_text,
                         REPLACE(oi.OEORI_ItmMast_DR->ARCIM_RowID, ''||'', ''-'') AS medication_id,
                         arcex.EXT_Desc AS medication_code_coding_display,
                         arcex.EXT_Code AS medication_code_coding_code,
                         oi.OEORI_ItemStat_DR->OSTAT_Desc AS OrderStatus
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
ORDER BY medstat_dateAsserted_date;