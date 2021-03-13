---
title: A Simple Guide To Closures In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn everything about Closures and Lexical Environment in
  JavaScript by reading this simple step-by-step guide.
shareImage: /img/closures-in-javascript.jpg
teaser: The concept of Closures is not an easy thing to wrap your head around. A
  lot of experienced developers still struggle to understand it, let alone
  explaining to a colleague or an interview for a new...
date: 2021-03-15T17:13:28.656Z
---
The concept of Closures is not an easy thing to wrap your head around. 

A lot of experienced developers still struggle to understand it, let alone explaining to a colleague or an interview for a new job.

Today we will learn it with simple and clear explanations and a lot of practical examples.

## What Is A Closure?

A **Closure** is a combination of a function bundled together with references to its surrounding state (Lexical Environment).

That definition sounds hard enough, so maybe the following one illustrates it better.

A **Closure** is a feature that gives access to an outer function's scope from an inner function.

Before proceeding with further definitions and examples, we need to understand how variables are resolved in JavaScript in nested functions.

## Lexical Environment

In order to fully understand the whole concept of Closures, we need to understand what is a Lexical Environment and how it works.

In JavaScript, every block of code **{ ... }** within curly braces and the whole script has an internal hidden associated object that is called Lexical Environment which consists of two parts:

* **Environment Record** - maps local variable names to variable values (this is where JavaScript stores variables)
* **Reference to the Outer Lexical Environment**

A **variable** that is defined is just a property of the Environment Record. Changing it means changing the property of the Environment Record.

The following code:

```javascript
const number = 10;
```

Corresponds to the following Lexical Environment:

```javascript
{
  environmentRecord: {
    number: 10,
  },
  outer: null,
}
```

This is **Global Lexical Environment**. It has no **outer** reference.

As the code is being executed, the Lexical Environment changes:

```javascript
let number;

number = 10;

number = 20;
```

```javascript
// Step 1
{
  environmentRecord: {
    number: <uninitialized>,
  },
  outer: null,
}

// Step 2
{
  environmentRecord: {
    number: undefined,
  },
  outer: null,
}

// Step 3
{
  environmentRecord: {
    number: 10,
  },
  outer: null,
}

// Step 4
{
  environmentRecord: {
    number: 20,
  },
  outer: null,
}
```

The code above demonstrates how the Lexical Environment changes while executing the code above:

**Step 1:** When the script starts, the Lexical Environment is filled with all variables we created in the **uninitialized** state. The variable is known to the engine, but can't be referenced until declared.

**Step 2:** After declaring a variable with the **let** keyword, its value becomes **undefined**.

**Step** **3**: Variable contains a value.

**Step 4**: Variable changes a value.

#### Function declarations

Function declarations are instantly fully initialized:

```javascript
const hello = "Hello";
  
function displayGreeting(world) {
  return `${hello}, ${world}`;
};
```

```javascript
// Step 1
{
  environmentRecord: {
    hello: <uninitialized>,
    displayGreeting: Function,
  },
  outer: null,
}
```

This behavior only applies to the Function Declarations, not Function Expressions.

#### Outer Lexical Environment

At the beginning of a function call, a new Lexical Environment is created to store all local variables and parameters of the call:

```javascript
const hello = "Hello";
  
function displayGreeting(world) {
  return `${hello}, ${world}`;
};

displayGreeting("World");
```

```javascript
{
  environmentRecord: {
    world: "World",
  },
  outer: {
    environmentRecord: {
      hello: "Hello",
      displayGreeting: Function,
    },
    outer: null,
  },
}
```

During the execution process, we have two Lexical Environment: local and global.

The local one has a reference to the global via **outer** field.

When the code tries to access the **hello** variable, the local Lexical Environment is searched first, then the outer one, and so on, until we reach the global Lexical Environment.

If a variable is not found anywhere, that’s an error in strict mode (without use strict, an assignment to a non-existing variable creates a new global variable, preserving the backward compatibility).

#### The Closure Example

Consider the following example of a Closure:

```javascript
const initializeCounter = () => {
  let count = 0;

  return () => count++;
};

const counter = initializeCounter();

// Prints "0"
console.log(counter());

// Prints "1"
console.log(counter());

// Prints "2"
console.log(counter());
```

We have two Lexical Environments:

```javascript
{
  // Lexical Environment of the "initializeCounter" function
  environmentRecord: {
    count: 0,
  },
  outer: {
    // Global Lexical Environment
    environmentRecord: {
      counter: undefined,
      initializeCounter: Function,
    },
    outer: null,
  },
}
```

During the execution of the **initializeCounter** function, we return a nested one-liner function that remembers the Lexical Environment it was created in.

All functions have the hidden property named **\[[Environment]]**, which keeps the reference to the Lexical Environment they were created in.

