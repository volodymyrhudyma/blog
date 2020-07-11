---
title: How to create custom hooks in React?
tag:
  - React
teaser: Hooks are functions that let you “hook into” React state and lifecycle
  features from function components. React provides a few built-in hooks, but
  sometimes you need to extend their functionality...
date: 2020-07-11T08:49:03.974Z
---
Hooks are functions that let you “hook into” React state and lifecycle features from function components. 

React provides a few built-in hooks, but sometimes you need to extend their functionality. 

That's when custom hooks come into play.

## Custom hooks

**The custom hook** is a simple JavaScript function, which allows us to compose built-in hooks in order to reuse some logic between **FUNCTIONAL** React components (yeah, they do not work with class components).

The name of the custom hook should start with **use** to follow the hooks naming convention (all hooks in React start with this word, right?).

## Creating a custom hook

**Important note:** before even thinking about creating a new custom hook, make sure to check if it is available somewhere on the internet. There's a high probability that you do not have to write them by yourself, but just to install an external library.

Imagine building `UserList` component, which fetches users from the API:

```tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IUser {
  id: number;
  name: string;
}

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const {
      data,
    } = await axios.get('http://some-example.endpoint/users');
    setUsers(data);
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default UserList;
```

Looks awesome, clean and short. 

But what if we have to create one more `ProjectList` component which contains exactly the same logic, but fetches projects, not users? 

That leads to the code duplication and violating the **DRY(Don't Repeat Yourself)** principle.

To avoid that, we will build `useFetch` custom hook (I highly recommend you to use library which provides you a ready-to-use solution, but just for the demo purposes, we build our own hook), which will allow us to replace `useState` and `useEffect` hook with just one line of code:

```typescript
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useFetch = <T>(url: string, config?: AxiosRequestConfig): T[] => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(url, config);
      setData(data);
    };
    fetchData();
  });
  return data;
};

export default useFetch;
```

And use it in the `UserList` component:

```tsx
const UserList = () => {
  const users = useFetch<IUser>('http://some-example.endpoint/users');

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

Building an application this way leads to less code duplication and more reusability of the business logic.

## Useful custom hooks

## Testing custom hook

## Summary