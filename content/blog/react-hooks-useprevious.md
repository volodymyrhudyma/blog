---
title: "React Hooks: usePrevious"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/useprevious-hook-in-react.jpg
teaser: Getting the previous state of the component is a must in some specific
  cases. While class based components provide a simple and convenient way to do
  this, via the componentDidUpdate() lifecycle hook, function components
  don't...
date: 2021-07-27T20:12:08.436Z
---
Getting the previous state of the component is a must in some specific cases.

While class-based components provide a simple and convenient way to do this, via the **componentDidUpdate()** lifecycle hook, function components don't and you need to write a bit of custom logic to handle it.

This custom logic can be extracted to a reusable hook, let's call it **usePrevious()**, which may even land into one of the next React versions.

## Class-Based Component: componentDidUpdate()

To begin with, let's see how we can get the previous state of the class-based component:

```jsx
import React, { Component } from "react";

class MyClassComponent extends Component {
  // ...
  
  componentDidUpdate(prevProps) {
    
    // We have access to the previous props via this "prevProps"
    if (prevProps.value !== this.props.value) {
      console.log(`Previous value: ${prevProps.value}`);
      console.log(`Current value: ${this.props.value}`);
    }
  }
  
  // ...
}
```

We use **componentDidUpdate()** lifecycle hook, which accepts the following arguments in the exact same order:

* **prevProps** - an object, containing previous values of props
* **prevState** - an object, containing previous values of state
* **snapshot** - value, returned from the **getSnapshotBeforeUpdate()** lifecycle method

## Functional Component: usePrevious()

Functional components implement hooks instead of lifecycle methods, so what hook allows us to get the previous props?

The answer is - at the current moment, there is no built-in hook for that purpose.

But we can create a custom one with the help of a **useRef()**.

Create a new file named **usePrevious.jsx** with the following content:

```jsx
import { useRef, useEffect } from "react";

const usePrevious = value => {
 const ref = useRef();
  
 useEffect(() => {
   ref.current = value;
 });
  
 return ref.current;
};

export default usePrevious;
```

Then use it in the functional component:

```jsx
import React, { useState } from "react";

import usePrevious from "./usePrevious";

const Counter = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  const handleClick = () => {
    setCount(count => count + 1);
  };

  return (
    <div>
      Current count: {count}, Previous count: {prevCount}
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default Counter;
```

Note that we need to explicitly pass a value we want to observe into the custom hook.

## usePrevious() With TypeScript

Most of the React applications use TypeScript, so let's add some typings to our custom hook:

```typescript
import { useRef, useEffect } from "react";

const usePrevious = <T>(value: T): T | undefined => {
 const ref = useRef<T>();
  
 useEffect(() => {
   ref.current = value;
 });
  
 return ref.current;
};

export default usePrevious;
```

## Summary

In this article, we learned how to get the previous props of the functional component in React.

For this purpose, we created a custom **usePrevious()** hook, which is based on the built-in **useRef()**.

Make sure to copy the custom hook and save it for later use, as for sure it will be needed.