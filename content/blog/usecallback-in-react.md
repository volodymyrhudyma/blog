---
title: The useCallback Hook in React
tag:
  - React
promote: false
metaDescription: Learn how to optimize the performance of a React application
  with the useCallback hook. useCallback hook memoizes functions and preserves
  them between renders.
teaser: In my blog, I already talked about some ways to optimize the performance
  of the application like the useMemo hook or the React.memo higher-order
  component (HOC). Today we will learn about the useCallback, which allows us to
  memoize functions and preserve them...
date: 2021-01-02T08:43:09.091Z
---
In my blog, I already talked about some ways to optimize the performance of the application like the [useMemo](/usememo-in-react/) hook or the [React.memo](/boost-performance-with-react-memo/) higher-order component (HOC). The hook allows us to memoize values, HOC - components.

Today we will learn about the **useCallback**, which allows us to memoize **functions** and preserve them between renders.

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
    console.log("Clicked!")
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

We have a simple **App** component that renders a **Button**, passes the click handler as a prop, and is updated every second.

Currently, when you run the above code, the text "*Button render*" is printed to the console every second, which means that updating the **App** component also updates the **Button**:

![Button Component Re-Renders](/img/ezgif.com-gif-maker-9-.gif "Button Component Re-Renders")

Alrighty, but we already know that the component can be wrapped in the **React.memo** in order not to be re-rendered when the same props are passed, right? 

Let's try it out:

```jsx
const Button = ({ handleClick }) => {
  console.log("Button render");
  return (
    <button onClick={handleClick}>Click me</button>
  );
}

export default React.memo(Button);
```

Now check the console ... and see that **nothing has changed**.

At this point you may not really understand what is happening, but let me explain.

When a [Function Component](https://reactjs.org/docs/components-and-props.html) is updated, all the functions within its body are recreated on every render:

```javascript
const App = () => {
  // Whenever App component updates
  // A new function will be created
  const handleClick = () => {
    console.log("Clicked!")
  }
  
  // ...
};
```

This means that the **handleClick** function on the second render is not the same as on the first.

Inline functions are cheap, so recreating a small function is not a problem at all, but in some cases, to increase performance, you may want to keep one function between renders.

That is exactly when the **useCallback** hook comes into play.

## The useCallback Hook

The syntax is the following: `useCallback(callbackFn, deps)`. 

You should pass the function to be memoized as the first argument, and the list of dependencies, whose modification will cause the function to be recreated.

Let's use this for our **handleClick** function in the **App** component:

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
    console.log("Clicked!")
  }, []);
  
  return <Button handleClick={handleClick} />;
};

export default App;
```

After making this small change, check the console and notice that the **Button** component has been rendered **only once**, because it gets the same **handleClick** callback and **React.memo** can now memoize the component properly.

## Do Not Overuse It

The above example is simple enough to understand how the **useCallback** works, but it is a **bad example** and such optimizations of small functions should not be used in production code.

As we mentioned earlier, inline functions are cheap, but the **useCallback** hook is not.

Apart from reducing the readability of the code to some point, it also has to compare the dependencies from the dependency array every time it is re-rendered to decide whether to re-define the function. 

Often the computation for this comparison can be more expensive than simply re-defining the function.

Read [this article](https://kentcdodds.com/blog/usememo-and-usecallback) to see why using the hook is worse than not using it in some cases.

## Summary

In summary, the **useCallback** hook is used to memoize the functions and preserve their instances between renders.

It can provide a performance boost when combined with the **React.memo** HOC, but can also decrease performance if not used properly.

Always remember that everything comes with a cost, even hooks that are supposed to optimize performance.

Sometimes **not wrapping** a simple function in the **useCallback** hook is the best optimization.