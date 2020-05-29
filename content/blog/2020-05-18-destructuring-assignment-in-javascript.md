---
title: Destructuring assignment in JavaScript
teaser: Destructuring assignment is a special syntax that allows us to retrieve
  pieces of arrays or objects and assign them to a separate variables. This
  approach can be used for...
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
  [fourthNumber, [fifthNumber]],
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

const [firstNumber, , thirdNumber] = numbers;

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

## Destructuring objects

Objects are destructured exactly the same way as arrays, except the parentheses `[]` are replaced with curly braces `{}`:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const {name, surname, age} = user;

console.log(name); // Prints "John"
console.log(surname); // Prints "Doe"
console.log(age); // Prints "18"
```

**Important note:** when destructuring objects, the order does not matter:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const {name, age, surname} = user;

console.log(name); // Prints "John"
console.log(surname); // Prints "Doe"
console.log(age); // Prints "18"
```

#### Destructuring nested objects

Nested objects can be destructured using the same pattern (curly braces `{}`):

```javascript
const user = {
  name: "John",
  surname: "Doe",
  address: {
    street: "John Doe street",
  },
};

const {name, surname, address: { street }} = user;

console.log(name); // Prints "John"
console.log(surname); // Prints "Doe"
console.log(street); // Prints "John Doe street"
```

**Important note:** there is no variable `address` as we take its context instead.

#### Ignoring items

In order not to destructure property from an object, just don't put it inside the brackets, and that's it:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const {name, surname} = user;

console.log(name); // Prints "John"
console.log(surname); // Prints "Doe"
```

#### The "rest" pattern

Trailing elements can be assigned to an object using "rest" pattern (like arrays, right?):

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const {name: userName, ...rest} = user;

console.log(userName); // Prints "undefined"
console.log(rest); // Prints {surname: "Doe", age: 18}
```

#### Destructure non existing element:

Results in `undefined`:

```javascript
const user = {
  surname: "Doe",
  age: 18,
};

const {name: userName, surname: userSurname, age: userAge} = user;

console.log(userName); // Prints "undefined"
console.log(userSurname); // Prints "Doe"
console.log(userAge); // Prints "18"
```

#### Set default value

Default value can be set using assignment operator:

```javascript
const user = {
  surname: "Doe",
  age: 18,
};

const {name = "John", surname, age} = user;

console.log(name); // Prints "John"
console.log(surname); // Prints "Doe"
console.log(age); // Prints "18"
```

**Important note:** default value can refer to any variable, including another variable in the same pattern:

```javascript
const user = {
  age: 18,
};

const {name = "John", surname = name, age} = user;

console.log(name); // Prints "John"
console.log(surname); // Prints "John"
console.log(age); // Prints "18"
```

#### Rename destructured variable

Sometimes, you can face the situation, when the variable that you try to destructure value to, has already been declared.

In this case, you can destructure value into variable with another name using colon `:`:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const {name: userName, surname: userSurname, age: userAge} = user;

console.log(userName); // Prints "John"
console.log(userSurname); // Prints "Doe"
console.log(userAge); // Prints "18"
```

## Pitfall #1

There is one important thing to remember about - don't start destructuring operation with curly braces `{}`:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

{name, surname, age} = user; // SyntaxError: Unexpected token 
```

Code blocks begin with a curly brace, statements must not begin with it.

## Destructuring in function parameters

We can create a function that accepts a single object with multiple properties as a parameter instead of many individual parameters. 

Inside of such function we can use access parameters by using destructuring:

```javascript
const createUser = ({
  name, 
  surname, 
  email, 
  password, 
  passwordConfirmation,
}) => {
  // ...
};

const user = createUser({
  name: "John",
  surname: "Doe",
  email: "john.doe@example.com",
  password: "qwerty1234",
  passwordConfirmation: "qwerty1234",
});
```

Without using parameters destructuring:

```javascript
const createUser = (
  name,
  surname,
  email,
  password,
  passwordConfirmation,
) => {
  // ...
};

const user = createUser(
  "John",
  "Doe",
  "john.doe@example.com",
  "qwerty1234",
  "qwerty1234",
);
```

#### Default values in function parameters

Destructured function parameters can be given default value the exact same ways as objects or arrays:

```javascript
const createUser = ({
  name = "John", 
  surname, 
  email, 
  password, 
  passwordConfirmation, 
}) => {
  // ...
};

const user = createUser({
  surname: "Doe",
  email: "john.doe@example.com",
  password: "qwerty1234",
  passwordConfirmation: "qwerty1234",
});
```

## Multiple return values

The function can return multiple values (using array literal), which can be destructured later on:

```javascript
const example = () => [1, 2, 3];

const [firstNumber, secondNumber, thirdNumber] = example();

console.log(firstNumber); // Prints "1"
console.log(secondNumber); // Prints "2"
console.log(thirdNumber); // Prints "3"
```

## Summary

* Objects, arrays and iterables can be destructured
* Destructuring means extracting specified values into separate variables
* Nested data can be destructured as well
* Destructured elements can be given names and default values
* Destructuring non existing element results in `undefined`