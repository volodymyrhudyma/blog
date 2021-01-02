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

## Why do we need it?

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