/* eslint-disable security/detect-object-injection */
/**
	Builds Flag FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Flag-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} Flag FHIR resource.
 */
function buildFlagResource(data) {
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
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Flag-1",
			],
		},
		resourceType: "Flag",
	};

	// Add meta data
	if (
		result.lastUpdated != undefined &&
		result.lastUpdated.substring(0, 1) != "T" &&
		result.lastUpdated.substring(0, 4) != "1900"
	) {
		resource.meta.lastUpdated = result.lastUpdated;
	}

	/**
	 * Add SIDeR specific tags
	 * Set tag to 'Do not Display' if not in set of accepted SNOMED codes or if inactive
	 */
	const siderAcceptedFlagSnomedCodes = [
		"13790001000004100",
		"15188001",
		"32000005",
		"713673000",
	];
	if (
		result.flagStatusCode == "inactive" ||
		!siderAcceptedFlagSnomedCodes.includes(result.flagCodeCodingSnomedCode)
	) {
		resource.meta.tag = [
			{
				system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
				code: "none",
				display: "Do not Display",
			},
		];
	} else {
		resource.meta.tag = [
			{
				system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
				code: "summary",
				display: "Display in Summary and Detail View",
			},
		];
	}

	resource.id = newStringOrUndefined(result.flagId);
	resource.status = newStringOrUndefined(result.flagStatusCode);

	if (result.flagCategoryCodingCode != undefined) {
		resource.category = {
			coding: [
				{
					system: "https://trakcare.ydh.nhs.uk",
					code: newStringOrUndefined(result.flagCategoryCodingCode),
					display: newStringOrUndefined(
						result.flagCategoryCodingDisplay
					),
				},
			],
		};
	}

	resource.code = {
		coding: [],
	};

	if (result.flagCodeCodingCode != undefined) {
		const ydhCode = {
			system: "https://trakcare.ydh.nhs.uk",
			code: newStringOrUndefined(result.flagCodeCodingCode),
			display: newStringOrUndefined(result.flagCodeCodingDisplay),
		};
		resource.code.coding.push(ydhCode);
	}

	if (result.flagCodeCodingSnomedCode != undefined) {
		const snomedCode = {
			system: "https://snomed.info/sct",
			code: newStringOrUndefined(result.flagCodeCodingSnomedCode),
			display: newStringOrUndefined(result.flagCodeCodingSnomedDisplay),
		};
		resource.code.coding.push(snomedCode);
	}

	resource.period = {};
	if (
		result.periodStart != undefined &&
		result.periodStart.substring(0, 1) != "T" &&
		result.periodStart.substring(0, 4) != "1900"
	) {
		resource.period.start = result.periodStart;
	}
	if (
		result.periodStart != undefined &&
		result.periodStart.substring(0, 1) != "T" &&
		result.periodStart.substring(0, 4) != "1900"
	) {
		resource.period.end = result.periodStart;
	}

	resource.subject = {
		reference: `${$cfg("apiUrl")}/STU3/Patient/${
			result.flagSubjectReference
		}`,
	};

	return resource;
}
