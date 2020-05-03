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

## Object methods

Methods are actions that can be performed on objects:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  getFullName: function() {
    return this.name + " " + this.surname;
  }
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
  }
};
```

2. Shorthand for object literal (ES6 syntax):

```javascript
const user = {
  name: "John",
  surname: "Doe",
  getFullName() {
    return this.name + " " + this.surname;
  }
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
}
```

4. Using fat arrow function (ES6 syntax):

```javascript
const user = {
  name: "John",
  surname: "Doe",
  getFullName: () => {
    return this.name + " " + this.surname;
  }
};

console.log(user.getFullName()); // TypeError: Cannot read property 'name' of undefined
```

or:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

user.getFullName = () => {
  return this.name + " " + this.surname;
}

console.log(user.getFullName()); // TypeError: Cannot read property 'name' of undefined
```

Notice that both examples return the same error. Do you know why? 

Arrow function doesn't bind own `this` context, so we don't have access to object's properties.

**Important note:** never define object's methods using arrow functions.

## Built-in object functions

All objects in JavaScript descend from the parent `Object` constructor. `Object` has a lot of useful built-in methods we can access and use.

**Important note:** `Object` methods are used directly on the `Object` constructor and use the object instance as a parameter. They are also known as a static methods.

The list of all `Object` built-in methods available for use:

* `Object.create`
* `Object.keys`
* `Object.values`
* `Object.entries`
* `Object.assign`
* `Object.freeze`
* `Object.seal`
* `Object.getPrototypeOf`