---
title: Improve Your State Handling With Immer
tag:
  - React
promote: false
metaDescription: Learn how to improve state handling in React applications using
  immer - a library based on a copy-on-write mechanism.
shareImage: /img/immer-in-react.jpg
teaser: In React, state is treated as immutable and should never be modified
  directly, but either by using a helper function or by overwriting the entire
  state object with a completely new one. In some cases, this can be frustrating
  because you have to copy several nested levels of data to change only...
date: 2021-05-02T08:12:00.000Z
---
In React, state is treated as immutable and should never be modified directly, but either by using a helper function or by overwriting the entire state object with a completely new one.

In some cases, this can be frustrating because you have to copy several nested levels of data to change only a small part.

But there is a solution - using an [immer](https://immerjs.github.io/immer/), a package that allows you to work with immutable state in a more convenient way.

## Immer Overview

Immer provides a helper function that takes a state as a parameter and produces a draft state that can be modified directly, and then creates a new state object based on all applied changes.

Here is a picture showing exactly how the library works (taken from the [official documentation](https://immerjs.github.io/immer/)):

![Immer (taken from the official documentation)](/img/immer-4002b3fd2cfd3aa66c62ecc525663c0d.png "Immer (taken from the official documentation)")

It is based on the [copy-on-write](https://en.wikipedia.org/wiki/Copy-on-write) mechanism.

> Copy-on-write (COW), sometimes referred to as **implicit sharing** or **shadowing**, is a resource-management technique used in computer programming to efficiently implement a "duplicate" or "copy" operation on modifiable resources.

To begin with, install the library:

`yarn add immer`

And import the **produce** function:

```javascript
import produce from "immer";
```

The syntax is as follows:

```javascript
const recipe = (draftState, ...args?) => void;

// Basic
produce(initialState, recipe): nextState;

// Curried
produce(recipe) => (state, ...args?) => nextState;
```

The basic produce receives current state as its first argument, and a function that produces a draft state as the second and returns a next state.

It can be overloaded, which is intended to be used for [currying](/a-simple-guilde-to-currying-in-javascript/).

The curried version receives a function as its first argument, containing a draft state and any other arguments, and returns a new function that accepts a state and any other arguments, and then returns a next state.

The advantage of the overloaded version is that you get a pre-bound producer that only requires a state from which to generate the draft.

## The Basic Example

To better understand the concept, let's see a basic example of the use of immer:

```javascript
import produce from "immer"

const initialState = [
  {
    name: "John",
    surname: "Doe",
    age: 18,
  },
];

const nextState = produce(initialState, draftState => {
  draftState[0].age = 20;
  draftState.push({
    name: "Andrew",
    surname: "Hopkins",
    age: 16,
  });
});

/*
  [
    { name: "John", surname: "Doe", age: 20 },
    { name: "Andrew", surname: "Hopkins", age: 16 }
  ]
*/
console.log(nextState);
```

## The Curried Example

Since we know that the **produce** function has one overload, let's look at how it can be used:

```javascript
import produce from "immer"

const initialState = [
  {
    name: "John",
    surname: "Doe",
    age: 18,
  },
  {
    name: "Andrew",
    surname: "Hopkins",
    age: 16,
  },
];

const mapper = produce((draft, _index) => {
  draft.adult = draft.age >= 18;
  delete draft.age;
});

const result = initialState.map(mapper);

/*
  [
    { name: "John", surname: "Doe", adult: true },
    { name: "Andrew", surname: "Hopkins", adult: false }
  ]
*/
console.log(result);
```

## Refactoring A Reducer

One of the best places, but not the only one, to use immer are reducers in React.

Consider the following example, where we pass an array of products to the reducer and transform them into objects to be stored:

```javascript
const initialState = {
  products: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: {
          ...action.payload.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
          }, {}),
        },
      };
    }
    default:
      return state;
  }
};
```

Although this is a relatively simple reducer, it might take a while to understand what's going on here with all these spread operators and reduce stuff. 

Fortunately, immer allows you to simplify the above example a lot:

```javascript
import produce from "immer";

const initialState = {
  products: {},
};

export default produce((draftState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      action.payload.forEach((product) => {
        draftState.products[product.id] = product;
      });
      break;
    }
  }
}, initialState);
```

Note, that we don't have to handle the **default** case, since if producer does nothing, it returns the initial state unchanged.

## Refactoring Setting A State

Updating a state can also be simplified:

```javascript
// Standard way
updateUser = (name) => {
  this.setState(prevState => ({
    user: {
      ...prevState.user,
      name,
    },
  })),
};

// Using immer
updateUser = (name) => {
  this.setState(
    produce(draftState => {
      draft.user.name = name;
    })
  )),
};

// Using immer with hooks
updateUser = (name) => {
  setUser(
    produce(user => {
      user.name = name,
    }),
  );
};
```

## The Performance

One important thing worth mentioning is that using immer, in some cases, can significantly improve the performance of your React application.

Even if the reducer doesn't change anything in the state, it creates a new state object and the component that reads that object re-renders, since it is new, even though nothing was changed.

The application of immer prevents unnecessary re-renders in this case, as it is able to detect "no-op" changes and return an original state.

To learn more about performance, read [this section](https://immerjs.github.io/immer/performance) of the official documentation.

## Summary

In this article, we have become familiar with a great tool that allows better handling of immutable data.

It can be used either to refactor reducers that contain a lot of deep update logic, or to set state in a component.

We haven't covered many other features that immer ships with, like **patches**, **auto-freezing**, **typescript support**, etc.

To learn more, I highly recommend you to read the [official documentation](https://immerjs.github.io/immer/) and take this great and free [video course](https://egghead.io/courses/immutable-javascript-data-structures-with-immer).