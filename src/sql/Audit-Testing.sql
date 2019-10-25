
-- SELECT TOP 1000 *
-- 	FROM OPENQUERY(
-- 		[ENYH-PRD-ANALYTICS], 'SELECT TOP 100 *
--         FROM SS_AuditTrailFields
--         WHERE FLD_ParRef = ''693401850''
--         ORDER BY FLD_ParRef DESC'
-- );



-- SELECT TOP 2000 *
-- 	FROM OPENQUERY(
-- 		[ENYH-PRD-ANALYTICS], 'SELECT TOP 2000 *
--         FROM SS_AuditTrail
--         WHERE AUD_PAPMI_DR = ''64675''
--           AND AUD_Table = ''PA_PatMas''
--         ORDER BY AUD_Date DESC, AUD_Time DESC'
-- ); 


SELECT TOP 100 *
	FROM OPENQUERY(
		[ENYH-PRD-ANALYTICS], 'SELECT TOP 100 *
        FROM SS_AuditTrail audtra
        LEFT JOIN SS_AuditTrailFields audtrafie
        ON audtra.AUD_RowID = audtrafie.FLD_ParRef
        WHERE AUD_Table = ''PA_Person''
        AND audtrafie.FLD_FieldNo = ''PAPER_ID''
        ORDER BY AUD_Date DESC, AUD_Time DESC'
); 

-- SELECT TOP 100 *
-- 	FROM OPENQUERY(
-- 		[ENYH-PRD-ANALYTICS], 'SELECT TOP 100 *
--         FROM SS_AuditTrail audtra
--         LEFT JOIN SS_AuditTrailFields audtrafie
--         ON audtra.AUD_RowID = audtrafie.FLD_ParRef
--         LEFT JOIN PA_PatMas patmas
--         ON audtra.AUD_PAPMI_DR = patmas.PAPMI_RowId1
-- 				LEFT JOIN PA_Person pers
-- 				ON patmas.PAPMI_RowId1 = pers.PAPER_RowId
--         WHERE audtra.AUD_PAPMI_DR = ''64675''
--           AND audtra.AUD_Table = ''PA_Person''
--           AND audtrafie.FLD_FieldNo NOT IN (''PAPER_UpdateDate'', ''PAPER_UpdateTime'', ''PAPER_UserUpdate'')
--           --AND pers.PAPER_UpdateDate = audtra.AUD_Date
--         ORDER BY audtra.AUD_Date DESC, audtra.AUD_Time DESC'
-- ); 


-- SELECT TOP 2000 *
-- 	FROM OPENQUERY(
-- 		[ENYH-PRD-ANALYTICS], 'SELECT TOP 2000 *
--         FROM PA_Patmas
--         WHERE PAPMI_RowId1 = ''64675'''
-- ); 
