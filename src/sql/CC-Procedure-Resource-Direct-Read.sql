/*
Procedure Resource
*/

SELECT id as procedureId,
  procedureStatus,
  procedureSubjectReference,
  CONCAT(COALESCE(procedureDate, ''),'T00:00:00') AS procedurePerformedDateTime,
  CONCAT(COALESCE(procedureDateRecordedDate, ''), 'T', COALESCE(procedureDateRecordedTime, '00:00:00')) AS procedureDateRecordedDateTime,
  ( SELECT 'https://fhir.nhs.uk/Id/opcs-4' AS [system],
    code,
    display
  FROM OPENQUERY([ENYH-PRD-ANALYTICS], 'SELECT 
                                               REPLACE(proc.PROC_RowID, ''||'', ''-'') AS id,
                                               proc.PROC_Operation_DR->OPER_Code AS code,
                                               proc.PROC_Operation_DR->OPER_Desc AS display
                                          FROM MR_Procedures proc
                                         WHERE SUBSTRING(proc.PROC_Operation_DR->OPER_Code, 1, 1) != ''Z''
                                           AND (proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No=''548125'')') codes
  WHERE procedures.id = codes.id
  FOR JSON PATH) AS procedureCode,
  ( SELECT 'https://fhir.nhs.uk/Id/opcs-4' AS [system],
    code,
    display
  FROM OPENQUERY([ENYH-PRD-ANALYTICS], 'SELECT 
                                               proc.PROC_ParRef AS operationId,
                                               proc.PROC_Operation_DR->OPER_Code AS code,
                                               proc.PROC_Operation_DR->OPER_Desc AS display
                                          FROM MR_Procedures proc
                                         WHERE SUBSTRING(proc.PROC_Operation_DR->OPER_Code, 1, 1) = ''Z''
                                           AND (proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No=''548125'')') codes
  WHERE procedures.operationId = codes.operationId
  FOR JSON PATH) AS procedureBodySiteCode,
  -- Every resource query must always have a lastUpdated column
  CONCAT(COALESCE(procedureDateRecordedDate, ''), 'T', COALESCE(procedureDateRecordedTime, '00:00:00')) AS lastUpdated
FROM OPENQUERY([ENYH-PRD-ANALYTICS], 'SELECT DISTINCT REPLACE(proc.PROC_RowID, ''||'', ''-'') AS id,
        proc.PROC_ParRef AS operationId,
        CASE
        WHEN PROC_ErrorReason_DR IS NOT NULL THEN ''entered-in-error''
        ELSE ''completed''
        END AS procedureStatus,
        proc.PROC_ProcDate AS procedureDate,
        proc.PROC_Date AS procedureDateRecordedDate,
        proc.PROC_Time AS procedureDateRecordedTime,
        proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No AS procedureSubjectReference
   FROM MR_Procedures proc
  WHERE SUBSTRING(proc.PROC_Operation_DR->OPER_Code, 1, 1) != ''Z''
    AND (proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No=''548125'')') procedures;
