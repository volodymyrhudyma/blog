---
title: Algorithms | Quick Sort in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASEr
date: 2020-09-01T17:30:41.647Z
---
## The definition

**Quick Sort** is an efficient sorting algorithm that follows the "divide-and-conquer" approach.

It works by selecting a pivot element from the list and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. 

The sub-arrays are then sorted recursively.

![Quick Sort illustration](/img/quicksort-example.gif "Quick Sort illustration")

Animated visualization of the quicksort algorithm. The horizontal lines are pivot values:

![Quick Sort visualization](/img/sorting_quicksort_anim.gif "Quick Sort visualization")

## The complexity

Best-case performance - `O(NlogN)`, if each time we divide an array into two nearly equal or equal pieces.

Worst-case performance - `O(N2)`, if one of the pieces has a length equal to the size `N - 1` and it happens repeatedly in every partition.

This can occur if the selected pivot element is the smallest or the largest one on the list, or in some implementations when all elements are equal.

Average - `O(NlogN)`.

## Pros and Cons

Even though Quick Sort is an efficient algoritthm, the efficiency is majorly impacted by which element is chosen as the pivot point.

#### Pros

* Simplicity
* High performance if the pivot element was correctly chosen 
* Being an in-place algorithm, which means that it requires small additional amounts of memory to perform a sorting operation.

  > In computer science, an **in-place algorithm** is an algorithm which transforms input using no auxiliary data structure. However a small amount of extra storage space is allowed for auxiliary variables. 
  >
  > The input is usually overwritten by the output as the algorithm executes. 
  >
  > In-place algorithm updates input sequence only through replacement or swapping of elements

#### Cons

* The efficiency of the algorithm highly depends on the chosen pivot element. Choosing the wrong one leads to poorer performance

## Implementation in JavaScript

## Usage in JavaScript

## Summary