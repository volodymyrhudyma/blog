---
title: Mean, Median, Mode and Range In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn what the Mean, Median, Mode, and Range of an Array mean
  in JavaScript and how to easily implement them.
shareImage: /img/mean-median-mode-range-in-javascript.jpg
teaser: Calculating mean, median, mode and range isn't a very common task, but
  developers definitely need to know what they are and how to calculate them
  based on a set of numbers. Before we proceed with the implementation, let's
  learn...
date: 2021-08-08T09:22:06.411Z
---
Calculating mean, median, mode and range isn't a very common task, but developers definitely need to know what they are and how to calculate them based on a set of numbers.

Before we proceed with the implementation, let's learn what each of these terms means.

## Mean

**Mean** is the average of all the numbers in an array.

It can be calculated by adding all numbers and dividing by the array size.

Let's calculate the mean for the following array: **\[2, 4, 5, 7, 1, 8, 1]**:

* Add all the numbers: **2 + 4 + 5 + 7 + 1 + 8 + 1 = 28**
* Divide the sum by the size: **28 / 7 = 4**

The mean value is **4**.

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

To calculate this value, we should first sort an array and check the size - whether it is **odd** or **even**.

#### Case #1: Odd

If the size is odd, we can just take the middle number and return it.

Let's calculate the median for the following array: **\[2, 4, 5, 7, 1, 8, 1]**:

* Sort all numbers: **\[1, 1, 2, 4, 5, 7, 8]**
* Check whether the size is even or odd: **7** is **odd**
* Find the middle number and return it: **4**

The median value is **4**.

#### Case #2: Even

If the size is even, we have two middle numbers, so we should calculate their average.

Let's calculate the median for the following array: **\[5, 6, 1, 2, 10, 8, 3, 4]**:

* Sort all numbers: **\[1, 2, 3, 4, 5, 6, 8, 10]**
* Check whether the size is even or add: **8** is **even**
* Calculate the average of two middle numbers: **(4 + 5) / 2 = 4.5**

The median value is **4.5**.

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

**Mode** is the number that occurs most often.

If more than one number occurs equally often, the first number is returned.

#### Case #1: One Number

If one number occurs most often, we just return it.

Mode for the following array: **\[2, 4, 6, 2, 2]** is **2**.

#### Case #2: Few Numbers

If a few numbers occur the same number of times, the first number found is returned.

Mode for the following array: **\[2, 4, 6, 2, 2, 4, 4, 6, 6]** is also **2**.

The algorithm is the following:

* Iterate through the array, adding each number to the JavaScript Object if it is not already there
* If the number has already been added, increment its key count
* Check if the highest stored mode (**count**) is smaller than the processed number:

  * If smaller, then the **count** variable is changed to whatever the key for the current element is and the **max** value is changed to the current element
  * If greater, then do nothing
* After the iteration is finished, **max** stores a number and **count** - the frequency, so we return **max**

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

**Range** is the difference between the largest and smallest number in an array.

Let's calculate the range for the following array: **\[2, 4, 5, 7, 1, 8, 1]**:

* Sort all numbers: **\[1, 1, 2, 4, 5, 7, 8]**
* Return a new array containing the first and last numbers from the sorted array: **\[1, 8]**

The range value is **[1,** **8]**.

```javascript
const range = arr => {
  arr.sort((a, b) => a - b);
  
  return [arr[0], arr[arr.length - 1]];
};
```

## Summary

In this article, we learned how to calculate the mean, median, mode and range of an array in JavaScript.

The implementation is simple as long as you know the meaning of each term.

If not, make sure you understand them and implement them at least once without any hints.