---
title: Var, let and const in Javascript. What is the difference?
date: 2020-04-28T19:16:33.434Z
---
**Important note:** We are not taking into an account **[hoisting](https://scotch.io/tutorials/understanding-hoisting-in-javascript)** in this article as it is more advanced JavaScript concept.

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
  
  console.log(localVariable); // Prints "local"
  
  console.log(globalVariable); // Prints "global"
}

// Not available outside of the function ;(
console.log(localVariable); // ReferenceError: localVariable is not defined

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

Variables, created using `let` keyword can be updated:

```javascript
let userName = "John";

userName = "Andrew";

console.log(userName); // Prints "Andrew"
```

But not re-declared:

```javascript
let userName = "John";

let userName = "Andrew"; // Duplicate declaration "userName"
```

However, if you declare variables with the same name but in different scopes, no error will be returned, because both variables are treated as different:

```javascript
let userName = "John";

function changeUserName() {
  let userName = "Andrew";
  
  console.log(userName); // Prints "Andrew"
}

changeUserName();

console.log(userName); // Prints "John"
```

## "Const" as an improvement

Just like variables declared using `let` keyword, `const` variables are **block-scoped**. 

The only difference between them is that `const` variables maintain constant values and can not be updated or re-declared (We are not taking into account `let` and `const` hoisting). It means we are not allowed to do this:

```javascript
const userName = "John";

userName = "Andrew"; // TypeError: Assignment to constant variable
```

And this:

```javascript
const userName = "John";

const userName = "Andrew"; // Duplicate declaration "userName"
```

And actually this is awesome. Once you declared your variable as `const` you are sure that it will not be updated anywhere in the code.

But... wait. Really? What about objects?

## \#1 pitfall

Consider the following example:

```javascript
const user = {
  name: "John",
  car: "Audi"
};

user.car = "Volvo";

console.log(user.car); // Prints "Volvo"
```

The main thing you should remember when using `const` is that properties of objects declared using this keyword **CAN BE UPDATED**.

> Consider using `Object.freeze()` in case you want to disable possibility to add new/change existing properties.

## Conclusion

To sum up, avoid using `var` keyword in favor of `let` and `const`. Use them wisely and know what and when each of them should be used.

Just in case you missed something:

`var` - **globally** or **locally**/**function** scoped. Can be updated and re-declared. Hoisted to the top. Initialized with `undefined`.

`let` - **block** scoped. Can be updated, but NOT re-declared. Hoisted to the top. NOT initialized.

`const` - **block** scoped. Can NOT be updated and re-declared. Hoisted to the top. NOT initialized.