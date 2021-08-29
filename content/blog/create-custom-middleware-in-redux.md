---
title: Create Custom Middleware In Redux
tag:
  - React
promote: false
metaDescription: Learn how to create a Custom Logger Middleware in Redux to run
  the code after executing the action but before the reducer.
shareImage: /img/custom-middleware-in-redux.jpg
teaser: Redux is one of the most popular state management libraries available
  for React applications. It provides us with the store that holds the whole
  application's state, actions that describe what happens in the application and
  reducers that create new state object from the...
date: 2021-09-03T11:46:10.273Z
---
Redux is one of the most popular state management libraries available for React applications.

It provides us with the store that holds the whole application's state, actions that describe what happens in the application and reducers that create new state object from the existing one based on the type of an action and given payload.

This flow can be extended using middlewares that allow executing code after dispatching an action, but before it reaches reducer.

Middlewares are typically used for logging, crash reporting, talking to an API, etc.

While there are a lot of middlewares in the npm registry, available to be instantly used, we are given a possibility to create and use our own custom ones.

Today we will learn how to create a custom middleware for logging actions with payload and a state computed right after they have been dispatched.

In other words, our own implementation of the [redux-logger](https://github.com/LogRocket/redux-logger) middleware.

## Logger Middleware

If you used Redux before, you most probably used one of the most popular middlewares that lets you write asynchronous logic that interacts with the store - [redux-thunk](https://github.com/reduxjs/redux-thunk).

It is appended with the help of the **applyMiddleware(...middleware)** function that takes a list of middlewares and composes them:

```javascript
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk));
}
```

Each middleware that is passed to the **applyMiddleware** receives store's **dispatch** and **getState()** functions as named arguments and returns a function.

The returned function is given a **next** middleware's dispatch method and it should return another function.

The last function receives **action** as an argument and is expected to call or not to call **next(action)**, depending on whether we want to continue the chain of actions or not.

It sounds complicated, so let's better look at its signature:

```javascript
const logger = ({ dispatch, getState }) => next => action => {};
```

Now let's fill the **logger** function with the code that outputs the action details and the next state of the application:

```javascript
const logger = ({ getState }) => next => action => {
  // Log the current action
  console.log("Dispatching:", action);
  
  // Call the next dispatch method in the middleware chain
  const result = next(action);

  // Log the new state after the action is executed
  console.log("Next state:", getState());
  
  /* 
     This will likely be the action itself, unless
     a middleware further in chain changed it.
  */
  return result;
};
```

The next step is to pass the middleware to the **applyMiddleware** function:

```javascript
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const logger = ({ getState }) => next => action => {
  console.log("Dispatching:", action);
  const result = next(action);
  console.log("Next state:", getState());
  return result;
};

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
}
```

And enjoy the logs:

![Logs In The Developer's Console](/img/screenshot-2021-08-29-at-22.54.51.png "Logs In The Developer's Console")