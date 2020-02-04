"use strict";

/**
	Builds Flag FHIR Resource that adheres to its Care-Connect profile,
	see https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Flag-1 for more info.

	@author Frazer Smith
	@param {Object} data - Java RowSet object.
	@return {Object} Flag FHIR resource.
 */
function buildFlagResource(data) {
  /**
   * Hard-coding meta profile and resourceType into resource as this should not
   * be changed for this resource, ever.
   */
  var resource = {
    meta: {
      profile: ['https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-Flag-1']
    },
    resourceType: 'Flag'
  };
  resource.id = newStringOrUndefined(getResultSetString(data, 'flagId'));
  resource.status = newStringOrUndefined(getResultSetString(data, 'flagStatusCode'));

  if (getResultSetString(data, 'flagCategoryCodingCode') != undefined) {
    resource.category = {
      coding: [{
        system: 'https://trakcare.ydh.nhs.uk',
        code: newStringOrUndefined(getResultSetString(data, 'flagCategoryCodingCode')),
        display: newStringOrUndefined(getResultSetString(data, 'flagCategoryCodingDisplay'))
      }]
    };
  }

  resource.code = {
    coding: []
  };

  if (getResultSetString(data, 'flagCodeCodingCode') != undefined) {
    var ydhCode = {
      system: 'https://trakcare.ydh.nhs.uk',
      code: newStringOrUndefined(getResultSetString(data, 'flagCodeCodingCode')),
      display: newStringOrUndefined(getResultSetString(data, 'flagCodeCodingDisplay'))
    };
    resource.code.coding.push(ydhCode);
  }

  if (getResultSetString(data, 'flagCodeCodingSnomedCode') != undefined) {
    var snomedCode = {
      system: 'http://snomed.info/sct',
      code: newStringOrUndefined(getResultSetString(data, 'flagCodeCodingSnomedCode')),
      display: newStringOrUndefined(getResultSetString(data, 'flagCodeCodingSnomedDisplay'))
    };
    resource.code.coding.push(snomedCode);
  }

  resource.period = {};

  if (getResultSetString(data, 'periodStart') != undefined && getResultSetString(data, 'periodStart').substring(0, 1) != 'T' && getResultSetString(data, 'periodStart').substring(0, 4) != '1900') {
    resource.period.start = getResultSetString(data, 'periodStart');
  }

  if (getResultSetString(data, 'periodStart') != undefined && getResultSetString(data, 'periodStart').substring(0, 1) != 'T' && getResultSetString(data, 'periodStart').substring(0, 4) != '1900') {
    resource.period.end = getResultSetString(data, 'periodStart');
  }

  resource.subject = {
    reference: "".concat($cfg('apiUrl'), "/r3/Patient/").concat(getResultSetString(data, 'flagSubjectReference'))
  };
  return resource;
}