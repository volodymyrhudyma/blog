---
title: Algorithms | Binary Search in JavaScript
tag:
  - JavaScript
metaDescription: Learn Binary Search in JavaScript - one of the fastest search
  algorithms, that finds the position of a target value within a sorted array.
teaser: The search is fundamental for every programming language. Having a lot
  of data structures without the ability to search through them sounds like a
  waste of time. There are many ways to perform a search operation, some are
  slower, others faster...
date: 2020-08-28T15:16:53.113Z
---
The search is fundamental for every programming language. 

Having a lot of data structures without the ability to search through them sounds like a waste of time. 

There are many ways to perform a search operation, some are slower, others faster. 

Choosing the right search algorithm can bring enormous benefits to the performance of your project. 

Imagine implementing two approaches that give the same result - the position of the target element, but one is several hundred, thousand or even million times faster.

It is therefore crucial to know as many search algorithms as possible and to be able to choose the one that fits best.

In this article we will learn Binary Search - one of the fastest searching algorithms which **works only with sorted arrays**.

## The definition

**Binary Search**  is a search algorithm that finds the position of a target value within a **sorted** array. 

It compares the target value with the middle element of an array.

If they are equal, then the target value has been found.

If they are not equal, then it is checked whether the target value is greater or less than the middle element of an array. 

If it is smaller, then we can eliminate the right half and continue the search on the left half. 

If it is larger, we eliminate the left half and continue the search on the right half. 

This happens until the target value is found.

If the search ends with the remaining half being empty, the target is not in the array.

![Binary search illustration (source: Wikipedia)](/img/bs.svg "Binary search illustration (source: Wikipedia)")

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

The flow:

1. Get the middle index.
2. Compare the middle element to the target, if equal return `true`.
3. If greater, set the `min` to the previous one and continue search.
4. If smaller, set the `max` to the next one and continue search.
5. If not found, return `-1`.

```javascript
const binarySearch = function (array, target) {
  // Store the middle element
  let guess;
  
  // Store the first element
  let min = 0;
  
  // Store the last element
  let max = array.length - 1;

  // While we still have elements in an array
  while (min <= max) {
    
    // Get the middle element position
    guess = Math.floor((min + max) / 2);
    
    // If the middle element is equal to the taget, return its position
    if (array[guess] === target) {
      return guess;
      
    // If the middle element is smaller than the target
    // Start the next iteration from the next element 
    } else if (array[guess] < target) {
      min = guess + 1;
      
    // If bigger - start from the previous element
    } else {
      max = guess - 1;
    }
  }

  // Return -1 in case if target element was not found
  return -1;
}
```

## Usage in JavaScript

```javascript
// Assuming that the binarySearch function from the example above is accessible
const arr = [1, 256, 264, 345, 669, 930, 1567];

const result = binarySearch(arr, 930);

console.log(result); // Prints "5"
```

## Summary

The binary search is an excellent way to find the target element within a large set of sorted data. 

Even though it is unnecessary with small arrays, it is definitely worth remembering about.