/**
 * @author Frazer Smith
 * @description Builds Flag FHIR Resource that adheres to its Care-Connect profile,
 * see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Flag-1 for more info.
 * @param {object} data - Java RowSet object.
 * @returns {object} Flag FHIR resource.
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

	const resource = {
		meta: {
			profile: [
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Flag-1",
			],
			tag: [
				{
					system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
					code: "summary",
					display: "Display in Summary and Detail View",
				},
			],
			lastUpdated:
				result.lastUpdated && !/^(T|1900)/m.test(result.lastUpdated)
					? result.lastUpdated
					: undefined,
		},
		resourceType: "Flag",
		id: newStringOrUndefined(result.flagId),
		status: newStringOrUndefined(result.flagStatusCode),
		code: {
			coding: [],
		},
		period: {
			start:
				result.periodStart && !/^(T|1900)/m.test(result.periodStart)
					? result.periodStart
					: undefined,
			end:
				result.periodStart && !/^(T|1900)/m.test(result.periodStart)
					? result.periodStart
					: undefined,
		},
		subject: {
			reference: `${$cfg("apiUrl")}/STU3/Patient/${
				result.flagSubjectReference
			}`,
		},
	};

	/**
	 * Add SIDeR specific tags
	 * Set tag to 'Do not Display' if not in set of accepted SNOMED codes or if inactive
	 */
	const siderAcceptedFlagSnomedCodes = [
		"13790001000004100",
		"15188001",
		"32000005",
		"395073001",
		"397540003",
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
	}

	if (result.flagCategoryCodingCode) {
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

	if (result.flagCodeCodingCode) {
		resource.code.coding.push({
			system: "https://trakcare.ydh.nhs.uk",
			code: newStringOrUndefined(result.flagCodeCodingCode),
			display: newStringOrUndefined(result.flagCodeCodingDisplay),
		});
	}

	if (result.flagCodeCodingSnomedCode) {
		resource.code.coding.push({
			system: "https://snomed.info/sct",
			code: newStringOrUndefined(result.flagCodeCodingSnomedCode),
			display: newStringOrUndefined(result.flagCodeCodingSnomedDisplay),
		});
	}

	return resource;
}
