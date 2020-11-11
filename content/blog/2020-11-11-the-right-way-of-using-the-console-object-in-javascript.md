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

![Console.error output](/img/screenshot-2020-11-11-at-11.40.49.png "t")

## console.count(\[label])

Outputs the number of times this call to count was performed.

It accepts an argument which is optional and if passed, it is prepended to the count, if not passed, it defaults to the **default**:

```javascript
console.log('Debugging...');

const user = {
  name: 'John',
  surname: 'Doe',
};

const getFullName = (user) => {
  // No label provided
  console.count();
  return `${user.name} ${user.surname}`;
};

const greet = (user) => {
  // With label
  console.count("Greeting");
  return `Hello, ${user.name}`;
};

getFullName(user);
getFullName(user);
getFullName(user);

greet(user);
greet(user);

console.log('End of debugging...');
```

Output:

![Console.count output](/img/screenshot-2020-11-11-at-14.26.31.png "Console.count output")

## console.assert(assertion, arg \[, arg2, ..., argN])

Outputs an error message to the console only if an assertion is **false**. Nothing happens in case of **true**:

```javascript
const greet = (name) => {
  console.assert(name === "John", "Only John was expected to come!");
  return `Hello, ${name}`;
}

// Error message will be shown
greet("Andrew");

// No error
greet("John");
```

Output:

![Console.assert output](/img/screenshot-2020-11-11-at-14.36.59.png "Console.assert output")

## console.group(\[label])

Creates a new inline group and indents it by an additional level until the `console.groupEnd()` is called.

The method accepts an argument which is optional and if passed, it is used as the group name, otherwise the group name defaults to **console.group**.

Nested groups can be used for better visualization of all logs printed to the console.

By default, all logs which belong to the specific group are expanded:

```javascript
console.log("Debugging...");

console.log("Level 1");

console.group();
console.log("Level 2");
console.log("Level 2");

console.group("GROUP");
console.log("Level 3");

console.groupEnd();

console.groupEnd();

console.log("End of debugging...");
```

Output:

![Console.group output](/img/screenshot-2020-11-11-at-14.44.10.png "Console.group output")

## console.groupCollapsed(\[label])

This method is identical to the `console.group([label])` with the only difference - all logs that belong to the group are collapsed by default:

```javascript
console.log("Debugging...");

console.log("Level 1");

console.groupCollapsed();
console.log("Level 2");
console.log("Level 2");

console.groupCollapsed("GROUP");
console.log("Level 3");

console.groupEnd();

console.groupEnd();

console.log("End of debugging...");
```

Collapsed output:

![Console.groupCollapsed output](/img/screenshot-2020-11-11-at-14.48.41.png "Console.groupCollapsed output")

Expand the first level by clicking on a disclosure button:

![Console.groupCollapsed output](/img/screenshot-2020-11-11-at-14.49.50.png "Console.groupCollapsed output")