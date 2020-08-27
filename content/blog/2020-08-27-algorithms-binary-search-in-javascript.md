---
title: Algorithms | Binary Search in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-08-28T15:16:53.113Z
---
The search is fundamental for every programming language. 

Having a lot of data structures without the ability to search through them sounds like a waste of time. 

There are many ways to perform a search operation, some are slower, others faster. 

Choosing the right search algorithm can bring enormous benefits to the performance of your project. 

Imagine implementing two approaches that give the same result - the position of the target element, but one is several hundred, thousand or even million times faster.

It is therefore crucial to know as many search algorithms as possible and to be able to choose the one that fits best.

In this article we will learn Binary Search - the fastest searching algorithm which **works only with sorted arrays**.

## The definition

**Binary Search**  is a search algorithm that finds the position of a target value within a **sorted** array. 

It compares the target value with the middle element of an array.

If they are equal, then the target value has been found.

If they are not equal, then it is checked whether the target value is greater or less than the middle element of an array. 

If it is smaller, then we can eliminate the right half and continue the search on the left half. 

If it is larger, we eliminate the left half and continue the search on the right half. 

This happens until the target value is found.

If the search ends with the remaining half being empty, the target is not in the array.

## The complexity

The complexity of the Binary Search is `O(logN)` where `N` is the number of elements within an array.

Best-case performance - `O(1)`, when the target element is in the middle of an array.

Worst-case performance - `O(log2N)`, when the target element is found at the end, when an array is narrowed down to single item.

## Pros and Cons

We do not live in a perfect world, and Binary Search has advantages and disadvantages as well:

#### Pros

* Extremely fast, an element in an array of 4,294,967,296 (4 billions) items can be found in max 32 operations
* Can be implemented in a very simple way
* Well-known and widely used

#### Cons

* Works only with sorted arrays
* Using it on small arrays can be an overkill

## Implementation in JavaScript

## Usage in JavaScript

## Summary