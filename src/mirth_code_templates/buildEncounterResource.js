/* eslint-disable security/detect-object-injection */
/**
	Builds Encounter FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1 for more info.
 
	@author Frazer Smith
	@param {object} data - Java RowSet object.
	@returns {object} Encounter FHIR resource.
 */
function buildEncounterResource(data) {
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

	const resource = {
		meta: {
			profile: [
				"https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Encounter-1",
			],
			tag: [
				{
					system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
					code: "detail",
					display: "Display in Detail View",
				},
			],
			lastUpdated:
				result.lastUpdated && !/^(T|1900)/m.test(result.lastUpdated)
					? result.lastUpdated
					: undefined,
		},
		resourceType: "Encounter",
		id: newStringOrUndefined(result.encounterIdentifier),
		status: newStringOrUndefined(result.encounterStatusMapped),
		class: result.encounterClassDesc
			? {
					system: "https://hl7.org/fhir/v3/ActEncounterCode",
					code: newStringOrUndefined(result.encounterClassCode),
					display: newStringOrUndefined(result.encounterClassDesc),
			  }
			: undefined,
		type: [],
		participant: [],
		hospitalization: {},
		location: [],
		period: {
			start:
				result.encounterPeriodStart &&
				!/^(T|1900)/m.test(result.encounterPeriodStart)
					? result.encounterPeriodStart
					: undefined,
			end:
				result.encounterPeriodEnd &&
				!/^(T|1900)/m.test(result.encounterPeriodEnd)
					? result.encounterPeriodEnd
					: undefined,
		},
		subject: {
			reference: `${$cfg("apiUrl")}/STU3/Patient/${
				result.subjectReference
			}`,
		},
	};

	/**
	 * Add SIDeR specific tags
	 * Only display in summary and detail view if within last 30 days,
	 * Do not display any planned/future encounters as they're out of scope
	 */
	if (
		result.encounterPeriodStart &&
		!/^(T|1900)/m.test(result.encounterPeriodStart) &&
		Math.ceil(
			(new Date(result.encounterPeriodStart) - new Date()) /
				(24 * 60 * 60 * 1000)
		) >= -30
	) {
		resource.meta.tag = [
			{
				system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
				code: "summary",
				display: "Display in Summary and Detail View",
			},
		];
	}
	if (result.encounterStatusMapped == "planned") {
		resource.meta.tag = [
			{
				system: "https://fhir.blackpear.com/ui/shared-care-record-visibility",
				code: "none",
				display: "Do not Display",
			},
		];
	}

	const emptyType = {
		coding: [
			{
				system: "https://fhir.nhs.uk/STU3/CodeSystem/Specialty-1",
				code: undefined,
				display: undefined,
			},
		],
		extension: [
			{
				url: "https://fhir.ydh.nhs.uk/STU3/StructureDefinition/Extension-YDH-SpecialtyContext-1",
				valueCodeableConcept: {
					coding: [
						{
							system: "https://fhir.ydh.nhs.uk/STU3/ValueSet/Extension-YDH-SpecialtyContext-1",
							code: undefined,
							display: undefined,
						},
					],
				},
			},
		],
	};

	if (result.encounterClassCode == "IMP") {
		const admType = JSON.parse(JSON.stringify(emptyType));
		const disType = JSON.parse(JSON.stringify(emptyType));

		if (result.encounterTypeCodeAdm) {
			admType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCodeAdm
			);
			admType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDescAdm
			);
			admType.extension[0].valueCodeableConcept.coding[0].code = "ADM";
			admType.extension[0].valueCodeableConcept.coding[0].display =
				"Admitting";
			resource.type.push(admType);
		} else if (result.encounterTypeCode) {
			admType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCode
			);
			admType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDesc
			);

			delete admType.extension;
			resource.type.push(admType);
		}

		if (result.encounterTypeCodeDis) {
			disType.coding[0].code = newStringOrUndefined(
				result.encounterTypeCodeDis
			);
			disType.coding[0].display = newStringOrUndefined(
				result.encounterTypeDescDis
			);

			disType.extension[0].valueCodeableConcept.coding[0].code = "DIS";
			disType.extension[0].valueCodeableConcept.coding[0].display =
				"Discharging";
			resource.type.push(disType);
		} else if (result.encounterTypeCode) {
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
		const outType = JSON.parse(JSON.stringify(emptyType));
		if (result.encounterTypeCode) {
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
	if (
		result.encounterParticipantIndividualCode_admitting &&
		result.encounterParticipantIndividualCode_discharging &&
		result.encounterParticipantIndividualCode_discharging ==
			result.encounterParticipantIndividualCode_admitting
	) {
		const participantCombo = {
			type: [
				{
					coding: [
						{
							system: "https://hl7.org/fhir/v3/ParticipationType",
							code: "ADM",
							display: "admitter",
						},
					],
				},
				{
					coding: [
						{
							system: "https://hl7.org/fhir/v3/ParticipationType",
							code: "DIS",
							display: "discharger",
						},
					],
				},
			],
			individual: {
				identifier: {
					value: result.encounterParticipantIndividualCode_admitting,
				},

				display: result.encounterParticipantIndividualDisplay_admitting,
			},
		};
		resource.participant.push(participantCombo);
	}

	if (resource.participant.length == 0) {
		if (result.encounterParticipantIndividualCode_admitting) {
			const participantAdmitter = {
				type: [
					{
						coding: [
							{
								system: "https://hl7.org/fhir/v3/ParticipationType",
								code: "ADM",
								display: "admitter",
							},
						],
					},
				],
				individual: {
					identifier: {
						value: result.encounterParticipantIndividualCode_admitting,
					},
					display:
						result.encounterParticipantIndividualDisplay_admitting,
				},
			};
			resource.participant.push(participantAdmitter);
		}
		if (result.encounterParticipantIndividualCode_discharging) {
			const participantDischarger = {
				type: [
					{
						coding: [
							{
								system: "https://hl7.org/fhir/v3/ParticipationType",
								code: "DIS",
								display: "discharger",
							},
						],
					},
				],
				individual: {
					identifier: {
						value: result.encounterParticipantIndividualCode_discharging,
					},
					display:
						result.encounterParticipantIndividualDisplay_discharging,
				},
			};
			resource.participant.push(participantDischarger);
		}
	}
	if (result.encounterParticipantIndividualCode_opattending) {
		const participantConsultant = {
			type: [
				{
					coding: [
						{
							system: "https://hl7.org/fhir/v3/ParticipationType",
							code: "CON",
							display: "consultant",
						},
					],
				},
			],
			individual: {
				identifier:
					result.encounterParticipantIndividualCode_opattending,
				display:
					result.encounterParticipantIndividualDisplay_opattending,
			},
		};
		resource.participant.push(participantConsultant);
	}

	// Add admission and discharge inpatient details
	if (
		result.encounterAdmissionmethodCodingCode ||
		result.encounterDischargemethodCodingCode
	) {
		resource.hospitalization.extension = [];
	}

	if (result.encounterAdmissionmethodCodingCode) {
		const admissionMethod = {
			url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-AdmissionMethod-1",
			valueCodeableConcept: {
				coding: [
					{
						system: "https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-AdmissionMethod-1",
						code: result.encounterAdmissionmethodCodingCode,
						display: newStringOrUndefined(
							result.encounterAdmissionmethodCodingDesc
						),
					},
				],
			},
		};
		resource.hospitalization.extension.push(admissionMethod);
	}

	if (result.encounterDischargemethodCodingCode) {
		const dischargeMethod = {
			url: "https://fhir.hl7.org.uk/STU3/StructureDefinition/Extension-CareConnect-DischargeMethod-1",
			valueCodeableConcept: {
				coding: [
					{
						system: "https://fhir.hl7.org.uk/STU3/ValueSet/CareConnect-DischargeMethod-1",
						code: result.encounterDischargemethodCodingCode,
						display: newStringOrUndefined(
							result.encounterDischargemethodCodingDesc
						),
					},
				],
			},
		};
		resource.hospitalization.extension.push(dischargeMethod);
	}

	if (result.encounterHospitalizationAdmitsourceCodingCode) {
		resource.hospitalization.admitSource = {
			coding: [
				{
					system: "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-SourceOfAdmission-1",
					code: result.encounterHospitalizationAdmitsourceCodingCode,
					display: newStringOrUndefined(
						result.encounterHospitalizationAdmitsourceCodingDesc
					),
				},
			],
		};
	}
	if (result.encounterHospitalizationDischargedispositionCodingCode) {
		resource.hospitalization.dischargeDisposition = {
			coding: [
				{
					system: "https://fhir.hl7.org.uk/STU3/CodeSystem/CareConnect-DischargeDestination-1",
					code: result.encounterHospitalizationDischargedispositionCodingCode,
					display: newStringOrUndefined(
						result.encounterHospitalizationDischargedispositionCodingDesc
					),
				},
			],
		};
	}

	// Add location details
	if (result.encounterClassCode == "IMP") {
		const emptyLocation = {
			location: {
				identifier: {
					value: undefined,
				},
				display: undefined,
			},
			period: {
				start: undefined,
				end: undefined,
			},
		};

		if (
			result.encounterLocation1Identifier &&
			resource.period.start &&
			result.encounterLocation2Identifier &&
			resource.period.end &&
			result.encounterLocation1Identifier ==
				result.encounterLocation2Identifier
		) {
			const ward = JSON.parse(JSON.stringify(emptyLocation));

			ward.location.identifier.value = newStringOrUndefined(
				result.encounterLocation1Identifier
			);
			ward.location.display = newStringOrUndefined(
				result.encounterLocation1Display
			);

			ward.period.start = resource.period.start;
			ward.period.end = resource.period.end;
			resource.location.push(ward);
		}

		if (resource.location.length == 0) {
			if (result.encounterLocation1Identifier && resource.period.start) {
				const admittingWard = JSON.parse(JSON.stringify(emptyLocation));

				admittingWard.location.identifier.value = newStringOrUndefined(
					result.encounterLocation1Identifier
				);
				admittingWard.location.display = newStringOrUndefined(
					result.encounterLocation1Display
				);

				admittingWard.period.start = resource.period.start;
				resource.location.push(admittingWard);
			}

			if (result.encounterLocation2Identifier && resource.period.end) {
				const dischargeWard = JSON.parse(JSON.stringify(emptyLocation));

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
	}

	return resource;
}
