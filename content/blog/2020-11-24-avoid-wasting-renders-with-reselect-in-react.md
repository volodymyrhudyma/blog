---
title: Avoid Wasting Renders with Reselect in React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2020-11-26T19:16:13.893Z
---
React and Redux are great tools that can be used together to build web or mobile applications of different size and complexity.

Even though React is extremely fast out-of-the-box, when the application is growing, it is hard to keep it as performant as the small one.

Larger applications, typically, are not well optimized to minimize the impact of rendering cycles on the performance, so in some places they tend to be slower than expected.

Rendering cycles always come with a cost, so it is best to have as small number of re-renders as it is possible (without giving up on readability and maintainability, of course).

In this article you will see how we can optimize the React application almost with no effort.

## Build and Configure an App

For better understanding of the whole concept, let's build a simple React app and connect in to Redux.

**App.tsx** - contains heading and renders **User** component:

```tsx
import React from "react";

import User from "./User";

const App = () => (
  <div style={{ padding: "20px 50px" }} className="App">
    <h3>Hello, world!</h3>
    <User />
  </div>
);

export default App;
```

**User.tsx** - contains the main logic of an application: renders **input** with value stored in Redux store and updated by dispatching an action:

```tsx
import React, { ChangeEvent, FC } from "react";
import { useDispatch, connect } from "react-redux";

import { addQuery } from "./store/app/actions";
import { getUser, getQuery } from "./store/app/selectors";
import { User as UserType } from "./store/app/types";
import { AppState } from "./store/rootReducer";

interface StateProps {
  query: string;
  user?: UserType & { note: string };
}

const User: FC<StateProps> = ({ query }) => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(addQuery(e.target.value));
  };

  return <input value={query} onChange={handleChange} />;
};

const mapStateToProps = (state: AppState): StateProps => {
  return {
    query: getQuery(state),
    user: getUser(state),
  };
};

export default connect(mapStateToProps)(User);
```

Note, that this component contains **user** prop which is not actually used, but is needed for explanation purposes.

**selectors.ts** - contains selectors that pull data from the Redux store. Each selector prints a log to the console when invoked:

```typescript
import { AppState } from "../rootReducer";

export const getUser = (state: AppState) => {
  console.log("getUser selector");
  const { user } = state.app.data;
  return (
    user && {
      ...user,
      note: `${user?.name};${user?.age}`,
    }
  );
};

export const getQuery = (state: AppState) => {
  console.log("getQuery selector");
  return state.app.data.query;
};
```

**Important note:** We would not include all the remaining files, as it would make an article way less readable. If you do not know how to set up React + Redux application with TypeScript, refer to [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/).

In the end, you should see the following:

![React Application](/img/screenshot-2020-11-26-at-22.37.46.png "React Application")

## Observe Wasted Renders

An application is up and running, so far so good. Let's try to enter something into the input and check the console:

![No Reselect Logs](/img/ezgif.com-gif-maker-1-.gif "No Reselect Logs")

You might have noticed that when we open the application, two following logs appear - **"getQuery selector"** and **"getUser selector"**. 

Seeing them means that the code reached the selectors, pulled **user** and **query** variables out of the store and put them into the component.

Nothing special is happening here, until we start entering something into the input field.

After entering a character, we dispatch an action which changes **query** value in the store and the component is updated by **mapStateToProps** function, which is executed every time the Redux store state changes.

This function triggers selectors, which are executed with entering every character.

But we are changing only **query**, right? So, why does **getUser** selector is being executed? Can't the code be optimized to execute it only if needed?

Imagine this selector containing a piece of heavy logic. It would slow down the application for no reason at all!

That's exactly the moment when `reselect` comes into play.

## What is a Reselect?

## Observe Saved Renders

## Summary