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

A new Map object can be created by using the `Map` constructor:

```javascript
// Create a new Map
const users = new Map();
```

#### Add an item

An item can be added to the Map by using the `set(key, value)` function. 

*Returns the Map object:*

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

*Returns the value associated with the key or undefined:*

```javascript
users.get("John"); // { address: "John's Address" }
users.get(obj); // { address: "Michael's Address" }
users.get(func); // { address: "Andrew's Address" }
users.get(NaN); // { address: "NaN's Address" }
users.get("Not existing item"); // undefined
```

#### Check if Map contains an item

To check if a value has been associated with the key, a `has(key)` function can be used.

*Returns true or false:*

```javascript
users.has("John"); // true
users.has(obj); // true
users.has(func); // true
users.has(NaN); // true
users.has("Not existing item"); // false
```

#### Remove an item

An item can be removed from the Map by using a `delete(key)` function.

*Returns true if an element was removed, false if it does not exist:*

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

## Instance Properties and Methods

#### Get the size

To get the size of the Map, a `size` instance property can be accessed.

*Returns the number of key-value pairs:*

```javascript
const projects = new Map();

projects.set("project1", { deadline: "2020-12-31" });
projects.set("project2", { deadline: "2020-12-31" });

projects.size; // 2
```

#### Get all keys

To get all keys of the Map, a `keys()` method is used.

*Returns an Iterator object that contains all keys in an insertion order:*

```javascript
projects.keys(); // [Map Iterator] { "project1", "project2" }
```

#### Get all values

To get all values of the Map, a `values()` method is used.

*Returns an Iterator object that contains all values in an insertion order:*

```javascript
// [Map Iterator] {
//  { deadline: "2020-12-31" },
//  { deadline: "2020-12-31" }
// }
projects.values();
```

#### Get all entries

To get all entries of the Map, a `entries()` method is used.

*Returns an Iterator object that contains an array of all \[key, value] pairs in an insertion order:*

```javascript
// [Map Entries] {
//  [ "project1", { deadline: "2020-12-31" } ],
//  [ "project2", { deadline: "2020-12-31" } ]
// }
projects.entries();
```

#### Iterate over all key-value pairs

To iterate over all key-value pairs, a `forEach(callbackFn[, thisArg])` method is used:

*Calls callbackFn for each key-value pair in insertion order. If a thisArg is provided, it will be used as this value for each callback:*

```javascript
// "project1" { deadline: "2020-12-31" }
// "project2" { deadline: "2020-12-31" }
projects.forEach((value, key) => {
  console.log(key, value);
});
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