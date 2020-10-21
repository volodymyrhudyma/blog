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

![Components and Profiler Tab](/img/screenshot-2020-10-21-at-21.56.35.png "Components and Profiler Tab")

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

![App Component Screenshot](/img/screenshot-2020-10-21-at-22.01.38.png "App Component Screenshot")

The code is straightforward, I have been facing it pretty often. Actually, there is nothing wrong here.

But... can you guess how it can be optimized?

Open Chrome DevTools, select **Components** tab, click on the **settings icon** on the right and turn "**Highlight updates when components render**" mode on:

![Highlight updates when components render mode on](/img/oct-21-2020-22-07-32.gif "Highlight updates when components render mode on")

Then get back to the application and try to enter something in the input to filter users:

## Use Memoization

## Use Code Splitting

## Use Debouncing

## Define Functions Outside of Components

## Do Not Mount Unnecessarily

## Paginate Your Data