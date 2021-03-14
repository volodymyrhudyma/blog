---
title: Redux Thunk vs. Redux Saga. The Differences.
tag:
  - React
promote: true
metaDescription: The most important differences between Redux Thunk and Redux
  Saga. Get to know both approaches and choose the one that best suits your
  project.
teaser: Today, the vast majority of applications have to deal with asynchronous
  tasks. In React, there are 2 most popular libraries that allow you to handle
  them in an easy way...
date: 2020-07-25T06:35:42.544Z
---
Today, the vast majority of applications have to deal with asynchronous tasks.

In React, there are 2 most popular libraries that allow you to handle them in an easy way: **Redux Thunk** and **Redux Saga**.

But before we learn and compare them, we should remind ourselves of some basic concepts.

## Redux

**Redux** is a library that allows us to manage the state of an application in a simple and predictable way.

The main concept behind Redux is that the entire state of an application state is stored in a central location called **store**.

Any component of the React application (Redux could be used not only with React) can connect to that store and extract the necessary data.

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

The Thunk can be used to delay an action execution or execute specific actions only when a certain condition is met.

To begin with, a plain Redux action looks like this:

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
const addTodo = (payload) => ({
  type: "ADD_TODO",
  payload,
});
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

Within the `try` block we send a request to an API to get the data and dispatch `FETCH_BUILDING_SHAPE_FULFILLED` action to pass the received data to the store.

If the API request fails, the `FETCH_BUILDING_SHAPE_REJECTED` action is fired and information about the error is passed to the store.

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
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

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

