---
title: Add Redux with Typescript to your React applicaton (June 2020)
tag:
  - React
teaser: Redux is a library that allows us to manage an application's state
  easily and predictably. Configuring React application to use Redux can be
  confusing, especially at the beginning, so here's a practical step-by-step
  guide...
date: 2020-06-11T16:56:10.691Z
---
Redux is a library that allows us to manage an application's state easily and predictably.

We won't focus on what are the benefits of using Redux or should you add it to your project, but on how to install and configure the library.

To begin with, let's create a simple React application using **[create-react-app](https://github.com/facebook/create-react-app):**

`npx create-react-app react-redux-guide --template typescript`

Great, the React application has been successfully created, so we can proceed with installing Redux:

`yarn add redux react-redux redux-thunk @types/react-redux @types/redux-thunk`

* **redux** - the core of Redux
* **react-redux** - official React binding for Redux, it should be installed, as Redux can be used standalone
* **redux-thunk** - thunk middleware for Redux

  > **Middleware** is some code you can put between the framework receiving a request, and the framework generating a response. 
  >
  > Redux middleware **provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.** It allows you to write action creators that return a function instead of an action.

  Don't worry if you don't get why do we need this, we'll cover it up in details later.
* **@types/react-redux** - type declarations for react-redux library
* **@types/redux-thunk** - type declarations for redux-thunk library