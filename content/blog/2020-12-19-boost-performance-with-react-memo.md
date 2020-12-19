---
title: Boost Performance With React.memo()
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2020-12-20T07:56:29.709Z
---
In React, changing the state of the parent component triggers a re-render of the whole component tree.

It often leads to the unnecessary rendering of the child components, which props have not actually changed.

Undoubtedly, it slows the application down, especially if child components contain a lot of expensive calculations.

To improve the performance, React offers **React.memo()** higher-order component.

## React.memo()

When a component is wrapped in the **React.memo()**, after being rendered, its result is memoized by React.

> **Memoization** is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Before the next render, if the props have not changed, React will re-use the result of the previous render, skipping the whole costly rendering process.

## Example

To understand the concept better, let's see it in action:

#### UserContainer component

```jsx
const UserContainer = () => {
  const [_toggle, setToggle] = useState(false);

  useEffect(() => {
    // Update the component every second
    const intervailId = setInterval(() => {
      setToggle((toggle) => !toggle);
    }, 1000);
    return () => {
      clearInterval(intervailId);
    };
  }, []);

  return <Projects date='2020-01-01' />;
};

export default UserContainer;
```

#### Projects component

```jsx
const Projects = ({ date }) => {
  console.log('Projects render');
  return (
    <div>
      <h4>Project List</h4>
      <div>From: {date}</div>
    </div>
  );
};

export default Projects;
```

In this example, we created **UserContainer** component that is being updated every second. It renders **Projects** component with one static prop - **date**.

Open the console and see what happens:

![Frequent Renders](/img/ezgif.com-gif-maker-8-.gif "Frequent Renders")

The **Projects** component re-renders every time its parent updates, even though its props remain the same. See a room for some optimizations here?

#### Wrapping Projects component in React.memo()

This is a perfect example of how **React.memo()** can be used to gain a performance boost:

```jsx
const Projects = ({ date }) => {
  console.log('Projects render');
  return (
    <div>
      <h4>Project List</h4>
      <div>From: {date}</div>
    </div>
  );
};

export default React.memo(Projects);
```

After doing this small change, open the console and check how many times does the **Projects** component render.

**Just once.**

## Equality Check