/**
	Builds Encounter FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} Encounter FHIR resource.
 */
function buildEncounterResource(data) {
	var result = getResultSet(data);
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

	resource.id = newStringOrUndefined(result.encounterIdentifier);
	resource.status = newStringOrUndefined(result.encounterStatusMapped);

	// Add meta data
	if (
		result.lastUpdated != undefined &&
		result.lastUpdated.substring(0, 1) != 'T' &&
		result.lastUpdated.substring(0, 4) != '1900'
	) {
		resource.meta.lastUpdated = result.lastUpdated;
	}

	if (result.encounterClassDesc != undefined) {
		resource['class'] = {
			system: 'https://hl7.org/fhir/v3/ActEncounterCode',
			code: newStringOrUndefined(result.encounterClassCode),
			display: newStringOrUndefined(result.encounterClassDesc)
		};
	}

	//	Add SIDeR specific tags
	if (
		result.encounterPeriodStart != undefined &&
		result.encounterPeriodStart.substring(0, 1) != 'T' &&
		result.encounterPeriodStart.substring(0, 4) != '1900' &&
		Math.ceil(
			(new Date(result.encounterPeriodStart) - new Date()) /
				(24 * 60 * 60 * 1000)
		) >= -30
	) {
		resource.meta.tag = [
			{
				system:
					'https://fhir.blackpear.com/ui/shared-care-record-visibility',
				code: 'summary',
				display: 'Display in Summary and Detail View'
			}
		];
	} else {
		resource.meta.tag = [
			{
				system:
					'https://fhir.blackpear.com/ui/shared-care-record-visibility',
				code: 'detail',
				display: 'Display in Detail View'
			}
		];
	}

	if (
		result.encounterStatusMapped != undefined &&
		result.encounterStatusMapped == 'planned'
	) {
		resource.meta.tag = [
			{
				system:
					'https://fhir.blackpear.com/ui/shared-care-record-visibility',
				code: 'none',
				display: 'Do not Display'
			}
		];
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
		result.encounterClassCode != undefined &&
		result.encounterClassCode == 'IMP'
	) {
		var admType = JSON.parse(JSON.stringify(emptyType));
		var disType = JSON.parse(JSON.stringify(emptyType));

		if (result.encounterTypeCodeAdm != undefined) {
			admType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCodeAdm
			);

			admType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDescAdm
			);

			admType.extension[0].valueCodeableConcept.coding[0].code = 'ADM';
			admType.extension[0].valueCodeableConcept.coding[0].display =
				'Admitting';
			resource.type.push(admType);
		} else if (result.encounterTypeCode != undefined) {
			admType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCode
			);

			admType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDesc
			);

			delete admType.extension;
			resource.type.push(admType);
		}

		if (result.encounterTypeCodeDis != undefined) {
			disType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCodeDis
			);

			disType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDescDis
			);

			disType.extension[0].valueCodeableConcept.coding[0].code = 'DIS';
			disType.extension[0].valueCodeableConcept.coding[0].display =
				'Discharging';
			resource.type.push(disType);
		} else if (result.encounterTypeCode != undefined) {
			disType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCode
			);

			disType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDesc
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
		if (result.encounterTypeCode != undefined) {
			outType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCode
			);

			outType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDesc
			);

			delete outType.extension;
			resource.type.push(outType);
		}
	}

	// Add participants
	resource.participant = [];
	if (
		result.encounterParticipantIndividualCode_admitting != undefined &&
		result.encounterParticipantIndividualCode_discharging != undefined &&
		result.encounterParticipantIndividualCode_discharging ===
			result.encounterParticipantIndividualCode_admitting
	) {
		var participantCombo = {
			type: [
				{
					coding: [
						{
							system: 'https://hl7.org/fhir/v3/ParticipationType',
							code: 'ADM',
							display: 'admitter'
						}
					]
				},

				{
					coding: [
						{
							system: 'https://hl7.org/fhir/v3/ParticipationType',
							code: 'DIS',
							display: 'discharger'
						}
					]
				}
			],

			individual: {
				identifier: {
					value: result.encounterParticipantIndividualCode_admitting
				},

				display: result.encounterParticipantIndividualDisplay_admitting
			}
		};

		resource.participant.push(participantCombo);
	}

	if (resource.participant.length == 0) {
		if (result.encounterParticipantIndividualCode_admitting != undefined) {
			var participantAdmitter = {
				type: [
					{
						coding: [
							{
								system:
									'https://hl7.org/fhir/v3/ParticipationType',
								code: 'ADM',
								display: 'admitter'
							}
						]
					}
				],

				individual: {
					identifier: {
						value:
							result.encounterParticipantIndividualCode_admitting
					},

					display:
						result.encounterParticipantIndividualDisplay_admitting
				}
			};

			resource.participant.push(participantAdmitter);
		}
		if (
			result.encounterParticipantIndividualCode_discharging != undefined
		) {
			var participantDischarger = {
				type: [
					{
						coding: [
							{
								system:
									'https://hl7.org/fhir/v3/ParticipationType',
								code: 'DIS',
								display: 'discharger'
							}
						]
					}
				],

				individual: {
					identifier: {
						value:
							result.encounterParticipantIndividualCode_discharging
					},

					display:
						result.encounterParticipantIndividualDisplay_discharging
				}
			};

			resource.participant.push(participantDischarger);
		}
	}
	if (result.encounterParticipantIndividualCode_opattending != undefined) {
		var participantConsultant = {
			type: [
				{
					coding: [
						{
							system: 'https://hl7.org/fhir/v3/ParticipationType',
							code: 'CON',
							display: 'consultant'
						}
					]
				}
			],

			individual: {
				identifier:
					result.encounterParticipantIndividualCode_opattending,
				display:
					result.encounterParticipantIndividualDisplay_opattending
			}
		};

		resource.participant.push(participantConsultant);
	}

	resource.period = {};
	if (
		result.encounterPeriodStart != undefined &&
		result.encounterPeriodStart.substring(0, 1) != 'T' &&
		result.encounterPeriodStart.substring(0, 4) != '1900'
	) {
		resource.period.start = result.encounterPeriodStart;
	}
	if (
		result.encounterPeriodEnd != undefined &&
		result.encounterPeriodEnd.substring(0, 1) != 'T' &&
		result.encounterPeriodEnd.substring(0, 4) != '1900'
	) {
		resource.period.end = result.encounterPeriodEnd;
	}

	// Add admission and discharge inpatient details
	resource.hospitalization = {};

	if (
		result.encounterAdmissionmethodCodingCode != undefined ||
		result.encounterDischargemethodCodingCode != undefined
	) {
		resource.hospitalization.extension = [];
	}

	if (result.encounterAdmissionmethodCodingCode != undefined) {
		var admissionMethod = {
			url:
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-AdmissionMethod-1',
			valueCodeableConcept: {
				coding: [
					{
						system:
							'https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-AdmissionMethod-1',
						code: result.encounterAdmissionmethodCodingCode,
						display: newStringOrUndefined(
							result.encounterAdmissionmethodCodingDesc
						)
					}
				]
			}
		};

		resource.hospitalization.extension.push(admissionMethod);
	}

	if (result.encounterDischargemethodCodingCode != undefined) {
		var dischargeMethod = {
			url:
				'https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-DischargeMethod-1',
			valueCodeableConcept: {
				coding: [
					{
						system:
							'https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-DischargeMethod-1',
						code: result.encounterDischargemethodCodingCode,
						display: newStringOrUndefined(
							result.encounterDischargemethodCodingDesc
						)
					}
				]
			}
		};

		resource.hospitalization.extension.push(dischargeMethod);
	}

	if (result.encounterHospitalizationAdmitsourceCodingCode != undefined) {
		resource.hospitalization.admitSource = {
			coding: [
				{
					system:
						'https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-SourceOfAdmission-1',
					code: result.encounterHospitalizationAdmitsourceCodingCode,
					display: newStringOrUndefined(
						result.encounterHospitalizationAdmitsourceCodingDesc
					)
				}
			]
		};
	}
	if (
		result.encounterHospitalizationDischargedispositionCodingCode !=
		undefined
	) {
		resource.hospitalization.dischargeDisposition = {
			coding: [
				{
					system:
						'https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-DischargeDestination-1',
					code:
						result.encounterHospitalizationDischargedispositionCodingCode,
					display: newStringOrUndefined(
						result.encounterHospitalizationDischargedispositionCodingDesc
					)
				}
			]
		};
	}

	// Add location details
	if (
		result.encounterClassCode != undefined &&
		result.encounterClassCode == 'IMP'
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
			result.encounterLocation1Identifier != undefined &&
			typeof resource.period.start !== 'undefined'
		) {
			var admittingWard = JSON.parse(JSON.stringify(emptyLocation));

			admittingWard.location.identifier.value = newStringOrUndefined(
				result.encounterLocation1Identifier
			);

			admittingWard.location.display = newStringOrUndefined(
				result.encounterLocation1Display
			);

			admittingWard.period.start = resource.period.start;
			resource.location.push(admittingWard);
		}

		if (
			result.encounterLocation2Identifier != undefined &&
			typeof resource.period.end !== 'undefined'
		) {
			var dischargeWard = JSON.parse(JSON.stringify(emptyLocation));

			dischargeWard.location.identifier.value = newStringOrUndefined(
				result.encounterLocation2Identifier
			);

			dischargeWard.location.display = newStringOrUndefined(
				result.encounterLocation2Display
			);

			dischargeWard.period.end = resource.period.end;
			resource.location.push(dischargeWard);
		}
	}

	resource.subject = {
		reference: ''
			.concat($cfg('apiUrl'), '/r3/Patient/')
			.concat(result.subjectReference)
	};

	return resource;
}
