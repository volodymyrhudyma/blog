---
title: Add Redux Saga With TypeScript To Your React Application (January 2020)
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

After the installation let's proceed with creating a store:

> Think of a **store** as of something that holds your application's state.

We'll create a store under the following path `src/store/index.ts` with the following content:

```javascript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import rootReducer from './rootReducer';
import { rootSaga } from './rootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
```

The store is the result of executing `createStore` function, which takes `rootReducer` as the first argument and middlewares as the second.

`rootReducer` is a combination of all reducers that exist in your app.

`rootSaga` is a combination of all sagas that exist in your app.

As your app grows more complex, it's a good idea to split your reducers and sagas into separate functions.

As you may have noticed, **rootReducer** and **rootSaga** do not exist yet, so let's add them.

Create `src/store/rootReducer.ts` with the following content:

```javascript
import { combineReducers } from 'redux';

import counter from './counter/reducer';

const rootReducer = combineReducers({
  counter,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
```

This `rootReducer` imports all separate reducer functions and combines them into one, which can be passed to the store.

The next step is to add a `counter` reducer. Create `src/store/counter/reducer.ts` with the following content:

```javascript
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './actionTypes';

import { CounterActions, CounterState } from './types';

const initialState: CounterState = {
  counter: 0,
};

export default (state = initialState, action: CounterActions) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return {
        ...state,
      };
  }
};
```

We define the initial state, which holds our `counter` value equal to `0` by default, and which is passed as the first argument to the reducer.

In the reducer's body we check the type of an action which has been fired (`action.type`) and change the state accordingly.

If we fired `INCREMENT_COUNTER` action, we add `1`, if `DECREMENT_COUNTER` - we remove `1`.

**Important note:** remember that the reducer function should return the new state, without even touching the existing.

The next step is to define **action types**.

As you should know, actions are plain JavaScript objects.

They must have a `type` property that indicates the type of action being performed.

Types should typically be defined as string constants in larger projects to keep your codebase clean, but it's also good to use just string literals.

In our project, we'll extract them into a separate file named `src/store/counter/actionTypes.ts`.

Put the following content inside of this file:

```javascript
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
```

We have only 2 action types, which indicate incrementing or decrementing `counter` value.

Since we're using **TypeScript**, it's necessary to create **types** for the initial state and each fired action.

Create a file `src/store/counter/types.ts` with the following content:

```typescript
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './actionTypes';

export type CounterState = {
  counter: number;
};

export type IncrementCounter = {
  type: typeof INCREMENT_COUNTER;
};

export type DecrementCounter = {
  type: typeof DECREMENT_COUNTER;
};

export type CounterActions =
  | IncrementCounter
  | DecrementCounter;
```

And we're ready to build our first **action.**

Create a new file `src/store/counter/actions.ts` with the following content:

```typescript
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './actionTypes';

import {
  IncrementCounter,
  DecrementCounter,
} from './types';

export const incrementCounter = (): IncrementCounter => ({
  type: INCREMENT_COUNTER,
});

export const decrementCounter = (): DecrementCounter => ({
  type: DECREMENT_COUNTER,
});
```

Note, how we return a plain object from an action.

The next step is to create a **saga** that watches **INCREMENT_COUNTER** and **DECREMENT_COUNTER** actions and performs the handling of side effects.

Create a new file `src/store/counter/sagas.ts` with the following content:

```typescript
import { all, put, takeEvery } from 'redux-saga/effects'

import { DECREMENT_COUNTER, INCREMENT_COUNTER } from './actionTypes';

// Worker Saga: Fired on INCREMENT_COUNTER action
function* incrementCounter() {
   try {
      yield put({ type: INCREMENT_COUNTER });
   } catch (e) {
      console.log(e.message);
   }
}

// Worker Saga: Fired on DECREMENT_COUNTER action
function* decrementCounter() {
   try {
      yield put({ type: DECREMENT_COUNTER });
   } catch (e) {
      console.log(e.message);
   }
}

/*
  Starts incrementCounter/decrementCounter on each dispatched `INCREMENT_COUNTER`/`DECREMENT_COUNTER` action.
  Allows concurrent increments.
*/
function* counterSaga() {
   yield all([
      takeEvery(INCREMENT_COUNTER, incrementCounter),
      takeEvery(DECREMENT_COUNTER, decrementCounter),
   ])
}

export default counterSaga;
```

And the final step is to import all sagas into the **rootSaga.ts** file.

Create a new file `src/store/rootSaga.ts` with the following content:

```typescript
import { all, fork } from "redux-saga/effects";

import counterSaga from "./counter/sagas";

export function* rootSaga() {
  return all([
    fork(counterSaga)
  ]);
};
```

Afterwards, we have to find a way to pull the data out of the store.

We'll add `reselect` - simple “selector” library for Redux:

`yarn add reselect`

There is one major benefit of using `reselect` - it creates memoized selectors, which will re-run only if their arguments change.

Create the file `src/store/counter/selectors.ts` with the following contents:

```typescript
import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

export const getCounter = (state: AppState) =>
  state.counter.counter;

export const getCounterSelector = createSelector(
  getCounter,
  counter => counter,
);
```

Lastly, we have to make our React app aware of the entire Redux's store.

Add `Provider` with `store` to the `src/index.tsx` file:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import store from './store';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

That's it! We're done with the configuration, it's time to test it out.

Modify the content of `src/App.tsx` component:

```tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCounterSelector } from './store/counter/selectors';
import { incrementCounter, decrementCounter } from './store/counter/actions';

const App = () => {
  const dispatch = useDispatch();
  const counter = useSelector(getCounterSelector);

  const handleIncrement = () => {
    dispatch(incrementCounter());
  };

  const handleDecrement = () => {
    dispatch(decrementCounter());
  };

  return (
    <div className='App'>
      <div>
        <button onClick={handleIncrement}>Increment</button>
      </div>
      <div>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <div>{counter}</div>
    </div>
  );
}

export default App;
```

And run the application:

`yarn start`

## Summary

In this article, we have covered the simplest Redux + Redux Saga + TypeScript configuration for the React application created with Create React App.

Make sure to read [Redux Saga](https://redux-saga.js.org/) docs before starting coding anything using this middleware, because it is way more complicated and provides us with more features than the [Redux Thunk](https://github.com/reduxjs/redux-thunk). 

I hope this guide was useful to you.

See you in the next articles.

**P.S.** The code is available on the Github repository.