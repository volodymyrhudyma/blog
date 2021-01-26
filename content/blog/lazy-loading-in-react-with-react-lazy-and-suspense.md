---
title: Lazy Loading In React With React.Lazy And Suspense
tag:
  - React
promote: false
metaDescription: Learn how to use React.lazy and Suspense for code splitting in
  React. Split your code into small chunks and load them on-demand.
teaser: The complexity of existing web applications grows in geometric
  progression each year. The JavaScript more code we write, the more time it
  takes for our browser to download and execute it. While this might a critical
  problem in the era of super fast internet, but we cannot assume that...
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

The application is extremely simple and works the following way:

![App Example](/img/app-example.gif "App Example")

Nothing is wrong with it, but let's open the developer tools on the Network tab and see what is being loaded when the users opens an application:

![App Loading](/img/screenshot-2021-01-26-at-20.35.04.png "App Loading")

We can see only one chunk **0.chunk.js** that contains the whole code and weights 443kB (not that we are not using the production build).

But there is absolutely no need to render **User** component and use some resources for it, since it is not visible until the button is clicked, which may never happen.

Let's optimize the above code using the tools React provides us with: **React.lazy** and **Suspense**:

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

Note, that now we load **Users** component on-demand, just after the button is clicked.

After doing this change, observe the way application is working now:

![Optimized App](/img/optimized-app.gif "Optimized App")

Next, open the developer Network tab in developer tools and see what files are loaded:

![Optimized App Loading](/img/screenshot-2021-01-26-at-22.35.23.png "Optimized App Loading")

Seems like we load the same files, but notice how the size of the **0.chunk.js** file reduced from 443kB to 409kB.

Do not close the developer tools and click on the button and observe how two more chunks are loaded on-demand:

![New Chunks Loaded](/img/screenshot-2021-01-26-at-22.39.54.png "New Chunks Loaded")

The first one contains **moment** library, the second one our **Users** component.

By organizing the code this way we do not force users to download everything which they may even not use.

Sometimes it may not be obvious, where to use lazy loading, but a good starting point are routes:

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

The feature is awesome, however there are some limitations we should remember about.

#### 1. React.lazy currently only supports default exports.

If you have a file with multiple named exports, you can create an intermediate module that reexports it as the default.

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

#### 2. React.lazy and Suspense are not available for Server-Side Rendering

If you want to do code-splitting in a server rendered app, the React team recommends [Loadable Components](https://github.com/gregberge/loadable-components). 

It has a nice [guide for bundle splitting with server-side rendering](https://loadable-components.com/docs/server-side-rendering/).

## Error Handling

It has already been mentioned that **Suspense** component is used to show some fallback UI while components are loading.

But what if one of those components throws an error?

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

**Important note:** There is no hook equivalent of **componentDidCatch**, but React team is planning to add it soon.

And wrap **Suspense** in the **ErrorBoundary** component:

```jsx
<ErrorBoundary>
  <Suspense fallback={<div>Loading...</div>}>
    <Users />
  </Suspense>
</ErrorBoundary>
```

## Summary