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
date: 2021-07-28T20:12:08.436Z
---
Getting the previous state of the component is a must in some specific cases.

While class-based components provide a simple and convenient way to do this, via the **componentDidUpdate()** lifecycle hook, function components don't and you need to write a bit of custom logic to handle it.

This custom logic can be extracted to a reusable hook, let's call it **usePrevious()**, which may even land into one of the next React versions.

## Class-Based Component: componentDidUpdate()

To begin with, let's see how we can get the previous state of the class-based component:

```jsx
import React, { Component } from "react";

class ExampleComponent extends Component {
  // ...
  
  componentDidUpdate(prevProps) {
    
    // We have access to the previous props via this "prevProps"
    if (prevProps.count !== this.props.count) {
      console.log(`Previous count: ${prevProps.count}`);
      console.log(`Current count: ${this.props.count}`);
    }
  }
  
  // ...
}
```

We use **componentDidUpdate()** lifecycle hook, which accepts the following arguments in the exact same order:

* **prevProps** - an object, containing previous values of props
* **prevState** - an object, containing previous values of state
* **snapshot** - value, returned from the **getSnapshotBeforeUpdate()** lifecycle method

## **Functional Component: usePrevious()**

Functional components implement hooks instead of lifecycle methods, so what hook allows us to get the previous props?

The answer is - at the current moment, there is no built-in hook for that purpose.

But we can create a custom one with the help of a **useRef()**:

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

Then import it into your functional component and use:

```jsx
import React, { useState } from "react";

import usePrevious from "./usePrevious";

const ExampleComponent = () => {
  const [count, useCount] = useState(0);
  
  // Use custom "usePrevious" hook to get previous "count" value
  const prevCount = usePrevious(count);
  
  console.log(`Previous count: ${prevCount}`);
  console.log(`Current count: ${count}`);
  
  // ...
};
```

## usePrevious() With TypeScript

Most of the React applications use TypeScript, so let's add some typings to our custom hook:

```tsx
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