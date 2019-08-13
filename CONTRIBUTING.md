# Contributions Welcome

Thank you for your interest in contributing to our project. Whether it's a bug report, new feature, correction, or additional documentation, we greatly value feedback and contributions from our community.

Please read through this document before submitting any issues or pull requests to ensure we have all the necessary
information to effectively respond to your bug report or contribution.

If you're looking to report a bug or have an idea, follow the
[bug and potential feature workflow](#reporting-bugs-and-potential-features).

Follow the [contribution workflow](#contribution-workflow) for submitting your
changes to the Skills GameOn SDK for Node.js codebase. If you want to receive high-level but still
commit-based feedback for a contribution, follow the
[request for comments](#request-for-comments) steps instead.

## Reporting Bugs and Potential Features

We welcome you to use the GitHub issue tracker to report bugs or suggest features.

When filing an issue, please check [existing open](https://github.com/alexa-games/skills-gameon-sdk-js/issues), or [recently closed](https://github.com/alexa-games/skills-gameon-sdk-js/issues?utf8=%E2%9C%93&q=is%3Aissue%20is%3Aclosed%20), issues to make sure somebody else hasn't already
reported the issue. Please try to include as much information as you can. Details like these are incredibly useful:

* A reproducible test case or series of steps
* The version of our code being used
* Any modifications you've made relevant to the bug
* Anything unusual about your environment or deployment

## Contribution Workflow

Skills GameOn SDK for Node.js uses the “fork-and-pull” development model. Follow these steps if
you want to merge your changes to Skills GameOn SDK for Node.js:

1. Within your fork of
   [Skills GameOn SDK for Node.js](https://github.com/alexa-games/skills-gameon-sdk-js), create a
   branch for your contribution. Use a meaningful name.
1. Create your contribution, meeting all
   [contribution quality standards](#contribution-quality-standards)
1. [Create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)
   against the develop branch of the Skills GameOn SDK for Node.js repository.
1. Add two reviewers to your pull request (a maintainer will do that for you if
   you're new). Work with your reviewers to address any comments and obtain a
   minimum of 2 approvals, at least one of which must be provided by
   [a maintainer](MAINTAINERS.md).
   To update your pull request amend existing commits whenever applicable and
   then push the new changes to your pull request branch.
1. Pay attention to any automated CI failures reported in the pull request, and stay involved in the conversation.
1. Once the pull request is approved, one of the maintainers will merge it.

## Request for Comments

If you just want to receive feedback for a contribution proposal, open an “RFC”
(“Request for Comments”) pull request:

1. On your fork of
   [Skills GameOn SDK for Node.js](https://github.com/alexa-games/skills-gameon-sdk-js), create a
   branch for the contribution you want feedback on. Use a meaningful name.
1. Create your proposal based on the existing codebase.
1. [Create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)
   against the develop branch of the Skills GameOn SDK for Node.js repository. Prefix your pull
   request name with `[RFC]`.
1. Discuss your proposal with the community on the pull request page (or on any
   other channel). Add the conclusion(s) of this discussion to the pull request
   page.

## Contribution Quality Standards

Most quality and style standards are enforced automatically during integration
testing. Your contribution needs to meet the following standards:

* Separate each **logical change** into its own commit.
* Each commit must pass all unit & code style tests, and the full pull request
  must pass all integration tests. See https://github.com/alexa-games/skills-gameon-sdk-js for more information on style and tests.
* Unit test coverage must _increase_ the overall project code coverage.
* Include integration tests for any new functionality in your pull request.
* Document all your public functions.
* Commits in your forked repository may be brief or absent.
* Document your pull requests. Include the reasoning behind each change, and
  the testing done. Following [commit message best practices](https://github.com/erlang/otp/wiki/writing-good-commit-messages) is recommended.
  Your pull request will be squashed into a single commit if it is approved.
* Acknowledge Skills GameOn SDK for Node.js is provisionally licensed as
  "Restricted Program Materials" under the Program Materials License Agreement(LICENSE) and certify that no
  part of your contribution contravenes this license by signing off on all your
  commits with `git -s`. Ensure that every file in your pull request has a
  header referring to the repository license file.

## Finding Contributions to Work On

Looking at the existing issues is a great way to find something to contribute on. As our projects, by default, use the default GitHub issue labels (enhancement/bug/duplicate/help wanted/invalid/question/wontfix), looking at any ['help wanted'](https://github.com/alexa-games/skills-gameon-sdk-js/labels/help%20wanted) issues is a great place to start.

## Code of Conduct

This project has adopted the [Amazon Open Source Code of Conduct](CODE_OF_CONDUCT.md).

## Security Issue Notifications

If you discover a potential security issue in this project we ask that you notify AWS/Amazon Security via our [vulnerability reporting page](http://aws.amazon.com/security/vulnerability-reporting/). Please do **not** create a public github issue.

## Licensing

See the [LICENSE](https://github.com/alexa-games/skills-gameon-sdk-js/blob/master/LICENSE) file for our project's licensing and the [NOTICE](https://github.com/alexa-games/skills-gameon-sdk-js/blob/master/NOTICE) for anything that differs or related notices. We will ask you to confirm the licensing of your contribution.

We may ask you to sign a [Contributor License Agreement (CLA)](http://en.wikipedia.org/wiki/Contributor_License_Agreement) for larger changes.
