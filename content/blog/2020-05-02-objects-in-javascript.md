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

If property you are trying to access doesn't exist, you would receive `undefined`:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

console.log(user.full_name); // Prints "undefined"
```

## Add property

You can add property to an object after it was created:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

user.full_name = "John Doe";

console.log(user); // Prints { name: "John", surname: "Doe", full_name: "John Doe" }
```

## Change property

To change property in an object, use assignment operator:

```javascript
const user = {
  name: "John"
};

user.name = "Andrew";

console.log(user); // Prints { name: "Andrew" }
```

## Delete property

Use `delete` operator to remove property from an object:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

delete user.name;

console.log(user); // Prints { surname: "Doe" }
```

## Check if property exist

Use `in` operator to check if property exists in an object:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

console.log('name' in user); // Prints "true"

console.log('full_name' in user); // Prints "false"
```

## Iterate over properties

Use `for ... in` loop in order to iterate over properties in an object:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

for (const propertyName in user) {
  console.log(propertyName); // Prints "name" and "surname"
  console.log(user[propertyName]); // Prints "John" and "Doe"
}
```

When iterating over object properties using loop, you have an access to the property name, as the first argument of the loop. 

You can access value as well, by doing `user[propertyName]`.

**Important note:** if property name is dynamic, access object value using **array-like notation**. Using **dot notation** will result in `undefined`:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};

for (const propertyName in user) {
  console.log(propertyName); // Prints "name" and "surname"
  console.log(user.propertyName); // Prints "undefined" 2 times
}
```