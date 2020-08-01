---
title: JavaScript operators that you don't often use
tag:
  - JavaScript
metaDescription: META
teaser: TEASER
date: 2020-08-01T08:14:10.012Z
---
## !!

This is not an operator itself, but a combination of 2 **negations**. 

It is used to convert any value to its corresponding boolean value, depending on whether the value is *truthy* or *falsy*.

The first negation converts any *truthy* value to **false** and any *falsy* to **true**.

The second negation operates a normal boolean value and negates it.

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

!'' // true
!!'' // false

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

**The remainder** operator returns the remainder left over when one operand is divided by a second operand. It always takes the sign of the dividend.

```javascript
10 % 2 // 0
-10 % 2 // -0

10 % 3 // 1
-10 % 3 // -1

4 % 10 // 4
-4 % 10 // -4
```

## ??

**The nullish coalescing operator** is a logical operator that returns right-side operand if left side equals to **null** or **undefined**, otherwise returns left side.

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

**The optional chaining operator** is an error-proof way to access nested object properties, even if an intermediate property doesn’t exist. 

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

**The exponentiation operator** calculates the **base** to the **exponent** power, that is, **base^exponent**.

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

## ~

## \>>

## \>>>

## <<