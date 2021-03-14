---
title: 9 Ways To Convert Float To Integer In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn all available options to convert Float to Integer in
  JavaScript. The most popular ways to convert Float to Integer is to use Math
  object or parseInt function.
teaser: The conversion of floating point numbers to integers is a common task
  when creating web applications. Although there are numerous ways to do this in
  JavaScript, developers often know no other way than to use the...
date: 2020-10-19T08:28:42.140Z
---
The conversion of floating point numbers to integers is a common task when creating web applications.

Although there are numerous ways to do this in JavaScript, developers often know no other way than to use the **Math** object or the **parseInt** function.

> The JavaScript **Math** object allows to perform mathematical tasks on numbers.
>
> All available functions can be found [here](https://www.w3schools.com/js/js_math.asp).

## Math.ceil

Rounds number up to the next larger integer (remember that the negative number **\-10** is larger than **\-11**):

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

Rounds number down to the next smaller integer:

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

*This function is an addition of ES6, earlier versions of JavaScript do not include it.*

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

## ParseInt

Parses a string argument and returns an integer of the specified radix.

> The **radix** parameter is used to specify which number system is to be used. It is an integer between **2** and **36**.

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

**Important note:** **radix** is often omitted by the developers, which means that we let the **parseInt** function guess the type of number based on the passed argument.

If radix is **0**, **undefined** or not specified, JavaScript assumes:

* If the input string starts with "0x" or "0X", radix is assumed to be 16.
* If the input string starts with "0", radix is assumed to be 8 or 10.

  Exactly which radix is chosen depends on the implementation. 

  ECMAScript 5 clarifies that 10 should be used, but not all browsers support this yet. 

  For this reason, **radix must always be specified**.
* If the input string starts with any other value, radix is assumed to be 10.

## Bitwise OR (|)

Returns **1** in each bit position for which the corresponding bits of one or both operands are **1**s.

The behavior of this operator changes depending on whether you work with positive or negative numbers.

If a number is **positive**, it is **rounded down**. 

If a number is **negative**, it is **rounded up**.

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

## Bitwise XOR (^)

Returns **1** in each bit position for which the corresponding bits of one, but not both operands are **1**s.

The behavior of this operator is the same as that of Bitwise OR in terms of converting a floating point number into an integer:

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

## Double bitwise NOT (\~\~)

The bitwise NOT operator (`~`) takes its operand, converts it to a 32-bit integer and inverts each bit.

Thus **0** becomes **1** and vice-versa.

To simplify things a bit, it yields to `-(x+1)`:

```javascript
console.log(~10); // -(10 + 1) = 11
console.log(~-10); // -(-10 + 1) = 9
```

The double bitwise NOT is itself not an operator, but a combination of two bitwise NOT operators working together.

It yields to `-(-(x+1)+1)`, which can be simplified to `x`, so that we end up with our original number.

But there is one important thing to remember: **it truncates everything after the floating-point:**

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

## Subtract The Fractional Part

To do this, we need to use the remainder operator `%`, which returns the remainder left when an operand is divided by a second operand:

```javascript
const x = 10.5;
const y = -10.5;

console.log(x - x % 1); // 10
console.log(y - y % 1); // -10
```

## Summary

As we have seen, there are many ways to convert a floating point number into an integer.

The most commonly used methods are the **Math** object and the **parseInt** function, but still it is important to know all available options if you want to use any of them.

What is your favorite way? Let me know in the comments.