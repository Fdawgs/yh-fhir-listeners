# FHIR End Points

## Key Tasks

| Resource Name                                                                                              | SQL Query Status     | Resource Builder Status | Read Functionality Status | Search Functionality Status | [Capability Statement](https://www.hl7.org/fhir/STU3/capabilitystatement.html) | By                                                               |
| ---------------------------------------------------------------------------------------------------------- | -------------------- | ----------------------- | ------------------------- | --------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| [AllergyIntolerance](https://nhsconnect.github.io/CareConnectAPI/api_clinical_allergyintolerance.html)     | Completed 2019-05-02 | Completed 2019-05-02    | Completed 2019-04-05      | Completed 2019-05-02        | Completed 2019-11-18                                                           | Frazer Smith, David Suckling, Neil Hayes-Webster                 |
| [Condition](https://nhsconnect.github.io/CareConnectAPI/api_clinical_condition.html)                       | N/A                  | N/A                     | N/A                       | N/A                         | N/A                                                                            |
| [DocumentReference](https://nhsconnect.github.io/CareConnectAPI/api_documents_documentreference.html)      | N/A                  | N/A                     | N/A                       | N/A                         | N/A                                                                            |
| [Encounter](https://nhsconnect.github.io/CareConnectAPI/api_workflow_encounter.html)                       | Completed 2019-04-29 | Completed 2019-04-29    | Completed 2019-04-16      | Completed 2019-05-03        | Completed 2019-11-18                                                           | Frazer Smith, David Suckling, Jessica Male, Neil Hayes-Webster   |
| [MedicationStatement](https://nhsconnect.github.io/CareConnectAPI/api_medication_medicationstatement.html) | Completed 2019-11-15 | Completed 2019-11-15    | Completed 2019-11-18      | Completed 2019-11-18        | Completed 2019-11-18                                                           | Frazer Smith, David Suckling, George Dampier, Neil Hayes-Webster |
| [Patient](https://nhsconnect.github.io/CareConnectAPI/api_entity_patient.html)                             | Completed 2019-04-04 | Completed 2019-04-08    | Completed 2019-04-04      | Completed 2019-04-04        | Completed 2019-11-18                                                           | Frazer Smith, David Suckling, Neil Hayes-Webster, Nicolas Noblet |
| [Flag](http://hl7.org/fhir/STU3/flag.html)                                                                 | Completed 2019-11-26 | Completed 2019-11-26    | Completed 2019-11-26      | Completed 2019-11-26        | Completed 2019-11-26                                                           | Frazer Smith, Neil Hayes-Webster                                 |

## Work log

Mirth Connect, a trust integration engine (TIE) is used extensively at Yeovil District Hospital. Due to this, it has been decided that it will be used for SIDeR. It is free, open source, and well documented. It also means that additional training for members of the Solutions Development Team at YDH is not needed due to existing familiarity.

Mirth Connect provides official FHIR support through a [FHIR Connector Extension](http://www.mirthcorp.com/community/wiki/pages/viewpage.action?pageId=36504815) introduced in version 3.6 and these provide all the functionality needed to successfully develop and deploy RESTful FHIR API endpoints. [Example channels](http://www.mirthcorp.com/community/wiki/display/mirth/Example+Channel) that were provided have been adapted for use with YDH's PAS, Intersystem's TrakCare.

SSL/HTTPS support is not available out of the box and there was no apparent way to add an API key requirement to the listener.
A [Node.js application using the Express framework, running as a Windows service](https://github.com/Fdawgs/ydh-authentication-service), was developed and deployed to provide this.

## Known data quality issues

-   Unable to provide SNOMED codes for allergies and intolerances in AllergyIntolerance resources due to these being free text inputs in TrakCare
-   Unable to provide DocumentReference resources as these are held in Patient Centre, not TrakCare (this can be potentially be revisited when the new Patient Centre is in place)
-   Discharge/end dates for outpatient Encounter resources are not provided due to poor data quality. Staff in outpatients misuse these input fields in TrakCare to mark when “all admin has been completed for that outpatient encounter” and not when the encounter actually finished
-   Unable to provide Condition resources as conditions are held in SimpleCode, not TrakCare
-   Unable to provide SNOMED codes for religious affiliation for patient demographics due to these not being in TrakCare (to revisit)
-   Sizeable number of patient records without postcodes
-   Unable to provide clinician contact details for Encounter resources due to the following:
    -   In TrakCare a care provider has a mobile number field against them, but it is rarely populated
    -   There is not an internal contact number field in TrakCare
    -   If you want to reach say, a gynaecology consultant, you need to manually search a list on YDH’s intranet for their secretary’s extension number, and there is no indication as to how current the list is
    -   Teams do not have contact number
