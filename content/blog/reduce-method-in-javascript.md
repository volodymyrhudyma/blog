---
title: Reduce Method In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-03-05T18:40:29.733Z
---
 Reduce is one of the most difficult to understand yet the most powerful built-it Array methods.

It helps us to manage to perform different types of actions on an Array without writing a lot of boilerplate code.

## The Reduce Method

The **reduce** method executes the **callback** function on each element of the **arr**. Outputs a single value.

```javascript
arr.reduce(callback, [, initialValue]);
```

Let's break down the arguments.

#### Argument 1: callback

A function that gets executed on each element of an array:

```javascript
callback(accumulator, currentValue, [, index[, array]])

```

It receives four arguments, two of which are optional:

* **accumulator** - as the name suggests, it accumulates the return values of a callback function, or **initialValue** if it was passed
* **currentValue** - an element of an array that is currently being processed
* **index** (optional) - an index of an element that is being processed
* **array** (optional) - an original array **reduce** was called on

#### Argument 2: initialValue

A value that is used as an **accumulator** on the first call of the **callback** function.

if this value is not provided, the first argument of an **array** will be used as an **accumulator** and skipped as a **currentValue**.

If you are not familiar with the method, it may sound overwhelming at the beginning, but let me try to clear things out for you.

Let's look at two simple examples that sum up all array numbers, one with **initialValue** and one without it:

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

The following logs will be printed to the console:

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

Notice that we provided the **initialValue** equal to **0** and it is used as an **accumulator** on the first call.

Then the next call is using return value from the **callback** function (**0** + 10) and so on (**10** + 20, **30** + 30, **60** + 40).

If we don't provide the **initialValue**:

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

We will see the following:

```javascript
'Acc: ' 10
'Curr: ' 20
'Acc: ' 30
'Curr: ' 30
'Acc: ' 60
'Curr: ' 40
'Res: ' 100
```

Notice that the first element of an array (**10**) is used as an **accumulator** in the first call.