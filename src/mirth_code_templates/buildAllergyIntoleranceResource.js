/**
	Builds AllergyIntolerance FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} AllergyIntolerance FHIR resource.
 */
function buildAllergyIntoleranceResource(data) {
	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	const resource = {
		meta: {
			profile: [
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1'
			]
		},
		resourceType: 'AllergyIntolerance'
	};

	// Add meta data
	if (
		getResultSetString(data, 'lastUpdated') != undefined &&
		getResultSetString(data, 'lastUpdated').substring(0, 1) != 'T' &&
		getResultSetString(data, 'lastUpdated').substring(0, 4) != '1900'
	) {
		resource.meta.lastUpdated = getResultSetString(data, 'lastUpdated');
	}

	resource.id = newStringOrUndefined(getResultSetString(data, 'id'));
	resource.assertedDate = newStringOrUndefined(
		getResultSetString(data, 'assertedDate')
	);

	// Very unlikely that an allergy record will have multiple components like this
	// but better to be safe than sorry
	let result = [];
	result.push(
		newStringOrUndefined(getResultSetString(data, 'allergyGroupDesc'))
	);
	result.push(
		newStringOrUndefined(getResultSetString(data, 'allergyCodingDesc'))
	);
	result.push(
		newStringOrUndefined(getResultSetString(data, 'allergyDrugDesc'))
	);
	result.push(
		newStringOrUndefined(getResultSetString(data, 'allergyDrugGenericDesc'))
	);
	result.push(
		newStringOrUndefined(
			getResultSetString(data, 'allergyDrugCategoryDesc')
		)
	);
	result.push(
		newStringOrUndefined(getResultSetString(data, 'allergyDrugFormDesc'))
	);
	result.push(
		newStringOrUndefined(
			getResultSetString(data, 'allergyDrugIngredientDesc')
		)
	);
	result.push(
		newStringOrUndefined(getResultSetString(data, 'allergyComment'))
	);
	result = result.filter((el) => el != null);
	if (result.length > 0) {
		resource.code = {
			text: result.join('; ')
		};
	}

	resource.patient = {
		reference:
			`${$cfg('apiUrl') 
			}/r3/Patient/${ 
			getResultSetString(data, 'patientReference')}`
	};

	resource.clinicalStatus = newStringOrUndefined(
		getResultSetString(data, 'clinicalStatusCode')
	);
	resource.verificationStatus = newStringOrUndefined(
		getResultSetString(data, 'verificationStatusCode')
	);
	resource.type = newStringOrUndefined(getResultSetString(data, 'typeCode'));
	resource.criticality = newStringOrUndefined(
		getResultSetString(data, 'criticalityCode')
	);

	return resource;
}
