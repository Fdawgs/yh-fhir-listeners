/**
 * @author Frazer Smith
 * @description Rewritten example FHIR read destination to be usable for TrakCare calls.
 */
try {
	var type = $('fhirType').toLowerCase();
	var id = $('fhirId');

	// Turn array into multi-dimensional one to allow for up to four seperate WHERE clauses to be built
	var whereArray = [[], [], [], []];

	switch (''.concat(type)) {
		case 'allergyintolerance':
			whereArray[0].push(
				"(REPLACE(alle.ALG_RowId, ''||'', ''-'') = ''".concat(id, "'')")
			);

			break;
		case 'condition':
			break;
		case 'documentreference':
			break;
		case 'encounter':
			whereArray[0].push(
				"(REPLACE(app.APPT_RowId, ''||'', ''-'') = ''".concat(id, "'')")
			);

			whereArray[1].push(
				"(REPLACE(PAADM_ADMNo, ''/'', ''-'') = ''".concat(id, "'')")
			);

			whereArray[2].push(
				"(REPLACE(TRANS_ParRef->PAADM_ADMNo, ''/'', ''-'') = ''".concat(
					id,
					"'')"
				)
			);

			break;
		case 'flag':
			whereArray[0].push(
				"(REPLACE(alert.ALM_RowID, ''||'', ''-'') = ''".concat(
					id,
					"'')"
				)
			);

			break;
		case 'medicationstatement':
			whereArray[0].push(
				"(REPLACE(oi.OEORI_RowID, ''||'', ''-'') = ''".concat(id, "'')")
			);

			break;
		case 'patient':
			whereArray[0].push("(patmas.PAPMI_No = ''".concat(id, "'')"));
			whereArray[1].push(
				"(NOK_PAPMI_ParRef->PAPMI_No = ''".concat(id, "'')")
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
			wherePredicates[index] = element.join(' AND ');
		}
	}

	logger.debug(
		'SQL WHERE clause predicate(s): '.concat(wherePredicates.toString())
	);

	var result = buildResourceQuery(type, wherePredicates);
	while (result.next()) {
		var data = void 0;
		switch (''.concat(type)) {
			case 'allergyintolerance':
				data = buildAllergyIntoleranceResource(result);
				break;
			case 'condition':
				// data = buildConditionResource(result);
				break;
			case 'documentreference':
				// data = buildDocumentReferenceResource(result);
				break;
			case 'encounter':
				data = buildEncounterResource(result);
				break;
			case 'flag':
				data = buildFlagResource(result);
				break;
			case 'medicationstatement':
				data = buildMedicationStatementResource(result);
				break;
			case 'patient':
				data = buildPatientResource(result);
				break;
			default:
				break;
		}

		// Hard coded version as we don't keep past versions of records, only one
		var version = '1';
		var lastModified = new Date(getResultSetString(result, 'lastUpdated'));

		var response = FhirResponseFactory.getReadResponse(
			JSON.stringify(data),
			version,
			lastModified,
			200,
			'application/fhir+json'
		);

		responseMap.put('response', response);
		return response.getMessage();
	}
	return createOperationOutcome(
		'error',
		'processing',
		''.concat($('fhirType'), ' ID ').concat(id, ' not found.'),
		404
	);
} catch (error) {
	return createOperationOutcome(
		'error',
		'transient',
		'Error reading resource.',
		500,
		error
	);
}
