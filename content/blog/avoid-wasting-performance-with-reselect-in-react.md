---
title: Avoid Wasting Performance With Reselect In React
tag:
  - React
promote: false
metaDescription: Learn how to use the Reselect library with React and Redux,
  which provides the "createSelector" function for creating memoized selectors.
  Memoized selectors are only recalculated if their arguments change.
teaser: React and Redux are great tools that can be used together to build web
  or mobile applications of varying size and complexity. Even though React is
  extremely fast "out-of-the-box", as the application grows, it is difficult to
  keep it...
date: 2020-11-27T19:16:13.893Z
---
React and Redux are great tools that can be used together to build web or mobile applications of varying size and complexity.

Even though React is extremely fast "out-of-the-box", as the application grows, it is difficult to keep it as performant as the small one.

Larger applications are usually not well optimized to minimize the impact of rendering cycles on performance, so they tend to be slower than expected in some places.

Rendering cycles are  always costly, so it is best to have the smallest possible number of re-renders and to execute as few functions as possible on each re-render (without sacrificing readability and maintainability, of course).

In this article you will see how we can optimize the React application with almost no effort.

## Build And Configure An App

I have read many articles explaining this simple concept with complicated examples, which may seem overwhelming for beginners, so for the sake of simplicity I have created not a typical real-world application.

It would display an input and allow the user to enter a text. Let's build it with React and Redux.

**App.tsx** - contains the heading and renders the **User** component:

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

**User.tsx** - contains the main logic of an application: renders **input** with a value stored in Redux store and updated by dispatching an action:

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

Note that this component contains **user** prop which is not actually used, but is needed for explanatory purposes.

**selectors.ts** - contains selectors that retrieve data from the Redux store. Each selector outputs a log to the console when called:

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

**Important note:** We would not include all remaining files here, as this would make an article much less readable. If you do not know how to set up a React + Redux application with TypeScript, please read [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/).

In the end you should see the following result:

![React Application](/img/screenshot-2020-11-26-at-22.37.46.png "React Application")

## Observe Wasted Function Calls

An application is up and running, so far so good. 

Let's try to type something into the input and check the console:

![No Reselect Logs](/img/ezgif.com-gif-maker-1-.gif "No Reselect Logs")

You may have noticed that when you open the application, two following logs appear - **"getQuery selector"** and **"getUser selector"**. 

Seeing them means that the code has reached the selectors, pulled the **user** and **query** variables from the store and inserted them into the component.

Nothing special happens here, until we start typing something into the input field.

After entering a character, we dispatch an action that changes the **query** value in the store and the component is updated by the **mapStateToProps** function, which is executed each time the Redux store state changes.

This function triggers selectors that are executed when each character is entered.

But we are just changing **query**, right? So why is the **getUser** selector executed? Cannot the code be optimized so that it is only executed when needed?

Imagine that this selector contains a piece of heavy logic. It would slow down the application for no reason!

This is exactly the moment when `reselect` comes into play.

## What Is A Reselect?

**Reselect** is a [selector library](https://github.com/reduxjs/reselect) for Redux which provides a `createSelector` function used to create memoized selectors.

A memoized selector is only recalculated if its arguments change.

Open **selectors.ts** file and update the selectors:

```typescript
import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const userSelector = (state: AppState) => state.app.data.user;
const querySelector = (state: AppState) => state.app.data.query;

export const getUser = createSelector(userSelector, (user) => {
  console.log("getUser selector");
  return (
    user && {
      ...user,
      note: `${user?.name};${user?.age}`,
    }
  );
});

export const getQuery = createSelector(querySelector, (query) => {
  console.log("getQuery selector");
  return query;
});
```

The `createSelector(...inputSelectors | [inputSelectors], resultFunc)` function takes one or more selectors as first argument, calculates their values and passes them as arguments to `resultFunc`.

It determines whether the returned value has changed between calls using the reference equality check (`===`).

## Observe Saved Function Calls

After making the change, open an app, enter the same text as before and notice that we only see **"getQuery selector"** printed on the console. 

We no longer execute the **getUser** selector anymore, because it is not needed (the **user** object in Redux store state has not changed):

![With Reselect Logs](/img/added-reselect.gif "With Reselect Logs")

## Summary

The performance of an application should be improved on as early stage, as it is possible to avoid issues in the future.

Using a **Reselect** library is a good way to do this by memoizing the selectors and recalculating them only if their arguments change.