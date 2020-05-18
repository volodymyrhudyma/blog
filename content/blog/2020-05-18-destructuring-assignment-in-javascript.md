---
title: Destructuring assignment in JavaScript
date: 2020-05-18T14:10:49.470Z
---
Destructuring assignment is a special syntax that allows us to retrieve pieces of arrays or objects and assign them to a separate variables.

This approach can be used for: arrays, objects and iterables.

## Destructuring arrays

Let's start with taking a grasp of how arrays are destructured.

Consider the following example that doesn't use the pattern:

```javascript
const numbers = [1, 2, 3];

const firstNumber = numbers[0];
const secondNumber = numbers[1];
const thirdNumber = numbers[2];

console.log(firstNumber); // Prints "1"
console.log(secondNumber); // Prints "2"
console.log(thirdNumber); // Prints "3"
```

Imagine having much array of much bigger size, code starts rapid growing.

Let's add some destructuring:

```javascript
const numbers = [1, 2, 3];

const [firstNumber, secondNumber, thirdNumber] = numbers;

console.log(firstNumber); // Prints "1"
console.log(secondNumber); // Prints "2"
console.log(thirdNumber); // Prints "3"
```

Looks much, much cleaner.

#### Destructuring nested arrays

Imagine having nested arrays. It is possible to destructure them as well:

```javascript
const numbers = [1, 2, 3, [4, [5]]];

const [
  firstNumber, 
  secondNumber, 
  thirdNumber, 
  [fourthNumber, [fifthNumber]]
] = numbers;

console.log(firstNumber); // Prints "1"
console.log(secondNumber); // Prints "2"
console.log(thirdNumber); // Prints "3"
console.log(fourthNumber); // Prints "4"
console.log(fifthNumber); // Prints "5"
```

#### Ignore elements

Unwanted elements can be ignored by using commas:

```javascript
const numbers = [1, 2, 3];

const [firstNumber,, thirdNumber] = numbers;

console.log(firstNumber); // Prints "1"
console.log(thirdNumber); // Prints "3"
```

In the example above, the second number is skipped.

#### Desctructure all items but first

You can capture all trailing items in an array with a "rest" pattern:

```javascript
const numbers = [1, 2, 3];

const [firstNumber, ...rest] = numbers;

console.log(firstNumber); // Prints "1"
console.log(rest); // Prints "[2, 3]"
```

#### Desctructure non existing element

Destructuring non existing element results in `undefined`:

```javascript
const numbers = [1, 2];

const [firstNumber, secondNumber, thirdNumber] = numbers;

console.log(firstNumber); // Prints "1"
console.log(secondNumber); // Prints "2"
console.log(thirdNumber); // Prints "undefined"
```

#### Set default value

If you want default value to replace non existing while destructuring, you can use assignment operator:

```javascript
const numbers = [1, 2];

const [firstNumber, secondNumber, thirdNumber = 3] = numbers;

console.log(firstNumber); // Prints "1"
console.log(secondNumber); // Prints "2"
console.log(thirdNumber); // Prints "3"
```

Default values can be more complex expressions (including function calls). They are evaluated only in case if the value is not provided:

```javascript
const numbers = [1, 2, 3];

const [firstNumber, secondNumber, thirdNumber = 30] = numbers;

console.log(firstNumber); // Prints "1"
console.log(secondNumber); // Prints "2"
console.log(thirdNumber); // Prints "3"
```

In the example above, assigned number `30` is ignored.