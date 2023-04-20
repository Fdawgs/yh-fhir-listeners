# Contributing

Contributions are welcome and any help that can be offered is greatly appreciated.
Please take a moment to read the entire contributing guide.

This repository uses the [Feature Branch Workflow](https://atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow),
meaning that development should take place in `feat/` branches, with the `main` branch kept in a stable state.
When you submit pull requests, please make sure to fork from and submit back to `main`.

Other processes and specifications that are in use in this repository are:

-   [Semantic versioning](https://semver.org/)
-   [Conventional commits](https://conventionalcommits.org/en/v1.0.0/) following the [@commitlint/config-conventional config](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
-   [Prettier](https://prettier.io/) style guide

## Getting started

Ensure you have all prerequisites installed (including any optional ones), as noted in the [prerequisites section of the readme file](./README.md#prerequisites).

With those in place, you can fork the repository, clone it, and then run `npm install` to install all dependencies.

### Development workflow

Mirth Connect uses the [Rhino Engine](https://github.com/mozilla/rhino) that supports a select number of EcmaScript ES6/ES2015 features.
`.eslintrc.js` has ESLint rules relating to the features that Mirth Connect does not support turned off.
The channel code is transcompiled to be backwards compatible with Mirth Connect using [Babel](https://babeljs.io/).

The workflow steps are as follows:

1. Alter files in /src
2. Run `npm run build` to migrate files from `/src` to `/temp` and transcompile the changes
3. Copy code from `/temp` into Mirth Connect channel and test in Mirth

## Documentation style

Documentation (both in markdown files and inline comments) should be written in **British English** where possible.

Titles and headings should use sentence-style capitalisation, where only the first letter of a sentence and proper nouns are capitalised.

## Pull request checklist

Before submitting a pull request back to the main repository, please make sure you have completed the following steps:

1. Pull request base branch is set to `main`. All pull requests should be forked from and merged back to `main`
2. Run `npm run lint` to check the code adheres to the defined ESLint style and has no errors
3. Run `npm run lint:prettier` to run the Prettier code formatter over the code

Steps 2. is automatically run by a pre-commit hook added by [Husky](https://typicode.github.io/husky/#/).

## Release process

Before a release, ensure the `CapabilityStatement` in the channel is using the semver generated in the latest automatic release pull request, and that `dist/FHIRListener.xml` has the latest changes, by saving and exporting the channel and code templates from Mirth.

## Issues

Please file your issues [here](https://github.com/Fdawgs/yh-fhir-listeners/issues) and try to provide as much information in the template as possible/relevant.
