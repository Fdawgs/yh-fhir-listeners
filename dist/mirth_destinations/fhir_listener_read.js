/**
 * @author Frazer Smith
 * @description Rewritten example FHIR read destination to be usable for TrakCare calls.
 */
try {
	var type = $("fhirType").toLowerCase();
	var id = $("fhirId");

	// Turn array into multi-dimensional one to allow for up to four seperate WHERE clauses to be built
	var whereArray = [[], [], [], []];

	switch ("".concat(type)) {
		case "allergyintolerance":
			whereArray[0].push(
				"(alle.ALG_RowId = REPLACE(''".concat(id, "'', ''-'', ''||''))")
			);

			break;
		case "condition":
			break;
		case "documentreference":
			break;
		case "encounter":
			whereArray[0].push(
				"(app.APPT_RowId = REPLACE(''".concat(id, "'', ''-'', ''||''))")
			);

			whereArray[1].push(
				"(PAADM_ADMNo = REPLACE(''".concat(id, "'', ''-'', ''/''))")
			);

			whereArray[2].push(
				"(TRANS_ParRef->PAADM_ADMNo = REPLACE(''".concat(
					id,
					"'', ''-'', ''/''))"
				)
			);

			break;
		case "flag":
			whereArray[0].push(
				"(alert.ALM_RowID = REPLACE(''".concat(
					id,
					"'', ''-'', ''||''))"
				)
			);

			break;
		case "medicationstatement":
			whereArray[0].push(
				"(oi.OEORI_RowID = REPLACE(''".concat(id, "'', ''-'', ''||''))")
			);

			break;
		case "patient":
			whereArray[0].push("(patmas.PAPMI_No = ''".concat(id, "'')"));
			whereArray[1].push(
				"(NOK_PAPMI_ParRef->PAPMI_No = ''".concat(id, "'')")
			);
			whereArray[2].push(
				"(RTMAS_PatNo_DR->PAPMI_No = ''".concat(id, "'')")
			);
			break;
		case "procedure":
			whereArray[0].push(
				"(proc.PROC_RowID = REPLACE(''".concat(
					id,
					"'', ''-'', ''||''))"
				)
			);

			whereArray[1].push(
				"(proc.PROC_RowID = REPLACE(''".concat(
					id,
					"'', ''-'', ''||''))"
				)
			);

			break;
		default:
			break;
	}

	// Aggregrate all predicates in whereArray and build SQL WHERE clause from it
	var wherePredicates = [];
	for (var index = 0; index < whereArray.length; index += 1) {
		var element = whereArray[index];
		if (element.length > 0) {
			wherePredicates[index] = element.join(" AND ");
		}
	}

	logger.debug(
		"SQL WHERE clause predicate(s): ".concat(wherePredicates.toString())
	);

	var result = buildResourceQuery(type, wherePredicates);
	while (result.next()) {
		var data = void 0;
		switch ("".concat(type)) {
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
			case "procedure":
				data = buildProcedureResource(result);
				break;
			default:
				break;
		}

		// Hard coded version as we do not keep past versions of records, only one
		var version = "1";
		var lastModified = new Date(getResultSetString(result, "lastUpdated"));

		var response = FhirResponseFactory.getReadResponse(
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
		"".concat($("fhirType"), " ID ").concat(id, " not found."),
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
