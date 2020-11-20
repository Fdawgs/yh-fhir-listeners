/**
	Builds AllergyIntolerance FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} AllergyIntolerance FHIR resource.
 */
function buildAllergyIntoleranceResource(data) {
	var result = getResultSet(data);

	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	var resource = {
		meta: {
			profile: [
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-AllergyIntolerance-1'
			]
		},

		resourceType: 'AllergyIntolerance'
	};

	// Add meta data
	if (
		result.lastUpdated != undefined &&
		result.lastUpdated.substring(0, 1) != 'T' &&
		result.lastUpdated.substring(0, 4) != '1900'
	) {
		resource.meta.lastUpdated = result.lastUpdated;
	}

	//	Add SIDeR specific tag
	resource.meta.tag = [
		{
			system:
				'https://fhir.blackpear.com/ui/shared-care-record-visibility',
			code: 'none',
			display: 'Do not Display'
		}
	];

	resource.id = newStringOrUndefined(result.id);
	resource.assertedDate = newStringOrUndefined(result.assertedDate);

	// Very unlikely that an allergy record will have multiple components like this
	// but better to be safe than sorry
	var allergyResult = [];
	allergyResult.push(newStringOrUndefined(result.allergyGroupDesc));
	allergyResult.push(newStringOrUndefined(result.allergyCodingDesc));
	allergyResult.push(newStringOrUndefined(result.allergyDrugDesc));
	allergyResult.push(newStringOrUndefined(result.allergyDrugGenericDesc));
	allergyResult.push(newStringOrUndefined(result.allergyDrugCategoryDesc));
	allergyResult.push(newStringOrUndefined(result.allergyDrugFormDesc));
	allergyResult.push(newStringOrUndefined(result.allergyDrugIngredientDesc));
	allergyResult.push(newStringOrUndefined(result.allergyComment));
	allergyResult = allergyResult.filter(function (element) {
		return element != null;
	});
	if (allergyResult.length > 0) {
		resource.code = {
			text: allergyResult.join('; ')
		};
	}

	resource.patient = {
		reference: ''
			.concat($cfg('apiUrl'), '/r3/Patient/')
			.concat(result.patientReference)
	};

	resource.clinicalStatus = newStringOrUndefined(result.clinicalStatusCode);
	resource.verificationStatus = newStringOrUndefined(
		result.verificationStatusCode
	);

	resource.type = newStringOrUndefined(result.typeCode);
	resource.criticality = newStringOrUndefined(result.criticalityCode);

	return resource;
}
