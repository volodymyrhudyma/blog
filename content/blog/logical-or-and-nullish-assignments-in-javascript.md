---
title: Logical OR/AND/Nullish Assignments In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-07-02T20:45:20.005Z
---
The newest JavaScript specification ECMAScript 2021 includes a lot of useful features, but the one we are going to discuss today is **Logical Assignment Operator**, which is a combination of a logical operators(||, &&, ??) with an assignment (=).

By using Logical Assignment Operator, we can make an assignment with a single line of code.

Before we begin learning this feature, let's remind ourselves how do the logical operators work in JavaScript and what is called Short Circuit.

## Logical OR

Logical OR operator returns **x** if it is Truthy Value, otherwise returns **y**.

> **Truthy Value** is a value that is considered **true** in a Boolean context.
>
> **Falsy Value** is a value that is considered **false** in a Boolean context.

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

Logical AND operator returns **x** if it can't be converted to **true**, otherwise returns **y**:

```javascript
// Syntax
x && y

// Equivalent
x ? y : x
```

Examples:

```javascript
// Truthy values
1 && "notReturned" // => "notReturned"
true && "notReturned" // => "notReturned"
"returnMe" && "notReturned" // => "notReturned"

// Falsy values
null && "returnMe" // => "null"
NaN && "returnMe" // => "NaN"
0 && "returnMe" // => "0"
"" && "returnMe" // => ""
undefined && "returnMe" // => "undefined"
```

## Logical Nullish Assignment

Logical Nullish Assignment operator returns **y** if **x** is **null** or **undefined**, otherwise returns **x**:

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
NaN ?? "returnMe" // => "NaN"
0 ?? "returnMe" // => "0"
"" ?? "returnMe" // => ""
undefined ?? "returnMe" // => "returnMe"
```

## Short Circuit

Short Circuit means that the right-hand side of an expression is not evaluated if the operator is already determined after the first operand evaluation.

Any side effects that could have taken place do not take any effect:

```javascript
const expensiveCalc = () => {
  console.log("Doing some expensive calculations...");
};

true || expensiveCalc(); // -> "true"
false && expensiveCalc(); // -> "false"
true ?? expensiveCalc(); // -> "true"
```

In all three cases the **expensiveCalc** function will never be invoked.