So, in our example the **counter.\[[Environment]]** has the reference to the **{ count: 0 }** Lexical Environment.

When the **counter** function is called, a new Lexical Environment is created for that call and its outer reference is taken from the **counter.\[[Environment]]**:

```javascript
{
  // Lexical Environment of the "counter" function
  environmentRecord: {},
  outer: {
    // Lexical Environment of the "initializeCounter" function
    environmentRecord: {
      count: 0,
    },
    outer: {
      // Global Lexical Environment
      environmentRecord: {
        counter: undefined,
        initializeCounter: Function,
      },
      outer: null,
    },
  },
}
```

Now when JavaScript searches for the **count** variable, it goes through the local environment, which is empty, and then searches through the references and eventually finds it.

**When we update the variable, it is updated in the Lexical Environment, where it belongs.**

The state after the execution of a **counter** function:

```javascript
{
  // Lexical Environment of the "counter" function
  environmentRecord: {},
  outer: {
    // Lexical Environment of the "initializeCounter" function
    environmentRecord: {
      // "count" variable is updated here
      count: 1,
    },
    outer: {
      // Global Lexical Environment
      environmentRecord: {
        counter: undefined,
        initializeCounter: Function,
      },
      outer: null,
    },
  },
}
```

Calling the **counter** function multiple times leads to updating the **count** variable multiple times in the Lexical Environment it belongs to.

#### Garbage Collection

Typically, a Lexical environment is removed from the memory after the function executes, because there are no references to it.

However, if there’s a nested function that is still reachable after the end of a function (exactly our case), then it has **\[[Environment]]** property that references the Lexical Environment, therefore it is not garbage-collected:

```javascript
const initializeCounter = () => {
  let count = 0;

  return () => count++;
};

// counter.[[Environment]] contains a reference to the
// Lexical Environment of the "initializeCounter" function
const counter = initializeCounter();
```

**Important Note:** the more times **initializeCounter** function will be created, the more Lexical Environments will be kept in memory.

Do not forget to clean the memory:

```javascript
let counter = initializeCounter();

// Your code

counter = null; // Remove the Lexical Environment from the memory
```

## More Closure Examples

Consider the following example:

```javascript
const initializeUser = () => {
  const user = {
    name: "John",
    surname: "Doe",
  };

  const getFullName = () => {
    return `${user.name} ${user.surname}`;
  };
  
  return getFullName;
};

const result = initializeUser();

// Prints "John Doe"
console.log(result());
```

Notice how we return the **getFullName** function **without executing it**.

It may not be obvious that this example works, but it actually does.

In some programming languages, the local variables within the function (like the **user** variable) exist only during the function execution time and are removed later.

Once the **initializeUser** function finishes executing, someone could have expected that the **user** variable will no longer be accessible, but obviously, this is not the case in JavaScript.

**The reason this code works is that in JavaScript, accessing the variable outside of the local scope creates a Closure.**

When we assign a reference to the **getFullName** function to the **result** variable, the instance of **getFullName** function maintains a reference to its Lexical Environment, within which the **user** variable still exists.

Consider another example:

```javascript
const add = x => y => x + y;

const addOne = add(1);
const addTwo = add(2);

// Prints "11"
console.log(addOne(10));

// Prints "12"
console.log(addTwo(10));
```

The **add** function receives an **x** argument and returns a new function that takes an **y** argument and adds them together.

Both, **add1** and **add2** functions are Closures, they share the same body definition but store different Lexical Environments.

## What Closures Are Used For?

Prior to the introduction of Classes in **ES6**, closures provided a way of creating class-like structures, allowing us to emulate private methods.

This is known as the **Module Pattern** and it allows us to write easily maintainable code with reduced namespace pollution and more reusability:

```javascript
const intializeCounter = () => {
  let count = 0;
  const changeCount = (value) => count += value;
  return {
    increment: () => {
      changeCount(1);
    },
    decrement: () => {
      changeCount(-1);
    },
    get: () => count,
  }
}

const counter = intializeCounter();

console.log(counter.increment());
// Prints "1"
console.log(counter.get());

console.log(counter.increment());
// Prints "2"
console.log(counter.get());

console.log(counter.decrement());
// Prints "1"
console.log(counter.get());
```

Closures also allow us to use functions to create other functions that add a specific value to their argument. 

In this case, the parent function allowing this behaviour is known as a **Function Factory**.

Using function factories, we are able to achieve a behaviour known as **Currying.**

To learn more about Currying, read this [simple guide](https://www.vhudyma-blog.eu/a-simple-guilde-to-currying-in-javascript/).

## Summary

The concept of Closures and how they work is not obvious and requires some knowledge of how JavaScript works internally.

I hope that this article shred at least a tiny bit of light on this topic to you.

Make sure to play around with the examples and read some other articles as well to understand it better.