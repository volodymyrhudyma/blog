---
title: "React Antipatterns: Props Spreading"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/react-antipatterns-1.jpg
teaser: Most of the time we learn how to write code, we memorize best practices,
  design patterns, clean code principles, and that's perfectly fine, but
  learning how not to write code is no less important. Antipatterns, just like
  patterns, have been around for...
date: 2021-08-18T07:36:13.134Z
---
Most of the time we learn how to write code, we memorize best practices, design patterns, clean code principles, and that's perfectly fine, but learning how not to write code is no less important.

Antipatterns, just like patterns, have been around for a long time and it's worth learning and remembering them to avoid code smell.

With this article, we are starting a new chapter called "**React Antipatterns**", which will consist of a few articles showing how not to write code in React and explaining why.

Today we will learn why [Spread Operator](/2020-05-24-spread-operator-in-javascript/) is great, but better avoided when passing down a set of props in React.

## Spread Operator Is Awesome

To begin with, let's learn or remind ourselves what Spread Operator does and why is it awesome.

The Spread Operator is used to access all elements inside of an Iterable:

```javascript
// Array
const numbers = [1, 2, 3, 5];
const numbersCopy = [...numbers]; // "[1, 2, 3, 5]"

// Object
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};
const userCopy = {...user}; // { name: "John", surname: "Doe", age: 18 }

// String
const string = "string";
const array = [...string]; // ["s", "t", "r", "i", "n", "g" ]
const obj = {...string}; // {"0": "s", "1": "t", "2": "r", "3": "i", "4": "n", "5": "g"}
```

**Important note:** the Spread Operator does a **shallow copy** of the Iterable.

Let's see some example use cases of this operator.

#### \#1 - Merge Arrays

```javascript
const parents = ["John", "Andrew"];
const children = ["Ann", "Rose"];

const humans = [...parents, ...children];

console.log(humans); // Prints ["John", "Andrew", "Ann", "Rose"]
```

#### \#2 - Merge Objects

```javascript
const positiveNumbers = {
  one: 1,
  two: 2,
};

const negativeNumbers = {
  minusOne: -1,
  minusTwo: -2,
};

const numbers = {
  ...negativeNumbers,
  ...positiveNumbers,
};

// Prints "{ minusOne: -1, minusTwo: -2, one: 1, two: 2 }"
console.log(numbers);
```

#### \#3 - Passing arguments into a function

```javascript
const add = (number1, number2, number3) => number1 + number2 + number3;

const numbers = [1, 2, 3];

// Spreads array of numbers to a function arguments
const result = add(...numbers);

console.log(result); // Prints "6"
```

#### \#4 - Update Object Property Without Mutating It

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const newUser = {
  ...user,
  age: 22,
};

// Prints {name: "John", surname: "Doe", age: 18}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

## Props Spreading In React

## Why It Should Be Avoided?

## Summary