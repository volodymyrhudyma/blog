---
title: "React Hooks: useRef"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/useref-hook-in-react.jpg
teaser: // TEASER
date: 2021-08-13T07:15:00.384Z
---
The **useRef()** is a built-in hook in React, which is used for two purposes: 

* to access DOM elements
* to store mutable values which persist between component re-renders

The hook accepts an argument called **initialValue** and returns a mutable ref object that contains a special **current** property, which stores the passed argument for the full component's lifetime:

```javascript
const ref = useRef(initialValue);

```

## Access DOM Elements

This is, probably, the most common use case for the **useRef()**, which can store the reference to a DOM element:

```jsx
import React, { useRef, useEffect } from "react";

const MyComponent = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    console.log(ref.current); // "<div>Hi, I am MyConponent</div>"
    console.log(typeof ref.current); // "object"
  }, []);
  
  return <div ref={ref}>Hi, I am MyComponent</div>;
};
```

Note that the initial value, passed to the hook is **null** (we can also omit it, so the value is **undefined**), since the reference is not set until the content is rendered.

To assign a reference to an element, a special attribute **ref** is used.

Having an access to the DOM element allows us to do a lot of useful things, like get width and height of the element, focus it on the initial render, etc.

#### Get Width And Height Of a DOM Node

In some cases, we need to grab the dimensions of an element, which may be required for some further calculations and we can easily do it:

```jsx
import React, { useRef, useEffect } from "react";

const MyComponent = () => {
  const ref = useRef(null);

  useEffect(() => {
    const div = ref.current;
    const rect = div.getBoundingClientRect();
    console.log(rect.width); // "874"
    console.log(rect.height); // "18"
  }, []);

  return <div ref={ref}>Hi, I am MyComponent</div>;
};
```

> The **Element.getBoundingClientRect()** method returns a **DOMRect** object providing information about the size of an element and its position relative to the **viewport**.

Note, that we could have assigned the id to our div element and used the **document.getElementById()** method:

```jsx
import React, { useEffect } from "react";

const MyComponent = () => {
  useEffect(() => {
    const div = document.getElementById("myComponent");
    const rect = div.getBoundingClientRect();
    console.log(rect.width); // "874"
    console.log(rect.height); // "18"
  }, []);

  return <div id="myComponent">Hi, I am MyComponent</div>;
};
```

But this is not the "React way" and it has an important drawback - if you would like to create multiple instances of **MyComponent**, you will end up with multiple div's having the same ids on the page, which is not allowed.

The same disadvantage applies to classes - even though your are allowed to have multiple elements with the same class name, **document.getElementsByClassName()** will return all of them and it is extremely hard to find out which component created which element unless you find a way to tie class name and component.

#### Set A Focus On A DOM Node