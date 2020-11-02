## <small>2.7.2 (2020-11-02)</small>

-   fix(listeners): unescape system part of [system]|[code] search params ([8f6f588](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8f6f588))
-   docs(readme): capitalise beginning of sentence ([ad8ee3e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ad8ee3e))

## <small>2.7.1 (2020-11-01)</small>

-   build(deps-dev): bump dev dependencies ([be4d993](https://github.com/Fdawgs/ydh-fhir-listeners/commit/be4d993))
-   docs(readme): change 'shareholder' to correct 'stakeholder' ([4a181c1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4a181c1))
-   docs(readme): correct descriptions of purpose and deployments ([e764edc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e764edc))
-   docs(readme): sort stakeholders alphabetically ([2fed6b2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2fed6b2))

## 2.7.0 (2020-10-16)

-   build(deps-dev): bump dev dependencies ([4d05ebb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4d05ebb))
-   fix(patient-res): catch empty nhs number trace status codes and deceased ([64db3c9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/64db3c9))
-   feat(medicationstatement-res): add encounter context reference ([dac39d6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dac39d6))
-   feat(patient-res): add nhs communication extension ([302798a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/302798a))
-   feat(patient-res): add religious affiliation extension ([6457c45](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6457c45))

## <small>2.6.3 (2020-10-14)</small>

-   docs: replace xlsx with ods file ([18556f8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/18556f8))
-   chore: convert channel to target mirth connect v3.9.1 ([58880c5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/58880c5))
-   build: create codeql-analysis.yml workflow file ([42a3007](https://github.com/Fdawgs/ydh-fhir-listeners/commit/42a3007))
-   build(deps-dev): bump dev dependencies ([c47a6f0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c47a6f0))
-   perf(listeners): reduce response time for read requests ([223b5e1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/223b5e1))
-   refactor(listeners): specify resource type in error message ([e54389b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e54389b))

## <small>2.6.2 (2020-10-05)</small>

-   refactor(listeners): declare fhir standard in operationoutcome ([70d2d2f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/70d2d2f))
-   refactor(listeners): read functionality to have same style as search ([15d04bf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/15d04bf))
-   fix(flag-res): add lastupdated meta value ([3ba2001](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3ba2001))
-   fix(listeners): correct flag and medicationstatement read query strings ([17d6d86](https://github.com/Fdawgs/ydh-fhir-listeners/commit/17d6d86))
-   fix(listeners): fix error variable name for read operationoutcomes ([27590d7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/27590d7))
-   fix(listeners): looping through java object, not param array ([4d825a4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4d825a4))
-   fix(listeners): search operationoutcomes using deprecated function ([a08fedc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a08fedc))
-   fix(medicationstatement-res): add lastupdated meta value ([5caa2d2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5caa2d2))
-   fix(templates): add support for nchar and char columntypes ([9fa7a7b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9fa7a7b))
-   docs: spelling and grammar fixes ([44e4de4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/44e4de4))

## <small>2.6.1 (2020-10-01)</small>

-   docs: add data quality issue section ([c0483a2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c0483a2))
-   docs(contributing): correct eslintrc file extension reference ([4afcfe2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4afcfe2))
-   docs(contributing): correct release step order ([f1f3c8d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f1f3c8d))
-   fix(medicationstatement-res): status search param had too many quotes ([5a08afc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5a08afc))

## 2.6.0 (2020-10-01)

-   build(deps-dev): bump dev dependencies ([faac1fa](https://github.com/Fdawgs/ydh-fhir-listeners/commit/faac1fa))
-   fix(allergyintolerance-res): remove leftover test limit ([778c94f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/778c94f))
-   fix(flag-res): remove leftover test limit ([24080ea](https://github.com/Fdawgs/ydh-fhir-listeners/commit/24080ea))
-   fix(listeners): add new allergyintolerance search params to support list ([a930148](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a930148))
-   fix(listeners): fix date period search params works ([fb868a7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fb868a7))
-   fix(patient-res): add deceased search param as accepted param ([837fc61](https://github.com/Fdawgs/ydh-fhir-listeners/commit/837fc61))
-   fix(patient-res): add leading zeros to nhsnumber trace status code ([b0d745b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b0d745b))
-   feat(allergyintolerance-res): add support for criticality search param ([5eea70b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5eea70b))
-   feat(allergyintolerance-res): add support for type search param ([4035a97](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4035a97))
-   feat(encounter-res): add support for status search param ([9acaa69](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9acaa69))
-   feat(flag-res): add support for date search param ([820961d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/820961d))
-   feat(patient-res): add support for address search param ([caaa24c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/caaa24c))
-   feat(patient-res): add support for address-city search param ([7b52998](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7b52998))
-   feat(patient-res): add support for deceased search param; bug fixes ([8f82be7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8f82be7))
-   feat(patient-res): add support for email search param ([28f173a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/28f173a))
-   feat(patient-res): add support for phone search param ([7b5fe55](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7b5fe55))
-   refactor(flag-res): add nolock to lookup table join ([ae21e69](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ae21e69))
-   refactor(listeners): make wherearray const multi-dimensional array ([a9e6521](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a9e6521))
-   refactor(listeners): remove redundant whereparts array variable ([93d3457](https://github.com/Fdawgs/ydh-fhir-listeners/commit/93d3457))
-   refactor(patient-res): remove use of lower function on already low gen ([8792c28](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8792c28))
-   refactor(resources): remove use of %allindex ([352b65a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/352b65a))
-   chore: make eslint rule cover file ([4016655](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4016655))
-   chore(capabilitystatement): refine address search param definition ([94a8f15](https://github.com/Fdawgs/ydh-fhir-listeners/commit/94a8f15))
-   style(encounter-res): casing of sql syntax ([8a96e39](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8a96e39))
-   style(resources): tidy comments and whitespace ([173f9d3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/173f9d3))
-   docs: fix uri structure ([4bf6f62](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4bf6f62))

## <small>2.5.2 (2020-09-24)</small>

-   docs: correct link to auth service ([1b78111](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1b78111))
-   docs(readme): add snyk badge ([48363dd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/48363dd))
-   docs(readme): repoint travis-ci badge from .org to .com ([d52cde2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d52cde2))
-   docs(worklogs): add list of known data quality issues ([94f2245](https://github.com/Fdawgs/ydh-fhir-listeners/commit/94f2245))
-   docs(worklogs): add list of known performance issues ([c617b88](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c617b88))
-   docs(worklogs): add nhw as contributor ([d7a5d59](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d7a5d59))
-   fix(allergyintolerance): use correct array for patient id search ([7ee26e3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7ee26e3))
-   chore(allergyintolerance): add example mrn ([254db7e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/254db7e))
-   build(dependabot): remove assignment of pull requests to user ([3183ff7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3183ff7))
-   build(deps-dev): add jsdoc and security eslint plugins ([2649877](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2649877))
-   build(deps-dev): bump dev dependencies ([e07b7a7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e07b7a7))
-   style: tidy jsdoc tags ([a2cee0c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a2cee0c))

## <small>2.5.1 (2020-08-28)</small>

-   build(deps-dev): bump dev dependencies ([05b7bee](https://github.com/Fdawgs/ydh-fhir-listeners/commit/05b7bee))
-   refactor(patient): remove restricted patient table join bottleneck ([4f365bc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4f365bc))
-   chore: reduce minimum nodejs engine version from 12.x to 10.x ([2c6ad52](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2c6ad52))
-   chore(github): add issue templates ([5c5281b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5c5281b))

## 2.5.0 (2020-08-13)

-   fix(patient): fix crashes when searching without mrn or nhs no ([162a273](https://github.com/Fdawgs/ydh-fhir-listeners/commit/162a273))
-   feat(patient): add address-postalcode search param ([f29af71](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f29af71))
-   build(deps-dev): bump dev dependencies to resolve security cve ([2cf3b7b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2cf3b7b))

## <small>2.4.1 (2020-07-27)</small>

-   build(deps-dev): bump dev dependencies ([39d4052](https://github.com/Fdawgs/ydh-fhir-listeners/commit/39d4052))
-   build(travis): add osx image ([e70dcd4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e70dcd4))
-   build(travis): add test script ([491215e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/491215e))
-   build(travis): add version branches to safelist ([24179b6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/24179b6))
-   build(travis): suppress git log ([b98e49c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b98e49c))
-   build(travis): update linux dist to latest lts ([d503c0d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d503c0d))
-   chore: update contact email ([9423d05](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9423d05))
-   chore: update team contact email again ([fce512b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fce512b))
-   chore(scripts): use gitignore for ignore-path options ([3edd42f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3edd42f))
-   fix(capabilitystatement): correct publisher value ([6d7b6cd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6d7b6cd))
-   fix(capabilitystatement): move sol dev email to seperate contact ([44f05cf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/44f05cf))
-   fix(capabilitystatement): remove sol dev email from my contact ([559cd10](https://github.com/Fdawgs/ydh-fhir-listeners/commit/559cd10))
-   fix(capabilitystatement): remove stray period ([77e83ee](https://github.com/Fdawgs/ydh-fhir-listeners/commit/77e83ee))
-   docs(readme): remove inactive dependabot badge ([4b829d2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4b829d2))

## 2.4.0 (2020-07-09)

-   build(deps-dev): bump development dependencies ([8c88121](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8c88121))
-   build(travis): set linux dist ([0c79dce](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0c79dce))
-   chore: add solutions development team contact to capability statement ([09d5a49](https://github.com/Fdawgs/ydh-fhir-listeners/commit/09d5a49))
-   chore: replace http links with https ([ffce9ca](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ffce9ca))
-   chore: tidy medicationstatement sql comments ([e75c68e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e75c68e))
-   feat(patient): add care connect ethnicity coding support ([becd830](https://github.com/Fdawgs/ydh-fhir-listeners/commit/becd830))
-   docs(readme): replace tst and sompar with new sft ([0b18629](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0b18629))

## <small>2.3.7 (2020-06-30)</small>

-   chore: create code_of_conduct.md ([ed76036](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ed76036))
-   chore(eslint): convert from json to js file format ([f6c9b06](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f6c9b06))
-   chore(scripts): expand coverage of eslint and prettier ([0061395](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0061395))
-   build(deps-dev): bump @babel/cli from 7.10.1 to 7.10.3 ([5d7806a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5d7806a))
-   build(deps-dev): bump @babel/core from 7.10.2 to 7.10.3 ([25173e3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/25173e3))
-   build(deps-dev): bump @babel/node from 7.10.1 to 7.10.3 ([4c6bdb5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4c6bdb5))
-   build(deps-dev): bump @babel/preset-env from 7.10.2 to 7.10.3 ([be83809](https://github.com/Fdawgs/ydh-fhir-listeners/commit/be83809))
-   build(deps-dev): bump @commitlint/config-conventional ([b45c589](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b45c589))
-   build(deps-dev): bump eslint-plugin-import from 2.20.2 to 2.22.0 ([9a7f9b9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9a7f9b9))
-   Create Dependabot config file ([567824d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/567824d))
-   style: add whitespace ([eb6f9cb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/eb6f9cb))

## <small>2.3.6 (2020-06-01)</small>

-   build(deps-dev): bump @babel/cli from 7.8.4 to 7.10.1 ([1d7faf5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1d7faf5))
-   build(deps-dev): bump @babel/core from 7.9.6 to 7.10.2 ([75545d9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/75545d9))
-   build(deps-dev): bump @babel/node from 7.8.7 to 7.10.1 ([8d4cc71](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8d4cc71))
-   build(deps-dev): bump @babel/preset-env from 7.9.6 to 7.10.2 ([446d70d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/446d70d))
-   build(deps-dev): bump conventional-changelog-cli from 2.0.31 to 2.0.34 ([d7c760a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d7c760a))
-   chore: update gitignore with latest github version ([f7eeb2b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f7eeb2b))
-   chore(eslintrc): enable json plugin ([c483ef9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c483ef9))
-   chore(package): set minimum engine version ([17b7633](https://github.com/Fdawgs/ydh-fhir-listeners/commit/17b7633))
-   docs(contributing): update conventional commit link to latest version ([8e998b9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8e998b9))

## <small>2.3.5 (2020-05-01)</small>

-   chore: convert channel to be compatible with mirth connect v3.9.0 ([b2c205b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b2c205b))
-   build(deps-dev): bump @babel/core from 7.9.0 to 7.9.6 ([72b929a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/72b929a))
-   build(deps-dev): bump @babel/preset-env from 7.9.0 to 7.9.5 ([7932131](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7932131))
-   build(deps-dev): bump @babel/preset-env from 7.9.5 to 7.9.6 ([df7b999](https://github.com/Fdawgs/ydh-fhir-listeners/commit/df7b999))
-   build(deps-dev): bump eslint-config-prettier from 6.10.1 to 6.11.0 ([d259973](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d259973))
-   build(deps-dev): bump prettier from 2.0.4 to 2.0.5 ([8d779ed](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8d779ed))
-   fix: add missing read support for flag resources ([5eab8bb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5eab8bb))
-   fix: read for patient resources that were showing all as restricted ([9b370b8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9b370b8))

## <small>2.3.4 (2020-04-06)</small>

-   chore: prep release ([fcba033](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fcba033))
-   chore: rebuild with retained lines ([e3e8fc4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e3e8fc4))
-   build(babel): add retainlines generator option ([b78421c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b78421c))
-   build(deps-dev): bump eslint-plugin-import from 2.20.1 to 2.20.2 ([a760db7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a760db7))
-   docs: grammar and spelling fixes ([da318b0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/da318b0))
-   docs(readme): correct section sizes ([f06ca59](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f06ca59))

## <small>2.3.3 (2020-03-27)</small>

-   style: parse with new prettier version ([313fba1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/313fba1))
-   chore: add covid-19 test patient ([9e8bb4e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9e8bb4e))
-   chore: compress supporting docs and images ([79a0a42](https://github.com/Fdawgs/ydh-fhir-listeners/commit/79a0a42))
-   chore(package): add prettier call to build script ([a78e299](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a78e299))
-   chore(package): add prettier call to changelog gen script ([9961d84](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9961d84))
-   build(deps-dev): bump @babel/core from 7.8.7 to 7.9.0 ([12a0d9a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/12a0d9a))
-   build(deps-dev): bump @babel/preset-env from 7.8.7 to 7.9.0 ([ffb2fc4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ffb2fc4))
-   build(deps-dev): bump eslint-config-prettier from 6.10.0 to 6.10.1 ([a736292](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a736292))
-   build(deps-dev): bump prettier from 1.19.1 to 2.0.1 ([45cea40](https://github.com/Fdawgs/ydh-fhir-listeners/commit/45cea40))
-   build(deps-dev): bump prettier from 2.0.1 to 2.0.2 ([ce8d9d4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ce8d9d4))
-   docs(flag): update covid-19 entries ([42a5d0b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/42a5d0b))
-   feat(flag-res): tidy snomed table sql; add covid-19 values ([d2e3400](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d2e3400))

## <small>2.3.2 (2020-03-16)</small>

-   chore(security): update dependencies ([d37748a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d37748a))
-   build(deps-dev): bump eslint-plugin-json from 2.1.0 to 2.1.1 ([884f2f2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/884f2f2))

## <small>2.3.1 (2020-03-12)</small>

-   style: change whitespace indents ([b9f753d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b9f753d))
-   fix(read): correct misspelled variable ([345f134](https://github.com/Fdawgs/ydh-fhir-listeners/commit/345f134))
-   chore: add school contact and pregnancy flag to test resources ([9a1e3fd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9a1e3fd))
-   chore: update lockfile ([7eaf5dc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7eaf5dc))
-   build(deps-dev): bump @babel/core from 7.8.4 to 7.8.6 ([6d619d4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6d619d4))
-   build(deps-dev): bump @babel/core from 7.8.6 to 7.8.7 ([48a4404](https://github.com/Fdawgs/ydh-fhir-listeners/commit/48a4404))
-   build(deps-dev): bump @babel/node from 7.8.4 to 7.8.7 ([a343217](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a343217))
-   build(deps-dev): bump @babel/preset-env from 7.8.4 to 7.8.6 ([1755080](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1755080))
-   build(deps-dev): bump @babel/preset-env from 7.8.6 to 7.8.7 ([b3f0405](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b3f0405))

## 2.3.0 (2020-02-24)

-   feat(patient-res): add school code ([722cf5f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/722cf5f))
-   feat(patient-res): add school contact ([4aa28c3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4aa28c3))
-   feat(patient-res): add school subquery ([a1a990d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a1a990d))
-   build(deps-dev): bump eslint-plugin-json from 2.0.1 to 2.1.0 ([2e2a10b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2e2a10b))
-   fix(patient-res): change contact.name from array to object ([fe1ca5f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fe1ca5f))
-   docs(flag): add coronavirus / Covid-19 flag code ([52fb8f8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/52fb8f8))

## <small>2.2.1 (2020-02-05)</small>

-   fix(patient-res): correct name of gp display column ([8de1e5c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8de1e5c))
-   fix(res-query): fix case of column name ([4ff1a92](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4ff1a92))

## 2.2.0 (2020-02-04)

-   feat: add getResultSet function ([df7dc2e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/df7dc2e))
-   feat(allergy-res): use getResultSet function ([29706f2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/29706f2))
-   feat(condition-res): use getResultSet function ([42778b1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/42778b1))
-   feat(docref-res): use getResultSet function ([df68c44](https://github.com/Fdawgs/ydh-fhir-listeners/commit/df68c44))
-   feat(encounter-res): add adm/dis wards and specialties ([af07ecb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/af07ecb))
-   feat(encounter-res): map adm/dis wards to location elements ([e437a34](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e437a34))
-   feat(encounter-res): use getResultSet function ([ce1037d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ce1037d))
-   feat(flag-res): use getResultSet function ([5ce1cc0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5ce1cc0))
-   refactor: remove unused variable ([710cda2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/710cda2))
-   refactor(medication-res): use getResultSet function ([1120e62](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1120e62))
-   refactor(patient-res): use getResultSet function ([e1058c6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e1058c6))
-   chore: lint and build encounter changes ([815bc14](https://github.com/Fdawgs/ydh-fhir-listeners/commit/815bc14))
-   chore: move channel files to dist ([48a7942](https://github.com/Fdawgs/ydh-fhir-listeners/commit/48a7942))
-   chore: use prettier ([414c22c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/414c22c))
-   chore(eslintignore): add .eslintignore file ([6172160](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6172160))
-   chore(prettierignore): add dist directory ([3cad27a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3cad27a))
-   fix: convert getResultSet return to object not array ([ec447b4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ec447b4))
-   fix(encounter-res): fix indentifier values ([faf9444](https://github.com/Fdawgs/ydh-fhir-listeners/commit/faf9444))
-   build(babel): add babel transcompiling ([459f062](https://github.com/Fdawgs/ydh-fhir-listeners/commit/459f062))
-   build(babel): disable strict mode ([06795b6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/06795b6))
-   build(deps-dev): bump eslint-config-prettier from 6.9.0 to 6.10.0 ([bd1a1d1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bd1a1d1))
-   build(deps-dev): bump eslint-plugin-import from 2.20.0 to 2.20.1 ([4d42f43](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4d42f43))
-   docs: replace references to src with dist ([e42afcb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e42afcb))
-   docs(contributing): add transcompiling steps ([32fe772](https://github.com/Fdawgs/ydh-fhir-listeners/commit/32fe772))
-   docs(contributing): grammar and punctuation fixes ([6cbda2c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6cbda2c))
-   docs(contributing): grammatical fixes and minor corrections ([c24e44c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c24e44c))
-   docs(readme): grammatical fixes and minor corrections ([92ac062](https://github.com/Fdawgs/ydh-fhir-listeners/commit/92ac062))
-   docs(readme): spelling fixes ([9af14f8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9af14f8))

## 2.1.0 (2020-01-24)

-   chore: add prettierignore file ([0d99767](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0d99767))
-   chore: move test patients into test_resources route ([e0654ea](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e0654ea))
-   chore: remove live_backups ([b5cfab5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b5cfab5))
-   chore: tidy config structure ([9c8c5da](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9c8c5da))
-   chore(test-patient): add flag resource for 9449304513 ([96c83a5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/96c83a5))
-   chore(test-patient): add flag resource for 9449307210 ([55b66af](https://github.com/Fdawgs/ydh-fhir-listeners/commit/55b66af))
-   chore(test-patient): update test patient 9449304513 example ([8b2ffce](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8b2ffce))
-   chore(test-patient): update test patient 9449307210 example ([cf747eb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/cf747eb))
-   docs: add contributing guide ([cda09b3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/cda09b3))
-   docs: add quote on purpose of repo ([98659c6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/98659c6))
-   docs: add src/CapabilityStatement to release steps ([3df7c52](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3df7c52))
-   docs: add version of TrakCare deployed against ([a7a2bae](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a7a2bae))
-   docs: clarify on what Mirth Connect doesn't support ([322faef](https://github.com/Fdawgs/ydh-fhir-listeners/commit/322faef))
-   docs(flag): tidy whitespace ([4b272f1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4b272f1))
-   docs(readme): add travis-ci button ([7d81984](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7d81984))
-   ci(travis): add build config ([a7ea735](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a7ea735))
-   feat: add documentation value ([bb86721](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bb86721))
-   feat: extend CapabilityStatement resource values ([5a853b1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5a853b1))
-   feat(flag): add snomed code support ([996393a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/996393a))
-   build: add basic test script ([de01c9f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/de01c9f))

## 2.0.0 (2020-01-16)

-   chore: increment major release version ([5856aef](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5856aef))
-   feat: Add changelog generation ([1094555](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1094555))
-   feat: add class search parameter ([1a19f32](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1a19f32))
-   feat: add type and class search parameters to channel ([2405ba5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2405ba5))
-   feat: add type search parameter ([340695c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/340695c))
-   refactor: remove redundant checks for descs ([0614fe7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0614fe7))
-   refactor: remove redundant newStringOrUndefined function calls ([09e5dcc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/09e5dcc))
-   refactor: stop queries from running if patient ID not present ([8afcc3d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8afcc3d))
-   docs: fix key task table ([341f835](https://github.com/Fdawgs/ydh-fhir-listeners/commit/341f835))
-   docs: update contextual link key task table ([b31e178](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b31e178))
-   Add outpatient encounter.class coding ([7c059bd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7c059bd))
-   Add outpatient encounter.class coding ([b2082f5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b2082f5))
-   Bump eslint-plugin-import from 2.19.1 to 2.20.0 ([80f72e9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/80f72e9))
-   Fix test patient reference ([10b8e97](https://github.com/Fdawgs/ydh-fhir-listeners/commit/10b8e97))
-   Update dependencies ([ad295fe](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ad295fe))
