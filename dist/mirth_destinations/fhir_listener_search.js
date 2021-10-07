/**
 * @author Frazer Smith
 * @description Rewritten example FHIR search destination to be usable for TrakCare calls.
 * Mirth Connect supports ES6 to a degree but not template literals and const/let.
 */

try {
	var type = $("fhirType").toLowerCase();

	// Append URL with forward slash and build Java URL object
	var requestURL = $("url");
	if (!requestURL.endsWith("/")) {
		requestURL += "/";
	}
	var bundle = buildBundleResource(new java.net.URI(requestURL));
	// Turn array into multi-dimensional one to allow for up to four seperate WHERE clauses to be built
	var whereArray = [[], [], [], []];

	var supportedTypeParams = {
		allergyintolerance: [
			"clinical-status",
			"criticality",
			"date",
			"patient",
			"patient.identifier",
			"type",
		],

		condition: [
			"asserted-date",
			"category",
			"clinical-status",
			"patient",
			"patient.identifier",
		],

		encounter: [
			"class",
			"date",
			"patient",
			"patient.identifier",
			"status",
			"type",
		],

		flag: ["date", "patient", "patient.identifier", "status"],
		medicationstatement: [
			"effective",
			"patient",
			"patient.identifier",
			"status",
		],

		patient: [
			"address",
			"address-city",
			"address-postalcode",
			"birthdate",
			"deceased",
			"email",
			"family",
			"gender",
			"given",
			"identifier",
			"name",
			"phone",
		],

		procedure: ["date", "identifier", "patient", "patient.identifier"],
	};

	// If any param not supported, reject request
	$("parameters")
		.getKeys()
		.forEach(function (key) {
			if (
				supportedTypeParams[type.toLowerCase()].indexOf(
					"".concat(key.toLowerCase().trim())
				) < 0
			) {
				throw Error(
					""
						.concat(
							key,
							" is not a valid search query parameter for "
						)
						.concat(type.toLowerCase(), "s")
				);
			}
		});

	/**
	 * ================================
	 * AllergyIntolerance search params
	 * ================================
	 */
	if (type == "allergyintolerance") {
		// GET [baseUrl]/AllergyIntolerance?patient=[id]
		if ($("parameters").contains("patient")) {
			whereArray[0].push(
				"(alle.ALG_PAPMI_ParRef->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/AllergyIntolerance?patient.identifier=[system]|[code]
		if ($("parameters").contains("patient.identifier")) {
			if (
				$("parameters").getParameter("patient.identifier").contains("|")
			) {
				var allergyPatIdParam = String(
					$("parameters").getParameter("patient.identifier")
				).split("|");

				switch (
					"".concat(
						Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
							allergyPatIdParam[0]
						)
					)
				) {
					case "https://fhir.nhs.uk/Id/nhs-number":
						whereArray[0].push(
							"(alle.ALG_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
								allergyPatIdParam[1],
								"'' AND PAPMI_Active IS NULL))"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/local-patient-identifier":
					default:
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
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("clinical-status")
		) {
			// Loop through each clinical-status param and build SQL WHERE clause
			var clinicalStatusArray = $("parameters")
				.getParameterList("clinical-status")
				.toArray();

			if (clinicalStatusArray[0].substring(0, 1) == "[") {
				clinicalStatusArray = JSON.parse(clinicalStatusArray[0]);
			}

			allintClinicalStatusArray = [];

			clinicalStatusArray.forEach(function (clinicalStatusParam) {
				var clinicalStatus = clinicalStatusParam;
				clinicalStatus += "";

				allintClinicalStatusArray.push(
					"(clinicalStatusCode = '".concat(clinicalStatus, "')")
				);
			});

			if (allintClinicalStatusArray.length > 0) {
				whereArray[3].push(
					"(".concat(allintClinicalStatusArray.join(" OR "), ")")
				);
			}
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&criticality=[code]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("criticality")
		) {
			// Loop through each criticality param and build SQL WHERE clause
			var criticalityArray = $("parameters")
				.getParameterList("criticality")
				.toArray();

			if (criticalityArray[0].substring(0, 1) == "[") {
				criticalityArray = JSON.parse(criticalityArray[0]);
			}

			allintCriticalityArray = [];

			criticalityArray.forEach(function (criticalityParam) {
				var criticality = criticalityParam;
				criticality += "";

				allintCriticalityArray.push(
					"(criticalityCode = '".concat(criticality, "')")
				);
			});

			if (allintCriticalityArray.length > 0) {
				whereArray[3].push(
					"(".concat(allintCriticalityArray.join(" OR "), ")")
				);
			}
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&date=[date]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("date")
		) {
			// Loop through each date param and build SQL WHERE clause
			var dateArray = $("parameters").getParameterList("date").toArray();

			if (dateArray[0].substring(0, 1) == "[") {
				dateArray = JSON.parse(dateArray[0]);
			}

			dateArray.forEach(function (dateParam) {
				var date = dateParam;
				date += "";

				var operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[0].push(
					"(alle.ALG_Date "
						.concat(operator, " ''")
						.concat(date, "'')")
				);
			});
		}

		// GET [baseUrl]/AllergyIntolerance?patient=[id]&type=[code]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("type")
		) {
			// Loop through each criticality param and build SQL WHERE clause
			var typeArray = $("parameters").getParameterList("type").toArray();

			if (typeArray[0].substring(0, 1) == "[") {
				typeArray = JSON.parse(typeArray[0]);
			}

			allintTypeArray = [];

			typeArray.forEach(function (typeParam) {
				var typeP = typeParam;
				typeP += "";

				allintTypeArray.push("(typeCode = '".concat(typeP, "')"));
			});

			if (allintTypeArray.length > 0) {
				whereArray[3].push(
					"(".concat(allintTypeArray.join(" OR "), ")")
				);
			}
		}
	}

	/**
	 * =======================
	 * Condition search params
	 * =======================
	 */
	if (type == "condition") {
		// GET [baseUrl]/Condition?patient=[id]&asserted-date=[date]
		if ($("parameters").contains("asserted-date")) {
			whereArray[0].push("");
		}

		// GET [baseUrl]/Condition?patient=[id]&category=[code]
		if ($("parameters").contains("category")) {
			whereArray[0].push("");
		}

		// GET [baseUrl]/Condition?patient=[id]&clinical-status=[code]
		if ($("parameters").contains("clinical-status")) {
			whereArray[0].push("");
		}

		/**
		 * GET [baseUrl]/Condition?patient.identifier=[system]|[code]
		 * GET [baseUrl]/Condition?patient=[id]
		 */
		if ($("parameters").contains("patient")) {
			whereArray[0].push("");
		}
	}

	/**
	 * =======================
	 * Encounter search params
	 * =======================
	 */
	if (type == "encounter") {
		// GET [baseUrl]/Encounter?patient=[id]
		if ($("parameters").contains("patient")) {
			// Build where clause for first query (outpats) in union
			whereArray[0].push(
				"(app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);

			// Build where clause for second query (inpats, emerg) in union
			whereArray[1].push(
				"(PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);

			// Build where clause for subquery for inpat consultants
			whereArray[2].push(
				"(TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Encounter?patient.identifier=[system]|[code]
		if ($("parameters").contains("patient.identifier")) {
			if (
				$("parameters").getParameter("patient.identifier").contains("|")
			) {
				var encounterPatIdParam = String(
					$("parameters").getParameter("patient.identifier")
				).split("|");

				switch (
					"".concat(
						Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
							encounterPatIdParam[0]
						)
					)
				) {
					case "https://fhir.nhs.uk/Id/nhs-number":
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

						break;

					case "https://fhir.ydh.nhs.uk/Id/local-patient-identifier":
					default:
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
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("date")
		) {
			// Loop through each date param and build SQL WHERE clause
			var _dateArray = $("parameters").getParameterList("date").toArray();

			if (_dateArray[0].substring(0, 1) == "[") {
				_dateArray = JSON.parse(_dateArray[0]);
			}

			_dateArray.forEach(function (dateParam) {
				var date = dateParam;
				date += "";

				var operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[3].push(
					"(CONCAT(COALESCE(encounterPeriodStartDate, ''), 'T', COALESCE(encounterPeriodStartTime, '')) "
						.concat(operator, " '")
						.concat(date, "')")
				);
			});
		}

		// GET [baseUrl]/Encounter?patient=[id]&class=[token]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("class")
		) {
			// Loop through each class param and build SQL WHERE clause
			var classArray = $("parameters")
				.getParameterList("class")
				.toArray();

			if (classArray[0].substring(0, 1) == "[") {
				classArray = JSON.parse(classArray[0]);
			}

			encounterClassArray = [];

			classArray.forEach(function (classParam) {
				var classP = classParam;
				classP += "";

				var classCode = {
					inpatient: "IMP",
					outpatient: "AMB",
					emergency: "EMER",
				};

				encounterClassArray.push(
					"(encounterClassCode = '".concat(
						classCode[classP.toLowerCase()],
						"')"
					)
				);
			});

			if (encounterClassArray.length > 0) {
				whereArray[3].push(
					"(".concat(encounterClassArray.join(" OR "), ")")
				);
			}
		}

		// GET [baseUrl]/Encounter?patient=[id]&type=[code]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("type")
		) {
			// Loop through each type param and build SQL WHERE clause
			var _typeArray = $("parameters").getParameterList("type").toArray();

			if (_typeArray[0].substring(0, 1) == "[") {
				_typeArray = JSON.parse(_typeArray[0]);
			}

			encounterTypeArray = [];

			_typeArray.forEach(function (typeParam) {
				var typeP = typeParam;
				typeP += "";

				// Build where clause for fourth query
				encounterTypeArray.push(
					"(encounterTypeCode = '".concat(typeP, "')")
				);
			});

			if (encounterTypeArray.length > 0) {
				whereArray[3].push(
					"(".concat(encounterTypeArray.join(" OR "), ")")
				);
			}
		}

		// GET [baseUrl]/Encounter?patient=[id]&status=[token]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("status")
		) {
			// Loop through each status param and build SQL WHERE clause
			var statusArray = $("parameters")
				.getParameterList("status")
				.toArray();

			if (statusArray[0].substring(0, 1) == "[") {
				statusArray = JSON.parse(statusArray[0]);
			}

			encounterStatusArray = [];

			statusArray.forEach(function (statusParam) {
				var status = statusParam;
				status += "";

				// Build where clause for fourth query
				encounterStatusArray.push(
					"(encounterStatusMapped = '".concat(status, "')")
				);
			});

			if (encounterStatusArray.length > 0) {
				whereArray[3].push(
					"(".concat(encounterStatusArray.join(" OR "), ")")
				);
			}
		}
	}

	/**
	 * =======================
	 * Flag search params
	 * =======================
	 */
	if (type == "flag") {
		// GET [baseUrl]/Flag?patient=[id]
		if ($("parameters").contains("patient")) {
			whereArray[0].push(
				"(alert.ALM_PAPMI_ParRef->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Flag?patient.identifier=[system]|[code]
		if ($("parameters").contains("patient.identifier")) {
			if (
				$("parameters").getParameter("patient.identifier").contains("|")
			) {
				var flagPatIdParam = String(
					$("parameters").getParameter("patient.identifier")
				).split("|");

				switch (
					"".concat(
						Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
							flagPatIdParam[0]
						)
					)
				) {
					case "https://fhir.nhs.uk/Id/nhs-number":
						whereArray[0].push(
							"(alert.ALM_PAPMI_ParRef->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
								flagPatIdParam[1],
								"'' AND PAPMI_Active IS NULL))"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/local-patient-identifier":
					default:
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
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("date")
		) {
			// Loop through each date param and build SQL WHERE clause
			var _dateArray2 = $("parameters")
				.getParameterList("date")
				.toArray();

			if (_dateArray2[0].substring(0, 1) == "[") {
				_dateArray2 = JSON.parse(_dateArray2[0]);
			}

			_dateArray2.forEach(function (dateParam) {
				var date = dateParam;
				date += "";

				var operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[1].push(
					"(periodStart ".concat(operator, " '").concat(date, "')")
				);
			});
		}

		// GET [baseUrl]/Flag?patient=[id]&status=[code]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("status")
		) {
			whereArray[1].push(
				"(flagStatusCode = ''".concat(
					$("parameters").getParameter("status"),
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
	if (type == "medicationstatement") {
		// GET [baseUrl]/MedicationStatement?patient=[id]&effective=[date]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("effective")
		) {
			// Loop through each effective param and build SQL WHERE clause
			var _dateArray3 = $("parameters")
				.getParameterList("effective")
				.toArray();

			if (_dateArray3[0].substring(0, 1) == "[") {
				_dateArray3 = JSON.parse(_dateArray3[0]);
			}

			_dateArray3.forEach(function (dateParam) {
				var date = dateParam;
				date += "";

				var operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[1].push(
					"(medstatEffectiveStart "
						.concat(operator, " '")
						.concat(date, "')")
				);
			});
		}

		// GET [baseUrl]/MedicationStatement?patient=[id]
		if ($("parameters").contains("patient")) {
			whereArray[0].push(
				"(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/MedicationStatement?patient.identifier=[system]|[code]
		if ($("parameters").contains("patient.identifier")) {
			if (
				$("parameters").getParameter("patient.identifier").contains("|")
			) {
				var medStatPatIdParam = String(
					$("parameters").getParameter("patient.identifier")
				).split("|");

				switch (
					"".concat(
						Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
							medStatPatIdParam[0]
						)
					)
				) {
					case "https://fhir.nhs.uk/Id/nhs-number":
						whereArray[0].push(
							"(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
								medStatPatIdParam[1],
								"'' AND PAPMI_Active IS NULL))"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/local-patient-identifier":
					default:
						whereArray[0].push(
							"(oi.OEORI_OEORD_ParRef->OEORD_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
								medStatPatIdParam[1],
								"'')"
							)
						);

						break;
				}
			}
		}

		// GET [baseUrl]/MedicationStatement?patient=[id]&status=[code]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("status")
		) {
			whereArray[1].push(
				"(medstatStatusCode = '".concat(
					$("parameters").getParameter("status"),
					"')"
				)
			);
		}
	}

	/**
	 * =====================
	 * Patient search params
	 * =====================
	 */
	if (type == "patient") {
		// GET [baseUrl]/Patient?address=[address]
		if ($("parameters").contains("address")) {
			var address = $("parameters").getParameter("address");
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
		if ($("parameters").contains("address-city")) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_CityCode_DR->CTCIT_Desc = ''".concat(
					$("parameters").getParameter("address-city"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?address-postalcode=[address-postalcode]
		if ($("parameters").contains("address-postalcode")) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Zip_DR->CTZIP_Code = ''".concat(
					$("parameters").getParameter("address-postalcode"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?birthdate=[date]
		if ($("parameters").contains("birthdate")) {
			whereArray[0].push(
				"(patmas.PAPMI_DOB = ''".concat(
					$("parameters").getParameter("birthdate"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?deceased=[deceased]
		if ($("parameters").contains("deceased")) {
			var deceased = $("parameters").getParameter("deceased");

			switch ("".concat(deceased)) {
				case "false":
					whereArray[0].push(
						"(patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''N'')"
					);

					break;
				case "true":
					whereArray[0].push(
						"(patmas.PAPMI_PAPER_DR->PAPER_Deceased = ''Y'')"
					);

					break;
				default:
					break;
			}
		}

		// GET [baseUrl]/Patient?email=[email]
		if ($("parameters").contains("email")) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Email = ''".concat(
					$("parameters").getParameter("email"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?family=[family]
		if ($("parameters").contains("family")) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Name = ''".concat(
					$("parameters").getParameter("family"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?gender=[code]
		if ($("parameters").contains("gender")) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Sex_DR->CTSEX_Desc = ''".concat(
					$("parameters").getParameter("gender"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Patient?given=[given]
		if ($("parameters").contains("given")) {
			whereArray[0].push(
				"(patmas.PAPMI_PAPER_DR->PAPER_Name2 = ''".concat(
					$("parameters").getParameter("given"),
					"'')"
				)
			);
		}

		/**
		 * GET [baseUrl]/Patient?identifier=[system]|[code]
		 * GET [baseUrl]/Patient?identifier=[code]
		 */
		if ($("parameters").contains("identifier")) {
			if ($("parameters").getParameter("identifier").contains("|")) {
				var identifierParam = String(
					$("parameters").getParameter("identifier")
				).split("|");

				switch (
					"".concat(
						Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
							identifierParam[0]
						)
					)
				) {
					case "https://fhir.ydh.nhs.uk/Id/korner-number":
						whereArray[0].push(
							"(patmas.PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''KOR'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[1].push(
							"(NOK_PAPMI_ParRef->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''KOR'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[2].push(
							"(RTMAS_PatNo_DR->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''KOR'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/legacy-hospital-number":
						whereArray[0].push(
							"(patmas.PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''HSP'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[1].push(
							"(NOK_PAPMI_ParRef->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''HSP'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[2].push(
							"(RTMAS_PatNo_DR->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''HSP'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/local-patient-identifier":
					default:
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

						whereArray[2].push(
							"(RTMAS_PatNo_DR->PAPMI_No = ''".concat(
								identifierParam[1],
								"'')"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/medical-record-number":
						whereArray[0].push(
							"(patmas.PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''GEN'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[1].push(
							"(NOK_PAPMI_ParRef->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''GEN'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[2].push(
							"(RTMAS_PatNo_DR->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''GEN'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						break;

					case "https://fhir.nhs.uk/Id/nhs-number":
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

						whereArray[2].push(
							"(RTMAS_PatNo_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
								identifierParam[1],
								"'' AND PAPMI_Active IS NULL))"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/x-ray-number":
						whereArray[0].push(
							"(patmas.PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''XRA'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[1].push(
							"(NOK_PAPMI_ParRef->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''XRA'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						whereArray[2].push(
							"(RTMAS_PatNo_DR->PAPMI_No = (SELECT RTMAS_PatNo_DR->PAPMI_No FROM RT_Master WHERE RTMAS_MRType_DR->TYP_Code = ''XRA'' AND RTMAS_MRNo = ''".concat(
								identifierParam[1],
								"''))"
							)
						);

						break;
				}
			} else {
				whereArray[0].push(
					"(patmas.PAPMI_No = ''".concat(
						$("parameters").getParameter("identifier"),
						"'')"
					)
				);

				whereArray[1].push(
					"(NOK_PAPMI_ParRef->PAPMI_No = ''".concat(
						$("parameters").getParameter("identifier"),
						"'')"
					)
				);

				whereArray[2].push(
					"(RTMAS_PatNo_DR->PAPMI_No = ''".concat(
						$("parameters").getParameter("identifier"),
						"'')"
					)
				);
			}
		}

		// GET [baseUrl]/Patient?name=[name]
		if ($("parameters").contains("name")) {
			var name = $("parameters").getParameter("name");
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
		if ($("parameters").contains("phone")) {
			var phone = $("parameters").getParameter("phone");
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

	/**
	 * =======================
	 * Procedure search params
	 * =======================
	 */
	if (type == "procedure") {
		// GET [baseUrl]/Procedure?patient=[id]&date=[date]
		if (
			($("parameters").contains("patient") ||
				$("parameters").contains("patient.identifier")) &&
			$("parameters").contains("date")
		) {
			// Loop through each date param and build SQL WHERE clause
			var _dateArray4 = $("parameters")
				.getParameterList("date")
				.toArray();

			if (_dateArray4[0].substring(0, 1) == "[") {
				_dateArray4 = JSON.parse(_dateArray4[0]);
			}

			_dateArray4.forEach(function (dateParam) {
				var date = dateParam;
				date += "";

				var operator = convertFhirParameterOperator(
					date.substring(0, 2)
				);

				if (isNaN(date.substring(0, 2))) {
					date = date.substring(2, date.length);
				}

				whereArray[0].push(
					"(proc.PROC_ProcDate "
						.concat(operator, " ''")
						.concat(date, "'')")
				);

				whereArray[1].push(
					"(proc.PROC_ProcDate "
						.concat(operator, " ''")
						.concat(date, "'')")
				);

				whereArray[2].push(
					"(proc.PROC_ProcDate "
						.concat(operator, " ''")
						.concat(date, "'')")
				);
			});
		}

		// GET [baseUrl]/Procedure?identifier=[id]
		if ($("parameters").contains("identifier")) {
			whereArray[0].push(
				"(proc.PROC_RowID = REPLACE(''".concat(
					$("parameters").getParameter("identifier"),
					"'', ''-'', ''||''))"
				)
			);

			// whereArray[1] not needed as that is joined on operation ID, not procedure/rowID
			whereArray[2].push(
				"(proc.PROC_RowID = REPLACE(''".concat(
					$("parameters").getParameter("identifier"),
					"'', ''-'', ''||''))"
				)
			);
		}

		// GET [baseUrl]/Procedure?patient=[id]
		if ($("parameters").contains("patient")) {
			whereArray[0].push(
				"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);

			whereArray[1].push(
				"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);

			whereArray[2].push(
				"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
					$("parameters").getParameter("patient"),
					"'')"
				)
			);
		}

		// GET [baseUrl]/Procedure?patient.identifier=[system]|[code]
		if ($("parameters").contains("patient.identifier")) {
			if (
				$("parameters").getParameter("patient.identifier").contains("|")
			) {
				var procPatIdParam = String(
					$("parameters").getParameter("patient.identifier")
				).split("|");

				switch (
					"".concat(
						Packages.org.apache.commons.lang3.StringEscapeUtils.unescapeHtml4(
							procPatIdParam[0]
						)
					)
				) {
					case "https://fhir.nhs.uk/Id/nhs-number":
						whereArray[0].push(
							"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
								procPatIdParam[1],
								"'' AND PAPMI_Active IS NULL))"
							)
						);

						whereArray[1].push(
							"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
								procPatIdParam[1],
								"'' AND PAPMI_Active IS NULL))"
							)
						);

						whereArray[2].push(
							"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = (SELECT PAPMI_No FROM PA_PatMas pm WHERE pm.PAPMI_ID = ''".concat(
								procPatIdParam[1],
								"'' AND PAPMI_Active IS NULL))"
							)
						);

						break;

					case "https://fhir.ydh.nhs.uk/Id/local-patient-identifier":
					default:
						whereArray[0].push(
							"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
								procPatIdParam[1],
								"'')"
							)
						);

						whereArray[1].push(
							"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
								procPatIdParam[1],
								"'')"
							)
						);

						whereArray[2].push(
							"(proc.PROC_ParRef->MRADM_ADM_DR->PAADM_PAPMI_DR->PAPMI_No = ''".concat(
								procPatIdParam[1],
								"'')"
							)
						);

						break;
				}
			}
		}
	}

	// Aggregrate all predicates in whereArray and build SQL WHERE clause from it
	var wherePredicates = [];
	for (var index = 0; index < whereArray.length; index += 1) {
		var element = whereArray[index];
		if (element.length > 0) {
			wherePredicates[index] = element.join(" AND ");
		}
	}

	if (wherePredicates.length == 0) {
		throw Error("Error searching resources.");
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

		// Add returned FHIR resources to bundle resource
		var resourceOuter = {};
		resourceOuter.resource = data;
		resourceOuter.fullUrl = ""
			.concat($cfg("apiUrl") + $("contextPath"), "/")
			.concat(data.id);

		bundle.entry.push(resourceOuter);
	}

	bundle.total = bundle.entry.length;
	bundle.link[0].url = $cfg("apiUrl") + $("uri");
	logger.debug(JSON.stringify(bundle));

	var response = FhirResponseFactory.getSearchResponse(
		JSON.stringify(bundle),
		200,
		"application/fhir+json"
	);

	responseMap.put("response", response);
	return response.getMessage();
} catch (error) {
	return createOperationOutcome(
		"error",
		"transient",
		"Error searching resources.",
		"STU3",
		500,
		error
	);
}
