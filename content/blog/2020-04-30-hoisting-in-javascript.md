---
title: Hoisting in JavaScript
date: 2020-04-30T18:10:27.744Z
---
##  Hoisting, what is this?

> Hoisting is JavaScript's default behavior of moving declarations to the top.

To begin with learning this mechanism, let's make sure we understand the differences between **declaration, initialization** and **assignment.**

## Declaration

To declare variable means to register it in the corresponding scope:

```javascript
var a; // Variable is declared in global scope
```

## Initialization

To initialize variable means to allocate some space in the memory for it. Just after variable is declared, it is automatically initialized.

## Assignment

This is a step of assigning value to previously declared and initialized variable.

```javascript
var a; // Declaration and initialization

a = 10; // Assignment;

// All in one
var a = 10;
```