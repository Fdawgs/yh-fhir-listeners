"use strict";

/**
	Builds MedicationStatement FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-MedicationStatement-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} MedicationStatement FHIR resource.
 */
function buildMedicationStatementResource(data) {
  /**
   * Hard-coding meta profile and resourceType into resource as this should not
   * be changed for this resource, ever.
   */
  var resource = {
    meta: {
      profile: ['https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-MedicationStatement-1']
    },
    resourceType: 'MedicationStatement'
  };
  resource.id = newStringOrUndefined(getResultSetString(data, 'medstatId'));
  resource.status = newStringOrUndefined(getResultSetString(data, 'medstatStatusCode'));
  resource.medicationReference = {
    reference: newStringOrUndefined("#".concat(getResultSetString(data, 'medicationId')))
  }; // Add contained Medication resource

  var contained = [];

  if (getResultSetString(data, 'medicationId') != undefined) {
    var containedMedication = {
      resourceType: 'Medication',
      id: getResultSetString(data, 'medicationId'),
      code: {
        coding: [{
          code: newStringOrUndefined(getResultSetString(data, 'medicationCodeCodingCode')),
          display: newStringOrUndefined(getResultSetString(data, 'medicationCodeCodingDisplay'))
        }],
        text: getResultSetString(data, 'medicationCodeText')
      }
    };
    contained.push(containedMedication);

    if (getResultSetString(data, 'medicationCodeCodingCode') != undefined && getResultSetString(data, 'medicationCodeCodingDisplay') != undefined) {
      containedMedication.code.coding[0].system = 'http://snomed.info/sct';
    }
  }

  if (contained.length > 0) {
    resource.contained = contained;
  } // Add dosages


  var dosage = [];
  var dosageObject = {
    patientInstruction: newStringOrUndefined(getResultSetString(data, 'medstatDosagePatientinstruction')),
    route: {
      text: newStringOrUndefined(getResultSetString(data, 'medstatDosageRouteText'))
    }
  };

  if (getResultSetString(data, 'medstatDosageDoseQuantityValue') != undefined && getResultSetString(data, 'medstatDosageDoseQuantityUnit') != undefined) {
    dosageObject.doseQuantity = {
      value: newStringOrUndefined(getResultSetString(data, 'medstatDosageDoseQuantityValue')),
      unit: newStringOrUndefined(getResultSetString(data, 'medstatDosageDoseQuantityUnit')).toLowerCase()
    };
  }

  if (getResultSetString(data, 'medstatDosageTimingRepeatDuration') != undefined && getResultSetString(data, 'medstatDosageTimingRepeatDurationUnit') != undefined && getResultSetString(data, 'medstatDosageTimingRepeatDurationUnit') != 'DO') {
    dosageObject.timing = {
      repeat: {
        duration: newStringOrUndefined(getResultSetString(data, 'medstatDosageTimingRepeatDuration')),
        durationUnit: newStringOrUndefined(getResultSetString(data, 'medstatDosageTimingRepeatDurationUnit')).toLowerCase()
      }
    };
  }

  dosage.push(dosageObject);

  if (dosage.length > 0) {
    resource.dosage = dosage;
  }

  resource.effectivePeriod = {};

  if (getResultSetString(data, 'medstatEffectiveStart') != undefined && getResultSetString(data, 'medstatEffectiveStart').substring(0, 1) != 'T' && getResultSetString(data, 'medstatEffectiveStart').substring(0, 4) != '1900') {
    resource.effectivePeriod.start = getResultSetString(data, 'medstatEffectiveStart');
  }

  if (getResultSetString(data, 'medstatEffectiveEnd') != undefined && getResultSetString(data, 'medstatEffectiveEnd').substring(0, 1) != 'T' && getResultSetString(data, 'medstatEffectiveEnd').substring(0, 4) != '1900') {
    resource.effectivePeriod.end = getResultSetString(data, 'medstatEffectiveEnd');
  }

  resource.subject = {
    reference: "".concat($cfg('apiUrl'), "/r3/Patient/").concat(getResultSetString(data, 'medstatSubjectReference'))
  }; // Hard-coded as TrakCare doesn't record whether a patient has taken medication

  resource.taken = 'unk';
  return resource;
}