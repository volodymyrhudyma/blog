---
title: A Simple Guide To Closures In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: META
teaser: TEASER
date: 2021-03-14T17:13:28.656Z
---
The concept of closures is not an easy thing to wrap your head around. 

A lot of experienced developers still struggle to understand it, let alone explaining to a colleague or an interview for a new job.

Today we will learn it with simple and clear explanations and a lot of practical examples.

## What Is A Closure?

A **Closure** is a combination of a function bundled together with references to its surrounding state (Lexical Environment).

That definition sounds hard enough, so maybe the following one illustrates it better.

A **Closure** is a feature that gives access to an outer function's scope from an inner function.

Before proceeding with further definitions and examples, we need to understand how variables are resolved in JavaScript in nested functions.

This is described by the concept named **Lexical Scoping**.

## What Is A Lexical Scoping?

**Lexical Scoping** describes how the variables are resolved inside of the function.

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
  
  return getFullName();
};


// Prints "John Doe"
console.log(initializeUser());
```

The **initializeUser** function declares the **user** variable in its scope and the inner **getFullName** function has an access to that variable.

Nested functions have access to the variables declared in the outer scope.

The scope of variable is defined by its position in the code. 

To resolve variables, JavaScript starts at the innermost scope (**getFullName** function) and searches upwards until it finds it.

If the variable is not found, an error is returned:

```javascript
const initializeUser = () => {
  
  const getFullName = () => {
    return `${user.name} ${user.surname}`;
  };
  
  return getFullName();
};

// ReferenceError: user is not defined
console.log(initializeUser());
```

If we declare the **user** variable in the global scope, it will easily be resolved:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

const initializeUser = () => {
  
  const getFullName = () => {
    return `${user.name} ${user.surname}`;
  };
  
  return getFullName();
};

// Prints "John Doe"
console.log(initializeUser());
```

## A Closure Example

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

const returnFunc = initializeUser();

// Prints "John Doe"
console.log(returnFunc());
```

Notice how we return the **getFullName** function **without executing it**.

It may not be obvious that this example works, but it actually does.

In some programming languages, the local variables within the function (like the **user** variable) exist only during the function execution time and are removed later.

Once the **initializeUser** function finishes executing, someone could have expected that the **user** variable will no longer be accessible, but obviously this is not the case in JavaScript.

**The reason this code works is that in JavaScript, accessing the variable outside of the immediate scope creates a Closure.**

According to the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript):

> A **Closure** is the combination of a function and the lexical environment within which that function was declared.

Getting back to the above example, when we assign a reference to the **getFullName** function to the **returnFunc** variable, the instance of **getFullName** function maintains a reference to its Lexical Environment, within which the **user** variable still exists.

Consider another example:

```javascript
const add = x => y => x + y;

const add1 = add(1);
const add2 = add(2);

// Prints "11"
console.log(add1(10));

// Prints "12"
console.log(add2(10));
```

The **add** function receives an **x** argument and returns a new function that takes an **y** argument and adds them together.

Both, **add1** and **add2** functions are closures, they share the same body definition, but store different Lexical Environments.

## Lexical Environment

In order to fully understand the wholce concept of Closures, we need to understand what is a Lexical Environment and how it works.

In JavaScript, ecery block of code **{ ... }** within curly braces and the whole script have an internal hidden associated object that is called Lexical Environment which consists of two parts:

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
    number: 10,
  },
  outer: null,
}
```

The code above demonstrates how the Lexical Environment changes while executing the code above:

**Step 1:** When the script starts, the Lexical Environment is filled with all variables we created in the **uninitialized** state. The variable is known to the engine, but can't be referenced until declared.

**Step 2:** After declaring a variable with the **let** keyword, its value becomes undefined.

**Step** **3**: Variable contains a value.

**Step 4**: Variable changes a value.