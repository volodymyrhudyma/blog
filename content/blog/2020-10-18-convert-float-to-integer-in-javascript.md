---
title: Convert Float to Integer in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASERR
date: 2020-10-18T08:28:42.140Z
---
Converting floating numbers to integers is a common task when creating web applications.

Even though there are numerous ways to do this in JavaScript, often developers do not know other ways rather than using the **Math** object or **parseInt** function.

> The JavaScript **Math** object allows you to perform mathematical tasks on numbers.

## Math.ceil

Rounds number up to the next largest integer:

```javascript
// Positive
Math.ceil(10.1); // 11
Math.ceil(10.5); // 11
Math.ceil(10.9); // 11

// Negative
Math.ceil(-10.1); // -10
Math.ceil(-10.5); // -10
Math.ceil(-10.9); // -10
```

## Math.floor

Rounds number down to the next smallest integer:

```javascript
// Positive
Math.floor(10.1); // 10
Math.floor(10.5); // 10
Math.floor(10.9); // 10

// Negative
Math.floor(-10.1); // -11
Math.floor(-10.5); // -11
Math.floor(-10.9); // -11
```

## Math.round

Rounds number to the nearest integer:

```javascript
// Positive
Math.round(10.1); // 10
Math.round(10.5); // 11
Math.round(10.9); // 11

// Negative
Math.round(-10.1); // -10
Math.round(-10.5); // -10
Math.round(-10.9); // -11
```

## Math.trunc

Returns the integer part of the number by removing any fractional digits:

```javascript
// Positive
Math.trunc(10.1); // 10
Math.trunc(10.5); // 10
Math.trunc(10.9); // 10

// Negative
Math.trunc(-10.1); // -10
Math.trunc(-10.5); // -10
Math.trunc(-10.9); // -10
```

## parseInt

Parses a string argument and returns an integer of the specified radix.

> The **radix** parameter is used to specify which numeral system to be used. It is an integer between **2** and **36**.

```javascript
const radix = 10;

// Positive
parseInt("10.1", radix); // 10
parseInt("10.5", radix); // 10
parseInt("10.9", radix); // 10

// Negative
parseInt("-10.1", radix); // -10
parseInt("-10.5", radix); // -10
parseInt("-10.9", radix); // -10
```

## Bitwise OR

Returns **1** in each bit position for which the corresponding bits of either or both operands are **1**s.

The behavior of this operator changes depending on whether you deal with positive or negative numbers.

If a number is **positive**, it **rounds down**. 

If a number is **negative**, it **rounds up**.

Furthermore, this operator removes everything after the floating-point.

```javascript
// Positive
console.log(10.1 | 0); // 10
console.log(10.5 | 0); // 10
console.log(10.9 | 0); // 10

// Negative
console.log(-10.1 | 0); // -10
console.log(-10.5 | 0); // -10
console.log(-10.9 | 0); // -10
```

## Bitwise XOR

Returns **1** in each bit position for which the corresponding bits of either but not both operands are **1**s.

The behavior of this operator is the same as of the Bitwise OR in terms of converting a floating number to an integer:

```javascript
// Positive
console.log(10.1 ^ 0); // 10
console.log(10.5 ^ 0); // 10
console.log(10.9 ^ 0); // 10

// Negative
console.log(-10.1 ^ 0); // -10
console.log(-10.5 ^ 0); // -10
console.log(-10.9 ^ 0); // -10
```

## Double bitwise NOT

The bitwise NOT operator (`~`) takes its operand, converts it to a 32-bit integer, and inverts each bit.

So **0** becomes **1** and vice-versa.

To simplify a bit, it yields to `-(x+1)`:

```javascript
console.log(~10); // -(10 + 1) = 11
console.log(~-10); // -(-10 + 1) = 9
```

The double bitwise NOT is not an operator itself, it is a combination of two bitwise NOT operators working together.

It yields to `-(-(x+1)+1)`, which can be simplified to `x`, so we end up with our original number.

But, there is an important thing to remember: **it truncates everything after the floating-point:**

```javascript
// Positive
console.log(~~10.1); // 10
console.log(~~10.5); // 10
console.log(~~10.9); // 10

// Negative
console.log(~~-10.1); // -10
console.log(~~-10.5); // -10
console.log(~~-10.9); // -10
```

## Subtract the fractional part

To perform this we need to use the remainder operator `%` that returns the remainder left over when one operand is divided by a second operand:

```javascript
const x = 10.5;
const y = -10.5;

console.log(x - x % 1); // 10
console.log(y - y % 1); // -10
```

## Summary

As we have seen, there are a lot of ways to convert a floating number to an integer.

The most used methods are **Math** object and **parseInt** function, but nevertheless, it is important to know all available options in case you would like to use one of them.

What is your favorite way? Let me know in the comments.