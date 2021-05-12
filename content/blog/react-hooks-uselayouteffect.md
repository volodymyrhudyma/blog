---
title: "React Hooks: useLayoutEffect"
tag:
  - React
promote: false
metaDescription: Learn how to use the useLayoutEffect hook in React with simple
  code examples and compare it to useEffect.
teaser: React provides us with a useLayoutEffect hook to improve our
  applications in some specific cases, however not everyone is aware of how to
  use it. It works pretty much the same as useEffect, however they are executed
  after different...
date: 2021-05-13T19:54:35.083Z
---
React provides us with a useLayoutEffect hook to improve our applications in some specific cases, however not everyone is aware of how to use it.

It works pretty much the same as useEffect, but they are executed after different stages in the rendering cycle of a component.

## The "useLayoutEffect" Hook

This hook is synchronous, meaning that React waits for all the logic within the hook to complete and execute immediately after the rendering phase, but before drawing the changes on the screen.

Consider the following example:

```jsx
const App = () => {
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, []);

  useEffect(() => {
    console.log("useEffetct");
  }, []);

  console.log("Render");

  return <div>Hello, world!</div>;
};
```

The output:

![Hooks Execution Sequence](/img/screenshot-2021-05-12-at-22.09.21.png "Hooks Execution Sequence")

The sequence is the following:

1. Enter the render phase.
2. Execute useLayoutEffect.
3. Draw the changes on the screen.
4. Execute useEffect.

The hook becomes very useful when you see flickering on an initial render, as in the following example:

```jsx
const App = () => {
  const [user, setUser] = useState("Unnamed");

  useEffect(() => {
    setUser("John");
  }, []);

  return <div>Hello, {user}!</div>;
};
```

The output:

![Flickering With useEffect](/img/flickering.gif "Flickering With useEffect")

The flickering is caused by setting a user name just after the changes have been printed.

To avoid this, refactor the above example with useLayoutEffect:

```jsx
const App = () => {
  const [user, setUser] = useState("Unnamed");

  useLayoutEffect(() => {
    setUser("John");
  }, []);

  return <div>Hello, {user}!</div>;
};
```

The output:

![No Flickering With useLayoutEffect](/img/no-flickering.gif "No Flickering With useLayoutEffect")

Note that we don't see flickering because se set the user name before outputting the changes to the screen. 

**Important Note:** Remember that useLayoutEffect is synchronous, so React will wait until all logic in this hook is executed to continue painting, which can cause performance issues. Therefore, 99% of the time you should be fine with useEffect. 

Consider the following example:

```jsx
const App = () => {
  const [user, setUser] = useState("Unnamed");

  useEffect(() => {
    for (let i = 0; i < 1000000000; i++) {
      if (i === 999999999) {
        setUser("John");
      }
    }
  }, []);

  return <div>Hello, {user}!</div>;
};
```

The output:

![Blocking Render](/img/blocking-render.gif "Blocking Render")

Text rendering is blocked until the time-consuming operation in useLayoutEffect is finished.

## Summary

The useLayoutEffect is executed synchronously before the changes are drawn to the screen. 

It's useful for preventing flickering on the first render, but can easily be overused, so be careful. 

In 99% of cases you should be fine with useEffect, so always try it first and see if it works well for you, as most effects don't need UI to wait until they are finished.