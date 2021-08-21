---
title: "React Antipatterns: Props In Initial State"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/react-antipatterns-props-in-initial-state.jpg
teaser: In React, props and state are everywhere - they allow us to pass an
  information between components and manage the output of the component over
  time in response to different actions. Separate usage of them is perfectly
  fine, but in some cases they are mixed...
date: 2021-08-22T08:23:43.429Z
---
In React, props and state are everywhere - they allow us to pass an information between components and manage the output of the component over time in response to different actions.

Separate usage of them is perfectly fine, but in some cases they are mixed:

* A state variable can be passed a prop to the child component:

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

const ParentComponent = () => <ChildComponent value="Initial value" />;

const ChildComponent = ({ value }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return <input value={inputValue} onChange={handleChange} />;
};
```

While there is nothing wrong with the first example, the second may seem suspicious.

If you are not sure why, grab a cup of coffee and keep reading.

## Avoid Props In Initial State

Generally speaking, props in initial state should be avoided, **unless you only need them to initialize the internal state of the component** and that's clearly expressed.

Let's take a look at the above example - we pass the **value** prop, which is used to initialize the internal state of the **ChildComponent** and is never changed.

This is perfectly fine, but it is rather an exception than the general use case.

#### \#1 - Changed Props

The real problem occurs if the **value** can be changed in the **ParentComponent**:

```jsx
import React, { useState, useEffect } from "react";

const ParentComponent = () => {
  const [value, setValue] = useState("Initial value");

  useEffect(() => {
    setTimeout(() => {
      setValue("Changed value");
    }, 1000);
  }, []);

  return <ChildComponent value={value} />;
};

const ChildComponent = ({ value }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return <input value={inputValue} onChange={handleChange} />;
};
```

In the above example, we pass a value that is changed after one second from "*Initial value*" to "*Changed value*".

If you run an application and check what value would end up in the **input** element after a second, you will notice that it is still "*Initial value*", even though it has changed in the parent component.

This happens because the **useState** hook initializes the state only once - when the component is rendered and is unable to capture further changes in the **value** prop, which is used as an argument.

#### \#2 - Duplicated Source Of Truth

The second drawback of this approach is a duplicated source of truth - **value** has already been defined in the state of the parent component, so why do we have to redefine it in the child component?

The general recommendation is to pick a single component to be considered as a single source of truth and avoid duplicating the state in other components.

## Summary