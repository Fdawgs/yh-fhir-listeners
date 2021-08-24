# Contributing

Contributions are welcome and any help that can be offered is greatly appreciated.
Please take a moment to read the entire contributing guide.

This repository uses the [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow),
meaning that development should take place in `feat/` branches, with the `master` branch kept in a stable state.
When you submit pull requests, please make sure to fork from and submit back to `master`.

Other processes and specifications that are in use in this repository are:

-   [Semantic versioning](https://semver.org/)
-   [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) following the @commitlint/config-conventional config
-   [Prettier](https://prettier.io/) style guide

## Getting Started

As noted in the prerequisites section of the readme file, this project requires that you have Node.js and Mirth Connect installed for development.

With those in place, you can fork the repository, clone it, and then run `npm install` to install all development dependencies.

### Development Workflow

Mirth Connect uses the [Rhino Engine](https://github.com/mozilla/rhino) that supports a select number of EcmaScript ES6/ES2015 features.
`.eslintrc.js` has ESLint rules relating to the features that Mirth Connect does not support turned off.
The channel code is transcompiled to be backwards compatible with Mirth Connect using [Babel](https://babeljs.io/).

The workflow steps are as follows:

1. Alter files in /src
2. Run `npm run build` to migrate files from `/src` to `/dist` and transcompile the changes
3. Copy code from `/dist` into Mirth Connect channel and test in Mirth

## Documentation Style

Documentation (both in markdown files and inline comments) should be written in **British English** where possible.

Titles and headings should adhere to the [Associated Press (AP)](https://www.apstylebook.com/) style:

-   Capitalise words with three or more letters
-   Capitalise the first and the last word
-   Capitalise nouns, pronouns, adjectives, verbs, adverbs, and subordinate conjunctions
-   Lowercase articles (a, an, the), coordinating conjunctions, and prepositions
-   Capitalise words with four or more letters (including conjunctions and prepositions)

## Pull Request Checklist

Prior to submitting a pull request back to the main repository, please make sure you have completed the following steps:

1. Pull request base branch is set to `master`. All pull requests should be forked from and merged back to `master`
2. Run `npm run lint` to check the code adheres to the defined style and has no errors
3. Run `npm run lint:prettier` to run the Prettier code formatter over the code

## Release Process

Before a release, ensure the `dist/CapabilityStatement.xml` is using the semver generated in the latest automatic release pull request, and that `dist/FHIRListener.xml` has the latest changes.

## Issues

Please file your issues [here](https://github.com/Fdawgs/ydh-fhir-listeners/issues) and try to provide as much information in the template as possible/relevant.
