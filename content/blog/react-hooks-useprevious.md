---
title: "React Hooks: usePrevious"
tag:
  - React
promote: false
metaDescription: Learn how to get the previous state of Functional and
  Class-Based components in React using componentDidUpdate() lifecycle method
  and a custom usePrevious() hook.
shareImage: /img/useprevious-hook-in-react.jpg
teaser: Retrieving the previous state of the component is a must in some special
  cases. While class-based components provide an easy and convenient way to do
  this via the componentDidUpdate() lifecycle hook, function components do not
  and you need to write custom...
date: 2021-07-27T20:12:08.436Z
---
Retrieving the previous state of the component is a must in some special cases.

While class-based components provide an easy and convenient way to do this via the **componentDidUpdate()** lifecycle hook, function components do not and you need to write custom logic to handle this.

This custom logic can be extracted into a custom reusable hook, let's call it **usePrevious()**, which might even end up in one of the next React versions, as mentioned in the [official React documentation](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state).

## Class-Based Component: componentDidUpdate()

First, let's see how we can get the previous state of the class-based component:

```jsx
import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      prevCount: undefined,
    };
  }

  handleClick = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  componentDidUpdate(_prevProps, prevState) {
    // We have access to the previous state via this "prevState"
    if (prevState.count !== this.state.count) {
      this.setState({
        prevCount: prevState.count,
      });
    }
  }

  render() {
    return (
      <div>
        Current count: {this.state.count}, Previous count:{" "}
        {this.state.prevCount}
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default Counter;
```

The code is pretty simple, but long, so here is the part we are most interested in:

```javascript
componentDidUpdate(_prevProps, prevState) {
  // We have access to the previous state via this "prevState"
  if (prevState.count !== this.state.count) {
    this.setState({
      prevCount: prevState.count,
    });
  }
};
```

We use **componentDidUpdate()** lifecycle hook, which accepts the following arguments in the following order:

* **prevProps** - an object containing previous values of props
* **prevState** - an object containing previous values of state
* **snapshot** - a value returned by the **getSnapshotBeforeUpdate()** lifecycle method if exists, otherwise **undefined**

## Functional Component: usePrevious()

Functional components implement hooks instead of lifecycle methods, so which hook allows us to get the previous state?

The answer is - at this point, there is no built-in hook for this purpose.

But we can create our own using **useRef()**.

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

Use it then in the functional component:

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

Note that we need to explicitly pass a value we want to observe to the custom hook.

## usePrevious() With TypeScript

Most React applications use TypeScript, so let's add some typings to our custom hook:

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

In this article, we learned how to get the previous state of the functional component in React.

For this purpose, we created custom **usePrevious()** hook, based on the built-in **useRef()**.

Be sure to copy the custom hook and save it for later use, as it will certainly be needed.