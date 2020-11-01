---
title: Map and WeakMap in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-11-03T09:13:19.550Z
---
## What is a Map?

A **Map** is an object in JavaScript that holds key-value pairs. 

It remembers the insertion order of keys and allows any value to be used as either a key or a value.

#### Create a Map

A new **Map** object can be created by using the `Map` constructor:

```javascript
// Create a new Map
const users = new Map();
```

#### Add an item

An item can be added to the Map by using the `set(key, value)` function. 

*Returns the **Map** object:*

```javascript
// String as a key
users.set("John", { address: "John's Address" });

// Object as a key
const obj = { name: "Michael" };
users.set(obj, { address: "Michael's Address"});

// Function as a key
const func = () => "Andrew";
users.set(func, { address: "Andrew's Address"});

// NaN as a key
users.set(NaN, { address: "NaN's Address"});
```

#### Retrieve an item

An item can be retrieved from the Map by using `get(key)` function.

*Returns the **value** associated with the key or **undefined**:*

```javascript
users.get("John"); // { address: "John's Address" }

users.get(obj); // { address: "Michael's Address" }

users.get(func); // { address: "Andrew's Address" }

users.get(NaN); // { address: "NaN's Address" }

users.get("Not existing item"); // undefined
```

#### Check if Map contains an item

To check if a value has been associated with the key, a `has(key)` function can be used.

*Returns **true** or **false**:*

```javascript
users.has("John"); // true

users.has(obj); // true

users.has(func); // true

users.has(NaN); // true

users.has("Not existing item"); // false
```

#### Remove an item

An item can be removed from the Map by using a `delete` function.

*Returns **true** if an element was removed, **false** if it does not exist:*

```javascript
users.delete("John"); // true

users.delete(obj); // true

users.delete(func); // true

users.delete(NaN); // true 

users.delete("Not existing item"); // false
```

#### Clear all values

To remove all key-value pairs from the Map object, a `clear()` method can be used:

```javascript
users.clear();

console.log(users); // Map {}
```

## Map vs. Object

An **Object** is a collection of properties, defined as key-value pairs.

At the first sight, it may seem like there are really no differences between Map and Object, but that assumption is totally wrong.

Objects are similar to Maps, both allow you to store, retrieve, and delete values, however, there are important differences:

* **Map's** keys can contain any value, **Object's** keys must contain either a String or a Symbol 
* A **Map** allows us to easily get the number of stored items with `size` property, an **Object** does not provide an easy way to do that
* A **Map** can be directly iterated due to being iterable, an **Object** requires obtaining its keys and iterating over them
* A **Map** is optimized to have better performance than an **Object** when frequently adding or removing entries

## WeakMap

## Summary