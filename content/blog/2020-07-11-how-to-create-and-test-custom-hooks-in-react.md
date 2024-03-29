---
title: How To Create And Test Custom Hooks In React?
tag:
  - React
popular: true
promote: false
metaDescription: Hooks are functions that allow you to “hook into” React state
  and lifecycle features of functional components. Learn how to create and test
  custom hooks in ReactJs.
teaser: Hooks are functions that allow you to “hook into” React state and
  lifecycle features of functional components. React has a few built-in hooks,
  but sometimes you need to extend their functionality...
date: 2020-07-11T08:49:03.974Z
---
Hooks are functions that allow you to “hook into” React state and lifecycle features of functional components. 

React has a few built-in hooks, but sometimes you need to extend their functionality. 

That is when custom hooks come into play.

## Custom Hooks

**The custom hook** is a simple JavaScript function that allows us to compose built-in hooks to reuse some logic between **FUNCTIONAL** React components (yes, they do not work with class components).

The name of the custom hook should start with **use** to follow the naming convention for hooks (all hooks in React start with this word, right?).

## Creating Custom Hook

**Important note:** before you even think about creating a new custom hook, you should check if it is available somewhere on the internet. There is a high probability that you will not have to write it by yourself, but just to install an external library.

Imagine building `UserList` component that fetches users from the API:

```tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

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
    } = await axios.get("https://some-example.endpoint/users");
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

But what if we have to create one more `ProjectList` component that contains exactly the same logic, but fetches projects, not users? 

This leads to the code duplication and violates the **DRY (Don't Repeat Yourself)** principle.

To avoid this, we will build a custom `useFetch` hook (I strongly recommend to use the library that provides you with a ready-to-use solution, but only for demo purposes, we will build our own hook) that allows us to replace the `useState` and `useEffect` hook with only one line of code:

```typescript
import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

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
import React from "react";

import useFetch from "./useFetch";

interface IUser {
  id: number;
  name: string;
}

const UserList = () => {
  const users = useFetch<IUser>("https://some-example.endpoint/users");

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

## Testing Custom Hook

To test our custom hook `useFetch` we need a basic `jest` configuration.

If you are not sure how to configure it, read [this article](/2020-06-09-the-best-tools-for-react-development/), **Jest + enzyme** section.

Once it is configured, the next step is to install some React hook testing utilities:

`yarn add @testing-library/react-hooks react-test-renderer -D`

That is it, we are ready to test our custom hook:

```typescript
import axios from "axios";
import { renderHook } from "@testing-library/react-hooks";

import useFetch from "./useFetch";

// 1
jest.mock("axios");

// 2
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useFetch hook tests", () => {
  it("should properly fetch data", async () => {
    const url = "https://some-example.endpoint/users";

    const users = [{ id: 1, name: "John" }];
  
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

Let's review the test by splitting it to the steps:

1. Mock **axios** in order to not make a real call to the API in your test.
2. The type definition for **axios.get** does not contain a **mockImplementation** property, so we have to type it correctly.
3. Mock the **axios.get** and return the necessary data.
4. Render the **useFetch** hook by using **renderHook** function, which returns the **result** and **waitForNextUpdate**.

   The **current** value or the **result** will reflect whatever is returned from the **callback** passed to **renderHook** (in our case **result.current** equals to the retuned **data** variable from the state (**const \[data, setData] = ...**).

   The **waitForNextUpdate** returns a Promise that resolves the next time the hook renders, commonly when the state is updated as the result of an asynchronous update.

   Basically, the first time the hook renders, an empty array is being returned, as we did not manage to finish an API call yet.

   The second render happens after we receive the result from an API and update the state with it.

## Useful Custom Hooks

In this chapter, I will introduce some custom hooks that I find very helpful.

#### Remote data fetching

Of course, the first one is probably the most popular one.

In this article, we built the basic version of it, which could be extended with a lot of different features, like error handling, progress indicator, the possibility to use not only **axios**, but also another HTTP client.

For data fetching, I highly recommend you to take a look at the [`react-swr`](https://github.com/vercel/swr) library:

```javascript
import fetch from "unfetch";

const fetcher = url => fetch(url).then(r => r.json());

const { data } = useSWR("/api/data", fetcher)
```

#### Window resize event

Determining the current size of the browser window is a common need in many applications.

Instead of repeating yourself by copying the following code snippet:

```typescript
const handleResize = () => {
  // Your logic here
};

useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

We can use the [`use-react-observer`](https://www.npmjs.com/package/use-resize-observer) library and get the same result with almost a one-liner:

```typescript
const { ref } = useResizeObserver({
  onResize: ({ width, height }) => {
    // Your logic here
  },
});
```

#### Debouncing events

Event debouncing is a very powerful optimization technique.

The [`use-debounce`](https://www.npmjs.com/package/use-debounce) package provides us with a fantastic hook that we can use for any value that could be fast-changing.

In case you need a simple implementation, you can use this code snippet:

```typescript
import { useState, useEffect } from "react";

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

Custom react hooks allow you to compose built-in hooks and create some reusable logic based on them.

They can extract the business logic from the functional components, making them pure and not responsible for the things, they do not have to be.

When building custom hooks, there is one important rule to follow - the name should always begin with **use**.

This is not required, which means that you can choose any name you like and the hook will still work, but it is always better to follow the naming convention.