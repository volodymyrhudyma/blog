---
title: Proxy Object In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: Accessing object properties is a very common operation in JavaScript. In
  some cases, it is extremely useful to perform an action just after the
  property has been accessed, but before the result is returned, so the result
  can be modified on fly. One of the possible solutions is to create...
date: 2021-04-28T16:31:10.516Z
---
Accessing object properties is a very common operation in JavaScript.

In some cases, it is extremely useful to perform an action just after the property has been accessed, but before the result is returned, so the result can be modified on fly.

One of the possible solutions is to create and invoke a custom function that would contain some logic around retrieved property:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const getName = () => {
  return user.name.toLowerCase();
};

const name = getName();

// Prints "john"
console.log(name);
```

 But a better solution would be to use Proxy Object in JavaScript, which is designed exactly for this purpose.

## The Proxy Object

The Proxy Object wraps another object and allows to intercept and redefine different operations, like retrieving/setting a property, etc.

A **Proxy** is created with two parameters:

* **target** - an object to wrap
* **handler** - an object that specifies what operations should be intercepted and how it should be done

```javascript
const proxy = new Proxy(target, handler);
```

Consider the following example:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const handler = {};

const userProxy = new Proxy(user, handler);

// Prints "John"
console.log(userProxy.name);

// Prints "Doe"
console.log(userProxy.surname);
```

The handler object is empty, so all operations we perform on a Proxy Object are performed on a Target Object.

But that example is kinda useless, so let's intercept the **get** handler and convert the retrieved string to lowercase:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const handler = {
  get: (target, property) => {
    return target[property].toLowerCase();
  }
};

const userProxy = new Proxy(user, handler);

// Prints "john"
console.log(userProxy.name);

// Prints "doe"
console.log(userProxy.surname);
```

Handlers are also called **traps**, because they also trap calls to the target object.

So in the above example we used a get trap, which contains the following arguments:

* **target** - wrapper object, the one that is passed as a first argument to the Proxy
* **property** - the name of the accessed property

## Traps

## Summary