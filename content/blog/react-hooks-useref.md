---
title: "React Hooks: useRef (Full Guide)"
tag:
  - React
promote: false
metaDescription: Learn more about the built-in useRef() hook in React, which is
  used to access DOM elements and store values that persist between component
  re-renders.
shareImage: /img/useref-hook-in-react.jpg
teaser: "The useRef() is a built-in hook in React that is used for two purposes:
  to access DOM elements and to store mutable values that persist between
  component re-renders. The hook accepts an argument called initialValue and
  returns a mutable ref object that contains..."
date: 2021-08-14T07:15:00.384Z
---
The **useRef()** is a built-in hook in React that is used for two purposes: 

* To access DOM elements
* To store mutable values that persist between component re-renders

The hook accepts an argument called **initialValue** and returns a mutable ref object that contains a special **current** property that stores the passed argument for the lifetime of the component:

```javascript
const ref = useRef(initialValue);
```

## Access DOM Elements

This is probably the most common use case for **useRef()**, which can store the reference to a DOM element:

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

Note that the initial value passed to the hook is **null** (we can also omit it so that the value is **undefined**), since the reference is not set until the content is rendered.

To assign a reference to an element, a special attribute **ref** is used.

By accessing the element DOM we can do many useful things, such as get the width and height of the element, focus it when it is first rendered, etc.

#### \#1 - Get Width And Height Of a DOM Node

In some cases we need to find out the dimensions of an element, which are needed for some further calculations, and we can easily do that:

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

You might be thinking that we could assign id to our div element and use the **document.getElementById()** method:

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

But this is not the "React way" and it has an important drawback - if you want to create multiple instances of **MyComponent**, you will end up with multiple divs having the same ids on the page, which is not allowed.

The same drawback applies to classes - even though it is allowed to have multiple elements with the same class name, **document.getElementsByClassName()** will return all of them and it is extremely hard to figure out which component created which element unless you find a way to tie class name and component.

#### \#2 - Set A Focus On A DOM Node

Another good use case for the **useRef()** hook is to focus the input when the component is mounted, so that the user can start typing immediately:

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

Note that we ran the **focus()** method on an input DOM node.

If you are curious about what other methods could have been used, navigate to [this section](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement#methods) of MDN docs.

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

The answer is simple - React has not yet determined what the output of a component is, so there is no **input** element mounted yet.

The **useEffect()** hook is executed right after mounting, which means that the DOM structure with the **input** element is ready and we can safely reference it.

#### \#4 - Notify Me When The Ref Is Attached Or Detached

If you want to run code when React attaches or detaches a ref to a DOM node, you should use a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)instead:

```jsx
import React, { useCallback } from "react";

const MyComponent = () => {
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const rect = node.getBoundingClientRect();
      console.log(rect.width); // "153"
      console.log(rect.height); // "21"
    }
  }, []);

  return <input ref={measuredRef} type="text" placeholder="Type here" />;
};
```

Using a callback reference ensures that even if the child component displays the **input** DOM node later, we are still notified about it in the parent component and are able to perform an action based on it.

