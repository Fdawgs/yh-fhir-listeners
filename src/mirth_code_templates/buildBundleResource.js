/**
	Builds Bundle FHIR Resource that adheres to the HL7 spec,
	see https://hl7.org/fhir/STU3/bundle.html for more info.
 
	@author Frazer Smith
	@param {string} requestUrl - URL that GET request was made to.
	@returns {object} Bundle FHIR resource.
 */
function buildBundleResource(requestUrl) {
	const resource = {
		resourceType: newStringOrUndefined("Bundle"),
		type: newStringOrUndefined("searchset"),
		total: 0,
		link: [],
		entry: [],
	};
	// Add link URL
	if (requestUrl) {
		const linkEntry = {
			relation: newStringOrUndefined("self"),
			url: newStringOrUndefined(requestUrl),
		};

		resource.link.push(linkEntry);
	}

	return resource;
}
