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

Examples of in-place sotring algorithms:

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

Examples of not-in-place sorting algorithms:

* **Merge Sort** - works by dividing the unsorted list by `n` sublists, each containing one element and repeatedly merging these sublists, producing new sorted sublists until one left.

  The space complexity is `O(N)`.

## Divide-and-conquer algorithm

**Divide and conquer** is an [](https://en.wikipedia.org/wiki/Algorithm_design_paradigm "Algorithm design paradigm")algorithm design paradigm based on multi-branched [](https://en.wikipedia.org/wiki/Recursion "Recursion")recursion.

Algorithms that use this paradigm work by recursively breaking down a problem into two or more sub-problems of the same or related type, until these become simple enough to be solved directly. 

The solutions to the sub-problems are then combined to give a solution to the original problem.

This divide-and-conquer technique is the basis of efficient algorithms for all kinds of problems, not only for sorting.

Examples of divide-and-conquer sorting algorithms:

* **Quick Sort**
* **Merge Sort**

## Comparison-based algorithm

**The comparison-based algorithm** is a type of sorting algorithm that only operates on the input array by comparing pairs of elements and moving elements around based on the results of these comparisons.

Examples of comparison-based sorting algorithms:

* **Bubble Sort**
* **Insertion Sort**
* **Selection Sort**
* **Heap Sort**
* **Quick Sort**
* **Merge Sort**

## Stable algorithm

**A stable sorting algorithm** preserves the order of records with equal keys.

The sorting algorithm can be considered as stable if two objects with equal keys appear in the same order in sorted output as they were in the unsorted input.

It is important to use only a stable sorting algorithm if the problem that needs to be solved requires retention of that relative order.

Examples of stable sorting algorithms:

* **Bubble Sort**
* **Insertion Sort**
* **Merge Sort**

## Unstable algorithm

**The unstable sorting algorithm** does not preserve the order of records with equal keys.

Examples of unstable sorting algorithms:

* **Selection Sort**
* **Heap Sort**
* **Quick Sort**

## Big O notation

In the previous sections we were talking a bit about space complexity, but do we really understand what does `O(...)` mean?

It is called **Big O notation**. 

In computer science, it is used to describe required execution time or space used by an algorithm.

The best way to understand this concept is to look at some examples.

* **O(1)** - an algorithm will always execute in the same time or space, regardless of the input size:

```javascript
const getLastElement = arr => arr[arr.length - 1];

console.log(getLastElement([1, 2, 3])); // Prints "3"
```

* **O(N)** - the complexity of an algorithm grows linearly to the size of input:

```javascript
const findValue = (arr, value) => {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i] === value) {
      return 1;
    }
  }
  
  return -1;
}

console.log(findValue([1, 6, 75], 75)); // Prints "1"
console.log(findValue([1, 6, 75], 2)); // Prints "-1"
```

* **O(N2)** - the complexity is proportional to the square of the input size:

```javascript
const findValue = (arr, value) => {
  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr[i].length; j++) {
      if(arr[i][j] === value) {
        return 1;
      }
    }
  }
  
  return -1;
}

const arr = [
  [
    1, 2, 3
  ],
  [
    4, 5, 6
  ],
];

console.log(findValue(arr, 6)); // Prints "1"
console.log(findValue(arr, 7)); // Prints "-1"
```

* **O(logN)** - the complexity goes up linearly while the **N** goes up exponentially (a good example - binary search implementation):

```javascript
const binarySearch = function (array, target) {
  let guess;
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    guess = Math.floor((min + max) / 2);
    
    if (array[guess] === target) {
      return guess;
    } else if (array[guess] < target) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }

  return -1;
}
```

* **O(NlogN)** - for each input, the algorithm is running an operation at **O(logN)** (a good example - merge sort implementation):

```javascript
const merge = (left, right) => {
  let result = [];
  
  while(left.length && right.length) {
    if(left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  
  return result.concat(left.slice().concat(right.slice()));
};

const mergeSort = arr => {
  if(arr.length <= 1) {
    return arr;
  }
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
};
```

* **O(2N)** - number of calculations doubles each time a new element is added to an input (a good example - recursive calculation of Fibonacci numbers):

```javascript
// program to display fibonacci sequence using recursion
const fibonacci = num => {
  if(num <= 1) {
    return num;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

console.log(fibonacci(10)); // Prints "55"
```

The following image shows the number of operations **N** versus the input size **n**:

![Algorithms complexity explained](/img/webp.net-resizeimage-1-.png "Algorithms complexity explained")

## Algorithm complexity

**The complexity of an algorithm** is a measure of needed time, space or other resources needed to complete the execution.

Usually, this involves determining a function that relates the length of an algorithm's input to the number of steps it takes (its **time complexity**) or the number of storage locations it uses (its **space complexity**). 

An algorithm is said to be efficient when this function's values are small, or grow slowly compared to a growth in the size of the input.

Different inputs of the same length may cause the algorithm to have different behavior, so **best**, **worst** and **average** case descriptions might all be of practical interest. 

When not otherwise specified, the function describing the performance of an algorithm is usually an upper bound, determined from the worst case inputs to the algorithm.

Let's take a look at the **Quick Sort** algorithm:

* Best-case time complexity is `O(NlogN)`, if each time we divide an array into two nearly equal or equal pieces
* Worst-case time complexity is `O(N2)`, if one of the pieces has a length equal to the size **N - 1** and it happens repeatedly in every partition

  This can occur if the selected pivot element is the smallest or the largest one on the list, or in some implementations when all elements are equal.
* Average-case time complexity is `O(NlogN)`

## Summary

In this article we filled in all the gaps that could have appeared in the process of learning different types of search and sorting algorithms.

Knowing these simple concepts, try to keep you code as performant as possible.

Although it seems like an obvious concept, a lot of developers still neglect this and it leads to writing legacy code, that is slow but just works.