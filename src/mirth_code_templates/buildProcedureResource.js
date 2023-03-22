/* eslint-disable security/detect-object-injection */
/**
	Builds Procedure FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} Procedure FHIR resource.
 */
function buildProcedureResource(data) {
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
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Procedure-1",
			],
			lastUpdated:
				result.lastUpdated && !/^(T|1900)/m.test(result.lastUpdated)
					? result.lastUpdated
					: undefined,
		},
		resourceType: "Procedure",
		id: newStringOrUndefined(result.id),
		status: newStringOrUndefined(result.procedureStatus),
		subject: {
			reference: `${$cfg("apiUrl")}/STU3/Patient/${
				result.procedureSubjectReference
			}`,
		},
		performedDateTime:
			result.procedurePerformedDateTime &&
			!/^(T|1900)/m.test(result.procedurePerformedDateTime)
				? newStringOrUndefined(result.procedurePerformedDateTime)
				: undefined,
		code: result.procedureCode
			? { coding: JSON.parse(result.procedureCode) }
			: undefined,
		extension: [],
	};

	// TODO: Fix inaccurate bodySite groupings in ./src/sql/CC-Procedure-Resource-Direct-Read.sql
	// Add bodySite.coding[*]
	// if (
	// 	result.procedureBodySiteCode != undefined &&
	// 	result.procedureBodySiteCode != null
	// ) {
	// 	resource.bodySite = {
	// 		coding: JSON.parse(result.procedureBodySiteCode),
	// 	};
	// }

	// Extensions (Care Connect or otherwise)

	// Add Date Recorded extension
	if (
		result.procedureDateRecordedDateTime &&
		!/^(T|1900)/m.test(result.procedureDateRecordedDateTime)
	) {
		resource.extension.push({
			url: "https://fhir.hl7.org.uk/StructureDefinition/Extension-CareConnect-DateRecorded-1",
			valueDateTime: newStringOrUndefined(
				result.procedureDateRecordedDateTime
			),
		});
	}

	return resource;
}
