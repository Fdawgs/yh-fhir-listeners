/*
Encounter Resource
Encounters types: inpatient | outpatient | ambulatory | emergency
FHIR status types:  planned | arrived | triaged | in-progress | onleave |
					finished | cancelled | entered-in-error | unknown
PA_Adm Visit status types: Admit (A) | Cancel (C) | Discharged (D) | Pre-Admission (P) |
					 Released (R) | DNA (N)
RB_Appointment APPT_status types : Inserted (I) | Admitted (A) | Transferred (T) | Cancelled (X) |
							  Closed (C) | Booked (P) | NotAttended (N) | Hold(Postponed) (H) |
							  Hold(Inserted) (J) | Could Not Wait (W) | Arrived Not Seen (S) |
							  Departed (D)
J and C not in use

Encounter structures within TrakCare
====================================
The 'Patient Enquiry Display' is actually regarding RTT pathways, the 'Date' is the day the referral was recieved for outpatient appointments
An episode can have 0..* appointments under it as children

RB_Appointment holds outpatient appointments ONLY
PA_Adm holds inpatient and emergency encounters, AND the top level episode for outpatient appointments (but won't be used)
PA_Adm2 holds additional details and is 1:1 with PA_Adm

Unique Identifiers
==================
For Emergency and Inpatient, use enc.PAADM_ADMNo as unique identifier, replace the / in emerg with a dash
For Outpatients, use app.APPT_RowID, replacing the || with a dash

SNOMED CT codes:
Accident and Emergency department: 225728007
Outpatient environment: 440655000
Inpatient environment: 440654001

18/04/2019:
Apparently they use the discharge date in outpatients as the 'time all admin complete', not actual discharge.
Converting this to NULL.
*/

WITH encounter_CTE(encounterIdentifier, encounterClassDesc, encounterClassCode, encounterTypeDesc, encounterTypeCode, encounterPeriodStartDate, encounterPeriodStartTime, encounterPeriodEndDate, encounterPeriodEndTime, subjectReference, encounterStatus, lastUpdateDate, lastUpdateTime)
AS (SELECT DISTINCT *
  	  FROM OPENQUERY([ENYH-PRD-ANALYTICS],
  				'SELECT REPLACE(app.APPT_RowId, ''||'', ''-'') AS encounterIdentifier,
						''outpatient'' AS encounterClassDesc,
						NULL AS encounterClassCode,
						app.APPT_AS_ParRef->AS_RES_ParRef->RES_CTLOC_DR->CTLOC_Desc AS encounterTypeDesc,
						app.APPT_AS_ParRef->AS_RES_ParRef->RES_CTLOC_DR->CTLOC_Code AS encounterTypeCode,
						COALESCE(app.APPT_ArrivalDate, app.APPT_DateComp) AS encounterPeriodStartDate,
						COALESCE(app.APPT_ArrivalTime, app.APPT_TimeComp) AS encounterPeriodStartTime,
						--app.APPT_DepartureDate AS encounterPeriodEndDate,
						--app.APPT_DepartureTime AS encounterPeriodEndTime,
						NULL AS encounterPeriodEndDate,
						NULL AS encounterPeriodEndTime,
						app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No AS subjectReference,
						app.APPT_Status AS encounterStatus,
						app.APPT_LastUpdateDate AS lastUpdateDate,
						NULL AS lastUpdateTime
				   FROM RB_Appointment app
				  WHERE app.APPT_Adm_DR->PAADM_PAPMI_DR->PAPMI_No = ''5484125''
				  ')
	 UNION
	SELECT DISTINCT *
  	  FROM OPENQUERY([ENYH-PRD-ANALYTICS],
				 'SELECT REPLACE(PAADM_ADMNo, ''/'', ''-'') AS encounterIdentifier,
						 CASE PAADM_Type
						 WHEN ''I'' THEN ''inpatient''
						 WHEN ''E'' THEN ''emergency''
						 END as encounterClassDesc,
						 CASE PAADM_Type
						 WHEN ''I'' THEN ''IMP''
						 WHEN ''E'' THEN ''EMER''
						 END as encounterClassCode,
						 PAADM_DepCode_DR->CTLOC_Desc AS encounterTypeDesc,
						 PAADM_DepCode_DR->CTLOC_Code AS encounterTypeCode,
				 		 PAADM_AdmDate AS encounterPeriodStartDate,
						 PAADM_AdmTime AS encounterPeriodStartTime,
						 PAADM_DischgDate AS encounterPeriodEndDate,
						 PAADM_DischgTime AS encounterPeriodEndTime,
						 PAADM_PAPMI_DR->PAPMI_No AS subjectReference,
						 PAADM_VisitStatus AS encounterStatus,
						 PAADM_UpdateDate AS lastUpdateDate,
						 PAADM_UpdateTime AS lastUpdateTime
				 	FROM PA_Adm
				   WHERE PAADM_Type IN (''I'', ''E'')
				 	 AND PAADM_PAPMI_DR->PAPMI_No = ''5484125''
					  '))
SELECT  encounterIdentifier,
		CASE
		WHEN encounterStatus IN ('C', 'N', 'X', 'T', 'J', 'H') THEN 'cancelled'
		WHEN encounterStatus IN ('D', 'R')
			 OR (encounterStatus IN ('A')
			 AND encounterPeriodStartDate IS NOT NULL
			 AND encounterPeriodEndDate IS NOT NULL) THEN 'finished'
		WHEN (encounterPeriodStartDate > CURRENT_TIMESTAMP
			 AND encounterPeriodStartDate IS NOT NULL)
			 OR encounterStatus IN ('P') THEN 'planned'
	  	WHEN encounterStatus IN ('A', 'S', 'W') THEN 'arrived'
		WHEN encounterPeriodStartDate IS NOT NULL AND encounterPeriodEndDate IS NULL THEN 'in-progress'
		ELSE 'unknown'
		END AS encounterStatusMapped,
		encounterStatus,
		encounterClassDesc,
		encounterClassCode,
		CASE
		WHEN ISNUMERIC(encounterTypeCode) <> 1 THEN NULL
		ELSE UPPER(encounterTypeDesc)
		END AS encounterTypeDesc,
		CASE
		WHEN ISNUMERIC(encounterTypeCode) <> 1 THEN NULL
		ELSE encounterTypeCode
		END AS encounterTypeCode,
		CONCAT(COALESCE(encounterPeriodStartDate, ''), 'T', COALESCE(encounterPeriodStartTime, '')) AS encounterPeriodStart,
		CONCAT(COALESCE(encounterPeriodEndDate, ''), 'T', COALESCE(encounterPeriodEndTime, '')) AS encounterPeriodEnd,
		subjectReference,
		CONCAT(COALESCE(lastUpdateDate, ''), 'T', COALESCE(lastUpdateTime, '')) AS lastUpdated
   FROM encounter_CTE;