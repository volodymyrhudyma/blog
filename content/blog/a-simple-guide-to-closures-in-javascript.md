---
title: A Simple Guide To Closures In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn all about Closures and Lexical Environment in JavaScript
  by reading this simple step-by-step guide.
shareImage: /img/closures-in-javascript.jpg
teaser: The concept of Closures is not an easy thing to wrap your head around.
  Many experienced developers still have trouble understanding it, let alone
  explaining it to a colleague or in an interview for a new job. Today we will
  learn it with..
date: 2021-03-15T17:13:28.656Z
---

The concept of Closures is not an easy thing to wrap your head around.

Many experienced developers still have trouble understanding it, let alone explaining it to a colleague or in an interview for a new job.

Today we will learn it with simple and clear explanations and a few practical examples.

## What Is A Closure?

A **Closure** is a combination of a function bundled with references to its surrounding state (Lexical Environment).

This definition sounds hard enough, so perhaps the following better illustrates the concept.

A **Closure** is a feature that provides access to the scope of an outer function from an inner function.

Before we continue with more definitions and examples, we need to understand how variables are resolved in JavaScript in nested functions.

## Lexical Environment

To fully grasp the whole concept of Closures, we need to know what Lexical Environment is and how it works.

In JavaScript, every block of code **{ ... }** inside curly braces and the whole script has an internal hidden associated object called Lexical Environment which consists of two parts:

- **Environment Record** - maps local variable names to variable values (this is where JavaScript stores variables)
- **Reference to the Outer Lexical Environment**

A **variable** that is defined is only a property of the Environment Record. To change it means to change the property of the Environment Record.

The following code:

```javascript
const number = 10
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

As the code executes, the Lexical Environment changes:

```javascript
let number

number = 10

number = 20
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

The above code shows how the Lexical Environment changes during the execution of the above code:

**Step 1:** When the script starts, the Lexical Environment is filled with all the variables we created in the **uninitialized** state. The variable is known to the engine, but cannot be referenced until it is declared.

**Step 2:** After declaring a variable with the **let** keyword, its value is **undefined**.

**Step** **3**: The variable contains a value.

**Step 4**: The variable changes a value.

#### Function declarations

Function declarations are fully initialized immediately:

```javascript
const hello = "Hello"

function displayGreeting(world) {
  return `${hello}, ${world}`
}
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

This behavior applies only to the Function Declarations, not to Function Expressions.

#### Outer Lexical Environment

At the beginning of a function call, a new Lexical Environment is created to store all local variables and parameters of the call:

```javascript
const hello = "Hello"

function displayGreeting(world) {
  return `${hello}, ${world}`
}

displayGreeting("World")
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

The local one has a reference to the global one via the **outer** field.

When the code tries to access the **hello** variable, the local Lexical Environment is searched first, then the outer one, and so on until we reach the global Lexical Environment.

If a variable is not found anywhere, this is a strict mode error (without **use strict**, an assignment to a non-existent variable will create a new global variable, preserving backward compatibility).

#### The Closure Example

Consider the following example of a Closure:

```javascript
const initializeCounter = () => {
  let count = 0

  return () => count++
}

const counter = initializeCounter()

// Prints "0"
console.log(counter())

// Prints "1"
console.log(counter())

// Prints "2"
console.log(counter())
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

When executing the **initializeCounter** function, we return a nested one-liner function that remembers the Lexical Environment in which it was created.

All functions have the hidden property called **\[[Environment]]**, which keeps a reference to the Lexical Environment they were created in.

So in our example the **counter.\[[Environment]]** has the reference to the **{ count: 0 }** Lexical Environment.

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

The state after executing the **counter** function:

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

Multiple calls to the **counter** function result in multiple updates to the **count** variable in the associated Lexical Environment.

#### Garbage Collection

Typically, a Lexical environment is removed from memory after the function is executed because there are no references to it.

However, if there is a nested function that is still accessible after the end of a function (exactly our case), then it has **\[[Environment]]** property that references the Lexical Environment, so it is not garbage-collected:

```javascript
const initializeCounter = () => {
  let count = 0

  return () => count++
}

// counter.[[Environment]] contains a reference to the
// Lexical Environment of the "initializeCounter" function
const counter = initializeCounter()
```

**Important Note:** The more often the **initializeCounter** function is called, the more Lexical Environments are held in memory.

Don't forget to clear the memory:

```javascript
let counter = initializeCounter()

// Your code

counter = null // Remove the Lexical Environment from the memory
```

## More Closure Examples

Consider the following example:

```javascript
const initializeUser = () => {
  const user = {
    name: "John",
    surname: "Doe",
  }

  const getFullName = () => {
    return `${user.name} ${user.surname}`
  }

  return getFullName
}

const result = initializeUser()

// Prints "John Doe"
console.log(result())
```

Notice how we return the **getFullName** function **without executing it**.

It may not be obvious that this example works, but it actually does.

In some programming languages, the local variables inside the function (like the **user** variable) exist only during the execution time of the function and are removed later.

Once the **initializeUser** function has finished executing, you might have expected the **user** variable ti no longer be accessible, but that's obviously, not the case in JavaScript.

**The reason this code works is that in JavaScript, accessing the variable outside of the local scope creates a Closure.**

If we assign a reference to the **getFullName** function to the **result** variable, the instance of the **getFullName** function maintains a reference to its Lexical Environment, within which the **user** variable still exists.

Consider another example:

```javascript
const add = x => y => x + y

const addOne = add(1)
const addTwo = add(2)

// Prints "11"
console.log(addOne(10))

// Prints "12"
console.log(addTwo(10))
```

The **add** function receives an **x** argument and returns a new function that takes an **y** argument and adds them together.

The two functions **add1** and **add2** are Closures, they have the same body definition but store different Lexical Environments.

## What Closures Are Used For?

Before the introduction of Classes in **ES6**, closures provided a way to create class-like structures that allowed us to emulate private methods.

This is known as the **Module Pattern** and allows us to write easily maintainable code with reduced namespace pollution and more reusability:

```javascript
const intializeCounter = () => {
  let count = 0
  const changeCount = value => (count += value)
  return {
    increment: () => {
      changeCount(1)
    },
    decrement: () => {
      changeCount(-1)
    },
    get: () => count,
  }
}

const counter = intializeCounter()

console.log(counter.increment())
// Prints "1"
console.log(counter.get())

console.log(counter.increment())
// Prints "2"
console.log(counter.get())

console.log(counter.decrement())
// Prints "1"
console.log(counter.get())
```

With Closures, we can also use functions to create other functions that add a specific value to their argument.

In this case, the parent function that enables this behaviour is known as a **Function Factory**.

With Function Factories, we can achieve a behaviour known as **Currying.**

To learn more about Currying, read this [simple guide](https://vhudyma-blog.eu/a-simple-guilde-to-currying-in-javascript/).

## Summary

The concept of Closures and how they work is not obvious and requires some knowledge of the internal workings of JavaScript.

I hope that this article was able to shed at least a little bit of light on this topic for you.

Be sure to play around with the examples and read some other articles as well to understand it better.
