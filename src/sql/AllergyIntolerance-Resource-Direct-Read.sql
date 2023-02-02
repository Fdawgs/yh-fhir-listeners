/*
AllergyIntolerance Resource
*/

SELECT DISTINCT id,
	patientReference,
	allergyCodeCodingGroupCode,
	allergyCodeCodingGroupDisplay,
	allergyCodeCodingCode,
	allergyCodeCodingDisplay,
	allergyCodeCodingDrugCode,
	allergyCodeCodingDrugDisplay,
	note,
	clinicalStatusCode,
	verificationStatusCode,
	typeCode,
	criticalityCode,
	CONCAT(COALESCE(assertedDate, ''), 'T', COALESCE(assertedTime, '')) AS assertedDate,
	-- Every resource query must always have a lastUpdated column
	CONCAT(COALESCE(lastUpdateDate, ''), 'T', COALESCE(lastUpdateTime, '')) AS lastUpdated
FROM OPENQUERY([ENYH-PRD-ANALYTICS],
  				'SELECT REPLACE(alle.ALG_RowId, ''||'', ''-'') AS id,
				  		-- patient reference
				  		alle.ALG_PAPMI_ParRef->PAPMI_No AS patientReference,

						alle.ALG_AllergyGrp_DR->ALGR_Code AS allergyCodeCodingGroupCode,
						alle.ALG_AllergyGrp_DR->ALGR_Desc AS allergyCodeCodingGroupDisplay,

						alle.ALG_TYPE_DR->ALG_Code AS allergyCodeCodingCode,
						alle.ALG_TYPE_DR->ALG_Desc AS allergyCodeCodingDisplay,

						alle.ALG_PHCDM_DR->PHCD_Code AS allergyCodeCodingDrugCode,
						alle.ALG_PHCDM_DR->PHCD_ProductName AS allergyCodeCodingDrugDisplay, -- Drug Master

						alle.ALG_Comments AS note,

						-- clinical status
						CASE alle.ALG_Status
						WHEN ''A'' THEN ''active''
						WHEN ''I'' THEN ''inactive''
						WHEN ''R'' THEN ''resolved''
						ELSE NULL
						END AS clinicalStatusCode,

						-- verification Status unconfirmed |confirmed
						CASE
						WHEN alle.ALG_Status = ''C'' THEN ''unconfirmed''
						WHEN alle.ALG_ConfirmedDate IS NOT NULL OR (alle.ALG_Status != ''C'' AND alle.ALG_Status IS NOT NULL) THEN ''confirmed''
						ELSE ''unconfirmed''
						END as verificationStatusCode,

						-- type
						CASE alle.ALG_Category_DR->ALRGCAT_DESC
						WHEN ''ALLERGY'' THEN ''allergy''
						WHEN ''SIDEEFFECT'' THEN ''intolerance''
						ELSE NULL
						END AS typeCode,
						CASE alle.ALG_Severity_DR
						WHEN 1 THEN ''high'' -- moderate assigned to be high, better safe than sorry
						WHEN 2 THEN ''low''
						WHEN 5 THEN ''high''
						WHEN 4 THEN ''unable-to-assess''
						ELSE NULL
						END AS criticalityCode,

						alle.ALG_Date AS assertedDate,
						alle.ALG_Time AS assertedTime,
						alle.ALG_LastUpdateDate AS lastUpdateDate,
						alle.ALG_LastUpdateTime as lastUpdateTime
				   FROM PA_Allergy alle
				  WHERE (alle.ALG_PAPMI_ParRef->PAPMI_No IS NOT NULL)
				    AND (alle.ALG_PAPMI_ParRef->PAPMI_No = ''5484125'')'
);