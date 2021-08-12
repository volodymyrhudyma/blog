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
    console.log(ref.current); // <div>Hi, I am MyConponent</div>
    console.log(typeof ref.current); // "object"
  }, []);
  
  return <div ref={ref}>Hi, I am MyComponent</div>;
};
```

Note that the initial value, passed to the hook is **null** (we can also omit it, so the value is **undefined**), since the reference is not set until the content is rendered.

To assign a reference to an element, a special attribute **ref** is used.

Having an access to the DOM element allows us to do a lot of useful things, like get width and height of the element, focus it on the initial render, etc.

#### \#1 - Get Width And Height Of a DOM Node

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

#### \#2 - Set A Focus On A DOM Node

Another good use case of the **useRef()** hook is focusing the input when component mounts, so the user can instantly start typing into it:

```jsx
import React, { useRef, useEffect } from "react";

const MyComponent = () => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);

  return <input ref={ref} type="text" placeholder="Type here" />;
};
```

Note that we executed the **focus()** method on an input DOM node.

If you are curious what other methods could have been used, navigate to [this section](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#methods) of MDN docs.

#### \#3 - Why Does It Even Work?

Consider the following example:

```jsx
import React, { useRef, useEffect } from "react";

const MyComponent = () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref.current); // <input type="text" placeholder="Type here" />
  }, []);

  console.log(ref.current); // "null"

  return <input ref={ref} type="text" placeholder="Type here" />;
};
```

Note that the **current** property of a **ref** object is **null** during the initial rendering. Do you know why?

The answer is simple - React haven't yet determined what is the output of a component, so there is no **input** element mounted yet.

The **useEffect()** hook executes right after mounting, which means that the DOM structure with out **input** element is ready and we are safe to reference it.

## Store Mutable Values

Another use case of the built-in **useRef()** hook is storing mutable values, which are persisted between component re-renders and can be mutated (changed) at any given point of time without triggering a new re-render.

Read once again the sentence above carefully and remember two things:

* Values are persisted between re-renders
* Changing value does not trigger a new re-render

#### \#1 - Values Are Persisted Between Re-Renders

```jsx
const MyComponent = ({ user }) => {
  const ref = useRef(user);
  
  useEffect(() => {
    console.log(ref.current === user); // "true" for the initial render, then "false"
  }, [user]);

  return (
    // ...
  );
};
```

Let's take a close look at the above example.

We have a component named **MyComponent**, which receives a **user** object from its parent component:

```jsx
const ParentComponent = () => {
  // ...

  return (
    <MyComponent
      user={{
        name: "Elon",
      }}
    />
  );
};
```

Every time the **ParentComponent** re-renders, a new **user** object is created and passed to the **MyComponent**.

In **MyComponent**, we set the first received **user** object to the **ref.current** and implement the **useEffect()** hook that fires both, on initial render and the **user** object change.

#### Initial Render Phase

On initial render, the **useEffect()** hook is fired and **console.log()** returns **true**, since the **user** object from props is the same as the **user** object stored under the **ref.current**.

#### Subsequent Renders

On subsequent renders, the **useEffect()** hook is fired and **console.log()** returns **false**, since the **user** object from props is already a new object, not the same as stored under the **ref.current**.

It means that the object we store under the **ref.current** is the very first **user** object and it persists between re-renders.

See the logs:

![UseRef Logs](/img/useref-example-gif.gif "UseRef Logs")

#### \#2 - Changing Value Does Not Trigger A New Re-Render

```jsx
import React, { useRef } from "react";

const MyComponent = () => {
  const ref = useRef(0);

  const handleClick = () => {
    ref.current++;
    console.log(`In handleClick, clicked: ${ref.current} times`);
  };

  console.log("MyComponent render");

  return <button onClick={handleClick}>Click Me</button>;
};
```

The **MyComponent** stores number of clicks in the **ref** object.

When the user clicks on a button, the **handleClick** method is executed, the counter is updated and the following line is printed to the console:

```html
In handleClick, clicked: 1 times
In handleClick, clicked: 2 times
In handleClick, clicked: 3 times
```

However, the component is not re-rendered, which can be seen by the fact that the second log (with the "MyComponent render" message) is not shown more than once, which happened for initial render:

![UseRef Does Not Trigger Component Re-Render](/img/useref-not-triggering-rerender.gif "UseRef Does Not Trigger Component Re-Render")

## useRef() vs. useState()

## Summary