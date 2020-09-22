---
title: Algorithms | Heap Sort in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-09-23T19:58:05.574Z
---
## The definition

**Heap sort** is a comparison-based algorithm that can be considered as improved Selection Sort.

Like Selection Sort, divides an input on two parts, sorted and unsorted one.

It iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region.

It maintains the unsorted region in a data structure called **heap** to find the largest element more quickly:

![Heap Sort example](/img/heap_sort_example.gif "Heap Sort example")

The visualization:

![Heap Sort visualization](/img/sorting_heapsort_anim.gif "Heap Sort visualization")

## What is heap?

**Heap** is a tree-based data structure where the root node is compared to its children and arranged accordingly.

There are two types of heaps:

* **Max heap** - the value of the root node is **greater than** any of its children
* **Min heap** - the value of the root node is **smaller than** any of its children

![Min and max heap example](/img/1mghtrv.png "Min and max heap example")

## Build heap from array

Before we building the Heap Sort in JavaScript, it is crucial to understand how array indexes are mapped to tree positions.

Consider the following array:

```javascript
const arr = [10, 4, 7, 11, 2, 1];
```

It's binary tree representation:

```javascript
      10
    /    \
   4      7
  / \    /
 11  2  1
```

## The complexity

Although it is slower than a well-implemented Quick Sort, it has the advantage of a better worst-case runtime.

Best-case performance - `O(NlogN)` if the keys are distinct and `O(N)` if the keys are equal.

Worst-case performance - `O(NlogN)`.

Average - `O(NlogN)`.

## Pros and Cons

## Implementation in JavaScript

## Usage in JavaScript

## Summary