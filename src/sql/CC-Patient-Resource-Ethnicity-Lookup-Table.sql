USE [lookup]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ydh_ethnicity_list]
(
    [YDH_TrakCare_Code] [nvarchar](2) NOT NULL,
    [YDH_TrakCare_Display] [nvarchar](50) NOT NULL,
    [CareConnect_Code] [nvarchar](2) NULL,
    [CareConnect_Display] [nvarchar](100) NULL,
    [Comments] [nvarchar](150) NULL,
    CONSTRAINT [PK_ydh_ethnicity_list] PRIMARY KEY CLUSTERED 
(
	[YDH_TrakCare_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[ydh_ethnicity_list]
    ([YDH_TrakCare_Code], [YDH_TrakCare_Display], [CareConnect_Code], [CareConnect_Display], [Comments])
VALUES
    (N'A', N'White British', N'A', N'British, Mixed British', NULL),
    (N'B', N'White Irish', N'B', N'Irish', NULL),
    (N'C', N'Any other White background', N'C', N'Any other White background', NULL),
    (N'D', N'White and Black Caribbean', N'D', N'White and Black Caribbean', NULL),
    (N'E', N'White and Black African', N'E', N'White and Black African', NULL),
    (N'F', N'White and Asian', N'F', N'White and Asian', NULL),
    (N'G', N'Any other mixed background', N'G', N'Any other mixed background', NULL),
    (N'H', N'Indian', N'H', N'Indian or British Indian', NULL),
    (N'J', N'Pakistani', N'J', N'Pakistani or British Pakistani', NULL),
    (N'K', N'Bangladeshi', N'K', N'Bangladeshi or British Bangladeshi', NULL),
    (N'L', N'Any other Asian background', N'L', N'Any other Asian background', NULL),
    (N'M', N'Caribbean', N'M', N'Caribbean', NULL),
    (N'N', N'African', N'N', N'African', NULL),
    (N'P', N'Any other Black background', N'P', N'Any other Black background', NULL),
    (N'R', N'Chinese', N'R', N'Chinese', NULL),
    (N'S', N'Any other ethnic group', N'S', N'Any other ethnic group', NULL),
    (N'Z', N'Not stated', N'Z', N'Not stated', NULL),
    (N'99', N'Not Known', N'Z', N'Not stated', N'No corresponding value for Not Known, mapped to Z')
