---
title: "React Hooks: useLayoutEffect"
tag:
  - React
promote: false
metaDescription: // META
teaser: React provides us with a useLayoutEffect hook that can be used to
  improve our applications in some specific cases, however not everyone is aware
  of how to use it. It works pretty much the same as useEffect, however they are
  executed after different...
date: 2021-05-13T19:54:35.083Z
---
React provides us with a useLayoutEffect hook that can be used to improve our applications in some specific cases, however not everyone is aware of how to use it.

It works pretty much the same as useEffect, however they are executed after different phases in the rendering cycle of a component.

## "useLayoutEffect" Hook

This hook is synchronous, which means that React will wait for all the logic within the hook to complete and executed right after the render phase, but before the changes are drawn into the screen.

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
3. Draw the changes to the screen.
4. Execute useEffect.

It is very useful when you see a flickering on an initial render, like in the following example:

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

Flickering is caused by setting a user name just after the changes are printed.

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

Notice that we don't see any flickering, since se set the user name before the changes are printed to the screen.

**Important note:** Remember that useLayoutEffect is synchronous, so React will wait until all logic in this hook gets executed to proceed with painting, which may cause performance issues. That's why In 99% of the cases you should be fine with just useEffect.

Consider the following example:

```jsx
const App = () => {
  const [user, setUser] = useState("Unnamed");

  useLayoutEffect(() => {
    let finished = false;
    for (let i = 0; i < 1000000000; i++) {
      finished = i === 999999999;
    }
    if (finished) {
      setUser("John");
    }
  }, []);

  return <div>Hello, {user}!</div>;
};
```

The output:

![Blocking Render](/img/blocking-render.gif "Blocking Render")

Text rendering is blocked until the time-consuming operation in useLayoutEffect finished.

## Summary