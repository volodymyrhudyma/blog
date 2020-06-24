---
title: Understanding "this" in JavaScript
tag:
  - JavaScript
teaser: "\"This\" is a special object in JavaScript that refers to an object it
  belongs to, its value is decided at the moment of code execution. How do you
  know what \"this\" refers to? It's simple, take a look at the following
  rules..."
date: 2020-05-02T08:28:11.982Z
---
## What is this?

It is a special object in JavaScript that refers to an object it belongs to. The value of `this` is decided at the moment of code execution.

## The value of this

How do you know what `this` refers to? It's simple, take a look at the following rules:

* By default, it refers to the global object. If you execute code in a browser, it will be equal to `window`:

```javascript
console.log(this); // Prints "Window"
```

* In a `function` it refers to the global object as well:

```javascript
function example() {
  console.log(this);
};

example(); // Prints "Window" if executed in browser
```

* In a `function` in **strict mode**, the value of it is `undefined`:

> **Strict Mode** was a new feature in ECMAScript 5 that allows you to place a program, or a function, in a “strict” operating context. This strict context prevents certain actions from being taken and throws more exceptions. The statement `"use strict"` instructs the browser to use the strict mode, which is a reduced and safer feature set of JavaScript.

```javascript
"use strict";

console.log(this); // Prints "undefined"

function example() {
  console.log(this);
};

example(); // Prints "undefined"
```

* In an event, it refers to an element that received an event:

```javascript
function handleClick(e) {
  console.log(this); // Refers to the "button" element
};

<button onclick="handleClick">
  Click me
</button>
```

* In the object method, it refers to an object instance:

```javascript
const person = {
  name: "John",
  surname: "Doe",
  getFullName: function() {
    console.log(this); // Refers to "person" object
  },
};

person.getFullName();
```

* `call` and `apply` can bind it to any object:

```javascript
const john = {
  name: "John",
  surname: "Doe",
  getFullName: function() {
    return this.name + " " + this.surname;
  },
};

const andrew = {
  name: "Andrew",
  surname: "Hopkins",
};

john.getFullName.call(andrew); // Prints "Adrew Hopkins"

john.getFullName.apply(andrew); // Prints "Adrew Hopkins"
```

* `bind` function can bind it to any object:

  *The reason, why we haven't included bind to the previous point is because bind returns a new function which can be called later with passed context. In case of call or apply, the function gets invoked immediately.*

```javascript
const fullName = john.getFullName.bind(andrew); // Prints nothing, has to be invoked

fullName(); // Prints "Adrew Hopkins", it remembers passed context
```

* inside fat arrow function it refers to the same object it's referring to outside of the function:

```javascript
const example = () => {
  console.log(this);
};

example(); // Prints "Window" in browser
```

```javascript
function parent() {
  const child = () => {
    console.log(this);
  };
  child();
};

parent(); // Still prints "Window" in browser
```

Tricky examples:

```javascript
const john = {
  name: "John",
  surname: "Doe",
  getFullName: function() {
    const lowerCaseFullName = () => {
      // This refers to "john" object
      return this.name.toLowerCase() + " " + this.surname.toLowerCase();
    };
    return lowerCaseFullName();
   },
};

john.getFullName(); // Prints "john doe"
```

In the example above since we're using function declaration, `this` is bound to the `john` object:

```javascript
const john = {
  name: "John",
  surname: "Doe",
  getFullName: () => {
    const lowerCaseFullName = () => {
      return this.name.toLowerCase() + " " + this.surname.toLowerCase();
    };
    return lowerCaseFullName();
   },
};

john.getFullName(); // TypeError: Cannot read property "name" of undefined
```

In this example, `this` is bound to the global object since `getFullName` is a fat arrow function.

## Summary

Using `this` keyword is a very tricky topic in JavaScript. 

Make sure to learn these simple rules and use them wisely to know which object `this` refers to in your code:

* By default, it refers to the global object. If you execute code in a browser, it will be equal to `window`
* In a function, it refers to the global object as well
* In a function in strict mode, the value of it is `undefined`
* In an event, it refers to an element that received an event
* In the object method, it refers to the object instance
* `call`, `apply` and `bind` can bind it to any object
* inside fat arrow function it refers to the same object it's referring to outside the function