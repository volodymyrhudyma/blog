---
title: useMemo in React
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-10-14T18:11:58.132Z
---
Since the 16.8 version React offers hooks - functions that let you hook into React state and lifecycle features from function components.

One important thing to remember is that hooks do not work with class components.

The full list of available hooks can be found in the [official documentation](https://reactjs.org/docs/hooks-reference.html).

Today we will focus on the useMemo that allows optimizing expensive calculations.

## The hook

The **useMemo** hook expects a function and array of dependencies to be provided:

```javascript
const result = useMemo(() => expensiveOperation(a, b), [a, b]);
```

React will only recompute the memoized **result** only if **a** or **b** is changed.

If no array of dependencies provided, the function will be executed for every render.

This technique allows us to optimize performing expensive calculations.

**Important note:** this hook runs during the rendering process, so do not put there the code you would not normally add to the **render** function (like calling an API, it needs to be done in the **useEffect** hook).

## Memoization

**Memoization** is an optimization technique that is used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

A memoized function remembers the returned result when called with specific inputs. 

When subsequent calls occur with the remembered input, the remembered result is returned and no calculations are performed.

Memoization is a way to lower a function's time cost in exchange for space cost.

Memoized functions become optimized for speed in exchange for higher use of computer memory space.

Consider the following function that adds up two integers:

```javascript
const sum = (a, b) => a + b;
```

If it uses memoization and gets called for the first time with arguments (**10**, **10)**, the result **20** will be remembered and the next time we call it with the same arguments, no calculations will be performed to return the expected result.

## Example

There is a component that allows the user to click on a **div** and **button** elements.

Each click is registered in the state and after the click on the **div** we should perform some complex operation:

```jsx
import React, { useState, useMemo } from 'react';

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

Performing complex operation slows the application down noticeably, even if we click on the **button** element:

![Not using useMemo hook](/img/slow.gif "Not using useMemo hook")

To avoid this a small refactoring is needed:

```javascript
//...

// Execute complex operation only if "divClickCount" is changed
const result = useMemo(() => performComplexOperation(divClickCount), []);

// ...
```

We allow complex calculations only if the **div** element has been clicked.

Clicking on the **button** element should not be blocked anymore:

![Example with using useMemo hook](/img/fast.gif "Example with using useMemo hook")

## Do not overuse

It is extremely easy to overuse the **useMemo** hook after learning all its benefits.

Be careful, as sometimes the savings are so minimal that it is not worth making the code more complex.

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

On the one hand, the array of users is created only once, but on the other hand, we are making an unnecessary function call.

Performance optimizations always come with a cost but do not always come with a benefit to offset that cost.

#### More examples

Read [this article](https://blog.logrocket.com/rethinking-hooks-memoization/) to find out more examples of overusing this hook.

## Summary

The **useMemo** hook helps to increase the performance of an application by remembering the result of the expensive function calculation and not executing it twice with the same parameters.

While it is extremely useful, overusing it leads to performance and maintenance problems.

Remember that performance optimizations are not free, even **useMemo** comes with a cost of allocating memory.

Give this hook a try and see if your application will benefit from using it.