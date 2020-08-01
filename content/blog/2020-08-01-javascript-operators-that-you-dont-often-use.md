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

```

## ?.

## \*\*

## ^

## ~

## \>>

## \>>>

## <<