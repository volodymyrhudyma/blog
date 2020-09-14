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
      <Fragment>
        <Button onClick={this.handleMutableUpdate}>Mutable update</Button>
        <Button onClick={this.handleImmutableUpdate}>Immutable update</Button>
        <Text>Count: {this.state.count}</Text>
      </Fragment>
    );
  }
}

export default App;
```

Notice what happens when the "**Mutable update**" button is clicked **once**. Basically... seems like nothing.

Then click on the "**Immutable update**" button and notice how the `count` has changed to `2`:

![Mutable vs immutable state update](/img/mut-immut.gif "Mutable vs immutable state update")

Using `setState` rerenders the component, kicking off the process called reconciliation.

> **Reconciliation** is the process of updating DOM (Document Object Model) by making changes to the component based on the change in state.

// Explain reconciliation in-detail for the current example

As you might have guessed, modifying the state directly will trigger the reconciliation process, therefore would not re-render the component. 

## Not batching updates

## Forgetting to bind function declaration

## Misunderstanding deep and shallow copies

## Not using "key" properly

## Omitting lazy loading

## Executing passed callbacks in render

## Summary