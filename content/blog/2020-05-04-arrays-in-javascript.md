---
title: Arrays in JavaScript
tag:
  - JavaScript
teaser: Array in JavaScript is ordered collection of values where each value has
  its own position, known as index. In array index of the first element is 0,
  index of the second element is 1 and so on. The difference between arrays and
  objects is...
date: 2020-05-04T17:55:34.302Z
---
Array in JavaScript is ordered collection of values where each value has its own position, known as `index`. In array index of the first element is `0`, index of the second element is `1` and so on.

What is the difference between arrays and objects? As both of them are used to store collection of values.

In JavaScript arrays use **numbered indexes**, objects use **named indexes**. 

You can say that arrays are special kind of objects with numbered indexes.

## Create an array

As with objects, there are numerous ways of creating array. 

The most popular and easiest one is array literal:

```javascript
// Empty array
const empty = [];

// Array of strings
const users = ["John", "Andrew", "Mike"];

// Array of numbers
const numbers = [0, 1, 2, 3];

// Array of objects
const objects = [
  {
    name: "John"
  },
  {
    name: "Andrew"
  },
  {
    name: "Mike"
  }
];
```

## Access array elements

**Important note:** remember that array indexes start at `0`.

You can access array element by referring to its index:

```javascript
const users = ["John", "Andrew", "Mike"];

const john = users[0]; // Contains "John"
const andrew = users[1]; // Contains "Andrew"
const mike = users[2]; // Contains "Mike"
```

**Important note:** to access the last element, use `length` property of an array minus one:

```javascript
const users = ["John", "Andrew", "Mike"];

console.log(users[users.length - 1]); // Prints "Mike"
```

## What if element does not exist?

If element under given index does not exist, you would receive `undefined`:

```javascript
const users = ["John", "Andrew", "Mike"];

console.log(users[3]); // Prints "undefined"
```

## Add element

In order to add element to the end of the array, use `push` method:

```javascript
const users = ["John", "Andrew"];

users.push("Mike");

console.log(users); // Prints ["John", "Andrew", "Mike"]
```

In order to add element to the beginning of the array, use `unshift` method:

```javascript
const users = ["John", "Andrew"];

users.unshift("Mike");

console.log(users); // Prints ["Mike", John", "Andrew"]
```

**Important note:** both `push` and `unshift` return new length of the array:

```javascript
const users = ["John", "Andrew"];

const newLength = users.unshift("Mike");
console.log(newLength); // Prints "3"

const latestLength = users.push("Mary");
console.log(latestLength); // Prints "4"
```

**Important note\[2]:** Adding an element with high index can cause populating array with `undefined` values:

```javascript
const users = ["John", "Andrew"];

users[4] = "Mary";

console.log(users); // Prints ["John", "Andrew", undefined, undefined, "Mary"]
```

**Note:** yes, you can add elements to array also by specifying index, but that's not the best way. Use `push` or `unshift` instead.

## Change element

To change value in array, use `index` and assignment operator:

```javascript
const users = ["John", "Andrew"];

users[0] = "Mike";

console.log(users); // Prints ["Mike", "Andrew"]
```

**Important note:** if you try to change element that does not exist, you will end up adding it:

```javascript
const users = ["John", "Andrew"];

users[2] = "Mike";

console.log(users); // Prints ["John", "Andrew", "Mike"]
```

## Delete element

There are a lot of ways to remove element from an array. Let's take a look at some of them:

#### pop

Removes last element from the array and returns it:

```javascript
const users = ["John", "Andrew"];

const removedElement = users.pop();

console.log(removedElement); // Prints "Andrew"

console.log(users); // Prints ["John"]
```

#### shift

Removes first element from the array:

```javascript
const users = ["John", "Andrew"];

users.shift();

console.log(users); // Prints ["Andrew"]
```

#### splice

Receives 2 parameters: the first one is `index` point to start and the second one is the number of elements to remove:

```javascript
const users = ["John", "Andrew", "Mike"];

// Start removing from 0 element, remove 1 item
users.splice(0, 1);

console.log(users); // Prints ["Andrew", "Mike"]
```

```javascript
const users = ["John", "Andrew", "Mike", "Mary"];

// Start removing from 1-st element, remove 2 items 
users.splice(1, 2);

console.log(users); // Prints ["John", "Mary"]
```

#### filter

Creates new array with elements that fall under a given criteria from an existing array:

```javascript
const users = ["John", "Andrew", "Mike", "Mary"];

const filteredUsers = users.filter(user => user !== "John");

console.log(filteredUsers); // Prints ["Andrew", "Mike", "Mary"]
```

## Check if element exists

To check if element exists in array, use `includes` method. It returns `true` if element exists in array, `false` if not:

```javascript
const users = ["John", "Andrew"];

console.log(users.includes("John")); // Prints "true"

console.log(users.includes("Mary")); // Prints "false"
```

**Important note:** `includes` function accepts 2 parameters: element and start position. By default start position is `0`. You can change it if you need.

## Iterate over array elements

There are a lot of ways to iterate over array element. Some of them are:

#### for loop

```javascript
const users = ["John", "Andrew"];

for(let index = 0; index < users.length; index++) {
  console.log(users[index]); // 1-st iteration -> "John", 2-nd -> "Andrew"
}
```

#### while loop

```javascript
const users = ["John", "Andrew"];

let index = 0;

while(index < users.length) {
  console.log(users[index]); // 1-st iteration -> "John", 2-nd -> "Andrew"
  index++;
}
```

#### forEach

```javascript
const users = ["John", "Andrew"];

users.forEach(function(item, index) {
  console.log(item); // 1-st iteration -> "John", 2-nd -> "Andrew"
})
```

## Array length

`length` property of an array returns the number of elements in an array. The length of an array is always one more than its highest index.

```javascript
const users = ["John", "Andrew", "Mike"];

console.log(users.length); // Prints "3"
```

## How to recognize an array

Sometimes it's necessary to know if the variable is an array or no. The first thing that comes to mind is `typeof` operator, let's try to use it:

```javascript
const users = ["John", "Andrew", "Mike"];

console.log(typeof users); // Prints "object"
```

Oh, `typeof` array is `object`. Do you still remember that in JavaScript everything is `object` except the primitives. 

So, is there a way to check if variable is an array?

The answer is - yes, the is even more than one solution:

#### Array.isArray

```javascript
const users = ["John", "Andrew", "Mike"];

console.log(Array.isArray(users)); // Prints "true"
```

#### instanceof

```javascript
const users = ["John", "Andrew", "Mike"];

console.log(users instanceof Array); // Prints "true"
```

## Array properties and methods

JavaScript arrays have a lot of built properties and methods, in order to learn more about them, read [this article](link).

## Summary

In this article we learnt how to deal with arrays. Make sure to understand given material, as this is something you will be using on a daily basis as JavaScript developer.

* Array in JavaScript is ordered collection of values where each value has its own position, known as `index`
* Index of the first element is `0`, index of the second element is `1` and so on
* To create an array, you have to use array literal `[]`
* You can access array element by referring to its index
* If element under given index does not exist, you would receive `undefined`
* In order to add element to the end of the array, use `push` method
* In order to add element to the beginning of the array, use `unshift` method
* To change value in array, use `index` and assignment operator
* To remove element from an array use: `pop`, `shift`, `splice`, `filter`
* To check if element exists in array, use `includes` method
* To iterate over array elements use: `for` loop, `while` loop, `forEach`
* Use `length` property of an array to find out number of elements
* Array has a lot of built-in methods, make sure to check them out by referring to [this article](/2020-05-05-javascript-built-in-arrays-methods/)