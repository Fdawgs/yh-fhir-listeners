/* eslint-disable security/detect-object-injection */
/**
	Builds Patient FHIR resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} Patient FHIR resource.
 */
function buildPatientResource(data) {
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

	if (
		!result.nhsNumberTraceStatusCode ||
		result.nhsNumberTraceStatusCode == "0"
	) {
		result.nhsNumberTraceStatusCode = "2";
		result.nhsNumberTraceStatusDesc = "Number present but not traced";
	}

	if (!result.secondaryIdentifiers) {
		result.secondaryIdentifiers = JSON.stringify({ identifier: [] });
	}

	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	const resource = {
		fullUrl: `${$cfg("apiUrl") + $("contextPath")}/${result.patientNo}`,
		meta: {
			profile: [
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1",
			],
			lastUpdated:
				result.lastUpdated && !/^(T|1900)/m.test(result.lastUpdated)
					? result.lastUpdated
					: undefined,
		},
		resourceType: "Patient",
		id: newStringOrUndefined(result.patientNo),
		language: "English (Great Britain)",
		contained: [],
		identifier: JSON.parse(result.secondaryIdentifiers).identifier,
		name: [
			{
				use: "usual",
				family: newStringOrUndefined(result.nameFamily),
				given: newStringOrUndefined(result.nameGiven1First),
				prefix: newStringOrUndefined(result.namePrefix),
			},
		],
		telecom: [],
		gender: newStringOrUndefined(result.gender),
		birthDate: newStringOrUndefined(result.birthDate),
		deceasedDateTime:
			result.deceasedDateTime &&
			!/^(T|1900)/m.test(result.deceasedDateTime)
				? newStringOrUndefined(result.deceasedDateTime)
				: undefined,
		address: [
			{
				use: "home",
				type: "postal",
				line: [
					newStringOrUndefined(result.addressLine1),
					newStringOrUndefined(result.addressLine2),
				],
				city: newStringOrUndefined(result.city),
				district: newStringOrUndefined(result.district),
				postalCode: newStringOrUndefined(result.postalCode),
			},
		],
		contact: [
			// YDH Switchboard always present
			{
				name: {
					use: "anonymous",
					text: "Switchboard",
				},
				telecom: [
					{
						system: "phone",
						value: "01935475122",
					},
				],
				organization: {
					reference:
						"https://directory.spineservices.nhs.uk/STU3/Organization/RA4",
					display: "YEOVIL DISTRICT HOSPITAL NHS FOUNDATION TRUST",
				},
			},
		],
		generalPractitioner: [],
		extension: [],
	};

	// Add Local Patient ID
	resource.identifier.push({
		use: "usual",
		system: "https://fhir.ydh.nhs.uk/Id/local-patient-identifier",
		value: newStringOrUndefined(result.patientNo),
	});

	// Add NHS No
	if (result.nhsNumber) {
		const nhsIdentifier = {
			use: "official",
			system: "https://fhir.nhs.uk/Id/nhs-number",
			value: newStringOrUndefined(result.nhsNumber),
			extension: [
				{
					url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-NHSNumberVerificationStatus-1",
					valueCodeableConcept: {
						coding: [
							{
								system: "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-NHSNumberVerificationStatus-1",
								code: newStringOrUndefined(
									pad(result.nhsNumberTraceStatusCode, 2)
								),
								display: newStringOrUndefined(
									result.nhsNumberTraceStatusDesc
								),
							},
						],
					},
				},
			],
		};
		resource.identifier.push(nhsIdentifier);
	}

	// Add Next of kin contact details
	if (result.contactName) {
		const nokContact = {
			relationship: {
				coding: [
					{
						system: "https://hl7.org/fhir/v2/0131",
						code: "N",
						display: "Next-of-kin",
					},
				],
			},
			name: {
				use: "usual",
				text: newStringOrUndefined(result.contactName),
			},
		};

		if (result.contactPhone) {
			const contactTelecom = [
				{
					system: "phone",
					value: newStringOrUndefined(result.contactPhone),
				},
			];
			nokContact.telecom = contactTelecom;
		}

		resource.contact.push(nokContact);
	}

	// Add school contact details
	if (result.schoolName) {
		const schoolContact = {
			relationship: {
				coding: [
					{
						system: "https://trakcare.ydh.nhs.uk",
						code: "SCH",
						display: "School",
					},
				],
			},
			name: {
				use: "anonymous",
				text: "School nurse",
			},
			organization: {
				identifier: {
					system: "https://trakcare.ydh.nhs.uk",
					value: newStringOrUndefined(result.schoolId),
				},
				display: newStringOrUndefined(result.schoolName),
			},
		};

		if (result.schoolPhone) {
			schoolContact.telecom = [
				{
					system: "phone",
					value: newStringOrUndefined(result.schoolPhone),
				},
			];
		}

		resource.contact.push(schoolContact);
	}

	// Add Telecom contact details
	if (result.homePhone) {
		resource.telecom.push({
			system: "phone",
			value: newStringOrUndefined(result.homePhone),
			use: "home",
		});
	}
	if (result.mobilePhone) {
		resource.telecom.push({
			system: "phone",
			value: newStringOrUndefined(result.mobilePhone),
			use: "mobile",
		});
	}
	if (result.businessPhone) {
		resource.telecom.push({
			system: "phone",
			value: newStringOrUndefined(result.businessPhone),
			use: "work",
		});
	}
	if (result.email) {
		resource.telecom.push({
			system: "email",
			value: newStringOrUndefined(result.email),
		});
	}

	// Extensions (Care Connect or otherwise)

	// Add Ethnic Category extension
	if (result.ethnicCategoryCode) {
		resource.extension.push({
			url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-EthnicCategory-1",
			valueCodeableConcept: {
				coding: [
					{
						system: "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-EthnicCategory-1",
						code: newStringOrUndefined(
							result.ethnicCategoryCareConnectCode
						),
						display: newStringOrUndefined(
							result.ethnicCategoryCareConnectDesc
						),
					},
					{
						system: "https://trakcare.ydh.nhs.uk",
						code: newStringOrUndefined(result.ethnicCategoryCode),
						display: newStringOrUndefined(
							result.ethnicCategoryDesc
						),
					},
				],
			},
		});
	}

	// Add Religious Affiliation extension
	if (result.religiousAffiliationCode) {
		resource.extension.push({
			url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-ReligiousAffiliation-1",
			valueCodeableConcept: {
				coding: [
					{
						system: "https://datadictionary.nhs.uk",
						code: newStringOrUndefined(
							result.religiousAffiliationCode
						),
						display: newStringOrUndefined(
							result.religiousAffiliationDesc
						),
					},
				],
			},
		});
	}

	// Add NHS Communication extension
	if (result.preferredLanguageCode) {
		const nhsComExtension = {
			url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-NHSCommunication-1",
			extension: [
				{
					url: "language",
					valueCodeableConcept: {
						coding: [
							{
								system: "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-HumanLanguage-1",
								code: newStringOrUndefined(
									result.preferredLanguageCode
								),
								display: newStringOrUndefined(
									result.preferredLanguageDesc
								),
							},
						],
					},
				},
			],
		};

		// Add interpreterRequired extension to NHS Communication extensions array
		if (result.interpreterRequired && result.interpreterRequired != "NS") {
			nhsComExtension.extension.push({
				url: "interpreterRequired",
				valueBoolean: result.interpreterRequired == "Y",
			});
		}

		resource.extension.push(nhsComExtension);
	}

	// Add contained GP organization resource
	if (result.gpIdentifier) {
		resource.contained.push({
			resourceType: "Organization",
			id: newStringOrUndefined(result.gpIdentifier),
			meta: {
				profile: [
					"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1",
				],
			},
			name: newStringOrUndefined(result.gpDesc),
			address: [
				{
					use: "work",
					type: "both",
					line: [
						newStringOrUndefined(result.gpAddressLine1),
						newStringOrUndefined(result.gpAddressLine2),
					],
					city: newStringOrUndefined(result.gpCity),
					postalCode: newStringOrUndefined(result.gpPostalCode),
				},
			],
		});
	}

	// Add GP
	if (result.gpIdentifier) {
		resource.generalPractitioner.push({
			reference: newStringOrUndefined(`#${result.gpIdentifier}`),
			display: newStringOrUndefined(result.gpDesc),
		});
	}

	// Add Marital Status
	if (result.maritalStatusCode && result.maritalStatusDesc) {
		resource.maritalStatus = {
			coding: [
				{
					system: "https://hl7.org/fhir/stu3/v3/MaritalStatus",
					code: newStringOrUndefined(result.maritalStatusCode),
					display: newStringOrUndefined(result.maritalStatusDesc),
				},
			],
		};
	}

	// If patient has a 'Do Not Distribute Patient Address' alert, strip out contact details
	if (result.DND) {
		delete resource.telecom;
		delete resource.address;
		resource.meta.security = [
			{
				system: "https://hl7.org/fhir/ValueSet/v3-Confidentiality",
				code: "R",
				display: "restricted",
			},
		];
	}

	return resource;
}
