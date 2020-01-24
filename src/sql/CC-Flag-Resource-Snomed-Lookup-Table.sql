USE [lookup]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ydh_alert_list]
(
    [YDH_TrakCare_Code] [nvarchar](50) NOT NULL,
    [YDH_TrakCare_Display] [nvarchar](50) NOT NULL,
    [SNOMED_Code] [bigint] NULL,
    [SNOMED_Display] [nvarchar](100) NULL,
    [Comments] [nvarchar](150) NULL,
    CONSTRAINT [PK_ydh_alert_list] PRIMARY KEY CLUSTERED 
(
	[YDH_TrakCare_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'ABU', N'History of Violence / Abuse', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'ANTI', N'Significant Antibodies', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'ARA', N'At Risk Adult', 225915006, N'At risk of abuse', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'ARC', N'At Risk Child', 704659007, N'At risk of child abuse', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'AST', N'Asthmatic', 195967001, N'Asthma', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'ATHENA', N'Athena notes on patient centre', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'BABY', N'Baby loss', NULL, NULL, N'Unable to map as there are multiple types of baby loss: during birth; before birth; shortly after birth. There is no singular general SNOMED code.')
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'BLE', N'Bleeding Disorder/s', 64779008, N'Blood coagulation disorder', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'BMI40', N'BMI>40', 408512008, N'Body mass index 40+ - severely obese', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'BRE', N'Breast Feeding Mother', 169750002, N'Mother currently breast-feeding', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'CANCFU', N'Cancer Follow Up', 719864002, N'Monitoring following treatment for cancer', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'CDIFF', N'Clostridium Difficile', 186431008, N'Clostridium difficile infection', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'CJD', N'CJD Risk', 416805005, N'At risk of variant Creutzfeldt-Jakob disease', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'CO2RET', N'CO2 Retainer', 29596007, N'Hypercapnia', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'COM', N'Communication or Language Difficulties', 32000005, N'Difficulty using verbal communication', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'CONFU', N'Prone to Confusion', 706880001, N'At risk of confusion', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'COPD', N'COPD', 13645005, N'Chronic obstructive lung disease', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'CPE', N'CPE  - Carbapenemase-producing Enterobacteriaceae', 734351004, N'Carbapenemase-producing Enterobacteriaceae', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'CTIMP', N'Drug Trial', 713670002, N'Entered into drug clinical trial', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'DDA', N'Do not disclose patient address', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'DELER', N'Delirium', 2776000, N'Delirium', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'DEME', N'Dementia Pt', 52448006, N'Dementia', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'DEP', N'Deprivation of Liberty (DOL)', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'DIF', N'Difficult intubation or airway management', 718447001, N'Difficult intubation', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'DNR', N'Do Not Resuscitate Pt', 304253006, N'Not for resuscitation', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'EDCP', N'ED Care Plan', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'EOLCP', N'End of Life Care Plan', 713673000, N'Has end of life care plan', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'EPI', N'Epileptic', 84757009, N'Epilepsy', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'FEEDASSIST', N'Needs Assistance with Feeding', 129033007, N'Feeding assisted', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'FETALAB', N'Fetal abnormality', NULL, NULL, N'Unable to map as there are multiple SNOMED codes for fetal abnormalities but not a singular general code')
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'FRA', N'Frailty', 248279007, N'Frailty', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'GBSTR', N'Group B Strep', 426933007, N'Streptococcus agalactiae infection', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'GRE', N'GRE- Glycopeptide Resistant Enterococcus', 1065701000000100, N'Infection caused by glycopeptide resistant enterococcus', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'HAEMACT', N'Haematology Active Treatment', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'HAEMFU', N'Haematology Follow Up', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'HEA', N'Heart Failure Patient', 161505003, N'H/O: heart failure', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'HEI', N'Hearing Impaired', 15188001, N'Hearing loss', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'INF', N'Other ', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'LEGACYALERT', N'Legacy Alert and/or Allergy Information', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'LTOT', N'Home Oxygen Therapy', 426990007, N'Home oxygen therapy', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'MAL', N'Malignant Hyperthermia Risk', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'MRGNO', N'MRGNO – Multi-resistant Gram-negative ', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'MRSA', N'MRSA', 13790001000004100, N'Bacteraemia due to Methicillin resistant Staphylococcus aureus', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'NBI', N'Newborn Feeding Issue', 72552008, N'Feeding problems in newborn', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'NBMO', N'Nil By Mouth', 182923009, N'Nil by mouth', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'NONCTIMP', N'Non-drug Trial', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'ONCACTI', N'Cancer Active Treatment', 395073001, N'Cancer treatment started', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'OSA', N'Obstructive Sleep Apnoea (OSA)', 78275009, N'Obstructive sleep apnoea syndrome', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PAC', N'Pacemaker in situ', 441509002, N'Cardiac pacemaker in situ', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PAL', N'Palliative Care Patient', 103735009, N'Palliative care', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PCN', N'Parent / Carer Notification', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PCP', N'Paediatric Complex Patient', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PON', N'Severe post-operative nausea / vomiting', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PPP', N'Previous Puerperal Psychosis', 726623007, N'H/O: postpartum psychosis', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PRE', N'Pregnancy', 77386006, N'Pregnant', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PRK', N'Parkinsons Disease Pt', 49049000, N'Parkinson''s disease', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'PVL', N'PVL Staph Aureus', 446413008, N'Infection due to Panton-Valentine leucocidin producing Staphylococcus aureus', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'REG', N'Registered Therapeutic Addict Patient', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'REN', N'Renal Dialysis Patient', 265764009, N'Renal dialysis', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'RESORG', N'Resistant Organism- refer to notes', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SEC2', N'Detained-Section 2', 413191000000109, N'Detained in hospital under Section 2 of the Mental Health Act 1983 (England and Wales)', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SEC3', N'Detained-Section 3', 431071000000100, N'Detained in hospital under Section 3 of the Mental Health Act 1983 (England and Wales)', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SEC5', N'Detained-Section 5(2)', 470621000000104, N'Detained in hospital under Section 5 (2) of the Mental Health Act 1983 (England and Wales)', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SECO', N'Detained-Other', NULL, NULL, NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SIMEN', N'Significant Psychiatrc History', 161464003, N'H/O: psychiatric disorder', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SPE', N'Speech Impaired', 29164008, N'Disturbance in speech', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'STRK', N'Stroke', 230690007, N'Stroke', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SUX', N'Suxamethonium (Scoline) Apnoea Risk', 54602006, N'Suxamethonium apnoea', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'SWAL', N'Impaired Swallow', 399122003, N'Swallowing problem', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'TEP', N'Treatment Escalation Plan', 735324008, N'Treatment escalation plan', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'TIA', N'TIA', 266257000, N'Transient cerebral ischaemia', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'TYPE1DM', N'Type 1 Diabetes', 46635009, N'Type 1 diabetes mellitus', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'TYPE2DM', N'Type 2 Diabetes', 44054006, N'Type 2 diabetes mellitus', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'VIS', N'Visually Impaired', 397540003, N'Visual impairment', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'W10', N'Not for Ward 10', NULL, NULL, N'Unique to YDH; Ward 10 is Paediatric ward')
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'WAND', N'Wanderer/Absconder', 50239007, N'Wandering', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'YBF', N'Patient is Breastfeeding Pt', 169741004, N'Breast fed', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'YDHEADD', N'Addison''s Disease', 363732003, N'Addison''s disease', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'YDHFALL', N'Fall Risk Alert', 129839007, N'At risk for falls', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'YDHLD', N'Learning Disability', 1855002, N'Developmental academic disorder', NULL)
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'YDHSYMP', N'Symphony Patient', NULL, NULL, N'Unique to YDH')
INSERT [dbo].[ydh_alert_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [SNOMED_Code], [SNOMED_Display], [Comments])
VALUES
    (N'YDHUPPERGI', N'Upper G I', NULL, NULL, NULL)
