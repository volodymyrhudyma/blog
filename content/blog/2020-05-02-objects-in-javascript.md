---
title: Objects in JavaScript
tag:
  - JavaScript
metaDescription: Everything in JavaScript, except Primitives are Objects, that's
  why it's the most important part of the language.
teaser: Everything in JavaScript, except "Primitives" are "Objects", that's why
  it's the most important part of the language. Understanding objects is
  essential in order to become professional. Objects are collections of
  properties, defined as key-value pairs...
date: 2020-05-02T19:11:10.868Z
---
Everything in JavaScript, except Primitives are Objects, that's why it's the most important part of the language. Understanding objects is essential in order to become professional. 

Objects are collections of properties, defined as key-value pairs.

## Create an object

There are a lot of different ways to create an object in JavaScript, but we'll take a look at the most popular and the shortest one:

```javascript
const user = {};
```

To create an object with properties, you have to use `key: value` syntax:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};
```

In the example above `name` and `surname` are the keys and `John` and `Doe` are the values.

## Access object property

There are 2 ways of accessing object properties: using **dot notation** and **array-like notation**.

#### Dot notation

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

console.log(user.name); // Prints "John"

console.log(user.surname); // Prints "Doe"
```

#### Array-like notation

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

console.log(user["name"]); // Prints "John"

console.log(user["surname"]); // Prints "Doe"
```

They both act the same way, providing you an access to the property's value, however, there's one case when you can't use dot notation - when property contains spaces or special characters:

```javascript
const user = {
  "full name": "John Doe",
};

console.log(user["full name"]); // Prints "John"

console.log(user."full name"); // SyntaxError: Unexpected token
```

## What if property does not exist?

If property you are trying to access doesn't exist, you would receive `undefined`:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

console.log(user.full_name); // Prints "undefined"
```

## Add property

You can add property to an object after it was created:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

user.full_name = "John Doe";

console.log(user); // Prints { name: "John", surname: "Doe", full_name: "John Doe" }
```

## Change property

To change property in an object, use an assignment operator:

```javascript
const user = {
  name: "John",
};

user.name = "Andrew";

console.log(user); // Prints { name: "Andrew" }
```

## Delete property

Use `delete` operator to remove property from an object:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

delete user.name;

console.log(user); // Prints { surname: "Doe" }
```

## Check if property exist

Use `in` operator to check if property exists in an object:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

console.log("name" in user); // Prints "true"

console.log("full_name" in user); // Prints "false"
```

## Iterate over properties

Use `for ... in` loop in order to iterate over properties in an object:

```javascript
const user = {
  name: "John",
  surname: "Doe",
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
  surname: "Doe",
};

for (const propertyName in user) {
  console.log(propertyName); // Prints "name" and "surname"
  console.log(user.propertyName); // Prints "undefined" 2 times
}
```

## Object methods

Methods are actions that can be performed on objects:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  getFullName: function() {
    return this.name + " " + this.surname;
  },
};

console.log(user.getFullName()); // Prints "John Doe"
```

In the above example a method `getFullName` was defined. It combines `name` and `surname` and returns them. 

**Important note:** if you are not familiar with `this` keyword, please refer to [this article](/2020-05-02-understanding-this-in-javascript/).

There are a few ways of defining object methods, let's take a look at them all:

1. Using object literal syntax:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  getFullName: function() {
    return this.name + " " + this.surname;
  },
};
```

2. Shorthand for object literal (ES6 syntax):

```javascript
const user = {
  name: "John",
  surname: "Doe",
  getFullName() {
    return this.name + " " + this.surname;
  },
};
```

3. Using function expression:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

user.getFullName = function() {
  return this.name + " " +  this.surname;
};
```

4. Using fat arrow function (ES6 syntax):

```javascript
const user = {
  name: "John",
  surname: "Doe",
  getFullName: () => {
    return this.name + " " + this.surname;
  },
};

console.log(user.getFullName()); // TypeError: Cannot read property "name" of undefined
```

or:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

user.getFullName = () => {
  return this.name + " " + this.surname;
};

console.log(user.getFullName()); // TypeError: Cannot read property "name" of undefined
```

Notice that both examples return the same error. Do you know why? 

Arrow function doesn't bind own `this` context, so we don't have access to object's properties.

**Important note:** do not define object's methods using arrow functions.

## Built-in object functions

All objects in JavaScript descend from the parent `Object` constructor. `Object` has a lot of useful built-in methods we can access and use.

**Important note:** Object methods are used directly on the Object constructor and use the object instance as a parameter. They are also known as a static methods.

The list of all Object built-in methods available for use:

#### `Object.create`

Creates a new object with specified prototype:

```javascript
const person = {
  age: 18,
  getAge() {
    return this.age;
  },
};

const adult = Object.create(person);
adult.age = 30;

console.log(adult.getAge()); // Prints "30"
```

#### `Object.keys`

Creates an array containing keys of the object:

```javascript
const person = {
  age: 18,
  getAge() {
    return this.age;
  },
};

const keys = Object.keys(person);

console.log(keys); // Prints [ "age", "getAge" ]
```

#### `Object.values`

Creates an array containing values of the object:

```javascript
const person = {
  name: "John",
  age: 18,
};

const values = Object.values(person);

console.log(values); // Prints [ "John", 18 ]
```

#### `Object.entries`

Creates nested array containing key/values pairs of the object:

```javascript
const person = {
  name: "John",
  age: 18,
};

const entries = Object.entries(person);

console.log(entries); // Prints [ ["name", "John" ], [ "age", 18 ] ]
```

#### `Object.assign`

Copies values from one object to another:

```javascript
const person = {
  name: "John",
  age: 18,
};

const newPerson = Object.assign({}, person);

console.log(newPerson); // Prints { name: "John", age: 18 }
```

#### `Object.freeze`

Disallows properties modification/deletion as well as adding new ones:

```javascript
const person = {
  name: "John",
  age: 18,
};

Object.freeze(person);

person.name = "Andrew"; // TypeError: Cannot assign to read only property "name" of object

delete person.age; // TypeError: Cannot delete property "age" of object

person.surname = "Doe"; // TypeError: Cannot add property surname, object is not extensible
```

#### `Object.seal`

Disallows adding new properties, but allows modification of existing ones:

```javascript
const person = {
  name: "John",
  age: 18,
};

Object.seal(person);

person.surname = "Doe"; // TypeError: Cannot add property surname, object is not extensible

person.name = "Andrew"; // Looks good

console.log(person.name); // Prints "Andrew"
```

#### `Object.getPrototypeOf`

Gets prototype (the value of internal `[[Prototype]]`) of an object, also accessible via `__proto__`:

```javascript
const animal = {};

const dog = Object.create(animal);

const dogPrototype = Object.getPrototypeOf(dog);

console.log(dogPrototype === animal); // Prints "true"
```

## Summary

In this chapter we dug into JavaScript objects, reviewed how to create/modify/delete their properties, add custom methods and use a great power of built-in `Object` methods.

* Everything in JavaScript, except Primitives are Objects
* To create an object with properties, you have to use `key: value` syntax
* There are 2 ways of accessing object properties: using **dot notation** and **array-like notation**
* If property you are trying to access doesn't exist, you would receive `undefined`
* Use assignment operator to add/update property in an object
* Use `delete` operator to remove property from an object
* Use `in` operator to check if property exists in an object
* Use `for ... in` loop in order to iterate over properties in an object
* Object has a lot of built-in methods: Object.create, Object.keys, Object.values, Object.entries, Object.assign, Object.freeze, Object.seal, Object.getPrototypeOf