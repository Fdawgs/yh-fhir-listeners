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

WITH encounter_CTE(encounterIdentifier, encounterClassDesc, encounterClassCode,
	encounterTypeDesc, encounterTypeCode, encounterPeriodStartDate,
	encounterPeriodStartTime, encounterPeriodEndDate, encounterPeriodEndTime,
	encounterHospitalizationAdmitsourceCodingCode, encounterHospitalizationAdmitsourceCodingDesc, encounterHospitalizationDischargedispositionCodingCode,
	encounterHospitalizationDischargedispositionCodingDesc, encounterAdmissionmethodCodingCode, encounterAdmissionmethodCodingDesc,
	encounterDischargemethodCodingCode, encounterDischargemethodCodingDesc, subjectReference,
	encounterStatus, lastUpdateDate, lastUpdateTime)
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
						NULL AS encounterHospitalizationAdmitsourceCodingCode,
						NULL AS encounterHospitalizationAdmitsourceCodingDesc,
						NULL AS encounterHospitalizationDischargedispositionCodingCode,
						NULL AS encounterHospitalizationDischargedispositionCodingDesc,
						NULL AS encounterAdmissionmethodCodingCode,
						NULL AS encounterAdmissionmethodCodingDesc,
						NULL AS encounterDischargemethodCodingCode,
						NULL AS encounterDischargemethodCodingDesc,
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
						 PAADM_AdmSrc_DR->ADSOU_Code AS encounterHospitalizationAdmitsourceCodingCode,
						 PAADM_AdmSrc_DR->ADSOU_Desc AS encounterHospitalizationAdmitsourceCodingDesc,
						 CASE PAADM_Type
						 WHEN ''I'' THEN PAADM_MainMRADM_DR->MRADM_DischDestin_DR->DDEST_Code
						 ELSE NULL
						 END AS encounterHospitalizationDischargedispositionCodingCode,
						 CASE PAADM_Type
						 WHEN ''I'' THEN PAADM_MainMRADM_DR->MRADM_DischDestin_DR->DDEST_Desc
						 ELSE NULL
						 END AS encounterHospitalizationDischargedispositionCodingDesc,
						 PAADM_AdmMethod_DR->ADMETH_Code AS encounterAdmissionmethodCodingCode,
						 PAADM_AdmMethod_DR->ADMETH_Desc AS encounterAdmissionmethodCodingDesc,
						 CASE PAADM_Type
						 WHEN ''I'' THEN
						 PAADM_MainMRADM_DR->MRADM_ConditAtDisch_DR->DISCON_Code
						 ELSE NULL
						 END AS encounterDischargemethodCodingCode,
						 CASE PAADM_Type
						 WHEN ''I'' THEN
						 PAADM_MainMRADM_DR->MRADM_ConditAtDisch_DR->DISCON_Desc
						 ELSE NULL
						 END AS encounterDischargemethodCodingDesc,
						 PAADM_PAPMI_DR->PAPMI_No AS subjectReference,
						 PAADM_VisitStatus AS encounterStatus,
						 PAADM_UpdateDate AS lastUpdateDate,
						 PAADM_UpdateTime AS lastUpdateTime
				 	FROM PA_Adm
				   WHERE PAADM_Type IN (''I'', ''E'')
				 	 AND PAADM_PAPMI_DR->PAPMI_No = ''5035803''
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
		consultants.dischargeConsultantCode AS encounterParticipantIndividualCode_discharging,
		consultants.dischargeConsultantDesc AS encounterParticipantIndividualDisplay_discharging,
		consultants.admissionConsultantCode AS encounterParticipantIndividualCode_admitting,
		consultants.admissionConsultantDesc AS encounterParticipantIndividualDesc_admitting,
		encounterHospitalizationAdmitsourceCodingCode,
		encounterHospitalizationAdmitsourceCodingDesc,
		encounterHospitalizationDischargedispositionCodingCode,
		encounterHospitalizationDischargedispositionCodingDesc,
		encounterAdmissionmethodCodingCode,
		encounterAdmissionmethodCodingDesc,
		encounterDischargemethodCodingCode,
		encounterDischargemethodCodingDesc,
		subjectReference,
		CONCAT(COALESCE(lastUpdateDate, ''), 'T', COALESCE(lastUpdateTime, '')) AS lastUpdated
   FROM encounter_CTE
		LEFT JOIN (SELECT *
		   			 FROM (SELECT REPLACE(PAADM_ADMNo, '/', '-') AS PAADM_ADMNo,
								  dischargeConsultantCode,
								  dischargeConsultantDesc,
								  admissionConsultantCode,
								  admissionConsultantDesc,
								  row_number() over (partition by PAADM_ADMNo order by TRANS_ChildSub)	AS transOrder
							 FROM OPENQUERY([ENYH-PRD-ANALYTICS],
							 		'SELECT TOP 100 TRANS_ParRef->PAADM_AdmDocCodeDR->CTPCP_Code AS dischargeConsultantCode,
									 		TRANS_ParRef->PAADM_AdmDocCodeDR->CTPCP_Desc AS dischargeConsultantDesc,
									 		TRANS_CTCP_DR->CTPCP_Code AS admissionConsultantCode,
											TRANS_CTCP_DR->CTPCP_Desc AS admissionConsultantDesc,
											TRANS_ChildSub,
											TRANS_ParRef->PAADM_ADMNo
									   FROM PA_AdmTransaction
									  WHERE TRANS_ParRef->PAADM_Type = ''I''
									  	AND TRANS_ParRef->PAADM_Epissubtype_DR->SUBT_Code = ''1''
										AND TRANS_CTCP_DR IS NOT NULL
                                        AND TRANS_ParRef->PAADM_PAPMI_DR->PAPMI_No = ''5484125''')
						   ) a  WHERE transOrder = 1) consultants
		ON encounter_CTE.encounterIdentifier = consultants.PAADM_ADMNo;