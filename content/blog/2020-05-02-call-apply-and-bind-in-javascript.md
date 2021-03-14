---
title: Call, Apply And Bind In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: 'Call, apply and bind are all methods within the function
  prototype, basically doing the same thing: allow us to call a function with
  given "this" context and arguments, but in different ways.'
teaser: "\"Call\", \"apply\" and \"bind\" are all methods within the function
  prototype, basically doing the same thing: allow us to call a function with
  given \"this\" context and arguments, but in different ways. Let's see how to
  use them..."
date: 2020-05-02T10:53:21.451Z
---
In this post we are going to discuss some famous JavaScript methods: `call`, `apply` and `bind`, see how they work, what are they used for, and how to use them properly in order to get things working.

## Call, Apply And Bind

They are all methods within the function prototype, basically doing the same thing: allow us to call a function with given `this` context and arguments, but in different ways.

You can refer to [this article](/2020-05-02-understanding-this-in-javascript/) in order to learn more about `this` object in JavaScript.

## Call Or Function.prototype.call

`call` is used to immediately execute a function with given `this` context and arguments:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

function greet(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
};

greet.call(user, "Welcome", 10); // Prints "Welcome, John Doe, your table number is: 10"
```

As you can see, `call` function receives `user` as the first parameter, therefore it is the context. Second and third parameters are passed directly to the `greet` function.

## Apply Or Function.prototype.apply

`apply` behaves exactly the same way as `call`, with the only difference - it receives an array of the arguments as the second parameter:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

function getFullName(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
};

getFullName.apply(user, ["Welcome", 10]); // Prints "Welcome, John Doe, your table number is: 10"
```

Were you able to spot the difference?

## Bind Or Function.prototype.bind

The behavior of `bind` method is exactly the same as of `apply` with just only one difference. But it's really huge.

It is not executed immediately, but returns a **bound** function:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

function getFullName(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
};

const boundFunction = getFullName.bind(user, "Welcome", 10); // "bind" returns bound function

boundFunction(); // Prints "Welcome, John Doe, your table number is: 10"
```

We can pass arguments at the same time we execute `bind` method, as we did above or at the moment when we invoke the bound function:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

function getFullName(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
};

const boundFunction = getFullName.bind(user); // "bind" returns bound function

boundFunction("Welcome", 10); // Prints "Welcome, John Doe, your table number is: 10"
```

## Borrowing Methods

Sometimes it’s desirable to reuse a function or method on a different object other than the object or prototype it was defined. 

By using `call`, `apply` and `bind`, we can easily borrow methods from different objects without having to inherit from them.

## Borrowing Max From The Math Object

Imagine the following situation: you have an array of numbers and need to find a maximum number. You know that there is `Math.max` function that does exactly what we need, so why don't we use it? 

The problem is that `Math.max` does not accept an array, but numbers:

```javascript
Math.max(10, 20, 30, 1, 100); // "100"

const numbers = [10, 20, 30, 1, 100];

Math.max(numbers); // "NaN"
```

**`apply`** to rescue:

```javascript
const numbers = [10, 20, 30, 1, 100];

Math.max.apply(null, numbers); // "100"
```

We pass `null` as the first argument, because we don't really need to pass context. 

The second argument, our `numbers` array gets converted to arguments add will be accepted as a valid parameter for `Math.max` function.

## Borrowing Join And Filter From Array

```javascript
Array.prototype.join.call("abc", ","); // "a,b,c"

Array.prototype.filter.call("string1", function(val) {
    return val !== "1";
}).join(""); // "string"
```

As you can see it's cool to benefit from borrowing prototype methods, but there's one thing we can improve. 

We don't have to write `Array.prototype` each time we want to borrow something. We can benefit from **literals**.

## Using Literals

> **Literals** are used to represent values in JavaScript. These are fixed values, not variables, that you literally provide in your script

We can replace `Array.prototype` with `[]`:

```javascript
[].join.call("abc", ","); // "a,b,c"

[].filter.call("string1", function(val) {
    return val !== "1";
}).join(""); // "string"
```

The code above can be a little improved, so we wouldn't have to operate `[]` directly. 

We can store a reference to literal in the variable:

```javascript
const join = [].join;

join.call("abc", ","); // "a,b,c"


const filter = [].filter;

filter.call("string1", function(val) {
    return val !== "1";
}).join(""); // "string"
```

Continuing in the spirit of reducing verboseness, let’s borrow a method without having to write `call` and `apply` each time we want to use it:

```javascript
const boundJoin = Function.prototype.call.bind(Array.prototype.join);

boundJoin('abc', ","); // "a,b,c"


const boundFilter = Function.prototype.call.bind(Array.prototype.filter);

boundFilter("string1", function(val) {
    return val !== "1";
}).join(""); // "string"
```

**Important note:** it's totally fine to change method names from `boundJoin` and `boundFilter` to `join` and `filter`. Those example names are used just to remind that `bind` isn't executed immediately, but returns a new function.

## Summary

You should have a solid understanding of how `call`, `apply` and `bind` work by now. 

Those functions are often forgotten by developers so try to always keep them in mind and use if needed.

* `call` is used to immediately execute a function with given `this` context and arguments
* `apply` behaves exactly the same way as `call`, with the only difference - it receives an array of the arguments as the second parameter
* `bind` behaves exactly the same way as `apply`, but not gets executed immediately. It returns a **bound** function