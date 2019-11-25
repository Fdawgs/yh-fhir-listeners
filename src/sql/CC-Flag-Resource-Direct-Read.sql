SELECT *
FROM OPENQUERY(
		[ENYH-PRD-ANALYTICS], 'SELECT DISTINCT TOP 100 *,
            COALESCE(ALM_OnsetDate, ALM_CreateDate) AS periodStartDate,
            COALESCE(ALM_OnsetTime, ALM_CreateTime) AS periodStartTime,
            COALESCE(ALM_ExpiryDate, ALM_ClosedDate) AS periodEndDate,
            -- IF 
            ALM_ClosedTime AS periodEndTime,        
            REPLACE(alert.ALM_RowID, ''||'', ''-'') AS flagId,
            alert.ALM_Alert_DR->ALERT_Desc AS testy,
            alert.ALM_AlertCategory_DR->ALERTCAT_Desc AS alert_type,
            alert.ALM_PAPMI_ParRef->PAPMI_No AS flagSubjectReference
        FROM PA_AlertMsg alert
       WHERE alert.ALM_Alert_DR IS NOT NULL
            AND ALM_ExpiryDate != ALM_ClosedDate
         ')

SELECT *
FROM OPENQUERY(
		[ENYH-PRD-ANALYTICS], 'SELECT DISTINCT ALERTCAT_Code,
        ALERTCAT_Desc
        FROM PAC_AlertCategory
       WHERE ALERTCAT_DateTo IS NULL
         ')
