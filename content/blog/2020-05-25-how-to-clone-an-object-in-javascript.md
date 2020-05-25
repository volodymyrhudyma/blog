---
title: How to clone an object in JavaScript?
date: 2020-05-25T13:31:19.327Z
---
Due to the fact that objects are reference values in JavaScript, copying them is not as easy as just assigning to another variable. 

There are a lot of different ways to copy an object. 

Choosing the right method depends on what would you like to achieve.

Let's start with listing all possible methods and providing use cases for each and every of them.

## Spread operator

*does a shallow copy*

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18
};

// newUser is a shallow copy of user
const newUser = {
  ...user
};
```

## Object.assign

*does a shallow copy*

`Object.assign(target, ...sources)` accepts 2 parameters:

* `target` - target object, where to copy
* `sources` - source objects, what to copy

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18
};

// newUser is a shallow copy of user
const newUser = Object.assign({}, user);
```

## JSON object

*does a deep copy*

Note, that this is not optimal way of cloning an object, consider using [`cloneDeep`](https://lodash.com/docs/4.17.15#cloneDeep) from `lodash`.

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18
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

* and, most important, with functions:

```javascript
const obj = {
  key: () => {}
};

console.log(JSON.stringify(obj)); // Prints "{}"
```

You can potentially loose some data without even knowing that, as you wouldn't even be warned by the JavaScript.

Calling `JSON.stringify` with such data types doesn't throw any errors.

To sum it up, try to avoid this way of cloning an object.