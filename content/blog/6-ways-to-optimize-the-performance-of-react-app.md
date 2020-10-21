---
title: 6 Ways to Optimize the Performance of React App
tag:
  - React
metaDescription: // META
teaser: // TEASERR
date: 2020-10-22T16:34:44.913Z
---
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
import React, { useState, useEffect } from 'react';

const USERS = ['John', 'Andrew', 'Mary', 'Justin', 'Brian', 'Jeremy'];

const PROJECTS = ['Ninja', 'Apple', 'Pineapple', 'Code', 'Secret', 'Meme'];

const App = () => {
  const [userQuery, setUserQuery] = useState('');
  const [projectQuery, setProjectQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchUsers(userQuery);
  }, [userQuery]);

  useEffect(() => {
    fetchProjects(projectQuery);
  }, [projectQuery]);

  const handleUserChange = (e) => {
    setUserQuery(e.target.value);
  };

  const handleProjectChange = (e) => {
    setProjectQuery(e.target.value);
  };

  const fetchUsers = (query) => {
    setUsers(
      USERS.filter(
        (user) => user.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  const fetchProjects = (query) => {
    setProjects(
      PROJECTS.filter(
        (project) => project.toLowerCase().indexOf(query.toLowerCase()) > -1
      )
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '30px' }}>
        Find users:
        <input value={userQuery} onChange={handleUserChange} />
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </div>
      <div>
        Find projects:
        <input value={projectQuery} onChange={handleProjectChange} />
        {projects.map((project) => {
          return <li key={project}>{project}</li>;
        })}
      </div>
    </div>
  );
};

export default App;
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
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    fetchUsers(userQuery);
  }, [userQuery]);

  const handleUserChange = (e: any) => {
    setUserQuery(e.target.value);
  };

  const fetchUsers = (query: string) => {
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

// This component is responsible only for filtering projects
const Projects = () => {
  const [projectQuery, setProjectQuery] = useState('');
  const [projects, setProjects] = useState<string[]>([]);

  useEffect(() => {
    fetchProjects(projectQuery);
  }, [projectQuery]);

  const handleProjectChange = (e: any) => {
    setProjectQuery(e.target.value);
  };

  const fetchProjects = (query: string) => {
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

## Use Memoization

**Memoization** is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

#### useMemo hook

React provides this hook, which implements the Memiozation concept for us:

```javascript
const result = useMemo(() => expensiveOperation(a, b), [a, b]);
```

As you have seen, the hook expects a function and an array of dependencies to be provided.

If any of these dependencies changes, the memoized **result** is recomputed.

To learn more about **useMemo**, read [this article](usememo-in-react/).

## Use Code Splitting

## Use Debouncing

## Define Functions Outside of Components

## Do Not Mount Unnecessarily

## Paginate Your Data