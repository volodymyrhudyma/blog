---
title: Lazy Loading In React With React.Lazy And Suspense
tag:
  - React
promote: false
metaDescription: Learn how to use React.lazy and Suspense for code splitting in
  React. Split your code into small chunks and load them on-demand.
teaser: The complexity of existing web applications grows every year in
  geometric progression. The more JavaScript code we write, the more time it
  takes our browser to download and execute it. While this may not be a critical
  problem in the era of super-fast Internet, we cannot assume that all...
date: 2021-01-27T19:58:25.552Z
---
The complexity of existing web applications grows every year in geometric progression. 

The more JavaScript code we write, the more time it takes our browser to download and execute it.

While this may not be a critical problem in the era of super-fast Internet, we cannot assume that all of our customers have it, as well as super-fast devices.

It's always a good idea to optimize the application as much as possible so that it uses the least amount of resources possible.

That is exactly when **Lazy Loading** comes into play.

## Lazy Loading

> **Lazy loading** (also known as asynchronous **loading**) is a design pattern commonly used in computer programming and mostly in web design and development to defer initialization of an object until the point at which it is needed. It can contribute to efficiency in the program's operation if properly and appropriately used.

Basically, it means that not everything needs to be loaded, especially the components that are not currently on the screen. They can be included if needed.

In React, Lazy Loading can be achieved by using the `React.lazy` function, which takes a function as an argument that needs to call a dynamic `import()`. 

This must return a `Promise` that resolves to a module with a `default` export that contains a React component:

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

And a `Suspense` component that we can use to display a fallback content (you can pass any React component to the `fallback` property) while we wait for the "lazy" component to load.

You should place the **Suspense** component somewhere above the lazy loaded component.

It is also possible to wrap any number of lazy loaded components into one **Suspense** that waits for all components to load:

```jsx
const Example = React.lazy(() => import("./Example"));

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Example />
  </Suspense>
);
```

The above code automatically loads the bundle containing the **Example** component when that component is first rendered.

If the component is never rendered - it would never be loaded.

## A Simple Example

The best way to understand the concept is to see it in action.

Create an **App** component that displays a button that, when clicked, loads the **Users** component that contains some heavy logic:

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

The application is extremely simple and works as follows:

![App Example](/img/app-example.gif "App Example")

There is nothing wrong with this, but let's open the Developer Tools on the Network Tab and see what loads when the user opens an application:

![App Loading](/img/screenshot-2021-01-26-at-20.35.04.png "App Loading")

We can only see one chunk **0.chunk.js**, which contains all the code and weighs 443kB (not that we are not using the production build).

But there is absolutely no need to render the **User** component and use some resources for it, since it is not visible until the button is clicked, which may never happen.

Let's optimize the above code using the tools React provides us: **React.lazy** and **Suspense**:

## Using React.Lazy And Suspense

The **App** component:

```jsx
import React, { Suspense, useState } from "react";

const Users = React.lazy(() => import("./Users"));

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
      {showUsers && (
        <Suspense fallback={<div>Loading...</div>}>
          <Users />
        </Suspense>
      )}
    </>
  );
};

export default App;
```

Note that we now load the **Users** component on-demand, right after the button is clicked.

After making this change, observe how the application works now:

![Optimized App](/img/optimized-app.gif "Optimized App")

Next, open Network Tab in Developer Tools and see what files are loaded:

![Optimized App Loading](/img/screenshot-2021-01-26-at-22.35.23.png "Optimized App Loading")

It seems like we are loading the same files, but notice how the size of the **0.chunk.js** file has decreased from 443kB to 409kB.

Do not close Developer Tools, click the button and watch two more chunks load on-demand:

![New Chunks Loaded](/img/screenshot-2021-01-26-at-22.39.54.png "New Chunks Loaded")

The first contains the **moment** library, the second our **Users** component.

By organizing the code this way, we do not force users to download everything they might not even use.

Sometimes it may not be obvious where to use lazy loading, but a good starting point are routes:

```jsx
const Home = React.lazy(() => import("./routes/Home"));
const Blog = React.lazy(() => import("./routes/Blog"));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/blog" component={Blog}/>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
```

## React.lazy Limitations

The feature is great, however there are some limitations we should remember.

#### 1. React.lazy currently only supports default exports.

If you have a file with multiple named exports, you can create an intermediate modules that re-export them as defaults.

**Components.js:**

```javascript
export const Users = /* ... */;

export const Projects = /* ... */;
```

**Users.js**

```javascript
export { Users as default } from "./Components";
```

**App.js**

```javascript
const Users = React.lazy(() => import("./Users"));
```

#### 2. React.lazy and Suspense are not available for Server-Side Rendering.

If you want to performs code-splitting in a server rendered app, the React team recommends [Loadable Components](https://github.com/gregberge/loadable-components). 

There is a nice [guide for bundle splitting with server-side rendering](https://loadable-components.com/docs/server-side-rendering/).

## Error Handling

It was mentioned earlier that the **Suspense** component is used to display a fallback UI while loading components.

But what if one of these components throws an error?

We can create an [Error Boundary](https://reactjs.org/docs/error-boundaries.html) to provide the best user experience.

> Error boundaries are React components that **catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI** instead of the component tree that crashed.

```jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
```

**Important note:** There is no hook equivalent of **componentDidCatch**, but the React team plans to add it soon.

And wrap **Suspense** in the **ErrorBoundary** component:

```jsx
<ErrorBoundary>
  <Suspense fallback={<div>Loading...</div>}>
    <Users />
  </Suspense>
</ErrorBoundary>
```

## Summary

Proper use of lazy loading can significantly reduce the initial application loading time, as we can be sure that no unused code is loaded. 

React provides us with all the necessary tools (React.lazy and Suspense) to make code splitting as easy as possible.