Click [here](https://codesandbox.io/s/818zzk8m78) to see an example.

**Important note:** Pass an empty array as a dependency to the **useCallback()** hook to ensure that React does not change the callback between re-renders.

## Store Mutable Values

Another use case for the built-in **useRef()** hook is storing mutable values that are preserved between component re-renders and can be mutated (changed) at any time without triggering a new re-render.

Read the above sentence again carefully and remember two things:

* Values are preserved between re-renders
* A value change does not trigger a new re-render

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

Let's take a closer look at the above example.

We have a component called **MyComponent** that gets a **user** object from its parent:

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

Each time the **ParentComponent** re-renders, a new **user** object is created and passed to the **MyComponent**.

In **MyComponent**, we set the first **user** object received to **ref.current** and implement the **useEffect()** hook, which is triggered both, on initial render and when the **user** object change.

#### Initial Render Phase

On initial render, the **useEffect()** hook is triggered and **console.log()** returns **true** because the **user** object from props is the same as the **user** object stored at the **ref.current**.

#### Subsequent Renders

On subsequent renders, the **useEffect()** hook is triggered and **console.log()** returns **false** because the **user** object from props is already a new object, not the same one stored at **ref.current**.

This means that the object we store under **ref.current** is the very first **user** object and it persists between re-renders.

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

The **MyComponent** stores the number of clicks in the **ref** object.

When the user clicks a button, the **handleClick** method is executed, the counter is updated, and the following line is printed to the console:

```html
In handleClick, clicked: 1 times
In handleClick, clicked: 2 times
In handleClick, clicked: 3 times
```

However, the component is not re-rendered, which can be seen by the fact that the second log (with the "MyComponent render" message) is not displayed more than once, which was the case for the initial render:

![UseRef Does Not Trigger Component Re-Render](/img/useref-not-triggering-rerender.gif "UseRef Does Not Trigger Component Re-Render")

## useRef() vs. useState()

At this point, you should already understand one of the most important differences between the **useRef()** and **useState()** hooks:

* The **useRef()** hook does not trigger the re-render of a component, while **useState()** does.

However, there are some other important things to note:

* Updating the reference (**ref.current = value**) is synchronous, while updating the state (**setCount(value)**) is asynchronous
* The **useRef()** hook returns an object with the **current** property, while the **useState()** hook returns an array with two elements: the state and the state updater function

In summary, you should only use the **useRef()** hook if you have a data container that retains values throughout the component's lifecycle and does not trigger a new rendering when a change is made, or if you need to access a DOM node.

In all other cases, you should get by with the **useState()** hook.

## useRef() vs. Variable

When I was wrapping my head around the **useRef()** hook, I was wondering why we even need to use the **useRef()** hook to preserve a value between re-renders when we can just store it in a variable outside of the React component, like here:

```jsx
import React from "react";

let count = 0;

const MyComponent = () => {
  const handleClick = () => {
    count++;
    console.log(`In handleClick, clicked: ${count} times`);
  };

  console.log("MyComponent render");

  return <button onClick={handleClick}>Click Me</button>;
};
```

It looks much easier and seems to work the same way.

However, it's not that simple.. Can you guess what's wrong with storing the variable outside of **MyComponent**?

Congratulations if you guessed it, because it took me a while to figure it out - the variable defined outside of the React component is global to all of its instances and shared between them.

Basically, this means that if you render 3 instances of **MyComponent**, they will all change the same value.

Let's assume we have the following **ParentComponent** and **MyComponent** remains unchanged:

```jsx
const ParentComponent = () => {
  // ...

  return (
    <>
      <MyComponent />
      <MyComponent />
      <MyComponent />
    </>
  );
};
```

Regardless of which button you click, you are now updating the same counter:

![UseRef vs. Global Variable](/img/useref-global-var.gif "UseRef vs. Global Variable")

Note how clicking the second or third button increments the same counter.

## What About Class-Based Components?

The **useRef()** hook, like all other hooks, is intended for functional components only.

In class-based components, we can create refs either with the built-in **createRef()** function or by defining a class variable.

#### \#1 - createRef() Function

```jsx
class MyComponent extends Component {
  ref = createRef();

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.ref.current++;
    console.log(`In handleClick, clicked: ${this.ref.current} times`);
  }

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

#### \#2 - Define A Class Variable

```jsx
class MyComponent extends Component {
  count = 0;

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.count++;
    console.log(`In handleClick, clicked: ${this.count} times`);
  }

  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

## useRef() vs. createRef()

The difference between the **useRef()** hook and the **createRef()** method is simple: **createRef()** returns a new reference on each render, while **useRef()** returns the same reference each time.

Here's an example from the [stackoverflow](https://stackoverflow.com/questions/54620698/whats-the-difference-between-useref-and-createref) that demonstrates the difference between the two methods:

```jsx
import React, { useRef, createRef, useState } from "react";

const App = () => {
  const [renderIndex, setRenderIndex] = useState(1);

  const refFromUseRef = useRef();
  const refFromCreateRef = createRef();

  if (!refFromUseRef.current) {
    refFromUseRef.current = renderIndex;
  }

  if (!refFromCreateRef.current) {
    refFromCreateRef.current = renderIndex;
  }

  return (
    <div className="App">
      Current render index: {renderIndex}
      <br />
      First render index remembered within refFromUseRef.current:{" "}
      {refFromUseRef.current}
      <br />
      First render index unsuccessfully remembered within
      refFromCreateRef.current:
      {refFromCreateRef.current}
      <br />
      <button onClick={() => setRenderIndex((prev) => prev + 1)}>
        Cause re-render
      </button>
    </div>
  );
};
```

See it in action:

![UseRef vs. CreateRef Example From StackOverflow](/img/useref-vs-createref.gif "UseRef vs. CreateRef Example From StackOverflow")

## Summary

In this article, we learned about the built-in **useRef()** hook, which is used to access DOM elements and store mutable values that persist between component re-renders.

We mentioned some important differences between:

* **useRef()** and **useState()**
* Variables defined outside of the React component and **useRef()**
* **useRef()** and **createRef()**

We learned how to use **createRef()** or class variables to achieve the same functionality in a class-based components.

And much, much more.

I hope you learned something new today and see you in the next article.