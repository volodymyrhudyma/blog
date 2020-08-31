---
title: Algorithms | Bubble Sort in JavaScript
tag:
  - JavaScript
metaDescription: Learn and implement Bubble Sort in JavaScript in two ways.
  Bubble Sort is an algorithm with an average complexity of O(N2), which makes
  it inefficient especially for larger data sets.
teaser: Sorting a list is one of the most common problems most programmers face.
  If you know many ways to perform a sorting operation, you can choose the best
  and most efficient one. In this article we will learn more about Bubble Sort
  and why it might be an inefficient choice...
date: 2020-08-31T07:17:01.506Z
---
Sorting a list is one of the most common problems most programmers face. 

If you know many ways to perform a sorting operation, you can choose the best and most efficient one. 

In this article we will learn more about **Bubble Sort** and why it might be an inefficient choice.

## The definition

**Bubble sort** is a sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order:

![Bubble sort illustration](/img/bubble-sort.gif "Bubble sort illustration")

The next reasonable question you can have after learning how it works may be: "Why Bubble Sort is called Bubble Sort?".

It got its name because elements tend to move upwards in the right order, like bubbles that rise to the surface.

See the visualization:

![Bubble sort visualization](/img/ezgif.com-gif-maker.gif "Bubble sort visualization")

## The complexity

Best-case performance - `O(1)`, if the list is sorted.

Worst-case performance - `O(N2)`, if the list is not sorted.

Average - `O(N2)`.

## Pros and Cons

It is very simple algorithm that performs poorly in real world and is used primarily as an educational tool.

#### Pros

* Simplicity
* Ability to detect that the list is sorted efficiently is built into the algorithm

#### Cons

* Extremely time-consuming

## Implementation in JavaScript

There are two ways of implementing Bubble Sort in JavaScript.

The first implementation is a bit inefficient, as it has `O(N2)` complexity even if the list is sorted:

```javascript
const bubbleSort = (arr) => {
  const length = arr.length;
  
  for(let i = 0; i < length; i++) {
    for(let j = 0; j < length; j++) {
      
      // If the element from the left is greater, swap them
      if(arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    } 
  }
  
  return arr;
}
```

The second implementation is more optimized. We stop an algorithm if we have not performed any swap:

```javascript
const bubbleSort = (arr) => {
  const length = arr.length;
  let swapped;
  
  do {
    swapped = false;
    for(let i = 0; i < length; i++) {
      
      // If the element from the left is greater, swap them
      if(arr[i] > arr[i + 1]) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
      }
    } 
  } while(swapped);
  
  return arr;
}
```

## Usage in JavaScript

```javascript
// Assuming that the bubbleSort function from the example above is accessible
const arr = [10, 34, 3, 2];

console.log(bubbleSort(arr)); // Prints "[2, 3, 10, 34]"
```

## Summary

Due to its simplicity Bubble Sort it is often used to introduce the concept of a sorting algorithm, but it is one of the most inefficient sorting algorithms with an average complexity of `O(N2)`. 

It provides a good introduction to the world of more complex sorting algorithms, so be sure to play around with it.