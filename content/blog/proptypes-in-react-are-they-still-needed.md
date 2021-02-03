---
title: PropTypes In React. Are They Still Needed?
tag:
  - React
promote: false
metaDescription: TypeScript - static type checker vs. PropTypes - runtime prop
  checker in React. Learn similarities, differences and find out what to use in
  your project.
teaser: One of the most important things when building React application is to
  make sure that the components receive correct props. Passing wrong props leads
  to bugs and unexpected behavior, so it's a good idea to warn developers about
  this as early...
date: 2021-02-03T08:03:01.538Z
---
One of the most important things when building React application is to make sure that the components receive correct props.

Passing wrong props leads to bugs and unexpected behavior, so it's a good idea to warn developers about this as early as possible.

There are a few different ways to prevent passing incorrect props to React components.

Probably the most popular is using **TypeScript** - a static type checker.

However, React provides us with another alternative option - **PropTypes**.

## PropTypes In React

**PropTypes** is a mechanism that checks the props passed to your component **at runtime**, makes sure that they are of a certain type, and warns you in the console if not (only in the development environment).

In previous versions of React, PropTypes were a part of the React library, in the latest releases it has been moved to a separate package called [prop-types](https://www.npmjs.com/package/prop-types).

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
import React, { Component } from "react";
import PropTypes from "prop-types";

const UserDetails = (props) => (
  /* Do something with the "props" */
);

Example.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  surname: PropTypes.string,
};
```

After defining PropTypes on a component - React will automatically validate them.

If you use this library without React, a function called `PropTypes.checkPropTypes` must be called manually.

## PropTypes Validators

*The complete list of available validators can be found at [documentation](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes), in the following section we will learn about the most common ones.*

Apart from the fact that the library already provides a set of validators, we can also create custom ones, which is a nice feature if you want to validate a complex type.

The list of the most common validators:

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

In the above list, props may be optional. 

If one of the props `prop1 ... prop11` is not passed to the component, we would not be notified.

We can add `isRequired` to the chain and make the prop required:

```jsx
ExampleComponent.propTypes = {
  prop1: PropTypes.number.isRequired,
};
```

If it is not passed - a warning will be displayed:

![PropTypes Warning](/img/screenshot-2021-02-02-at-16.10.11.png "PropTypes Warning")

## Custom Validators

One of the most common cases where the library's core validators fall short is when validating an email address:

```javascript
const emailValidator = (props, propName, componentName) => {
  const regex = /* Any reged to validate email */;
  
  if (!regex.test(props[propName])) {
    return new Error(`Invalid prop ${propName} passed to ${componentName}. Expected a valid email address.`);
  }
};

Component.propTypes = {
  email: emailValidator,
};
```

As you can see, the custom validator function takes three arguments:

* `props` - all props that are passed to the component
* `propName` - the name of the property to be validated
* `componentName` - the name of the component to display in an error message

The function should return an **Error** object if validation fails. Do not do any **console.warn** or **throw** as this will not work within **PropTypes.oneOfType**.

#### Custom Validators For PropTypes.arrayOf and PropTypes.objectOf

It is possible to create custom validators that work with **PropTypes.arrayOf** and **PropTypes.objectOf**.

They are called for each key in the array or object:

```javascript
const emailValidator = (propValue, key, componentName, location, propFullName) => {
  const regex = /* Any reged to validate email */;
  
  if (!regex.test(propValue[key])) {
    return new Error(`Invalid prop ${propFullName} passed to ${componentName}. Expected a valid email address.`);
  }
};

Component.propTypes = {
  emailList: PropTypes.arrayOf(emailValidator),
};
```

This validator takes another props than the previous one:

* `propValue` - an array or object to be validated
* `key` - the key of the current element in the iteration
* `componentName` - the name of the component to display in an error message
* `location` - the location of the validated data
* `propFullName` - the fully resolved name of the currently validated element to be displayed in an error message

Custom validator in action:

![PropTypes Custom Validator Warning](/img/screenshot-2021-02-02-at-16.12.45.png "PropTypes Custom Validator Warning")

## PropTypes vs. TypeScript

Both TypeScript and PropTypes are responsible for type checking, but they work differently and report errors in different ways.

TypeScript checks your code and reports errors at compile time (when you write code):

![TypeScript Warning](/img/screenshot-2021-02-02-at-16.17.10.png "TypeScript Warning")

PropTypes checks all props and displays warnings at runtime (when your code is executed, but only in development mode):

![PropTypes Warning](/img/screenshot-2021-02-02-at-16.10.11.png "PropTypes Warning")

## Do We Still Need PropTypes?

One of the most frequently asked questions is - "Do we still need PropTypes?".

The answer may not be obvious - it depends.

TypeScript may display an error message if an incorrect prop type is passed to the component, but if you are integrating with an external API or using an external library that does not have typings, you can not be 100% sure that you will always get the right data.

That's when PropTypes become useful - they display a warning in the console when unexpected data ends up in your component, making it much easier to debug where exactly an error is.

If you want to publish a package that can be consumed with plain JavaScript, you should include PropTypes so that consumers are notified when they pass incorrect arguments.

In summary, TypeScript typings are lost at runtime, so to get accurate information about them, use PropTypes.

## Generating PropTypes From TypeScript

Duplicating typings in both TypeScript and PropTypes is time-consuming and unnecessary.

Fortunately, there is a Babel plugin ([babel-plugin-typescript-to-proptypes](https://www.npmjs.com/package/babel-plugin-typescript-to-proptypes)) to generate React PropTypes from TypeScript interfaces or type aliases.

The only drawback is that you need to use Babel to use this functionality.

## Summary

One of the most difficult decisions developers have to make is related to the choice of libraries to be used in the project.

On the one hand, adding too many of them leads to a large package and slows down the application, but on the other hand, not using necessary libraries leads to an increase in development time.

When it comes to PropTypes and TypeScript, whether you need to use just one of them, both of them, or nothing at all depends a lot on the circumstances, but for the vast majority of projects, TypeScript is sufficient for a good start.