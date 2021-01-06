---
title: Return Multiple Elements From Render In React
tag:
  - React
promote: false
metaDescription: Learn how to return multiple elements from the render function
  in React components by using Arrays and Fragments.
teaser: Since the v16.0, React allows us to return multiple elements from the
  render function by wrapping them into an array. In earlier versions, it
  required us to wrap multiple elements in a single parent...
date: 2021-01-06T07:59:13.503Z
---
Since the v16.0, React allows us to return multiple elements from the **render** function by wrapping them into an array.

In earlier versions, it required us to wrap multiple elements in a single parent.

## Return An Array

To return an array from the render function, you must remember to do the following:

* Provide a **key** for each element (Refer to my [previous article](/2020-06-21-what-is-key-in-react-and-why-do-we-need-it/) to learn everything about keys)
* Separate returned elements with commas (Obvious one, right?)
* Wrap all returned strings in quores

Let's see an example:

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

...and it does not work. Do you already know why?

![Missing Keys Warning](/img/screenshot-2021-01-06-at-09.17.02.png "Missing Keys Warning")

You are absolutely right, we missed to add **key** attributes, so let's fix that:

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

And let's inspect the DOM tree to make sure that all our divs are not wrapped in an extra parent element:

![DOM Tree](/img/screenshot-2021-01-06-at-09.18.37.png "DOM Tree")

And they are not (**root** is the default div, the React application is attached to).

## Arrays vs. Fragments

In one of the [previous articles](/fragments-in-react/), I was talking about a Fragment that serves the exact same purpose - lets you group a list of children without adding extra nodes to the DOM.

You may ask: "What is the difference between these two approaches?".

* Elements returned within Fragment do not require key attributes
* Elements returned within Fragment should not be separated by commas
* Strings returned within Fragment do not have to be wrapped in quotes

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

There are two ways of skipping adding an extra parent element to your DOM tree when you want to return multiple elements from a single component: you can either return an array or use Fragment.

These two approaches have minor differences, but there are really no benefits in using one over another, they both do their work perfectly fine, and choosing an appropriate one is a matter of preference.

Make sure to try both of them.