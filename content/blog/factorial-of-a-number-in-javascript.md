---
title: Factorial Of A Number In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn Factorial in JavaScript - implement and analyze the
  Factorial function using Iterative and Recursive approaches.
shareImage: /img/factorial-in-javascript.jpg
teaser: "Factorial of a number is a non-negative integer calculated as the
  product of all positive integers less than or equal to the number and is
  denoted by n!. For example: 10! = 10 \\* 9 \\* 8 \\* 7 \\* 6 \\* 5 \\* 4 \\* 3
  \\* 2 * 1 = 3628800. It can be represented by the following formula..."
date: 2021-08-03T06:49:51.218Z
---
Factorial of a number is a non-negative integer calculated as the product of all positive integers less than or equal to the number and is denoted by **n!**.

For example: **10!** = **10 \* 9 \* 8 \* 7 \* 6 \* 5 \* 4 \* 3 \* 2 * 1 = 3628800**.

It can be represented by the following formula: **n! = n \* (n - 1) \* (n - 2) \* ... \* 3 \* 2 \* 1**.

Note that **0! = 1**, according to the [empty product](https://en.wikipedia.org/wiki/Empty_product) convention.

Today we will learn two approaches to calculate the Factorial of a number in JavaScript: **Iterative** and **Recursive**.

## Iterative Approach

Iterative Approach calculates the Factorial using a for loop:

```javascript
const factorial = n => {
  if(n < 0) {
    throw new Error("Negative numbers are not allowed");
  }

  let result = 1;

  if(n <= 1) {
    return result;
  }

  for(let i = n; i > 1; i--) {
    result = result * i;
  }
  
  return result;
};
```

Let's explain the above example:

* If **n** is a negative number, we throw an error because negative numbers are not allowed
* If **n** is **0** or **1**, we return **result**, which by default is equal to **1**, since **0! = 1** and **1! = 1**
* If any other positive number is provided, we run a **for** loop, multiply each number, and store it in the **result** variable, which is returned by the function

The time complexity is **O(n)**.

The space complexity is **O(1)** because it does not matter if we run **factorial(10)** or **factorial(100)**, the space required remains the same.

## Recursive Approach

Recursive Approach calculates the Factorial by calling the function on itself:

```javascript
const factorial = n => {
  if(n < 0) {
    throw new Error("Negative numbers are not allowed");
  }

  if(n <= 1) {
    return 1;
  }

  return n * factorial(n - 1);
};
```

The first two conditions are similar to those in Iterative Approach, but the ending is different: we multiply the provided **n** value by the result of executing the **factorial** function with the previous number.

The time complexity is **O(n)**.

The space complexity is **O(n)**.

## Recursive Approach + Memoization

We can use the Memoization technique to store the results of **factorial** function executions in the variable to ensure that the function is called only once per number, then the value is read from the cache:

```javascript
let cache = {};

const factorial = n => {
  if(n < 0) {
    throw new Error("Negative numbers are not allowed");
  }

  if(n <= 1) {
    return 1;
  }

  if(cache[n]) {
    return cache[n];
  }

  const result = n * factorial(n - 1);

  cache[n] = result;

  return result;
};
```

It doesn't really add any improvements until we call the **factorial** function multiple times with the same arguments.

## Iterative vs. Recursive

Both the Iterative and Recursive approaches are very simple, but use slightly different techniques to calculate the Factorial.

So which approach is better?

The recommended one is **Iterative** because it works faster.

Try to use it as often as possible.

## Summary

In this article we learned how to find the Factorial of a given number.

This is one of the topics that are typically part of job interviews, so make sure you know how to implement and explain both approaches without any hints.