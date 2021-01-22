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
When thinking about the state management in React, the first thing that comes to mind is Redux and there is nothing wrong with it if you accept a lot of boilerplate code and complex library configuration.

It may be completely unnecessary if your project is of a small size.

Today we will create our "own Redux" by using tools React provides us with out-of-the-box: useReducer hook and Context API.

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

Firstly, we set the initial state of the application in the `initialState` variable.

Secondly, we create a Context object that is going to be used to retrieve the `initialState` in a component.

Thirdly, we create a Store component that uses `useReducer` for updating the state in a convenient way (read more about this hook [here](/usereducer-hook-in-react/)).

Finally, we return a `Context.Provider` that passes the `value` down to consuming components and export the component from the store (read more about Context API in React [here](/context-api-in-react/)).

## Step 2: Create Reducer

In the previous step, a Reducer function has been imported to the Store. 

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

The Reducer handles four actions - **INCREMENT_COUNT**, **DECREMENT_COUNT**, **SET_COUNT** and **RESET_COUNT** which add a value to the `count` variable, subtract, reset or set it respectively.

The `state` object is the current state of the application, the `action` - is an object that is passed when an action is dispatched.

The `action` contains `type` property which determines what is the type of dispatched action and an optional `payload` which is a new state.

If we dispatched an action that is not listed in the reducer, it will be handled in the `default` section (we will simply ignore it by returning the current state).

## Step 3: Wrap The Application In "Store" Component

Finally, we need our components to be aware of the store and expose the global state to all of them.

Open your `index.js` file and wrap your main component (typically **App**) in **Store**:

```javascript
ReactDOM.render(
  <Store>
    <App />
  </Store>,
  document.getElementById("root")
);
```

Congratulations, now it is a perfect time to test our changes.

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

![Rendered UI](/img/screenshot-2021-01-22-at-23.26.31.png "Rendered UI")

Now, let's make dummy buttons to do something useful.

The first thing we need to do is to access the **initialState** to retrieve the **count** property and display it on the screen.

To do this, import **useContext** from React and **Context** from the **store.js**:

```javascript
import React, {useContext} from "react";

import { Context } from "./store";
```

And retrieve the context in the component:

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

So, the complete code of the **App** component:

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

## Bonus Step: Use Multiple Reducers

## Summary