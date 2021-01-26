---
title: Lazy Loading In React With React.Lazy And Suspense
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-27T19:58:25.552Z
---
The complexity of existing web applications grows in geometric progression each year. 

The JavaScript more code we write, the more time it takes for our browser to download and execute it.

While this might a critical problem in the era of super fast internet, but we cannot assume that all our customers have it, as well as super fast devices to open our application from.

It is always a good idea to optimize the application as much as it is possible, so it consumes the lesser possible amount of resources.

That's exactly the moment where **Lazy Loading** comes into play.

## Lazy Loading

> **Lazy loading** (also known as asynchronous **loading**) is a design pattern commonly used in computer programming and mostly in web design and development to defer initialization of an object until the point at which it is needed. It can contribute to efficiency in the program's operation if properly and appropriately used.

Basically, it means that it is not necessary to load everything, especially the components that are not currently visible on the screen. They can be included on-demand.

In React, Lazy Loading can be achieved by using `React.lazy` function, which takes a function as an argument that must call a dynamic `import()`. 

This must return a `Promise` which resolves to a module with a `default` export containing a React component:

```javascript
// Before
import Example from "./Example";

// After
const Example = React.lazy(() => import("./Example"));

// Load the "Example" component after 1s 
const Example = React.lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./Example"));
    }, 1000);
  });
});
```

And a `Suspense` component, which allows us to show a fallback content (you can pass any React component to the `fallback` property) while we’re waiting for the lazy component to load.

You should place **Suspense** component anywhere above the lazy loaded component.

It is also possible to wrap any number of lazy loaded components into one **Suspense** that would wait for all components to be loaded:

```jsx
const Example = React.lazy(() => import("./Example"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Example />
  </Suspense>
);
```

The above code will automatically load the bundle containing the **Example** component when this component is first rendered.

If the component is never rendered - it would never be loaded.

## A Simple Example

The best way to understand the concept is to see it in action.

Create **App** component that renders a button, clicking on which loads **Users** component containing some heavy logic:

```jsx
import React, { useState } from "react";

import Users from "./Users";

const App = () => {
  const [showUsers, setShowUsers] = useState(false);

  const handleShowUsers = () => {
    setShowUsers(true);
  };

  return (
    <>
      <button onClick={handleShowUsers}>
        Reveal users
      </button>
      {showUsers && <Users />}
    </>
  );
};

export default App;
```

The **Users** component:

```javascript
import React from "react";
import moment from "moment";

const users = [];

// Some logic to make the component heavier
for (let i = 0; i < 10000; i++) {
  users.push(moment());
}

const Users = () => users.map((user) => <div>{user.toString()}</div>);

export default Users;
```