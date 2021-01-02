---
title: useCallback in React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-02T08:43:09.091Z
---
In my blog, I was already talking about a few ways of optimizing the application's performance like [useMemo](/usememo-in-react/) hook or [React.memo](/boost-performance-with-react-memo/) higher-order component (HOC). The hook allows us to memoize values, HOC - components.

Today we will learn **useCallback** hook that allows us to memoize **functions** and preserve them between the renders.

## Why Do We Need It?

The best way to learn how something works is to see a simple example.

**App** component:

```jsx
const App = () => {
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

  const handleClick = () => {
    console.log('Clicked!')
  }
  
  return <Button handleClick={handleClick} />;
};

export default App;
```

**Button** component:

```javascript
const Button = ({ handleClick }) => {
  console.log("Button render");
  return (
    <button onClick={handleClick}>Click me</button>
  );
}

export default Button;
```

We have a simple **App** component that renders a **Button**, passes click handler as a prop, and is updated every second.

Currently, if you run the code above, you will see "*Button render*" text printed to the console every second, which means that updating the **App** component also updates the **Button**:

![Button Component Re-Renders](/img/ezgif.com-gif-maker-9-.gif "Button Component Re-Renders")

Fine, but we already know that the component can be wrapper in the **React.memo** in order not to re-render when the same props are passed, right? Let's try it:

```jsx
const Button = ({ handleClick }) => {
  console.log("Button render");
  return (
    <button onClick={handleClick}>Click me</button>
  );
}

export default React.memo(Button);
```

Check the console now ... and see that **nothing has changed**.

At this point, you may not really understand what is happening, but let me explain it.

When a [Function Component](https://reactjs.org/docs/components-and-props.html) is updated, all functions within its body are re-created on every render:

```javascript
const App = () => {
  // Whenever App component updates
  // A new function will be created
  const handleClick = () => {
    console.log('Clicked!')
  }
  
  // ...
};
```

This means that the **handleClick** function on the second render is not the same as on the first one.

Inline functions are cheap, so re-creating a small function is not a problem at all, but in some cases, in order to increase performance, you may want to maintain one function between the renders.

That's exactly the moment **useCallback** hook comes into play.

## The useCallback hook

The syntax is the following: `useCallback(callbackFun, deps)`. 

You should pass the function that has to be memoized as a first argument and the list of dependencies, changing which results in re-creating the function.

Let's use it for our **handleClick** function in the **App** component:

```jsx
const App = () => {
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

  // Preserve the function instance between the renders
  const handleClick = useCallback(() => {
    console.log('Clicked!')
  }, []);
  
  return <Button handleClick={handleClick} />;
};

export default App;
```

After doing this small change, check the console and note that the **Button** component rendered **only once**, because it receives the same **handleClick** callback and **React.memo** now can memoize the component properly.

## Do Not Overuse The Hook

The example above is simple enough to understand how the **useCallback** works, but it is a **bad example** and such optimizations of small functions should not be used in the production code.

As we already mentioned, inline functions are cheap, but **useCallback** hook is not.

Apart from decreasing the readability of the code to some point, it also has to compare the dependencies from the dependency array for every re-render to decide whether it should re-define the function. 

Often the computation for this comparison can be more expensive than just re-defining the function.

Refer to [this article](https://kentcdodds.com/blog/usememo-and-usecallback) to see why in some cases using the hook is worse than not using it.

## Summary

To sum everything up, the **useCallback** hook is used to memoize the functions and preserve their instances between the renders.

It can bring a performance boost when used in combination with the **React.memo** HOC, however it can also decrease performance when not used properly.

Always remember that everything comes with a cost, even hooks that are designed to optimize the performance.

Sometimes, **not wrapping** a simple function in the **useCallback** hook is the best optimization.