**Important note:** we would not cover the installation process in this tutorial. Please, refer to [the documentation](https://redux-saga.js.org/).

Consider the following example:

```typescript
// building/actions.ts
export const fetchBuildingShapeAction = () => ({
  type: "FETCH_BUILDING_SHAPE_REQUESTED",
});

// building/sagas.ts
import { call, put, takeLatest } from "redux-saga/effects";

function* fetchBuildingShapeSaga = () => {
   yield put({
     type: "FETCH_BUILDING_SHAPE_STARTED", 
   });
   try {
      const data = yield call(api.getBuildingShape);
      yield put({
        type: "FETCH_BUILDING_SHAPE_FULFILLED", 
        payload: data,
      });
   } catch (error) {
      yield put({
        type: "FETCH_BUILDING_SHAPE_REJECTED", 
        error: error.toString(),
      });
   }
};

function* buildingSaga() {
  yield takeLatest("FETCH_BUILDING_SHAPE_REQUESTED", fetchBuildingShapeSaga);
}

export default buildingSaga;
```

The sagas can be divided into 2 types (The terms refer to a way of organizing the control flow in Redux Saga):

* saga watcher `buildingSaga`

  It watches the dispatched actions and spawns a new task on every action.
* saga worker `fetchBuildingShapeSaga`

  It is responsible for handling side-effects.

In our example, the watcher executes `fetchBuildingShapeSaga` function each time `FETCH_BUILDING_SHAPE_REQUESTED` action is dispatched. As simple as that.

You may have noticed the following code:

`import { call, put, takeLatest } from "redux-saga/effects";`

To understand what do those functions mean, we have to understand the Effects in Redux Saga.

#### The Effects

In Redux Saga, sagas are implemented using generator functions. To express the saga logic, we yield plain JavaScript objects from the generator. We call those objects **Effects**.

> An **Effect** is an object that contains some information to be interpreted by the middleware. It is an instruction for middleware to perform some operation.

To create Effects, you have to use the functions provided by the library in the `redux-saga/effects` package.

* `call(fn, ...args)` - creates an Effect description that instructs the middleware to call the function `fn` with `args` as arguments.
* `put(action)` - creates an Effect description that instructs the middleware to schedule the dispatching of an action to the store. This dispatch may not be immediate since other tasks might lie ahead in the saga task queue or still be in progress.
* `takeLatest(pattern, saga, ...args)` - forks a saga on each action dispatched to the store that matches pattern. And automatically cancels any previous saga task started previously if it's still running.

More effects can be found in [the documentation](https://redux-saga.js.org/docs/api/).

## Comparison

Since we know the basics of both approaches, we are able to compare them.

First of all, we should not think that one approach is so much better than the other, because both libraries do their job very well.

#### The advantages of Redux Thunk

* **easy-to-learn**

  Configuring and using the Redux Thunk library is a very simple process, so it is perfect for beginners to learn the whole concept of middleware.

  If you need something to get started quickly, Redux Thunk may be the best choice.

#### The advantages of Redux Saga

* **easy-to-test**

  Saga's Effect concept makes it extremely easy-to-test. When testing the Generator, all we need to do is to check that it yields the expected instruction.
* **built-in throttling, debouncing, race conditions and cancellation**

  Redux Saga a lot of built-in features, which Redux Thunk lacks. For example, you can throttle requests, debounce or cancel them and handle race conditions.

## Testing

In this chapter, we will compare the unit testing of code that uses Redux Thunk and Redux Saga.

#### Redux Thunk test

The code:

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

The test:

```typescript
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

import axios from "@constants/axios";

import { fetchBuildingShape } from "./actions";

const axiosMock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetchBuildingShape action", () => {
  it("should fire FETCH_BUILDING_SHAPE_FULFILLED in case of success", () => {
    const data = {
      floors: 9,
      elevators: 2,
    };

    axiosMock.onGet("/building").reply(200, data);

    const expectedActions = [
      { type: "FETCH_BUILDING_SHAPE" },
      { type: "FETCH_BUILDING_SHAPE_FULFILLED", payload: data },
    ];

    const store = mockStore();

    return store.dispatch(fetchBuildingShape()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
```

#### Redux Saga test

The code:

```typescript
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchBuildingShapeSaga = () => {
   yield put({
     type: "FETCH_BUILDING_SHAPE_STARTED", 
   });
   try {
      const data = yield call(api.getBuildingShape);
      yield put({
        type: "FETCH_BUILDING_SHAPE_FULFILLED", 
        payload: data,
      });
   } catch (error) {
      yield put({
        type: "FETCH_BUILDING_SHAPE_REJECTED", 
        error: error.toString(),
      });
   }
};

function* buildingSaga() {
  yield takeLatest("FETCH_BUILDING_SHAPE_REQUESTED", fetchBuildingShapeSaga);
}

export default buildingSaga;
```

The test:

```typescript
import { call, put } from "redux-saga/effects";

import { fetchBuildingShape } from "./actions";
import api from "./api";

it("should fetch building shape", () => {
  const gen = fetchBuildingShapeSaga();

  expect(gen.next().value).toEqual(
    put({
      type: "FETCH_BUILDING_SHAPE_STARTED",
    }),
  );
  // We do not have to mock api.getBuildingShape
  expect(gen.next().value).toEqual(call(api.getBuildingShape));
  expect(gen.next().value).toEqual(
    put({
      type: "FETCH_BUILDING_SHAPE_FULFILLED",
    }),
  );
  expect(gen.next().done).toBeTruthy();
});
```

Although it may be useful to test each step of a saga, in practice this makes for brittle tests. Instead, it may be preferable to run the whole saga and assert that the expected effects have occurred:

```typescript
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { runSaga } from "redux-saga";

import { fetchBuildingShape } from "./actions";
import api from "./api";

const axiosMock = new MockAdapter(axios);

it("should fetch building shape", async () => {
  const data = {
    floors: 9,
    elevators: 2,
  };

  axiosMock.onGet("/building").reply(200, data);

  const dispatched = [];

  const saga = await runSaga(
    {
      dispatch: action => dispatched.push(action),
    },
    fetchBuildingShapeSaga,
  );
  await saga.toPromise();

  expect(dispatched).toEqual([
    {
      type: "FETCH_BUILDING_SHAPE_STARTED",
    },
    {
      type: "FETCH_BUILDING_SHAPE_FULFILLED",
      payload: data,
    },
  ]);
});
```

To read more about testing sagas refer to the [official documentation](https://redux-saga.js.org/docs/advanced/Testing.html).

## Summary

In this article we have reviewed the two most popular approaches to handle asynchronous code in Redux applications and identified the advantages of each one.

In summary, Redux Saga provides more functionality out-of-the-box, but requires more knowledge to be wisely used.