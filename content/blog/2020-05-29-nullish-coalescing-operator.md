---
title: Nullish coalescing operator
tag:
  - JavaScript
metaDescription: The nullish coalescing operator "??" in JavaScript is a logical
  operator that returns right-side operand if left side equals to null or
  undefined, otherwise returns right side.
teaser: The nullish coalescing operator "??" is a logical operator that returns
  right-side operand if left side equals to null or undefined, otherwise returns
  left side. If you're familiar with the logical OR operator, you may wonder
  what's the difference between it and nullish coalescing operator...
date: 2020-05-29T07:27:09.769Z
---
The **nullish coalescing operator** is a logical operator that returns right-side operand if left side equals to `null` or `undefined`, otherwise returns left side.

## The syntax

The operator is defined using `??`:

```javascript
const user = null;

const userName = user ?? "John";

console.log(userName); // Prints "John"
```

In the example above `user` equals to `null`, that's why the right side is returned.

```javascript
const user = undefined;

const userName = user ?? "John";

console.log(userName); // Prints "John"
```

This example is basically the same as the one where the user equals `null` as right-hand side is being returned.

If `user` variable is not equal to `null` or `undefined`, it's value will be returned:

```javascript
// We have a bug in code. How the user can be equal to 0?!
const user = 0;

const userName = user ?? "John";

console.log(userName); // Prints "0"
```

## Short-circuiting

Like the **OR** and **AND** logical operators, the right-hand side expression is not evaluated if the left-hand side proves to be neither `null` nor `undefined`:

```javascript
const returnNull = () => {
  return null;
};

const returnOne = () => {
  return 1;
};

// returnOne() will be called as returnNull() evaluates to null
console.log(returnNull() ?? returnOne());
```

```javascript
const returnOne = () => {
  return 1;
};

const returnTwo = () => {
  return 2;
};

// returnTwo() will NOT be called as returnOne() does not equal null or undefined
console.log(returnOne() ?? returnTwo());
```

## Is the same as logical OR?

If you're familiar with logical **OR** `||` operator, you may wonder what's the difference between it and nullish coalescing operator.

The answer is simple - logical **OR** returns right side if the left side is **falsy** value, nullish coalescing operator returns right side if the left side is `null` or `undefined` only.

> If a value can be converted to true, the value is so-called **truthy**. If a value can be converted to false, the value is so-called **falsy**.

Consider the following example(left side equals to `0`):

```javascript
const zero = 0;

console.log(zero ?? "Default value"); // Prints "0"
            
console.log(zero || "Default value"); // Prints "Default value"
```

## Falsy values

The following values are considered as falsy in JavaScript:

* false
* null
* NaN
* 0
* empty string('', "", \`\`)
* undefined

## Summary

* The nullish coalescing operator "??" is a logical operator that returns right-side operand if left side equals to null or undefined, otherwise returns right side
* The difference between this operator and OR: logical OR returns right side if the left side is falsy value, nullish coalescing operator returns right side if the left side is `null` or `undefined` only
* Falsy values in JavaScript: null, NaN, 0, empty string('', "", \`\`), undefined