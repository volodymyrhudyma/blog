---
title: Improve Your Reducers With Immer
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-05-02T08:12:00.000Z
---
In React, state is treated as immutable and should never be modified directly, but either by using a helper function or overwriting the whole state object with a completely new one.

In some cases this may be frustrating, because of having to copy multiple nested levels of data to modify just a small part.

But there is a solution - using an [immer](https://immerjs.github.io/immer/), a package that allows you to work with immutable state in a more convenient way.

## Immer Overview

Immer provides a helper function that takes a state as a parameter and produces a draft state, which can be modified directly and then creates a new state object based on all applied changes.

Here is an image that shows exactly how the library works (taken from the [official documentation](https://immerjs.github.io/immer/)):

![Immer (taken from the official documentation)](/img/immer-4002b3fd2cfd3aa66c62ecc525663c0d.png "Immer (taken from the official documentation)")

To begin with, install the library:

`yarn add immer`

And import the **produce** function:

```javascript
import produce from "immer";
```

Its syntax is the following:

```javascript
// Basic
produce(currentState, producer: (draftState) => void): nextState

// Overload
produce((draftState, ..args) => nextState);
```

The basic produce receives current state as the first argument, a function that creates a draft state as the second and returns a next state.

It can be overloaded, which is intended to be used for [currying](/a-simple-guilde-to-currying-in-javascript/) and it receives a function as the only argument, which contains a draft state and any other arguments passed to the curried function.

The benefit of using an overloaded version is that you get a pre-bound producer that only needs a state to produce the value from.

## The Basic Example

## The Overloaded Example