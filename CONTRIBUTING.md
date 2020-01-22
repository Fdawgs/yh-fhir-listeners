# Contributing

Contributions are welcome and any help that can be offered is greatly appreciated.
Please take a moment to read the entire contributing guide.

This repository uses the [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow),
meaning that development should take place in `feat/` branches, with the `master` branch being kept in a stable state.
When you submit pull requests, please make sure to fork from and submit back to `master`.

Other processes and specifications that are in use in this repository are:

-   [Semantic versioning](https://semver.org/)
-   [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) following the @commitlint/config-conventional config
-   [Prettier](https://prettier.io/) style guide

## Getting Started

As noted in the prerequisites section of the readme file, this project requires that you have Node.js, Yarn, and Mirth Connect installed for development.

With those in place you can fork the repo and clone it, and then run `yarn install` to install all dependencies.

### Development Workflow

The development workflow requires that you write all the code seperate of Mirth, then add to a channel in Mirth Connect and test there.

Mirth Connect uses the [Rhino Engine](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) which supports a number of EcmaScript ES6/ES2015 features.
Mirth Connect however, does not support the following features:

-   template literals
-   global returns
-   let and const

`.eslintrc.json` has ESLint rules relating to the features that Mirth Connect doesn't support turned off.

## Pull Request Checklist

Prior to submitting a pull request back to the main repository, please make sure you have completed the following steps:

1. Pull request base branch is set to `master`. All pull requests should be forked from and merged back to `master`
2. Run `yarn test` to check the code adheres to the defined style and that it passes the Jest tests
3. Run `yarn prettier` to run the Prettier code formatter over the code

## Release process

When cutting a release, the following steps need to be performed:

1. Both `package.json` and `src/CapabilityStatement.xml` needs to have a version update based on the content being released, remembering to adhere to semantic versioning
2. Generate the changelog with `yarn changelog`
3. Create a release branch with the convention `release/x.x.x`
4. Create a tag for the version; the naming convention is the version (vx.x.x)
5. Push the tag to the repository
6. Draft a release in the release tab with release notes, copying the notes from the changelog

## Issues

Please file your issues [here](https://github.com/Fdawgs/ydh-fhir-listeners) and try to provide as much information in the template as possible/relevant.
