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