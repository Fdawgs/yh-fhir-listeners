/**
	Builds Encounter FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} Encounter FHIR resource.
 */
function buildEncounterResource(data) {
	/**
	 * Hard-coding meta profile and resourceType into resource as this should not
	 * be changed for this resource, ever.
	 */
	var resource = {
		meta: {
			profile: [
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1'
			]
		},
		resourceType: 'Encounter'
	};

	resource.id = newStringOrUndefined(getResultSetString(data, 'encounterIdentifier'));
	resource.status = newStringOrUndefined(getResultSetString(data, 'encounterStatusMapped'));

	// Add meta data
	if (getResultSetString(data, 'lastUpdated') != undefined
		&& getResultSetString(data, 'lastUpdated').substring(0, 1) != 'T'
		&& getResultSetString(data, 'lastUpdated').substring(0, 4) != '1900') {
		resource.meta.lastUpdated = getResultSetString(data, 'lastUpdated');
	}

	if (getResultSetString(data, 'encounterClassDesc') != undefined) {
		resource.class = {
			system: 'http://hl7.org/fhir/v3/ActEncounterCode',
			code: newStringOrUndefined(getResultSetString(data, 'encounterClassCode')),
			display: newStringOrUndefined(getResultSetString(data, 'encounterClassDesc'))
		};
	}

	if (getResultSetString(data, 'encounterTypeCode') != undefined) {
		resource.type = {
			coding: [{
				system: 'https://fhir.nhs.uk/STU3/CodeSystem/DCH-Specialty-1',
				code: newStringOrUndefined(getResultSetString(data, 'encounterTypeCode')),
				display: newStringOrUndefined(getResultSetString(data, 'encounterTypeDesc'))
			}]
		};
	}

	resource.period = {};
	if (getResultSetString(data, 'encounterPeriodStart') != undefined
		&& getResultSetString(data, 'encounterPeriodStart').substring(0, 1) != 'T'
		&& getResultSetString(data, 'encounterPeriodStart').substring(0, 4) != '1900') {
		resource.period.start = getResultSetString(data, 'encounterPeriodStart');
	}
	if (getResultSetString(data, 'encounterPeriodEnd') != undefined
		&& getResultSetString(data, 'encounterPeriodEnd').substring(0, 1) != 'T'
		&& getResultSetString(data, 'encounterPeriodEnd').substring(0, 4) != '1900') {
		resource.period.end = getResultSetString(data, 'encounterPeriodEnd');
	}

	// Add admission and discharge inpatient details
	resource.hospitalization = {};
	resource.hospitalization.extension = [
		{
			url: newStringOrUndefined('https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-AdmissionMethod-1'),
			valueCodeableConcept: {
				coding: [{
					system: newStringOrUndefined('https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-AdmissionMethod-1'),
					code: newStringOrUndefined(getResultSetString(data, 'encounterAdmissionmethodCodingCode')),
					display: newStringOrUndefined(getResultSetString(data, 'encounterAdmissionmethodCodingDesc'))

				}]
			}
		},
		{
			url: newStringOrUndefined('https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-DischargeMethod-1'),
			valueCodeableConcept: {
				coding: [{
					system: newStringOrUndefined('https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-DischargeMethod-1'),
					code: newStringOrUndefined(getResultSetString(data, 'encounterDischargemethodCodingCode')),
					display: newStringOrUndefined(getResultSetString(data, 'encounterDischargemethodCodingDesc'))

				}]
			}
		}
	];

	resource.hospitalization.admitSource = {
		coding: [{
			system: newStringOrUndefined('https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-SourceOfAdmission-1'),
			code: newStringOrUndefined(getResultSetString(data, 'encounterHospitalizationAdmitsourceCodingCode')),
			display: newStringOrUndefined(getResultSetString(data, 'encounterHospitalizationAdmitsourceCodingDesc'))
		}]
	};
	resource.hospitalization.dischargeDisposition = {
		coding: [{
			system: newStringOrUndefined('https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-DischargeDestination-1'),
			code: newStringOrUndefined(getResultSetString(data, 'encounterHospitalizationDischargedispositionCodingCode')),
			display: newStringOrUndefined(getResultSetString(data, 'encounterHospitalizationDischargedispositionCodingDesc'))
		}]
	};

	resource.subject = {
		reference: $cfg('apiUrl') + '/r3/Patient/' + getResultSetString(data, 'subjectReference')
	};

	return resource;
}
