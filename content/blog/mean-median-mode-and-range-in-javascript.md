---
title: Mean, Median, Mode and Range In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn what do Mean, Median, Mode and Range of an Array in
  JavaScript mean and how to easily implement them.
shareImage: /img/mean-median-mode-range-in-javascript.jpg
teaser: Calculating mean, median, mode and range is not a very common task, but
  developers definitely need to know what these are and how to calculate them
  based on an array of numbers. Before we proceed to the implementation, let's
  learn...
date: 2021-08-08T09:22:06.411Z
---
Calculating mean, median, mode and range is not a very common task, but developers definitely need to know what these are and how to calculate them based on an array of numbers.

Before we proceed to the implementation, let's learn what does each of this terms mean.

## Mean

**Mean** is an average of all numbers in an array.

It can be calculated by adding up all numbers and dividing it by the array size.

Let's calculate mean for the following array: **\[2, 4, 5, 7, 1, 8, 1]**:

* Sum all numbers: **2 + 4 + 5 + 7 + 1 + 8 + 1 = 28**
* Divide sum by the size: **28 / 7 = 4**

So, the mean is **4**.

```javascript
const mean = arr => {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total / arr.length;
};
```

## Median

**Median** is the middle number in the **sorted** array of numbers.

To calculate this value, we should firstly sort an array and check the size - whether it is **odd** or **even**.

#### Case #1: Odd

If the size is odd - we can just grab and return the middle number.

Let's calculate mean for the following array: **\[2, 4, 5, 7, 1, 8, 1]**:

* Sort all numbers: **\[1, 1, 2, 4, 5, 7, 8]**
* Check whether the size is odd or even: **7** is **odd**
* Get the middle number and return it: **4**

So, the median is **4**.

#### Case #2: Even

If the size is even - we end up with two middle numbers, so we should calculate their average.

Let's calculate mean for the following array: **\[5, 6, 1, 2, 10, 8, 3, 4]**:

* Sort all numbers: **\[1, 2, 3, 4, 5, 6, 8, 10]**
* Check whether the size is odd or even: **8** is **even**
* Calculate the average of two middle numbers: **(4 + 5) / 2 = 4.5**

So, the median is **4.5**.

```javascript
const median = arr => {
  const { length } = arr;
  
  arr.sort((a, b) => a - b);
  
  if (length % 2 === 0) {
    return (arr[length / 2 - 1] + arr[length / 2]) / 2;
  }
  
  return arr[(length - 1) / 2];
};
```

## Mode

**Mode** is the number that appears most often.

If a few numbers appear the same number of times, let's return the first one.

#### Case #1: One Number

If one number appears most often - we just return it.

Mode for the following array: **\[2, 4, 6, 2, 2]** is **2**.

#### Case #2: A Few Numbers

If a few numbers appear same number of times, return the first one found.

Mode for the following array: **\[2, 4, 6, 2, 2, 4, 4, 6, 6]** is also **2**.

The algorithm is the following:

* Iterate through the array and add each number to the JavaScript Object if it is not yet there
* If the number is already added, increment count of its key
* Check if stored highest mode (**count**) is smaller than the processed number:

  * If smaller, then the **count** variable is changed to whatever the key for the current element is, and the **max** value changed to the current element
  * If greater then do nothing
* After the iteration is finished, **max** will store a number and **count** - frequency, so we return **max**

```javascript
const mode = arr => {
  const mode = {};
  let max = 0, count = 0;

  for(let i = 0; i < arr.length; i++) {
    const item = arr[i];
    
    if(mode[item]) {
      mode[item]++;
    } else {
      mode[item] = 1;
    }
    
    if(count < mode[item]) {
      max = item;
      count = mode[item];
    }
  }
   
  return max;
};
```

## Range

**Range** is the difference between the largest and the smallest number in an array.

Let's calculate range for the following array: **\[2, 4, 5, 7, 1, 8, 1]**:

* Sort all numbers: **\[1, 1, 2, 4, 5, 7, 8]**
* Return new array containing the first and the last numbers from the sorted array: **\[1, 8]**

So, the range is **[1,** **8]**.

```javascript
const range = arr => {
  arr.sort((a, b) => a - b);
  
  return [arr[0], arr[arr.length - 1]];
};
```

## Summary

In this article, we learned how to calculate mean, median, mode and range of an array in JavaScript.

The implementation is simple, unless you know the meaning of each term.

If you don't - make sure you understand it and implement without any hints at least once.