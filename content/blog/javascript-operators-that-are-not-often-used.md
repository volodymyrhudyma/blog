---
title: JavaScript operators that are not often used
tag:
  - JavaScript
metaDescription: Learn unique JavaScript operators that are not used very often.
  For example, optional chaining, nullish coalescing and bitwise operators.
teaser: JavaScript supports a lot of operators that serve many purposes, such as
  assigning, comparing values, performing arithmetic operations, and much more.
  As was to be expected, there are the most and the less popular ones...
date: 2020-08-01T08:14:10.012Z
---
JavaScript supports a lot of operators that serve many purposes, such as assigning, comparing values, performing arithmetic operations, and much more.

As was to be expected, there are the most and the less popular ones.

Today we will focus on learning the JavaScript operators, which are not often used.

## !!

**The double negation** (`!!`) is not an operator itself, but a combination of 2 **negations**. 

It is used to convert any value to its corresponding boolean value, depending on whether the value is *truthy* or *falsy*. The first negation converts any *truthy* value to **false** and any *falsy* to **true**. The second negation operates a normal boolean value and negates it.

In the end, *truthy* value is converted to **true**, *falsy* to **false.**

> **Falsy values:** null, NaN, 0, empty string('', "", \`\`), undefined.
>
> **Truthy values:** everything else.

```javascript
// Falsy values
!null // true
!!null // false

!NaN // true
!!NaN // false

!0 // true
!!0 // false

!"" // true
!!"" // false

!undefined // true
!!undefined // false

// Truthy values
!1 // false
!!1 // true

!"string" // false
!!"string" // true

!{} // false
!!{} // true
```

## %

**The remainder** (`%`) operator returns the remainder left over when one operand is divided by a second operand.

It always takes the sign of the dividend.

```javascript
10 % 2 // 0
-10 % 2 // -0

10 % 3 // 1
-10 % 3 // -1

4 % 10 // 4
-4 % 10 // -4
```

## ??

**The nullish coalescing** operator(`??`) is a logical operator that returns right-side operand if left side equals to **null** or **undefined**, otherwise returns left side.

```javascript
null ?? "value" // "value
undefined ?? "value" // "value"

true ?? "value" // true
false ?? "value" // false
0 ?? "value" // 0
"string" ?? "value" // "string
```

To learn this operator more, refer to [this article](/2020-05-29-nullish-coalescing-operator/). 

## ?.

**The optional chaining** operator (`?.`) is an error-proof way to access nested object properties, even if an intermediate property does not exist. 

It stops the evaluation and returns **undefined** if the part before **?.** is **null** or **undefined**.

Let's take a look at how we retrieve a value without using this operator:

```javascript
const user = {
  name: "John",
  address: {
    street: "Street",
  },
};

const street = user.address && user.address.street;

console.log(street); // Prints "Street"

const status = user.status && user.status.isActive;

console.log(status); // Prints "undefined"
```

And with it:

```javascript
const user = {
  name: "John",
  address: {
    street: "Street",
  },
};

// Address is not "null" or "undefined", therefore return it
const street = user.address?.street;

console.log(street); // Prints "Street"

// Status is "undefined", therefore stop evaluating and return "undefined"
const status = user.status?.isActive;

console.log(status); // Prints "undefined"
```

To learn this operator more, refer to [this article](/2020-05-27-optional-chaining-in-javascript/).

## \*\*

**The exponentiation** operator (`**`) calculates the **base** to the **exponent** power, that is, **base^exponent**.

The operator is right-associative: `a ** b ** c` is equal to `a ** (b ** c)`.

```javascript
// Positive
2 ** 2 // 4
3 ** 3 // 27
4 ** 4 // 256

// Negative
10 ** -1 // 0.1
-10 ** 2 // Illegal expression, the operation is ambiguous.
-(10 ** 2) // -100, OK

// Chaining
2 ** 2 ** 3 // 256, not 64
```

## ^

**The bitwise XOR** operator (`^`):

* returns a zero in each bit position for which the corresponding bits are the same
* returns a one in each bit position for which the corresponding bits are different

```javascript
const a = 5;        // 00000000000000000000000000000101
const b = 3;        // 00000000000000000000000000000011

console.log(a ^ b); // 00000000000000000000000000000110, outputs 6

const c = 9; // 00000000000000000000000000001001
const d = 14; // 00000000000000000000000000001110

console.log(14 ^ 9); // 00000000000000000000000000000111, outputs 7
```

The operands are converted to **32-bit integers** and expressed by a series of bits (zeroes and ones). 

Numbers with more than 32 bits get their most significant bits discarded. 

For example, the following integer with more than 32 bits will be converted to a 32-bit integer:

```javascript
Before: 11100110111110100000000000000110000000000001
After:              10100000000000000110000000000001
```

## ~

**The bitwise NOT** (`~`) operator inverts the bits of the operand:

```javascript
const a = 5;     // 00000000000000000000000000000101

console.log(~a); // 11111111111111111111111111111010, outputs -6
```

## "<<"

**The left shift** (`<<`) operator shifts the first operand the specified number bits to the left, shifting in zeros from the right.

```javascript
const a = 5;         // 00000000000000000000000000000101
const b = 2;         // 00000000000000000000000000000010

console.log(a << b); // 00000000000000000000000000010100, outputs 20
```

**Important note:** Bitwise shifting any number `x` to the left by `y` bits yields `x * 2 ** y`. For example, `5 << 2`translates to: `5 * (2 ** 2) = 5 * (4) = 20`.

## ">>"

**The sign-propagating right shift** (`>>`) operator shifts the first operand the specified number of bits to the right. 

Excess bits shifted off to the right are discarded. 

Copies of the leftmost bit are shifted in from the left. Since the new leftmost bit has the same value as the previous leftmost bit, the sign bit (the leftmost bit) does not change. Hence the name "sign-propagating".

```javascript
const a = 5;         // 00000000000000000000000000000101
const b = 2;         // 00000000000000000000000000000010

console.log(a >> b); // 00000000000000000000000000000001, outputs 1

const c = -5;

console.log(c >> b);  // -00000000000000001111111111111110, outputs -2
```

## ">>>"

**The zero-fill right shift** (`>>>`) operator shifts the first operand the specified number of bits to the right. 

Excess bits shifted off to the right are discarded. 

Zero bits are shifted in from the left. The sign bit becomes 0, so the result is always non-negative. Unlike the other bitwise operators, zero-fill right shift returns an unsigned 32-bit integer.

```javascript
const a = 5;         // 00000000000000000000000000000101
const b = 2;         // 00000000000000000000000000000010

console.log(a >>> b); // 00000000000000000000000000000001, outputs 1

const c = -5;

console.log(c >>> b); //  00111111111111111111111111111110, outputs 1073741822
```

## Summary

In this article we reviewed some of the JavaScript operators that could have been used more often, such as optional chaining or nullish coalescing.

As for the bitwise operators, most of us have not even touched them, but they have some interesting use cases we should know about. 

Read [this article](https://blog.logrocket.com/interesting-use-cases-for-javascript-bitwise-operators/) to check them.