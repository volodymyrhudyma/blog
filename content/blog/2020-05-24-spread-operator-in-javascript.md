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
  name: "John",
  surname: "Doe",
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

## Usage

Let's see the most popular use cases of the spread operator.

#### Merge arrays

```javascript
const parents = ["John", "Andrew"];
const children = ["Ann", "Rose"];

const humans = [...parents, ...children];

console.log(humans); // Prints ["John", "Andrew", "Ann", "Rose"]
```

Now, `humans` array contains both `parents` and `children`. 

The spread operator preserves the order in which the items were spread:

```javascript
const parents = ["John", "Andrew"];
const children = ["Ann", "Rose"];

const humans = [...children, ...parents];

console.log(humans); // Prints ["Ann", "Rose", "John", "Andrew"]
```

#### Merge objects

Merging objects is very similar to merging arrays, but be aware that **duplicate keys are overwritten**.

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
  ...positiveNumbers
};

// Prints "{ minusOne: -1, minusTwo: -2, one: 1, two: 2 }"
console.log(numbers);
```

Overriding duplicate keys:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  nickname: "johndoe",
};

const updatedUser = {
  name: "Andrew",
  surname: "Hopkins",
  nickname: "andrewhopkins",
};

const newUser = {
  ...user,
  ...updatedUser,
};

// Prints {name: "Andrew", surname: "Hopkins", nickname: "andrewhopkins"}
console.log(newUser);
```

Note, how in the example above all keys were overwritten with the new values.

#### Passing arguments into a function

This is encountered not that often, but still worth remembering about:

```javascript
const add = (number1, number2, number3) => number1 + number2 + number3;

const numbers = [1, 2, 3];

// Spreads array of numbers to a function arguments
const result = add(...numbers);

console.log(result); // Prints "6"
```

#### Avoid objects mutation

Sometimes there is a need to update object property without mutating it. Spread operator offers a great help in this case, let's see:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18
};

const newUser = {
  ...user,
  age: 22
};

// Prints {name: "John", surname: "Doe", age: 18}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

Note, how the original object `user` has not been mutated.

**Important note:** always remember that objects are copied by reference:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18
};

const newUser = user;
newUser.age = 22;

// Prints {name: "John", surname: "Doe", age: 22}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

Remember us, saying that spread operator does a shallow copy of an iterable?

> **Shallow copy** is a bit-wise copy of an object. A new object is created that has an exact copy of the values in the original object. If any of the fields of the object are references to other objects, just the reference addresses are copied i.e., only the memory address is copied.

Consider the following example:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18
  }
};

const newUser = {
  ...user,
};

newUser.other.age = 22;

// Prints {name: "John", surname: "Doe", age: 22}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

Property `other` references to an object which contains `age`. When doing shallow copy by using spread operator, just the reference address of `other` is copied, not the value itself.

That's why when we modify `other.age` it gets updated in both `user` and `newUser`.

## The "rest" pattern

The **rest pattern** syntax allows us to represent an indefinite number of arguments as an array:

```javascript
const numbers = [1, 2, 3, 5, 8];

const [firstNumber, ...rest] = numbers; 

console.log(firstNumber); // Prints "1"
console.log(rest); // Prints "[2, 3, 5, 8]"
```

In the example above, rest pattern collected all elements but the first one into an array.

## The difference between "rest" pattern and spread operator

Spread operator unpacks, rest packs:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18
};

// Pack all remaining elements into new object
const {name, ...rest} = user;

// Unpack all props of user into newUser
const newUser = {
  ...user
};
```

## Summary

* Spread operator's syntax is three dots `...`
* Spread operator unpacks all elements of an iterable
* Spread operator does **shallow copy**
* Most popular use cases of spread operator: merging arrays/objects, feeding arguments into a function