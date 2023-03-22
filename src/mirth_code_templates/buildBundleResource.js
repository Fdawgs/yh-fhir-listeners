/**
 * @author Frazer Smith
 * @description Builds Bundle FHIR Resource that adheres to the HL7 spec,
 * see https://hl7.org/fhir/STU3/bundle.html for more info.
 * @param {string} requestUrl - URL that GET request was made to.
 * @returns {object} Bundle FHIR resource.
 */
function buildBundleResource(requestUrl) {
	const resource = {
		resourceType: "Bundle",
		type: "searchset",
		total: 0,
		link: [
			{
				relation: "self",
				url: newStringOrUndefined(requestUrl),
			},
		],
		entry: [],
	};

	return resource;
}
