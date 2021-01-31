---
title: What Are PropTypes In React And Are They Still Needed?
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-03T08:03:01.538Z
---
One of the most important things when building React application is to make sure that the components receive correct props.

Passing wrong props leads to bugs and unexpected behavior, so it is a good idea to warn developers about it as soon as possible.

There are a few different ways to prevent passing wrong props to React components, probably the most popular one is to use **TypeScript** - a static type checker.

However, React provides us with one more alternative way - **PropTypes**.

## PropTypes In React

**PropTypes** is a mechanism that checks props passed to your component **in the run-time**, ensures that they are of a specified type and warns you in the console if not (only in the development environment).

In earlier versions of React PropTypes were a part of React library, in the latest releases it was moved to a separate package named [prop-types](https://www.npmjs.com/package/prop-types).

After defining PropTypes on a component - React will automatically validate them.

If you use this library without React, a function named `PropTypes.checkPropTypes` has to be called manually.

## Basic Validators

*The full list of available validators can be found [documentation](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes), in the following section we will learn the most common ones.*

Apart from providing a bunch of validators out-of-the-box, the library allows us to create our own, custom ones, which is a nice feature if you want to validate a complex type.

The list of the most commonly used validators:

```jsx
Component.propTypes = {
  prop1: PropTypes.number,
  prop2: PropTypes.string,
  prop3: PropTypes.bool,
  prop4: PropTypes.func,
  prop5: PropTypes.array,
  prop6: PropTypes.object,
  prop7: PropTypes.any,
};
```

The above list allows props to be optional. If any of the props `prop1 ... prop7` is not passed to component, we would not get notified.

We can add `isRequired` to the chain and make the prop required. 

If it is not passed - a warning will be shown:

```jsx
Component.propTypes = {
  prop1: PropTypes.number.isRequired,
};
```