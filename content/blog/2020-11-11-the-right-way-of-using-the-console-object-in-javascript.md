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

Output:

![Console.log output](/img/screenshot-2020-11-11-at-11.29.png "Console.log output")

## console.warn(arg \[, arg2, ..., argN])

Outputs a warning message to the console:

```javascript
console.warn("Debugging...");

// ...

console.warn("End of debugging...");
```

Output:

![Console.warn output](/img/screenshot-2020-11-11-at-11.37.45.png "Console.warn output")

## console.error(arg \[, arg2, ..., argN])

Outputs an error message to the console:

```javascript
console.error("Debugging...");

// ...

console.error("End of debugging...")
```

Output:

![Console.error output](/img/screenshot-2020-11-11-at-11.40.49.png "Console.error output")