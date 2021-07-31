---
title: Fibonacci Sequence In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/fibonacci-in-javascript.jpg
teaser: "Fibonacci Sequence is a sequence of numbers, such as each number is a
  sum of two previous ones, starting from 0 and 1. The example sequence: 0, 1,
  1, 2, 3, 5, 8, 13, 21, 34, etc. It can be represented by the following
  formula..."
date: 2021-07-31T20:36:38.604Z
---
Fibonacci Sequence is a sequence of numbers, such as each number is a sum of two previous ones, starting from 0 and 1.

The example sequence: **0, 1, 1, 2, 3, 5, 8, 13, 21, 34**, etc.

It can be represented by the following formula: **F(n) = F(n-1) + F(n-2)**, where **F(0) = 0**, **F(1) = 1**.

Today we will learn a few ways to implement a function that:

* finds the Fibonacci number under the given index in the sequence:

  `fibonacci(10) -> 55`
* finds the index of a given Fibonacci number in the sequence:

  `fibonacci(55) -> 10`
* prints the whole Fibonacci Sequence up to a certain index:

  `fibonacci(10) -> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55`

## Index Value Of Fibonacci Sequence

This function will be written in two ways, using the for loop and recursion.

#### For Loop

The very basic solution, that every developer should be able to code, when woke up in the middle of the night:

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

In this solution, we sum two numbers in a loop (**a + b**) and reassign each item with the next value (**a** with **b**, **b** with **c** - the result of **a + b**).

As soon as the loop reached the desired index, we return the calculated sum.

You may ask: "Why do we start the loop not from 0, but 2?".

The answer is simple - because for the **n** equal to 0 or 1, we can just return this number, because as we already know - **F(0) = 0**, **F(1) = 1**.

The time complexity for this solution is linear - O(n), because we execute the loop from **2** to **n**.

The space complexity is O(1), because it doesn't matter whether we will execute **fibonacci(10)** or **fibonacci(100)**, the amount of required space remains the same. 

#### Recursive Solution

Recursions are always tricky to wrap you head around, but once you understand it, this solution may even seem a bit simpler that the above once due to less code:

```javascript
const fibonacci = n => {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};
```

Same, as with the loop, if we pass a number that is smaller or equal to 1, we just return this number.

Otherwise, we execute the **fibonacci** function once again, passing two previous numbers.

The time complexity for this solution is exponential - O(2^n), which is pretty high, so we will need to do some optimizations.

The space complexity is O(n).

#### Optimized Recursive Solution

We can use Memoization technique to store the results of the **fibonacci** function executions in the variable to ensure that the function is invoked only once per number, then the value is read from cache:

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

The time complexity for this solution is linear - O(n), because we make sure to execute the function once per given index return the the result from cache later.

The space complexity remains the same as equals to O(n).

## Summary