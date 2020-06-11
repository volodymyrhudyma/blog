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

After the React application has been successfully created, we can proceed with installing Redux:

`yarn add redux react-redux redux-thunk @types/react-redux @types/redux-thunk`

It's useful to include logger middleware to log all dispatched actions in the developer console:

`yarn add -D redux-logger @types/redux-logger`

* **redux** - the core of Redux
* **react-redux** - official React binding for Redux, it should be installed, as Redux can be used standalone
* **redux-thunk** - thunk middleware for Redux

  > **Middleware** is some code you can put between the framework receiving a request, and the framework generating a response. 
  >
  > Redux middleware **provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.** It allows you to write action creators that return a function instead of an action.

  Don't worry if you don't get why do we need this, we'll cover it up in details later.
* **@types/react-redux** - type declarations for react-redux library
* **@types/redux-thunk** - type declarations for redux-thunk library
* **redux-logger** - middleware for logging dispatched actions
* **@types/redux-logger** - type declarations for redux-logger library

After the installation let's begin with creating store:

> Think of **store** as of something that holds your application's state

We'll create store under the following path `src/store/index.ts` with the following content:

```javascript
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

export default function configureStore() {
  return createStore(rootReducer, applyMiddleware(thunk, logger));
}

```

As you can notice, store is the result of executing `createStore` function, which takes `rootReducer` as the first argument and middlewares as the second.

`rootReducer` is basically a combination of all reducers that exist in your app. As your app grows more complex, it's a good idea to split your reducer function into separate functions, each managing independent parts of the state. 

As you may have notices, it doesn't exist yet, so let's add it. Create `src/store/rootReducer.ts` with the following content:

```javascript
import { combineReducers } from 'redux';

import counter from './counter/reducer';

export default combineReducers({
  counter,
});

```

This `rootReducer` imports all separate reducer functions and combines them into one, which can be passed to the store.

 The next step is to add `counter` reducer. Create `src/store/counter/reducer.ts` with the following content:

```javascript
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './action-types';

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

In this reducer we define the initial state, which holds our `counter` value, which equals to `0` by default and we check the type of an action which has been fired `action.type` and change the state accordingly.

If we fired `INCREMENT_COUNTER` action, we add `1`, if `DECREMENT_COUNTER` - we remove `1`.

**Important note:** remember that reducer function should return the new state, without even touching the existing.

The next step is to define **action types**. 

As you should remember, actions are plain JavaScript objects. 

They must have a `type` property that indicates the type of action being performed.

Types should typically be defined as string constants in a larger projects to keep your codebase clean, but it's also good to use just a string literals.

In our project we'll extract them into separate file named `src/store/counter/actionTypes.ts`.

Put the following content inside of this file:

```javascript
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

```

We'll have only 2 action types, which indicate incrementing or decrementing `counter` value.

Since we're using **typescript**, it's necessary to create **types** for initial state and each fired action.

Create a file `src/store/counter/types.ts` with the following content:

```javascript
import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './action-types';

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

Create a new file `src/store/counter/action.ts` with the following content:

```javascript
import { Dispatch } from 'redux';

import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './action-types';

import {
  IncrementCounter,
  DecrementCounter,
} from './types';

export const incrementCounter = () => {
  return async (dispatch: Dispatch) => {
    dispatch<IncrementCounter>({
      type: INCREMENT_COUNTER,
    });
  };
};

export const decrementCounter = () => {
  return async (dispatch: Dispatch) => {
    dispatch<DecrementCounter>({
      type: DECREMENT_COUNTER,
    });
  };
};

```

Note, how we return async function with receives `dispatch` as the first argument.

This is possible thanks to the `redux-thunk` library, which allows us to write asynchronous logic.

We could hit the api inside of our action, wait for the response and fire action that indicates success or error depending on the response:

```javascript
export const fetchUser = () => {
  return async (dispatch: Dispatch) => {
    dispatch<FetchUser>({
      type: FETCH_USER,
    });
    try {
      const { data } = await api.fetchUser();
      dispatch<FetchUserFulfilled>({
        type: FETCH_USER_FULFILLED,
        payload: data,
      });
    } catch (error) {
      dispatch<FetchUserRejected>({
        type: FETCH_USER_REJECTED,
        payload: error.toString(),
      });
    }
  };
};
```

 Note, that you don't have to copy the above code into an application, it's just an example.