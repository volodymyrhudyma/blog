---
title: Hoisting in JavaScript
date: 2020-04-30T18:10:27.744Z
---
## Hoisting, what is this?

> Hoisting is JavaScript's default behavior of moving declarations to the top of their scope.

To begin with learning this mechanism, let's make sure we understand the differences between **declaration, initialisation** and **assignment.**

## Declaration

To declare variable means to register it in the corresponding scope:

```javascript
var a; // Variable is declared in global scope
```

## Initialisation

To initialise variable means to allocate some space in the memory for it. Just after variable is declared, it is automatically initialised.

## Assignment

This is a step of assigning value to previously declared and initialised variable.

```javascript
var a; // Declaration and initialization

a = 10; // Assignment;

// All in one
var a = 10;
```

## Back to hoisting

Consider the following code:

```javascript
console.log(a); // Prints "undefined"

var a = 10;
```

Do you know why we receive "undefined" instead of "ReferenceError: a is not defined"? Javascript hoisted variable declaration. This is how the above code is seen by an interpreter:

```javascript
var a;

console.log(a); // Prints "undefined"

a = 10;
```

Thanks to hoisting mechanism, we are allowed to use variables before they are declared. However, we have to be careful, because hoisted variables are initialised with `undefined`. 

Make sure to always declare and initialise variable before using it.

Variables are also hoisted in the function scope:

```javascript
function example() {
  console.log(a); // Prints "undefined"
  var a = 10;
}

example();
```

Interpretation:

```javascript
function example() {
  var a;
  console.log(a); // Prints "undefined"
  a = 10;
}

example();
```

**Important note:** In order to avoid unexpected behavior, do not access variable before you declare it.

## What about `let` and `const`?

As we remember from the previous article, `let` and `const` are hoisted, but not initialized.

```javascript
console.log(a); // ReferenceError: a is not defined

let a = 10;

console.log(b); // ReferenceError: b is not defined

const a = 10;
```

## Function hoisting

Before we move to this section, let's remember how functions can be defined in JavaScript:

* **Function declaration** - defines a named function. Use `function` keyword followed by name. Function declaration is **hoisted**

  ```javascript
  printNumber(); // Prints "10"

  function printNumber() {
    console.log(10);
  }
  ```
* **Function expression** - defines a named or anonymous function. Function expression is **not hoisted**.