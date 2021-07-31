---
title: Fibonacci Sequence In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn Fibonacci Sequence in JavaScript - print Fibonacci Number
  under given index and print an index for a given Fibonacci Number.
shareImage: /img/fibonacci-in-javascript.jpg
teaser: "Fibonacci Sequence is a sequence of numbers in which as each number is
  a sum of the previous two, starting with 0 and 1. The example sequence: 0, 1,
  1, 2, 3, 5, 8, 13, 21, 34, 55, etc. It can be represented by the following
  formula..."
date: 2021-07-31T20:36:38.604Z
---
Fibonacci Sequence is a sequence of numbers in which as each number is a sum of the previous two, starting with 0 and 1.

The example sequence: **0, 1, 1, 2, 3, 5, 8, 13, 21, 34**, **55**, etc.

It can be represented by the following formula: **F(n) = F(n-1) + F(n-2)**, where **F(0) = 0**, **F(1) = 1**.

Today we will learn a few ways to implement a function that:

* finds the Fibonacci number under the given index in the sequence:

  `fibonacci(10) -> 55`
* finds the index of a given Fibonacci number in the sequence:

  `fibonacci(55) -> 10`

## Find Fibonacci Number Of A Given Index

This function will be written in three ways: using the for loop, for loop with an array and recursion.

#### For Loop

The very basic solution that every developer should be able to code, when woke up in the middle of the night:

```javascript
const fibonacci = n => {
  let a = 0, b = 1, c = n;
  
  for(let i = 2; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  
  return c;
};
```

In this solution, we add two numbers in a loop (**a + b**) and reassign each item with the next value (**a** with **b**, **b** with **c** - the result of **a + b**).

Once the loop reaches the desired index, we return the calculated sum.

You may ask, "Why do we start the loop at 2 instead of 0?".

The answer is simple - because for **n** equal to 0 or 1, we can return that number, because as we already know - **F(0) = 0**, **F(1) = 1**.

The time complexity for this solution is linear - **O(n)**, because we run the loop from **2** to **n**.

The space complexity is **O(1)** because it does not matter if we run **fibonacci(10)** or **fibonacci(100)**, the space required remains the same.

#### For Loop With Array

Another popular and straightforward solution is to use a for loop and an array:

```javascript
const fibonacci = (n) => {
  if(n <= 1) {
    return n;
  }

  const result = [0, 1];

  for (let i = 2; i <= n; i++) {
    result[i] = result[i - 2] + result[i - 1]
  }

  return result[result.length - 1];
}
```

Basically the same solution as the loop, but using arrays for storage instead of **a** and **b** variables.

Both the time and space complexity is **O(n)**.

#### Recursive Solution

Recursion is always difficult to understand, but once you do, this solution may even seem a bit simpler than the one above because it contains less code:

```javascript
const fibonacci = n => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};
```

Same, as in the above example: if we pass a number that is less than or equal to 1, we just return this number.

Otherwise, we run the **fibonacci** function again, passing two previous numbers.

The time complexity for this solution is exponential - **O(2^n)**, which is quite high, so we definitely need to do some optimizations.

The space complexity is **O(n)**.

#### Optimized Recursive Solution

We can use the Memoization technique to store the results of the **fibonacci** function executions in the variable to ensure that the function is called only once per number, then the value is read from the cache:

```javascript
let cache = {};

const fibonacci = n => {
  if (n <= 1) {
    return n;
  }
  
  if(cache[n]) {
    return cache[n];
  }
  
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  
  cache[n] = result;
  
  return result;
};
```

The time complexity for this solution is linear - **O(n)**, since we ensure that the function is executed only once per given index and the result is later returned from the cache.

The space complexity remains the same and is equal to **O(n)**.

## Find Index Of A Given Fibonacci Number

We are given a Fibonacci number and want to find its index in the Fibonacci sequence.

An easy way to do this is to find the Fibonacci numbers up to a given number and count the number of iterations performed: 

```javascript
const getFibonacciIndex = n => {
  if (n <= 1) {
    return n;
  }
   
  let a = 0, b = 1, c = 1, result = 1;
  
  while (c < n) {
    c = a + b;
    a = b;
    b = c;
    result++;
  }
  
  return result;
};
```

## Summary

In this article, we learned how to find the Fibonacci number under a given index and how to find the index of a given Fibonacci number.

This topic is not complicated, but it is often asked in job interviews. 

Make sure you know how to create all of these functions without a cheat sheet.