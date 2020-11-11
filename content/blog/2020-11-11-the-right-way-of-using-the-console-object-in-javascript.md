---
title: The Right Way of Using the Console Object in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-11-13T08:54:06.414Z
---
In JavaScript, Console API gives access to the debugging console in the browser, which is used during software development to debug the produced code.

The API provides us with a bunch of methods we can use, but most developers are not aware of even half of them.

The most common one is, of course, `console.log(arg [, arg2, ..., agrN])` which is intended to print the message to the console.

Today we will learn the rest available methods and see how they can provide better debugging for the daily work.

## console.log(arg \[, arg2, ..., argN])

Outputs a message to the console. The message can be a simple string containing some information intended to help in debugging or any JavaScript Primitive value(s)/Object(s):

```javascript
console.log("Debugging...");

const user = {
  name: "John",
  surname: "Doe",
};

const getFullName = (user) => {
  return `${user.name} ${user.surname}`;
};

console.log("User: ", user);
console.log("Full name: ", getFullName(user));

console.log("End of debugging...");

```

Outputs:

![Console.log output](/img/screenshot-2020-11-11-at-11.29.55.png "Console.log output")