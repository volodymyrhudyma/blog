---
title: Getting started with JavaScript
tag:
  - JavaScript
teaser: Javascript is a dynamically-typed, interpreted programming language that
  was originally developed to add dynamic and interactive elements to web pages.
  It runs on the client-side, which means the code is processed by a web
  browser...
date: 2020-04-26T07:02:40.028Z
---
## What is Javascript?

Javascript is a dynamically-typed, interpreted programming language that was originally developed to add dynamic and interactive elements to web pages. It runs on the client-side, which means the code is processed by a web browser. 

## What does "interpreted" mean?

It means that source code isn’t compiled into binary code prior to execution.

Then how does the computer receives instructions to execute? 

That’s the job for a JavaScript engine. 

> **JavaScript engine** is a program responsible for translating source code into machine code and executing the translation result on a computer’s central processing unit (CPU).

In order to start coding in JavaScript, you don’t have to install any additional software. Each modern web browser comes with a JavaScript engine out-of-the-box. You can simply run scripts inside the browser.

## What is dynamically-typed language?

Dynamically-typed languages are those where the interpreter assigns variables a type at runtime based on the variable's value.

> In computer science, **runtime**, **run time** or **execution time** is the time when CPU is executing machine code.

Consider the example code below:

```javascript
let x = 10;

console.log(typeof x); // Prints "number"

x = "string value";

console.log(typeof x); // Prints "string"
```

You can reassign data of a different type to the variable and no error will be generated.

It seems cool that you don't have to bother what type to use, but in most cases this approach leads to unexpected runtime errors:

```javascript
let user = {
  name: "John",
  surname: "Doe",
};

const updateUser = () => {
  user = {
    name: "Andrew",
    surnam: "Hopkins",
  };
};

updateUser();

console.log(user.surname); // Prints "undefined"
```

Have you found an error in the code above?

You're absolutely right, we misspelled `surname` property. Notice that the code is allowed to be run even though Javascript can be smart enough to raise and error before you even finish to type misspelled property name. But it needs your hand.

## Static type checking

Static-typed languages are those where the types are checked on the fly, during code execution. 

If you mess up the data types of your variables in a statically typed language, you’ll see an error instantly and won’t even be able to run your program.

Is this the only benefit? The answer is - no.

It also offers auto-completion, generating documentation, and faster compilation.

## Typescript

Typescript is not actually a static type check but can be used as one. It is a programming language developed by Microsoft, typed superset of JavaScript which is compiled to plain JavaScript. It's extremely useful when building large-scale applications.

Using typescript in the following code would raise type error:

```typescript
let x: number = 10;

// ERROR: Type "string value" is not assignable to type "number".
x = "string value";
```

In the second example we define `User` type which requires `name` and `surname` properties. Afterwards, we let the compiler know that `user` variable is of a `User` type and if the wrong field gets modified, an error is thrown:

```typescript
type User = {
  name: string;
  surname: string;
};

let user: User = {
  name: "John",
  surname: "Doe",
};

const updateUser = () => {
  user = {
    name: "Andrew",
    // ERROR:
    // Type "{ name: string; surnam: string; }" is not assignable to type "User".
    // Object literal may only specify known properties, but "surnam" does not 
    // exist in type "User". Did you mean to write "surname"?
    surnam: "Hopkins",
  };
};
```

