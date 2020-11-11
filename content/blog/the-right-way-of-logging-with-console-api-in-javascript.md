---
title: The Right Way of Logging with Console API in JavaScript
tag:
  - JavaScript
metaDescription: Learn Console API in JavaScript, which gives access to the
  debugging console in the browser. One of the most popular methods is
  console.log - it prints the given arguments to the console, but it is not the
  best option for all cases.
teaser: In JavaScript, Console API gives access to the debugging console in the
  browser. It provides us with a bunch of methods we can use, but most
  developers are not aware of even half of them...
date: 2020-11-13T08:54:06.414Z
---
In JavaScript, Console API gives access to the debugging console in the browser, which is used during software development to debug the produced code.

The API provides us with a bunch of methods we can use, but most developers are not aware of even half of them.

The most common one is, of course, `console.log(arg [, arg2, ..., agrN])` which is intended to print the message to the console.

Today we will learn the rest available methods and see how they can provide better debugging for the daily work.

## console.log(arg \[, arg2, ..., argN])

Outputs a message to the console. 

The message can be a simple string containing some information intended to help in debugging or any JavaScript Primitive value(s)/Object(s):

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

## Styling logs

Sometimes you may want to display more fancy logs than the default ones, to be able to quickly find them among tons of other stuff.

It is possible by using a special delimiter `%c`.

You are not limited to using it only once in your logs, just remember how the styles are applied.

Text after the first delimiter is styled by the second argument, after the second - by the third and so on.

```javascript
console.log("Debugging...");

console.log(
  "This %cis %ca %cmessage", 
  "color: red; font-size: 1rem", 
  "color: blue; font-size: 1.5rem", 
  "color: green; font-size: 2rem"
);

console.log("End of debugging...");
```

Output:

![Console.log styling](/img/screenshot-2020-11-11-at-16.18.45.png "Console.log styling")

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

## console.countReset(\[label])

Resets the counter created with `console.count([label])` method:

```javascript
console.log('Debugging...');

const user = {
  name: 'John',
  surname: 'Doe',
};

const getFullName = (user) => {
  console.count();
  return `${user.name} ${user.surname}`;
};

const greet = (user) => {
  console.count("Greeting");
  return `Hello, ${user.name}`;
};

getFullName(user);
getFullName(user);

console.countReset();

getFullName(user);

greet(user);

console.countReset("Greeting");

greet(user);

console.log('End of debugging...');
```

Output:

![Console.countReset output](/img/screenshot-2020-11-11-at-15.20.01.png "Console.countReset output")

## console.assert(assertion, arg \[, arg2, ..., argN])

Outputs an error message to the console only if an assertion is **false**. If assertion is **true**, nothing happens:

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

The method accepts an argument which is optional and if passed, it is used as the group name, otherwise the group name defaults to the **console.group**.

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

## console.trace(\[message, ...args ])

Outputs a **Stack Trace** to the console. It shows the call path taken to reach the point at which you call this method.

The following arguments can be passed to the **console.trace** method:

* **message** that is printed on the top of the stack trace
* **any amount of data** to be added as substitution values in the message

```javascript
console.log("Debugging...");

const main = () => {
  const foo = () => {
    const bar = () => {
      // Pass a message
      // And random arguments
      console.trace("Trace", 0, 1, 2);
    };
    bar();
  };
  foo();
};

main();

console.log("End of debugging...");
```

Output:

![Console.trace output](/img/screenshot-2020-11-11-at-15.00.01.png "Console.trace output")

## console.table(data \[, columns])

Outputs a table to the console. 

The first argument is **required** and should be either Object or Array, the second one is optional and should be an Array of column names that should be included to the log.

Each column can be sorted by clicking on its label.

#### Array of Primitive values

```javascript
console.log("Debugging...");

const data = ["John", "Andrew"];

console.table(data);

console.log("End of debugging...");
```

Output:

![Console.table output](/img/screenshot-2020-11-11-at-15.10.01.png "Console.table output")

#### Array of compound types

```javascript
console.log("Debugging...");

const data = [["John", "Andrew"], ["Volvo", "Audi"]];

console.table(data);

console.log("End of debugging...");
```

Output:

![Console.table output](/img/screenshot-2020-11-11-at-15.11.43.png "Console.table output")

#### Object

```javascript
console.log("Debugging...");

const data = {
  name: "John",
  surname: "Doe",
};

console.table(data);

console.log("End of debugging...");
```

Output:

![Console.table output](/img/screenshot-2020-11-11-at-15.13.13.png "Console.table output")

#### Restricting object properties

```javascript
console.log("Debugging...");

const data = [
  {
    name: "John",
    surname: "Doe",
  }, 
  { 
    name: "Andrew", 
    surname: "Hopkins"
  }, 
];

console.table(data, ["surname"]);

console.log("End of debugging...");
```

Output:

![Console.table output](/img/screenshot-2020-11-11-at-15.15.17.png "Console.table output")

## console.time(\[label])

Starts a timer to measure the duration of a given operation. It receives an optional argument which sets the name of the timer, if specified, if not then **default** is used.

To stop the timer and print the elapsed time in milliseconds, call `console.timeEnd([label])`.

To get the amount of time passed at any given moment, call `console.timeLog([label])`.

You are allowed to run up to 10,000 timers simultaneously on a given page:

```javascript
console.log("Debugging...");

console.time();

for(let i = 0; i < 1000000; i++) {}

console.timeEnd();

console.log("End of debugging...");
```

Output:

![Console.time output](/img/screenshot-2020-11-11-at-16.05.18.png "Console.time output")

## Summary

The value of the JavaScript Console API can not be overestimated, it is extremely helpful to test if the code works as intended or to find and fix annoying bugs.

Many developers know only about `console.log` and use it everywhere, which is ok of course, but it becomes hard to find some specific logs if you have tons of them.

I hope you will use at least some of the methods in your daily work.