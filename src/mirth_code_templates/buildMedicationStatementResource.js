/* eslint-disable security/detect-object-injection */
/**
	Builds MedicationStatement FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-MedicationStatement-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} MedicationStatement FHIR resource.
 */
function buildMedicationStatementResource(data) {
	const result = getResultSet(data);

	/**
	 * Set keys with empty string values as undefined.
	 * Unable to use `Object.keys(result).forEach` due to it being Java object
	 */
	for (let index = 0; index < Object.keys(result).length; index++) {
		if ("".concat(result[Object.keys(result)[index]]).trim() == "") {
			result[Object.keys(result)[index]] = undefined;
		}
	}

	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	const resource = {
		meta: {
			profile: [
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-MedicationStatement-1",
			],
			tag: [
				{
					system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
					code: "none",
					display: "Do not Display",
				},
			],
			lastUpdated:
				result.lastUpdated && !/^(T|1900)/m.test(result.lastUpdated)
					? result.lastUpdated
					: undefined,
		},
		resourceType: "MedicationStatement",
		id: newStringOrUndefined(result.medstatId),
		status: newStringOrUndefined(result.medstatStatusCode),
		contained: [
			{
				resourceType: "Medication",
				id: result.medicationId,
				code: {
					coding: [
						{
							code: newStringOrUndefined(
								result.medicationCodeCodingCode
							),
							display: newStringOrUndefined(
								result.medicationCodeCodingDisplay
							),
							system:
								result.medicationCodeCodingCode &&
								result.medicationCodeCodingDisplay
									? "https://snomed.info/sct"
									: undefined,
						},
					],
					text: newStringOrUndefined(result.medicationCodeText),
				},
			},
		],
		identifier: [
			{
				use: "usual",
				system: "https://fhir.ydh.nhs.uk/Id/order-item",
				value: newStringOrUndefined(result.medstatId),
			},
		],
		medicationReference: {
			reference: newStringOrUndefined(`#${result.medicationId}`),
		},
		note: result.note ? [{ text: result.note.trim() }] : undefined,
		context: result.medStatContextEncounterReference
			? {
					reference: `${$cfg("apiUrl")}/STU3/Encounter/${
						result.medStatContextEncounterReference
					}`,
			  }
			: undefined,
		effectivePeriod: {
			start:
				result.medstatEffectiveStart &&
				!/^(T|1900)/m.test(result.medstatEffectiveStart)
					? result.medstatEffectiveStart
					: undefined,
			end:
				result.medstatEffectiveEnd &&
				!/^(T|1900)/m.test(result.medstatEffectiveEnd)
					? result.medstatEffectiveEnd
					: undefined,
		},
		dateAsserted:
			result.medstatDateasserted &&
			!/^(T|1900)/m.test(result.medstatDateasserted)
				? result.medstatDateasserted
				: undefined,
		subject: {
			reference: `${$cfg("apiUrl")}/STU3/Patient/${
				result.medstatSubjectReference
			}`,
		},
		// Hard-coded as TrakCare does not record whether a patient has taken medication
		taken: "unk",
	};

	/**
	 * Add SIDeR specific tags
	 * Set tag for meds from within the last 60 days
	 */
	if (
		result.medstatEffectiveStart &&
		!/^(T|1900)/m.test(result.medstatEffectiveStart) &&
		Math.ceil(
			(new Date(result.medstatEffectiveStart) - new Date()) /
				(24 * 60 * 60 * 1000)
		) >= -60
	) {
		resource.meta.tag = [
			{
				system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
				code: "summary",
				display: "Display in Summary and Detail View",
			},
		];
	}

	// Add dosages
	resource.dosage = [
		{
			route: {
				text: newStringOrUndefined(result.medstatDosageRouteText),
			},
			patientInstruction: result.medstatDosagePatientinstruction
				? `${result.medstatDosagePatientinstruction}`
						.replace(/"/g, "")
						.trim()
				: undefined,
			doseQuantity:
				result.medstatDosageDoseQuantityValue &&
				result.medstatDosageDoseQuantityUnit
					? {
							value: newStringOrUndefined(
								result.medstatDosageDoseQuantityValue
							),
							unit: newStringOrUndefined(
								result.medstatDosageDoseQuantityUnit
							).toLowerCase(),
					  }
					: undefined,
			timing:
				result.medstatDosageTimingRepeatCount &&
				result.medstatDosageTimingRepeatPeriodunit &&
				result.medstatDosageTimingRepeatPeriodunit != "DO"
					? {
							repeat: {
								count: newStringOrUndefined(
									result.medstatDosageTimingRepeatCount
								),
								frequency: 1,
								period: 1.0,
								periodUnit: newStringOrUndefined(
									result.medstatDosageTimingRepeatPeriodunit
								).toLowerCase(),
							},
					  }
					: undefined,
			additionalInstruction: result.medstatDosageAdditionalinstruction
				? [
						{
							text: result.medstatDosageAdditionalinstruction.trim(),
						},
				  ]
				: undefined,
		},
	];

	return resource;
}
