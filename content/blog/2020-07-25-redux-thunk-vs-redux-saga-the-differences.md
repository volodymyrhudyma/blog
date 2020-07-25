---
title: Redux Thunk vs. Redux Saga. The differences.
tag:
  - React
metaDescription: Meta desc
teaser: Teaser
date: 2020-07-25T06:35:42.544Z
---
## Redux

**Redux** is a library that allows us to manage an application's state easily and predictably.

The main concept behind the Redux is that the entire application's state is stored in one central location called **store**.

Each component of the React application (Redux could be used not only with React) can connect to that store and pull the necessary data out.

To configure your React application with Redux you can refer to [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/).

## Middleware

Middleware in Redux is a third-party extension point between dispatching an action, and the moment it reaches the reducer.

It is known as a suggested way to extend Redux with the custom functionality.

One of the key features of the Middleware is that it is composable and each middleware requires no knowledge of what comes before or after it in the chain.

The most common use case for middleware is to support asynchronous actions.

Let's see an example of middleware, which logs information about what action is to be dispatched and the state after dispatching:

```typescript
import { createStore, applyMiddleware } from "redux";

import rootReducer from "./rootReducer";

function logger({ getState }) {
  return next => action => {
    console.log("Will dispatch:", action);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    console.log("State after dispatch", getState());

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  }
}

const store = createStore(rootReducer, ["Configure Redux"], applyMiddleware(logger));

store.dispatch({
  type: "ADD_TODO",
  payload: "Understand the middleware",
});

// These lines will be logged by the middleware:
// Will dispatch: {type: "ACTION_TYPE", payload: "Hello, world!"}
// State after dispatch: ["Configure Redux", "Understand the middleware"]
```

To read more about middlewares in Redux: <https://redux.js.org/api/applymiddleware>.

## Redux Thunk

**Redux Thunk** is a Thunk middleware for Redux. It allows you to write asynchronous logic that interacts with the store. 

This awesome middleware allows you to write action creators that **return a function instead of an action**. 

The Thunk can be used to delay an action execution or execute specific actions only if a certain condition is met.

To begin with, a plain Redux action looks the following way:

```typescript
{
  type: "ADD_TODO",
  payload: "Understand the redux-thunk middleware",
}
```

Actions are plain JavaScript objects which must have a `type` property that indicates the type of action being performed.

Other than `type`, the structure of an action object is really up to you. 

In our example above we have extended the action with `payload` that represents the todo item.

Do you know what are **action creators**? They are just **functions that return actions** and nothing more:

```typescript
function addTodo(payload) {
  return {
    type: "ADD_TODO",
    payload,
  };
}
```

Action creators make actions portable and easy-to-test.

Having all the information above in mind, this is how the action creators look like when using Thunk:

```typescript
function addTodo(payload) {
  return {
    type: "ADD_TODO",
    payload,
  };
}

function addTodoAsync(payload) {
  // We return function instead of an action
  // It receives "dispatch" and "getState" as a parameters
  // We can access the state in the store via "getState()"
  return (dispatch) => {
    setTimeout(() => {
      // Invoke "ADD_TODO" action asynchronously, after 1s
      dispatch(addTodo(payload));
    }, 1000);
  };
}
```

This is a very basic example, but it shows the overall concept.

Consider the real-world example:

```typescript
export const fetchBuildingShape = () => {
  return async (dispatch) => {
    dispatch({
      type: "FETCH_BUILDING_SHAPE",
    });
    try {
      const { data } = await api.getBuildingShape();
      dispatch({
        type: "FETCH_BUILDING_SHAPE_FULFILLED",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_BUILDING_SHAPE_REJECTED",
        payload: error.toString(),
      });
    }
  };
};
```

We interact with an external API to fetch the shape of the building.

The first action we dispatch is `FETCH_BUILDING_SHAPE` which tells us that `fetchBuildingShape` action creator has started its work, so we can show a loading indicator for the users.

Inside of the `try` block we send a request to an API to get the data and dispatch `FETCH_BUILDING_SHAPE_FULFILLED` action to pass the received data to the store.

In case if the API request failed, the `FETCH_BUILDING_SHAPE_REJECTED` action is fired and information about the error is passed to the store.

#### What is a thunk?

A thunk is a function that wraps an expression to delay its evaluation.

```typescript
// Calculation of "x" is immediate
const x = 1 + 2;

// Calculation of "foo" is delayed
// "foo" can be called later to perform the calculation
// "foo" is a thunk
let foo = () => 1 + 2;
```

To configure Redux with redux-thunk middleware refer to [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/).

#### Injecting a custom argument

Remember me saying that the Thunk function returned by action creator received only 2 arguments: `dispatch` and `getState`?

 Since 2.1.0, Redux Thunk supports injecting a custom argument using the `withExtraArgument` function:

```typescript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const importantNumber = 100;

const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument(importantNumber)));
```

To pass multiple things, wrap them all into a single object:

```typescript
const importantNumber = 100;
const importantString = "XcFdwq123";

thunk.withExtraArgument({ importantNumber, importantString });
```

The reason that we need to use middleware such as Redux Thunk is because the **Redux store only supports synchronous data flow.**

## Redux Saga

**Redux Saga** is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

Saga represents a single thread in your application that is responsible only for handling side-effects.

The library is built on top of generators, which results in bringing some major benefits, like an ability to exit function and later re-enter.

## Comparison

## Summary