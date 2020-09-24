/*
AllergyIntolerance Resource
*/

SELECT TOP 1000
	id,
	patientReference,
	allergyGroupDesc,
	allergyCodingDesc,
	allergyDrugDesc,
	allergyDrugGenericDesc,
	allergyDrugCategoryDesc,
	allergyDrugFormDesc,
	allergyDrugIngredientDesc,
	allergyComment,
	clinicalStatusCode,
	verificationStatusCode,
	typeCode,
	criticalityCode,
	CONCAT(COALESCE(assertedDate, ''), 'T', COALESCE(assertedTime, '')) AS assertedDate,
	CONCAT(COALESCE(lastUpdateDate, ''), 'T', COALESCE(lastUpdateTime, '')) AS lastUpdated
FROM OPENQUERY([ENYH-PRD-ANALYTICS],
  				'SELECT  REPLACE(alle.ALG_RowId, ''||'', ''-'') AS id,
				  		-- patient reference
				  		alle.ALG_PAPMI_ParRef->PAPMI_No AS patientReference,

						-- Concat these in resource builder to create code.text
						alle.ALG_AllergyGrp_DR->ALGR_Desc AS allergyGroupDesc,
						alle.ALG_TYPE_DR->ALG_Desc AS allergyCodingDesc,
						alle.ALG_PHCDM_DR->PHCD_ProductName AS allergyDrugDesc, -- Drug Master
						alle.ALG_PHCGE_DR->PHCGE_Name AS allergyDrugGenericDesc,   -- Drug Generic
						alle.ALG_PHCSC_DR->PHCSC_Desc AS allergyDrugCategoryDesc, -- Drug Category
						alle.ALG_PHCDRGForm_DR->PHCDF_Description AS allergyDrugFormDesc, -- Drug Form
						alle.ALG_Ingred_DR->INGR_Desc AS allergyDrugIngredientDesc, -- Drug Ingredient
						alle.ALG_Comments AS allergyComment,

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
						
				   FROM %ALLINDEX PA_Allergy alle
				  WHERE (alle.ALG_PAPMI_ParRef->PAPMI_No IS NOT NULL)
				    AND (alle.ALG_PAPMI_ParRef->PAPMI_No = ''5484125'')'
);