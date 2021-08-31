---
title: Create Custom Middleware In Redux
tag:
  - React
promote: false
metaDescription: Learn how to create a Custom Logger Middleware in Redux to run
  the code after the action is executed but before it reaches the reducer.
shareImage: /img/custom-middleware-in-redux.jpg
teaser: Redux is one of the most popular state management libraries available
  for React applications. It provides us with the store that contains the entire
  state of the application, actions that describe what happens in the
  application, and reducers that create a new state object from the...
date: 2021-09-03T11:46:10.273Z
---
Redux is one of the most popular state management libraries available for React applications.

It provides us with the store that contains the entire state of the application, actions that describe what happens in the application, and reducers that create a new state object from the existing one based on the type of an action and the given payload.

This flow can be extended with Middlewares.

## What Is A Middleware?

**Middleware** in Redux is a third-party extension point between the dispatching of an action and the moment it reaches the reducer.

It is known as a suggested way to add custom functionality to Redux.

One of the most important features of middleware is that it is composable, and each middleware does not need to know what comes before or after it in the chain.

They are typically used for logging, reporting crashes, communicating with an API, etc.

While there are many middlewares in the npm registry that can be used out of the box, we have the option to create and use our own.

In the next section, we will learn how to create a custom Middleware for logging actions with payload and a state that is computed right after they have been dispatched.

In other words, our own implementation of the [redux-logger](https://github.com/LogRocket/redux-logger) Middleware.

## Custom Logger Middleware

If you have used Redux before, you have most likely used one of the most popular Middlewares that lets you write asynchronous logic that interacts with the store - [redux-thunk](https://github.com/reduxjs/redux-thunk).

It is attached with the help of the **applyMiddleware(...middleware)** function, which takes a list of Middlewares and composes them:

```javascript
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
```

Each Middleware receives **store** as an argument (it can be destructured to get access to the **dispatch** and **getState** store methods) and returns a function. 

The returned function receives the middleware's **next** dispatch method, and is expected to return a function of **action** that calls **next(action)** with a potentially different argument, at a different time, or even not at all.

The last Middleware in the chain receives the real store's dispatch method as the **next** parameter, thus ending the chain.

It may sound complicated at first, so let's better look at the signature:

```javascript
const logger = ({ dispatch, getState }) => next => action => {
  // Do the work and call "next(action)"
  next(action);
};
```

Now let's fill the **logger** function with the code that outputs the action details and the next state of the application:

```javascript
const logger = ({ getState }) => next => action => {
  // Log the current action
  console.log("Dispatching:", action);
  
  /*
    Call when middleware has done its job 
    To send the action to a reducer or the next middleware
  */
  next(action);

  // Log the new state after the action is executed
  console.log("Next state:", getState());
};
```

The next step is to pass the Middleware to the **applyMiddleware(...middleware)** function:

```javascript
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const logger = ({ getState }) => next => action => {
  console.log("Dispatching:", action);
  next(action);
  console.log("Next state:", getState());
};

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
}
```

Finally, enjoy the logs:

![Logs In The Developer's Console](/img/screenshot-2021-08-29-at-22.54.51.png "Logs In The Developer's Console")

## Summary

In this article, we learned what a Middleware is, how to create a custom Middleware in Redux, and how to add it to the chain using the **applyMiddleware(...middleware)** method.

Of course, I do not recommend creating a custom logger Middleware, better use the existing one - [redux-logger](https://github.com/LogRocket/redux-logger), which is sufficient for most cases.