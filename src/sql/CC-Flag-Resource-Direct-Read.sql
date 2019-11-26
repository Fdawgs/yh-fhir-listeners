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
		[ENYH-PRD-ANALYTICS], 'SELECT DISTINCT TOP 100
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
SELECT *
FROM flag_CTE
WHERE flagStatusCode IS NOT NULL;