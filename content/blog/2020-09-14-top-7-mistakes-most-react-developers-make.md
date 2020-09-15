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

```tsx
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

Notice what happens when the "**Mutable update**" button is clicked **once**. Basically... seems like nothing.

Then click on the "**Immutable update**" button and notice how the `count` has changed to `2`:

![Mutable vs Immutable state update](/img/mut-immut.gif "Mutable vs Immutable state update")

Obviously, we received `2` because the state has been updated two times: directly and via `setState` method.

Using `setState` rerenders the component, kicking off the process called reconciliation.

> **Reconciliation** is the process of updating DOM (Document Object Model) by making changes to the component based on the change in state.

You can think of `render` as of function that creates a tree of React elements.

When the state gets updated, it produces a different tree and React needs to figure out how to efficiently update the DOM to match the most recent tree.

The default created by the React for the example above:

```typescript
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

```javascript
{
  ...,
  props: {
    children: [
      ...,
      ...,
      {
        ...,
        props: {
          children: [
            "Count: ",
            1,
          ],
        },
        ...,
      },
    ],
  },
  ...,
}
```

There are some generic solutions to the given problem - transform one tree into another, however all of them have `O(N3)` complexity which makes then inefficient.

Imagine having to do 1 million comparisons to display 1000 elements. Far too expensive to be used in real projects.

That is why React implements a heuristic algorithm with `O(N)` complexity based on the following two assumptions:

* Two elements of different types will produce different trees
* The developer can hint at which child elements may be stable across different renders with a `key` prop

As you might have guessed, modifying the state directly will not trigger the reconciliation process, therefore would not re-render the component.

## Not batching updates

## Forgetting to bind function declaration

## Misunderstanding deep and shallow copies

## Not using "key" properly

## Omitting lazy loading

## Executing passed callbacks in render

## Summary