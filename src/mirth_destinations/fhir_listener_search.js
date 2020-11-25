/**
 * @author Frazer Smith
 * @description Rewritten example FHIR search destination to be usable for TrakCare calls.
 * Mirth Connect supports ES6 to a degree but not template literals and const/let.
 */

try {
	const type = $('fhirType').toLowerCase();

	// Append URL with forward slash and build Java URL object
	let requestURL = $('url');
	if (!requestURL.endsWith('/')) {
		requestURL += '/';
	}
	const bundle = buildBundleResource(new java.net.URI(requestURL));
	// Turn array into multi-dimensional one to allow for up to four seperate WHERE clauses to be built
	const whereArray = [[], [], [], []];

	const supportedTypeParams = {
		allergyintolerance: [
			'clinical-status',
			'criticality',
			'date',
			'patient',
			'patient.identifier',
			'type'
		],
		condition: [
			'asserted-date',
			'category',
			'clinical-status',
			'patient',
			'patient.identifier'
		],
		encounter: [
			'class',
			'date',
			'patient',
			'patient.identifier',
			'status',
			'type'
		],
		flag: ['date', 'patient', 'patient.identifier', 'status'],
		medicationstatement: [
			'effective',
			'patient',
			'patient.identifier',
			'status'
		],
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
	$('parameters')
		.getKeys()
		.forEach((key) => {
			if (
				supportedTypeParams[type.toLowerCase()].indexOf(
					`${key.toLowerCase().trim()}`
				) < 0
			) {
				throw Error(
					`${key} is not a valid search query parameter for ${type.toLowerCase()}s`
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
				`(alle.ALG_PAPMI_ParRef->PAPMI_No = ''${$(
					'parameters'
				).getParameter('patient')}'')`
			);
		}

		// GET [baseUrl]/AllergyIntolerance?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				const allergyPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						allergyPatIdParam[0]
					) == 'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						`(alle.ALG_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''${allergyPatIdParam[1]}'' AND PAPMI_Active IS NULL))`
					);
				}
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						allergyPatIdParam[0]
					) == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						`(alle.ALG_PAPMI_ParRef->PAPMI_No = ''${allergyPatIdParam[1]}'')`
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
			// Loop through each clinical-status param and build SQL WHERE clause
			let clinicalStatusArray = $('parameters')
				.getParameterList('clinical-status')
				.toArray();

			if (clinicalStatusArray[0].substring(0, 1) == '[') {
				clinicalStatusArray = JSON.parse(clinicalStatusArray[0]);
			}

			allintClinicalStatusArray = [];

			clinicalStatusArray.forEach((clinicalStatusParam) => {
				let clinicalStatus = clinicalStatusParam;
				clinicalStatus += '';

				allintClinicalStatusArray.push(
					`(clinicalStatusCode = '${clinicalStatus}')`
				);
			});

			if (allintClinicalStatusArray.length > 0) {
				whereArray[3].push(
					`(${allintClinicalStatusArray.join(' OR ')})`
				);
			}
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&criticality=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('criticality')
		) {
			// Loop through each criticality param and build SQL WHERE clause
			let criticalityArray = $('parameters')
				.getParameterList('criticality')
				.toArray();

			if (criticalityArray[0].substring(0, 1) == '[') {
				criticalityArray = JSON.parse(criticalityArray[0]);
			}

			allintCriticalityArray = [];

			criticalityArray.forEach((criticalityParam) => {
				let criticality = criticalityParam;
				criticality += '';

				allintCriticalityArray.push(
					`(criticalityCode = '${criticality}')`
				);
			});

			if (allintCriticalityArray.length > 0) {
				whereArray[3].push(`(${allintCriticalityArray.join(' OR ')})`);
			}
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&date=[date]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('date')
		) {
			// Loop through each date param and build SQL WHERE clause
			let dateArray = $('parameters').getParameterList('date').toArray();

			if (dateArray[0].substring(0, 1) == '[') {
				dateArray = JSON.parse(dateArray[0]);
			}

			dateArray.forEach((dateParam) => {
				let date = dateParam;
				date += '';

				const operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[0].push(`(alle.ALG_Date ${operator} ''${date}'')`);
			});
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&type=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('type')
		) {
			// Loop through each criticality param and build SQL WHERE clause
			let typeArray = $('parameters').getParameterList('type').toArray();

			if (typeArray[0].substring(0, 1) == '[') {
				typeArray = JSON.parse(typeArray[0]);
			}

			allintTypeArray = [];

			typeArray.forEach((typeParam) => {
				let typeP = typeParam;
				typeP += '';

				allintTypeArray.push(`(typeCode = '${typeP}')`);
			});

			if (allintTypeArray.length > 0) {
				whereArray[3].push(`(${allintTypeArray.join(' OR ')})`);
			}
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
				`(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''${$(
					'parameters'
				).getParameter('patient')}'')`
			);

			// Build where clause for second query (inpats, emerg) in union
			whereArray[1].push(
				`(PAADM_PAPMI_DR->PAPMI_No = ''${$('parameters').getParameter(
					'patient'
				)}'')`
			);

			// Build where clause for subquery for inpat consultants
			whereArray[2].push(
				`(TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = ''${$(
					'parameters'
				).getParameter('patient')}'')`
			);
		}

		// GET [baseUrl]/Encounter?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				const encounterPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						encounterPatIdParam[0]
					) == 'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						`(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''${encounterPatIdParam[1]}'' AND PAPMI_Active IS NULL))`
					);
					whereArray[1].push(
						`(PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''${encounterPatIdParam[1]}'' AND PAPMI_Active IS NULL))`
					);
					whereArray[2].push(
						`(TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''${encounterPatIdParam[1]}'' AND PAPMI_Active IS NULL))`
					);
				}
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						encounterPatIdParam[0]
					) == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						`(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''${encounterPatIdParam[1]}'')`
					);
					whereArray[1].push(
						`(PAADM_PAPMI_DR->PAPMI_No = ''${encounterPatIdParam[1]}'')`
					);
					whereArray[2].push(
						`(TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = ''${encounterPatIdParam[1]}'')`
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
			// Loop through each date param and build SQL WHERE clause
			let dateArray = $('parameters').getParameterList('date').toArray();

			if (dateArray[0].substring(0, 1) == '[') {
				dateArray = JSON.parse(dateArray[0]);
			}

			dateArray.forEach((dateParam) => {
				let date = dateParam;
				date += '';

				const operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[3].push(
					`(CONCAT(COALESCE(encounterPeriodStartDate, ''), 'T', COALESCE(encounterPeriodStartTime, '')) ${operator} '${date}')`
				);
			});
		}

		// GET [baseUrl]/Encounter?patient=[id]&class=[token]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('class')
		) {
			// Loop through each class param and build SQL WHERE clause
			let classArray = $('parameters')
				.getParameterList('class')
				.toArray();

			if (classArray[0].substring(0, 1) == '[') {
				classArray = JSON.parse(classArray[0]);
			}

			encounterClassArray = [];

			classArray.forEach((classParam) => {
				let classP = classParam;
				classP += '';

				const classCode = {
					inpatient: 'IMP',
					outpatient: 'AMB',
					emergency: 'EMER'
				};

				encounterClassArray.push(
					`(encounterClassCode = '${
						classCode[classP.toLowerCase()]
					}')`
				);
			});

			if (encounterClassArray.length > 0) {
				whereArray[3].push(`(${encounterClassArray.join(' OR ')})`);
			}
		}

		// GET [baseUrl]/Encounter?patient=[id]&type=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('type')
		) {
			// Loop through each type param and build SQL WHERE clause
			let typeArray = $('parameters').getParameterList('type').toArray();

			if (typeArray[0].substring(0, 1) == '[') {
				typeArray = JSON.parse(typeArray[0]);
			}

			encounterTypeArray = [];

			typeArray.forEach((typeParam) => {
				let typeP = typeParam;
				typeP += '';

				// Build where clause for fourth query
				encounterTypeArray.push(`(encounterTypeCode = '${typeP}')`);
			});

			if (encounterTypeArray.length > 0) {
				whereArray[3].push(`(${encounterTypeArray.join(' OR ')})`);
			}
		}

		// GET [baseUrl]/Encounter?patient=[id]&status=[token]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('status')
		) {
			// Loop through each status param and build SQL WHERE clause
			let statusArray = $('parameters')
				.getParameterList('status')
				.toArray();

			if (statusArray[0].substring(0, 1) == '[') {
				statusArray = JSON.parse(statusArray[0]);
			}

			encounterStatusArray = [];

			statusArray.forEach((statusParam) => {
				let status = statusParam;
				status += '';

				// Build where clause for fourth query
				encounterStatusArray.push(
					`(encounterStatusMapped = '${status}')`
				);
			});

			if (encounterStatusArray.length > 0) {
				whereArray[3].push(`(${encounterStatusArray.join(' OR ')})`);
			}
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
				`(alert.ALM_PAPMI_ParRef->PAPMI_No = ''${$(
					'parameters'
				).getParameter('patient')}'')`
			);
		}

		// GET [baseUrl]/Flag?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				const flagPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						flagPatIdParam[0]
					) == 'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						`(alert.ALM_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''${flagPatIdParam[1]}'' AND PAPMI_Active IS NULL))`
					);
				}
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						flagPatIdParam[0]
					) == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						`(alert.ALM_PAPMI_ParRef->PAPMI_No = ''${flagPatIdParam[1]}'')`
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
			// Loop through each date param and build SQL WHERE clause
			let dateArray = $('parameters').getParameterList('date').toArray();

			if (dateArray[0].substring(0, 1) == '[') {
				dateArray = JSON.parse(dateArray[0]);
			}

			dateArray.forEach((dateParam) => {
				let date = dateParam;
				date += '';

				const operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[1].push(`(periodStart ${operator} '${date}')`);
			});
		}

		// GET [baseUrl]/Flag?patient=[id]&status=[code]
		if (
			($('parameters').contains('patient') ||
				$('parameters').contains('patient.identifier')) &&
			$('parameters').contains('status')
		) {
			whereArray[1].push(
				`(flagStatusCode = ''${$('parameters').getParameter(
					'status'
				)}'')`
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
			// Loop through each effective param and build SQL WHERE clause
			let dateArray = $('parameters')
				.getParameterList('effective')
				.toArray();

			if (dateArray[0].substring(0, 1) == '[') {
				dateArray = JSON.parse(dateArray[0]);
			}

			dateArray.forEach((dateParam) => {
				let date = dateParam;
				date += '';

				const operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[1].push(
					`(medstatEffectiveStart ${operator} '${date}')`
				);
			});
		}

		// GET [baseUrl]/MedicationStatement?patient=[id]
		if ($('parameters').contains('patient')) {
			whereArray[0].push(
				`(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''${$(
					'parameters'
				).getParameter('patient')}'')`
			);
		}

		// GET [baseUrl]/MedicationStatement?patient.identifier=[system]|[code]
		if ($('parameters').contains('patient.identifier')) {
			if (
				$('parameters').getParameter('patient.identifier').contains('|')
			) {
				const medStatPatIdParam = String(
					$('parameters').getParameter('patient.identifier')
				).split('|');
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						medStatPatIdParam[0]
					) == 'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						`(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''${medStatPatIdParam[1]}'' AND PAPMI_Active IS NULL))`
					);
				}
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						medStatPatIdParam[0]
					) == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						`(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''${medStatPatIdParam[1]}'')`
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
				`(medstatStatusCode = '${$('parameters').getParameter(
					'status'
				)}')`
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
			const address = $('parameters').getParameter('address');
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_StName = ''${address}'' OR patmas.PAPMI_PAPER_DR->PAPER_ForeignAddress = ''${address}'' OR patmas.PAPMI_PAPER_DR->PAPER_CT_Province_DR->PROV_Desc = ''${address}'')`
			);
		}

		// GET [baseUrl]/Patient?address-city=[address-city]
		if ($('parameters').contains('address-city')) {
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_CityCode_DR->CTCIT_Desc = ''${$(
					'parameters'
				).getParameter('address-city')}'')`
			);
		}

		// GET [baseUrl]/Patient?address-postalcode=[address-postalcode]
		if ($('parameters').contains('address-postalcode')) {
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_Zip_DR->CTZIP_Code = ''${$(
					'parameters'
				).getParameter('address-postalcode')}'')`
			);
		}

		// GET [baseUrl]/Patient?birthdate=[date]
		if ($('parameters').contains('birthdate')) {
			whereArray[0].push(
				`(patmas.PAPMI_DOB = ''${$('parameters').getParameter(
					'birthdate'
				)}'')`
			);
		}

		// GET [baseUrl]/Patient?deceased=[deceased]
		if ($('parameters').contains('deceased')) {
			const deceased = $('parameters').getParameter('deceased');

			switch (deceased) {
				case 'false':
					whereArray[0].push(
						`(patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''N'')`
					);
					break;
				case 'true':
					whereArray[0].push(
						`(patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''Y'')`
					);
					break;
				default:
					break;
			}
		}

		// GET [baseUrl]/Patient?email=[email]
		if ($('parameters').contains('email')) {
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_Email = ''${$(
					'parameters'
				).getParameter('email')}'')`
			);
		}

		// GET [baseUrl]/Patient?family=[family]
		if ($('parameters').contains('family')) {
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_Name = ''${$(
					'parameters'
				).getParameter('family')}'')`
			);
		}

		// GET [baseUrl]/Patient?gender=[code]
		if ($('parameters').contains('gender')) {
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_Sex_DR->CTSEX_Desc = ''${$(
					'parameters'
				).getParameter('gender')}'')`
			);
		}

		// GET [baseUrl]/Patient?given=[given]
		if ($('parameters').contains('given')) {
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_Name2 = ''${$(
					'parameters'
				).getParameter('given')}'')`
			);
		}

		/**
		 * GET [baseUrl]/Patient?identifier=[system]|[code]
		 * GET [baseUrl]/Patient?identifier=[code]
		 */
		if ($('parameters').contains('identifier')) {
			if ($('parameters').getParameter('identifier').contains('|')) {
				const identifierParam = String(
					$('parameters').getParameter('identifier')
				).split('|');
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						identifierParam[0]
					) == 'https://fhir.nhs.uk/Id/nhs-number'
				) {
					whereArray[0].push(
						`(patmas.PAPMI_ID = ''${identifierParam[1]}'')`
					);

					whereArray[1].push(
						`(NOK_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''${identifierParam[1]}'' AND PAPMI_Active IS NULL))`
					);
				}
				if (
					Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
						identifierParam[0]
					) == 'https://fhir.ydh.nhs.uk/Id/local-patient-identifier'
				) {
					whereArray[0].push(
						`(patmas.PAPMI_No = ''${identifierParam[1]}'')`
					);

					whereArray[1].push(
						`(NOK_PAPMI_ParRef->PAPMI_No = ''${identifierParam[1]}'')`
					);
				}
			} else {
				whereArray[0].push(
					`(patmas.PAPMI_No = ''${$('parameters').getParameter(
						'identifier'
					)}'')`
				);

				whereArray[1].push(
					`(NOK_PAPMI_ParRef->PAPMI_No = ''${$(
						'parameters'
					).getParameter('identifier')}'')`
				);
			}
		}

		// GET [baseUrl]/Patient?name=[name]
		if ($('parameters').contains('name')) {
			const name = $('parameters').getParameter('name');
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_Name = ''${name}'' OR patmas.PAPMI_PAPER_DR->PAPER_Name2 = ''${name}'')`
			);
		}

		// GET [baseUrl]/Patient?phone=[phone]
		if ($('parameters').contains('phone')) {
			const phone = $('parameters').getParameter('phone');
			whereArray[0].push(
				`(patmas.PAPMI_PAPER_DR->PAPER_TelH = ''${phone}'' OR patmas.PAPMI_PAPER_DR->PAPER_TelO = ''${phone}'' OR patmas.PAPMI_PAPER_DR->PAPER_MobPhone = ''${phone}'')`
			);
		}
	}

	// Aggregrate all predicates in whereArray and build SQL WHERE clause from it
	const wherePredicates = [];
	for (let index = 0; index < whereArray.length; index += 1) {
		const element = whereArray[index];
		if (element.length > 0) {
			wherePredicates[index] = element.join(' AND ');
		}
	}

	if (wherePredicates.length == 0) {
		throw Error('Error searching resources.');
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

		// Add returned FHIR resources to bundle resource
		const resourceOuter = {};
		resourceOuter.resource = data;
		resourceOuter.fullUrl = `${$cfg('apiUrl') + $('contextPath')}/${
			data.id
		}`;
		bundle.entry.push(resourceOuter);
	}

	bundle.total = bundle.entry.length;
	bundle.link[0].url = $cfg('apiUrl') + $('uri');
	logger.debug(JSON.stringify(bundle));

	const response = FhirResponseFactory.getSearchResponse(
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
		'STU3',
		500,
		error
	);
}
