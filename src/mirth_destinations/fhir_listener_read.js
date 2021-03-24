/**
 * @author Frazer Smith
 * @description Rewritten example FHIR read destination to be usable for TrakCare calls.
 */
try {
	const type = $("fhirType").toLowerCase();
	const id = $("fhirId");

	// Turn array into multi-dimensional one to allow for up to four seperate WHERE clauses to be built
	const whereArray = [[], [], [], []];

	switch (`${type}`) {
		case "allergyintolerance":
			whereArray[0].push(
				`(alle.ALG_RowId = REPLACE(''${id}'', ''-'', ''||''))`
			);
			break;
		case "condition":
			break;
		case "documentreference":
			break;
		case "encounter":
			whereArray[0].push(
				`(app.APPT_RowId = REPLACE(''${id}'', ''-'', ''||''))`
			);
			whereArray[1].push(
				`(PAADM_ADMNo = REPLACE(''${id}'', ''-'', ''/''))`
			);
			whereArray[2].push(
				`(TRANS_ParRef->PAADM_ADMNo = REPLACE(''${id}'', ''-'', ''/''))`
			);
			break;
		case "flag":
			whereArray[0].push(
				`(alert.ALM_RowID = REPLACE(''${id}'', ''-'', ''||''))`
			);
			break;
		case "medicationstatement":
			whereArray[0].push(
				`(oi.OEORI_RowID = REPLACE(''${id}'', ''-'', ''||''))`
			);
			break;
		case "patient":
			whereArray[0].push(`(patmas.PAPMI_No = ''${id}'')`);
			whereArray[1].push(`(NOK_PAPMI_ParRef->PAPMI_No = ''${id}'')`);
			break;
		default:
			break;
	}

	// Aggregrate all predicates in whereArray and build SQL WHERE clause from it
	const wherePredicates = [];
	for (let index = 0; index < whereArray.length; index += 1) {
		const element = whereArray[index];
		if (element.length > 0) {
			wherePredicates[index] = element.join(" AND ");
		}
	}

	logger.debug(
		`SQL WHERE clause predicate(s): ${wherePredicates.toString()}`
	);

	const result = buildResourceQuery(type, wherePredicates);
	while (result.next()) {
		let data;
		switch (`${type}`) {
			case "allergyintolerance":
				data = buildAllergyIntoleranceResource(result);
				break;
			case "condition":
				// data = buildConditionResource(result);
				break;
			case "documentreference":
				// data = buildDocumentReferenceResource(result);
				break;
			case "encounter":
				data = buildEncounterResource(result);
				break;
			case "flag":
				data = buildFlagResource(result);
				break;
			case "medicationstatement":
				data = buildMedicationStatementResource(result);
				break;
			case "patient":
				data = buildPatientResource(result);
				break;
			default:
				break;
		}

		// Hard coded version as we do not keep past versions of records, only one
		const version = "1";
		const lastModified = new Date(
			getResultSetString(result, "lastUpdated")
		);
		const response = FhirResponseFactory.getReadResponse(
			JSON.stringify(data),
			version,
			lastModified,
			200,
			"application/fhir+json"
		);
		responseMap.put("response", response);
		return response.getMessage();
	}
	return createOperationOutcome(
		"error",
		"processing",
		`${$("fhirType")} ID ${id} not found.`,
		"STU3",
		404
	);
} catch (error) {
	return createOperationOutcome(
		"error",
		"transient",
		"Error reading resource.",
		"STU3",
		500,
		error
	);
}
