/**
	Builds DocumentReference FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} DocumentReference FHIR resource.
 */
function buildDocumentReferenceResource(data) {
	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	var resource = {
		meta: {
			profile: [
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1'
			]
		},
		resourceType: 'DocumentReference'
	};

	return resource;
}
