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