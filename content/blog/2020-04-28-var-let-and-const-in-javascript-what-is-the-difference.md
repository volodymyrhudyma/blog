---
title: Var, let and const in Javascript. What is the difference?
date: 2020-04-28T19:16:33.434Z
---
## You probably know "var" keyword

During a long time `var` keyword was a king in JavaScript world. You didn't yet have to bother about how to declare variable, but how to choose the perfect name for it.

```javascript
var userName = "John";
```

But using `var` keyword sometimes leads to unexpected issues especially if you are not familiar with all pitfalls. 

## \#1 pitfall

You should always remember that `var` is **globally** scoped in case if it is declared outside of the function and **locally/function** scoped if it is declared inside of the function body.

> **Scope** in JavaScript refers to the current context of code, which determines the accessibility of variables to JavaScript. The two types of scopeare **local** and **global**: Global variables are those declared outside of a block. Local variables are those declared inside of a block.

Globally scoped variable is accessible in the whole window. Locally/function scoped variable is accessible only within function body it was declared in.

> **Local scope** is also called function scope because local scope is created by functions in JavaScript.

In the following example we will create both global and local variable and point out differences between them:

```javascript
var globalVariable = "global";

function doSomething() {
  var localVariable = "local";
  
  // You can access localVariable in function's scope
  console.log(localVariable); // Prints "local"
  
  // You can access globalVariable everywhere in the code
  console.log(globalVariable); // Prints "global"
}

// Not available outside of the function ;(
console.log(localVariable); // Prints "ReferenceError: localVariable is not defined"

// Accessible ;)
console.log(globalVariable); // Prints "global"
```

## \#2 pitfall

Variables declared using `var` keyword can be re-declared and updated.

You can unintentionally redeclare variable and get unexpected result when accessing it in your code. Don't you feel like you should receive the following error in the next example: *Duplicate declaration "userName"?*

```javascript
var userName = "John";

var userName = "Andrew";

console.log(userName); // Prints "Andrew"
```

`var` variable can be re-declared in the same scope:

```javascript
var userName = "John";

userName = "Andrew";

console.log(userName); // Prints "Andrew"
```

It can be re-declared in another scope as well. While it is not a problem if you are doing it intentionally, sometimes you do not realize that this variable has been declared before:

```javascript
var userName = "John";

function changeUserName() {
  userName = "Andrew";
}

changeUserName();

console.log(userName); // Prints "Andrew"
```

## "Let" to rescue

`let` comes as an improvement for `var` since **ES2015(ES6)** came out. It is **block-scoped,** which means that the variable declared in a block is only available within that block.

> A block scope is the area within **if**, **switch** conditions or **for** and **while** loops. Generally speaking, whenever you see **{curly brackets}**, it is a block. In ES6, **const** and **let** keywords allow developers to declare variables in the block scope, which means those variables exist only within the corresponding block.

```javascript
var userName = "John";

if(userName === "John") {
  let age = 30;
  console.log(age) // Prints "30"
}

console.log(age) // Prints "ReferenceError: age is not defined"
```

As you can see, block-scoped `age` is not available outside of the `if` block.