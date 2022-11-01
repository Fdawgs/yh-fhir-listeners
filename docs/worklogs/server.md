# Server

## Key tasks

| Task                                                                                           | Status    | Date       | By                                                                         |
| ---------------------------------------------------------------------------------------------- | --------- | ---------- | -------------------------------------------------------------------------- |
| Stand up a dedicated server for SIDeR programme                                                | Completed | 2018-08-20 | James Pardon                                                               |
| Set up test FHIR REST endpoints                                                                | Completed | 2018-09-28 | Frazer Smith                                                               |
| Request domain from IT Services for HTTPS support                                              | Completed | 2018-10-19 | James Pardon, Frazer Smith                                                 |
| Confirm Black Pear's calls are routed to the server<br>and they can make requests to endpoints | Completed | 2018-10-25 | Frazer Smith, [Dunmail Hodkinson](https://github.com/Dunmail) (Black Pear) |

## Work log

### Server

A dedicated virtual instance of Windows Server has been set up by IT services, YDH-sider, specifically for the SIDeR programme.

### Domain and HTTPS

The Systems Administrator (James Pardon) on the IT services team requested the [sider.ydh.nhs.uk](https://sider.ydh.nhs.uk) domain from NHS Digital to allow YDH's wildcard certificate to be used for SSL/HTTPS. Calls made to this URL by Black Pear's proxy servers are routed to the YDH-sider server, all other calls made to this domain are rejected by YDH's firewall.

### Test endpoints

[Black Pear’s reference implementation](https://github.com/BlackPearSw/fhir-stu3-subscription-resthook) of a REST hook for the SIDeR project was being built upon in the beginning but was replaced by [Asymmetrik’s FHIR server](https://github.com/Asymmetrik/node-fhir-server-core) on the SIDeR development server on 2018-10-05. Black Pear’s reference implementation provided a good sandbox to refresh knowledge of JavaScript and RESTful API practices but continuing to work on that would be reinventing the wheel.

With the server in place, test endpoints were set up using a fork of Asymmetrik's FHIR server and their reference implementation. It supports the Patient and Organization resources out of the box. The fork included support for the use of API keys, HTTPS, and the additional Care Connect FHIR profiles needed for the SIDeR project.

Asymmetrik’s server was chosen over HAPI FHIR (that NHS Digital is using for their FHIR Server reference implementation for Care Connect) due to it being built in JavaScript as opposed to Java. Time would have to be spent relearning Java, and JavaScript is now more prevalent, allowing the project to be taken up and maintained by someone else with relative ease.

For the live endpoints, Mirth Connect and its new [FHIR extensions](http://www.mirthcorp.com/community/wiki/pages/viewpage.action?pageId=36504815) replaced this, with a [Node.js service](https://github.com/Fdawgs/ydh-fhir-authentication-service) providing security and authentication middleware.
