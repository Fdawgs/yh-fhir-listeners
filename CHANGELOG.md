# Changelog

All notable changes to this project will be documented in this file.

## [7.0.2](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v7.0.1...v7.0.2) (2023-02-02)


### Bug fixes

* **sql/flag:** remove linebreaks ([#439](https://github.com/Fdawgs/ydh-fhir-listeners/issues/439)) ([640fc72](https://github.com/Fdawgs/ydh-fhir-listeners/commit/640fc7248aa40bf40c046fd083189cc43206cdbd))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.4.1 to 17.4.2 ([#446](https://github.com/Fdawgs/ydh-fhir-listeners/issues/446)) ([5bf67c8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5bf67c87ddc9a59a84e38eab955966b47cbdcf9b))
* **deps-dev:** bump @commitlint/config-conventional ([#442](https://github.com/Fdawgs/ydh-fhir-listeners/issues/442)) ([14d8f71](https://github.com/Fdawgs/ydh-fhir-listeners/commit/14d8f719f6dcbe2961097947b1d46de0e851c14a))
* **deps-dev:** bump eslint from 8.31.0 to 8.33.0 ([#441](https://github.com/Fdawgs/ydh-fhir-listeners/issues/441)) ([20d5b1e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/20d5b1e71cee42de7d6affa14159a88e8ea7d0a8))
* **deps-dev:** bump eslint-plugin-import from 2.26.0 to 2.27.5 ([#443](https://github.com/Fdawgs/ydh-fhir-listeners/issues/443)) ([72abc3a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/72abc3a393e7177c348540735f49c4f5d4ef9adf))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.6.4 to 39.7.5 ([#445](https://github.com/Fdawgs/ydh-fhir-listeners/issues/445)) ([f1156c5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f1156c518f883b10454b29068ef18f21636df6fa))
* **deps-dev:** bump eslint-plugin-security from 1.5.0 to 1.7.0 ([#447](https://github.com/Fdawgs/ydh-fhir-listeners/issues/447)) ([11a440e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/11a440e4075358cbd5d683b9396a1915eb6d6a2f))
* **deps-dev:** bump prettier from 2.8.2 to 2.8.3 ([#444](https://github.com/Fdawgs/ydh-fhir-listeners/issues/444)) ([ed56667](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ed566670bc0b93ac079bf12cb752832dcf99d1cc))
* **deps-dev:** bump transistive dependencies ([baea790](https://github.com/Fdawgs/ydh-fhir-listeners/commit/baea79031190a56717143120b93096005a88b2dc))


### Miscellaneous

* **flags:** add cancer and visual impairment flags to visible list ([9e55876](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9e55876b882c10d636029b8b004f0df6c06ade44))
* **sql:** remove redundant prefix in filenames ([8fc39c3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8fc39c357d503b2e1124232655139a6646255e6f))


### Continuous integration

* **cd:** copy lookup tables to dist ([259369f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/259369fb02a7284a34529591a24f8964db6139f1))


### Documentation

* **readme:** add sql step ([b5b32a6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b5b32a67a582743cdd70dc7f554dad5615fc5fa3))

## [7.0.1](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v7.0.0...v7.0.1) (2023-01-09)


### Bug fixes

* **medicationstatement:** map dose count/period to correct keys ([#433](https://github.com/Fdawgs/ydh-fhir-listeners/issues/433)) ([4dfffdd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4dfffddc87fc5a5ebcc8249bb555f503f85dbbbe))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.4.0 to 17.4.1 ([#437](https://github.com/Fdawgs/ydh-fhir-listeners/issues/437)) ([0d96f9f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0d96f9fb8a92d9478fbc4d8331d51581110b93f4))
* **deps-dev:** bump prettier from 2.8.1 to 2.8.2 ([#435](https://github.com/Fdawgs/ydh-fhir-listeners/issues/435)) ([2d22f60](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2d22f60e2bf2072607354a6464441a7c10f1136f))
* **deps-dev:** bump transistive dependencies ([91d234e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/91d234ed2f5cfc80e9dab91c2d020a89a3208008))
* minify build output; remove dist files from repo ([#436](https://github.com/Fdawgs/ydh-fhir-listeners/issues/436)) ([85d1fa4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/85d1fa48030a72bbc21c8a7c2ee6f149dab0142d))
	* Minification has been introduced to discourage team members at YDH from editing deployed JavaScript in Mirth Connect, and for them to use the git repos to ensure changes are tracked
* remove prettier from build script ([3e3b133](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3e3b1334608b41ae6030196da097281d82a8ba67))

## [7.0.0](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v6.0.1...v7.0.0) (2023-01-06)


### ⚠ BREAKING CHANGES

* minimum required version of node increased from 14.0.0 to 18.12.1
	* Node 14 and 16 becomes EOL in April and September 2023 respectively, which is the same time that [Yeovil District Hospital NHS Foundation Trust is due to merge with Somerset NHS Foundation Trust](https://yeovilhospital.co.uk/better-care-for-local-people-the-merger-of-yeovil-hospital-nhs-foundation-trust-with-somerset-nhs-foundation-trust/). Development will be focused on the merger at that point in time and I may have less time for this side-project, so this PR preemptively drops support to reduce work load in the future
### Bug fixes

* **buildresourcequery:** missing default return value ([934e3a8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/934e3a8a878c62fc320fcceecb717037d0ff1c64))


### Dependencies

* **deps-dev:** bump @babel/cli from 7.19.3 to 7.20.7 ([#429](https://github.com/Fdawgs/ydh-fhir-listeners/issues/429)) ([e2da1d0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e2da1d00ff44aa2c89c5f2f09554dafd708734fe))
* **deps-dev:** bump @babel/core from 7.19.6 to 7.20.12 ([#428](https://github.com/Fdawgs/ydh-fhir-listeners/issues/428)) ([05015a7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/05015a79a0a1addd6da88c16227cd01232c7a111))
* **deps-dev:** bump @babel/node from 7.20.0 to 7.20.7 ([#421](https://github.com/Fdawgs/ydh-fhir-listeners/issues/421)) ([87865ab](https://github.com/Fdawgs/ydh-fhir-listeners/commit/87865abc9e7828710c7f1661100eb65ac1416534))
* **deps-dev:** bump @babel/preset-env from 7.19.4 to 7.20.2 ([#419](https://github.com/Fdawgs/ydh-fhir-listeners/issues/419)) ([4638109](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4638109c538ef4b456e4e1f90edc090c2b12f690))
* **deps-dev:** bump @commitlint/cli from 17.2.0 to 17.4.0 ([#425](https://github.com/Fdawgs/ydh-fhir-listeners/issues/425)) ([ee94b8d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ee94b8d6e39b74996e50254f8f49868a71b95149))
* **deps-dev:** bump @commitlint/config-conventional ([#426](https://github.com/Fdawgs/ydh-fhir-listeners/issues/426)) ([653823f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/653823f0d5282500233f1eb4c675aeb615c786ca))
* **deps-dev:** bump eslint from 8.26.0 to 8.31.0 ([#424](https://github.com/Fdawgs/ydh-fhir-listeners/issues/424)) ([fc97c14](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fc97c145ad363caa885cac6647bbe2503a1e902c))
* **deps-dev:** bump eslint-config-prettier from 8.5.0 to 8.6.0 ([#427](https://github.com/Fdawgs/ydh-fhir-listeners/issues/427)) ([7921470](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7921470dab24487dea14d495effeb0b6772b12e1))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.4.0 to 39.6.4 ([#422](https://github.com/Fdawgs/ydh-fhir-listeners/issues/422)) ([9ab0c27](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9ab0c2746027d088e57ceb04420bee82d3f7eb29))
* **deps-dev:** bump husky from 8.0.1 to 8.0.3 ([#420](https://github.com/Fdawgs/ydh-fhir-listeners/issues/420)) ([18bb8a4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/18bb8a46c2fd19e156e4e7c385446203ee724988))
* **deps-dev:** bump prettier from 2.7.1 to 2.8.1 ([#423](https://github.com/Fdawgs/ydh-fhir-listeners/issues/423)) ([fd0dee9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fd0dee943418f9386a463d727e60870073e5b28f))
* **deps:** bump actions/dependency-review-action from 2 to 3 ([#417](https://github.com/Fdawgs/ydh-fhir-listeners/issues/417)) ([e4e78bc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e4e78bc87b99c76286be7bdc6bc06e5b766de2b2))
* **deps:** bump json5 from 1.0.1 to 1.0.2 ([#418](https://github.com/Fdawgs/ydh-fhir-listeners/issues/418)) ([692dfe3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/692dfe37e4b7e65adbd2d94ea8abd8b589170538))


### Miscellaneous

* drop support for node 14 and 16 ([#431](https://github.com/Fdawgs/ydh-fhir-listeners/issues/431)) ([8e6a249](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8e6a24933dba3fd70deabffa6f58d09f591417be))
* ignore false eslint warnings ([58ecb86](https://github.com/Fdawgs/ydh-fhir-listeners/commit/58ecb868611fd25ce07cca1639adbbba141da6bd))
* **license:** update license year ([15e1b30](https://github.com/Fdawgs/ydh-fhir-listeners/commit/15e1b30ca81290931cf61c9500671eadcb210c44))


### Continuous integration

* **cd:** create release asset ([a3c58d5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a3c58d5a62fe04be789c7b71c65c5194970b8d16))


### Documentation

* **contributing:** update release steps ([74b5e28](https://github.com/Fdawgs/ydh-fhir-listeners/commit/74b5e28fb77eeb0326c0739efa3c910548f0acf9))
* update contact details ([18326e8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/18326e80b7a4257eeb59c82e9753c879ed458933))

## [6.0.1](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v6.0.0...v6.0.1) (2022-11-01)


### Dependencies

* **deps-dev:** bump @babel/cli from 7.18.10 to 7.19.3 ([#412](https://github.com/Fdawgs/ydh-fhir-listeners/issues/412)) ([dbe81d2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dbe81d2ca90f611e6811db80a3aa0cd43915df87))
* **deps-dev:** bump @babel/core from 7.18.13 to 7.19.6 ([#408](https://github.com/Fdawgs/ydh-fhir-listeners/issues/408)) ([55eb7b3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/55eb7b345be0b584dee986d3b69c862e9083486a))
* **deps-dev:** bump @babel/node from 7.18.10 to 7.20.0 ([#411](https://github.com/Fdawgs/ydh-fhir-listeners/issues/411)) ([afa96a3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/afa96a3dc9d1a05a2fb552802406521c312ad816))
* **deps-dev:** bump @babel/preset-env from 7.18.10 to 7.19.4 ([#407](https://github.com/Fdawgs/ydh-fhir-listeners/issues/407)) ([581482f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/581482f4b04069b95d8aba7b70d0d3c4b6df8b5d))
* **deps-dev:** bump @commitlint/cli from 17.1.2 to 17.2.0 ([#413](https://github.com/Fdawgs/ydh-fhir-listeners/issues/413)) ([6f7c94f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6f7c94f8568d3651ff6c9e830f4d772576c94c92))
* **deps-dev:** bump @commitlint/config-conventional ([#414](https://github.com/Fdawgs/ydh-fhir-listeners/issues/414)) ([80583d6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/80583d68cc969e66c8e8c84e5f3c828628841c4b))
* **deps-dev:** bump eslint from 8.23.0 to 8.26.0 ([#409](https://github.com/Fdawgs/ydh-fhir-listeners/issues/409)) ([d027832](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d0278320ac312400b493082ce339b45364a27b4b))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.6 to 39.4.0 ([#410](https://github.com/Fdawgs/ydh-fhir-listeners/issues/410)) ([0f04d19](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0f04d19197f3412d98b946ec4f30bd30b068d91c))
* **deps-dev:** bump transistive dependencies ([79711b3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/79711b344d4432c7fe8143b17fa8e6837a3e16d2))


### Documentation

* content and grammar fixes ([bd4e20e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bd4e20e52af70b37cbfd5fd2c2489afb47645a4f))
* **readme:** remove stray asterisks ([7d1092e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7d1092ed2cf75103068c3eda0ef5e078c42b7ce8))
* use shorter urls ([13c7de9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/13c7de9407a90b8fc5d195e5fb4c955e3218c166))

## [6.0.0](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.3.3...v6.0.0) (2022-09-05)


### ⚠ BREAKING CHANGES

* drop support for EOL node 12

### Dependencies

* **deps-dev:** bump @babel/cli from 7.18.9 to 7.18.10 ([#405](https://github.com/Fdawgs/ydh-fhir-listeners/issues/405)) ([4c15ae6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4c15ae61e0a94d914cb49805d500141197f900dc))
* **deps-dev:** bump @babel/core from 7.18.9 to 7.18.13 ([#398](https://github.com/Fdawgs/ydh-fhir-listeners/issues/398)) ([a17edf7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a17edf72d6ebd3dbd6a9da20f7cf7f3d83134b23))
* **deps-dev:** bump @babel/node from 7.18.9 to 7.18.10 ([#403](https://github.com/Fdawgs/ydh-fhir-listeners/issues/403)) ([d9d4f2c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d9d4f2cfc2abe5003b4a39ee6f30af97cd4e7374))
* **deps-dev:** bump @babel/preset-env from 7.18.9 to 7.18.10 ([#400](https://github.com/Fdawgs/ydh-fhir-listeners/issues/400)) ([277a68f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/277a68fae3b4a48a7ec44518b22c4115da84cfde))
* **deps-dev:** bump @commitlint/cli from 17.0.3 to 17.1.2 ([#399](https://github.com/Fdawgs/ydh-fhir-listeners/issues/399)) ([c8a3333](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c8a33335dc928269fe4e6ddd22df32fb3f65bf99))
* **deps-dev:** bump @commitlint/config-conventional ([#401](https://github.com/Fdawgs/ydh-fhir-listeners/issues/401)) ([154e7a5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/154e7a57c24fa072253c3e355f9c9fb48ad13e31))
* **deps-dev:** bump eslint from 8.21.0 to 8.23.0 ([#402](https://github.com/Fdawgs/ydh-fhir-listeners/issues/402)) ([50cbe96](https://github.com/Fdawgs/ydh-fhir-listeners/commit/50cbe9686a502fb5fb3d41eac8e0567aa2e519b4))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.4 to 39.3.6 ([#404](https://github.com/Fdawgs/ydh-fhir-listeners/issues/404)) ([39c60b2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/39c60b2f56ac164d2aec25fd08f5334ceb45de31))
* **deps-dev:** bump transistive dependencies ([fa9e49d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fa9e49df0cf336e4181d23731a9ed7342af90392))


### Miscellaneous

* **.husky:** shell path and arg updates ([#396](https://github.com/Fdawgs/ydh-fhir-listeners/issues/396)) ([109408f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/109408f666760025dfe09f3eb7e22bf76bea20a8))
* **.vscode/extensions:** remove unmaintained extension ([c246e95](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c246e956bd77467c4a9199150e9ed389451abf18))
* drop support for node 12 ([093e1fd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/093e1fd07ed59ce7483f8510ea86653521b401da))

## [5.3.3](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.3.2...v5.3.3) (2022-08-01)


### Bug fixes

* **allergyintolerance:** add local coding ([#393](https://github.com/Fdawgs/ydh-fhir-listeners/issues/393)) ([99c8897](https://github.com/Fdawgs/ydh-fhir-listeners/commit/99c8897f8406bacaa0b2d41f4d608a3b4d695347))


### Documentation

* **readme:** add deprecation note ([090b631](https://github.com/Fdawgs/ydh-fhir-listeners/commit/090b6318ef6d8ad648f2ebf8b309af395f6cc148))
* **readme:** remove snyk badge ([149d6ac](https://github.com/Fdawgs/ydh-fhir-listeners/commit/149d6ac114fdf2c6dfd5fdeeeba4db0027edf9a7))


### Continuous integration

* update workflows ([f7dfbf6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f7dfbf619867020c7909d3f1fe222f594ccc7d0c))


### Miscellaneous

* **.*ignore:** use latest github ignore template; add pnpm lockfile ([22800c7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/22800c7e28464d436ae05cc2442938c6d36c3eb4))
* **.github:** add `FUNDING.yml` ([3c31cac](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3c31cac07ab17b9b4d4587629888227ba11bfb2a))
* **allergyintolerance:** refine coding system ([c3ef3a6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c3ef3a6643fef5ad8c77bcbc455c88602a26e5dd))
* **bug_report:** use node 18 as placeholder for `node-version` ([a26ed86](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a26ed86ea59b3bc8020b5dd0f1483eee773d06db))


### Dependencies

* **dependabot:** increase `open-pull-requests-limit` from 5 to 20 ([ab903cb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ab903cb25f8f6281d6abfd528c6a0b011387a83b))
* **deps-dev:** bump @babel/cli from 7.17.6 to 7.18.9 ([#388](https://github.com/Fdawgs/ydh-fhir-listeners/issues/388)) ([b225c25](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b225c25ec305213262572df299a8d0c2044c9bf6))
* **deps-dev:** bump @commitlint/cli from 16.2.3 to 17.0.3 ([#385](https://github.com/Fdawgs/ydh-fhir-listeners/issues/385)) ([93d1a36](https://github.com/Fdawgs/ydh-fhir-listeners/commit/93d1a36e73394d90d068feafd1d0d0c1e375702a))
* **deps-dev:** bump @commitlint/config-conventional ([#384](https://github.com/Fdawgs/ydh-fhir-listeners/issues/384)) ([c079e79](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c079e79103a7abeb7173bcfe68029dddc4650602))
* **deps-dev:** bump eslint from 8.13.0 to 8.20.0 ([#387](https://github.com/Fdawgs/ydh-fhir-listeners/issues/387)) ([873509b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/873509b84bb48388ea0b3e7491b4cfb79555825e))
* **deps-dev:** bump eslint from 8.20.0 to 8.21.0 ([#395](https://github.com/Fdawgs/ydh-fhir-listeners/issues/395)) ([0c753d8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0c753d8568048df66d5765bc58f7235462e4b97b))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.1.1 to 39.3.3 ([#386](https://github.com/Fdawgs/ydh-fhir-listeners/issues/386)) ([ce64c6d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ce64c6db26cbf6c30ead7f5eb361fa422ae284bb))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.3 to 39.3.4 ([#394](https://github.com/Fdawgs/ydh-fhir-listeners/issues/394)) ([d3d36c6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d3d36c66c001b59422474fb9a2f29fc9e9a0be31))
* **deps-dev:** bump husky from 7.0.4 to 8.0.1 ([#391](https://github.com/Fdawgs/ydh-fhir-listeners/issues/391)) ([be80dec](https://github.com/Fdawgs/ydh-fhir-listeners/commit/be80dec6d34317d2546d06307053feba02f87b27))
* **deps-dev:** bump prettier from 2.6.2 to 2.7.1 ([#392](https://github.com/Fdawgs/ydh-fhir-listeners/issues/392)) ([cb25019](https://github.com/Fdawgs/ydh-fhir-listeners/commit/cb25019c0969b69e7272a8887c87d04c27180105))
* **deps-dev:** bump sub-dependencies ([9af1863](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9af186349792e19ee193cafed3a3d6cf553df3e3))
* **deps:** bump github/codeql-action from 1 to 2 ([#383](https://github.com/Fdawgs/ydh-fhir-listeners/issues/383)) ([b753d41](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b753d41e441336235808cdf49ac8415aae4c2676))
* **deps:** bump wagoid/commitlint-github-action from 4 to 5 ([#382](https://github.com/Fdawgs/ydh-fhir-listeners/issues/382)) ([981e0ac](https://github.com/Fdawgs/ydh-fhir-listeners/commit/981e0ac7b5ec18f55275c36e050d4c602bea14b6))

### [5.3.2](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.3.1...v5.3.2) (2022-04-12)


### Continuous integration

* **automerge:** squash automerge prs ([#372](https://github.com/Fdawgs/ydh-fhir-listeners/issues/372)) ([4b87691](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4b87691b89d6879a7f65e76d31d3f1457fdbf0f6))
* **cd:** update org name for release-please-action ([5e25a82](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5e25a821b2cb470d4265e5f5bd37a11137a87b1d))
* reduce workflow permissions to minimum ([4754839](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4754839e426d2c92dc4b1875f735d18abd8c7ed4))
* replace workflow-run-cleanup-action with github concurrency ([b94da8c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b94da8c25e62ca77e5558091782617e031bfb039))


### Dependencies

* **deps-dev:** bump @babel/core from 7.17.8 to 7.17.9 ([#376](https://github.com/Fdawgs/ydh-fhir-listeners/issues/376)) ([5334d59](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5334d596acc39193c455be7938a2db0f2f12b890))
* **deps-dev:** bump eslint from 8.12.0 to 8.13.0 ([#380](https://github.com/Fdawgs/ydh-fhir-listeners/issues/380)) ([063a240](https://github.com/Fdawgs/ydh-fhir-listeners/commit/063a240a0314b0b1a3b8852a4eb19af653ce7185))
* **deps-dev:** bump eslint-plugin-import from 2.25.4 to 2.26.0 ([#377](https://github.com/Fdawgs/ydh-fhir-listeners/issues/377)) ([10bd5b7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/10bd5b7dbfdb09e24a57d804659c9de94107c1f5))
* **deps-dev:** bump eslint-plugin-jsdoc from 38.1.1 to 38.1.4 ([1d2b383](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1d2b3833e4fbf6971ffa024ae3236d35ae27a73c))
* **deps-dev:** bump eslint-plugin-jsdoc from 38.1.4 to 39.1.1 ([#378](https://github.com/Fdawgs/ydh-fhir-listeners/issues/378)) ([9b2a199](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9b2a199e6b4cf120e6ffb0115691611f4aa0ef6b))
* **deps-dev:** bump prettier from 2.6.1 to 2.6.2 ([#379](https://github.com/Fdawgs/ydh-fhir-listeners/issues/379)) ([4567feb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4567febcc94c2a6d9d5f4de7c375cc229a0ea2f9))
* **deps:** bump actions/upload-artifact from 2 to 3 ([#375](https://github.com/Fdawgs/ydh-fhir-listeners/issues/375)) ([0ecc87e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0ecc87e3f3b4e9dac51a21d246fa8fbf50b3b713))

### [5.3.1](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.3.0...v5.3.1) (2022-03-28)


### Documentation

* **contributing:** add mention of husky pre-commit hook ([2645d46](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2645d4620ea50769daabbf8aaa93b978e708cbe9))
* **contributing:** clarify style ([#320](https://github.com/Fdawgs/ydh-fhir-listeners/issues/320)) ([4e113d0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4e113d043f617f423c5e0c54ba7e51fae59b6c86))
* improve readability ([38471f7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/38471f7199adb1f9e702dc5d28aefc3a73e7987b))


### Miscellaneous

* **.github:** remove trailing whitespace ([4d78d73](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4d78d733afb3f491000640e20a9a7a267e99f286))
* ignore `.yarnclean` and `yarn.lock` ([#314](https://github.com/Fdawgs/ydh-fhir-listeners/issues/314)) ([30df3ad](https://github.com/Fdawgs/ydh-fhir-listeners/commit/30df3adb94c3d502b83ab6b2c3f1c9b420e6207a))
* **scripts:** remove redundant gitkraken fix from prepare script ([9b14cb0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9b14cb0602b32a16e39f86e0ab52abe1462f805b))
* **scripts:** use shorter arg aliases ([9a190b8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9a190b881870385f5515ae4ffbb336a5cc30ca46))


### Continuous integration

* add job step names, workflow comments, and whitespace ([873502a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/873502ada08a88835f9a6772c8bb102058a49399))
* **codeql-analysis:** remove unused autobuild step ([aba9db9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/aba9db9d3411961afa57108d5a73b30d2dac396e))
* **codeql:** grant minimum permissions to run; rename file ([#359](https://github.com/Fdawgs/ydh-fhir-listeners/issues/359)) ([2cfecf1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2cfecf1de2691fc0ad7a023a32907ee079b74889))
* only save pr number artifact for dependabot ([35406e2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/35406e2640ac04cb85fe8cd1cfff9b557a596235))
* remove spellcheck workflow ([#331](https://github.com/Fdawgs/ydh-fhir-listeners/issues/331)) ([fa111e3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fa111e3d0060e317c77c47249d138c490f0eda5d))


### Dependencies

* **.babelrc:** target rhino engine used by mirth connect ([#357](https://github.com/Fdawgs/ydh-fhir-listeners/issues/357)) ([ecdf8c4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ecdf8c413e080a07a04936c04f6fac70fa3dc1ab))
* **dependabot:** ignore minor and patch commit-lint updates ([#333](https://github.com/Fdawgs/ydh-fhir-listeners/issues/333)) ([d21e86d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d21e86d11a80af8de5875bd57fdb6f815425cb3f))
* **dependabot:** ignore minor and patch release-please-action updates ([#318](https://github.com/Fdawgs/ydh-fhir-listeners/issues/318)) ([3ca345e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3ca345ee3b498331e274f4482a20d97186d4c0ec))
* **dependabot:** major tags no longer need ignore support ([b557ea9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b557ea9e52bca9570f3e48818774ecb059118b8d))
* **dependabot:** use default open-pull-requests-limit value ([f3cfee3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f3cfee3fff935e1cbbd9c6f1d7fd216832c93dce))
* **deps-dev:** bump @babel/cli from 7.16.0 to 7.16.7 ([7244225](https://github.com/Fdawgs/ydh-fhir-listeners/commit/724422569481db9fc6f4e94278e363abb79d4ec5))
* **deps-dev:** bump @babel/cli from 7.16.7 to 7.16.8 ([8b668a8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8b668a8fbfb117666c5d4345abc6c4a68ccc33cb))
* **deps-dev:** bump @babel/cli from 7.16.8 to 7.17.6 ([03273e8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/03273e8759baec2aecdb3e41377154c237eb173e))
* **deps-dev:** bump @babel/core from 7.16.0 to 7.16.7 ([156b9e4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/156b9e4103f4d770570e229d3b6cb787aa6608d9))
* **deps-dev:** bump @babel/core from 7.16.12 to 7.17.5 ([fa8a89b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fa8a89bf8d53fbeb8ad1f5cf12a67105b2eaa49c))
* **deps-dev:** bump @babel/core from 7.16.7 to 7.16.12 ([637d0fa](https://github.com/Fdawgs/ydh-fhir-listeners/commit/637d0fabdd7f76c09f7aebb4bf4938de4435198f))
* **deps-dev:** bump @babel/core from 7.17.5 to 7.17.8 ([041d2ca](https://github.com/Fdawgs/ydh-fhir-listeners/commit/041d2ca1298fcc3000ed957d17ba11911df2f6f1))
* **deps-dev:** bump @babel/node from 7.16.0 to 7.16.7 ([cf1a7ec](https://github.com/Fdawgs/ydh-fhir-listeners/commit/cf1a7ec86fb2637a1c8302211b678209e19145aa))
* **deps-dev:** bump @babel/node from 7.16.7 to 7.16.8 ([da514f4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/da514f4ffa9a573f49ba0f0693bb7db336f25950))
* **deps-dev:** bump @babel/preset-env from 7.16.4 to 7.16.7 ([718e415](https://github.com/Fdawgs/ydh-fhir-listeners/commit/718e415e2fc639d43a4806452a73292883dcd9fa))
* **deps-dev:** bump @babel/preset-env from 7.16.7 to 7.16.11 ([ed3ccfb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ed3ccfbb5793937bece8bdc0a203c8749be7a5f5))
* **deps-dev:** bump @commitlint/cli from 15.0.0 to 16.0.1 ([bd9b939](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bd9b9397f6ef9aeff75214b683ae4c80935952bd))
* **deps-dev:** bump @commitlint/cli from 16.0.1 to 16.1.0 ([f91bc1e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f91bc1e9f6ce1453e5ca68e97b2a74b11bb399d5))
* **deps-dev:** bump @commitlint/cli from 16.1.0 to 16.2.1 ([83e51bd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/83e51bd2c0f826285634a5ef5db1f3021b25e7f8))
* **deps-dev:** bump @commitlint/cli from 16.2.1 to 16.2.3 ([3a591ba](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3a591ba44169c82e995bac73c9d7503683d861a7))
* **deps-dev:** bump @commitlint/config-conventional ([5729ab7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5729ab72d451006213d0d8440bd089f0a6a3a532))
* **deps-dev:** bump @commitlint/config-conventional ([610caf2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/610caf29891e4693e2ccc3624b35a75a845f9aa5))
* **deps-dev:** bump eslint from 8.10.0 to 8.11.0 ([48258fc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/48258fc751fff1a50e32609fb8d43e5a7d1a755b))
* **deps-dev:** bump eslint from 8.11.0 to 8.12.0 ([dd02015](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dd02015737e1f8624bd6c278d20032b05bc8c583))
* **deps-dev:** bump eslint from 8.3.0 to 8.6.0 ([61e55d0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/61e55d0f3e78e395c9142566a802bc781825344e))
* **deps-dev:** bump eslint from 8.6.0 to 8.7.0 ([9bbd675](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9bbd67577a62ba68bca09d0242ab4b96c1d08549))
* **deps-dev:** bump eslint from 8.7.0 to 8.8.0 ([74c224a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/74c224a9600eeaa24224aacd1738fd8fca780be9))
* **deps-dev:** bump eslint from 8.8.0 to 8.9.0 ([fce0bd3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fce0bd388a82446aa6f9c76b82110309bdc07246))
* **deps-dev:** bump eslint from 8.9.0 to 8.10.0 ([38cacc3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/38cacc39743ecc1324ddcfeadde63f4a6b44b747))
* **deps-dev:** bump eslint-config-prettier from 8.3.0 to 8.4.0 ([de691c4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/de691c421546edbc0bd53230b03178a8e3988829))
* **deps-dev:** bump eslint-config-prettier from 8.4.0 to 8.5.0 ([c4ebc0e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c4ebc0ea1a181bf00a12709f647a367821f1a40c))
* **deps-dev:** bump eslint-plugin-import from 2.25.3 to 2.25.4 ([a9af268](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a9af268b9ebb31ad1eb55179f1e6e839c7d215b3))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.0.3 to 37.1.0 ([039b2e6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/039b2e6344703d54b256678ed63f06f9acf8f6e0))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.1.0 to 37.5.0 ([d93494c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d93494cc618926c92285ea9df0eb279d5a3fef26))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.5.0 to 37.7.0 ([091807e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/091807e3169ed4f7cf5755e9d4cbbc161a1716df))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.7.0 to 37.9.4 ([553271f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/553271f2550fcde263a7eb536074805e3cd12908))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.9.4 to 37.9.5 ([98e14dc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/98e14dca5bdb931f6be88dbc3de84a8158613a65))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.9.5 to 38.0.6 ([26c0075](https://github.com/Fdawgs/ydh-fhir-listeners/commit/26c0075c29cbd5442542e81a41881d122e63a706))
* **deps-dev:** bump eslint-plugin-jsdoc from 38.0.6 to 38.1.1 ([ee753a1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ee753a150f13fa1caa3f58a85659ef0db3d1833b))
* **deps-dev:** bump prettier from 2.4.1 to 2.5.0 ([62a3c1d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/62a3c1d911fb2aee9fbb0938aa367dff586960b7))
* **deps-dev:** bump prettier from 2.5.0 to 2.5.1 ([f7f86a3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f7f86a381c294f9020a5efb342512ff59559469c))
* **deps-dev:** bump prettier from 2.5.1 to 2.6.0 ([7c9cf85](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7c9cf85032ff3a603801144f57d0f303aabc407c))
* **deps-dev:** bump prettier from 2.6.0 to 2.6.1 ([e9ead3a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e9ead3aa576a6c712278cb9712387c01ae5e2aa4))
* **deps:** bump actions/checkout from 2 to 3 ([b5b1d8b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b5b1d8bf6ff3a75b44cf7c67bd9e33a05c90c17c))
* **deps:** bump actions/github-script from 5 to 6 ([2ecc800](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2ecc800b596c5ed91e18c24a8f38b4e8b835eacb))
* **deps:** bump actions/setup-node from 2 to 3 ([634b93c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/634b93c90595965057207c2a9e996d1282e6ff88))
* **deps:** bump GoogleCloudPlatform/release-please-action ([ea4191a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ea4191af61e1554033b9bf7a3d32c48bb2f2e81c))
* **deps:** bump GoogleCloudPlatform/release-please-action from 2 to 3 ([2057b79](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2057b791f762cb3ed20364df36d5718ddd9cb24e))
* **deps:** bump minimist from 1.2.5 to 1.2.6 ([198e45c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/198e45c1cd039421175227aaa2673e8e2a860920))

## [5.3.0](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.2.1...v5.3.0) (2021-11-24)


### Features

* **medicationstatement:** add `dateAsserted` ([0b02d7b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0b02d7b62ffba2326cbd824f632ed8ad5f27fa5f))
* **medicationstatement:** add `identifier` array ([26f9b28](https://github.com/Fdawgs/ydh-fhir-listeners/commit/26f9b282eb37a1e71a5798fe4394e6d88badff11))


### Bug fixes

* **capabilitystatement:** stop comments appearing under `fhir_comments` ([#305](https://github.com/Fdawgs/ydh-fhir-listeners/issues/305)) ([ad95a61](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ad95a61ace7be0872f1356b950c20a2043841570))
* **medicationstatement:** set statements with no end date as `active` ([e725db1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e725db1b01f99d195e3667bbe84ae26ec585c8cd))


### Continuous integration

* **ci:** do not run clean-up on draft prs ([59e92bf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/59e92bf49b9405d37603c7158bd276d69aec9860))
* **spell-check:** do not run on draft prs ([59dbe96](https://github.com/Fdawgs/ydh-fhir-listeners/commit/59dbe962f92f896289235f5ae55a00c0c984e3f8))
* trigger workflows when drafts marked as "ready to review" ([#296](https://github.com/Fdawgs/ydh-fhir-listeners/issues/296)) ([df523c6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/df523c6bf4ac62d27d147e013fa13d304ffb9db2))
* use actions/setup-node's cache option ([#304](https://github.com/Fdawgs/ydh-fhir-listeners/issues/304)) ([7d47a8c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7d47a8cac8669633856bf37f2bda15eb96e6871b))


### Dependencies

* **dependabot:** ignore minor and patch github-actions updates ([#297](https://github.com/Fdawgs/ydh-fhir-listeners/issues/297)) ([2e9ae7e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2e9ae7e8d054d12e3998e5769e4dae6ef7fb3297))
* **dependabot:** ignore minor and patch github-actions updates ([#303](https://github.com/Fdawgs/ydh-fhir-listeners/issues/303)) ([42ae22a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/42ae22abdaa9962121660e4ba7569e03010b494c))
* **deps-dev:** bump @babel/preset-env from 7.16.0 to 7.16.4 ([1b1fef5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1b1fef502de9b9fa255b3f2a16e511dbf64a81d6))
* **deps-dev:** bump @commitlint/cli from 13.2.1 to 14.1.0 ([29c6ba6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/29c6ba67a9014f6da86bf9910648fd07abd802e0))
* **deps-dev:** bump @commitlint/cli from 14.1.0 to 15.0.0 ([e45f058](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e45f05872da0439fa559ebc4ee689d9b53cace02))
* **deps-dev:** bump @commitlint/config-conventional ([8f5893c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8f5893cccc4252dbfe686f8affc702d8f952d21b))
* **deps-dev:** bump @commitlint/config-conventional ([3de23e9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3de23e9072bd085402ce36a945098eca25db3be6))
* **deps-dev:** bump eslint from 7.32.0 to 8.2.0 ([f329caa](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f329caa14d41796801a4f30b4e64d6811999ea18))
* **deps-dev:** bump eslint from 8.2.0 to 8.3.0 ([46ec2ac](https://github.com/Fdawgs/ydh-fhir-listeners/commit/46ec2ac1e92aa09c3b0ed3c20ce91424494e5a04))
* **deps-dev:** bump eslint-config-airbnb-base from 14.2.1 to 15.0.0 ([2fb3331](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2fb33314766f3fcdb14979a949419d5e78ed674c))
* **deps-dev:** bump eslint-plugin-import from 2.25.2 to 2.25.3 ([60414cf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/60414cfa23875f636ba73769bbe1ebbe39b77019))


### Improvements

* **read:** use `if` over `while` for single returns ([1ac54a0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1ac54a0b1710834db997d2bee122167394628e02))
* **search:** default clause should be the last clause ([b3e2105](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b3e21052a0262cd06f9695bf32ef576a6310249e))


### Documentation

* **coc:** reduce verbosity ([e248429](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e2484290f811e3a8a2cbe089e33a1719f2380025))
* **readme:** grammar fixes ([#293](https://github.com/Fdawgs/ydh-fhir-listeners/issues/293)) ([c5f839b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c5f839b6113f94940a53187e0810ab4483c72d1e))


### Miscellaneous

* update channel for mirth v3.12.0 ([#313](https://github.com/Fdawgs/ydh-fhir-listeners/issues/313)) ([ec6531c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ec6531c3095f83cf16d03744e80a30d065fb5959))

### [5.2.1](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.2.0...v5.2.1) (2021-11-03)


### Dependencies

* **deps-dev:** bump @babel/cli from 7.15.7 to 7.16.0 ([af3ac5d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/af3ac5df02a65b7fdc67df99fbd3cdb34a287212))
* **deps-dev:** bump @babel/core from 7.15.8 to 7.16.0 ([5f949ec](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5f949ec228f5971ece1f4aecf1b155091eb59e30))
* **deps-dev:** bump @babel/node from 7.15.8 to 7.16.0 ([acfb5e7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/acfb5e79b2f63fbe4a4e9d45b8b46a7eb7a0744d))
* **deps-dev:** bump @babel/preset-env from 7.15.8 to 7.16.0 ([e964e96](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e964e96d03c9d03580b7cea121dd5968595150d9))
* **deps-dev:** bump @commitlint/cli from 13.2.0 to 13.2.1 ([3ecd377](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3ecd377b448ced7ff3e382705209280a3454ff5a))
* **deps-dev:** bump eslint-plugin-import from 2.24.2 to 2.25.2 ([697df59](https://github.com/Fdawgs/ydh-fhir-listeners/commit/697df59cd7f4cb97d62ff30d873bb96a3968b45a))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.1.0 to 37.0.3 ([fc9312e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fc9312ef5ee13d7482ebf78166a05bff4f9ebcc7))
* **deps-dev:** bump husky from 7.0.2 to 7.0.4 ([3907328](https://github.com/Fdawgs/ydh-fhir-listeners/commit/39073282a572064c2395161e525c2da42a9ffae6))
* **deps-dev:** fix husky pre-commit hook ([22357c2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/22357c2346add903cbef83aefc8051d7629b961e))
* **deps-dev:** update lockfile from v1 to v2; bump sub-dependencies ([9061c08](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9061c082341f767a03d5530d121bc161f5ea1b78))
* **deps:** bump actions/checkout from 2.3.4 to 2.3.5 ([863e618](https://github.com/Fdawgs/ydh-fhir-listeners/commit/863e6180c3841fac514334f7b9cc19d8d599765f))
* **deps:** bump wagoid/commitlint-github-action from 4.1.5 to 4.1.9 ([16c070b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/16c070baa1c5fd06f4742919a0458f0557c1a264))


### Documentation

* bump coc from v2.0.0 to v2.1.0 ([#277](https://github.com/Fdawgs/ydh-fhir-listeners/issues/277)) ([4e336a0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4e336a0585f43e5aaac391496fe633508ad5f7b8))
* **readme:** increment dates ([f4b0cb9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f4b0cb918cdf5ce37c037e57307fa23beb3cd6ec))
* remove contextual link media ([06d748d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/06d748d5c2ef47d3133f0450df7fcd5c4d6d8343))


### Miscellaneous

* **.eslintrc:** set correct ecmascript version ([69ce5f9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/69ce5f96062cf0861e157bbc64d8e0af84c4dc4b))
* **.prettierrc:** only enable `bracketSameLine` for html ([#292](https://github.com/Fdawgs/ydh-fhir-listeners/issues/292)) ([31d5048](https://github.com/Fdawgs/ydh-fhir-listeners/commit/31d5048509ca311cfb57be278ac3348e1e06f458))
* **.vscode:** remove deprecated settings ([#275](https://github.com/Fdawgs/ydh-fhir-listeners/issues/275)) ([58f6603](https://github.com/Fdawgs/ydh-fhir-listeners/commit/58f660306792246e9f939af652907e77040d264e))
* add fhir extension ([451f8c9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/451f8c970415089fff5278f4f2b0181f94ec9d5f))
* update example test resources ([#291](https://github.com/Fdawgs/ydh-fhir-listeners/issues/291)) ([0a76f18](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0a76f18ffc9ac8762942385afbc7d25d98d22ad2))

## [5.2.0](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.1.1...v5.2.0) (2021-10-07)


### Features

* add support for procedure resources ([#253](https://github.com/Fdawgs/ydh-fhir-listeners/issues/253)) ([4e4738e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4e4738e9bba94341b5c9fdd542ff6d0e00d6cbb6))


### Continuous integration

* **automerge:** update location of octokit rest methods ([#265](https://github.com/Fdawgs/ydh-fhir-listeners/issues/265)) ([15f6ec6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/15f6ec646f3be8cdeda27d40b0072f5c7a9ee4c0))


### Miscellaneous

* **.husky/.gitignore:** remove now redundant file ([2461ca8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2461ca8cb1b24b9c876b8fbb17a904ed3d50c808))
* **.prettierrc:** enable `bracketsameline` option ([#266](https://github.com/Fdawgs/ydh-fhir-listeners/issues/266)) ([d021377](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d0213773160d008bfbf4d841436d51138c284900))
* **.prettierrc:** override defaults for html, css, and scss files ([#251](https://github.com/Fdawgs/ydh-fhir-listeners/issues/251)) ([fdc499e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fdc499e11f32a82cfe7b0ee9ebb11aeaa71efb95))
* **.vscode:** add `mhutchie.git-graph` extension ([0541b24](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0541b242de539416f88654f655b3b158e305d3d4))


### Documentation

* **readme:** add link to hospital logo ([c033a30](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c033a30004a0c3d85ee93be3964003633963f815))
* **readme:** add new contributors ([dca9ff2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dca9ff270b1651a6425e0c3de24ab524d934b20b))


### Improvements

* **procedure:** fully remove bodysite for now ([bb13b4a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bb13b4abb1eb4f10fb6a72f65f8ac117397f1b13))


### Dependencies

* **deps-dev:** bump @babel/cli from 7.15.4 to 7.15.7 ([ed0e9e3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ed0e9e399b75e65b97cf469c07da9a4b7fc925b9))
* **deps-dev:** bump @babel/core from 7.15.5 to 7.15.8 ([d038df5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d038df52722779afb61de4832dbaec2bffe74ac9))
* **deps-dev:** bump @babel/node from 7.15.4 to 7.15.8 ([5397f76](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5397f76ed63316286891160e83a0f37f25d92c9a))
* **deps-dev:** bump @babel/preset-env from 7.15.4 to 7.15.6 ([1bf3cab](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1bf3cab0b30b1e021c2193e563ff7166daae8e6c))
* **deps-dev:** bump @babel/preset-env from 7.15.6 to 7.15.8 ([b1153c3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b1153c378f071e6c8352a6489c65ace068fc559d))
* **deps-dev:** bump @commitlint/cli from 13.1.0 to 13.2.0 ([39079c8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/39079c822a552b272e8b0b9bfdec2ec87ac1e69b))
* **deps-dev:** bump @commitlint/config-conventional ([9b961a3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9b961a3d57a5ce598bf2eb7daf03d69d6fc242dd))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.8 to 36.1.0 ([66a65cf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/66a65cf2fa92507efcdc09e4c55f3600c16347a0))
* **deps-dev:** bump prettier from 2.3.2 to 2.4.1 ([ece03d1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ece03d188ba058ecfa8cf4d55569a6aa97bb359d))
* **deps:** bump actions/github-script from 4.1 to 5 ([25d7d66](https://github.com/Fdawgs/ydh-fhir-listeners/commit/25d7d663a992e36d328ffaa46d7af982ac8677e1))
* **deps:** bump actions/setup-node from 2.4.0 to 2.4.1 ([2f6f138](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2f6f1384b27c93da12d9948bee20c8dcae15614e))
* **deps:** bump ansi-regex from 5.0.0 to 5.0.1 ([831e603](https://github.com/Fdawgs/ydh-fhir-listeners/commit/831e6037a088c64bdd2b666adaca89a3a65c1215))
* **deps:** bump GoogleCloudPlatform/release-please-action ([54e5c64](https://github.com/Fdawgs/ydh-fhir-listeners/commit/54e5c64714f7a2129659eb4d682aedb7facd5002))
* **deps:** bump GoogleCloudPlatform/release-please-action ([fa7a981](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fa7a981e6fb761317c99624d7a44b3b1f5fa49f2))
* **deps:** bump wagoid/commitlint-github-action from 4.1.1 to 4.1.4 ([79631db](https://github.com/Fdawgs/ydh-fhir-listeners/commit/79631db7c89db8941d4e4537492a9fb88b1f1f68))
* **deps:** bump wagoid/commitlint-github-action from 4.1.4 to 4.1.5 ([5cc4e48](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5cc4e48d95abbc0b0cd111bd781638a677675cc0))

### [5.1.1](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.1.0...v5.1.1) (2021-09-06)


### Bug fixes

* **resource/medicstat:** convert java string to js string for replace ([16fce06](https://github.com/Fdawgs/ydh-fhir-listeners/commit/16fce06ceb7e7dd21d09080e41c84baf2fba5da8))
* **resource/medicstat:** incomplete string escaping or encoding ([#246](https://github.com/Fdawgs/ydh-fhir-listeners/issues/246)) ([a0ad542](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a0ad5424bdfaa2e2f1a092637859b82855e4c48d))


### Documentation

* **contributing:** fix rhino link ([31236f4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/31236f463dbcc11b75c05c7446f42316a92fdd19))


### Miscellaneous

* **.github:** use new YAML configured GitHub issue forms ([#244](https://github.com/Fdawgs/ydh-fhir-listeners/issues/244)) ([a2e5b76](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a2e5b763bde7243d234a7f9545338db1f39f0474))


### Continuous integration

* **ci:** replace workflow-run-cleanup-action with github concurrency ([#245](https://github.com/Fdawgs/ydh-fhir-listeners/issues/245)) ([dec8076](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dec8076f39bf3839c0f1ccf59b26f127f869faaa))
* **ci:** revert to workflow-run-clean-action from github concurrency ([bfe5de4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bfe5de457593b38d639a286a38e9599ed6a65b0f))


### Dependencies

* **deps-dev:** bump @babel/cli from 7.14.8 to 7.15.4 ([f11a610](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f11a610687e91d5226ebfd27ba2a52ee641a44a0))
* **deps-dev:** bump @babel/core from 7.14.8 to 7.15.0 ([77d690f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/77d690f6684276c8525034517fed5627165c2c54))
* **deps-dev:** bump @babel/core from 7.15.0 to 7.15.5 ([cd37d8d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/cd37d8d864893c8515d2ce1561065bcdf4edcd71))
* **deps-dev:** bump @babel/node from 7.14.7 to 7.14.9 ([1d3fefd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1d3fefd9ca7cb3760e545a9e27e5ad3d4a772002))
* **deps-dev:** bump @babel/node from 7.14.9 to 7.15.4 ([393bff5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/393bff59ccb235772820c3d2eb952120064015c3))
* **deps-dev:** bump @babel/preset-env from 7.14.8 to 7.15.0 ([16f7174](https://github.com/Fdawgs/ydh-fhir-listeners/commit/16f71748fd98c5b4325c8d05636ed7fa4e23b768))
* **deps-dev:** bump @babel/preset-env from 7.15.0 to 7.15.4 ([b552f42](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b552f4229d612f6eb140bc6ebc3c6a79c7f405fc))
* **deps-dev:** bump eslint-plugin-import from 2.23.4 to 2.24.2 ([f6bbf7a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f6bbf7aa16509ff4421e616c5d68413dcac10106))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.6 to 36.0.8 ([d10ff41](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d10ff4158cc6bafad81f7b3887f104bf976a6a5e))
* **deps-dev:** bump husky from 7.0.1 to 7.0.2 ([c422f02](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c422f022606c0470b2cb4d9fe61a766b3fdb68f6))

## [5.1.0](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v5.0.0...v5.1.0) (2021-08-24)


### Features

* **medicationstatement:** add note and additionalinstruction key/values ([#221](https://github.com/Fdawgs/ydh-fhir-listeners/issues/221)) ([db5b06c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/db5b06c006d284e57789c3342fefb3d692742ca9))
* **patient:** add secondary identifiers to resource ([2e23b34](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2e23b34cc37ec2b9dc5747dc5cf29b79f7bb0f20))
* **search:** add additional patient identifier search params ([3ea6363](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3ea63636df84304f29b6fba5a7968523887db844))
* **sql/patient:** add secondary identifiers ([3bb8c93](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3bb8c93ede1eece1206ab209034a935a6479019f))


### Bug fixes

* **patient:** empty secondary identifier assignment ([b591e45](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b591e459c8987785bfca8b55d4e786f9af928fe3))
* **read:** add missing where predicates for patient reading ([1c52dd1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1c52dd10a8ab298472e143fa07d699f2d43f9dc3))
* **search:** add missing where clause for patient id search ([d961c69](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d961c698ac2bacd55b3df23999910d89cc84d302))
* **search:** patient secondary assignment ([c6b4d5b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c6b4d5bffa2db249bd0b7a5a7beab76a1d0b30b8))
* **search:** use correct identifier param for base patient id search ([404e0e6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/404e0e6bf046cedbfecd3e5db706728e4c07ad56))
* **search:** wrap switch expressions in string to convert to js string ([de719df](https://github.com/Fdawgs/ydh-fhir-listeners/commit/de719dfd89613338925bcdc9f0ada71b73581018))
* **sql/patient:** only retrieve active secondary ids ([ca51014](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ca51014a073e20d4bc3b86fc2098a745f78c4a28))


### Continuous integration

* **cd:** move perf optimizations and refactoring into same section ([a070746](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a0707466507f185b56e8943f1f5a5582083bbb18))


### Dependencies

* **deps-dev:** bump @babel/cli from 7.14.5 to 7.14.8 ([98864d4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/98864d4f7d5707b9a8f925d3655637b221aaeb9d))
* **deps-dev:** bump @babel/core from 7.14.6 to 7.14.8 ([786394b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/786394bf483425d28c8315e22c1efff5e03de022))
* **deps-dev:** bump @babel/preset-env from 7.14.7 to 7.14.8 ([193f7f5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/193f7f5b8c675473eb4a05fa9c92700f67805a7d))
* **deps-dev:** bump @commitlint/cli from 12.1.4 to 13.1.0 ([fd8161b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fd8161b28f3cb3db3bbfe6b9f3aff613ed898dc6))
* **deps-dev:** bump @commitlint/config-conventional ([77c6250](https://github.com/Fdawgs/ydh-fhir-listeners/commit/77c62500d715a7436f78ea712fd32755ba803fbc))
* **deps-dev:** bump eslint from 7.29.0 to 7.32.0 ([dcde894](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dcde8942c23d9424e41e00a1a802d76ba2d962a7))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.0 to 35.4.1 ([d3a6a0e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d3a6a0e595c0892bc94c12fe3a0ebd41827c8073))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.1 to 36.0.6 ([3cfbf46](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3cfbf4654d764a0df00e645f21562ec46ad3cb77))
* **deps-dev:** bump husky from 6.0.0 to 7.0.1 ([a9e9a00](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a9e9a000b8d9a8e788dfdb4f0588c696ee720f83))
* **deps-dev:** bump prettier from 2.3.1 to 2.3.2 ([a3076d6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a3076d6f801dcfdbcaec258c08e33ddac1b660c9))
* **deps:** bump actions/github-script from 4.0.2 to 4.1 ([285da58](https://github.com/Fdawgs/ydh-fhir-listeners/commit/285da5829add0c1b784c3e78d5d2bcab0b448c7e))
* **deps:** bump actions/setup-node from 2.1.5 to 2.2.0 ([f36e60b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f36e60b3d9fc00660c35230f37f12e1c7f2d633b))
* **deps:** bump actions/setup-node from 2.2.0 to 2.3.0 ([4512ff3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4512ff3dad4ccd5577b431e2c4377c50824b1acd))
* **deps:** bump actions/setup-node from 2.3.0 to 2.4.0 ([8dc6238](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8dc6238f6b729a15859d5cd4f34f00081a07a8c8))
* **deps:** bump GoogleCloudPlatform/release-please-action ([d7ee113](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d7ee113fe27cca3ed7f2a04a2e61bfd879cc7300))
* **deps:** bump path-parse from 1.0.6 to 1.0.7 ([dd86ba9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dd86ba954edfc29a917adc53dcfd5ce9a6929302))
* **deps:** bump wagoid/commitlint-github-action from 3.1.4 to 4.1.1 ([fac2622](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fac26222ed29c3a7a6589e48554d2756ac890b06))


### Miscellaneous

* **sql/patient:** reorder predicates to reflect dynamic gen ([214d363](https://github.com/Fdawgs/ydh-fhir-listeners/commit/214d363df7b056301723d3b4e8a37737cef1ad51))
* **vscode:** disable redhat telemetry ([08b89e8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/08b89e8942274ae68b2c27cb5a7c7c366442c360))
* **vscode:** remove user space config setting ([b4a6190](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b4a619095bea07b6530e524138cebe6132043d00))


### Improvements

* **resource:** exclude legacy NHS numbers ([01b8e92](https://github.com/Fdawgs/ydh-fhir-listeners/commit/01b8e92993a35abe454d9d64dd5fb56874fd1271))
* **search:** replace if...else statements with switch ([a33a3fb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a33a3fb1b819a63463c41c04a7d7be180deb617c))
* **sql/patient:** exclude legacy NHS numbers ([762c166](https://github.com/Fdawgs/ydh-fhir-listeners/commit/762c166ee90bd9f51e00b82ec3c7ab4f160918fe))

## [5.0.0](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v4.0.1...v5.0.0) (2021-06-25)


### ⚠ BREAKING CHANGES

* **patient:** `deceasedBoolean` key removed

### Features

* **patient:** use `deceasedDateTime` instead of `deceasedBoolean` ([8fd6eb1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8fd6eb1b6f12920e42124276ba75594e0677ad0d))


### Bug fixes

* **patient:** add work phone contact number ([8f9b0cf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8f9b0cf94758ef8ed8a140799eef4aae30138642))
* **patient:** meta.lastupdated substring check ([9892588](https://github.com/Fdawgs/ydh-fhir-listeners/commit/98925887d51437751d74dd4f38cb671439147ed3))
* treat empty strings as undefined values ([bec7cbe](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bec7cbe2378f4dad03ece81c55a6d00e13afc6ab))


### Miscellaneous

* **ci:** replace `node-version` key with shorter `node` ([#191](https://github.com/Fdawgs/ydh-fhir-listeners/issues/191)) ([2a1dd8c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2a1dd8c3448bf84b8daee866a53b8b69516cf6f7))
* **workflows:** remove `stale.yml` ([92e5d9d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/92e5d9d676ff4bd091bf60c8d9e3507e2028bb04))


### Documentation

* **readme:** grammar and wordiness fixes ([cdc304d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/cdc304da0eec5233762e96c3162b43b8988d44ca))
* **readme:** update contributing section ([1826517](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1826517af5777102bf9f91cd24e33fd3a8005a24))


### Continuous integration

* fix key usage in `action/setup-node` ([a8388b8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a8388b85e02eedd98378edf4d51c8dc3778faeae))
* **link-check:** reduce frequency from daily to monthly ([#205](https://github.com/Fdawgs/ydh-fhir-listeners/issues/205)) ([47cc2e1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/47cc2e1ebf231fcaee1b59d24753621b762f151e))


### Dependencies

* **deps-dev:** bump @babel/cli from 7.13.16 to 7.14.3 ([34195f4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/34195f4608c1bfce0744dd95961c4a5ff3f409de))
* **deps-dev:** bump @babel/cli from 7.14.3 to 7.14.5 ([eb4f0a7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/eb4f0a76a87a3fee9271219aa26b824b6182dccb))
* **deps-dev:** bump @babel/core from 7.14.0 to 7.14.3 ([df63add](https://github.com/Fdawgs/ydh-fhir-listeners/commit/df63add112cdbc7b576ec1d05a21d4c8337bd700))
* **deps-dev:** bump @babel/core from 7.14.3 to 7.14.6 ([6e2a1f4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6e2a1f45703e697b0692b060fde28788571b76ff))
* **deps-dev:** bump @babel/node from 7.13.13 to 7.14.2 ([f294b66](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f294b668b79a8344c133f5f2d2c2470ebcd3dc00))
* **deps-dev:** bump @babel/node from 7.14.2 to 7.14.7 ([65bc2cd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/65bc2cdc5b4d3047f207cce8e1bbf89401742292))
* **deps-dev:** bump @babel/preset-env from 7.14.1 to 7.14.4 ([3b610f5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3b610f5de933efcc7296778b8fc135cb9bee824e))
* **deps-dev:** bump @babel/preset-env from 7.14.4 to 7.14.7 ([c88cf23](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c88cf23ec070ba602f8be332b9eb3054bdb14d0c))
* **deps-dev:** bump @commitlint/cli from 12.1.1 to 12.1.4 ([8fddc61](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8fddc61b626a01f9320a42fba9a1ca17fb464373))
* **deps-dev:** bump @commitlint/config-conventional ([00ac1f7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/00ac1f700f9cd89db9288872a9f16fa0ace04603))
* **deps-dev:** bump eslint from 7.26.0 to 7.27.0 ([07fd15f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/07fd15fb37ab79f2f2a10400e97727c895f9c93b))
* **deps-dev:** bump eslint from 7.27.0 to 7.29.0 ([f15a3bd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f15a3bd6404d0a0ce1dfaa4127a3d6cb4326fe33))
* **deps-dev:** bump eslint-plugin-import from 2.22.1 to 2.23.4 ([2d81306](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2d81306af14d86fcf38d01d3dd2684a998e6e40b))
* **deps-dev:** bump eslint-plugin-jsdoc from 33.2.0 to 35.1.2 ([86d374c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/86d374c79708e4e9e71adab16cd69fc6d5e8b3a1))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.1.2 to 35.4.0 ([0888719](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0888719f0a66a4a80d9fc87bccd466f27640a718))
* **deps-dev:** bump prettier from 2.3.0 to 2.3.1 ([79c16c4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/79c16c405ca6e441416fe854d7b5254f99578bdf))
* **deps:** bump actions/cache from 2.1.5 to 2.1.6 ([86979ed](https://github.com/Fdawgs/ydh-fhir-listeners/commit/86979ed406899730a716c70cb5212b220f60f493))
* **deps:** bump actions/upload-artifact from 2.2.3 to 2.2.4 ([f0d886b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f0d886b9a72b7cf620b44fb594975ee950d594ca))
* **deps:** bump browserslist from 4.16.3 to 4.16.6 ([09aa996](https://github.com/Fdawgs/ydh-fhir-listeners/commit/09aa99693dc742e1f3852f8b95f09c877f137513))
* **deps:** bump wagoid/commitlint-github-action from 3.1.2 to 3.1.4 ([5e6d867](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5e6d867cf10f7955cde2631e33572ddc3487f74f))

### [4.0.1](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v4.0.0...v4.0.1) (2021-05-11)


### Bug fixes

* **encounters:** correct status case order ([1e75583](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1e755834c37b36d672e2b4a5e35aa244b99c99c7))


### Miscellaneous

* lint with new prettier version ([366d48c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/366d48c054562c5fcbf567e9a4ec69d86b41fd96))


### Dependencies

* **deps-dev:** bump dependencies ([40c6c0a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/40c6c0a79ad91e7c3d798cba3afa0b8028da34a4))
* **deps:** bump wagoid/commitlint-github-action from v3.1.1 to v3.1.2 ([3653e87](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3653e87b299b185d7405556801b5675bc55ebd90))

## [4.0.0](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v3.2.3...v4.0.0) (2021-05-06)


### ⚠ BREAKING CHANGES

* remove support for nodejs v10, as it is EOL as of 2021-04-30

### Miscellaneous

* remove support for nodejs v10 ([abf7afd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/abf7afddd3463aded2046ded8d30fe706a3347de))


### Continuous integration

* add cleanup-run job ([45126ce](https://github.com/Fdawgs/ydh-fhir-listeners/commit/45126ce32001b97055b6e32ecb61758b5985652d))
* **link-check:** fix skip regex ([9242c59](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9242c590f784fe9ec9d86cb8e4f9ce70efe7d05d))
* use nodejs v16 for workflows ([fbfc6a0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fbfc6a0aa1498f53cb8176d7b9393034f9eed04d))


### Dependencies

* **deps-dev:** bump @babel/cli from 7.13.10 to 7.13.14 ([134b7d3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/134b7d3fa97183616a8f27d5a7ce054a3adbcd39))
* **deps-dev:** bump @babel/cli from 7.13.14 to 7.13.16 ([c1d1d8a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c1d1d8a0a0da4996173045bbfa97da50645d5b78))
* **deps-dev:** bump @babel/core from 7.13.13 to 7.13.14 ([ca0802b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ca0802b08fa1c03656dfdd3ccae93b54b617007f))
* **deps-dev:** bump @babel/core from 7.13.14 to 7.14.0 ([7438f2b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7438f2b3e59f6574f4991faf3adacba8c576dfce))
* **deps-dev:** bump @babel/preset-env from 7.13.12 to 7.14.0 ([c29f0c0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c29f0c03444bc01c5cfaf1b27e1e405d8a90c21a))
* **deps-dev:** bump @babel/preset-env from 7.14.0 to 7.14.1 ([77268e8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/77268e858a8244b8aacadad8b1f56b3742275b8b))
* **deps-dev:** bump @commitlint/cli from 12.0.1 to 12.1.1 ([dd98f5f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dd98f5f6ef20d954d78ea928eaaa715e8b0679ab))
* **deps-dev:** bump @commitlint/config-conventional ([6360cef](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6360cef616e5683356e908372f5e97eabd9b5a15))
* **deps-dev:** bump eslint from 7.23.0 to 7.25.0 ([dac63ba](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dac63baf9c5e562dfcfe81a2b26974332f7fa64b))
* **deps-dev:** bump eslint-config-prettier from 8.1.0 to 8.3.0 ([14cd871](https://github.com/Fdawgs/ydh-fhir-listeners/commit/14cd871218092a2b3ce80a23d3a116f6bf72fbf1))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.3.0 to 33.0.0 ([3ba27f9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3ba27f9fa3fa462f32be7b9c79502462b48d1fee))
* **deps-dev:** bump eslint-plugin-jsdoc from 33.0.0 to 33.1.0 ([9eeed27](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9eeed27a00c7e0535aa5f6121ca3086bc12c6758))
* **deps:** bump actions/cache from v2.1.4 to v2.1.5 ([24b506c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/24b506c95f21c7fe4517ca88523bee8e379cc60f))
* **deps:** bump actions/github-script from v3.1.0 to v3.1.1 ([01e16ef](https://github.com/Fdawgs/ydh-fhir-listeners/commit/01e16ef5234fa4ef56b5e362ebd2032a4d617384))
* **deps:** bump actions/github-script from v3.1.1 to v4.0.2 ([05d9e6f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/05d9e6f973292123500ec363dc62a20dce50bdc9))
* **deps:** bump actions/upload-artifact from v2.2.2 to v2.2.3 ([7b1424e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7b1424e51455462c42107debca49de7d48b060aa))
* **deps:** bump GoogleCloudPlatform/release-please-action ([d662c29](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d662c29194fe5e122e421ce47e82131ca92fd711))
* **deps:** bump GoogleCloudPlatform/release-please-action ([4dd56f3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4dd56f35bbd6672d68fd2a2e9c0dab02755b7474))
* **deps:** bump typoci/spellcheck-action from v0.4.0 to v1.1.0 ([618bbdb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/618bbdb22069fcb2b0e8f3249dd0e9612acddb78))
* **deps:** bump wagoid/commitlint-github-action from v3.0.6 to v3.1.0 ([1ffd146](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1ffd14654fd088824bda1512cb19718512b8def0))
* **deps:** bump wagoid/commitlint-github-action from v3.1.0 to v3.1.1 ([938c6ee](https://github.com/Fdawgs/ydh-fhir-listeners/commit/938c6ee03320db2738bdcae2e6f08842f5547960))


### Documentation

* grammar and readability fixes ([e8e5d99](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e8e5d9925e2ff416a8e3a2ace752c4a1b60d6d6e))
* **readme:** add data quality issue/caveat for gp organization name ([f70f84f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f70f84fa7511c36d139d9089f96dc747e7c2c173))

### [3.2.3](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v3.2.2...v3.2.3) (2021-03-29)


### Miscellaneous

* **prettierignore:** add yarn lock file ([51d9f52](https://github.com/Fdawgs/ydh-fhir-listeners/commit/51d9f525b3a0d4b97634ee5405418725c317a875))
* **prettierignore:** remove `dist` ([9510df9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9510df97cf23dd5c0d025c97daa4511b6e26adc7))
* **readme:** replace jpg ydh logo with svg ([09432c5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/09432c5cf7cd9ed23ad81815ec6a226f69cb1851))
* remove contraction usage in comments ([0833d37](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0833d37ab92f9dd94f868f7c28c210c39a712781))
* **workflows:** rename ci and perf sections ([7f6e00a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7f6e00a144e7956eab939c916aa61e6e8fccb035))


### Dependencies

* **deps-dev:** bump @babel/cli from 7.13.0 to 7.13.10 ([4057918](https://github.com/Fdawgs/ydh-fhir-listeners/commit/40579185c0344a651dd61f9d2b6ee17a851e74a5))
* **deps-dev:** bump @babel/core from 7.13.8 to 7.13.13 ([e555593](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e5555931336a586cb2e979e8db2e4398a4ae2d9f))
* **deps-dev:** bump @babel/node from 7.13.0 to 7.13.13 ([213deb1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/213deb16c011347102e12472f266970400c1a72f))
* **deps-dev:** bump @babel/preset-env from 7.13.8 to 7.13.12 ([6938418](https://github.com/Fdawgs/ydh-fhir-listeners/commit/693841884ad9aae66ac5ed1fb8238e50753b397e))
* **deps-dev:** bump eslint from 7.21.0 to 7.23.0 ([f9b7fb4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f9b7fb4784fa14fe9ddfd8e8a834936cd8be4fcc))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.2.0 to 32.3.0 ([9d0d926](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9d0d92625e82bd84211d1eba659cb35a3f36b730))
* **deps-dev:** bump husky from 4.3.8 to 6.0.0 ([2951280](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2951280faee3d88fc742e943746ea73d8fd52c3d))
* **deps:** bump actions/stale from v3.0.17 to v3.0.18 ([36823de](https://github.com/Fdawgs/ydh-fhir-listeners/commit/36823de4da3338abaf446c633f85047dc2360be8))
* **deps:** bump GoogleCloudPlatform/release-please-action ([7ac5460](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7ac5460acf5258c938a2d037371cc0e649325f5f))
* **deps:** bump typoci/spellcheck-action from v0.3.0 to v0.4.0 ([067f5a8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/067f5a88814b1c604489e7b07983e10c05788528))
* **deps:** bump wagoid/commitlint-github-action from v3.0.1 to v3.0.6 ([2c090b9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2c090b9163aade7baf4ae8bafc061a396e7ffa4d))


### Continuous integration

* **automerge:** move automerge job into new workflow ([845a4cd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/845a4cd84a593d2b48e85191217a0981793f24d0))
* **ci:** ignore dependabot prs for commit message linting ([aa406db](https://github.com/Fdawgs/ydh-fhir-listeners/commit/aa406dbdebe140810b0a7ecc0230322580871935))
* **stale:** shorten workflow name ([f23da20](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f23da208e8e51ccc63a86937d03d27328056946c))
* **workflows:** run only on push and pulls to master branch ([14afd4c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/14afd4c3eff051e419bdcb696f23a05fef2f60b2))

### [3.2.2](https://github.com/Fdawgs/ydh-fhir-listeners/compare/v3.2.1...v3.2.2) (2021-03-03)


### Documentation

* **contributing:** add documentation style ([d170912](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d17091247b462a0449c2f9461c42e63e3ff60d2a))
* **readme:** fix broken link ([526d52b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/526d52b807af95bdf918384caeda1b0e4d18f5a7))
* **readme:** shorten links ([0d68edd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0d68edd7f8091615bc53e697c7e5e55254661765))
* **worklog:** reference correct standard ([1673ca1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1673ca1435c6170e49ecbfc46d97ea9828e4dff6))


### Dependencies

* **dependabot:** set commit message prefix; lower pull limit ([8ed9d81](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8ed9d813aa64268e68e03a5a91c886438229daee))
* **deps-dev:** add husky for git hook handling ([172476d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/172476dbe97aedf2c651b654a12bd9a28f57960f))
* **deps-dev:** bump @babel/cli from 7.12.10 to 7.12.16 ([#128](https://github.com/Fdawgs/ydh-fhir-listeners/issues/128)) ([d12f5fc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d12f5fce2b64d9634ae25f69a6b14ec54afa585a))
* **deps-dev:** bump @babel/cli from 7.12.16 to 7.13.0 ([82308e6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/82308e646a11702bd5660cbd1d5dd71c2b69c42b))
* **deps-dev:** bump @babel/core from 7.12.10 to 7.12.16 ([#125](https://github.com/Fdawgs/ydh-fhir-listeners/issues/125)) ([fdbcac2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fdbcac26ed89b4a60fd07d186cf0f085b0bff78c))
* **deps-dev:** bump @babel/core from 7.12.16 to 7.13.8 ([34f6fc2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/34f6fc2fc2535d73a050a40ee0378322817a2cae))
* **deps-dev:** bump @babel/node from 7.12.10 to 7.12.16 ([#127](https://github.com/Fdawgs/ydh-fhir-listeners/issues/127)) ([a633158](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a633158da5f54359c420c1723b25cf1435ddc68f))
* **deps-dev:** bump @babel/node from 7.12.16 to 7.13.0 ([6919a07](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6919a0722ee702dbbf36f83ccf5b9f433670d4bc))
* **deps-dev:** bump @babel/preset-env from 7.12.11 to 7.12.16 ([#129](https://github.com/Fdawgs/ydh-fhir-listeners/issues/129)) ([34b7541](https://github.com/Fdawgs/ydh-fhir-listeners/commit/34b754120dcc22ff57f1e9018b7d9b47e41baeff))
* **deps-dev:** bump @babel/preset-env from 7.12.16 to 7.13.8 ([9d439d8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9d439d8fa2e27d991b13a17767d8fe259657a20c))
* **deps-dev:** bump @commitlint/cli from 11.0.0 to 12.0.1 ([#133](https://github.com/Fdawgs/ydh-fhir-listeners/issues/133)) ([5576c8e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5576c8ef252783fdc3a5d0ebfff1d3e3ad7c4260))
* **deps-dev:** bump @commitlint/config-conventional ([509036a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/509036a517acd3d8906ce8670ed1755dfc07e297))
* **deps-dev:** bump eslint from 7.18.0 to 7.19.0 ([#117](https://github.com/Fdawgs/ydh-fhir-listeners/issues/117)) ([bdd0093](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bdd0093ef84c3cd3ca484581dcc57563a707fcdf))
* **deps-dev:** bump eslint from 7.19.0 to 7.20.0 ([#126](https://github.com/Fdawgs/ydh-fhir-listeners/issues/126)) ([bfaa1bf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bfaa1bf6e7f7db4ae9987a6d43e1ecd5f2b941b7))
* **deps-dev:** bump eslint from 7.20.0 to 7.21.0 ([#136](https://github.com/Fdawgs/ydh-fhir-listeners/issues/136)) ([f0d1671](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f0d16713c41bd692887f404730db25de0f99063f))
* **deps-dev:** bump eslint-config-prettier from 7.2.0 to 8.1.0 ([5285c92](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5285c9290a7ad925e9d5df8e3129234489f7b334))
* **deps-dev:** bump eslint-plugin-jsdoc from 31.4.0 to 31.6.0 ([#116](https://github.com/Fdawgs/ydh-fhir-listeners/issues/116)) ([0fac348](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0fac348cd755c82a55b844d130f6716d07538827))
* **deps-dev:** bump eslint-plugin-jsdoc from 31.6.0 to 32.0.1 ([#124](https://github.com/Fdawgs/ydh-fhir-listeners/issues/124)) ([cb906f7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/cb906f7dea0e523463383bc412a4815397a532bd))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.0.1 to 32.2.0 ([#135](https://github.com/Fdawgs/ydh-fhir-listeners/issues/135)) ([43694a0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/43694a0b8b906d4e08414a8d19a9ec00e705913d))
* **deps-dev:** pin husky major version ([5e2a3c9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5e2a3c9c874d66931b61ef72877b41852719b5a7))
* **deps:** bump actions/cache from v2 to v2.1.4 ([#123](https://github.com/Fdawgs/ydh-fhir-listeners/issues/123)) ([efdd036](https://github.com/Fdawgs/ydh-fhir-listeners/commit/efdd036df1c9f1b2d8c7f13e36032d3d7b08fa38))
* **deps:** bump wagoid/commitlint-github-action from v2.0.3 to v2.2.3 ([#122](https://github.com/Fdawgs/ydh-fhir-listeners/issues/122)) ([5bae414](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5bae414850cc0a9953ff17455a3a879d609b5ae4))
* **deps:** bump wagoid/commitlint-github-action from v2.2.3 to v3.0.1 ([d9e419f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d9e419fa890df1a03492fca6ef956d5a2b738e7f))
* **deps:** specify minor and hotfix versions ([d7e707d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d7e707d15c1543f752145d2b97cb2b732bacc849))
* **deps:** specify minor and hotfix versions ([ab5e83b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ab5e83bff7f9853103fb77190b4343be6f1c892b))


### Miscellaneous

* add commit-lint job ([197559d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/197559de951cc8037e5111746687118b873251ac))
* add documentation style link to pr template ([08685d0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/08685d0dabca4dc9158514c1a07940ee60706016))
* add link check workflow ([76daeda](https://github.com/Fdawgs/ydh-fhir-listeners/commit/76daeda42950bb625f3b5c86702b50cfea1b30c9))
* automate release and changelog generation ([d6afb8b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d6afb8b80e5a2d80fcebbc71e425f81d357c5d0d))
* **codeql:** remove autobuild action ([c7878ef](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c7878efe2903c632dfcd6c55b3b331a5903e29b4))
* **dependabot:** ignore husky updates ([32ab2ef](https://github.com/Fdawgs/ydh-fhir-listeners/commit/32ab2ef166e0dc2a0cf294de809d6ed9a27bb24e))
* **linkcheck:** extend paths and ignored urls ([2e84277](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2e842778edd51e732a9affafc1109f21cfeaa22c))
* **lint-check:** compress patterns ([d43c9bb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d43c9bb4543074edb4244e5c534efa17595d062b))
* **prettier:** create separate files to allow for CI/CD to use prettier config ([#143](https://github.com/Fdawgs/ydh-fhir-listeners/issues/143)) ([09c245a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/09c245a331c5e62bcbc96031a91d9b3e188e3343))
* **readme:** add linebreaks between badges ([4da66a4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4da66a41cd208e3d2363e31cd8d8a55bcbea1fe9))
* remove whitespace from filename ([52c0996](https://github.com/Fdawgs/ydh-fhir-listeners/commit/52c0996741768a11c0a3f6d8b089351454a76c44))
* replace stalebot with github action ([2c0effc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2c0effcdfde3804ea37019f98d395227a43e2d2a))
* replace typo ci app with action ([679a728](https://github.com/Fdawgs/ydh-fhir-listeners/commit/679a72869258e78b7a5ce798940f2a2b4411b3a7))
* require `commit-lint` job to pass before automerge ([b1e70a4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b1e70a43b3105adcc8cf3e19a746dcba9be8ecbc))
* **vscode:** add `redhat.vscode-yaml` as recommended extension ([c68f763](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c68f763b7bc8f2efac4f4cdf6d137a30ca5c0793))
* **vscode:** add `updateImportsOnFileMove` setting ([4839e44](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4839e44010a6f2427153a47e50b7bf6285d68b3a))
* **vscode:** add workspace settings and extensions ([a20fca3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a20fca31b5b4db0686f26aa5218b4d1d0496270c))
* **vscode:** remove conflicting prettier ext setting ([4de2575](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4de257564aa8accb4fbd3af221d2a545bdbfe214))
* **workflows:** move release steps into `cd` workflow ([9e8e63c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9e8e63cb008518bbe313e5ea24b6fd3adc784260))
* **workflows:** remove redundant comments ([13f63b2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/13f63b298e4c2525ee06f0ac101134d7de0739b0))
* **workflows:** rename spellcheck workflow ([f62756e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f62756e397dd9b20c2dc54e995083dac3f7737f3))
* **workflows:** tidy node-version syntax ([89de90d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/89de90d18cb093c12be6b7a69ee7777eb30a3b14))

### 3.2.1 (2021-01-28)

-   build: add typoci config file ([ee3c451](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ee3c451))
-   build: remove `yarn` as package manager, revert to `npm` ([6fc6490](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6fc6490))
-   build(deps-dev): bump eslint-config-prettier from 7.1.0 to 7.2.0 (#114) ([169f405](https://github.com/Fdawgs/ydh-fhir-listeners/commit/169f405)), closes [#114](https://github.com/Fdawgs/ydh-fhir-listeners/issues/114)
-   build(deps-dev): bump eslint-plugin-jsdoc from 30.7.13 to 31.4.0 (#115) ([e32b09b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e32b09b)), closes [#115](https://github.com/Fdawgs/ydh-fhir-listeners/issues/115)
-   style(ci): capitalise jobs and job step names ([4b0f558](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4b0f558))
-   style(docs): capitalise headings correctly ([79c60e1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/79c60e1))
-   style(readme): prettier badge shape ([5acf932](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5acf932))
-   docs: bump coc from v1.4.0 to v2.0.0 ([4f7f2c2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4f7f2c2))
-   docs: update link to auth service ([51d3974](https://github.com/Fdawgs/ydh-fhir-listeners/commit/51d3974))
-   docs(readme): update acknowledgements section ([144d87c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/144d87c))
-   docs(readme): update yarn link ([4cafb56](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4cafb56))
-   chore: add pull request template ([b2ea07b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b2ea07b))
-   chore(package): add homepage and bug urls ([87c2ddb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/87c2ddb))
-   ci: cache on `node-version` as well as `os` ([42d652f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/42d652f))
-   ci: lint lockfile ([9a65be7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9a65be7))
-   ci: remove redundant javascript dictionary ([15e5fd3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/15e5fd3))
-   ci(typo-ci): add `ydh` to list of excluded words ([80befee](https://github.com/Fdawgs/ydh-fhir-listeners/commit/80befee))

## 3.2.0 (2021-01-04)

-   build: update github-actions with dependabot ([fa48dd3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fa48dd3))
-   build(deps-dev): bump eslint from 7.16.0 to 7.17.0 (#109) ([035bb68](https://github.com/Fdawgs/ydh-fhir-listeners/commit/035bb68)), closes [#109](https://github.com/Fdawgs/ydh-fhir-listeners/issues/109)
-   build(deps-dev): bump eslint-plugin-jsdoc from 30.7.9 to 30.7.13 (#110) ([ff78661](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ff78661)), closes [#110](https://github.com/Fdawgs/ydh-fhir-listeners/issues/110)
-   build(deps-dev): remove eslint-plugin-json ([e086d0a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e086d0a))
-   build(deps): bump fastify/github-action-merge-dependabot (#104) ([8cce0b8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8cce0b8)), closes [#104](https://github.com/Fdawgs/ydh-fhir-listeners/issues/104)
-   chore: remove old .env files from gitignore ([4ba1611](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4ba1611))
-   ci: do not run github actions for draft prs ([5651def](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5651def))
-   ci: refactor `codeql-analysis.yml` ([3890db1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3890db1))
-   ci: use yarn `--frozen-lockfile` flag for repro deps ([992cf4f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/992cf4f))
-   ci: use yarn cache of node dependencies if present ([82c1b08](https://github.com/Fdawgs/ydh-fhir-listeners/commit/82c1b08))
-   ci(codeql): specify more query suites ([6255af1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6255af1))
-   docs: fix broken links ([8c240fc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8c240fc))
-   docs(readme): add acknowledgements section ([3400506](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3400506))
-   docs(readme): add ydh logo ([dd6b112](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dd6b112))
-   docs(readme): add ydh staff to acknowledgements section ([bab73aa](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bab73aa))
-   docs(readme): grammar fix ([7a4dea6](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7a4dea6))
-   docs(readme): remove excess build information ([43abddf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/43abddf))
-   feat(encounter-res): add expected/planned discharge datetimes ([90b2c34](https://github.com/Fdawgs/ydh-fhir-listeners/commit/90b2c34))
-   fix(encounter-res): correct specialty system url ([b8dc489](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b8dc489))
-   style: use default prettier options for trailing commas and quotes ([62dda75](https://github.com/Fdawgs/ydh-fhir-listeners/commit/62dda75))
-   style(ci): add missing draft pr catch ([87960d0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/87960d0))

### 3.1.2 (2020-12-21)

-   fix(encounter-res): merge admitting and discharging location if same ([6a3ad57](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6a3ad57))
-   build(deps-dev): bump @babel/cli from 7.12.8 to 7.12.10 ([918d4f5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/918d4f5))
-   build(deps-dev): bump @babel/core from 7.12.9 to 7.12.10 ([6009fa3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6009fa3))
-   build(deps-dev): bump @babel/node from 7.12.6 to 7.12.10 ([278c849](https://github.com/Fdawgs/ydh-fhir-listeners/commit/278c849))
-   build(deps-dev): bump @babel/preset-env from 7.12.7 to 7.12.11 ([90db481](https://github.com/Fdawgs/ydh-fhir-listeners/commit/90db481))
-   build(deps-dev): bump eslint from 7.14.0 to 7.16.0 ([1d6d9a7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1d6d9a7))
-   build(deps-dev): bump eslint-config-prettier from 6.15.0 to 7.1.0 ([8e0ae14](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8e0ae14))
-   build(deps-dev): bump eslint-plugin-jsdoc from 30.7.8 to 30.7.9 ([53b73ec](https://github.com/Fdawgs/ydh-fhir-listeners/commit/53b73ec))
-   build(deps): bump ini from 1.3.5 to 1.3.8 ([7fd9938](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7fd9938))
-   ci: add linting job; expand scope of jobs ([e4327f1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e4327f1))
-   ci: automatically merge dependabot pull requests on pass build stage ([fa9f591](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fa9f591))
-   chore: add stale confg ([ed686bc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ed686bc))
-   chore: remove unused test resources ([c96dc64](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c96dc64))
-   chore: update test resources for patient 9449304513 ([226073f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/226073f))
-   chore: update test resources for patient 9449307210 ([76abac8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/76abac8))
-   chore: update test resources for unknown patients ([4fa1736](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4fa1736))
-   chore(scripts): rename test scripts ([dad2811](https://github.com/Fdawgs/ydh-fhir-listeners/commit/dad2811))
-   docs(readme): state hospital's full name ([685ccbf](https://github.com/Fdawgs/ydh-fhir-listeners/commit/685ccbf))
-   [ImgBot] Optimize images ([492ef57](https://github.com/Fdawgs/ydh-fhir-listeners/commit/492ef57))

### 3.1.1 (2020-12-01)

-   docs(security): remove backticks ([3c06a2d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/3c06a2d))
-   fix(encounter-res): double equals ([2a25ef3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2a25ef3))
-   fix(patient-res): add missing school contact name text ([99c795f](https://github.com/Fdawgs/ydh-fhir-listeners/commit/99c795f))
-   fix(patient-res): add missing switchboard contact ([aaf1d3a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/aaf1d3a))
-   build(deps-dev): bump prettier from 2.2.0 to 2.2.1 ([e44e0e3](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e44e0e3))
-   chore: add security.md ([bede1e0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bede1e0))

## 3.1.0 (2020-11-25)

-   chore(capabilitystatement): update documentation value ([9d0c1ed](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9d0c1ed))
-   docs(readme): remove old info ([a0977af](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a0977af))
-   feat(listeners): support multiple search params to allergyint resources ([95ad5fd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/95ad5fd))
-   fix(listeners): add `type` to accepted encounter search params ([eff5c23](https://github.com/Fdawgs/ydh-fhir-listeners/commit/eff5c23))

### 3.0.3 (2020-11-25)

-   fix(listeners): encounter search params ([0baf773](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0baf773))

### 3.0.2 (2020-11-25)

-   fix(listeners): date search params ([12549a2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/12549a2))
-   fix(listeners): param key checks ([87bffbd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/87bffbd))
-   fix(listeners): remaining search params ([f558e1c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f558e1c))

### 3.0.1 (2020-11-25)

-   build(deps-dev): bump dev dependencies ([582a758](https://github.com/Fdawgs/ydh-fhir-listeners/commit/582a758))
-   fix(medicationstatement-res): change tag predicates ([2329c40](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2329c40))

## 3.0.0 (2020-11-24)

-   build(deps-dev): bump dev dependencies ([b99ff28](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b99ff28))
-   refactor: change path from `r3` to `STU3` ([af25c48](https://github.com/Fdawgs/ydh-fhir-listeners/commit/af25c48))
-   refactor(code-templates): replace if... else chain with switch statement ([6e94be8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6e94be8))
-   refactor(listeners): revoke access to allergyintolerance resources ([eb5dbd2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/eb5dbd2))
-   feat(medicationstatement-res): add sider specific meta tags ([bf4e0f9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/bf4e0f9))
-   style(sql): tidy whitespace ([ddc2b4e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ddc2b4e))
-   docs(readme): update links, dates, version numbers ([6bb0e0b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/6bb0e0b))
-   fix(code-templates): add support for clob types ([1fc4682](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1fc4682))
-   fix(code-templates): import dstu3 model library instead of r4 ([e881340](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e881340))
-   fix(listeners): declare fhir version in operationoutcome ([28cfec1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/28cfec1))
-   chore(code-templates): remove unused templates ([0a3236e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0a3236e))
-   chore(listeners): remove inline eslint rules ([926328e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/926328e))
-   chore(listeners): remove unused vread destination ([df1c304](https://github.com/Fdawgs/ydh-fhir-listeners/commit/df1c304))

### BREAKING CHANGE

-   context path of listener url changed from `r3` to `STU3`

## 2.8.0 (2020-11-20)

-   build(deps-dev): bump dev dependencies ([c5ea129](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c5ea129))
-   docs: clarify on sider specific meta tags ([a6e5fa7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a6e5fa7))
-   fix(flag-res): change snomed codes from int to varchar for lead zeroes ([0860d4d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/0860d4d))
-   feat(allergyintolerance-res): add sider specific meta tags ([66749cd](https://github.com/Fdawgs/ydh-fhir-listeners/commit/66749cd))
-   feat(encounter-res): add sider specific meta tags ([72e347c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/72e347c))
-   feat(flag-res): add sider specific meta tags ([55f4814](https://github.com/Fdawgs/ydh-fhir-listeners/commit/55f4814))

### 2.7.3 (2020-11-18)

-   chore: convert channel to target mirth connect v3.10.0 ([00159da](https://github.com/Fdawgs/ydh-fhir-listeners/commit/00159da))
-   style: fix build name ([f76f444](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f76f444))
-   style: fix comment spacing ([665d419](https://github.com/Fdawgs/ydh-fhir-listeners/commit/665d419))
-   style: format codeql.yml ([99f4c8b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/99f4c8b))
-   build(deps-dev): bump dev dependencies ([606486e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/606486e))
-   ci: clean up config ([19d819b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/19d819b))
-   ci: replace travis-ci with github actions ([44e6888](https://github.com/Fdawgs/ydh-fhir-listeners/commit/44e6888))

### 2.7.2 (2020-11-02)

-   fix(listeners): unescape system part of [system]|[code] search params ([8f6f588](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8f6f588))
-   docs(readme): capitalise beginning of sentence ([ad8ee3e](https://github.com/Fdawgs/ydh-fhir-listeners/commit/ad8ee3e))

### 2.7.1 (2020-11-01)

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

### 2.6.3 (2020-10-14)

-   docs: replace xlsx with ods file ([18556f8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/18556f8))
-   chore: convert channel to target mirth connect v3.9.1 ([58880c5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/58880c5))
-   build: create codeql-analysis.yml workflow file ([42a3007](https://github.com/Fdawgs/ydh-fhir-listeners/commit/42a3007))
-   build(deps-dev): bump dev dependencies ([c47a6f0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c47a6f0))
-   perf(listeners): reduce response time for read requests ([223b5e1](https://github.com/Fdawgs/ydh-fhir-listeners/commit/223b5e1))
-   refactor(listeners): specify resource type in error message ([e54389b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e54389b))

### 2.6.2 (2020-10-05)

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

### 2.6.1 (2020-10-01)

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

### 2.5.2 (2020-09-24)

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

### 2.5.1 (2020-08-28)

-   build(deps-dev): bump dev dependencies ([05b7bee](https://github.com/Fdawgs/ydh-fhir-listeners/commit/05b7bee))
-   refactor(patient): remove restricted patient table join bottleneck ([4f365bc](https://github.com/Fdawgs/ydh-fhir-listeners/commit/4f365bc))
-   chore: reduce minimum nodejs engine version from 12.x to 10.x ([2c6ad52](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2c6ad52))
-   chore(github): add issue templates ([5c5281b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5c5281b))

## 2.5.0 (2020-08-13)

-   fix(patient): fix crashes when searching without mrn or nhs no ([162a273](https://github.com/Fdawgs/ydh-fhir-listeners/commit/162a273))
-   feat(patient): add address-postalcode search param ([f29af71](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f29af71))
-   build(deps-dev): bump dev dependencies to resolve security cve ([2cf3b7b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/2cf3b7b))

### 2.4.1 (2020-07-27)

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

### 2.3.7 (2020-06-30)

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

### 2.3.6 (2020-06-01)

-   build(deps-dev): bump @babel/cli from 7.8.4 to 7.10.1 ([1d7faf5](https://github.com/Fdawgs/ydh-fhir-listeners/commit/1d7faf5))
-   build(deps-dev): bump @babel/core from 7.9.6 to 7.10.2 ([75545d9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/75545d9))
-   build(deps-dev): bump @babel/node from 7.8.7 to 7.10.1 ([8d4cc71](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8d4cc71))
-   build(deps-dev): bump @babel/preset-env from 7.9.6 to 7.10.2 ([446d70d](https://github.com/Fdawgs/ydh-fhir-listeners/commit/446d70d))
-   build(deps-dev): bump conventional-changelog-cli from 2.0.31 to 2.0.34 ([d7c760a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d7c760a))
-   chore: update gitignore with latest github version ([f7eeb2b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f7eeb2b))
-   chore(eslintrc): enable json plugin ([c483ef9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/c483ef9))
-   chore(package): set minimum engine version ([17b7633](https://github.com/Fdawgs/ydh-fhir-listeners/commit/17b7633))
-   docs(contributing): update conventional commit link to latest version ([8e998b9](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8e998b9))

### 2.3.5 (2020-05-01)

-   chore: convert channel to be compatible with mirth connect v3.9.0 ([b2c205b](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b2c205b))
-   build(deps-dev): bump @babel/core from 7.9.0 to 7.9.6 ([72b929a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/72b929a))
-   build(deps-dev): bump @babel/preset-env from 7.9.0 to 7.9.5 ([7932131](https://github.com/Fdawgs/ydh-fhir-listeners/commit/7932131))
-   build(deps-dev): bump @babel/preset-env from 7.9.5 to 7.9.6 ([df7b999](https://github.com/Fdawgs/ydh-fhir-listeners/commit/df7b999))
-   build(deps-dev): bump eslint-config-prettier from 6.10.1 to 6.11.0 ([d259973](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d259973))
-   build(deps-dev): bump prettier from 2.0.4 to 2.0.5 ([8d779ed](https://github.com/Fdawgs/ydh-fhir-listeners/commit/8d779ed))
-   fix: add missing read support for flag resources ([5eab8bb](https://github.com/Fdawgs/ydh-fhir-listeners/commit/5eab8bb))
-   fix: read for patient resources that were showing all as restricted ([9b370b8](https://github.com/Fdawgs/ydh-fhir-listeners/commit/9b370b8))

### 2.3.4 (2020-04-06)

-   chore: prep release ([fcba033](https://github.com/Fdawgs/ydh-fhir-listeners/commit/fcba033))
-   chore: rebuild with retained lines ([e3e8fc4](https://github.com/Fdawgs/ydh-fhir-listeners/commit/e3e8fc4))
-   build(babel): add retainlines generator option ([b78421c](https://github.com/Fdawgs/ydh-fhir-listeners/commit/b78421c))
-   build(deps-dev): bump eslint-plugin-import from 2.20.1 to 2.20.2 ([a760db7](https://github.com/Fdawgs/ydh-fhir-listeners/commit/a760db7))
-   docs: grammar and spelling fixes ([da318b0](https://github.com/Fdawgs/ydh-fhir-listeners/commit/da318b0))
-   docs(readme): correct section sizes ([f06ca59](https://github.com/Fdawgs/ydh-fhir-listeners/commit/f06ca59))

### 2.3.3 (2020-03-27)

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

### 2.3.2 (2020-03-16)

-   chore(security): update dependencies ([d37748a](https://github.com/Fdawgs/ydh-fhir-listeners/commit/d37748a))
-   build(deps-dev): bump eslint-plugin-json from 2.1.0 to 2.1.1 ([884f2f2](https://github.com/Fdawgs/ydh-fhir-listeners/commit/884f2f2))

### 2.3.1 (2020-03-12)

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

### 2.2.1 (2020-02-05)

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
