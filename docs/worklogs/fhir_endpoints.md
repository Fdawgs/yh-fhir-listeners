# FHIR End Points
## Key Tasks

Resource Name | SQL Query Status | Resource Builder Status | Read Functionality Status | Search Functionality Status | [Capability Statement](https://www.hl7.org/fhir/STU3/capabilitystatement.html)| By |
--------------|------------------|-------------------------|---------------------------|---------------------------- | --------------------------------------------------------|----|
[AllergyIntolerance](https://nhsconnect.github.io/CareConnectAPI/api_clinical_allergyintolerance.html)|Completed 2019-05-02|Completed 2019-05-02|Completed 2019-04-05|Completed 2019-05-02|Completed 2019-11-18|Frazer Smith, David Suckling
[Condition](https://nhsconnect.github.io/CareConnectAPI/api_clinical_condition.html)|N/A|N/A|N/A|N/A|N/A
[DocumentReference](https://nhsconnect.github.io/CareConnectAPI/api_documents_documentreference.html)|N/A|N/A|N/A|N/A|N/A
[Encounter](https://nhsconnect.github.io/CareConnectAPI/api_workflow_encounter.html)|Completed 2019-04-29|Completed 2019-04-29|Completed 2019-04-16|Completed 2019-05-03|Completed 2019-11-18|Frazer Smith, David Suckling, Jessica Male
[MedicationStatement](https://nhsconnect.github.io/CareConnectAPI/api_medication_medicationstatement.html)|Completed 2019-11-15|Completed 2019-11-15|Completed 2019-11-18|Completed 2019-11-18|Completed 2019-11-18|Frazer Smith, David Suckling, George Dampier
[Patient](https://nhsconnect.github.io/CareConnectAPI/api_entity_patient.html)|Completed 2019-04-04|Completed 2019-04-08|Completed 2019-04-04|Completed 2019-04-04|Completed 2019-11-18|Frazer Smith, David Suckling, Nicolas Noblet
[Flag](http://hl7.org/fhir/STU3/flag.html)|||||

## Work log
Mirth Connect, a trust integration engine (TIE) is used extensively at Yeovil District Hospital. Due to this, it has been decided that it will be used for SIDeR. It is free, open source, and well documented. It also means that additional training for members of the Solutions Development Team at YDH is not needed due to existing familiarity.

Mirth Connect provides official FHIR support through a [FHIR Connector Extension](http://www.mirthcorp.com/community/wiki/pages/viewpage.action?pageId=36504815) introduced in version 3.6 and these provide all the functionality needed to successfully develop and deploy RESTful FHIR API endpoints. [Example channels](http://www.mirthcorp.com/community/wiki/display/mirth/Example+Channel) that were provided have been adapted for use with YDH's PAS, Intersystem's TrakCare.

SSL/HTTPS support is not available out of the box and there was no apparent way to add an API key requirement to the listener.
A [Node.js application using the Express framework, running as a Windows service](https://github.com/Fdawgs/ydh-sider-authentication-service), was developed and deployed to provide this. 

TrakCare does not hold either conditions or documents.
Documents are held in PatientCentre, whilst Conditions are held in SimpleCode.
