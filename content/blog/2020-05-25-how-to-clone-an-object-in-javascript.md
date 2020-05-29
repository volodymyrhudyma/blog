---
title: How to clone an object in JavaScript?
teaser: Due to the fact that objects are reference values in JavaScript, copying
  them is not as easy as just assigning to another variable. There are a lot of
  different ways to copy an object. Choosing the right method depends on what
  would you like to achieve...
date: 2020-05-25T13:31:19.327Z
---
Due to the fact that objects are reference values in JavaScript, copying them is not as easy as just assigning to another variable. 

There are a lot of different ways to copy an object. 

Choosing the right method depends on what would you like to achieve.

Before we start with listing the most popular methods and providing use cases for each and every of them, let's quickly remind ourselves what is **shallow** and **deep** copy and the differences between them.

## Shallow copy

> **Shallow copy** is a bit-wise copy of an object. A new object is created that has an exact copy of the values in the original object. If any of the fields of the object are references to other objects, just the reference addresses are copied i.e., only the memory address is copied.

Consider the following example:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
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

Property `other`references to an object which contains `age`. 

When doing shallow copy, just the reference address of `other`is copied, not the value itself.

That's why when we modify `other.age`it gets updated in both `user`and `newUser`.

## Deep copy

Making deep copy of an object means copying everything, the new copied object is completely independent from the original one:

```javascript
import cloneDeep from "lodash/cloneDeep";

const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

const newUser = cloneDeep(user);

newUser.other.age = 22;

// Prints {name: "John", surname: "Doe", age: 18}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

Having in mind the differences between shallow and deep copy, let's start with listing the most populars ways of copying the object:

## Spread operator

*does a shallow copy*

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

// newUser is a shallow copy of user
const newUser = {
  ...user,
};
```

## Object.assign

*does a shallow copy*

`Object.assign(target, ...sources)` accepts 2 parameters:

* `target` - target object, where to copy
* `sources` - source objects, what to copy

Copy one source object into empty target:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

// newUser is a shallow copy of user
const newUser = Object.assign({}, user);
```

Copy multiple source objects into empty target:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const address = {
  street: "Street",
  house: 4,
  flat: 1,
};

// newUser is a shallow copy of user
const newUser = Object.assign({}, user, address);
```

Copy one source object to existing target:

```javascript
const target = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const address = {
  street: "Street",
  house: 4,
  flat: 1,
};

// newUser is a shallow copy of user
const newUser = Object.assign(target, address);
```

**Important note:** make sure to remember that `target` object is always mutated.

## JSON object

*does a deep copy*

Note, that this is not optimal way of cloning an object, consider using [`cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep) from lodash:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

// newUser is a deep copy of user
const newUser = JSON.parse(JSON.stringify(user));
```

You can ask, why is it bad practice? Let me try to explain it to you.

`JSON.stringify` converts value to JSON string.

While it works good with primitives, it has some troubles with:

* `undefined` values:

```javascript
const obj = {
  key: undefined,
};

console.log(JSON.stringify(obj)); // Prints "{}"
```

* symbols:

```javascript
const obj = {
  key: Symbol(),
};

console.log(JSON.stringify(obj)); // Prints "{}"
```

* Date (dates are parsed as strings, which means that you will loose original Date object):

```javascript
const obj = {
  key: new Date(),
};

// Prints Date object: { key: 2020-05-25T14:28:42.155Z }
console.log(obj); 

// Prints string: {"key":"2020-05-25T14:27:27.413Z"}
console.log(JSON.parse(JSON.stringify(obj)));
```

* circular dependencies:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

user.brother = user;

// TypeError: Converting circular structure to JSON
console.log(JSON.parse(JSON.stringify(user)));
```

* and, most important, with functions:

```javascript
const obj = {
  key: () => {},
};

console.log(JSON.stringify(obj)); // Prints "{}"
```

You can potentially loose some data without even knowing that, as you wouldn't even be warned by the JavaScript.

Calling `JSON.stringify` with such data types doesn't throw any errors.

To sum it up, try to avoid this way of cloning an object.

## Using external library

The best way to create a deep copy of an object - is to use popular, well tested external library, like lodash.

#### lodash

Lodash provides us with [`cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep) method:

```javascript
import cloneDeep from "lodash/cloneDeep";

const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

// newUser is a deep copy of user
const newUser = cloneDeep(user);
```

Lodash also implements [`clone`](https://lodash.com/docs/4.17.15#clone) method, which does shallow copy of an object:

```javascript
import clone from "lodash/clone";

const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

// newUser is a shallow copy of user
const newUser = clone(user);
```

## Custom method

There's always a possibility to create your own custom method that would clone an object, but that's like reinventing the wheel.

You will spend a lot of time writing your own implementation, fixing bugs and covering the code with unit tests so there's no need to do that.

Always remember that if you encounter any kind of problem in programming, you are for sure not the first person to face that, so give yourself a try to search for a ready-to-use solution in the internet.

## Summary

To create a shallow copy of an object use:

* Spread operator
* Object.assign method

To create a deep clone on an object use:

* JSON object (make sure to understand all pros and cons of this method)
* External library, like [https://lodash.com/docs](https://lodash.com/docs/4.17.15)

**Important note:** Never use assignment operator `=` for cloning objects.