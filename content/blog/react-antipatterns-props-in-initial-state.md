---
title: "React Antipatterns: Props In Initial State"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/react-antipatterns-props-in-initial-state.jpg
teaser: // TEASER
date: 2021-08-22T08:23:43.429Z
---
In React, props and state are everywhere - they allow us to pass an information between components and manage the output of the component over time in response to different actions.

Separate usage of them is perfectly fine, but in some cases they are mixed, like:

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

const ParentComponent = () => {
  const [value] = useState("Initial value");

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

While there is nothing wrong with the first example, the second is suspicious.

If you are not sure why, grab a cup of coffee and keep reading.