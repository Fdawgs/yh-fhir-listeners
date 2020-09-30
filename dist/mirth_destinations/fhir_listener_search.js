/* eslint-disable no-restricted-globals */

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
	// Turn array into multi-dimensional one to allow for up to four seperate WHERE clauses to be built
	var whereArray = [[], [], [], []];

	var supportedTypeParams = {
		allergyintolerance: ['clinical-status', 'date', 'patient'],
		condition: ['asserted-date', 'category', 'clinical-status', 'patient'],
		encounter: ['class', 'date', 'patient', 'status'],
		flag: ['date', 'patient', 'status'],
		medicationstatement: ['effective', 'patient', 'status'],
		patient: [
			'address',
			'address-city',
			'address-postalcode',
			'birthdate',
			'deceased',
			'email',
			'family',
			'gender',
			'given',
			'identifier',
			'name',
			'phone'
		]
	};

	// If any param not supported, reject request
	Object.keys($('parameters')).forEach(function (key) {
		if (
			supportedTypeParams[type.toLowerCase()].indexOf(
				''.concat(key.toLowerCase())
			) < 0
		) {
			return createOperationOutcome(
				'error',
				'invalid',
				'Unknown or unsupported parameter '.concat(key, '.')
			);
		}
	});

	/**
	 * ================================
	 * AllergyIntolerance search params
	 * ================================
	 */
	if (type == 'allergyintolerance') {
		// GET [baseUrl]/AllergyIntolerance?patient=[id]
		if ($('parameters').contains('patient')) {
			whereArray[0].push(
				"(alle.ALG_PAPMI_ParRef->PAPMI_No = ''".concat(
					$('parameters').getParameter('patient'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/AllergyIntolerance?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				var allergyPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (
					allergyPatIdParam[0] == 'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						"(alle.ALG_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
							allergyPatIdParam[1],
							"'' AND PAPMI_Active IS NULL))"
						)
					);
				}
				if (
					allergyPatIdParam[0] ===
					'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						"(alle.ALG_PAPMI_ParRef->PAPMI_No = ''".concat(
							allergyPatIdParam[1],
							"'')"
						)
					);
				}
			}
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&clinical-status=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('clinical-status')
		) {
			whereArray[3].push(
				"(clinicalStatusCode = '".concat(
					$('parameters').getParameter('clinical-status'),
					"')"
				)
			);
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&criticality=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('criticality')
		) {
			whereArray[3].push(
				"(criticalityCode = '".concat(
					$('parameters').getParameter('criticality'),
					"')"
				)
			);
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&date=[date]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('date')
		) {
			// Loop through each date param and build SQL WHERE clause
			$('parameters')
				.getParameterList('date')
				.toArray()
				.forEach(function (paramDate) {
					date = paramDate;
					date += '';
					var operator = convertFhirParameterOperator(
						date.substring(0, 2)
					);

					if (isNaN(date.substring(0, 2))) {
						date = date.substring(2, date.length);
					}
					whereArray[0].push(
						'(alle.ALG_Date '
							.concat(operator, " ''")
							.concat(date, "'')")
					);
				});
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&type=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('type')
		) {
			whereArray[3].push(
				"(typeCode = '".concat(
					$('parameters').getParameter('type'),
					"')"
				)
			);
		}
	}

	/**
	 * =======================
	 * Condition search params
	 * =======================
	 */
	if (type == 'condition') {
		// GET [baseUrl]/Condition?patient=[id]&asserted-date=[date]
		if ($('parameters').contains('asserted-date')) {
			whereArray[0].push('');
		}

		// GET [baseUrl]/Condition?patient=[id]&category=[code]
		if ($('parameters').contains('category')) {
			whereArray[0].push('');
		}

		// GET [baseUrl]/Condition?patient=[id]&clinical-status=[code]
		if ($('parameters').contains('clinical-status')) {
			whereArray[0].push('');
		}

		/**
		 * GET [baseUrl]/Condition?patient.identifier=[system]|[code]
		 * GET [baseUrl]/Condition?patient=[id]
		 */
		if ($('parameters').contains('patient')) {
			whereArray[0].push('');
		}
	}

	/**
	 * =======================
	 * Encounter search params
	 * =======================
	 */
	if (type == 'encounter') {
		// GET [baseUrl]/Encounter?patient=[id]
		if ($('parameters').contains('patient')) {
			// Build where clause for first query (outpats) in union
			whereArray[0].push(
				"(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$('parameters').getParameter('patient'),
					"'')"
				)
			);

			// Build where clause for second query (inpats, emerg) in union
			whereArray[1].push(
				"(PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$('parameters').getParameter('patient'),
					"'')"
				)
			);

			// Build where clause for subquery for inpat consultants
			whereArray[2].push(
				"(TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$('parameters').getParameter('patient'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Encounter?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				var encounterPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (
					encounterPatIdParam[0] ===
					'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						"(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
							encounterPatIdParam[1],
							"'' AND PAPMI_Active IS NULL))"
						)
					);

					whereArray[1].push(
						"(PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
							encounterPatIdParam[1],
							"'' AND PAPMI_Active IS NULL))"
						)
					);

					whereArray[2].push(
						"(TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
							encounterPatIdParam[1],
							"'' AND PAPMI_Active IS NULL))"
						)
					);
				}
				if (
					encounterPatIdParam[0] ===
					'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						"(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
							encounterPatIdParam[1],
							"'')"
						)
					);

					whereArray[1].push(
						"(PAADM_PAPMI_DR->PAPMI_No = ''".concat(
							encounterPatIdParam[1],
							"'')"
						)
					);

					whereArray[2].push(
						"(TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
							encounterPatIdParam[1],
							"'')"
						)
					);
				}
			}
		}

		// GET [baseUrl]/Encounter?patient=[id]&date=[date]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('date')
		) {
			// Only handle first two `date` search params, any extra will be ignored
			var dateArray = $('parameters').getParameterList('date').toArray();

			// Search with start date
			if (dateArray[0]) {
				var _date = dateArray[0];
				_date += '';

				var operator = convertFhirParameterOperator(
					_date.substring(0, 2)
				);

				if (isNaN(_date.substring(0, 2))) {
					_date = _date.substring(2, _date.length);
				}

				whereArray[3].push(
					"(CONCAT(COALESCE(encounterPeriodStartDate, ''), 'T', COALESCE(encounterPeriodStartTime, '')) "
						.concat(operator, " '")
						.concat(_date, "')")
				);
			}

			// Search with end date
			if (dateArray[1]) {
				var _date2 = dateArray[1];
				_date2 += '';

				var _operator = convertFhirParameterOperator(
					_date2.substring(0, 2)
				);

				if (isNaN(_date2.substring(0, 2))) {
					_date2 = _date2.substring(2, _date2.length);
				}

				whereArray[3].push(
					"(CONCAT(COALESCE(encounterPeriodEndDate, ''), 'T', COALESCE(encounterPeriodEndTime, '')) "
						.concat(_operator, " '")
						.concat(_date2, "')")
				);
			}
		}

		// GET [baseUrl]/Encounter?patient=[id]&class=[token]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('class')
		) {
			// Loop through each class param and build SQL WHERE clause
			$('parameters')
				.getParameterList('class')
				.toArray()
				.forEach(function (paramClass) {
					var classCode = {
						inpatient: 'I',
						outpatient: 'AMB',
						emergency: 'E'
					};

					// Build where clause for first query (outpats) in union
					whereArray[0].push(
						"(''AMB'' = ''".concat(
							classCode[paramClass.toLowerCase()],
							"'')"
						)
					);

					// Build where clause for second query (inpats, emerg) in union
					whereArray[1].push(
						"(PAADM_Type = ''".concat(
							classCode[paramClass.toLowerCase()],
							"'')"
						)
					);
				});
		}

		// GET [baseUrl]/Encounter?patient=[id]&type=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('type')
		) {
			// Loop through each type param and build SQL WHERE clause
			$('parameters')
				.getParameterList('type')
				.toArray()
				.forEach(function (paramType) {
					// Build where clause for first query (outpats) in union
					whereArray[0].push(
						"(app.APPT_AS_ParRef->AS_RES_ParRef->RES_CTLOC_DR->CTLOC_Code = ''".concat(
							paramType,
							"'')"
						)
					);

					// Build where clause for second query (inpats, emerg) in union
					whereArray[1].push(
						"(PAADM_DepCode_DR->CTLOC_Code = ''".concat(
							paramType,
							"'')"
						)
					);
				});
		}

		// GET [baseUrl]/Encounter?patient=[id]&status=[token]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('status')
		) {
			// Loop through each type param and build SQL WHERE clause
			$('parameters')
				.getParameterList('status')
				.toArray()
				.forEach(function (paramStatus) {
					// Build where clause for fourth query
					whereArray[3].push(
						"(encounterStatusMapped = '".concat(paramStatus, "')")
					);
				});
		}
	}

	/**
	 * =======================
	 * Flag search params
	 * =======================
	 */
	if (type == 'flag') {
		// GET [baseUrl]/Flag?patient=[id]
		if ($('parameters').contains('patient')) {
			whereArray[0].push(
				"(alert.ALM_PAPMI_ParRef->PAPMI_No = ''".concat(
					$('parameters').getParameter('patient'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Flag?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				var flagPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (flagPatIdParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
					whereArray[0].push(
						"(alert.ALM_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
							flagPatIdParam[1],
							"'' AND PAPMI_Active IS NULL))"
						)
					);
				}
				if (
					flagPatIdParam[0] ===
					'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						"(alert.ALM_PAPMI_ParRef->PAPMI_No = ''".concat(
							flagPatIdParam[1],
							"'')"
						)
					);
				}
			}
		}

		// GET [baseUrl]/Flag?patient=[id]&date=[date]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('date')
		) {
			// Only handle first two `date` search params, any extra will be ignored
			var _dateArray = $('parameters').getParameterList('date').toArray();

			// Search with start date
			if (_dateArray[0]) {
				var _date3 = _dateArray[0];
				_date3 += '';

				var _operator2 = convertFhirParameterOperator(
					_date3.substring(0, 2)
				);

				if (isNaN(_date3.substring(0, 2))) {
					_date3 = _date3.substring(2, _date3.length);
				}

				whereArray[1].push(
					'(periodStart '
						.concat(_operator2, " '")
						.concat(_date3, "')")
				);
			}

			// Search with end date
			if (_dateArray[1]) {
				var _date4 = _dateArray[1];
				_date4 += '';

				var _operator3 = convertFhirParameterOperator(
					_date4.substring(0, 2)
				);

				if (isNaN(_date4.substring(0, 2))) {
					_date4 = _date4.substring(2, _date4.length);
				}

				whereArray[1].push(
					'(periodEnd '.concat(_operator3, " '").concat(_date4, "')")
				);
			}
		}

		// GET [baseUrl]/Flag?patient=[id]&status=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('status')
		) {
			whereArray[1].push(
				"(flagStatusCode = ''".concat(
					$('parameters').getParameter('status'),
					"'')"
				)
			);
		}
	}

	/**
	 * =================================
	 * MedicationStatement search params
	 * =================================
	 */
	if (type == 'medicationstatement') {
		// GET [baseUrl]/MedicationStatement?patient=[id]&effective=[date]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('effective')
		) {
			// Only handle first two `effective` search params, any extra will be ignored
			var _dateArray2 = $('parameters')
				.getParameterList('effective')
				.toArray();

			// Search with start date
			if (_dateArray2[0]) {
				var _date5 = _dateArray2[0];
				_date5 += '';

				var _operator4 = convertFhirParameterOperator(
					_date5.substring(0, 2)
				);

				if (isNaN(_date5.substring(0, 2))) {
					_date5 = _date5.substring(2, _date5.length);
				}

				whereArray[1].push(
					'(medstatEffectiveStart '
						.concat(_operator4, " '")
						.concat(_date5, "')")
				);
			}

			// Search with end date
			if (_dateArray2[1]) {
				var _date6 = _dateArray2[1];
				_date6 += '';

				var _operator5 = convertFhirParameterOperator(
					_date6.substring(0, 2)
				);

				if (isNaN(_date6.substring(0, 2))) {
					_date6 = _date6.substring(2, _date6.length);
				}

				whereArray[1].push(
					'(medstatEffectiveEnd '
						.concat(_operator5, " '")
						.concat(_date6, "')")
				);
			}
		}

		// GET [baseUrl]/MedicationStatement?patient=[id]
		if ($('parameters').contains('patient')) {
			whereArray[0].push(
				"(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$('parameters').getParameter('patient'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/MedicationStatement?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				var medStatPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (
					medStatPatIdParam[0] == 'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						"(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
							medStatPatIdParam[1],
							"'' AND PAPMI_Active IS NULL))"
						)
					);
				}
				if (
					medStatPatIdParam[0] ===
					'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						"(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
							medStatPatIdParam[1],
							"'')"
						)
					);
				}
			}
		}

		// GET [baseUrl]/MedicationStatement?patient=[id]&status=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('status')
		) {
			whereArray[1].push(
				"(medstatStatusCode = ''".concat(
					$('parameters').getParameter('status'),
					"'')"
				)
			);
		}
	}

	/**
	 * =====================
	 * Patient search params
	 * =====================
	 */
	if (type == 'patient') {
		// GET [baseUrl]/Patient?address=[address]
		if ($('parameters').contains('address')) {
			var address = $('parameters').getParameter('address');
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_StName = ''"
					.concat(
						address,
						"'' OR patmas.PAPMI_PAPER_DR->PAPER_ForeignAddress = ''"
					)
					.concat(
						address,
						"'' OR patmas.PAPMI_PAPER_DR->PAPER_CT_Province_DR->PROV_Desc = ''"
					)
					.concat(address, "'')")
			);
		}

		// GET [baseUrl]/Patient?address-city=[address-city]
		if ($('parameters').contains('address-city')) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_CityCode_DR->CTCIT_Desc = ''".concat(
					$('parameters').getParameter('address-city'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?address-postalcode=[address-postalcode]
		if ($('parameters').contains('address-postalcode')) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Zip_DR->CTZIP_Code = ''".concat(
					$('parameters').getParameter('address-postalcode'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?birthdate=[date]
		if ($('parameters').contains('birthdate')) {
			whereArray[0].push(
				"(patmas.PAPMI_DOB = ''".concat(
					$('parameters').getParameter('birthdate'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?deceased=[deceased]
		if ($('parameters').contains('deceased')) {
			var deceased = $('parameters').getParameter('deceased');

			switch (deceased) {
				case 'false':
					whereArray[0].push(
						"(patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''N'')"
					);

					break;
				case 'true':
					whereArray[0].push(
						"(patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''Y'')"
					);

					break;
				default:
					break;
			}
		}

		// GET [baseUrl]/Patient?email=[email]
		if ($('parameters').contains('email')) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Email = ''".concat(
					$('parameters').getParameter('email'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?family=[family]
		if ($('parameters').contains('family')) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Name = ''".concat(
					$('parameters').getParameter('family'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?gender=[code]
		if ($('parameters').contains('gender')) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Sex_DR->CTSEX_Desc = ''".concat(
					$('parameters').getParameter('gender'),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?given=[given]
		if ($('parameters').contains('given')) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Name2 = ''".concat(
					$('parameters').getParameter('given'),
					"'')"
				)
			);
		}

		/**
		 * GET [baseUrl]/Patient?identifier=[system]|[code]
		 * GET [baseUrl]/Patient?identifier=[code]
		 */
		if ($('parameters').contains('identifier')) {
			if ($('parameters').getParameter('identifier').contains('|')) {
				var identifierParam = String(
					$('parameters').getParameter('identifier')
				).split('|');
				if (identifierParam[0] == 'https://fhir.nhs.uk/Id/nhs-number') {
					whereArray[0].push(
						"(patmas.PAPMI_ID = ''".concat(
							identifierParam[1],
							"'')"
						)
					);

					whereArray[1].push(
						"(NOK_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
							identifierParam[1],
							"'' AND PAPMI_Active IS NULL))"
						)
					);
				}
				if (
					identifierParam[0] ===
					'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						"(patmas.PAPMI_No = ''".concat(
							identifierParam[1],
							"'')"
						)
					);

					whereArray[1].push(
						"(NOK_PAPMI_ParRef->PAPMI_No = ''".concat(
							identifierParam[1],
							"'')"
						)
					);
				}
			} else {
				whereArray[0].push(
					"(patmas.PAPMI_No = ''".concat(
						$('parameters').getParameter('identifier'),
						"'')"
					)
				);

				whereArray[1].push(
					"(NOK_PAPMI_ParRef->PAPMI_No = ''".concat(
						$('parameters').getParameter('identifier'),
						"'')"
					)
				);
			}
		}

		// GET [baseUrl]/Patient?name=[name]
		if ($('parameters').contains('name')) {
			var name = $('parameters').getParameter('name');
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Name = ''"
					.concat(
						name,
						"'' OR patmas.PAPMI_PAPER_DR->PAPER_Name2 = ''"
					)
					.concat(name, "'')")
			);
		}

		// GET [baseUrl]/Patient?phone=[phone]
		if ($('parameters').contains('phone')) {
			var phone = $('parameters').getParameter('phone');
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_TelH = ''"
					.concat(
						phone,
						"'' OR patmas.PAPMI_PAPER_DR->PAPER_TelO = ''"
					)
					.concat(
						phone,
						"'' OR patmas.PAPMI_PAPER_DR->PAPER_MobPhone = ''"
					)
					.concat(phone, "'')")
			);
		}
	}

	// Aggregrate all predicates in whereArray and build SQL WHERE clause from it
	var wherePredicates = [];
	for (var index = 0; index < whereArray.length; index += 1) {
		var element = whereArray[index];
		if (element.length > 0) {
			wherePredicates[index] = element.join(' AND ');
		}
	}

	if (wherePredicates.length == 0) {
		return createOperationOutcome(
			'error',
			'transient',
			'Error searching resources.',
			500,
			''
		);
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

		// Add returned FHIR resources to bundle resource
		var resourceOuter = {};
		resourceOuter.resource = data;
		resourceOuter.fullUrl = ''
			.concat($cfg('apiUrl') + $('contextPath'), '/')
			.concat(data.id);

		bundle.entry.push(resourceOuter);
	}

	bundle.total = bundle.entry.length;
	bundle.link[0].url = $cfg('apiUrl') + $('uri');
	logger.debug(JSON.stringify(bundle));

	var response = FhirResponseFactory.getSearchResponse(
		JSON.stringify(bundle),
		200,
		'application/fhir+json'
	);

	responseMap.put('response', response);
	return response.getMessage();
} catch (error) {
	return createOperationOutcome(
		'error',
		'transient',
		'Error searching resources.',
		500,
		error
	);
}
