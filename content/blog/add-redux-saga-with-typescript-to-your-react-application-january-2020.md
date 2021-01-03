---
title: Add Redux Saga With Typescript To Your React Application (January 2020)
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-03T08:08:30.929Z
---
**Redux** is a library that allows us to manage an application's state easily and predictably.

**Redux Saga** is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

Today we will learn how to install and configure Redux Saga with TypeScript in an application created with Create React App. 

## Create React Application

To begin with, let's create a simple React application using [create-react-app](https://github.com/facebook/create-react-app)**:**

`npx create-react-app redux-saga-guide --template typescript`

After the installation is completed, start the project to verify if everything works as expected:

`yarn start`

You should see nice spinning React logo and some text:

![CRA Initial Screen](/img/screenshot-2021-01-03-at-09.00.58.png "CRA Initial Screen")

## Install Redux Saga

After the React application has been successfully created, we can proceed with installing Redux and Redux Saga:

`yarn add redux react-redux redux-saga @types/react-redux @types/redux-saga`

It's useful to include logger middleware to log all dispatched actions in the developer console:

`yarn add -D redux-logger @types/redux-logger`

* **redux** - the core of Redux
* **react-redux** - official React binding for Redux, it should be installed, as Redux can be used standalone
* **redux-saga** - saga middleware for Redux

  > **Middleware** is some code you can put between the framework receiving a request, and the framework generating a response.
  >
  > Redux middleware **provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.** It allows you to write action creators that return a function instead of an action.

  Don't worry if you don't get why do we need this, we'll explain it in detail later.
* **@types/react-redux** - type declarations for react-redux library
* **@types/redux-saga** - type declarations for redux-saga library
* **redux-logger** - middleware for logging dispatched actions
* **@types/redux-logger** - type declarations for redux-logger library

## Configure Redux Saga

## Summary