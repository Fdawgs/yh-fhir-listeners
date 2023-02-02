/*
Flag Resource
Joins to SQL table created by CC-Flag-Resource-Snomed-Lookup-Table.sql
*/

WITH
  flag_CTE
  AS
  (
    SELECT DISTINCT flagId,
      CASE ALM_Status
      WHEN 'I' THEN 'inactive'
      WHEN 'A' THEN 'active'
      END AS flagStatusCode,
      flagCategoryCodingDisplay,
      flagCategoryCodingCode,
      flagCodeCodingDisplay,
      flagCodeCodingCode,
      flagCodeText,
      flagSubjectReference,
      CONCAT(COALESCE(periodStartDate, ''),'T', COALESCE(periodStartTime, '')) AS periodStart,
      CONCAT(COALESCE(periodEndDate, ''),'T00:00:00') AS periodEnd
    FROM OPENQUERY(
		[ENYH-PRD-ANALYTICS], 'SELECT DISTINCT
            ALM_Status,
            COALESCE(ALM_OnsetDate, ALM_CreateDate) AS periodStartDate,
            COALESCE(ALM_OnsetTime, ALM_CreateTime) AS periodStartTime,
            COALESCE(ALM_ExpiryDate, ALM_ClosedDate) AS periodEndDate,
            ALM_ClosedTime AS periodEndTime,
            REPLACE(alert.ALM_RowID, ''||'', ''-'') AS flagId,
            alert.ALM_Alert_DR->ALERT_Desc AS flagCodeCodingDisplay,
            alert.ALM_Alert_DR->ALERT_Code AS flagCodeCodingCode,
            alert.ALM_Message AS flagCodeText,
            alert.ALM_AlertCategory_DR->ALERTCAT_Desc AS flagCategoryCodingDisplay,
            alert.ALM_AlertCategory_DR->ALERTCAT_Code AS flagCategoryCodingCode,
            alert.ALM_PAPMI_ParRef->PAPMI_No AS flagSubjectReference
        FROM PA_AlertMsg alert
       WHERE alert.ALM_Alert_DR IS NOT NULL
         AND (alert.ALM_PAPMI_ParRef->PAPMI_No = ''5484125'')
         ')
  )
SELECT flag_CTE.*,
  snom.SNOMED_Code AS flagCodeCodingSnomedCode,
  snom.SNOMED_Display AS flagCodeCodingSnomedDisplay,
  -- Every resource query must always have a lastUpdated column
  CASE
       WHEN periodEnd > periodStart
       THEN periodEnd
       ELSE periodStart
       END AS lastUpdated
FROM flag_CTE
  LEFT JOIN lookup.dbo.ydh_alert_list AS snom WITH (NOLOCK)
  ON flag_CTE.flagCodeCodingCode = snom.YDH_TrakCare_Code
WHERE flagStatusCode IS NOT NULL;