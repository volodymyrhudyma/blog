---
title: Logical OR/AND/Nullish Assignments In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn Logical Assignment Operators in JavaScript, which are a
  combination of Logical Operators (||, &&, ??) with an Assignment (=).
shareImage: /img/logical-assignments-in-js.jpg
teaser: The latest JavaScript specification, ECMAScript 2021, includes a lot of
  useful features, but the one we'll discuss today is Logical Assignment
  Operator, which is a combination of a logical operator (||, &&, ??) with an
  assignment (=)...
date: 2021-07-01T20:45:20.005Z
---
The latest JavaScript specification, ECMAScript 2021, includes a lot of useful features, but the one we'll discuss today is **Logical Assignment Operator**, which is a combination of a logical operator (**\||**, **&&**, **??**) with an assignment (**\=**).

By using Logical Assignment Operator, we can make an assignment with a single line of code.

Before we start learning this function, let's remember how the logical operators work in JavaScript and what is meant by Short Circuit.

## Logical OR

The Logical OR operator returns **x** if it is Truthy Value, otherwise it returns **y**.

> **Truthy Value** is a value that is considered **true** in a Boolean context.
>
> **Falsy Value** is a value that is considered **false** in a Boolean context.
>
> **Nullish Value** is a value that is equal to **null** or **undefined**.  All Nullish Values are also Falsy.

```javascript
// Syntax
x || y

// Equivalent
x ? x : y
```

Examples:

```javascript
// Truthy values
1 || "notReturned" // => 1
true || "notReturned" // => true
"returnMe" || "notReturned" // => "returnMe"

// Falsy values
null || "returnMe" // => "returnMe"
NaN || "returnMe" // => "returnMe"
0 || "returnMe" // => "returnMe"
"" || "returnMe" // => "returnMe"
undefined || "returnMe" // => "returnMe"
```

## Logical AND

The Logical AND operator returns **x** if it cannot be converted to **true**, otherwise it returns **y**:

```javascript
// Syntax
x && y

// Equivalent
x ? y : x
```

Examples:

```javascript
// Truthy values
1 && "returnMe" // => "returnMe"
true && "returnMe" // => "returnMe"
"string" && "returnMe" // => "returnMe"

// Falsy values
null && "notReturned" // => "null"
NaN && "notReturned" // => "NaN"
0 && "notReturned" // => "0"
"" && "notReturned" // => ""
undefined && "notReturned" // => "undefined"
```

## Logical Nullish Assignment

The Logical Nullish Assignment operator returns **y** if **x** is **null** or **undefined**, otherwise it returns **x**:

```javascript
// Syntax
x ?? y

// Equivalent
x !== undefined && x !== null ? x : y
```

Examples:

```javascript
// Truthy values
1 ?? "notReturned" // => "1"
true ?? "notReturned" // => "true"
"returnMe" ?? "notReturned" // => "returnMe"

// Falsy values
null ?? "returnMe" // => "returnMe"
NaN ?? "notReturned" // => "NaN"
0 ?? "notReturned" // => "0"
"" ?? "notReturned" // => ""
undefined ?? "returnMe" // => "returnMe"
```

## Short Circuit

Short Circuit means that the right side of an expression is not evaluated if the operator is already determined after the first operand evaluation.

Any side effects that could have occurred do not take any effect:

```javascript
const expensiveCalc = () => {
  console.log("Doing some expensive calculations...");
};

true || expensiveCalc(); // -> "true"
false && expensiveCalc(); // -> "false"
true ?? expensiveCalc(); // -> "true"
```

In all three cases the **expensiveCalc()** function is never called.

## Logical OR Assignment

The Logical OR Assignment operator only assigns if **x** is Falsy Value:

```javascript
// Syntax
x ||= y

// Equivalent
x || (x = y)
```

It Short-Circuits if the first operand determines the result.

Example:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

user.name ||= "Andrew";
user.age ||= 18;

// Prints { name: "John", surname: "Doe", age: 18 }
console.log(user);
```

In this example, the **name** property is not reassigned because it is a Truthy Value, but **age** is Falsy (equal to **undefined**), so there is a new value at the end.

## Logical AND Assignment

The Logical AND Assignment operator only assigns if **x** is Truthy Value:

```javascript
// Syntax
x &&= y

// Equivalent
x && (x = y)
```

It Short-Circuits if the first operand determines the result.

Example:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

user.name &&= "Andrew";
user.age &&= 18;

// Prints { name: "Andrew", surname: "Doe" }
console.log(user);
```

In this example, the **name** property is reassigned because it is a Truthy Value, but **age** is Falsy (equal to **undefined**), so it is not reassigned.

## Logical Nullish Assignment

The Logical Nullish Assignment operator only assigns if **x** is Nullish Value:

```javascript
// Syntax
x ??= y

// Equivalent
x ?? (x = y)
```

It Short-Circuits if the first operand determines the result.

Example:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: null,
};

user.name ??= "Andrew";
user.age ??= 18;

// Prints { name: "John", surname: "Doe", age: 18 }
console.log(user);
```

In this example, the **name** property is not reassigned because it is a Truthy Value, but **age** is Nullish (equal to **undefined**), so there is a new value at the end.

## Summary

In this article, we learned how to use three new Logical Assignment Operators in JavaScript:

* Logical OR Assignment: **x ||= y**
* Logical AND Assignment: **x &&= y**
* Logical Nullish Assignment: **x ??= y**

On the one hand, proper usage of them makes the code shorter, cleaner, and more readable, but on the other hand, redundant usage leads to rapid decreasing of readability.

So be sure to play around with these new operators to understand them better, and use them wisely.