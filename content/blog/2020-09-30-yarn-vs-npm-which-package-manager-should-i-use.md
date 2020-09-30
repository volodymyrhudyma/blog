---
title: Yarn vs. Npm. Which package manager is the best?
tag:
  - Other
metaDescription: // META
teaser: // TEASER
date: 2020-10-02T16:39:17.688Z
---
In the JavaScript world, people share millions of pieces of code in order to avoid spending time on some necessary functionalities, which are already done by others.

Shared code, in turn, may depend on another piece of shared code and so on.

All these dependencies are managed by package managers, the primary function of which is to install some code from a global registry into an engineer's local environment.

Both, **yarn** and **npm**, are package managers for JavaScript applications.

## Npm

**Npm** is a default package manager for Node.js runtime environment.

It was written in JavaScript and initially released in January 2010 by Isaac Z. as a result of having "*seen module packaging done terribly*" and with inspiration from other similar projects such as PEAR (PHP) and CPAN (Perl).

It consists of the command line client and online database of private and public packages called the npm registry.

This registry is accessed via the client, and all available packages can be browsed via the [npm website](https://www.npmjs.com/).

The package manager belongs to npm, Inc. that was acquired by the Github in March 2020.

## Yarn

**Yarn** is a package manager developed by Facebook as an alternative to **npm**.

## Latest versions comparison

In this section we will compare the latest versions of both package managers in terms of speed.

The list of dependencies to be installed (**without lockfile**):

```json
"dependencies": {
  "@testing-library/jest-dom": "^4.2.4",
  "@testing-library/react": "^9.3.2",
  "@testing-library/user-event": "^7.1.2",
  "@types/jest": "^24.0.0",
  "@types/node": "^12.0.0",
  "@types/react": "^16.9.0",
  "@types/react-dom": "^16.9.0",
  "@types/react-redux": "^7.1.9",
  "@types/redux-thunk": "^2.1.0",
  "@types/styled-components": "^5.1.3",
  "moment": "^2.28.0",
  "react": "^16.13.1",
  "react-dom": "^16.13.1",
  "react-redux": "^7.2.0",
  "react-scripts": "3.4.1",
  "redux": "^4.0.5",
  "redux-thunk": "^2.3.0",
  "reselect": "^4.0.0",
  "styled-components": "^5.2.0",
  "typescript": "~3.7.2"
}
```

Yarn **1.22.10**:

![Yarn install time](/img/screenshot-2020-09-30-at-21.46.19.png "Yarn install time")

It took on average 30-35 seconds to install the dependencies using the latest yarn version.

Npm **6.14.8**:

![Npm install time](/img/screenshot-2020-09-30-at-21.49.46.png "Npm install time")

Npm is a little slower than yarn, it took on average 40-45 seconds to install the dependencies.

## The Differences

## Summary