I recommend you to read [this awesome article](https://stxnext.com/blog/2019/08/30/typescript-pros-cons-javascript/) to learn more about Typescript.

**Conclusion**: always use **Typescript** in medium/large scale applications.

## Types in Javascript

There are 7 types considered to be **Primitive** and 1 **Reference** type*.*

> **Primitive** is not an object and has no methods of its own. All primitives are immutable.
>
> **Reference** points to the object’s location in memory. It does not actually contain value.

* Boolean - `true` or `false`
* Null - no value
* Undefined - variable was declared but has not been given a value
* Number - integers: `10`, floats: `10.20`
* BigInt - created by appending `n` to the end of an integer literal: `10n`

  * It is relatively new type added to represent integers of arbitrary length. `Number` primitive type has some limitations, it can not represent value larger than `2^53` (or less than `-2^53` for negatives). We can need really large numbers for cryptography or microsecond-precision timestamps
* String - an array of characters: `this is string`
* Symbol - unique value

Everything else in an **Object** type (objects are used to store collections of data and more complex entities).

## Primitives vs References

The key difference between them is how they store values.

If Primitive type is assigned to a variable, it means that the variable actually contains primitive value.

```javascript
const a = 1;

let b = 2;

const c = a; // Variable "a" is copied to "c"
const d = b; // Variable "b" is copied to "d"

console.log(a); // Prints "1"
console.log(b); // Prints "2"
console.log(c); // Prints "3"
console.log(d); // Prints "4"

// Change "b" value
b = 3;

console.log(b); // Prints "3"
console.log(d); // Prints "2"
```

**Important note:** primitives are copied by value. Changing one of the variables above does not change the other because each of them stores its own copy of value.

If reference type is assigned to variable, it means that the variable actually contains reference to the value.

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

const newUser = user;

newUser.name = "Andrew";

console.log(newUser.name); // Prints "Andrew", as we expect, right?
console.log(user.name); // Prints "Andrew" as well! Pretty weird?
```

Let me explain this: when you create an object `user` it's value `{name: "John", surname: "Doe"}` is stored in some location in your computer's memory. What the variable `user` receives is memory address which points to stored value.

When you copy `user` value to another variable `newUser` it's the address what gets actually copied, not the value. 

**Important note:** objects are copied by reference instead of by value.

Both `user` and `newUser` contain reference to the same object in memory. Therefore, altering any of the values will cause both to update.

## Reassigning reference

To reassign a reference means to replace old reference with a new one. Example:

```javascript
let user = {
  name: "John",
  surname: "Doe",
};

user = {
  name: "Andrew",
  surname: "Hopkins",
};
```

Now  `user` variable stores a reference to the new value `{ name: "Andrew", surname: "Hopkins" }` but the old value `{ name: "John", surname: "Doe" }` is still present in memory.

When there are no references to values in memory, Javascript engine can perform **garbage collection**.

> Some high-level languages, such as JavaScript, utilize a form of automatic memory management known as **garbage collection**(GC). The purpose of a **garbage collector** is to monitor memory allocation and determine when a block of allocated memory is no longer needed and reclaim it.

## Object equality

Object equality could be confusing at first sight, but after understanding Reference types it should become pretty straightforward.

You might suppose that if 2 objects have the same properties and values they can be considered equal. Not really, let's see some examples:

```javascript
const johnsCar = {
  name: "Audi",
  topSpeed: 300,
};

const andrewsCar = {
  name: "Audi",
  topSpeed: 300,
};

console.log(johnsCar == andrewsCar); // Prints "false"
console.log(johnsCar === andrewsCar); // Prints "false"
```

You probably know what's going on, after mastering the previous section, right?

Reference types are compared by reference**.** It basically means, that javascript checks if both objects point to the same memory location. If out case, it is not true, so equality operator returns `false`.

Consider another example:

```javascript
const johnsCar = {
  name: "Audi",
  topSpeed: 300,
};

const andrewsCar = johnsCar;

console.log(johnsCar == andrewsCar); // Prints "true"
console.log(johnsCar === andrewsCar); // Prints "true"
```

`andrewsCar` points to the same location as `johnsCar`, therefore objects considered equal.

If we have two distinct objects and want to see if their properties are the same, the easiest way to do so is to turn them both into strings and then compare the strings:

```javascript
const johnsCar = {
  name: "Audi",
  topSpeed: 300,
};

const andrewsCar = {
  name: "Audi",
  topSpeed: 300,
};

// Prints "true"
console.log(JSON.stringify(johnsCar) === JSON.stringify(andrewsCar));
```

Another options:

* Write recursive function that will loop over object properties and make sure they are the same
* Use well-tested and popular library ([underscore](https://underscorejs.org/#isEqual), [lodash](https://lodash.com/docs/4.17.15#isEqual)) -> *Recommended one*

## Comparison operators

Javascript has both **strict** `===` and **abstract** `==` equality comparisons. 

Strict comparison:

* Only equals `true` if operands are of the same type
* If operands have different type, we DO NOT do any type conversions

```javascript
1 === 1 // true

1 === "1" // false
```

Abstract equality comparison:

* Converts operands to the same type and applies strict comparison

```javascript
1 == 1 // true

1 == "1" // true
```

## Type coercion basics

> **Coercion** is the term that is used for *unexpected type casting* in JavaScript

1. Every `+` expression concatenates the values if one is already a **string** or they will be cast to **strings** if possible.

   ```javascript
   1 + 1 // 2
   1 + "1" // "11"
   "2" + 22 // "222"

   // Explanation:
   // String(["one", "two"]) -> "one,two"
   // String(["three", "four"]) -> "three,four"
   // "one,two" + "three,four" -> "one,twothree,four"
   ["one", "two"] + ["three", "four"] // "one,twothree,four"

   // Explanation:
   // String({}) -> "[object Object]"
   // "[object Object]" + "[object Object]" -> "[object Object][object Object]"
   {} + {} // "[object Object][object Object]"

   // Explanation:
   // String([]) -> ""
   // String({}) -> "[object Object]"
   // "" + "[object Object]" -> "[object Object]"
   [] + {} // "[object Object]"

   // Explanation
   // {} is not parsed as object, but instead as empty block
   // Return value of empty block is empty
   // The result of this expression equals +[] -> +String([]) -> +"" -> 0
   {} + [] // 0!
   ```
2. `-`, `*`, `/`expression can be used only with **numbers**, so all operands will be casted to **numbers**.

   ```javascript
   "1" - 1 // 0
   "22" - "2" // 20

   10 / "5" // 2
   "20" / "2" // 10

   2 * "2" // 4
   "3" * "3" // 9

   // Explanation
   // Number([3]) -> 3
   // Number([1]) -> 1
   // 3 - 1 -> 2
   [3] - [1] = 2;

   // Explanation
   // Number(["one", "two"]) -> NaN
   // Number(["three", "four"]) -> NaN
   // NaN - NaN -> NaN
   ["one", "two"] - ["three", "four"] // NaN
   ["one", "two"] * ["three", "four"] // NaN
   ["one", "two"] / ["three", "four"] // NaN

   // Explanation:
   // Number({}) -> NaN
   // NaN - NaN -> NaN
   {} - {} // NaN
   {} * {} // NaN
   {} / {} // NaN

   // Explanation:
   // Number([]) -> 0
   // Number({}) -> NaN
   // 0 - NaN -> NaN
   [] - {} // NaN
   [] * {} // NaN
   [] / {} // NaN

   // Explanation
   // {} is not parsed as object, but instead as empty block
   // Return value of empty block is empty
   // The result of this expression equals -[] -> -Number([]) -> -0
   {} - [] // -0!

   // Explanation
   // *Number([]) or /Number([]) -> SyntaxError: Unexpected token
   {} * [] // SyntaxError: Unexpected token!
   {} / [] // SyntaxError: Unexpected token!
   ```
3. Type-converting comparison `x == y` according to [specification](https://www.ecma-international.org/ecma-262/#sec-abstract-equality-comparison):

   * typeof x equals typeof y -> return x === y
   * x is null and y is undefined -> return true
   * y is null and x is undefined -> return true
   * typeof x is number and typeof y is string -> return x == ToNumber(y)
   * typeof x is string and typeof y is number -> return ToNumber(x) == y
   * typeof x is boolean -> return ToNumber(x) == y
   * typeof y is boolean -> return x == ToNumber(y)
   * typeof x is string/number/symbol and typeof y is object -> return x == ToPrimitive(y)
   * typeof x is object and typeof y is string/number/symbol -> return ToPrimitive(x) == y
   * in any other case return false

   ```javascript
   // typeof x equals typeof y -> return x === y
   1 == 1 // true
   [] == [] // false

   // x is null and y is undefined -> return true
   null == undefined // true

   // y is null and x is undefined -> return true
   undefined == null // true

   // typeof x is number and typeof y is string -> return x == ToNumber(y)
   1 == "str" // false

   // typeof x is string and typeof y is number -> return ToNumber(x) == y
   "str" == 1 // false

   // typeof x is boolean -> return ToNumber(x) == y
   true == 1 // true

   // typeof y is boolean -> return x == ToNumber(y)
   1 == true // true

   // typeof x is string/number/symbol and typeof y is object -> return x == ToPrimitive(y)
   "[object Object]" == {} // true

   // typeof x is object and typeof y is string/number/symbol -> return ToPrimitive(x) == y
   {} == "str" // Remember about "SyntaxError: Unexpected token" here

   const obj = {};
   obj == "[object Object]" // true
   ```

**Important note:** make sure to check the most complete [list of WTFs ](https://github.com/denysdovhan/wtfjs)in JavaScript.

## Summary

Hopefully, you have an understanding how cool is JavaScript and how easy is to start working with it.

Quick recap:

* Javascript is a dynamically-typed, interpreted programming language that was originally developed to add dynamic and interactive elements to web pages. It runs on the client-side, which means the code is processed by a web browser
* There are 7 types considered to be primitive (boolean, null, undefined, number, bigint, string, symbol) and 1 reference type (object)
* Primitives are copied by value, objects are copied by reference
* Javascript has both strict `===` and abstract `==` equality comparisons
* Strict comparison only results in true if both operands are of the same type
* Abstract equality comparison converts operands to the same type and applies strict comparison
* Unexpected type casting in JavaScript is called coercion