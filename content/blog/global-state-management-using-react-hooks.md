---
title: Global State Management Using React Hooks
tag:
  - React
promote: false
metaDescription: // META
teaser: When thinking about the state management in React, the first thing that
  comes to mind is Redux and there is nothing wrong with it if you accept a lot
  of boilerplate code and complex library configuration. It may be completely
  unnecessary if your project is...
date: 2021-01-23T20:56:53.078Z
---
When thinking about the best way of state management in React, the first thing that comes to mind is Redux and there is nothing wrong with it if you accept a lot of boilerplate code and fairly complex library configuration.

It may be completely unnecessary if your project is of a small size.

Today we will create our **"own Redux"** by using tools React provides us with out-of-the-box: **useReducer** hook and **Context API.**

## Step 1: Create Store

Everything begins with a store that holds the entire state of the application.

Create a file named `store.js` and populate it with the following code:

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

Firstly, we set the initial state of the application in the **initialState** variable.

Secondly, we create a Context object that is going to be used to retrieve the **initialState** in a component.

Thirdly, we create a Store component that uses **useReducer** for updating the state in a convenient way (read more about this hook [here](/usereducer-hook-in-react/)).

Finally, we return a `Context.Provider` that passes the **value** down to consuming components and export the component from the store (read more about Context API in React [here](/context-api-in-react/)).

## Step 2: Create Reducer

In the previous step, a Reducer function has been imported to the Store. 

> **Reducers** are functions that take the current **state** and an **action** as arguments, and return a new `state` result. In other words, `(state, action) => newState`.

Create a file named `reducer.js` with the following content:

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

The Reducer handles four actions - **INCREMENT_COUNT**, **DECREMENT_COUNT**, **SET_COUNT** and **RESET_COUNT** which add a value to the **count** variable, subtract, reset or set it respectively.

The **state** object is the current state of the application, the **action** - is a dispatched action.

> **Actions** are plain JavaScript objects that have a **type** field. As mentioned earlier, **you can think of an action as an event that describes something that happened in the application**.

The **action** contains **type** property which determines what is the type of dispatched action and an optional **payload** which is a new data that describes what is happening in application.

If we dispatched an action that is not listed in the reducer, it would be handled in the **default** section (we will simply ignore it by returning the current state).

## Step 3: Wrap The Application In "Store" Component

Finally, we need our components to be aware of the store and expose the global state to all of them.

Open your `index.js` file and wrap your main component (typically **App**) in **Store**:

```jsx
ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);
```

Now it is a perfect time to test our changes.

## Step 4: Create UI And Dispatch Actions

Modify the **App** component to render counter on the screen, a few buttons that will trigger actions and one input that will allow to set a specific value for the counter:

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
```

With some applied styles (which are skipped here for simplicity sake) an app should look the following way:

![Rendered UI](/img/screenshot-2021-01-23-at-10.07.06.png "Rendered UI")

Now, let's make dummy buttons to do something useful.

The first thing we need to do is to access the **initialState** to retrieve the **count** property and display it on the screen.

To do this, import **useContext** from React and **Context** from the **store.js** in **App** component:

```javascript
import React, {useContext} from "react";

import { Context } from "./store";
```

And retrieve the context:

```javascript
const App = () => {
  const [state, dispatch] = useContext(Context);
  
  // ...
}
```

Now we have our **initialState** accessible under the **state** variable and we can easily access **state.count**.

The **dispatch** function allows us to dispatch an action (remember we have defined four, right?):

```javascript
dispatch({ type: "INCREMENT_COUNT" });

dispatch({ type: "DECREMENT_COUNT" });

dispatch({ type: "RESET_COUNT" });

dispatch({ type: "SET_COUNT", payload: 10 });
```

Merge everything together, so the complete code of the **App** component is the following:

```javascript
import React, { useContext, useState } from "react";

import { Context } from "./store";

const App = () => {
  const [value, setValue] = useState("");
  const [state, dispatch] = useContext(Context);

  return (
    <>
      <div>Count: 0</div>
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
```

And see it in action:

![App In Action](/img/gif.gif "App In Action")

## Bonus Step: Use Multiple Reducers

Congratulations on building your first global state management systems using React hooks.

Our example application is extremely small and everything it does is just updating the **count** value.

That's why we created only one reducer that handles only four types of actions.

But what if the app is slightly bigger and the number of actions grows to 10-20-30?

Handling them in one reducer leads to a lot of code gathered in one place, which is not the best solution in terms of maintenance.

So it is always a good idea to keep your reducers as small as possible.

If you worked with Redux, you should know that you can create multiple reducers and combine them all into one, usually called **root reducer** by using the **[combineReducers](https://redux.js.org/api/combinereducers)** function provided by the library.

Let's try to build our own implementation of it.

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

You can control state key names by using different keys for the reducers in the passed object, like we did.

In the root reducer above, the state shape is `{ users, projects }`. 

Next, inside our Store a **root reducer** has to be passed to the **useReducer** hook:

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

**Important note:** Make sure the names of your properties in the **initialState** correspond to the state key names you provided in the **combineReducers** function, otherwise the state would not get updated.

And you are able to use **ADD_USER**, **REMOVE_USER**, **ADD_PROJECT**, **REMOVE_PROJECT** in any of your components.

## Bonus Step: Performance Optimization

One thing worth mentioning is that if any of your components pulls the data out of global Context (**useContext(Context)**), it would get re-rendered every time a change in the state is performed.

And that is actually a bad thing, because the component responsible for managing users should not be re-rendered, when there is a change related to projects.

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

We can use **React.memo** HOC and wrap our **Users** and **Projects** components into it.

Read more about **React.memo** [here](/boost-performance-with-react-memo/) and about possible solutions to prevent unnecessary re-renders [here](https://github.com/facebook/react/issues/15156).

## Summary

Redux is not a must-have library in all your projects, there are many existing alternatives that may perform better and are easier-to-set-up in a projects of a smaller-scale.

Usually we are not even aware of those alternative ways of managing the state.

Today we have learned yet another way by using **Context API** and **useReducer** hook.