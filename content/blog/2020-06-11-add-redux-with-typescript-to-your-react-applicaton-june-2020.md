---
title: Add Redux With Typescript To Your React Application (June 2020)
tag:
  - React
promote: false
metaDescription: Configuring React application to use Redux can be confusing,
  especially at the beginning, so here's a practical step-by-step guide how to
  do it.
teaser: Redux is a library that allows us to manage an application's state
  easily and predictably. Configuring React application to use Redux can be
  confusing, especially at the beginning, so here's a practical step-by-step
  guide...
date: 2020-06-11T16:56:10.691Z
---
**Redux** is a library that allows us to manage an application's state easily and predictably.

We won't focus on what are the benefits of using Redux or should you add it to your project, but on how to install and configure the library.

## Create React application

To begin with, let's create a simple React application using **[create-react-app](https://github.com/facebook/create-react-app):**

`npx create-react-app react-redux-guide --template typescript`

## Install Redux

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

  Don't worry if you don't get why do we need this, we'll explain it in detail later.
* **@types/react-redux** - type declarations for react-redux library
* **@types/redux-thunk** - type declarations for redux-thunk library
* **redux-logger** - middleware for logging dispatched actions
* **@types/redux-logger** - type declarations for redux-logger library

## Configure Redux

After the installation let's proceed with creating store:

> Think of the **store** as of something that holds your application's state.

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

The store is the result of executing `createStore` function, which takes `rootReducer` as the first argument and middlewares as the second.

`rootReducer` is a combination of all reducers that exist in your app. 

As your app grows more complex, it's a good idea to split your reducer function into separate functions, each managing independent parts of the state. 

As you may have noticed, it doesn't exist yet, so let's add it. 

Create `src/store/rootReducer.ts` with the following content:

```javascript
import { combineReducers } from 'redux';

import counter from './counter/reducer';

export default combineReducers({
  counter,
});
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

Types should typically be defined as string constants in larger projects to keep your codebase clean, but it's also good to use just a string literals.

In our project, we'll extract them into a separate file named `src/store/counter/actionTypes.ts`.

Put the following content inside of this file:

```javascript
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
```

We have only 2 action types, which indicate incrementing or decrementing `counter` value.

Since we're using **typescript**, it's necessary to create **types** for the initial state and each fired action.

Create a file `src/store/counter/types.ts` with the following content:

```javascript
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

```javascript
import { Dispatch } from 'redux';

import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
} from './actionTypes';

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

Note, how we return async function, which receives `dispatch` as the first argument.

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

*Note, that you don't have to copy the above code into an application, it's just an example.*

Afterwards, we have to find a way to pull the data out of the store.

We'll add `reselect` - simple “selector” library for Redux:

`yarn add reselect`

There is one major benefit of using `reselect` - it creates memoized selectors, which will re-run only if their arguments change.

Create the file `src/store/counter/selectors.ts` with the following contents:

```javascript
import { createSelector } from 'reselect';

import { AppState } from '../rootReducer';

export const getCounter = (state: AppState) =>
  state.counter.counter;

export const getCounterSelector = createSelector(
  getCounter,
  counter => counter,
);
```

In the above example, we’ve broken our counter retrieval function into two functions.

The first function simply gets the counter value and the second one represents a memoized selector.

Reselect exposes the `createSelector` API which allows us to build a memoized selector. 

What this means is that `getCounterSelector` will be calculated only the first time the function runs. 

If the same function is called again, but the input (the result of `getCounter`) has not changed, the function will simply return a cached value. 

You may have notices that we import `AppState` type.

It's necessary to type the `state` argument to have a hint of what can be accessed from it.

Change the `src/store/rootReducer.ts` to export `AppState`:

```javascript
import { combineReducers } from 'redux';

import counter from './counter/reducer';

const rootReducer = combineReducers({
  counter,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
```

Lastly, we have to make our React app aware of the entire Redux's store. 

Add `Provider` with `store` to the `src/index.tsx` file:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import * as serviceWorker from './serviceWorker';
import configureStore from './store';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

That's it! We're done with the configuration, it's time to test it out.

Modify the content of `src/App.tsx` component:

```javascript
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCounterSelector } from './store/counter/selectors';
import { incrementCounter, decrementCounter } from './store/counter/actions';

function App() {
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

You should see 2 buttons and the counter value on the screen:

![React redux counter application](/img/screenshot-2020-06-11-at-21.17.23.png "React redux counter application")

Try to click on each of them and see if the counter value is changed.

Open the developer tools and notice that each action is logged to the console thanks to the `redux-logger` middleware:

![redux-logger in action](/img/screenshot-2020-06-11-at-21.44.36.png "redux-logger in action")

## Summary

In this article, we've covered the simplest Redux + Typescript configuration for the React application.

I hope this guide was useful to you.

See you in the next articles.

**P.S.** The code is available on the G[ithub repository](https://github.com/volodymyrhudyma/react-redux-typescript-app).