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

Install PropTypes:

`yarn add prop-types`

Import PropTypes:

```javascript
// ES6
import PropTypes from "prop-types";

// CommonJS
const PropTypes = require("prop-types");
```

Use PropTypes:

```jsx
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const UserDetails = (props) => (
  /* Do something with the "props" */
);

Example.propTypes = {
  id: number,
  name: string,
  surname: string,
};
```

After defining PropTypes on a component - React will automatically validate them.

If you use this library without React, a function named `PropTypes.checkPropTypes` has to be called manually.

## PropTypes Validators

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
  
  // Limited to the specific of values
  prop8: PropTypes.oneOf([true, false, "true", "false"]),
  
  // Limited to the specific types
  prop9: PropTypes.oneOfType([
    PropType.bool,
    PropType.string,
  ]),
  
  // Limited to array of boolean values or strings
  prop10: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropType.bool,
      PropType.string
    ])
  ),
  
  // Limited to a specific shape
  prop11: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
  }),
};
```

The above list allows props to be optional. If any of the props `prop1 ... prop11` is not passed to component, we would not get notified.

We can add `isRequired` to the chain and make the prop required:

```jsx
Component.propTypes = {
  prop1: PropTypes.number.isRequired,
};
```

If it is not passed - a warning will be shown:

// WARNING IMAGE HERE

## Custom Validators

One of the most common cases, where the library's core validators might be not sufficient is validating an email address:

```javascript
const emailValidator = (props, propName, componentName) => {
  const regex = /* Any reged to validate email */;
  
  if (!regex.test(props[propName])) {
    return new Error(`Invalid prop `${propName}` passed to `${componentName}`. Expected a valid email address.`);
  }
};

Component.propTypes = {
  email: emailValidator,
};
```

As you see, the custom validator function takes three arguments:

* `props` - all props that are passed to the component
* `propName` - the name of the property to be validated
* `componentName` - the name of the component to be displayed in an error message

The function should return an **Error** object if the validation fails. 

Do not do any **console.warn** or **throw**, as this won't work inside **PropTypes.oneOfType**.

The above code in action:

// IMAGE HERE

#### Custom Validators For PropTypes.arrayOf and PropTypes.objectOf

It is possible to create custom validators that will work with **PropTypes.arrayOf** and **PropTypes.objectOf**.

They will be called for each key in the array or the object:

```javascript
const emailValidator = (propValue, key, componentName, location, propFullName) => {
  const regex = /^((([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})))?$/;
  
  if (!regex.test(propValue[key])) {
    return new Error(`Invalid prop `${propFullName}` passed to `${componentName}`. Expected a valid email address.`);
  }
};

Component.propTypes = {
  emailList: PropTypes.arrayOf(emailValidator),
};
```

This validator takes another props than the previous one:

* `propValue` - an array or object to be validated
* `key` - the key of the current item in iteration
* `componentName` - the name of the component to be displayed in an error message
* `location` - the location of the validated data
* `propFullName` - the fully resolved name of the currently validated item to be displayed in an error message

## Example Application With PropTypes

## Summary