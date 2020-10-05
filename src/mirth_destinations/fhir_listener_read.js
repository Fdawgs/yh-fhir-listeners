/**
 * @author Frazer Smith
 * @description Rewritten example FHIR read destination to be usable for TrakCare calls.
 */
try {
	const type = $('fhirType').toLowerCase();
	const id = $('fhirId');

	// Turn array into multi-dimensional one to allow for up to four seperate WHERE clauses to be built
	const whereArray = [[], [], [], []];

	switch (`${type}`) {
		case 'allergyintolerance':
			whereArray[0].push(
				`(REPLACE(alle.ALG_RowId, ''||'', ''-'') = ''${id}'')`
			);
			break;
		case 'condition':
			break;
		case 'documentreference':
			break;
		case 'encounter':
			whereArray[0].push(
				`(REPLACE(app.APPT_RowId, ''||'', ''-'') = ''${id}'')`
			);
			whereArray[1].push(
				`(REPLACE(PAADM_ADMNo, ''/'', ''-'') = ''${id}'')`
			);
			whereArray[2].push(
				`(REPLACE(TRANS_ParRef->PAADM_ADMNo, ''/'', ''-'') = ''${id}'')`
			);
			break;
		case 'flag':
			whereArray[0].push(
				`(REPLACE(alert.ALM_RowID, ''||'', ''-'') = ''${id}'')`
			);
			break;
		case 'medicationstatement':
			whereArray[0].push(
				`(REPLACE(oi.OEORI_RowID, ''||'', ''-'') = ''${id}'')`
			);
			break;
		case 'patient':
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
			wherePredicates[index] = element.join(' AND ');
		}
	}

	logger.debug(
		`SQL WHERE clause predicate(s): ${wherePredicates.toString()}`
	);

	const result = buildResourceQuery(type, wherePredicates);
	while (result.next()) {
		let data;
		switch (`${type}`) {
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
		const version = '1';
		const lastModified = new Date(
			getResultSetString(result, 'lastUpdated')
		);
		const response = FhirResponseFactory.getReadResponse(
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
		`${$('fhirType')} ID ${id} not found.`,
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
