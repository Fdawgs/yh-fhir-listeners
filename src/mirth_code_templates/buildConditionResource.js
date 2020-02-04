/**
	Builds Condition FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Condition-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} Condition FHIR resource.
 */
function buildConditionResource(data) {
	const result = getResultSet(data);
	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	const resource = {
		meta: {
			profile: [
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Condition-1'
			]
		},
		resourceType: 'Condition'
	};

	return resource;
}
