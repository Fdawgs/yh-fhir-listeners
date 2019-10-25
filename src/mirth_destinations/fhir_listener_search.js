/**
 * @author Frazer Smith
 * @description Rewritten example FHIR search destination to be usable for TrakCare calls.
 * Mirth Connect supports ES6 to a degree but not template literals and const/let.
 */

try {
	var type = $('fhirType').toLowerCase();

	// Append URL with forward slash and build Java URL object
	var requestURL = $('url');
	if (!requestURL.endsWith('/')) {
		requestURL += '/';
	}
	var bundle = buildBundleResource(new java.net.URI(requestURL));
	var whereArray = [];
	var whereParts = [];

	var supportedTypeParams = {
		allergyintolerance: [
			'clinical-status',
			'date',
			'patient'
		],
		condition: [
			'asserted-date',
			'category',
			'clinical-status',
			'patient'
		],
		encounter: [
			'date',
			'patient'
		],
		medicationstatement: [
			'effective',
			'patient',
			'status'
		],
		patient: [
			'birthdate',
			'family',
			'gender',
			'given',
			'identifier',
			'name'
		]
	};

	// If any param not supported, reject request
	Object.keys($('parameters')).forEach((key) => {
		if (supportedTypeParams[type.toLowerCase()].indexOf(key.toLowerCase() + '') < 0) {
			return createOperationOutcome('error', 'invalid', 'Unknown or unsupported parameter ' + key + '.');
		}
	});

	// AllergyIntolerance search params
	if (type == 'allergyintolerance') {
		if ($('parameters').contains('clinical-status')) {
			var clinicalStatus = $('parameters').getParameter('clinical-status');

			var clinicalStatusCode = {
				active: 'A',
				inactive: 'I',
				resolved: 'R'
			};
			clinicalStatus = clinicalStatusCode[clinicalStatus.toLowerCase()];

			whereParts.push('(alle.ALG_Status = \'\'' + clinicalStatus + '\'\')');
		}

		if ($('parameters').contains('date')) {
			// Loop through each date param and build SQL WHERE clause
			$('parameters').getParameterList('date').toArray().forEach((paramDate) => {
				date = paramDate;
				date += '';
				var operator = convertFhirParameterOperator(date.substring(0, 2));
				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}
				whereParts.push('(alle.ALG_Date ' + operator + ' \'\'' + date + '\'\')');
			});
		}
		if ($('parameters').contains('patient')) {
			whereParts.push('(alle.ALG_PAPMI_ParRef->PAPMI_No = \'\'' + $('parameters').getParameter('patient') + '\'\')');
		}
		whereArray.push(whereParts);
	}

	// Condition search params
	if (type == 'condition') {
		if ($('parameters').contains('asserted-date')) {
			whereParts.push('');
		}

		if ($('parameters').contains('category')) {
			whereParts.push('');
		}
		if ($('parameters').contains('clinical-status')) {
			whereParts.push('');
		}
		if ($('parameters').contains('patient')) {
			whereParts.push('');
		}
	}

	// Encounter search params
	if (type == 'encounter') {
		// Turn array into multi-dimensional one to allow for two seperate WHERE clauses to be built
		whereArray = [[], []];
		if ($('parameters').contains('patient')) {
			var patient = $('parameters').getParameter('patient');

			// Build where clause for first query (outpats) in union
			whereArray[0].push('(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = \'\'' + patient + '\'\')');

			// Build where clause for second query (inpats, emerg) in union
			whereArray[1].push('(PAADM_PAPMI_DR->PAPMI_No = \'\'' + patient + '\'\')');
		}

		if ($('parameters').contains('date')) {
			// Loop through each date param and build SQL WHERE clause
			$('parameters').getParameterList('date').toArray().forEach((paramDate) => {
				date = paramDate;
				date += '';
				var operator = convertFhirParameterOperator(date.substring(0, 2));
				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				// Build where clause for first query (outpats) in union
				whereArray[0].push('(COALESCE(app.APPT_ArrivalDate, app.APPT_DateComp) ' + operator + ' \'\'' + date + '\'\')');

				// Build where clause for second query (inpats, emerg) in union
				whereArray[1].push('(PAADM_AdmDate' + operator + ' \'\'' + date + '\'\')');
			});
		}
	}

	// MedicationStatement search params
	if (type == 'medicationstatement') {
		if ($('parameters').contains('effective')) {
			whereParts.push('');
		}
		if ($('parameters').contains('patient')) {
			whereParts.push('(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = \'\'' + $('parameters').getParameter('patient') + '\'\')');
		}
		if ($('parameters').contains('status')) {
			whereParts.push('');
		}
	}

	// Patient search params
	if (type == 'patient') {
		if ($('parameters').contains('birthdate')) {
			whereParts.push('(patmas.PAPMI_DOB = \'\'' + $('parameters').getParameter('birthdate') + '\'\')');
		}
		if ($('parameters').contains('family')) {
			whereParts.push('(patmas.PAPMI_PAPER_DR->PAPER_Name = \'\'' + $('parameters').getParameter('family') + '\'\')');
		}
		if ($('parameters').contains('gender')) {
			whereParts.push('(patmas.PAPMI_PAPER_DR->PAPER_Sex_DR->CTSEX_Desc = \'\'' + $('parameters').getParameter('gender') + '\'\')');
		}
		if ($('parameters').contains('given')) {
			whereParts.push('(patmas.PAPMI_PAPER_DR->PAPER_Name2 = \'\'' + $('parameters').getParameter('given') + '\'\')');
		}
		if ($('parameters').contains('identifier')) {
			var identifierParam = String($('parameters').getParameter('identifier')).split('|');
			if (identifierParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
				whereParts.push('(patmas.PAPMI_ID = \'\'' + identifierParam[1] + '\'\')');
			}
			if (identifierParam[0] == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier') {
				whereParts.push('(patmas.PAPMI_No = \'\'' + identifierParam[1] + '\'\')');
			}
		}
		if ($('parameters').contains('name')) {
			var name = $('parameters').getParameter('name');
			whereParts.push('(patmas.PAPMI_PAPER_DR->PAPER_Name = \'\'' + name + '\'\' OR patmas.PAPMI_PAPER_DR->PAPER_Name2  = \'\'' + name + '\'\')');
		}
		whereArray.push(whereParts);
	}

	//  Aggregrate all predicates in whereArray and build SQL WHERE clause from it
	var wherePredicates = [];
	for (var index = 0; index < whereArray.length; index++) {
		var element = whereArray[index];
		if (element.length > 0) {
			wherePredicates[index] = element.join(' AND ');
		}
	}

	logger.debug('SQL WHERE clause predicate(s): ' + wherePredicates.toString());

	var result = buildResourceQuery(type, wherePredicates);
	while (result.next()) {
		var data;
		switch (type + '') {
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
		case 'medicationstatement':
			// data = buildMedicationStatementResource(result);
			break;
		case 'patient':
			data = buildPatientResource(result);
			break;
		default:
			break;
		}

		// Add returned FHIR resources to bundle resource
		var resourceOuter = {};
		resourceOuter.resource = data;
		resourceOuter.fullUrl = $cfg('apiUrl') + $('contextPath') + '/' + data.id;
		bundle.entry.push(resourceOuter);
	}

	bundle.total = bundle.entry.length;
	bundle.link[0].url = $cfg('apiUrl') + $('uri');
	logger.debug(JSON.stringify(bundle));

	var response = FhirResponseFactory.getSearchResponse(JSON.stringify(bundle), 200, 'application/fhir+json');
	responseMap.put('response', response);
	return response.getMessage();
} catch (error) {
	return createOperationOutcome('error', 'transient', 'Error searching resources.', 500, error);
}
