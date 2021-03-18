---
title: Abstract vs. Strict Comparison In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn the main difference between Abstract (==) and Strict
  (===) Comparison in JavaScript and the algorithms behind both approaches.
shareImage: /img/abstr.-vs.-str..jpg
teaser: "One of the essential things to understand when getting started with
  JavaScript is how to check if two values are equal. JavaScript provides three
  ways to do this: Abstract Equality Operator (==), Strict Equality Operator
  (===), and..."
date: 2021-03-18T15:53:12.574Z
---

One of the essential things to understand when getting started with JavaScript is how to check if two values are equal.

JavaScript provides three ways to do this: Abstract Equality Operator (**\==**), Strict Equality Operator (**\===**), and **Object.is()** method.

In this article, we will learn how Abstract Equality and Strict Equality Operators work and the main difference between them.

## Abstract Equality Operator (==)

The Abstract Equality Operator checks whether two operands are equal and returns **true** if equal, **false** otherwise:

```javascript
// Prints "true"
console.log(1 == 1)

// Prints "true"
console.log(1 == "1")

// Prints "true"
console.log("1" == "1")

// Prints "true"
console.log(1 == "1")
```

As you should notice, the operator returns **true** even if the type of the operands does not match, as in the second and fourth examples.

This is how it works - **First, the operands are converted to the same type, then a comparison is performed**.

## Abstract Equality Comparison Algorithm

The comparison **x == y**, where **x** and **y** are values, is performed the following way:

1. If **x** and **y** are of the same type, then:

   A. If the type of **x** is **undefined**, return **true**.

   B. If the type of **x** is **null**, return **true**.

   C. If the type of **x** is a **number**, then:

   - If **x** is **NaN**, return **false**.
   - If **y** is **NaN**, return **false**.
   - If **x** is the same number as **y**, return **true**.
   - If **x** is +0 and **y** is -0, return **true**.
   - If **x** is -0 and **y** is +0, return **true**.
   - Otherwise, return **false**.

   D. If the type of **x** is a string, then if **x** and **y** are of the same length and the same characters are at the corresponding positions, return **true**, otherwise, return **false**.

   E. If the type of **x** is a boolean, if both **x** and **y** are **true** or **false**, return **true**, otherwise, return **false**.

   F. If **x** and **y** refer to the same object, return **true**, otherwise, return **false**.

2. If **x** is **null** and **y** is **undefined**, return **true**.
3. If **x** is **undefined** and **y** is **null**, return **true**.
4. If the type of **x** is a number and the type of **y** is a string, return the result of comparison **x == ToNumber(y)**.
5. If the type of **y** is a number and the type of **x** is a string, return the result of comparison **ToNumber(x) == y**.
6. If the type of **x** is a boolean, return the result of the comparison **ToNumber(x) == y**.
7. If the type of **y** is a boolean, return the result of the comparison **x == ToNumber(y)**.
8. If the type of **x** is either a string or a number, and the type of **y** is an object, return the result of comparison **x == ToPrimitive(y)**.
9. If the type of **y** is either a string or a number, and the type of **x** is an object, return the result of comparison **ToPrimitive(x) == y**.
10. Otherwise, return **false**.

## Strict Equality Operator (===)

The Strict Equality Operator checks whether two operands are equal **and are of the same type**.

It considers operands of different types as not equal without attempting to convert them to the same type:

```javascript
// Prints "true"
console.log(1 === 1)

// Prints "false"
console.log(1 === "1")

// Prints "true"
console.log("1" === "1")

// Prints "false"
console.log(1 === "1")
```

## Strict Equality Comparison Algorithm

The comparison **x === y**, where **x** and **y** are values, is performed the following way:

1. If the type of **x** is different from the type of **y**, return **false**.
2. If the type of **x** is **undefined**, return **true**.
3. If the type of **x** is **null**, return **true**.
4. If the type of **x** is a number, then:

   A. If **x** is a **NaN**, return **false**.

   B. If **y** is a **NaN,** return **false**.

   C. If **x** is the same number as **y**, return **true**.

   D. If **x** is +0 and **y** is -0, return **true**.

   E. If **x** is -0 and **y** is +0, return **true**.

   F. Otherwise, return **false**.

5. If the type of **x** is a string, then if **x** and **y** are of the same length and the same characters are at the corresponding positions, return **true**, otherwise, return **false**.
6. If the type of **x** is a boolean, if both **x** and **y** are **true** or **false**, return **true**, otherwise, return **false**.
7. If **x** and **y** refer to the same object, return **true**, otherwise, return **false**.

## Which One To Use?

In 99% of cases, you should use Strict Equality (**\===**), as it increases the clarity of the code and eliminates any false positives that may occur.

If you need to compare the values of different types, do the type conversion explicitly yourself.

This also increases the readability and maintainability of your code, since not all developers know how the type conversion algorithm is used by the Abstract Equality Operator.

## Summary

In this article, we learned about the main difference between Abstract and Strict comparisons in JavaScript and what algorithms they both use when comparing operands.

This is one of the most important topics to understand both, for beginners and experienced developers, since making a mistake (missing one **\=** sign) is not as hard as debugging the resulting error.
