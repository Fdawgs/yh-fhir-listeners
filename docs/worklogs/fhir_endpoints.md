# FHIR End Points
## Key Tasks

Resource Name | SQL Query Status | Resource Builder Status | Read Functionality Status | Search Functionality Status | [Capability Statement](https://www.hl7.org/fhir/STU3/capabilitystatement.html)
--------------|------------------|-------------------------|---------------------------|---------------------------- | --------------------------------------------------------
[AllergyIntolerance](https://nhsconnect.github.io/CareConnectAPI/api_clinical_allergyintolerance.html)|Completed 2019-05-02|Completed 2019-05-02|Completed 2019-04-05|Completed 2019-05-02|
[Condition](https://nhsconnect.github.io/CareConnectAPI/api_clinical_condition.html)|N/A|N/A|N/A|N/A|N/A
[DocumentReference](https://nhsconnect.github.io/CareConnectAPI/api_documents_documentreference.html)|N/A|N/A|N/A|N/A|N/A
[Encounter](https://nhsconnect.github.io/CareConnectAPI/api_workflow_encounter.html)|Completed 2019-04-29|Completed 2019-04-29|Completed 2019-04-16|Completed 2019-05-03|
[MedicationStatement](https://nhsconnect.github.io/CareConnectAPI/api_medication_medicationstatement.html)|In Progress||Completed 2019-05-02|In Progress|
[Patient](https://nhsconnect.github.io/CareConnectAPI/api_entity_patient.html)|Completed 2019-04-04|Completed 2019-04-08|Completed 2019-04-04|Completed 2019-04-04|

## Work log
Following on from other projects worked on at the hospital that included using Mirth Connect, of which there are multiple instances of running in the Trust, it has been decided that Mirth Connect will be used for SIDeR.
Mirth Connect provides official FHIR support through a [FHIR Connector Extension](http://www.mirthcorp.com/community/wiki/pages/viewpage.action?pageId=36504815) introduced in version 3.6, and following testing of said extension with the use of [example channels](http://www.mirthcorp.com/community/wiki/display/mirth/Example+Channel), it appeared to be provide all the functionality needed to successfully develop and deploy RESTful FHIR API endpoints.

SSL/HTTPS support isn't available out of the box and there was no apparent way to add an api key requirement to the listener.
A [Node.js application using the Express framework, running as a Windows service](https://github.com/Fdawgs/ydh-sider-authentication-service), was developed and deployed to provide this. 