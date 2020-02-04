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
	const resource = {
		meta: {
			profile: [
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1'
			]
		},
		resourceType: 'Encounter'
	};

	resource.id = newStringOrUndefined(
		getResultSetString(data, 'encounterIdentifier')
	);
	resource.status = newStringOrUndefined(
		getResultSetString(data, 'encounterStatusMapped')
	);

	// Add meta data
	if (
		getResultSetString(data, 'lastUpdated') != undefined &&
		getResultSetString(data, 'lastUpdated').substring(0, 1) != 'T' &&
		getResultSetString(data, 'lastUpdated').substring(0, 4) != '1900'
	) {
		resource.meta.lastUpdated = getResultSetString(data, 'lastUpdated');
	}

	if (getResultSetString(data, 'encounterClassDesc') != undefined) {
		resource.class = {
			system: 'http://hl7.org/fhir/v3/ActEncounterCode',
			code: newStringOrUndefined(
				getResultSetString(data, 'encounterClassCode')
			),
			display: newStringOrUndefined(
				getResultSetString(data, 'encounterClassDesc')
			)
		};
	}

	if (getResultSetString(data, 'encounterTypeCode') != undefined) {
		resource.type = {
			coding: [
				{
					system:
						'https://fhir.nhs.uk/STU3/CodeSystem/DCH-Specialty-1',
					code: newStringOrUndefined(
						getResultSetString(data, 'encounterTypeCode')
					),
					display: newStringOrUndefined(
						getResultSetString(data, 'encounterTypeDesc')
					)
				}
			]
		};
	}

	// Add participants
	resource.participant = [];
	if (
		getResultSetString(
			data,
			'encounterParticipantIndividualCode_admitting'
		) != undefined &&
		getResultSetString(
			data,
			'encounterParticipantIndividualCode_discharging'
		) != undefined &&
		getResultSetString(
			data,
			'encounterParticipantIndividualCode_discharging'
		) ===
			getResultSetString(
				data,
				'encounterParticipantIndividualCode_admitting'
			)
	) {
		const participantCombo = {
			type: [
				{
					coding: [
						{
							system: 'http://hl7.org/fhir/v3/ParticipationType',
							code: 'ADM',
							display: 'admitter'
						}
					]
				},
				{
					coding: [
						{
							system: 'http://hl7.org/fhir/v3/ParticipationType',
							code: 'DIS',
							display: 'discharger'
						}
					]
				}
			],
			individual: {
				identifier: getResultSetString(
					data,
					'encounterParticipantIndividualCode_admitting'
				),
				display: getResultSetString(
					data,
					'encounterParticipantIndividualDesc_admitting'
				)
			}
		};
		resource.participant.push(participantCombo);
	} else if (
		getResultSetString(
			data,
			'encounterParticipantIndividualCode_admitting'
		) != undefined
	) {
		const participantAdmitter = {
			type: [
				{
					coding: [
						{
							system: 'http://hl7.org/fhir/v3/ParticipationType',
							code: 'ADM',
							display: 'admitter'
						}
					]
				}
			],
			individual: {
				identifier: getResultSetString(
					data,
					'encounterParticipantIndividualCode_admitting'
				),
				display: getResultSetString(
					data,
					'encounterParticipantIndividualDesc_admitting'
				)
			}
		};
		resource.participant.push(participantAdmitter);
	} else if (
		getResultSetString(
			data,
			'encounterParticipantIndividualCode_discharging'
		) != undefined
	) {
		const participantDischarger = {
			type: [
				{
					coding: [
						{
							system: 'http://hl7.org/fhir/v3/ParticipationType',
							code: 'DIS',
							display: 'discharger'
						}
					]
				}
			],
			individual: {
				identifier: getResultSetString(
					data,
					'encounterParticipantIndividualCode_discharging'
				),
				display: getResultSetString(
					data,
					'encounterParticipantIndividualDesc_discharging'
				)
			}
		};
		resource.participant.push(participantDischarger);
	} else if (
		getResultSetString(
			data,
			'encounterParticipantIndividualCode_opattending'
		) != undefined
	) {
		const participantConsultant = {
			type: [
				{
					coding: [
						{
							system: 'http://hl7.org/fhir/v3/ParticipationType',
							code: 'CON',
							display: 'consultant'
						}
					]
				}
			],
			individual: {
				identifier: getResultSetString(
					data,
					'encounterParticipantIndividualCode_opattending'
				),
				display: getResultSetString(
					data,
					'encounterParticipantIndividualDesc_opattending'
				)
			}
		};
		resource.participant.push(participantConsultant);
	}

	resource.period = {};
	if (
		getResultSetString(data, 'encounterPeriodStart') != undefined &&
		getResultSetString(data, 'encounterPeriodStart').substring(0, 1) !=
			'T' &&
		getResultSetString(data, 'encounterPeriodStart').substring(0, 4) !=
			'1900'
	) {
		resource.period.start = getResultSetString(
			data,
			'encounterPeriodStart'
		);
	}
	if (
		getResultSetString(data, 'encounterPeriodEnd') != undefined &&
		getResultSetString(data, 'encounterPeriodEnd').substring(0, 1) != 'T' &&
		getResultSetString(data, 'encounterPeriodEnd').substring(0, 4) != '1900'
	) {
		resource.period.end = getResultSetString(data, 'encounterPeriodEnd');
	}

	// Add admission and discharge inpatient details
	resource.hospitalization = {};

	if (
		getResultSetString(data, 'encounterAdmissionmethodCodingCode') !=
			undefined ||
		getResultSetString(data, 'encounterDischargemethodCodingCode') !=
			undefined
	) {
		resource.hospitalization.extension = [];
	}

	if (
		getResultSetString(data, 'encounterAdmissionmethodCodingCode') !=
		undefined
	) {
		const admissionMethod = {
			url:
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-AdmissionMethod-1',
			valueCodeableConcept: {
				coding: [
					{
						system:
							'https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-AdmissionMethod-1',
						code: getResultSetString(
							data,
							'encounterAdmissionmethodCodingCode'
						),
						display: newStringOrUndefined(
							getResultSetString(
								data,
								'encounterAdmissionmethodCodingDesc'
							)
						)
					}
				]
			}
		};
		resource.hospitalization.extension.push(admissionMethod);
	}

	if (
		getResultSetString(data, 'encounterDischargemethodCodingCode') !=
		undefined
	) {
		const dischargeMethod = {
			url:
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-DischargeMethod-1',
			valueCodeableConcept: {
				coding: [
					{
						system:
							'https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-DischargeMethod-1',
						code: getResultSetString(
							data,
							'encounterDischargemethodCodingCode'
						),
						display: newStringOrUndefined(
							getResultSetString(
								data,
								'encounterDischargemethodCodingDesc'
							)
						)
					}
				]
			}
		};
		resource.hospitalization.extension.push(dischargeMethod);
	}

	if (
		getResultSetString(
			data,
			'encounterHospitalizationAdmitsourceCodingCode'
		) != undefined
	) {
		resource.hospitalization.admitSource = {
			coding: [
				{
					system:
						'https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-SourceOfAdmission-1',
					code: getResultSetString(
						data,
						'encounterHospitalizationAdmitsourceCodingCode'
					),
					display: newStringOrUndefined(
						getResultSetString(
							data,
							'encounterHospitalizationAdmitsourceCodingDesc'
						)
					)
				}
			]
		};
	}
	if (
		getResultSetString(
			data,
			'encounterHospitalizationDischargedispositionCodingCode'
		) != undefined
	) {
		resource.hospitalization.dischargeDisposition = {
			coding: [
				{
					system:
						'https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-DischargeDestination-1',
					code: getResultSetString(
						data,
						'encounterHospitalizationDischargedispositionCodingCode'
					),
					display: newStringOrUndefined(
						getResultSetString(
							data,
							'encounterHospitalizationDischargedispositionCodingDesc'
						)
					)
				}
			]
		};
	}

	resource.subject = {
		reference:
			`${$cfg('apiUrl') 
			}/r3/Patient/${ 
			getResultSetString(data, 'subjectReference')}`
	};

	return resource;
}
