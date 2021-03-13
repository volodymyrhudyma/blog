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

## What Is A Lexical Scope?

The **Lexical Scope** describes how the variables are resolved inside of the function.

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

const getFullName = initializeUser();

// Prints "John Doe"
console.log(getFullName());
```

Notice how we return the **getFullName** function **without executing it**.

It may not be obvious that this example works, but it actually does.

In some programming languages, the local variables within the function (like the **user** variable) exist only during the function execution time and are removed later.

Once the **initializeUser** function finishes executing, someone could have expected that the **user** variable will no longer be accessible, but obviously this is not the case in JavaScript.

**The reason this code works is that in JavaScript, accessing the variable outside of the immediate scope creates a Closure.**

According to the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript):

> A **Closure** is the combination of a function and the lexical environment within which that function was declared.