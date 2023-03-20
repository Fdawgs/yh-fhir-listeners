/* eslint-disable security/detect-object-injection */
/**
	Builds AllergyIntolerance FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} AllergyIntolerance FHIR resource.
 */
function buildAllergyIntoleranceResource(data) {
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
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1",
			],
			tag: [
				/**
				 * Add SIDeR specific tags
				 * Set tag to 'Do not Display' for all resources; decided by Paul Foster CCIO on 2020-11-19
				 * due to low number of allergies recorded in TrakCare PAS
				 */
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
		resourceType: "AllergyIntolerance",
		id: newStringOrUndefined(result.id),
		assertedDate: newStringOrUndefined(result.assertedDate),
		code: {
			coding: [],
		},
		patient: {
			reference: `${$cfg("apiUrl")}/STU3/Patient/${
				result.patientReference
			}`,
		},
		clinicalStatus: newStringOrUndefined(result.clinicalStatusCode),
		verificationStatus: newStringOrUndefined(result.verificationStatusCode),
		type: newStringOrUndefined(result.typeCode),
		criticality: newStringOrUndefined(result.criticalityCode),
		note: result.note ? [{ text: result.note.trim() }] : undefined,
	};

	if (result.allergyCodeCodingGroupCode) {
		resource.code.coding.push({
			system: "https://trakcare.ydh.nhs.uk",
			code: newStringOrUndefined(result.allergyCodeCodingGroupCode),
			display: newStringOrUndefined(result.allergyCodeCodingGroupDisplay),
		});
	}

	if (result.allergyCodeCodingCode) {
		resource.code.coding.push({
			system: "https://trakcare.ydh.nhs.uk",
			code: newStringOrUndefined(result.allergyCodeCodingCode),
			display: newStringOrUndefined(result.allergyCodeCodingDisplay),
		});
	}

	if (result.allergyCodeCodingDrugCode) {
		resource.code.coding.push({
			system: "https://trakcare.ydh.nhs.uk",
			code: newStringOrUndefined(result.allergyCodeCodingDrugCode),
			display: newStringOrUndefined(result.allergyCodeCodingDrugDisplay),
		});
	}

	return resource;
}
