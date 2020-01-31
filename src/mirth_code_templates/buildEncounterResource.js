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

	resource.type = [];

	var emptyType = {
		coding: [
			{
				system: 'https://fhir.nhs.uk/STU3/CodeSystem/DCH-Specialty-1',
				code: undefined,
				display: undefined
			}
		],
		extension: [
			{
				url:
					'https://fhir.ydh.nhs.uk/STU3/StructureDefinition/Extension-YDH-SpecialtyContext-1',
				valueCodeableConcept: {
					coding: [
						{
							system:
								'https://fhir.ydh.nhs.uk/STU3/ValueSet/Extension-YDH-SpecialtyContext-1',
							code: undefined,
							display: undefined
						}
					]
				}
			}
		]
	};

	if (
		getResultSetString(data, 'encounterClassCode') != undefined &&
		getResultSetString(data, 'encounterClassCode') == 'IMP'
	) {
		var admType = JSON.parse(JSON.stringify(emptyType));
		var disType = JSON.parse(JSON.stringify(emptyType));

		if (getResultSetString(data, 'encounterTypeCodeAdm') != undefined) {
			admType.coding[0].code = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeCodeAdm')
			);
			admType.coding[0].display = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeDescAdm')
			);
			admType.extension[0].valueCodeableConcept.coding[0].code = 'ADM';
			admType.extension[0].valueCodeableConcept.coding[0].display =
				'Admitting';
			resource.type.push(admType);
		} else if (getResultSetString(data, 'encounterTypeCode') != undefined) {
			admType.coding[0].code = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeCode')
			);
			admType.coding[0].display = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeDesc')
			);

			delete admType.extension;
			resource.type.push(admType);
		}

		if (getResultSetString(data, 'encounterTypeCodeDis') != undefined) {
			disType.coding[0].code = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeCodeDis')
			);
			disType.coding[0].display = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeDescDis')
			);

			disType.extension[0].valueCodeableConcept.coding[0].code = 'DIS';
			disType.extension[0].valueCodeableConcept.coding[0].display =
				'Discharging';
			resource.type.push(disType);
		} else if (getResultSetString(data, 'encounterTypeCode') != undefined) {
			disType.coding[0].code = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeCode')
			);
			disType.coding[0].display = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeDesc')
			);
			delete disType.extension;
			resource.type.push(disType);
		}

		if (resource.type.length > 1) {
			if (
				JSON.stringify(resource.type[0]) ==
				JSON.stringify(resource.type[1])
			) {
				delete resource.type[1];
			}
		}
	} else {
		var outType = JSON.parse(JSON.stringify(emptyType));
		if (getResultSetString(data, 'encounterTypeCode') != undefined) {
			outType.coding[0].code = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeCode')
			);
			outType.coding[0].display = newStringOrUndefined(
				getResultSetString(data, 'encounterTypeDesc')
			);

			delete outType.extension;
			resource.type.push(outType);
		}
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
		) ==
			getResultSetString(
				data,
				'encounterParticipantIndividualCode_admitting'
			)
	) {
		var participantCombo = {
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
				identifier: {
					value: getResultSetString(
						data,
						'encounterParticipantIndividualCode_admitting'
					)
				},

				display: getResultSetString(
					data,
					'encounterParticipantIndividualDisplay_admitting'
				)
			}
		};
		resource.participant.push(participantCombo);
	}

	if (resource.participant.length == 0) {
		if (
			getResultSetString(
				data,
				'encounterParticipantIndividualCode_admitting'
			) != undefined
		) {
			var participantAdmitter = {
				type: [
					{
						coding: [
							{
								system:
									'http://hl7.org/fhir/v3/ParticipationType',
								code: 'ADM',
								display: 'admitter'
							}
						]
					}
				],
				individual: {
					identifier: {
						value: getResultSetString(
							data,
							'encounterParticipantIndividualCode_admitting'
						)
					},
					display: getResultSetString(
						data,
						'encounterParticipantIndividualDisplay_admitting'
					)
				}
			};
			resource.participant.push(participantAdmitter);
		}
		if (
			getResultSetString(
				data,
				'encounterParticipantIndividualCode_discharging'
			) != undefined
		) {
			var participantDischarger = {
				type: [
					{
						coding: [
							{
								system:
									'http://hl7.org/fhir/v3/ParticipationType',
								code: 'DIS',
								display: 'discharger'
							}
						]
					}
				],
				individual: {
					identifier: {
						value: getResultSetString(
							data,
							'encounterParticipantIndividualCode_discharging'
						)
					},
					display: getResultSetString(
						data,
						'encounterParticipantIndividualDisplay_discharging'
					)
				}
			};
			resource.participant.push(participantDischarger);
		}
	}
	if (
		getResultSetString(
			data,
			'encounterParticipantIndividualCode_opattending'
		) != undefined
	) {
		var participantConsultant = {
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
					'encounterParticipantIndividualDisplay_opattending'
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
		var admissionMethod = {
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
		var dischargeMethod = {
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

	// Add location details
	if (
		getResultSetString(data, 'encounterClassCode') != undefined &&
		getResultSetString(data, 'encounterClassCode') == 'IMP'
	) {
		resource.location = [];

		var emptyLocation = {
			location: {
				identifier: {
					value: undefined
				},
				display: undefined
			},
			period: {
				start: undefined,
				end: undefined
			}
		};

		if (
			getResultSetString(data, 'encounterLocation1Identifier') !=
				undefined &&
			typeof resource.period.start !== 'undefined'
		) {
			var admittingWard = JSON.parse(JSON.stringify(emptyLocation));

			admittingWard.location.identifier.value = newStringOrUndefined(
				getResultSetString(data, 'encounterLocation1Identifier')
			);
			admittingWard.location.display = newStringOrUndefined(
				getResultSetString(data, 'encounterLocation1Display')
			);

			admittingWard.period.start = resource.period.start;
			resource.location.push(admittingWard);
		}

		if (
			getResultSetString(data, 'encounterLocation2Identifier') !=
				undefined &&
			typeof resource.period.end !== 'undefined'
		) {
			var dischargeWard = JSON.parse(JSON.stringify(emptyLocation));

			dischargeWard.location.identifier.value = newStringOrUndefined(
				getResultSetString(data, 'encounterLocation2Identifier')
			);
			dischargeWard.location.display = newStringOrUndefined(
				getResultSetString(data, 'encounterLocation2Display')
			);

			dischargeWard.period.end = resource.period.end;
			resource.location.push(dischargeWard);
		}
	}

	resource.subject = {
		reference:
			$cfg('apiUrl') +
			'/r3/Patient/' +
			getResultSetString(data, 'subjectReference')
	};

	return resource;
}
