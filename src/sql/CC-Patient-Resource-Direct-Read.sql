/*
Patient Resource
*/

SELECT DISTINCT nhsNumber,
	nhsNumberTraceStatusDesc,
	nhsNumberTraceStatusCode,
	patientNo,
	active,
	ethnicCategoryDesc,
	ethnicCategoryCode,
	homePhone,
	businessPhone,
	mobilePhone,
	appointmentSMS,
	email,
	preferredContactMethod,
	preferredLanguage,
	interpreterRequired,
	nameFamily,
	nameGiven1First,
	nameGiven2Middle,
	namePrefix,
	maritalStatusDesc,
	maritalStatusCode,
	addressLine1,
	addressLine2,
	city,
	district,
	postalCode,
	LOWER(gender) AS gender,
	birthdate,
	deceased,
	gpDesc,
	gpAddressLine1,
	gpAddressLine2,
	gpCity,
	gpPostalCode,
	gpIdentifier,
	contactName,
	contactPhone,
	contactText,
	dnd.DND,
	CONCAT(COALESCE(lastUpdateDate, ''), 'T', COALESCE(lastUpdateTime, '')) AS lastUpdated
FROM OPENQUERY(
		[ENYH-PRD-ANALYTICS], 'SELECT DISTINCT
									patmas.PAPMI_PAPER_DR->PAPER_ID AS nhsNumber,
									patmas.PAPMI_TraceStatus_DR->TRACE_Desc AS nhsNumberTraceStatusDesc,
									patmas.PAPMI_TraceStatus_DR AS nhsNumberTraceStatusCode, -- TODO: Add leading zeros in transformer in Mirth
									patmas.PAPMI_No AS patientNo, -- MRN apparently
									patmas.PAPMI_Active,	
									CASE
									WHEN patmas.PAPMI_Active IS NULL THEN ''true''
									WHEN patmas.PAPMI_Active = ''Y'' THEN ''true''
									ELSE NULL
									END AS active,

									--mergepers.PAPER_ID AS mergeNhsNumber,
									--mergepatmas.PAPMI_TraceStatus_DR->TRACE_Desc AS mergeNhsNumberTraceStatusDesc,
									--mergepatmas.PAPMI_TraceStatus_DR mergeNhsNumberTraceStatusCode,

									-- ethnicCategory -- done
									patmas.PAPMI_PAPER_DR->PAPER_IndigStat_DR->INDST_Desc AS ethnicCategoryDesc,
									patmas.PAPMI_PAPER_DR->PAPER_IndigStat_DR->INDST_Code AS ethnicCategoryCode,

									-- nhsCommunication/Telecoms
									patmas.PAPMI_PAPER_DR->PAPER_TelH AS "homePhone", -- TODO: Resolve mobile numbers in here?
									patmas.PAPMI_PAPER_DR->PAPER_TelO AS "businessPhone",
									patmas.PAPMI_PAPER_DR->PAPER_MobPhone AS "mobilePhone", -- TODO: Resolve non-mobile numbers in here?
									patmas.PAPMI_PAPER_DR->PAPER_AppointmentSMS AS "appointmentSMS",
									patmas.PAPMI_PAPER_DR->PAPER_Email AS "Email",
									patmas.PAPMI_PAPER_DR->PAPER_PreferredContactMethod AS "PreferredContactMethod",
									patmas.PAPMI_PAPER_DR->PAPER_PrefLanguage_DR->PREFL_Desc AS "PreferredLanguage",
									patmas.PAPMI_PAPER_DR->PAPER_InterpreterRequired AS "InterpreterRequired",

									patmas.PAPMI_PAPER_DR->PAPER_UpdateDate AS lastUpdateDate,
									patmas.PAPMI_PAPER_DR->PAPER_UpdateTime AS lastUpdateTime,
								
									-- name (official)
									patmas.PAPMI_PAPER_DR->PAPER_Name AS nameFamily,
									patmas.PAPMI_PAPER_DR->PAPER_Name2 AS nameGiven1First,
									patmas.PAPMI_PAPER_DR->PAPER_Name3 AS nameGiven2Middle,
									patmas.PAPMI_PAPER_DR->PAPER_Title_DR->TTL_Desc AS nameprefix,

									-- contact (NoK)
									patmas.PAPMI_PAPER_DR->PAPER_NokName AS contactName,
									patmas.PAPMI_PAPER_DR->PAPER_NokPhone AS contactPhone,
									patmas.PAPMI_PAPER_DR->PAPER_NokText AS contactText,

									-- marital status
									CASE patmas.PAPMI_PAPER_DR->PAPER_Marital_DR->CTMAR_RowId
									WHEN 1 THEN ''Married''
									WHEN 2 THEN ''unknown''
									WHEN 3 THEN ''Widowed''
									WHEN 4 THEN ''unmarried''
									WHEN 5 THEN ''Legally Seperated''
									WHEN 6 THEN ''Divorced''
									END AS maritalStatusDesc,

									CASE patmas.PAPMI_PAPER_DR->PAPER_Marital_DR->CTMAR_Code
									WHEN ''N'' THEN ''U''
									ELSE patmas.PAPMI_PAPER_DR->PAPER_Marital_DR->CTMAR_Code
									END AS maritalStatusCode,

									-- address (home)
									patmas.PAPMI_PAPER_DR->PAPER_StName AS "addressLine1",
									--patmas.PAPMI_PAPER_DR->PAPER_StNameLine1 AS "addressLine2",
									patmas.PAPMI_PAPER_DR->PAPER_ForeignAddress AS "addressLine2",
									patmas.PAPMI_PAPER_DR->PAPER_CityCode_DR->CTCIT_Desc AS "city",
									patmas.PAPMI_PAPER_DR->PAPER_CT_Province_DR->PROV_Desc AS "district",
									patmas.PAPMI_PAPER_DR->PAPER_Zip_DR->CTZIP_Code AS "postalCode",

									-- Misc extensions and data
									CASE patmas.PAPMI_PAPER_DR->PAPER_Sex_DR->CTSEX_RowId
									WHEN 1 THEN ''female''
									WHEN 2 THEN ''unknown''
									WHEN 3 THEN ''other''
									WHEN 4 THEN ''male''
									END AS gender,



									patmas.PAPMI_DOB AS birthDate,
									CASE
									WHEN patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''Y'' THEN ''true''
									WHEN patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''N'' THEN NULL
									END AS deceased,

									-- GP Practice
									patmas.PAPMI_PAPER_DR->PAPER_FamilyDoctor_DR->REFD_Desc AS "gpDesc",
									patmas.PAPMI_PAPER_DR->PAPER_FamilyDoctorClinic_DR->CLN_Address1 AS "gpAddressLine1",
									patmas.PAPMI_PAPER_DR->PAPER_FamilyDoctorClinic_DR->CLN_Address2 AS "gpAddressLine2",
									patmas.PAPMI_PAPER_DR->PAPER_FamilyDoctorClinic_DR->CLN_City_DR->CTCIT_Desc AS "gpCity",
									patmas.PAPMI_PAPER_DR->PAPER_FamilyDoctorClinic_DR->CLN_Zip_DR->CTZIP_Code AS "gpPostalCode",
									patmas.PAPMI_PAPER_DR->PAPER_FamilyDoctorClinic_DR->CLN_Code AS "gpIdentifier"

								FROM %ALLINDEX PA_PatMas patmas
								WHERE (patmas.PAPMI_No = ''5484125'')
								AND COALESCE(PAPMI_Active,''Y'') = ''Y''
								AND (patmas.PAPMI_PAPER_DR->PAPER_ID IS NOT NULL OR patmas.PAPMI_No IS NOT NULL)') AS patient
	LEFT JOIN OPENQUERY([ENYH-PRD-ANALYTICS],
                 'SELECT DISTINCT ALM_PAPMI_ParRef->PAPMI_PAPER_DR->PAPER_ID AS DND
                    FROM PA_AlertMsg
                    WHERE ALM_Alert_DR->ALERT_Desc IN (''Do not disclose patient address'')
                         AND (ALM_ClosedDate IS NULL
                              OR ALM_ClosedDate < CURRENT_TIMESTAMP)

                    ') AS dnd
	ON patient.nhsNumber = dnd.DND;