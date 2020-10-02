/**
 * @author Frazer Smith
 * @description Rewritten example FHIR read destination to be usable for TrakCare calls.
 */
try {
	var type = $('fhirType').toLowerCase();
	var id = $('fhirId');

	// Build up WHERE clause then pass to buildResourceQuery to be called
	var wherePredicate;
	switch (''.concat(type)) {
		case 'allergyintolerance':
			wherePredicate = [
				"(REPLACE(alle.ALG_RowId, ''||'', ''-'') = ''".concat(id, "'')")
			];

			break;
		case 'condition':
			break;
		case 'documentreference':
			break;
		case 'encounter':
			wherePredicate = [
				"(REPLACE(app.APPT_RowId, ''||'', ''-'') = ''".concat(
					id,
					"'')"
				),
				"(REPLACE(PAADM_ADMNo, ''/'', ''-'') = ''".concat(id, "'')"),
				"(REPLACE(TRANS_ParRef->PAADM_ADMNo, ''/'', ''-'') = ''".concat(
					id,
					"'')"
				)
			];

			break;
		case 'flag':
			wherePredicate = [
				"(REPLACE(alert.ALM_RowID, ''||'', ''-'') = ''".concat(
					id,
					"'')"
				)
			];

			break;
		case 'medicationstatement':
			wherePredicate = [
				"(REPLACE(oi.OEORI_RowID, ''||'', ''-'') = ''".concat(id, "'')")
			];

			break;
		case 'patient':
			wherePredicate = [
				"(patmas.PAPMI_No = ''".concat(id, "'')"),
				"(NOK_PAPMI_ParRef->PAPMI_No = ''".concat(id, "'')")
			];

			break;
		default:
			break;
	}

	var result = buildResourceQuery(type, wherePredicate);

	if (result.next()) {
		// Pass it out to external channel that will transform into
		// Care Connect FHIR Resource and return
		var data;
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
