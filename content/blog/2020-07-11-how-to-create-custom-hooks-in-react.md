---
title: How to create and test custom hooks in React?
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

## Creating custom hook

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

## Testing custom hook

To test our custom hook `useFetch` we need some basic `jest` configuration.

If you are not sure how to configure it, check out [this article](/2020-06-09-the-best-tools-for-react-development/), section **Jest + enzyme**.

Having it configured, the next step is to install some React hook testing utilities:

`yarn add @testing-library/react-hooks -D`

That's it, we are ready to test our custom hook:

```typescript
import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';

import useFetch from './useFetch';

// 1
jest.mock('axios');

// 2
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetch hook tests', () => {
  it('should properly fetch data', async () => {
    const url = 'http://some-example.endpoint/users';

    const users = [{ id: 1, name: 'John' }];
  
    // 3
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({ status: 200, data: users })
    );

    // 4
    const { result, waitForNextUpdate } = renderHook(() => useFetch(url));
    expect(result.current).toEqual([]);

    await waitForNextUpdate();

    expect(result.current).toEqual(users);
  });
});

```

Let's review the test by dividing it to the steps:

1. Mock **axios** in order to not make a real call to the API in your test.
2. The type definition for **axios.get** doesn't include a **mockImplementation** property, so we have to type it correctly.

Mock the **axios.get** and return the necessary data.

1. Render **useFetch** hook by using **renderHook** function, which returns the **result** and **waitForNextUpdate**.

   The **current** value or the **result** will reflect whatever is returned from the **callback** passed to **renderHook** (in our case **result.current** equals to the retuned **data** variable from the state (**const \[data, setData] = ...**).

   The **waitForNextUpdate** returns a Promise that resolves the next time the hook renders, commonly when the state is updated as the result of an asynchronous update.

   Basically, the first time the hook renders, an empty array is being returned, as we did not manage to finish an API call yet.

   The second render happens after we got the result from an API and updated state with it.

## Useful custom hooks

In this chapter, I will share with you some custom hooks that I find very helpful.

#### Remote data fetching

Of course, the first one is probably the most popular one.

In this post, we build the very basic version of it, which could be extended with a lot of different features, like error handling, progress indicator, ability to use not only **axios**, but a different HTTP client.

For data fetching, I highly recommend you to take a look at the [`react-swr`](https://github.com/vercel/swr) library:

```javascript
import fetch from "unfetch";

const fetcher = url => fetch(url).then(r => r.json());

const { data } = useSWR("/api/data", fetcher)
```

#### Window resize event

Getting the current size of the browser window is a common need in a lot of applications.

Instead of repeating yourself by copying the following snippet of code:

```typescript
const handleResize = () => {
  // Your logic here
};

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

We can use [`use-react-observer`](https://www.npmjs.com/package/use-resize-observer) library and get the same result with almost one-liner:

```typescript
const { ref } = useResizeObserver({
  onResize: ({ width, height }) => {
    // Your logic here
  },
});
```

#### Debouncing events

Debouncing events is a very powerful optimization technique.

``[`use-debounce`](https://www.npmjs.com/package/use-debounce) package provides us with an awesome hook we can use to any value that could be fast-changing.

In case if you need a simple implementation, you can use this:

```typescript
import { useState, useEffect } from 'react';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
```

## Summary