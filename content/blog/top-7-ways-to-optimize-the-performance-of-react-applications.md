---
title: Top 7 Ways to Optimize the Performance of React Applications
tag:
  - React
metaDescription: "Learn Top 7 Ways to Optimize the Performance of React
  applications: Avoid Large Components, Memoize, Do Code Splitting, Debounce,
  Tree Shake, Avoid Unnecessary Remounting, Paginate."
teaser: The way web applications are created has changed since the creation of
  React. By operating on a virtual DOM instead of the real one, it makes
  updating UI extremely fast and manageable. It seems that all tools are set up
  from the beginning...
date: 2020-10-24T16:34:44.913Z
---
The way web applications are created has changed since the creation of React. 

By operating on a virtual DOM instead of the real one, it makes updating UI extremely fast and manageable. 

It seems that all tools are set up from the beginning, so how is it possible that React apps still have poor performance and delays? 

Actually, the way people use the library is no less important. 

In this article we will learn about 7 approaches to make the React application faster.

## Avoid Large Components

The first and one of the most important rules is: "Keep your components as small as possible".

Each component should be responsible for the smallest possible number of actions, ideally only one, such as fetching data or displaying it.

The mixing of responsibilities leads to decreasing performance, especially if many heavy calculations are made on each re-render.

#### Prerequisites

Before you continue, please install the extension [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) for Chrome. It allows you to inspect the React component hierarchies in Chrome Developer Tools.

After installation, open Chrome DevTools and check whether the following tabs have appeared:

![Components and Profiler Tab](/img/ezgif.com-gif-maker.gif "Components and Profiler Tab")

Look at the following example (even though it looks like a lot of code, it is simple and easy-to-understand, do not be afraid):

```jsx
import React, { useState, useEffect } from "react"

const USERS = ["John", "Andrew", "Mary", "Justin", "Brian", "Jeremy"]

const PROJECTS = ["Ninja", "Apple", "Pineapple", "Code", "Secret", "Meme"]

const App = () => {
  const [userQuery, setUserQuery] = useState("")
  const [projectQuery, setProjectQuery] = useState("")
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchUsers(userQuery)
  }, [userQuery])

  useEffect(() => {
    fetchProjects(projectQuery)
  }, [projectQuery])

  const handleUserChange = e => {
    setUserQuery(e.target.value)
  }

  const handleProjectChange = e => {
    setProjectQuery(e.target.value)
  }

  const fetchUsers = query => {
    setUsers(
      USERS.filter(user => user.toLowerCase().indexOf(query.toLowerCase()) > -1)
    )
  }

  const fetchProjects = query => {
    setProjects(
      PROJECTS.filter(
        project => project.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    )
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: "30px" }}>
        Find users:
        <input value={userQuery} onChange={handleUserChange} />
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
      </div>
      <div>
        Find projects:
        <input value={projectQuery} onChange={handleProjectChange} />
        {projects.map(project => {
          return <li key={project}>{project}</li>
        })}
      </div>
    </div>
  )
}

export default App
```

We have one large component called **App** that contains two inputs with two lists that can be filtered based on the text you enter:

![App Component Screenshot](/img/screenshot-2020-10-21-at-22.09.38.png "App Component Screenshot")

The code is straightforward, I have been faced it many times. Actually, there is nothing wrong here.

But... can you guess how it could be optimized?

Open Chrome DevTools, select the **Components** tab, click the **settings icon** on the right side and turn "**Highlight updates when components render**" mode on:

![Highlight updates when highlight mode is on](/img/oct-21-2020-22-07-32.gif "Highlight updates when highlight mode is on")

Leave the DevTools open, go back to the application and try to enter something into the input to filter users:

![React component updates highlighted](/img/ezgif.com-gif-maker-1-.gif "React component updates highlighted")

Do you see that the yellow border began to appear?

The React Developer Tools highlights components that are being re-rendered. Different colors are used depending on the frequency of updates.

Blue means rare updates, turning to green, yellow and red, which means that the components are updated frequently.

Seeing red is not necessarily a bad thing, but when you perform a simple action, such as typing text into the input and seeing red, it means something is wrong and some tweaking is needed.

Getting back to our example, we may notice a yellow border, which is fine, but... it wraps around the App component, which means that the entire component is re-rendered when we filter users.

I consider an update of the project list to be completely unnecessary.

Imagine having thousands of items in the project list instead of six. How long would it take to re-render them if you type a single letter?

The better approach is to split a large **App** component into two: **Users** and **Projects**, each responsible for only one thing:

```jsx
// This component is responsible only for filtering users
const Users = () => {
  const [userQuery, setUserQuery] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers(userQuery);
  }, [userQuery]);

  const handleUserChange = (e) => {
    setUserQuery(e.target.value);
  };

  const fetchUsers = (query) => {
    setUsers(
      USERS.filter(
        (user) => user.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  return (
    <div style={{ marginRight: '30px' }}>
      Find users:
      <input value={userQuery} onChange={handleUserChange} />
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </div>
  );
};
```

```jsx
// This component is responsible only for filtering projects
const Projects = () => {
  const [projectQuery, setProjectQuery] = useState('');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects(projectQuery);
  }, [projectQuery]);

  const handleProjectChange = (e) => {
    setProjectQuery(e.target.value);
  };

  const fetchProjects = (query) => {
    setProjects(
      PROJECTS.filter(
        (project) => project.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  return (
    <div>
      Find projects:
      <input value={projectQuery} onChange={handleProjectChange} />
      {projects.map((project) => {
        return <li key={project}>{project}</li>;
      })}
    </div>
  );
};
```

```jsx
// Render both components inside of the App
const App = () => (
  <div style={{ display: 'flex' }}>
    <Users />
    <Projects />
  </div>
);
```

