---
title: Top 7 Mistakes Most React Developers Make
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-09-16T16:26:17.605Z
---
## Direct state modification

Every developer who starts working with React is being taught that the state should not be modified directly.

But what are the reasons behind it? What happens if the state is directly modified?

Consider the following example:

```jsx
import React, { Component, Fragment } from 'react';

import { Button, Text } from './styled';

class App extends Component {
  state = {
    count: 0,
  };

  handleMutableUpdate = () => {
    this.state.count = this.state.count + 1;
  };

  handleImmutableUpdate = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleMutableUpdate}>Mutable update</button>
        <button onClick={this.handleImmutableUpdate}>Immutable update</button>
        <div>Count: {this.state.count}</div>
      </>
    );
  }
}

export default App;
```

Notice what happens when the "**Mutable update**" button is clicked **once**.

Nothing?

Then click on the "**Immutable update**" button and notice how the `count` has changed to `2`:



![Mutable vs Immutable state update](/img/mut-immut.gif "Mutable vs Immutable state update")



Obviously, we received `2` because the state has been updated two times: directly and via `setState` method.

Using `setState` rerenders the component, kicking off the process called reconciliation.

> **Reconciliation** is the process of updating DOM (Document Object Model) by making changes to the component based on the change in state.

You can think of `render` as of function that creates a tree of React elements.

When the state gets updated, it produces a different tree and React needs to figure out how to efficiently update the DOM to match the most recent tree.

The default created by the React for the example above:

```jsx
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {
    children: [
      {
        $$typeof: Symbol(react.element),
        key: null,
        props: {
          children: "Mutable update",
          onClick: Function,
        },
        ref: null,
        type: "button",
      },
      {
        $$typeof: Symbol(react.element),
        key: null,
        props: {
          children: "Immutable update",
          onClick: Function,
        },
        ref: null,
        type: "button",
      },
      {
        $$typeof: Symbol(react.element),
        key: null,
        props: {
          children: [
            "Count: ",
            0,
          ],
        },
        ref: null,
        type: "div",
      },
    ],
  },
  ref: null,
  type: Symbol(react.fragment),
}
```

This is how the new tree looks like, after clicking on the "**Immutable update**" button (it remained the same except for the element with a type of "**div**"):

```jsx
// The structure is the same, just this child element slightly changed
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {
    children: [
      "Count: ",
      1,
    ],
  },
  ref: null,
  type: "div",
},
```

The problem to be solved: **transform one tree into another most efficiently**.

There are some generic algorithms that solve the given problem, however, all of them have `O(N3)` complexity which makes them inefficient.

Imagine having to do 1 million comparisons to display 1000 elements. 

Far too expensive to be used in real projects.

That is why React implements a heuristic algorithm with `O(N)` complexity based on the following two assumptions:

1. **Two elements of different types will produce different trees**

For example, when the root elements have different types, React will tear down old tree an build a new one from scratch:

```jsx
<div>
  <MyComponent />
<div>
  
<span>
  <MyComponent />
<span>
  
<MyParent>
  <MyComponent />
</MyParent>
```

Old `MyComponent` will be destroyed and **destroy** lifecycle hook will be executed and a new one will be re-mounted executing **mount** hook even though nothing related to it has changed.

If there were any more child components, they all would also be destroyed and re-mounted.

When the DOM elements have the same type, React goes through their attributes and only updates the changed ones:

```jsx
<div className="parent" />
  
<div className="child" />
```

React knows to only modify `className`.

When the Component elements have the same type, the instance stays the same in order to maintain the state across the renders.

React updates the props of the underlying component instance to match the new element and calls the update lifecycle hook on it.

Then, the `render` method is called and the diff algorithm recurses.

When recursing on children of a DOM node, React iterates over both lists of children simultaneously and creates a mutation if any difference has been found.

For example, adding an element to the end of the list is efficient:

```jsx
<ul>
  <li>One</li>
  <li>Two</li>
</ul>

<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

React will match the first two elements and insert the third one.

But adding an element at the beginning or in the middle has worst performance:

```jsx
<ul>
  <li>One</li>
  <li>Two</li>
</ul>

<ul>
  <li>Three</li>
  <li>One</li>
  <li>Two</li>
</ul>
```

React will mutate every `li` element instead of realizing that two of them can be kept.

Solving this issue is the topic of the next point.

 **   2. The developer can hint at which child elements may be stable across different renders with a `key` prop**

React supports `key` attribute, which is used by the library to match children in the original tree with children in the subsequent tree:

```jsx
<ul>
  <li key="one">One</li>
  <li key="two">Two</li>
</ul>

<ul>
  <li key="three">Three</li>
  <li key="one">One</li>
  <li key="two">Two</li>
</ul>
```

Now React knows that the elements with the keys "**one**" and "**two**" have just changed their position and the element with the key "**three**" is the new one.

As you might have guessed, modifying the state directly will not trigger the whole reconciliation process, therefore would not re-render the component.

## Not batching updates

## Forgetting to bind function declaration

## Misunderstanding deep and shallow copies

## Not using "key" properly

## Omitting lazy loading

## Executing passed callbacks in render

## Summary