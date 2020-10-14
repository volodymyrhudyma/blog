---
title: "React Hooks: useMemo"
tag:
  - React
metaDescription: Learn how to optimize your React application by using the
  useMemo hook. This hook memoizes the output and will only recompute it if only
  one of its dependencies changed.
teaser: Memoization is an optimization technique used to speed up computer
  programs by storing the results of expensive function calls and returning the
  cached result when the same inputs occur again. A memoized function...
date: 2020-10-14T18:11:58.132Z
---
Since version 16.8, React provides hooks - functions that allow you to hook into React state and lifecycle features from functional components.

One important thing to remember is that hooks do not work with class components.

The complete list of available hooks can be found in the [official documentation](https://reactjs.org/docs/hooks-reference.html).

Today we will concentrate on the **useMemo**, which can be used to optimize expensive calculations.

## The hook

The **useMemo** hook expects a function and an array of dependencies to be provided:

```javascript
const result = useMemo(() => expensiveOperation(a, b), [a, b]);
```

React recomputes the memoized **result** only if **a** or **b** is changed.

If no array of dependencies is specified, the function will be executed on every render.

This technique allows us to optimize the execution of expensive calculations.

**Important note:** this hook runs during the rendering process, so do not put there the code you would normally not add to the **render** function (like calling an API, this must be done in the **useEffect** hook).

## Memoization

**Memoization** is an optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

A memoized function remembers the returned result when called with specific inputs. 

If subsequent calls are made with the remembered input, the remembered result is returned and no calculations are performed.

Memoization is a way of reducing the time costs of a function in exchange for the cost of space.

Memoized functions are optimized for speed in exchange for higher use of computer memory.

Consider the following function that adds two integers:

```javascript
const sum = (a, b) => a + b;
```

If it uses memoization and is called for the first time with arguments (**10**, **10)**, the result **20** will be remembered and the next time it is called with the same arguments, no calculations are performed to obtain the expected result.

## Example usage

There is a component that allows the user to click on a **div** and **button** element.

Every click is registered in the state and after clicking on the **div** a complex operation is performed:

```jsx
import React, { useState, useMemo } from "react";

const App = () => {
  const [divClickCount, setDivClickCount] = useState(0);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const performComplexOperation = (divClicksCount) => {
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += 1;
    }
    return result;
  };

  const result = performComplexOperation(divClickCount);

  return (
    <>
      <div onClick={() => setDivClickCount(divClickCount + 1)}>
        Div element
      </div>
      <div>Div click count: {divClickCount}</div>
      <br />
      <button onClick={() => setButtonClickCount(buttonClickCount + 1)}>
        Button element
      </button>
      <div>Button click count: {buttonClickCount}</div>
      <br />
      <div>Result: {result}</div>
    </>
  );
};

export default App;
```

Performing a complex operation slows down the application noticeably, even if we click on the **button** element:

![Not using useMemo hook](/img/slow.gif "Not using useMemo hook")

To avoid this a small refactoring is necessary:

```javascript
//...

// Execute complex operation only if "divClickCount" is changed
const result = useMemo(() => performComplexOperation(divClickCount), [divClickCount]);

// ...
```

We only allow complex calculations if the **div** element has been clicked.

Clicking on the **button** element should no longer be blocked:

![Example with using useMemo hook](/img/fast.gif "Example with using useMemo hook")

## Do not overuse it

It is extremely easy to overuse the **useMemo** hook after you have learned all its advantages.

Be careful, because sometimes the savings are so minimal that it is not worth making the code more complex.

#### Example #1

Wrapping inexpensive operations:

```jsx
const App = () => {
  // The array of "users" is initialized every render
  const users = ["John", "Andrew", "Mary"];
  
  // ...
};
```

With the **useMemo** hook:

```jsx
const App = () => {
  // The array of "users" is initialized only once
  const users = useMemo(() => ["John", "Andrew", "Mary"], []);
  
  // ...
};
```

On the one hand, the array of users is created only once, but on the other hand, we make an unnecessary function call.

Performance optimizations are always associated with costs, but not always with a benefit that offsets these costs.

#### More examples

Read [this article](https://blog.logrocket.com/rethinking-hooks-memoization/) to find more examples of overusing this hook.

## Summary

The **useMemo** hook helps to increase the performance of an application by remembering the result of the expensive function calculation and not running it twice with the same parameters.

Although it is extremely useful, its excessive use leads to performance and maintenance problems.

Remember that performance optimizations are not free, even **useMemo** is associated with memory allocation costs.

Try this hook and see if your application benefits from it.