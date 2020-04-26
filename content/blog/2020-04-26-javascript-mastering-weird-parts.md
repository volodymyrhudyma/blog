---
title: Mastering javascript
date: 2020-04-26T07:02:40.028Z
---
## What is Javascript?

Javascript is a dynamically-typed programming language that was originally developed to add dynamic and interactive elements to web pages. It runs on the client-side, which means the code is processed by a web browser. 

## What is dynamically-typed language?

Dynamically-typed languages are those where the interpreter assigns variables a type at runtime based on the variable's value. Consider the example code below:

```javascript
let x = 10;

console.log(typeof x) // Prints "number"

x = "string value"

console.log(typeof x) // Prints "string"
```

You can reassign data of a different type to the variable and no error will be generated.

It seems cool that you don't have to bother what type to use, but in most cases this approach leads to unexpected runtime errors:

```javascript
let user = {
  name: 'John',
  surname: 'Doe'
};

const updateUser = () => {
  user = {
    name: 'Andrew',
    surnam: 'Hopkins'
  }
};

updateUser();

console.log(user.surname) // Prints "undefined"
```

Have you found an error in the code above?

You're absolutely right, we misspelled `surname` property. Notice that the code is allowed to be run even though Javascript can be smart enough to raise and error before you even finish to type misspelled property name. But it needs your hand.

## Static type checking

Static-typed languages are those where the types are checked on the fly, during code execution. 

If you mess up the data types of your variables in a statically typed language, you’ll see an error at compile time and won’t even be able to run your program.

Is this the only benefit? The answer is - **no**.

It also offers auto-completion, generating documentation, and faster compilation.

## Typescript

Typescript is not actually a static type check but can be used as one. It is a programming language developed by Microsoft, typed superset of JavaScript which is compiled to plain JavaScript. It's extremely useful when building large-scale applications.

Using typescript in the following code would raise type error:

```javascript
let x: number = 10;

// ERROR: Type '"string value"' is not assignable to type 'number'.
x = "string value" 
```

In the second example we define `User` type which requires `name` and `surname` properties. Afterwards, we let the compiler know that `user` variable is of a `User` type and if the wrong field gets modified, an error is thrown:

```javascript
type User = {
  name: string;
  surname: string;
}

let user: User = {
  name: 'John',
  surname: 'Doe'
};

const updateUser = () => {
  user = {
    name: 'Andrew',
    // ERROR:
    // Type '{ name: string; surnam: string; }' is not assignable to type 'User'.
    // Object literal may only specify known properties, but 'surnam' does not 
    // exist in type 'User'. Did you mean to write 'surname'?
    surnam: 'Hopkins'
  }
};
```

I recommend you to read [this awesome article](https://stxnext.com/blog/2019/08/30/typescript-pros-cons-javascript/) to learn more about Typescript.

***Conclusion**: always use **Typescript** in medium/large scale applications.*

## Types in Javascript

There are 6 types considered to be *Primitive.*

> A primitive is not an object and has no methods of its own. All *primitives are immutable*.

* Boolean

  Null

  Undefined

  Number

  String

  Symbol