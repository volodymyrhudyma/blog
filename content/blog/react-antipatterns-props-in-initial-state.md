---
title: "React Antipatterns: Props In Initial State"
tag:
  - React
promote: false
metaDescription: Learn why using props to initialize the state of the component
  can be considered an antipattern in React.
shareImage: /img/react-antipatterns-props-in-initial-state.jpg
teaser: In React, props and state are everywhere - they allow us to pass
  information between components and manage the output of the component over
  time in response to various actions. Using them separately is perfectly fine,
  but in some cases they are...
date: 2021-08-22T08:23:43.429Z
---
In React, props and state are everywhere - they allow us to pass information between components and manage the output of the component over time in response to various actions.

Using them separately is perfectly fine, but in some cases they are mixed:

* A state variable can be passed as a prop to the child component:

```jsx
const ParentComponent = () => {
  const [value, setValue] = useState("Initial value");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return <ChildComponent value={value} handleChange={handleChange} />;
};

const ChildComponent = ({ value, handleChange }) => (
  <input value={value} onChange={handleChange} />
);
```

* A prop can be used to define an initial state of the child component:

```jsx
import React, { useState } from "react";

const ParentComponent = () => <ChildComponent initialValue="Initial value" />;

const ChildComponent = ({ initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return <input value={inputValue} onChange={handleChange} />;
};
```

While there is nothing wrong with either example, the second may seem suspicious.

If you are not sure why, grab a cup of coffee and read on.

## Better Avoid Props In Initial State

In general, props should be avoided in the initial state **unless you only need them to initialize the internal state of the component** and either props are never updated or the component should not react to their updates.

Let's look at the example above - we pass the **initialValue** prop, which is used to initialize the internal state of the **ChildComponent** and is never changed.

This is perfectly fine, but it is an exception rather than the general rule.

The real problem occurs when the **initialValue** in the **ParentComponent** can be changed:

```jsx
import React, { useState, useEffect } from "react";

const ParentComponent = () => {
  const [initialValue, setInitialValue] = useState("Initial value");

  useEffect(() => {
    setTimeout(() => {
      setInitialValue("Changed value");
    }, 1000);
  }, []);

  return <ChildComponent initialValue={initialValue} />;
};

const ChildComponent = ({ initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return <input value={inputValue} onChange={handleChange} />;
};
```

In the above example, an **initialValue** is passed, which is changed from "*Initial value*" to "*Changed value*" after one second.

If you run an application and check what value is in the **input** element after one second, you will find that it is still "*Initial value*" even though it has changed in the parent component.

This happens because the **useState** hook initializes the state only once - when the component is rendered and is not able to capture further changes in the **initialValue** prop.

There is a second drawback - using props to generate the state often leads to duplication of the source of truth - you don't know where the real data is.

## The Correct Examples

Now we know what the problem is with the above code, let's see a few ways to fix it.

#### \#1 - Parent Component Needs The Value

In case if the parent component needs the **value**, for example to send it to the API, we can leave the state handling in the component and just pass the **value** and the update function as props:

```jsx
const ParentComponent = () => {
  const [value, setValue] = useState("Initial value");

  useEffect(() => {
    setTimeout(() => {
      setValue("Changed value");
    }, 1000);
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return <ChildComponent value={value} handleChange={handleChange} />;
};

const ChildComponent = ({ value, handleChange }) => (
  <input value={value} onChange={handleChange} />
);
```

This way, when the **value** is updated, the changes are immediately reflected in the **input** element.

#### \#2 - Parent Component Doesn't Need The Value

If the parent component doesn't need the **value**, why would we leave it there to unnecessarily re-render the entire parent component?

Let's try moving the state and update function to the child component:

```jsx
import React, { useState, useEffect } from "react";

const ParentComponent = () => {
  const [initialValue, setInitialValue] = useState("Initial value");

  useEffect(() => {
    setTimeout(() => {
      setInitialValue("Changed value");
    }, 1000);
  }, []);

  return <ChildComponent initialValue={initialValue} />;
};

const ChildComponent = ({ initialValue }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue);
    }
  }, [initialValue]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return <input value={inputValue} onChange={handleChange} />;
};
```

Note that we need to use the **useEffect** hook to capture the change in **initialValue** and update the state accordingly.

### \#3 - With The Key Prop

We can also use the **initialValue** as a key to create a new instance of the **ChildComponent** each time it changes to reset the state:

```jsx
import React, { useState, useEffect } from "react";

const ParentComponent = () => {
  const [initialValue, setInitialValue] = useState("Initial value");

  useEffect(() => {
    setTimeout(() => {
      setInitialValue("Changed value");
    }, 1000);
  }, []);

  return <ChildComponent key={initialValue} initialValue={initialValue} />;
};

const ChildComponent = ({ initialValue }) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return <input value={inputValue} onChange={handleChange} />;
};
```

While this is fine for small components like we have, keep in mind that rebuilding components from scratch (which is done when we change the key prop) can get expensive if the components are large.

## Summary

In this article, we learned why it is better not to use props as arguments to the **useState** hook.

In some cases it is possible, but only if you are sure that you do not want the component to react to the changes in props, like in our example with the initial state - if it can never be changed, it is perfectly fine to initialize the state with it.

There are a few ways to fix an issue if you run into it:

* Keep the state in the parent component and make the child component fully controlled - pass the **value** and update function to it
* Keep the state in the child component and implement **useEffect**, which listens for prop updates and updates the local state
* Destroy and re-create the child component when the prop changes

I suggest you stick to one of the first two solutions depending on your requirements, as the third solution may have some (rather minor) impact on the performance of your application.