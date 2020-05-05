---
title: JavaScript built-in arrays methods
date: 2020-05-05T15:41:23.309Z
---
In the [previous article](/2020-05-04-arrays-in-javascript/) we had a brief introduction to arrays in JavaScript. Today we are going to explore all built-in array methods that are available for a use by default. We'll start from the most used ones.

**Important note:** all examples will contain fat arrow functions instead of function declarations or function expressions:

```javascript
// Function expression
const multiply = function(x, y) {
  return x * y;
};

// Function declaration
function multiply(x, y) {
  return x * y;
};

// Fat arrow function
const multiply = (x, y) => {
  return x * y;
}

// Shorthand 
const multiply = (x, y) => x * y;
```

#### filter

Creates a new array with all elements that satisfy given condition:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Return numbers greater than 5
const filteredNumbers = numbers.filter(number => number > 5);

console.log(filteredNumbers); // Prints [8, 10]
```

#### map

Creates a new array with the result of calling function for each element:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Multiply each number by 2
const mappedNumbers = numbers.map(number => number * 2);

console.log(mappedNumbers); // Prints [0, 2, 4, 10, 16, 20]
```

#### find

Returns the value of the first element in an array that meets given condition:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Find the first number smaller than 5
const result = numbers.find(number => number < 5);

console.log(result); // Prints 0
```

**Important note:** remember, that `find` returns the first found element, in order to return all elements that meet the criteria, use `filter` method.