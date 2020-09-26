---
title: The Most Important Things You Should Know About Algorithms
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-09-27T07:52:11.294Z
---
## In-place algorithm

The algorithm is called **in-place** if it transforms input almost without using any extra memory, however, a small constant extra space used **for variables** is allowed.

> The strict definition of in-place algorithms includes all algorithms with `O(1)` space complexity.

The input is usually overwritten by the output, as the input sequence is updated only through replacement or swapping of elements.

Examples of in-place algorithms:

* **Bubble Sort** - repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.

  The space complexity is `O(1)`, because only a single additional memory space is required (to store the `temp` variable).
* **Insertion Sort** - iterates, consuming one input element each repetition and growing a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list and inserts it there.

  The space complexity is `O(1)`.
* **Selection Sort** - divides the input array into two sublists - a sorted one, which is built up from left to right and a sublist of the remaining unsorted items, which take up the rest of the list.

  First, the sorted sublist is empty and the unsorted sublist contains the entire input array.

  An algorithm works by finding the smallest (or the largest, depending on the order) element in the unsorted sublist and swapping it with the leftmost unsorted element, thereby extending the length of the sorted sublist.

  This process continues until the entire input array is sorted.

  The space complexity is `O(1)`. 
* **Heap Sort** - divides its input into a sorted and an unsorted region and iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region.

  Can be considered as an improved Selection Sort: heapsort does not waste time with a linear-time scan of the unsorted region; rather, heap sort maintains the unsorted region in a **heap data structure** to more quickly find the largest element in each step.
* **Quick Sort(?)** - works by selecting a **pivot** element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. 

  The sub-arrays are then sorted recursively.

  On the one hand, the space complexity of this algorithm is `O(logN)`, which disqualifies it from being an in-place algorithm, as it is greater that `O(1)`.

  But on the other hand, it qualifies as an in-place algorithm, as the algorithm is just swapping elements within the input data structure.

  In summary, qualifying Quick Sort to be in-place or not-in-place depends on the definition of in-place algorithms, which can be found different in different sources.

## Not-in-place algorithm

The algorithm is called **not-in-place** if it transforms input using additional memory, which depends on input size.

Examples of not-in-place algorithms:

* Merge Sort - works by dividing the unsorted list by `n` sublists, each containing one element and repeatedly merging these sublists, producing new sorted sublists until one left.

  The space complexity is `O(N)`.

## Divide-and-conquer algorithm

## Comparison-based algorithm

## Stable algorithm

## Unstable algorithm

## Space complexity

## Time complexity

## Big O notation

## Summary