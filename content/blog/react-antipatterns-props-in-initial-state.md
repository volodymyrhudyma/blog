---
title: "React Antipatterns: Props In Initial State"
tag:
  - React
promote: false
metaDescription: Learn why using props to initialize the state of the component
  can be considered an antipattern in React.
shareImage: /img/react-antipatterns-props-in-initial-state.jpg
teaser: In React, props and state are everywhere - they allow us to pass an
  information between components and manage the output of the component over
  time in response to different actions. Separate usage of them is perfectly
  fine, but in some cases they are mixed...
date: 2021-08-22T08:23:43.429Z
---
In React, props and state are everywhere - they allow us to pass an information between components and manage the output of the component over time in response to different actions.

Separate usage of them is perfectly fine, but in some cases they are mixed:

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

While there is nothing wrong with both examples, the second may seem suspicious.

If you are not sure why, grab a cup of coffee and keep reading.

## Better Avoid Props In Initial State

Generally speaking, props in initial state should be avoided, **unless you only need them to initialize the internal state of the component** and either props are never updated or the component should not react to their updates.

Let's take a look at the above example - we pass the **initialValue** prop, which is used to initialize the internal state of the **ChildComponent** and is never changed.

This is perfectly fine, but it is rather an exception than the general rule.

The real problem occurs if the **initialValue** can be changed in the **ParentComponent**:

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

In the above example, we pass an **initialValue** that is changed after one second from "*Initial value*" to "*Changed value*".

If you run an application and check what value would end up in the **input** element after a second, you will notice that it is still "*Initial value*", even though it has changed in the parent component.

This happens because the **useState** hook initializes the state only once - when the component is rendered and is unable to capture further changes in the **initialValue** prop, which is used as an argument.

There is the second drawback - using props to generate the state often leads to the duplication of source of truth - you don't know where the real data is.

## The Correct Example

Now we know what is the issue with the above code, let's see a few ways to fix it.

#### \#1 - Parent Component Needs The Value

In case if the parent component needs the **value**, for example to send it to the API, we may want to keep the state handling inside of it and just pass the **value** and the update function down as props:

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

This way, when the **value** is updated, the changes are instantly reflected in the **input** element.

#### \#2 - Parent Component Doesn't Need The Value

In case if the parent component does not need **value**, why would we want to keep it there to unnecessarily re-render the whole parent? 

Let's try to move the state and update function to the child component:

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

Notice that we need to use the **useEffect** hook to capture the **initialValue** change and update the state accordingly.

### \#3 - With The Key Prop

We also can use the **initialValue** as a key to create a new instance of the **ChildComponent** every time it changes so that the state is reset:

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

While this is fine for small components, like we have, remember that re-creating components from scratch (which is done when key changes) can be expensive if components are big in size.

## Summary

In this article, we learned why it is better not to use props as arguments to the **useState** hook.

In some cases it can be done, but only if you are sure that the component should not react to the changes in props, like in our example with the initial state - if it can never be changed, it is totally fine to initialize the state using it.

There are a few ways to fix an issue if you encountered it:

* Keep the state in parent component and make the child fully controlled - pass the **value** and update function to it
* Keep the state in child component and implement **useEffect**, which listens for prop updates and updates the local state
* Destroy and re-create the child component when the prop changes

I suggest you to stick to either of the first two solutions, depending on your requirements, since the third one can have some (rather small) impact on your application's performance.