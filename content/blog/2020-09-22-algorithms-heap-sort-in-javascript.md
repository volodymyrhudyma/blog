---
title: Algorithms | Heap Sort in JavaScript
tag:
  - JavaScript
metaDescription: Learn Heap Sort in JavaScript - simple, in-place, unstable,
  comparison sorting algorithm, its advantages and disadvantages and why it is a
  good and widely-used choice.
teaser: The topic of today is Heap Sort - a sorting algorithm that is widely
  used because of its simplicity and efficiency. It uses heap data structure to
  find the largest element in each step...
date: 2020-09-23T19:58:05.574Z
---
The topic of today is **Heap Sort** - a sorting algorithm that is widely used because of its simplicity and efficiency.

It uses heap data structure to find the largest element in each step.

## The definition

**Heap sort** is a comparison-based algorithm that can be considered as improved Selection Sort.

Like Selection Sort, divides an input into two parts, one sorted and one unsorted.

It reduces the unsorted area iteratively by pulling the largest element from it and inserting it into the sorted area.

It retains the unsorted region in a data structure called **heap** to find the largest element faster:

![Heap Sort example](/img/heap_sort_example.gif "Heap Sort example")

The visualization:

![Heap Sort visualization](/img/sorting_heapsort_anim.gif "Heap Sort visualization")

## What is heap?

**Heap** is a tree-based data structure in which the root node is compared with its children and arranged accordingly.

There are two types of heaps:

* **Max heap** - the value of the root node is **greater than** any of its children

![Max heap](/img/max-heap.svg "Max heap")

* **Min heap** - the value of the root node is **smaller than** any of its children

![Min heap](/img/min-heap.png "Min heap")

## Build tree from an array

Before we build the Heap Sort in JavaScript, it is crucial to understand how array indexes are mapped to tree positions.

Consider the following array:

```javascript
const arr = [10, 4, 7, 11, 2, 1, 9];
```

It's binary tree representation:

```javascript
      10
    /    \
   4      7
  / \    / \
 11  2  1   9
```

If we observe carefully and assume that the index of any element is `i`, we can observe the following rules:

* The left child is at index `(2*i + 1)`
* The right child is at index `(2*i + 2)`
* The parent is at index `(i - 1) / 2`

Let's test these rules out:

```javascript
Index of the "7" is "2"

Then index of the left child is (2 * 2 + 1) = 5
Which equals to "1"

Then index of the right child is (2 * 2 + 2) = 6
Which equals to "9"

Then index of the parent element is (2 - 1) / 2 = 0.5 = ~0
Which equals to "10"
```

## The complexity

Best-case performance - `O(NlogN)` if the keys are different and `O(N)` if the keys are the same.

Worst-case performance - `O(NlogN)`.

Average - `O(NlogN)`.

## Pros and Cons

Although it is slower than a well-implemented Quick Sort, it has the advantage of a better worst-case runtime.

#### Pros

* Efficiency, therefore it is widely used
* Good worst-case scenario
* In-place algorithm

#### Cons

* Unstable sorting

## Implementation in JavaScript

## Usage in JavaScript

## Summary