/**
	Builds MedicationStatement FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-MedicationStatement-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} MedicationStatement FHIR resource.
 */
function buildMedicationStatementResource(data) {
	var result = getResultSet(data);

	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	var resource = {
		meta: {
			profile: [
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-MedicationStatement-1'
			]
		},

		resourceType: 'MedicationStatement'
	};

	resource.id = newStringOrUndefined(result.medstatId);
	resource.status = newStringOrUndefined(result.medstatStatusCode);

	// Add meta data
	if (
		result.lastUpdated != undefined &&
		result.lastUpdated.substring(0, 1) != 'T' &&
		result.lastUpdated.substring(0, 4) != '1900'
	) {
		resource.meta.lastUpdated = result.lastUpdated;
	}

	resource.medicationReference = {
		reference: newStringOrUndefined('#'.concat(result.medicationId))
	};

	// Add contained Medication resource
	var contained = [];
	if (result.medicationId != undefined) {
		var containedMedication = {
			resourceType: 'Medication',
			id: result.medicationId,
			code: {
				coding: [
					{
						code: newStringOrUndefined(
							result.medicationCodeCodingCode
						),

						display: newStringOrUndefined(
							result.medicationCodeCodingDisplay
						)
					}
				],

				text: result.medicationCodeText
			}
		};

		contained.push(containedMedication);

		if (
			result.medicationCodeCodingCode != undefined &&
			result.medicationCodeCodingDisplay != undefined
		) {
			containedMedication.code.coding[0].system =
				'https://snomed.info/sct';
		}
	}

	if (contained.length > 0) {
		resource.contained = contained;
	}

	// Add dosages
	var dosage = [];
	var dosageObject = {
		patientInstruction: newStringOrUndefined(
			result.medstatDosagePatientinstruction
		),

		route: {
			text: newStringOrUndefined(result.medstatDosageRouteText)
		}
	};

	if (
		result.medstatDosageDoseQuantityValue != undefined &&
		result.medstatDosageDoseQuantityUnit != undefined
	) {
		dosageObject.doseQuantity = {
			value: newStringOrUndefined(result.medstatDosageDoseQuantityValue),
			unit: newStringOrUndefined(
				result.medstatDosageDoseQuantityUnit
			).toLowerCase()
		};
	}
	if (
		result.medstatDosageTimingRepeatDuration != undefined &&
		result.medstatDosageTimingRepeatDurationUnit != undefined &&
		result.medstatDosageTimingRepeatDurationUnit != 'DO'
	) {
		dosageObject.timing = {
			repeat: {
				duration: newStringOrUndefined(
					result.medstatDosageTimingRepeatDuration
				),

				durationUnit: newStringOrUndefined(
					result.medstatDosageTimingRepeatDurationUnit
				).toLowerCase()
			}
		};
	}

	dosage.push(dosageObject);
	if (dosage.length > 0) {
		resource.dosage = dosage;
	}

	resource.effectivePeriod = {};
	if (
		result.medstatEffectiveStart != undefined &&
		result.medstatEffectiveStart.substring(0, 1) != 'T' &&
		result.medstatEffectiveStart.substring(0, 4) != '1900'
	) {
		resource.effectivePeriod.start = result.medstatEffectiveStart;
	}
	if (
		result.medstatEffectiveEnd != undefined &&
		result.medstatEffectiveEnd.substring(0, 1) != 'T' &&
		result.medstatEffectiveEnd.substring(0, 4) != '1900'
	) {
		resource.effectivePeriod.end = result.medstatEffectiveEnd;
	}

	resource.subject = {
		reference: ''
			.concat($cfg('apiUrl'), '/r3/Patient/')
			.concat(result.medstatSubjectReference)
	};

	// Hard-coded as TrakCare doesn't record whether a patient has taken medication
	resource.taken = 'unk';

	return resource;
}
