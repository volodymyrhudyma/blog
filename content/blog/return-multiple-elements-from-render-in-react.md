---
title: Return Multiple Elements From Render In React
tag:
  - React
promote: false
metaDescription: Learn how to return multiple elements from the render function
  in React components using Arrays and Fragments.
teaser: Since v16.0, React allows us to return multiple elements from the render
  function by wrapping them in an array. In previous versions, it was necessary
  to wrap multiple elements into a single parent, which resulted in...
date: 2021-01-06T07:59:13.503Z
---
Since v16.0, React allows us to return multiple elements from the **render** function by wrapping them in an array.

In previous versions, it was necessary to wrap multiple elements into a single parent, which resulted in an extra node appearing in the DOM tree.

## Return An Array

To return an array from the render function, you must remember to do the following:

* Provide a **key** for each element (Read my [previous article](/2020-06-21-what-is-key-in-react-and-why-do-we-need-it/) to learn everything about keys)
* Separate returned elements with commas (It is obvious, right?)
* Wrap all returned strings in quotes

Let's look at the example:

```jsx
// Can you spot what is wrong here?
const App = () => {
  return [
    <div>One</div>, 
    <div>Two</div>, 
    <div>Three</div>,
  ];
};
```

...and a warning is thrown in the console. Do you know why?

![Missing Keys Warning](/img/screenshot-2021-01-06-at-09.46.23.png "Missing Keys Warning")

You are absolutely right, we forgot to add **key** attributes, so let's fix that:

```jsx
// Yay, we added keys and it works
const App = () => {
  return [
    <div key={1}>One</div>,
    <div key={2}>Two</div>,
    <div key={3}>Three</div>,
  ];
};

// Want to return a string?
const App = () => {
  return [
    <div key={1}>One</div>,
    "Hello World",
    <div key={3}>Three</div>,
  ];
};
```

Inspect the DOM tree to make sure all our divs are not enclosed by an extra parent:

![DOM Tree](/img/screenshot-2021-01-06-at-09.46.36.png "DOM Tree")

And they are not (**root** is the default div, the React application is attached to).

## Arrays vs. Fragments

In one of the [previous articles](/fragments-in-react/) I talked about a Fragment that serves exactly the same purpose - allows you to group a list of children without adding extra nodes to the DOM.

You may be wondering, what is the difference between these two approaches?.

* Elements returned within a Fragment do not require key attributes
* Elements returned within a Fragment should not be separated by commas
* Strings returned within a Fragment do not need to be quoted

One of the examples above done using Fragment:

```jsx
// Return Fragment
const App = () => {
  return (
    <React.Fragment>
      <div key={1}>One</div>
      Hello World
      <div key={3}>Three</div>
    </React.Fragment>
  );
};
```

## Summary

There are two ways to skip adding an extra parent element to your DOM tree if you want to return multiple elements from a single component: You can either return an array or use Fragment.

These two approaches have minor differences, but there are really no advantages to using one over the other, both do their work perfectly fine, and choosing an appropriate one is a matter of preference.

Be sure to try them both.