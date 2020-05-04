---
title: Arrays in JavaScript
date: 2020-05-04T17:55:34.302Z
---
Array in JavaScript is ordered collection of values where each value has its own position, known as `index`. In array index of the first element is `0`, index of the second element is `1` and so on.

What is the difference between arrays and objects? As both of them are used to store collection of values.

In JavaScript arrays use **numbered indexes**, objects use **named indexes**. 

You can say that arrays are special kind of objects with numbered indexes.

## Create an array

As with objects, there are numerous ways of creating array. The most popular and easiest one is array literal:

```javascript
// Empty array
const empty = [];

// Array of strings
const users = ['John', 'Andrew', 'Mike'];

// Array of numbers
const numbers = [0, 1, 2, 3];

// Array of ojbects
const objects = [
  {
    name: 'John'
  },
  {
    name: 'Andrew'
  },
  {
    name: 'Mike'
  }
];
```

## Accessing elements

**Important note:** remember that array indexes start at 0.

You can access array element by referring to its index:

```javascript
const users = ['John', 'Andrew', 'Mike'];

const john = users[0]; // Contains "John"
const andrew = users[1]; // Contains "Andrew"
const mike = users[2]; // Contains "Mike"
```

## What if element does not exist?

If element under given index does not exist, you would receive `undefined`:

```javascript
const users = ['John', 'Andrew', 'Mike'];

console.log(users[3]); // Prints "undefined"
```

## Add element

In order to add element to the end of the array, use `push` method:

```javascript
const users = ['John', 'Andrew'];

users.push('Mike');

console.log(users); // Prints ["John", "Andrew", "Mike"]
```

In order to add element to the beginning of the array, use `unshift` method:

```javascript
const users = ['John', 'Andrew'];

users.unshift('Mike');

console.log(users); // Prints ["Mike", John", "Andrew"]
```

**Important note:** both `push` and `unshift` return new length of the array:

```javascript
const users = ['John', 'Andrew'];

const newLength = users.unshift('Mike');
console.log(newLength); // Prints "3"

const latestLength = users.push('Mary');
console.log(latestLength); // Prints "4"
```

**Important note\[2]:** Adding an element with high index can cause populating array with `undefined` values:

```javascript
const users = ['John', 'Andrew'];

users[4] = 'Mary';

console.log(users); // Prints ["John", "Andrew", undefined, undefined, "Mary"]
```

**Note:** yes, you can add elements to array also by specifying index, but that's not the best way. Use `push` or `unshift` instead.