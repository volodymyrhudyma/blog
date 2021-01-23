---
title: Global State Management Using React Hooks
tag:
  - React
promote: false
metaDescription: Learn how to build an optimized global state management and
  replace Redux in React using the useReducer hook and the Context API.
teaser: When thinking about the best way to manage state in React, the first
  thing that comes to mind is Redux, and there is nothing wrong with that if you
  accept a lot of boilerplate code and a fairly complex library configuration.
  It may be completely unnecessary if your project is...
date: 2021-01-23T20:56:53.078Z
---
When thinking about the best way to manage state in React, the first thing that comes to mind is Redux, and there is nothing wrong with that if you accept a lot of boilerplate code and a fairly complex library configuration.

It may be completely unnecessary if your project is small in size.

Today we are going to create our **"own Redux"** using tools React provides us out-of-the-box: **useReducer** hook and **Context API.**

## Step 1: Create Store

Everything begins with a Store, which contains the entire state of the application.

Create a file named `store.js` and fill it with the following code:

```javascript
import React, { createContext, useReducer } from "react";

import reducer from "./reducer";

const initialState = {
  count: 0,
};

export const Context = createContext(initialState);

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Store;
```

First, we set the initial state of the application in the **initialState** variable.

Second, we create a Context object to be used to retrieve the **initialState** in a component.

Third, we create a Store component that uses **useReducer** to conveniently update the state (read more about this hook [here](/usereducer-hook-in-react/)).

Finally, we return a `Context.Provider` that passes the **value** to consuming components and export the component from the store (read more about the Context API in React [here](/context-api-in-react/)).

## Step 2: Create Reducer

In the previous step, a Reducer function was imported to the Store. 

> **Reducers** are functions that take the current **state** and an **action** as arguments, and return a new **state** result. In other words, `(state, action) => newState`.

Create a file called `reducer.js` with the following content:

```javascript
export default (state, action) => {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return {
        ...state,
        count: state.count + 1,
      };
    case "DECREMENT_COUNT":
      return {
        ...state,
        count: state.count - 1,
      };
    case "SET_COUNT":
      return {
        ...state,
        count: action.payload,
      };
    case "RESET_COUNT":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};
```

The Reducer handles four actions - **INCREMENT_COUNT**, **DECREMENT_COUNT**, **SET_COUNT** and **RESET_COUNT** which add, subtract, reset or set a value to the **count** variable respectively.

The **state** object is the current state of the application, the **action** - is a triggered action.

> **Actions** are plain JavaScript objects that have a **type** field. As mentioned earlier, **you can think of an action as an event that describes something that happened in the application**.

The **action** contains the **type** property, which determines the type of action dispatched and an optional **payload**, which contains a new data describing what happened in the application.

If we dispatch an action that is not listed in the reducer, it would be handled in the **default** section (we would simply ignore it by returning the current state).

## Step 3: Wrap The Application In "Store" Component

Finally, our components must be aware of the Store.

Open your `index.js` file and wrap your main component (typically **App**) in **Store**:

```jsx
import React from "react";
import ReactDOM from "react-dom";

import Store from "./store";
import App from "./App";

ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);
```

Now is the perfect time to test our changes.

## Step 4: Create UI And Dispatch Actions

Modify the **App** component to display a counter on the screen, a few buttons that trigger actions, and an input that allows you to set a specific value for the counter:

```javascript
import React, { useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <>
      <div>Count: 0</div>
      <button>Increment (+1)</button>
      <button>Decrement (-1)</button>
      <button>Reset (0)</button>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button>Set ("value")</button>
    </>
  );
};

export default App;
```

With some applied styles (skipped here for simplicity), an app should look like this:

![Rendered UI](/img/screenshot-2021-01-23-at-10.07.06.png "Rendered UI")

Let us now make dummy buttons do something useful.

First, we need to access the **initialState** to retrieve the **count** property and display it on the screen.

To do this, import **useContext** from React and **Context** from **store.js** in the **App** component:

```javascript
import React, {useContext} from "react";

import { Context } from "./store";
```

And get the context:

```javascript
const App = () => {
  const [state, dispatch] = useContext(Context);
  
  // ...
}
```

Now we have our **initialState** accessible under the **state** variable and we can easily access **state.count**.

Using the **dispatch** function, we can trigger an action (you remember, we defined four, right?):

```javascript
dispatch({ type: "INCREMENT_COUNT" });

dispatch({ type: "DECREMENT_COUNT" });

dispatch({ type: "RESET_COUNT" });

dispatch({ type: "SET_COUNT", payload: 10 });
```

Put it all together so that the complete code of the **App** component looks like this:

