---
title: Hoisting in JavaScript
tag:
  - JavaScript
teaser: Hoisting is JavaScript's default behavior of moving declarations to the
  top of their scope. To begin with learning this mechanism, let's make sure we
  understand the differences between declaration**,** initialization and
  assignment...
date: 2020-04-30T18:10:27.744Z
---
## Hoisting, what is this?

> Hoisting is JavaScript's default behavior of moving declarations to the top of their scope.

To begin with learning this mechanism, let's make sure we understand the differences between **declaration, initialization** and **assignment.**

## Declaration

To declare variable means to register it in the corresponding scope:

```javascript
var a; // Declared

let a; // Declared

const a; // SyntaxError: Missing initializer in const declaration
```

**Important note:** `const` must be initialized with value at the time of definition.

## Initialization

To initialize variable means to allocate some space in the memory for it. 

Just after variable is declared, it is automatically initialized:

```javascript
var a; // Declared and automatically initialized

let a; // Declared and automatically initialized

const a; // SyntaxError: Missing initializer in const declaration
```

To fix an error `SyntaxError: Missing initializer in const declaration` we have to initialize `const` variable at the time of declaration:

```javascript
const a = 10; // The proper way
```

## Assignment

This is a step of assigning value to previously declared and initialized variable:

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

Do you know why we receive "undefined" instead of `ReferenceError: a is not defined`? 

Javascript hoisted variable declaration. This is how the above code is seen by an interpreter:

```javascript
var a;

console.log(a); // Prints "undefined"

a = 10;
```

Thanks to hoisting mechanism, we are allowed to use variables before they are declared. However, we have to be careful, because hoisted variables are initialized with `undefined`. 

Make sure to always declare and initialize variable before using it.

Variables are also hoisted in the function scope:

```javascript
function example() {
  console.log(a); // Prints "undefined"
  var a = 10;
};

example();
```

Interpretation:

```javascript
function example() {
  var a;
  console.log(a); // Prints "undefined"
  a = 10;
};

example();
```

**Important note:** In order to avoid unexpected behavior, do not access variable before you declare it.

## What about "let" and "const"?

As we remember from the [previous article](/2020-04-28-var-let-and-const-in-javascript-what-is-the-difference/), `let` and `const` are hoisted, but not initialized:

```javascript
console.log(a); // ReferenceError: a is not defined

let a = 10;

console.log(b); // ReferenceError: b is not defined

const a = 10;
```

## Function hoisting

Before we move to this section, let's remember how functions can be defined in JavaScript:

* **Function declaration** - defines a named function. Use `function` keyword followed by name. Function declaration is **hoisted:**

```javascript
printNumber(); // Prints "10"

function printNumber() {
  console.log(10);
};
```

* **Function expression** - defines a named or anonymous function. Function expression is **not hoisted:**

```javascript
printNumber(); // Uncaught ReferenceError: Cannot access 'printNumber' before initialization

const printNumber = function() {
  console.log(10);
};
```

* **Arrow function** - is short syntax for defining function expressions therefore it is **not hoisted:**

```javascript
printNumber(); // Uncaught ReferenceError: Cannot access 'printNumber' before initialization

const printNumber = () => {
  console.log(10);
};
```

## Order of precedence

**Variable assignments** take precedence over **function declaration**:

```javascript
function a(){
  console.log("Function a")
};

var a = "Variable a";

console.log(a); // Prints "Variable a"
```

**Function declarations** take precedence over **variable declaration**:

```javascript
function a(){
  console.log("Function a")
};

var a;

console.log(a); // Prints "Function a"
```

## Using "let" and "const"?

```javascript
function a(){
  console.log("Function a")
};

let a; // Duplicate declaration "a"


function b(){
  console.log("Function b")
};

const b; // SyntaxError: Identifier "b" has already been declared
```

It's pretty much the expected behavior, as you should always  remember to choose unique names for your variables and functions.

## Summary

Imaging JavaScript interpreter making 2 iterations over your code. Firstly, it moves all variable and function declarations to the top of their scope and lastly, it executes your code from top to bottom (making assignments, executing functions etc.).

Hoisting is often misunderstood concept even by experienced developers, so always be aware of it when writing JavaScript code.

* Hoisting is JavaScript's default behavior of moving declarations to the top of their scope
* Variable declaration - registering it in the corresponding scope
* Variable initialization - allocating some space in the memory for it
* Assignment to a variable - providing value to previously declared and initialized variable
* Variable assignments take precedence over function declaration
* Function declarations take precedence over variable declaration