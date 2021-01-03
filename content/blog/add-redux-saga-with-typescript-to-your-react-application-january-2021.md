---
title: Add Redux Saga With TypeScript To Your React Application (January 2021)
tag:
  - React
promote: false
metaDescription: Add Redux Saga to React application created with Create React
  App in a few simple steps. Redux Saga is a library that is used to handle side
  effects in Redux.
teaser: "**Redux Saga** is a library that aims to make application side effects
  easier to manage, more efficient to execute, easy to test, and better at
  handling failures. Today we will learn how to install and configure Redux Saga
  with TypeScript in an application created with Create React App in a few..."
date: 2021-01-03T08:08:30.929Z
---
**Redux** is a library that allows us to manage an application's state easily and predictably.

**Redux Saga** is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

Today we will learn how to install and configure Redux Saga with TypeScript in an application created with Create React App in a few simple steps.

The application will fetch todos from the following endpoint (https://jsonplaceholder.typicode.com/todos) and display them in a long list.

## Step 1: Create React App

To begin with, let's create a simple React application using [create-react-app](https://github.com/facebook/create-react-app)**:**

`npx create-react-app redux-saga-guide --template typescript`

After the installation is completed, start the project to verify if everything works as expected:

`yarn start`

You should see nice spinning React logo and some text:

![CRA Initial Screen](/img/screenshot-2021-01-03-at-09.00.58.png "CRA Initial Screen")

Congratulations on creating the React application. 

Remember that **a journey of a thousand miles begins with a single step**.

## Step 2: Install Redux / Redux Saga

After the React application has been successfully created, we can proceed with installing Redux and Redux Saga:

`yarn add redux react-redux redux-saga @types/react-redux @types/redux-saga`

* **redux** - the core of Redux
* **react-redux** - official React binding for Redux, it should be installed, as Redux can be used standalone
* **redux-saga** - saga middleware for Redux

  > **Middleware** is some code you can put between the framework receiving a request, and the framework generating a response.
  >
  > Redux middleware **provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.** It allows you to write action creators that return a function instead of an action.

  Don't worry if you don't get why do we need this, we'll explain it in detail later.
* **@types/react-redux** - type declarations for react-redux library
* **@types/redux-saga** - type declarations for redux-saga library

## Step 2.1: Install Redux Logger / Axios

It's useful to include logger middleware to log all dispatched actions in the developer console:

`yarn add -D redux-logger @types/redux-logger`

And [axios](https://github.com/axios/axios) - Promise based HTTP client:

`yarn add axios @types/axios`

## Step 3: Create Store

After the installation let's proceed with creating a store:

> Think of a **store** as of something that holds your application's state.

We'll create a store under the following path `src/store/index.ts` with the following content:

```javascript
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
```

The store is the result of executing `createStore` function, which takes `rootReducer` as the first argument and middlewares as the second.

`rootReducer` is a combination of all reducers that exist in your app.

`rootSaga` is a combination of all sagas that exist in your app.

As your app grows more complex, it's a good idea to split your reducers and sagas into separate functions.

As you may have noticed, **rootReducer** and **rootSaga** do not exist yet, so let's add them.

## Step 4: Create Root Reducer

Create `src/store/rootReducer.ts` with the following content:

```javascript
import { combineReducers } from "redux";

import todoReducer from "./todo/reducer";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
```

This `rootReducer` imports all separate reducer functions and combines them into one, which can be passed to the store.

## Step 5: Create Todo Reducer

The next step is to add a **todo** reducer. 

Create `src/store/todo/reducer.ts` with the following content:

```javascript
import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
} from "./actionTypes";

import { TodoActions, TodoState } from "./types";

const initialState: TodoState = {
  pending: false,
  todos: [],
  error: null,
};

export default (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case FETCH_TODO_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_TODO_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: action.payload.todos,
        error: null,
      };
    case FETCH_TODO_FAILURE:
      return {
        ...state,
        pending: false,
        todos: [],
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
```

We define the initial state, which holds our list of todo items value equal to an empty array(\[]) by default, a flag that indicates if the API call is still in progress and an error text if it occurs.

In the reducer's body we check the type of action which has been fired (`action.type`) and change the state accordingly.

In the case of **FETCH_TODO_REQUEST** action, we let the UI know that the API call is in progress.

In the case of **FETCH_TODO_SUCCESS** action, we populate todo items in the store, let the UI know that the API call has finished and clear an error if there was any previously.

In the case of **FETCH_TODO_FAILURE** action, we clear all todo items in the store, let UI know that the API call has finished and set an error to be displayed in the UI later.

**Important note:** remember that the reducer function should return the new state, without even touching the existing one.

## Step 6: Create Action Types

The next step is to define **action types**.

As you should know, actions are plain JavaScript objects.

They must have a `type` property that indicates the type of action being performed.

Types should typically be defined as string constants in larger projects to keep your codebase clean, but it's also good to use just string literals.

In our project, we'll extract them into a separate file named `src/store/todo/actionTypes.ts`.

Put the following content inside of this file:

```javascript
export const FETCH_TODO_REQUEST = "FETCH_TODO_REQUEST";
export const FETCH_TODO_SUCCESS = "FETCH_TODO_SUCCESS";
export const FETCH_TODO_FAILURE = "FETCH_TODO_FAILURE";

```

We have 3 action types, which display the state of the current API call.

Since we're using **TypeScript**, it's necessary to create **types** for the initial state and each fired action.

## Step 7: Add Types

Create a file `src/store/todo/types.ts` with the following content:

```typescript
import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_FAILURE,
} from "./actionTypes";

export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  pending: boolean;
  todos: ITodo[];
  error: string | null;
}

export interface FetchTodoSuccessPayload {
  todos: ITodo[];
}

export interface FetchTodoFailurePayload {
  error: string;
}

export interface FetchTodoRequest {
  type: typeof FETCH_TODO_REQUEST;
}

export type FetchTodoSuccess = {
  type: typeof FETCH_TODO_SUCCESS;
  payload: FetchTodoSuccessPayload;
};

export type FetchTodoFailure = {
  type: typeof FETCH_TODO_FAILURE;
  payload: FetchTodoFailurePayload;
};

export type TodoActions =
  | FetchTodoRequest
  | FetchTodoSuccess
  | FetchTodoFailure;
```

And we're ready to build our first **action.**

## Step 8: Create Actions

Create a new file `src/store/todo/actions.ts` with the following content:

```typescript
import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_FAILURE,
  FETCH_TODO_SUCCESS,
} from "./actionTypes";

import {
  FetchTodoRequest,
  FetchTodoSuccess,
  FetchTodoSuccessPayload,
  FetchTodoFailure,
  FetchTodoFailurePayload,
} from "./types";

export const fetchTodoRequest = (): FetchTodoRequest => ({
  type: FETCH_TODO_REQUEST,
});

export const fetchTodoSuccess = (
  payload: FetchTodoSuccessPayload
): FetchTodoSuccess => ({
  type: FETCH_TODO_SUCCESS,
  payload,
});

export const fetchTodoFailure = (
  payload: FetchTodoFailurePayload
): FetchTodoFailure => ({
  type: FETCH_TODO_FAILURE,
  payload,
});
```

Note, how we return a plain object from an action.

## Step 9: Create Sagas

The next step is to create a **saga** that watches **FETCH_TODO_REQUEST** and performs the handling of side effects.

Create a new file `src/store/todo/sagas.ts` with the following content:

```typescript
import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { fetchTodoFailure, fetchTodoSuccess } from "./actions";

import { FETCH_TODO_REQUEST } from "./actionTypes";
import { ITodo } from "./types";

const getTodos = () =>
  axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos");

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchTodoSaga() {
  try {
    const response = yield call(getTodos);
    yield put(
      fetchTodoSuccess({
        todos: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchTodoFailure({
        error: e.message,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* todoSaga() {
  yield all([takeLatest(FETCH_TODO_REQUEST, fetchTodoSaga)]);
}

export default todoSaga;
```

## Step 10: Create Root Saga

And the final step is to import all sagas into the **rootSaga.ts** file.

Create a new file `src/store/rootSaga.ts` with the following content:

```typescript
import { all, fork } from "redux-saga/effects";

import todoSaga from "./todo/sagas";

export function* rootSaga() {
  yield all([fork(todoSaga)]);
}
```

Afterward, we have to find a way to pull the data out of the store.

## Step 11: Add Reselect

We'll add `reselect` - simple “selector” library for Redux:

`yarn add reselect`

There is one major benefit of using `reselect` - it creates memoized selectors, which will re-run only if their arguments change.

Create the file `src/store/todo/selectors.ts` with the following contents:

```typescript
import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.todo.pending;

const getTodos = (state: AppState) => state.todo.todos;

const getError = (state: AppState) => state.todo.error;

export const getTodosSelector = createSelector(getTodos, (todos) => todos);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
```

Lastly, we have to make our React app aware of the entire Redux's store.

## Step 12: Add Store Provider

Add `Provider` with `store` to the `src/index.tsx` file:

```tsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";

import store from "./store";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

That's it! We're done with the configuration, it's time to test it out.

## Step 13: Test It Out

Modify the content of `src/App.tsx` component:

```tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getPendingSelector,
  getTodosSelector,
  getErrorSelector,
} from "./store/todo/selectors";
import { fetchTodoRequest } from "./store/todo/actions";

const App = () => {
  const dispatch = useDispatch();
  const pending = useSelector(getPendingSelector);
  const todos = useSelector(getTodosSelector);
  const error = useSelector(getErrorSelector);

  useEffect(() => {
    dispatch(fetchTodoRequest());
  }, []);

  return (
    <div style={{ padding: "15px" }}>
      {pending ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        todos.map((todo, index) => (
          <div style={{ marginBottom: "10px" }} key={todo.id}>
            {++index}. {todo.title}
          </div>
        ))
      )}
    </div>
  );
};

export default App;
```

And run the application:

`yarn start`

You should see the list of fetched todos that contains 200 items:

![Fetched TODO items](/img/screenshot-2021-01-03-at-11.37.41.png "Fetched TODO items")

## Summary

In this article, we have covered the simplest Redux + Redux Saga + TypeScript configuration for the React application created with Create React App.

Make sure to read [Redux Saga](https://redux-saga.js.org/) docs before starting coding anything using this middleware, because it is way more complicated and provides us with more features than the [Redux Thunk](https://github.com/reduxjs/redux-thunk). 

I hope this guide was useful to you.

See you in the next articles.

**P.S.** The code is available on the Github repository.