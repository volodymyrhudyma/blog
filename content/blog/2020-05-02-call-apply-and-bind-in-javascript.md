---
title: call, apply and bind in Javascript
date: 2020-05-02T10:53:21.451Z
---
In this post we are going to discuss some famous JavaScript methods: `call`, `apply` and `bind`, see how they work, what are they used for and how to use them properly in order to get things working.

## Call, apply and bind

They are all methods within the function prototype, basically doing the same thing: allow us to call a function with given `this` context and arguments, but in a different ways.

You can read [this article](/2020-05-02-understanding-this-in-javascript/) in order to learn more about `this` object in JavaScript.

## Call or Function.prototype.call

Call is used to immediately execute function with given `this` context and arguments.

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

function greet(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
}

greet.call(user, "Welcome", 10); // Prints "Welcome, John Doe, your table number is: 10"
```

As you can see, `call` function receives `user` as the first parameter, therefore it is the context. Second and third parameters are passed directly to the `greet` function.

## Apply or Function.prototype.apply

`apply` behaves exactly the same way as `call`, with the only difference: it receives an array of the arguments as the second parameter.

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

function getFullName(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
}

getFullName.apply(user, ["Welcome", 10]); // Prints "Welcome, John Doe, your table number is: 10"
```

Were you able to spot the difference?

## Bind of Function.prototype.bind

The behavior of `bind` method is exactly the same as of `apply` with just only one difference. But it's really huge.

It is not executed immediately, but returns bound function.

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

function getFullName(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
}

const boundFunction = getFullName.bind(user, "Welcome", 10); // "bind" returns bound function

boundFunction(); // Prints "Welcome, John Doe, your table number is: 10"
```

We can pass arguments at the same time we execute `bind` method, as we did above or at the moment when we invoke bound function.

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

function getFullName(welcomeText, tableNumber) {
  return welcomeText + ", " + this.name + " " + this.surname + ", your table number is: " + tableNumber;
}

const boundFunction = getFullName.bind(user); // "bind" returns bound function

boundFunction("Welcome", 10); // Prints "Welcome, John Doe, your table number is: 10"
```