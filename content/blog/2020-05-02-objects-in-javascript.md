---
title: Objects in JavaScript
date: 2020-05-02T19:11:10.868Z
---
Everything in JavaScript, except Primitives are Objects. Understanding objects is essential in order to become  professional. 

In JavaScript, objects are collections of properties, defined as key-value pair.

## Create an object

There are a lot of different ways to create an object in JavaScript, but we'll take a look at the most popular and the shortest one:

```javascript
const user = {};
```

To create an object with properties, you have to use `key: value` syntax:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};
```

In the example above `name` and `surname` are the keys and `John` and `Doe` are the values.

## Accessing properties

There are 2 ways of accessing object properties: using **dot notation** and **array-like notation**.

#### Dot notation

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

console.log(user.name); // Prints "John"

console.log(user.surname); // Prints "Doe"
```

#### Array-like notation

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

console.log(user['name']); // Prints "John"

console.log(user['surname']); // Prints "Doe"
```

They both act the same way, providing you an access to the property's value, however, there's one case when you can't use dot notation - when property contains spaces or special characters:

```javascript
const user = {
  "full name": "John Doe",
};

console.log(user['full name']); // Prints "John"

console.log(user.'full name'); // SyntaxError: Unexpected token
```

## What if property does not exist?

If property you are trying to access doesn't exist, you will receive `undefined`:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

console.log(user.full_name); // Prints "undefined"
```