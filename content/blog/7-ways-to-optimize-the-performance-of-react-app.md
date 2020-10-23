---
title: 7 Ways to Optimize the Performance of React App
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

The first and one of the most important rules is "Keep your components as small as possible".

Each component should be responsible for the smallest possible number of actions, ideally only one, like fetching the data or displaying it.

Mixing responsibilities leads to decreasing performance, especially when a lot of heavy calculations are performed on each re-render.

#### Prerequisites

Before proceeding, install [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension for Chrome. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.

After the installation, the following open Chrome DevTools and check if the following tabs appeared:

![Components and Profiler Tab](/img/ezgif.com-gif-maker.gif "Components and Profiler Tab")

Consider the following example (even though it seems like a lot of code, it is straightforward and easy-to-understand, do not be scared):

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

We have one big component called **App** which contains two inputs with two lists that can be fintered based on the text entered:

![App Component Screenshot](/img/screenshot-2020-10-21-at-22.09.38.png "App Component Screenshot")

The code is straightforward, I have been facing it pretty often. Actually, there is nothing wrong here.

But... can you guess how it can be optimized?

Open Chrome DevTools, select **Components** tab, click on the **settings icon** on the right and turn "**Highlight updates when components render**" mode on:

![Highlight updates when components render mode on](/img/oct-21-2020-22-07-32.gif "Highlight updates when components render mode on")

Keep the DevTools opened, go back to the application and try to enter something in the input to filter users:

![React component updates highlighted](/img/ezgif.com-gif-maker-1-.gif "React component updates highlighted")

Do you see that yellow border started to appear?

The React Developer Tools highlights components that are re-rendering. Depending of the frequency of updates, different colors are used.

Blue means infrequent updates, turning to green, yellow and red, which means that components update frequently.

Seeing a red is not necessarily a bad thing, but if you perform a simple action, like entering text into the input and see red means that something is wrong and some optimizations are needed.

Getting back to our example, we can notice yellow border, which is ok, but... it wraps the whole App component, which means that the whole component is re-rendered when we filter users.

I feel like updating the projects list is completely unnecessary.

Imagine having thousands of items in the projects list instead of six, how long would it take to re-render them when typing a single letter?

The better approach is to split large **App** component into two: **Users** and **Projects**, each one is responsible only for one thing:

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

After this update, filtering users is being done in a separate component, having absolutely no impact on projects:

![Filtering users does not have any impact on projects](/img/ezgif.com-gif-maker-2-.gif "Filtering users does not have any impact on projects")

Keep this in mind, when designing your components, as it can bring a huge advantage to the performance of your application.

## Memoize

**Memoization** is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

#### useMemo hook

React provides this hook, which implements the Memiozation concept for us:

```javascript
const result = useMemo(() => expensiveOperation(a, b), [a, b])
```

As you have seen, the hook expects a function and an array of dependencies to be provided.

If any of these dependencies changes, the memoized **result** is recomputed.

To learn more about **useMemo**, read [this article](/usememo-in-react/).

#### React.memo HOC

If the component returns the same result when the same props are passed, it can be wrapped into **React.memo** to gain a performance boost.

This function remembers the result of rendering and if the props are not changed between the renders, the memoized result is returned, skipping the whole rendering process.

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

**Code splitting** is the splitting of code into various bundles which can then be loaded on-demand or in parallel.

To begin with, let's understand what a bundle is and why is it needed?

When building the application, you create a lot of separate files (modules) responsible for different things, like fetching the data from the API, transforming it, etc.

Then the module bundler tool, like **Webpack** packages all the modules into one file (or more) and serves it to the browser. That file is called **bundle**.

If your application is big in size, loading a big bundle is not that great, especially for users with a slow internet connection.

To avoid having one large bundle, you can start splitting it into small ones that can be loaded on-demand.

This process is called Code Splitting and handled by module bundlers, as well.

In React, this can be achieved by Lazy Loading the components.

**Lazy loading** is a design pattern used to defer initialization of an object until it is needed. It can contribute to the performance of your application.

To lazy load React components, **React.lazy** is used. It lets you render a dynamic import as if it was a regular component:

```javascript
// Before
import Example from './Example';

// After
const Example = React.lazy(() => import('./Example'));
```

This will load the bundle which contains the **App** component when it first renders.

The component that is lazy loaded should be rendered inside of the **Suspense** component, which allows us to show fallback content, like loading indicator or text when we are waiting for the lazy load to complete:

```jsx
const Example = React.lazy(() => import('./Example'));

const App = () => (
  <Suspense fallback={<Loader />}>
    <Example />
  </Suspense>
);
```

A good place to start with is with routes:

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

An application might contain some time-consuming operations, which if are invoked frequently, have a negative impact on the performance.

Consider the following example: a list of entries has to be filtered based on the user's input. An API request containing the query has to be sent to get the list of filtered entries.

The common way of implementing it is to send a request each time user enters a letter.

But that leads to decreasing performance, as there is no need to send any requests until the user stops typing.

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

To read more about debouncing, refer to [this article](/debounce-in-react/).

## Tree Shake

**Tree shaking** is a term used to indicate the dead code elimination. It helps to reduce the bundle size by deleting the unused code.

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

As you may noticed, importing everything from a library never gets tree-shaken and leads to increasing the bundle size, but importing only specific functions can be configured to use tree shaking in production build.

To read more refer to [this article](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking).

## Avoid Unnecessary Remounting

Consider the following example:

```jsx
// Rendering components in "<div>"
<div>
  <View1 />
  <View2 />
</div>

// Changing parent element to "<span>"
<div>
  <View1 />
  <View2 />
</div>
```

What happens if the parent element changes from the **div** to **span**?

Internal components **View1** and **View2** will be unmounted and mounted again.

If the root elements have different types, the old tree will be torn down a new one will be built from scratch, that is how the Reconciliation works in React.

Keep it in mind and try not to modify parent elements if that is not required.

## Paginate

Rendering a large amount of data at once puts too much stress on your application and makes it slow.

If a lot of entries must be rendered on the screen, it is best to render it in portions.

Then more data can be loaded as you scroll (infinite scroll) or as you click on the link to the page (standard pagination).

Remember that you do not have to build a pagination by yourself, there are plenty of awesome libraries that can be installed configured within a few minutes, like [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component) or [react-paginate](https://www.npmjs.com/package/react-paginate).

## Summary

In this article, we have reviewed some of the easiest and most effective ways of optimizing the performance of React application.

In order to make the app as fast as possible, focus should be put on the performance since the very beginning of the project, choose appropriate architecture and tools.

Quick recap:

* Do not create large components, split them into smaller ones
* Use memoization (**useMemo** hook, **React.memo** HOC)
* Split large bundle into smaller chunks to load them faster and on-demand
* Debounce as much as possible
* Get use of tree shaking
* Learn the Reconciliation process in order to avoid remounting of the components accidentally
* Paginate large data sets