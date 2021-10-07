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
		},
		resourceType: "Procedure",
	};

	// Add meta data
	if (
		result.lastUpdated != undefined &&
		result.lastUpdated.substring(0, 1) != "T" &&
		result.lastUpdated.substring(0, 4) != "1900"
	) {
		resource.meta.lastUpdated = result.lastUpdated;
	}

	resource.id = newStringOrUndefined(result.procedureId);
	resource.status = newStringOrUndefined(result.procedureStatus);

	resource.subject = {
		reference: `${$cfg("apiUrl")}/STU3/Patient/${
			result.procedureSubjectReference
		}`,
	};

	if (
		result.procedurePerformedDateTime != undefined &&
		result.procedurePerformedDateTime.substring(0, 1) != "T" &&
		result.procedurePerformedDateTime.substring(0, 4) != "1900"
	) {
		resource.performedDateTime = newStringOrUndefined(
			result.procedurePerformedDateTime
		);
	}

	// Add code.coding[*]
	if (result.procedureCode != undefined && result.procedureCode != null) {
		resource.code = { coding: JSON.parse(result.procedureCode) };
	}

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
	const extension = [];
	// Add Date Recorded extension
	if (
		result.procedureDateRecordedDateTime != undefined &&
		result.procedureDateRecordedDateTime.substring(0, 1) != "T" &&
		result.procedureDateRecordedDateTime.substring(0, 4) != "1900"
	) {
		extension.push({
			url: newStringOrUndefined(
				"https://fhir.hl7.org.uk/StructureDefinition/Extension-CareConnect-DateRecorded-1"
			),
			valueDateTime: newStringOrUndefined(
				result.procedureDateRecordedDateTime
			),
		});
	}

	if (extension.length > 0) {
		resource.extension = extension;
	}

	return resource;
}
