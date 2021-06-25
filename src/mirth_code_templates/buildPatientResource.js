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
		result.nhsNumberTraceStatusCode == undefined ||
		result.nhsNumberTraceStatusCode == null ||
		result.nhsNumberTraceStatusCode == "0"
	) {
		result.nhsNumberTraceStatusCode = "2";
		result.nhsNumberTraceStatusDesc = "Number present but not traced";
	}

	if (result.deceased == undefined || result.deceased == null) {
		result.deceased = false;
	} else {
		result.deceased = true;
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
		},
		resourceType: newStringOrUndefined("Patient"),
		identifier: [
			{
				use: newStringOrUndefined("usual"),
				system: newStringOrUndefined(
					"https://fhir.ydh.nhs.uk/Id/local-patient-identifier"
				),
				value: newStringOrUndefined(result.patientNo),
			},
		],
		name: [
			{
				use: newStringOrUndefined("usual"),
				family: newStringOrUndefined(result.nameFamily),
				given: result.nameGiven1First,
				prefix: result.namePrefix,
			},
		],
		gender: newStringOrUndefined(result.gender),
		birthDate: newStringOrUndefined(result.birthdate),
		deceasedBoolean: newBooleanOrUndefined(result.deceased),
		address: [
			{
				use: newStringOrUndefined("home"),
				type: newStringOrUndefined("postal"),
				line: [
					newStringOrUndefined(result.addressLine1),
					newStringOrUndefined(result.addressLine2),
				],
				city: newStringOrUndefined(result.city),
				district: newStringOrUndefined(result.district),
				postalCode: newStringOrUndefined(result.postalCode),
			},
		],
		id: newStringOrUndefined(result.patientNo),
		language: newStringOrUndefined("English (Great Britain)"),
	};

	// Add meta data
	if (
		result.lastUpdated != undefined &&
		result.lastUpdated.substring(0, 1) != "T" &&
		result.lastUpdated.substring(0, 1) != "1900"
	) {
		resource.meta.lastUpdated = newStringOrUndefined(result.lastUpdated);
	}

	// Add NHS No
	if (result.nhsNumber != undefined) {
		const nhsIdentifier = {
			use: newStringOrUndefined("official"),
			system: newStringOrUndefined("https://fhir.nhs.uk/Id/nhs-number"),
			value: newStringOrUndefined(result.nhsNumber),
			extension: [
				{
					url: newStringOrUndefined(
						"https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-NHSNumberVerificationStatus-1"
					),
					valueCodeableConcept: {
						coding: [
							{
								system: newStringOrUndefined(
									"https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-NHSNumberVerificationStatus-1"
								),
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

	resource.contact = [];

	// Add Next of kin contact details
	if (result.contactName != undefined) {
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

		if (result.contactPhone != undefined) {
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
	if (result.schoolName != undefined) {
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

		if (result.schoolPhone != undefined) {
			const contactTelecom = [
				{
					system: "phone",
					value: newStringOrUndefined(result.schoolPhone),
				},
			];
			schoolContact.telecom = contactTelecom;
		}

		resource.contact.push(schoolContact);
	}

	// Add YDH Switchboard contact details
	const switchboardContact = {
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
	};

	resource.contact.push(switchboardContact);

	// Add Telecom contact details
	const telecom = [];
	if (result.homePhone != undefined) {
		const homePhone = {
			system: newStringOrUndefined("phone"),
			value: newStringOrUndefined(result.homePhone),
			use: newStringOrUndefined("home"),
		};
		telecom.push(homePhone);
	}
	if (result.mobilePhone != undefined) {
		const mobilePhone = {
			system: newStringOrUndefined("phone"),
			value: newStringOrUndefined(result.mobilePhone),
			use: newStringOrUndefined("mobile"),
		};
		telecom.push(mobilePhone);
	}
	if (result.businessPhone != undefined) {
		const businessPhone = {
			system: newStringOrUndefined("phone"),
			value: newStringOrUndefined(result.businessPhone),
			use: newStringOrUndefined("work"),
		};
		telecom.push(businessPhone);
	}
	if (result.email != undefined) {
		const email = {
			system: newStringOrUndefined("email"),
			value: newStringOrUndefined(result.email),
		};
		telecom.push(email);
	}
	if (telecom.length > 0) {
		resource.telecom = telecom;
	}

	// Extensions (Care Connect or otherwise)
	const extension = [];
	// Add Ethnic Category extension
	if (result.ethnicCategoryCode != undefined) {
		const ethCatExtension = {
			url: newStringOrUndefined(
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-EthnicCategory-1"
			),
			valueCodeableConcept: {
				coding: [
					{
						system: newStringOrUndefined(
							"https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-EthnicCategory-1"
						),
						code: newStringOrUndefined(
							result.ethnicCategoryCareConnectCode
						),
						display: newStringOrUndefined(
							result.ethnicCategoryCareConnectDesc
						),
					},
					{
						system: newStringOrUndefined(
							"https://trakcare.ydh.nhs.uk"
						),
						code: newStringOrUndefined(result.ethnicCategoryCode),
						display: newStringOrUndefined(
							result.ethnicCategoryDesc
						),
					},
				],
			},
		};
		extension.push(ethCatExtension);
	}

	// Add Religious Affiliation extension
	if (result.religiousAffiliationCode != undefined) {
		const relAffExtension = {
			url: newStringOrUndefined(
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-ReligiousAffiliation-1"
			),
			valueCodeableConcept: {
				coding: [
					{
						system: newStringOrUndefined(
							"https://datadictionary.nhs.uk"
						),
						code: newStringOrUndefined(
							result.religiousAffiliationCode
						),
						display: newStringOrUndefined(
							result.religiousAffiliationDesc
						),
					},
				],
			},
		};
		extension.push(relAffExtension);
	}

	// Add NHS Communication extension
	if (result.preferredLanguageCode != undefined) {
		const nhsComExtension = {
			url: newStringOrUndefined(
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-NHSCommunication-1"
			),
			extension: [
				{
					url: "language",
					valueCodeableConcept: {
						coding: [
							{
								system: newStringOrUndefined(
									"https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-HumanLanguage-1"
								),
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
		if (
			result.interpreterRequired != undefined &&
			result.interpreterRequired != "NS"
		) {
			const intReqExtension = {
				url: "interpreterRequired",
			};

			if (result.interpreterRequired == "Y") {
				intReqExtension.valueBoolean = true;
			} else {
				intReqExtension.valueBoolean = false;
			}

			nhsComExtension.extension.push(intReqExtension);
		}

		extension.push(nhsComExtension);
	}

	if (extension.length > 0) {
		resource.extension = extension;
	}

	// Add contained GP organization resource
	const contained = [];
	if (result.gpIdentifier != undefined) {
		const containedOrganisation = {
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
					use: newStringOrUndefined("work"),
					type: newStringOrUndefined("both"),
					line: [
						newStringOrUndefined(result.gpAddressLine1),
						newStringOrUndefined(result.gpAddressLine2),
					],
					city: newStringOrUndefined(result.gpCity),
					postalCode: newStringOrUndefined(result.gpPostalCode),
				},
			],
		};
		contained.push(containedOrganisation);
	}
	if (contained.length > 0) {
		resource.contained = contained;
	}

	// Add GP
	const generalPractitioner = [];
	if (result.gpIdentifier != undefined) {
		const gpReference = {
			reference: newStringOrUndefined(`#${result.gpIdentifier}`),
			display: newStringOrUndefined(result.gpDesc),
		};
		generalPractitioner.push(gpReference);
	}

	if (generalPractitioner.length > 0) {
		resource.generalPractitioner = generalPractitioner;
	}

	// Add Marital Status
	if (
		result.maritalStatusCode != undefined &&
		result.maritalStatusDesc != undefined
	) {
		resource.maritalStatus = {
			coding: [
				{
					system: newStringOrUndefined(
						"https://hl7.org/fhir/stu3/v3/MaritalStatus"
					),
					code: newStringOrUndefined(result.maritalStatusCode),
					display: newStringOrUndefined(result.maritalStatusDesc),
				},
			],
		};
	}

	// If patient has a 'Do Not Distribute Patient Address' alert, strip out contact details
	if (result.DND != undefined) {
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
