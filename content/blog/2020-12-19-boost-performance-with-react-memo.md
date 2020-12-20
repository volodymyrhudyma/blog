---
title: Boost Performance With React.memo()
tag:
  - React
promote: false
metaDescription: React provides the React.memo() Higher-Order Component which
  can be used to improve the performance of a React application. React.memo()
  memoizes the result of rendering the component.
teaser: In React, changing the state of the parent component triggers a
  re-render of the entire component tree. This often leads to the unnecessary
  rendering of child components, whose props have not actually changed.
  Undoubtedly, this slows down the application, especially if...
date: 2020-12-20T07:56:29.709Z
---
In React, changing the state of the parent component triggers a re-render of the entire component tree.

This often leads to the unnecessary rendering of child components, whose props have not actually changed.

Undoubtedly, this slows down the application, especially if child components contain many expensive calculations.

To improve performance, React provides the **React.memo()** higher-order component.

> [Higher-order component](https://reactjs.org/docs/higher-order-components.html) is a function that takes a component and returns a new component.

## React.memo()

When a component is wrapped in the **React.memo()**, its result is memoized by React after rendering.

> [Memoization](https://en.wikipedia.org/wiki/Memoization) is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs are encountered again.

Before the next render, if the props have not changed, React reuses the result of the previous render, skipping the whole expensive rendering process.

## Primitive Example

To better understand the concept, let's see it in action:

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

In this example, we created the **UserContainer** component, which is updated every second. It renders the **Projects** component with a static property - **date**.

Open the console and see what happens:

![Frequent Renders](/img/ezgif.com-gif-maker-8-.gif "Frequent Renders")

The **Projects** component is re-rendered every time the parent is updated, even though its props remain the same. 

Do you see room for some optimizations here?

#### Wrapping Projects component in React.memo()

This is a perfect example of how **React.memo()** can be used to provide a performance boost:

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

After making this small change, open the console and check how often the **Projects** component is rendered.

**Just once.**

## Complex Example

We have seen a simple example with a Primitive value passed in as a **date** prop. 

But what if we want to pass an object?

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

  return <Projects date={{ year: 2020, month: 1, day: 1 }} />;
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
      <div>
        From: {date.year}-{date.month}-{date.day}
      </div>
    </div>
  );
};

export default React.memo(Projects);
```

Open the console and see how the **Projects** component is rendered frequently, even though it is wrapped in the **React.memo()**.

If we look closely at the example, we would notice that every time the **UserContainer** is rendered, a **date** object is created and passed down the tree.

**React.memo()** only does a shallow comparison of the props passed in, so if we pass in different objects, even with the same props, the component will still be re-rendered.

Can we change this behavior? The second argument for rescue.

## Custom Equality Check

React gives us the option to pass the second argument to the **React.memo()** HOC and define our own equality checking function:

```javascript
const customEqualityCheck = (prevProps, nextProps) => {
  // If year, month and day are not changed, do not re-render the component
  if (
    prevProps.year === nextProps.year &&
    prevProps.month === nextProps.month &&
    prevProps.day === nextProps.day
  ) {
    return true;
  }
  // Otherwise do re-render with a new props
  return false;
};

React.memo(Component, customEqualityCheck);
```

This function must return **true** if we do not want the component to be rendered when certain criteria are met, **false** otherwise.

**Important note:** According to the [React docs](https://reactjs.org/docs/react-api.html#reactmemo), this method exists only as a performance optimization**.** Do not rely on it to “prevent” rendering, as this can lead to bugs.

## Avoid React.memo()

Seeing all its benefits, we can assume that it is worth using for almost all components in our app, and that is a completely wrong assumption.

Remember that everything has a cost associated with it, including **React.memo()**, which is associated with memory allocation.

Do not use it if:

* The component is usually rendered with different props
* The component is not rendered often
* It does not provide a measurable performance gain (use Profiler to check this)

## Callback Functions

Memoization can be easily broken by using callback functions incorrectly.

#### UserContainer component

```jsx
const UserContainer = () => {
  const [_toggle, setToggle] = useState(false);

  useEffect(() => {
    const intervailId = setInterval(() => {
      setToggle((toggle) => !toggle);
    }, 1000);
    return () => {
      clearInterval(intervailId);
    };
  }, []);

  const handleProjectClick = () => {
    console.log('Do something');
  };

  return <Projects handleProjectClick={handleProjectClick} />;
};

export default UserContainer;
```

#### Projects component

```jsx
const Projects = ({ handleProjectClick }) => {
  console.log('Projects render');
  return (
    <div>
      <h4>Project List</h4>
      <button onClick={handleProjectClick}>Click me</button>
    </div>
  );
};

export default React.memo(Projects);
```

In this example, a parent component passes the **handleProjectClick** callback to the child.

There is one tricky thing - every time the functional component defines a callback, a new callback instance is created, which means that we are passing different instances of the callback function to the child component.

See that even if we do not provide any props other than the callback function, the component is still not memoized properly.

The solution is simple - we need to use a **useCallback** hook to preserve the instance of the callback for each render:

```jsx
 const handleProjectClick = useCallback(() => {
    console.log('Do something');
  }, []);
```

We create an instance of the **handleProjectClick** on the initial render and keep it.

## Summary

In this article, we learned about an amazing way to boost React application performance using **React.memo()**.

Measure the performance of the component before and after using this HOC, to make sure it really helps you.