```javascript
import React, { useContext, useState } from "react";

import { Context } from "./store";

const App = () => {
  const [value, setValue] = useState("");
  const [state, dispatch] = useContext(Context);

  return (
    <>
      <div>Count: {state.count}</div>
      <button
        onClick={() => dispatch({ type: "INCREMENT_COUNT" })}
      >
        Increment (+1)
      </button>
      <button
        onClick={() => dispatch({ type: "DECREMENT_COUNT" })}
      >
        Decrement (-1)
      </button>
      <button
        onClick={() => dispatch({ type: "RESET_COUNT" })}
      >
        Reset (0)
      </button>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button
         onClick={() =>
          dispatch({ type: "SET_COUNT", payload: parseInt(value) })
        }
      >
        Set ("value")
      </button>
    </>
  );
};

export default App;
```

And see it in action:

![App In Action](/img/gif.gif "App In Action")

## Bonus Step: Use Multiple Reducers

Congratulations on building your first global state management system with React hooks.

Our sample application is extremely small and all it does is just updating of the **count** value.

That is why we created only one reducer that handles only four types of actions.

But what if the app is a bit bigger and the number of actions grows to 10-20-30?

Processing all of them in a reducer leads to a lot of code being collected in one place, which is not the best solution in terms of maintenance

So it's always a good idea to keep your reducers as small as possible.

If you have worked with Redux, you should know that you can create multiple reducers and combine them all into one, usually called **root reducer** by using the **[combineReducers](https://redux.js.org/api/combinereducers)** function provided by the library.

Let's try to build our own implementation of this.

#### Combine Multiple Reducers Into One

Create `userReducer.js`:

```javascript
export default (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.payload];
    case "REMOVE_USER":
      return state.filter((user) => user !== action.payload);
    default:
      return state;
  }
};
```

Create `projectReducer.js`:

```javascript
export default (state, action) => {
  switch (action.type) {
    case "ADD_PROJECT":
      return [...state, action.payload];
    case "REMOVE_PROJECT":
      return state.filter((project) => project !== action.payload);
    default:
      return state;
  }
};
```

Create `rootReducer.js` which combines both reducers:

```javascript
import userReducer from "./userReducer";
import projectReducer from "./projectReducer";

function combineReducers(reducers) {
  return (state = {}, action) => {
    const newState = {};
    for (let key in reducers) {
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

export default combineReducers({
  users: userReducer,
  projects: projectReducer,
});
```

You can control the names of the state keys by using different keys for the reducers in the passed object, as we did.

In the root reducer above, the state shape is `{ users, projects }`. 

Next, in our Store, we need to pass a **root reducer** to the **useReducer** hook:

```javascript
import React, { createContext, useReducer } from "react";

import rootReducer from "./rootReducer";

const initialState = {
  users: [],
  projects: [],
};

export const Context = createContext(initialState);

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Store;
```

**Important note:** Make sure that the names of your properties in the **initialState** match the names of the state keys you specified in the **combineReducers** function, otherwise the state would not be updated.

And you can use **ADD_USER**, **REMOVE_USER**, **ADD_PROJECT**, **REMOVE_PROJECT** in any of your components.

## Bonus Step: Performance Optimization

One thing worth mentioning is that when any of your components pulls the data from the global Context (**useContext(Context)**), it is re-rendered every time a change of state is made.

And this is actually a bad thing, because the component that is responsible for managing users should not be re-rendered when there is a change related to projects.

The code:

```jsx
import React, { useContext } from "react";

import { Context } from "./store";

// Manage users
const Users = () => {
  const [value, dispatch] = useContext(Context);
  
  console.log("Users re-render");

  return (
    <button onClick={() => dispatch({ type: "ADD_USER", payload: "John" })}>
      Add John User
    </button>
  );
};

// Manage projects
const Projects = () => {
  const [value, dispatch] = useContext(Context);

  console.log("Projects re-render");
  
  return (
    <button onClick={() => dispatch({ type: "ADD_PROJECT", payload: "Blog" })}>
      Add Blog Project
    </button>
  );
};

const App = () => {
  return (
    <>
      <Users />
      <Projects />
    </>
  );
};

export default App;
```

The above code in action:

![Unoptimized Context](/img/gif2.gif "Unoptimized Context")

Is there anything we can do about it?

We can use **React.memo** HOC and wrap our **Users** and **Projects** components in it.

Read more about **React.memo** [here](/boost-performance-with-react-memo/) and about possible solutions to prevent unnecessary re-renders [here](https://github.com/facebook/react/issues/15156).

## Summary

Redux is not a must-have library for all your projects, there are many alternatives that work better and are easier to set up in smaller projects.

Usually we are not even aware of these alternative options for state management.

Today we learned about another option, using the  **Context API** and the **useReducer** hook.