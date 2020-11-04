---
title: Everything About Set and WeakSet in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-11-06T19:35:43.818Z
---
## What is a Set?

A Set is an object that contains a collection of **unique values**. Each value can occur only once. 

It remembers the insertion order and allows you to store values of any type.

#### Create a set

```javascript
// Create a new Set
const users = new Set();
```

#### Add an element

An element can be added to the Set by using the `add(value)` function.

*Returns Set object:*

```javascript
// Set { 0 }
users.add(0);

// Set { 0, "John" }
users.add("John");

// Set { 0, "John", { name: "John" } }
const obj = { name: "John" };
users.add(obj);

// Set { 0, "John", { name: "John" }, [Function] }
const func = () => "John";
users.add(func);

// Set { 0, "John", { name: "John" }, [Function], NaN }
users.add(NaN);

// Set { 0, "John", { name: "John" }, [Function], NaN, undefined }
users.add(undefined);
```

**Important note:** **NaN** and **undefined** can also occur in Sets. All NaN values are equated, even though in JavaScript `NaN !== NaN`.

#### Check whether Set contains an element

To check whether a Set contains a value, `has(key)` function can be used.

*Returns true or false:*

```javascript
users.has(0); // true
users.has("John"); // true
users.has(obj); // true
users.has(func); // true
users.has(NaN); // true
users.has(undefined); // true
users.has("Not existing item"); // false
```

#### Remove an element

An element can be removed from the Set by using the `delete(key)` function.

*Returns true if an element has been removed, false if it does not exist:*

```javascript
users.delete(0); // true
users.delete("John"); // true
users.delete(obj); // true
users.delete(func); // true
users.delete(NaN); // true
users.delete(undefined); // true
users.delete("Not existing item"); // false
```

#### Delete all values

To remove all values from the Set object, a `clear()` method can be used:

```javascript
users.clear();

console.log(users); // Set {}
```

## Instance Properties and Methods of Set

## Set vs. Array

## What is a WeakSet?

## Instance Methods of WeakSet

## When to use WeakSets?

## Summary