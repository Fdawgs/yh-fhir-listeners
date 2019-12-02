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
		flag: [
			'date',
			'patient',
			'status'
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

	/**
	 * ================================
	 * AllergyIntolerance search params
	 * ================================
	 */
	if (type == 'allergyintolerance') {
		// GET [baseUrl]/AllergyIntolerance?patient=[id]&clinical-status=[code]
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

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&date=[date]
		if ($('parameters').contains('date')) {
			// Loop through each date param and build SQL WHERE clause
			$('parameters').getParameterList('date').toArray().forEach((paramDate) => {
				date = paramDate;
				date += '';
				var operator = convertFhirParameterOperator(date.substring(0, 2));
				// eslint-disable-next-line no-restricted-globals
				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}
				whereParts.push('(alle.ALG_Date ' + operator + ' \'\'' + date + '\'\')');
			});
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]
		if ($('parameters').contains('patient')) {
			whereParts.push('(alle.ALG_PAPMI_ParRef->PAPMI_No = \'\'' + $('parameters').getParameter('patient') + '\'\')');
		}

		// GET [baseUrl]/AllergyIntolerance?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if ($('parameters').getParameter('patient.identifier').contains('|')) {
				var allergyPatIdParam = String($('parameters').getParameter('patient.identifier')).split('|');
				if (allergyPatIdParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
					whereArray[0].push('(alle.ALG_PAPMI_ParRef->PAPMI_ID = \'\'' + allergyPatIdParam[1] + '\'\')');
				}
				if (allergyPatIdParam[0] == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier') {
					whereArray[0].push('(alle.ALG_PAPMI_ParRef->PAPMI_No = \'\'' + allergyPatIdParam[1] + '\'\')');
				}
			}
		}

		whereArray.push(whereParts);
	}

	/**
	 * =======================
	 * Condition search params
	 * =======================
	 */
	if (type == 'condition') {
		// GET [baseUrl]/Condition?patient=[id]&asserted-date=[date]
		if ($('parameters').contains('asserted-date')) {
			whereParts.push('');
		}

		// GET [baseUrl]/Condition?patient=[id]&category=[code]
		if ($('parameters').contains('category')) {
			whereParts.push('');
		}

		// GET [baseUrl]/Condition?patient=[id]&clinical-status=[code]
		if ($('parameters').contains('clinical-status')) {
			whereParts.push('');
		}

		/**
		 * GET [baseUrl]/Condition?patient.identifier=[system]|[code]
		 * GET [baseUrl]/Condition?patient=[id]
		 */
		if ($('parameters').contains('patient')) {
			whereParts.push('');
		}
	}

	/**
	 * =======================
	 * Encounter search params
	 * =======================
	 */
	if (type == 'encounter') {
		// Turn array into multi-dimensional one to allow for two seperate WHERE clauses to be built
		whereArray = [[], []];

		// GET [baseUrl]/Encounter?patient=[id]
		if ($('parameters').contains('patient')) {
			// Build where clause for first query (outpats) in union
			whereArray[0].push('(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = \'\'' + $('parameters').getParameter('patient') + '\'\')');

			// Build where clause for second query (inpats, emerg) in union
			whereArray[1].push('(PAADM_PAPMI_DR->PAPMI_No = \'\'' + $('parameters').getParameter('patient') + '\'\')');
		}

		// GET [baseUrl]/Encounter?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if ($('parameters').getParameter('patient.identifier').contains('|')) {
				var encounterPatIdParam = String($('parameters').getParameter('patient.identifier')).split('|');
				if (encounterPatIdParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
					whereArray[0].push('(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_ID = \'\'' + encounterPatIdParam[1] + '\'\')');
					whereArray[0].push('(PAADM_PAPMI_DR->PAPMI_ID = \'\'' + encounterPatIdParam[1] + '\'\')');
				}
				if (encounterPatIdParam[0] == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier') {
					whereArray[0].push('(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = \'\'' + encounterPatIdParam[1] + '\'\')');
					whereArray[0].push('(PAADM_PAPMI_DR->PAPMI_No = \'\'' + encounterPatIdParam[1] + '\'\')');
				}
			}
		}

		// GET [baseUrl]/Encounter?patient=[id]&date=[date]
		if ($('parameters').contains('date')) {
			// Loop through each date param and build SQL WHERE clause
			$('parameters').getParameterList('date').toArray().forEach((paramDate) => {
				date = paramDate;
				date += '';
				var operator = convertFhirParameterOperator(date.substring(0, 2));
				// eslint-disable-next-line no-restricted-globals
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

	/**
	 * =======================
	 * Flag search params
	 * =======================
	 */
	if (type == 'flag') {
		// Turn array into multi-dimensional one to allow for two seperate WHERE clauses to be built
		whereArray = [[], []];

		// GET [baseUrl]/Flag?patient=[id]
		if ($('parameters').contains('patient')) {
			whereArray[0].push('(alert.ALM_PAPMI_ParRef->PAPMI_No = \'\'' + $('parameters').getParameter('patient') + '\'\')');
		}

		// GET [baseUrl]/Flag?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if ($('parameters').getParameter('patient.identifier').contains('|')) {
				var flagPatIdParam = String($('parameters').getParameter('patient.identifier')).split('|');
				if (flagPatIdParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
					whereArray[0].push('(alert.ALM_PAPMI_ParRef->PAPMI_Id = \'\'' + flagPatIdParam[1] + '\'\')');
				}
				if (flagPatIdParam[0] == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier') {
					whereArray[0].push('(alert.ALM_PAPMI_ParRef->PAPMI_No = \'\'' + flagPatIdParam[1] + '\'\')');
				}
			}
		}

		// GET [baseUrl]/Flag?patient=[id]&status=[code]
		if ($('parameters').contains('status')) {
			whereArray[1].push('(flagStatusCode = \'\'' + $('parameters').getParameter('status') + '\'\')');
		}
	}

	/**
	 * =================================
	 * MedicationStatement search params
	 * =================================
	 */
	if (type == 'medicationstatement') {
		// Turn array into multi-dimensional one to allow for two seperate WHERE clauses to be built
		whereArray = [[], []];

		// GET [baseUrl]/MedicationStatement?patient=[id]&effective=[date]
		if ($('parameters').contains('effective')) {
			// Loop through each date param and build SQL WHERE clause
			$('parameters').getParameterList('effective').toArray().forEach((paramDate) => {
				date = paramDate;
				date += '';
				var operator = convertFhirParameterOperator(date.substring(0, 2));
				// eslint-disable-next-line no-restricted-globals
				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}
				whereArray[1].push('(medstatEffectiveStart ' + operator + ' \'\'' + date + '\'\')');
			});
		}

		// GET [baseUrl]/MedicationStatement?patient=[id]
		if ($('parameters').contains('patient')) {
			whereArray[0].push('(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = \'\'' + $('parameters').getParameter('patient') + '\'\')');
		}

		// GET [baseUrl]/MedicationStatement?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if ($('parameters').getParameter('patient.identifier').contains('|')) {
				var medStatPatIdParam = String($('parameters').getParameter('patient.identifier')).split('|');
				if (medStatPatIdParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
					whereArray[0].push('(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_ID = \'\'' + medStatPatIdParam[1] + '\'\')');
				}
				if (medStatPatIdParam[0] == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier') {
					whereArray[0].push('(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = \'\'' + medStatPatIdParam[1] + '\'\')');
				}
			}
		}

		// GET [baseUrl]/MedicationStatement?patient=[id]&status=[code]
		if ($('parameters').contains('status')) {
			whereArray[1].push('(medstatStatusCode = \'\'' + $('parameters').getParameter('status') + '\'\')');
		}
	}

	/**
	 * =====================
	 * Patient search params
	 * =====================
	 */
	if (type == 'patient') {
		// GET [baseUrl]/Patient?birthdate=[date]
		if ($('parameters').contains('birthdate')) {
			whereParts.push('(patmas.PAPMI_DOB = \'\'' + $('parameters').getParameter('birthdate') + '\'\')');
		}

		// GET [baseUrl]/Patient?family=[family]
		if ($('parameters').contains('family')) {
			whereParts.push('(patmas.PAPMI_PAPER_DR->PAPER_Name = \'\'' + $('parameters').getParameter('family') + '\'\')');
		}

		// GET [baseUrl]/Patient?gender=[code]
		if ($('parameters').contains('gender')) {
			whereParts.push('(patmas.PAPMI_PAPER_DR->PAPER_Sex_DR->CTSEX_Desc = \'\'' + $('parameters').getParameter('gender') + '\'\')');
		}

		// GET [baseUrl]/Patient?given=[given]
		if ($('parameters').contains('given')) {
			whereParts.push('(patmas.PAPMI_PAPER_DR->PAPER_Name2 = \'\'' + $('parameters').getParameter('given') + '\'\')');
		}

		/**
		 * GET [baseUrl]/Patient?identifier=[system]|[code]
		 * GET [baseUrl]/Patient?identifier=[code]
		 */
		if ($('parameters').contains('identifier')) {
			if ($('parameters').getParameter('identifier').contains('|')) {
				var identifierParam = String($('parameters').getParameter('identifier')).split('|');
				if (identifierParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
					whereParts.push('(patmas.PAPMI_ID = \'\'' + identifierParam[1] + '\'\')');
				}
				if (identifierParam[0] == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier') {
					whereParts.push('(patmas.PAPMI_No = \'\'' + identifierParam[1] + '\'\')');
				}
			} else {
				whereParts.push('(patmas.PAPMI_No = \'\'' + $('parameters').getParameter('identifier') + '\'\')');
			}
		}

		// GET [baseUrl]/Patient?name=[name]
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
