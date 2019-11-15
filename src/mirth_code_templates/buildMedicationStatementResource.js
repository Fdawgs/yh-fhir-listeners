/**
	Builds MedicationStatement FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-MedicationStatement-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} MedicationStatement FHIR resource.
 */
function buildMedicationStatementResource(data) {
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

	resource.id = newStringOrUndefined(getResultSetString(data, 'medstatId'));

	resource.effective = {};
	if (getResultSetString(data, 'medstatEffectiveStart') != undefined
		&& getResultSetString(data, 'medstatEffectiveStart').substring(0, 1) != 'T'
		&& getResultSetString(data, 'medstatEffectiveStart').substring(0, 4) != '1900') {
		resource.effective.start = getResultSetString(data, 'medstatEffectiveStart');
	}
	if (getResultSetString(data, 'medstatEffectiveEnd') != undefined
		&& getResultSetString(data, 'medstatEffectiveEnd').substring(0, 1) != 'T'
		&& getResultSetString(data, 'medstatEffectiveEnd').substring(0, 4) != '1900') {
		resource.effective.end = getResultSetString(data, 'medstatEffectiveEnd');
	}

	resource.subject = {
		reference: $cfg('apiUrl') + '/r3/patient/' + getResultSetString(data, 'medstatSubjectReference')
	};

	return resource;
}
