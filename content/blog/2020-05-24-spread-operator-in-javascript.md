---
title: Spread operator in JavaScript
date: 2020-05-24T07:46:33.083Z
---
Spread operator is used to access all elements inside of an iterable. Don't worry if the definition is not clear, we'll explain the operator in detail later on.

> **Iterable object** is a computer science-y term for a category of data type: arrays, objects literals, and strings.

## Syntax

Spread operator's syntax is three dots `...`, which expand an iterable to the list of parameters. 

Let's take a look at some examples:

#### Array

```javascript
const numbers = [1, 2, 3, 5];

const numbersCopy = [...numbers];

console.log(numbersCopy); // Prints "[1, 2, 3, 5]"
```

#### Object

```javascript
const user = {
  name: 'John',
  surname: 'Doe',
  age: 18
};

const userCopy = {...user};

// Prints { name: "John", surname: "Doe", age: 18 }
console.log(userCopy);
```

#### String

```javascript
const string = "string";

// Converts string to array
const array = [...string];

console.log(array); // Prints ["s", "t", "r", "i", "n", "g" ] ha
```

```javascript
const string = "string";

// Converts array to object
const object = {...string};

// Prints {"0": "s", "1": "t", "2": "r", "3": "i", "4": "n", "5": "g"}
console.log(object); 
```

**Important note:** spread operator does a **shallow copy** of an iterable.