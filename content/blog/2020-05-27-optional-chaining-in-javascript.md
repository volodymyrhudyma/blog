---
title: Optional Chaining In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: "Optional chaining in JavaScript is a new error-proof way to
  access nested object properties, even if an intermediate property doesn't
  exist. "
teaser: When dealing with complex objects or API responses it is a common thing
  to access nested properties. In order to make sure the property is reachable
  without any errors being thrown, we have to make sure each of its parent
  properties exists...
date: 2020-05-27T02:39:48.934Z
---
When dealing with complex objects or API responses it's a common thing to access nested properties. 

In order to make sure the property is reachable without any errors being thrown, we have to make sure each of its parent properties exists.

Consider the following example:

```javascript
const user = {
  name: "John",
  address: {
    street: "Street",
  },
};

const street = user.address && user.address.street;

console.log(street); // Prints "Street"
```

What if `address` does not exist?

```javascript
const user = {
  name: "John",
};

const street = user.address && user.address.street;

console.log(street); // Prints "undefined"
```

What if we won't do the check and `address` doesn't exist?

```javascript
const user = {
  name: "John",
};

// TypeError: Cannot read property "street" of undefined
const street = user.address.street; 
```

## Optional Chaining

The optional chaining `?.` stops the evaluation and returns `undefined` if the part before `?.` is `null` or `undefined`.

Let's add optional chaining to the example above and see what happens:

```javascript
const user = {
  name: "John",
};

const street = user.address?.street;

console.log(street); // Prints "undefined"
```

Pretty cool, huh?

The code stops evaluation at the place of `?.` never accessing `street` property. 

## Short-Circuiting

If the expression on the left of `?.` is either `null` or `undefined`, the right side is not evaluated:

```javascript
a?.[++x] // "x" is incremented if and only if "a" is not null/undefined
```

## Do Not Overuse It

It's important to understand where it's necessary to use optional chaining to avoid making debugging harder:

```javascript
const user = {
  name: "John",
};

const street = user?.address?.street;

console.log(street); // Prints "undefined"
```

In the example above we check if `user` exists, then if `address` exists and finally, if they both exist, we get the `street`.

But is the first `?.` really needed? Since `user` object always exists and only `address` property is optional.

It's better to skip `?.` if the `user` object always exists:

```javascript
const user = {
  name: "John",
};

const street = user.address?.street;

console.log(street); // Prints "undefined"
```

## Call Non-Existing Function

Optional chaining also works with functions, `functionName?.()` syntax can be used to execute a function that may not exist:

```javascript
const user1 = {
  name: "John",
  surname: "Doe",
  getFullName: function() {
    return `${this.name} ${this.surname}`;
  },
};

const user2 = {
  name: "Andrew",
  surname: "Hopkins",
};

const user1FullName = user1.getFullName?.();
const user2FullName = user2.getFullName?.();

console.log(user1FullName); // Prints "John Doe"
console.log(user2FullName); // Prints "undefined"
```

## Retrieve Dynamic Parameter

`?.[key]` syntax can be used in order to get a dynamic parameter from an object:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

const key = "surname";

const value = user?.[key];

console.log(value); // Prints "Doe" if exists and "undefined" if not
```

## Delete Optional Property

It is also possible to use `?.` with `delete` keyword in order to delete property if it exists:

```javascript
const user = {
  name: "John",
  address: {
    street: "Street",
  },
};

delete user.address?.street;

// Prints { name: "John", address: {} }
console.log(user);
```

If the street does not exist, no error will be thrown:

```javascript
const user = {
  name: "John",
};

delete user.address?.street;

// Prints { name: "John" }
console.log(user);
```

**Important note:** optional chaining can be used for safe reading and deleting, but not for safe writing:

```javascript
const user = {
  name: "John",
};

// SyntaxError: Invalid left-hand side in assignment expressionx
user.address?.street = "Street";
```

It does not work, because the example above evaluates to: `undefined = "Street"`.

## Summary

To learn optional chaining in-depth, read [this proposal](https://github.com/tc39/proposal-optional-chaining) on Github.

* Optional chaining operator is `?.`
* If the expression on the left of `?.` is either `null` or `undefined`, the right side is not evaluated
* Optional chaining can be used for safe reading/deleting, but not for writing