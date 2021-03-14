---
title: The Right Way Of Logging With Console API In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn Console API in JavaScript that provides access to the
  debugging console in the browser. One of the most popular methods is
  console.log - it outputs the specified arguments to the console, but it is not
  the best option in all cases.
teaser: In JavaScript, the Console API provides access to the debugging console
  in the browser. It provides us with a number of methods that we can use, but
  most developers are not even aware of half of them...
date: 2020-11-12T08:54:06.414Z
---
In JavaScript, the **Console API** provides access to the debugging console in the browser, which is used during software development to debug the produced code.

The API provides us with a number of methods that we can use, but most developers are not even aware of half of them.

The most common is **console.log** which is intended to print the message to the console.

Today we will learn about the other available methods and see how they can be used for better debugging in the daily work.

## Standard Log

Syntax: `console.log(arg [, arg2, ..., argN])`

Output: Message. 

The message can be a simple string containing some information to help with debugging, or any JavaScript Primitive value(s)/Object(s):

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

## Styling Logs

Sometimes you may want to display more fancy logs than the default ones, so that you can be able to quickly find them among tons of other stuff.

This is possible by using a special delimiter `%c`.

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

## Warning Log

Syntax: `console.warn(arg [, arg2, ..., argN])`

Output: Warning message:

```javascript
console.warn("Debugging...");

// ...

console.warn("End of debugging...");
```

Output:

![Console.warn output](/img/screenshot-2020-11-11-at-11.37.45.png "Console.warn output")

## Error Log

Syntax: `console.error(arg, [, arg2, ..., argN])`

Output: Error message:

```javascript
console.error("Debugging...");

// ...

console.error("End of debugging...")
```

Output:

![Console.error output](/img/screenshot-2020-11-11-at-11.40.49.png "t")

## Count Executions

Syntax: `console.count([label])`

Output: Number of times the call to `count` was performed.

It accepts an argument that is optional, and if passed, it precedes the count, if not passed, **default** is used:

```javascript
console.log("Debugging...");

const user = {
  name: "John",
  surname: "Doe",
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

console.log("End of debugging...");
```

Output:

![Console.count output](/img/screenshot-2020-11-11-at-14.26.31.png "Console.count output")

## Reset Counter

Syntax: `console.countReset([label])`

Resets the counter created with `console.count([label])` method:

```javascript
console.log("Debugging...");

const user = {
  name: "John",
  surname: "Doe",
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

console.log("End of debugging...");
```

Output:

![Console.countReset output](/img/screenshot-2020-11-11-at-15.20.01.png "Console.countReset output")

## Assert And Log

Syntax: `console.assert(assertion, arg [, arg2, ..., argN])`

Output: Error message to the console only if an assertion is **false**. If assertion is **true**, nothing happens:

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

## Group Logs (Expanded)

Syntax: `console.group([label])`

Output: New inline group indented by an additional level until the `console.groupEnd()` is called.

The method accepts an argument that is optional, and if passed, it is used as the group name, otherwise the group name defaults to **console.group**.

Nested groups can be used to better visualize all logs printed to the console.

By default, all logs that belong to a specific group are **expanded** by default:

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

## Group Logs (Collapsed)

Syntax: `console.groupCollapsed([label])`

Output: Identical to the `console.group([label])` with the only difference - all logs that belong to the group are **collapsed** by default:

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

## Log A Stack Trace

Syntax: `console.trace([message, ...args ])`

Output: Stack Trace to the console.

It shows the call path that is taken to reach the point where this method is called.

The following arguments can be passed to the **console.trace** method:

* **message** that is printed on top of the stack trace
* **any amount of data** added as substitution values in the message

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

## Log A Table

Syntax: `console.table(data [, columns])`

Output: Table to the console. 

The first argument is **required** and should be either Object or Array, the second argument is optional and should be an Array of column names to be included in the log.

Each column can be sorted by clicking on its name.

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

## Log Execution Time

Syntax: `console.time([label])`

Starts the timer for measuring the duration of a specific process.

It gets an optional argument that specifies the name of the timer. If it is not provided, **default** is used.

To stop the timer and print the elapsed time in milliseconds, call `console.timeEnd([label])`.

To get the elapsed time passed at any given moment, call `console.timeLog([label])`.

It is allowed to run up to **10,000** timers simultaneously on a given page:

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

The value of the JavaScript Console API cannot be overestimated.

It is extremely useful for testing whether the code works as intended, or for finding and fixing annoying bugs.

Many developers only know `console.log` and use it everywhere, which is fine, but it becomes difficult to find some specific logs when you have tons of them.

I hope that you will use at least some of the methods in your daily work.