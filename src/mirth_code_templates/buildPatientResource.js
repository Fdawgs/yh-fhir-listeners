/**
	Builds Patient FHIR resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} Patient FHIR resource.
 */
function buildPatientResource(data) {
  var result = {};
  result.lastUpdated = getResultSetString(data, 'lastUpdated');
  result.nhsNumber = getResultSetString(data, 'nhsNumber');
  result.nhsNumberTraceStatusCode = getResultSetString(data, 'nhsNumberTraceStatusCode');
  result.nhsNumberTraceStatusDesc = getResultSetString(data, 'nhsNumberTraceStatusDesc');
  if (result.nhsNumberTraceStatusCode == undefined) {
    result.nhsNumberTraceStatusCode = '2';
    result.nhsNumberTraceStatusDesc = 'Number present but not traced';
  }
  result.gpName = getResultSetString(data, 'gpDesc');
  result.gpAddressLine1 = getResultSetString(data, 'gpAddressLine1');
  result.gpAddressLine2 = getResultSetString(data, 'gpAddressLine2');
  result.gpCity = getResultSetString(data, 'gpCity');
  result.gpPostalCode = getResultSetString(data, 'gpPostalCode');
  result.gpIdentifier = getResultSetString(data, 'gpIdentifier');
  result.patientNo = getResultSetString(data, 'PatientNo');
  result.active = getResultSetString(data, 'active');
  result.ethnicCategoryDesc = getResultSetString(data, 'ethnicCategoryDesc');
  result.ethnicCategoryCode = getResultSetString(data, 'ethnicCategoryCode');
  result.homePhone = getResultSetString(data, 'homePhone');
  result.businessPhone = getResultSetString(data, 'businessPhone');
  result.mobilePhone = getResultSetString(data, 'mobilePhone');
  result.appointmentSMS = getResultSetString(data, 'appointmentSMS');
  result.email = getResultSetString(data, 'email');
  result.preferredContactMethod = getResultSetString(data, 'preferredContactMethod');
  result.preferredLanguage = getResultSetString(data, 'preferredLanguage');
  result.interpreterRequired = getResultSetString(data, 'interpreterRequired');
  result.nameFamily = getResultSetString(data, 'nameFamily');
  result.nameGiven1First = getResultSetString(data, 'nameGiven1First');
  result.nameGiven2Middle = getResultSetString(data, 'nameGiven2Middle');
  result.namePrefix = getResultSetString(data, 'namePrefix');
  result.maritalStatusDesc = getResultSetString(data, 'maritalStatusDesc');
  result.maritalStatusCode = getResultSetString(data, 'maritalStatusCode');
  result.addressLine1 = getResultSetString(data, 'addressLine1');
  result.addressLine2 = getResultSetString(data, 'addressLine2');
  result.city = getResultSetString(data, 'city');
  result.district = getResultSetString(data, 'district');
  result.postalCode = getResultSetString(data, 'postalCode');
  result.gender = getResultSetString(data, 'gender');
  result.birthdate = getResultSetString(data, 'birthdate');
  result.deceased = getResultSetString(data, 'deceased');
  if (result.deceased == undefined) {
    result.deceased = false;
  } else {
    result.deceased = true;
  }

  result.contactName = getResultSetString(data, 'contactName');
  result.contactPhone = getResultSetString(data, 'contactPhone');
  result.contactText = getResultSetString(data, 'contactText');
  result.DND = getResultSetString(data, 'DND'); // restricted patient

  /**
   * Hard-coding meta profile and resourceType into resource as this should not
   * be changed for this resource, ever.
   */
  var resource = {
    fullUrl: $cfg('apiUrl') + $('contextPath') + '/' + result.patientNo,
    meta: {
      profile: ['https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Patient-1']
    },
    resourceType: newStringOrUndefined('Patient'),
    identifier: [
      {
        use: newStringOrUndefined('usual'),
        system: newStringOrUndefined('https://fhir.ydh.nhs.uk/Id/local-patient-identifier'),
        value: newStringOrUndefined(result.patientNo)
      }
    ],
    name: [
      {
        use: newStringOrUndefined('usual'),
        family: newStringOrUndefined(result.nameFamily),
        given: result.nameGiven1First,
        prefix: result.namePrefix
      }
    ],
    gender: newStringOrUndefined(result.gender),
    birthDate: newStringOrUndefined(result.birthdate),
    deceasedBoolean: newBooleanOrUndefined(result.deceased),
    address: [
      {
        use: newStringOrUndefined('home'),
        type: newStringOrUndefined('postal'),
        line: [newStringOrUndefined(result.addressLine1), newStringOrUndefined(result.addressLine2)],
        city: newStringOrUndefined(result.city),
        district: newStringOrUndefined(result.district),
        postalCode: newStringOrUndefined(result.postalCode)
      }
    ],
    id: newStringOrUndefined(result.patientNo),
    language: newStringOrUndefined('English (Great Britain)')
  };

  // Add meta data
  if (
    result.lastUpdated != undefined &&
    result.lastUpdated.substring(0, 1) != 'T' &&
    result.lastUpdated.substring(0, 1) != '1900'
  ) {
    resource.meta.lastUpdated = newStringOrUndefined(result.lastUpdated);
  }

  // Add NHS No
  if (result.nhsNumber != undefined) {
    var nhsIdentifier = {
      use: newStringOrUndefined('official'),
      system: newStringOrUndefined('https://fhir.nhs.uk/Id/nhs-number'),
      value: newStringOrUndefined(result.nhsNumber),
      extension: [
        {
          url: newStringOrUndefined(
            'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-NHSNumberVerificationStatus-1'
          ),
          valueCodeableConcept: {
            coding: [
              {
                system: newStringOrUndefined(
                  'https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-NHSNumberVerificationStatus-1'
                ),
                code: newStringOrUndefined(result.nhsNumberTraceStatusCode),
                display: newStringOrUndefined(result.nhsNumberTraceStatusDesc)
              }
            ]
          }
        }
      ]
    };
    resource.identifier.push(nhsIdentifier);
  }

  // Add Next of kin contact details
  if (result.contactName != undefined) {
    var contact = {
      relationship: {
        coding: [
          {
            system: 'http://hl7.org/fhir/v2/0131',
            code: 'N',
            display: 'Next-of-kin'
          }
        ]
      },
      name: [
        {
          use: 'usual',
          text: newStringOrUndefined(result.contactName)
        }
      ]
    };

    if (result.contactPhone != undefined) {
      var contactTelecom = [
        {
          system: 'phone',
          value: newStringOrUndefined(result.contactPhone)
        }
      ];
      contact.telecom = contactTelecom;
    }

    resource.contact = contact;
  }

  // Add Telecom contact details
  var telecom = [];
  if (result.homePhone != undefined) {
    var homePhone = {
      system: newStringOrUndefined('phone'),
      value: newStringOrUndefined(result.homePhone),
      use: newStringOrUndefined('home')
    };
    telecom.push(homePhone);
  }
  if (result.mobilePhone != undefined) {
    var mobilePhone = {
      system: newStringOrUndefined('phone'),
      value: newStringOrUndefined(result.mobilePhone),
      use: newStringOrUndefined('mobile')
    };
    telecom.push(mobilePhone);
  }
  if (result.email != undefined) {
    var email = {
      system: newStringOrUndefined('email'),
      value: newStringOrUndefined(result.email)
    };
    telecom.push(email);
  }
  if (telecom.length > 0) {
    resource.telecom = telecom;
  }

  // Add Ethnical Category
  var extension = [];
  if (result.ethnicCategoryCode != undefined) {
    var ethCatExtension = {
      url: newStringOrUndefined(
        'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-EthnicCategory-1'
      ),
      valueCodeableConcept: {
        coding: [
          {
            system: newStringOrUndefined('https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-EthnicCategory-1'),
            code: newStringOrUndefined(result.ethnicCategoryCode),
            display: newStringOrUndefined(result.ethnicCategoryDesc)
          }
        ]
      }
    };
    extension.push(ethCatExtension);
  }
  if (extension.length > 0) {
    resource.extension = extension;
  }

  // Add contained GP organization resource
  var contained = [];
  if (result.gpIdentifier != undefined) {
    var containedOrganisation = {
      resourceType: 'Organization',
      id: newStringOrUndefined(result.gpIdentifier),
      meta: {
        profile: ['https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Organization-1']
      },
      name: newStringOrUndefined(result.gpName),
      address: [
        {
          use: newStringOrUndefined('work'),
          type: newStringOrUndefined('both'),
          line: [newStringOrUndefined(result.gpAddressLine1), newStringOrUndefined(result.gpAddressLine2)],
          city: newStringOrUndefined(result.gpCity),
          postalCode: newStringOrUndefined(result.gpPostalCode)
        }
      ]
    };
    contained.push(containedOrganisation);
  }
  if (contained.length > 0) {
    resource.contained = contained;
  }

  // Add GP
  var generalPractitioner = [];
  if (result.gpIdentifier != undefined) {
    var gpReference = {
      reference: newStringOrUndefined('#' + result.gpIdentifier),
      display: newStringOrUndefined(result.gpName)
    };
    generalPractitioner.push(gpReference);
  }

  if (generalPractitioner.length > 0) {
    resource.generalPractitioner = generalPractitioner;
  }

  // Add Marital Status
  if (result.maritalStatusCode != undefined && result.maritalStatusDesc != undefined) {
    resource.maritalStatus = {
      coding: [
        {
          system: newStringOrUndefined('http://hl7.org/fhir/stu3/v3/MaritalStatus'),
          code: newStringOrUndefined(result.maritalStatusCode),
          display: newStringOrUndefined(result.maritalStatusDesc)
        }
      ]
    };
  }

  // If patient has a 'Do Not Distribute Patient Address' alert, strip out contact details
  if (result.DND != undefined) {
    delete resource.telecom;
    delete resource.address;
    resource.meta.security = [
      {
        system: 'http://hl7.org/fhir/ValueSet/v3-Confidentiality',
        code: 'R',
        display: 'restricted'
      }
    ];
  }

  return resource;
}