After this update, filtering of users is done in a separate component, which has absolutely no impact on the projects:

![Filtering users does not have any impact on projects](/img/ezgif.com-gif-maker-2-.gif "Filtering users does not have any impact on projects")

Take this into account when designing your components, as it can have a huge positive impact on the performance of your application.

## Memoize

**Memoization** is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

#### useMemo hook

React provides this hook that implements the Memoization concept for us:

```javascript
const result = useMemo(() => expensiveOperation(a, b), [a, b])
```

As you have seen, the hook expects a function and a set of dependencies to be provided.

If one of these dependencies changes, the memoized **result** is recalculated.

To learn more about **useMemo**, read [this article](/usememo-in-react/).

#### React.memo HOC

If the component gives the same result when the same props are passed, it can be packaged in **React.memo** to improve performance.

This function remembers the result of the rendering and if the props are not changed between renderings, the memoized result is returned, skipping the entire rendering process.

```jsx
const User = ({ name, surname }) => (
  <>
    <div>Name: {name}</div>
    <div>Surname: {surname}</div>
  </>
)

export default React.memo(User)
```

## Split Large Bundles

**Code splitting** is the splitting of code into different bundles which can then be loaded on-demand or in parallel.

Let us first understand what a bundle is and why it is needed.

When you build the application, you create a lot of separate files (modules) that are responsible for various things, such as retrieving the data from the API, transforming it, etc.

Then the module bundler tool, like **Webpack** packs all modules into one file (or several) and makes it available to the browser. This file is called **bundle**.

If your application is large, loading a big bundle is not so great, especially for users with a slow Internet connection.

To avoid having one large bundle, you can start splitting it into small files that can be loaded as needed.

This process is called Code Splitting and is also handled by module bundlers.

In React this can be achieved by using Lazy Loading the components.

**Lazy loading** is a design pattern that is used to delay the initialization of an object until it is needed. It can contribute to the performance of your application.

To lazy load React components, **React.lazy** is used. It allows you to render a dynamic import as if it was a regular component:

```javascript
// Before
import Example from './Example';

// After
const Example = React.lazy(() => import('./Example'));
```

This loads the bundle containing the **App** component when it first renders.

The component that loads lazily should be rendered inside the **Suspense** component, which allows us to display fallback content, such as loading indicator or text when we wait for the lazy loading to finish:

```jsx
const Example = React.lazy(() => import('./Example'));

const App = () => (
  <Suspense fallback={<Loader />}>
    <Example />
  </Suspense>
);
```

A good starting point are the routes:

```jsx
const Home = React.lazy(() => import('./routes/Home'));
const Blog = React.lazy(() => import('./routes/Blog'));

const App = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/blog" component={Blog}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Debounce

**Debouncing** is a programming technique used to ensure that complex and time-consuming tasks are not executed too often.

The Debounce function is a higher-order function that limits the execution rate of the callback function.

An application may contain some time-consuming operations which, if called frequently, have a negative impact on performance.

Consider the following example: A list of entries must be filtered based on the user's input. To get the list of filtered entries, an API request must be sent with the provided query.

The usual way of implementation it is to send a request each time the user enters a letter.

However, this will result in reduced performance because no requests need to be sent until the user stops typing.

A debounce function can be used here to send one request only after the user has **stopped typing for a certain amount of time**:

```jsx
// ...
import debounce from "lodash/debounce";

const App = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    // ...
    handleSearch(e.target.value);
  };

  const handleSearch = useCallback(
    debounce((value) => {
      // Send a request
    }, 500),
    []
  );

  return <input value={value} onChange={handleChange} />;
};
```

Further information on debouncing can be found in [this article](/debounce-in-react/).

## Tree Shake

**Tree shaking** is a term used to describe the removal of the dead code. It helps to reduce the bundle size by deleting the unused code.

> CommonJS does not support tree shaking. Try not to use it if possible.

```javascript
// Loads all library
const lodash = require("lodash");

// Loads all library
import _ from "lodash";

// Can be configured to use tree shaking
import { debounce } from "lodash";

// Loads only the "debounce" function
import debounce from "lodash/debounce";
```

As you may have noticed, importing everything from a library is never tree-shaken and will result in increase in bundle size, but importing only certain functions can be configured to use tree-shaking in production build.

Further information can be found in [this article](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking).

## Avoid Unnecessary Remounting

Consider the following example:

```jsx
// Render components in "<div>"
<div>
  <View1 />
  <View2 />
</div>

// Change parent element to "<span>"
<div>
  <View1 />
  <View2 />
</div>
```

What happens when the parent element changes from the **div** to **span**?

Internal components **View1** and **View2** will be unmounted and mounted again.

If the root elements have different types, the old tree is torn down and a new one is built from scratch, that is how Reconciliation works in React.

Remember this and try not to change the parent elements if this is not necessary.

## Paginate

Rendering a large amount of data at once puts too much load on your application and makes it slow.

If a lot of entries must be rendered on the screen, it is best to render it in parts.

More data can then be loaded as you scroll (infinite scroll) or click on the link to the page (standard pagination).

Remember that you do not have to build a pagination by yourself, there are many great libraries that can be installed configured within few minutes, like [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component) or [react-paginate](https://www.npmjs.com/package/react-paginate).

## Summary

In this article, we have explored some of the simplest and most effective ways to optimize the performance of React applications.

To make the app as fast as possible, the focus should be on the performance since the beginning of the project, an appropriate architecture and tools should be chosen.

Quick recap:

* Do not create large components, split them into smaller ones
* Use memoization (**useMemo** hook, **React.memo** HOC)
* Split large bundle into smaller files to load them faster and on-demand
* Debounce as much as possible
* Use of tree shaking
* Learn the Reconciliation process to avoid remounting of the components accidentally
* Paginate large data sets