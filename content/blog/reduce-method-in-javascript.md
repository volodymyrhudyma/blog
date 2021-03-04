---
title: Reduce Method In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn built-in reduce method in JavaScript, which reduces an
  array to a single value by executing a callback function for each of its
  elements.
teaser: Reduce is one of the most difficult to understand, but the most powerful
  built-in array methods. It helps us perform different kinds of actions on an
  array without writing a lot of boilerplate code. Basically, it...
date: 2021-03-05T18:40:29.733Z
---
Reduce is one of the most difficult to understand, but the most powerful built-in array methods.

It helps us perform different kinds of actions on an array without writing a lot of boilerplate code.

Basically, it reduces an array to a single value.

## The Reduce Method

The **reduce** method executes the **callback** function on each element of the **arr**. Outputs a single value.

```javascript
arr.reduce(callback, [, initialValue]);
```

Let's break down the arguments.

#### Argument 1: callback

A function that is executed on each element of an array:

```javascript
callback(accumulator, currentValue, [, index[, array]])
```

It receives four arguments, two of which are optional:

* **accumulator** - as the name implies, it accumulates the return values of a callback function or **initialValue** if passed
* **currentValue** - an element of an array that is currently being processed
* **index** (optional) - an index of an element that is currently being processed
* **array** (optional) - an original array **reduce** was called on

#### Argument 2: initialValue

A value used as **accumulator** in the first call to the **callback** function.

If this value is not specified, the first argument of an **array** is used as the **accumulator** and skipped as the **currentValue**.

If you're not familiar with the method, it may sound overwhelming at first, but let me try to clear things up for you.

Let's look at two simple examples that sum up all the array numbers, one with **initialValue** and one without it:

```javascript
const arr = [10, 20, 30, 40];

const initialValue = 0;

const callback = (accumulator, currentValue) => {
  console.log("Acc: ", accumulator);
  console.log("Curr: ", currentValue);
  
  return accumulator + currentValue;
}

const result = arr.reduce(callback, initialValue);

console.log("Res: ", result);
```

The following logs are printed to the console:

```javascript
'Acc: ' 0
'Curr: ' 10
'Acc: ' 10
'Curr: ' 20
'Acc: ' 30
'Curr: ' 30
'Acc: ' 60
'Curr: ' 40
'Res: ' 100
```

Note that we have set the **initialValue** to **0** and it is used as **accumulator** in the first call.

Then the next call uses the return value of the **callback** function (**0** + 10) and so on (**10** + 20, **30** + 30, **60** + 40).

If we do not provide the **initialValue**:

```javascript
const arr = [10, 20, 30, 40];

const callback = (accumulator, currentValue) => {
  console.log("Acc: ", accumulator);
  console.log("Curr: ", currentValue);
  
  return accumulator + currentValue;
}

const result = arr.reduce(callback);

console.log("Res: ", result);
```

Here is what we're going to see:

```javascript
'Acc: ' 10
'Curr: ' 20
'Acc: ' 30
'Curr: ' 30
'Acc: ' 60
'Curr: ' 40
'Res: ' 100
```

Note that the first element of an array (**10**) is used as an **accumulator** in the first call.

## Common Usage Examples

There are many ways to use the reduce function, but in this section, we will look at the most common ones.

#### Example 1: Summing Values In An Array

A quick way to get the sum of all array values:

```javascript
const result = [1, 2, 3].reduce((acc, item) => acc + item);

// Prints "6"
console.log(result);
```

#### Example 2: Convert An Array To An Object

I personally use this a lot in my projects.

The most recent case was that I received an array of fields for validation from the CMS and needed to convert it:

```javascript
const result = ["name", "surname"].reduce((acc, item) => {
  acc[item] = {
    isValid: false,
  }; 
  return acc
}, {});

// Prints { name: { isValid: false }, surnamt: { isValid: false } } 
console.log(result);
```

#### Example 3: Grouping Objects By Property

Reduce is the perfect method to group an array of objects by property:

```javascript
const result = [
  { name: 'John', age: 18 },
  { name: 'Andrew', age: 18 },
  { name: 'Mark', age: 20 }
].reduce((acc, item) => {
  if(!acc[item.age]) {
    acc[item.age] = [];
  }
  acc[item.age].push(item);
  return acc;
}, {});

// Prints
// {
//   "18": [ { name: "John", age: 18 }, { name: "Andrew", age: 18 } ],
//   "20": [ { name: "Mark", age: 20 } ]
// }
console.log(result);
```

And there are many more examples [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

## Summary

The reduce method is a very powerful tool in hands of the developer who knows how it works and when to use it.

Be sure to use it in your next project!