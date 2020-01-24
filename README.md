# Yeovil District Hospital - SIDeR FHIR Listener Endpoints

> Yeovil Distict Hospital's Mirth Connect FHIR Listener channel adapted for use with InterSystem's TrakCare PAS (v2017.2 MR8.2)

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/ydh-fhir-listeners.svg)](https://github.com/Fdawgs/ydh-fhir-listeners/releases/latest/) [![Build Status](https://travis-ci.org/Fdawgs/ydh-fhir-listeners.svg?branch=master)](https://travis-ci.org/Fdawgs/ydh-fhir-listeners) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&identifier=217485645)](https://dependabot.com) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Introduction

## Purpose

This repo outlines the steps that have been taken to provide the technical deliverables required by the SIDeR programme, alongside the issues that were encountered during development, and how to deploy the resulting Mirth Connect channel.

Work logs and issues are found in [docs/worklogs](https://github.com/Fdawgs/ydh-fhir-listeners/tree/master/docs/worklogs).

The intended audience for this page are team members of the Solutions Development team at Yeovil District Hospital NHS Foundation Trust, alongside technical partners and developers from other shareholders in the programme should they wish to use this and adapt it to implement into their own systems. Musgrove Park Hospital (TST) have successfully taken this and refactored it for use with their PAS, Maxims.

This documentation has been written under the assumption that the reader has prior experience using Mirth Connect.

## Background

[Somerset Clinical Commissioning Group](https://www.somersetccg.nhs.uk/#) (CCG) started the [SIDeR project](https://www.somersetccg.nhs.uk/your-health/sharing-your-information/sider/) with the purpose of linking up all main clinical and social care IT systems used in Somerset to improve and support direct care. [Black Pear Software Ltd.](https://www.blackpear.com/) (BP) is the technical partner that supports the project.

Shareholders (as of 2019-04-03) are:

-   [Yeovil District Hospital NHS Foundation Trust](https://yeovilhospital.co.uk/) (YDH)
-   [Taunton and Somerset NHS Foundation Trust](https://www.tsft.nhs.uk/) (TST)
-   [Somerset Partnership NHS Foundation Trust](http://www.sompar.nhs.uk/) (SOMPAR)
-   [Somerset County Council](http://www.somerset.gov.uk/) (SCC)
-   [Devon Doctors](https://www.devondoctors.co.uk/) (DD)
-   [South Western Ambulance Service NHS Foundation Trust](https://www.swast.nhs.uk/) (SWASFT)
-   [St Margaret’s Hospice](https://www.somerset-hospice.org.uk/) (SMH)
-   [Dorothy House Hospice](https://www.dorothyhouse.org.uk/) (DHH)
-   [Children's Hospice South West](https://www.chsw.org.uk/) (CHSW)
-   GP practices within Somerset (GPs)

## Deliverables

### Care Connect RESTful FHIR API endpoints

Black Pear have built a web front-end (eSP) for a shared care record, which will retrieve data relating to a patient from each shareholder that have the capability to do so, and amalgamate it into this record. The record is not stored in a cache anywhere and is built on the fly.
Care providers can then access this record through a contextual link (an embedded link within the PAS).
Black Pear need to be able to make GET requests to a RESTful FHIR API endpoints to retrieve a set of six FHIR resources that adhere to their respective [Care Connect API profiles](https://nhsconnect.github.io/CareConnectAPI/) to populate the record.

### Contextual Link

A contextual link needs to be added to our PAS to allow care providers access to the shared record. Refer to [Interoperability patterns - Contextual launch](https://github.com/Somerset-SIDeR-Programme/SIDeR-interop-patterns/wiki/contextual-launch) in the SIDeR wiki for more information.

# Prerequisites

-   Latest release of [Mirth Connect](https://github.com/nextgenhealthcare/connect) installed (including supporting database instance)
-   Latest release of Mirth Connect's [FHIR Connector extension](https://ng.nextgen.com/l/488571/2018-03-16/6w3yr)
-   Latest release of [ydh-sider-authentication-service](https://github.com/Fdawgs/ydh-sider-authentication-service) (for securing endpoints with HTTPs and bearer tokens)
-   [Node.js](https://nodejs.org/en/) (optional, for development)
-   [Yarn](https://yarnpkg.com) (optional, for development)

# Deployment

This Mirth Connect channel has been tested on a Mirth Connect instance (3.6 and greater) running on Windows 10 and Windows Server 2019, with an instance of SQL Server 2017 being used as the database backend.

## Setting up Mirth Connect Channel

1. Ensure all prerequisites have been met, and you have a running instance of Mirth Connect
2. Install the FHIR Connector extension from the file system
3. Import the FHIR Listener channel from [src](https://github.com/Fdawgs/ydh-fhir-listeners/tree/master/src) into Mirth Connect
4. Declare variables listed in the channel description, in the configuration map
5. Deploy channel

# License

`ydh-fhir-listeners` is licensed under the [MIT](https://github.com/Fdawgs/ydh-fhir-listeners/blob/master/LICENSE) license.
