---
title: Map and WeakMap in JavaScript
tag:
  - JavaScript
metaDescription: // METAA
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

## Instance Properties and Methods of Map

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

**WeakMap** is similar to the **Map** with a few important differences:

* A value can be accessed only by having the key and the WeakMap itself
* The keys of a WeakMap must be Objects
* The keys are "weakly held", which means that they can be garbage-collected

An example of a WeakMap:

```javascript
const users = new WeakMap();

const john = { id: 1, name: "John" };
const andrew = { id: 2, name: "Andrew" };

users.set(john, { address: "John's Address"}); // OK
users.set(andrew, { address: "Andrew's Address"}); // OK

// TypeError: Invalid value used as weak map key
users.set("text", "Hello, World!"); 
```

If an object is used as a key of the WeakMap, and there are no other references to that object, it will be automatically garbage-collected (removed from the WeakMap and memory):

```javascript
const users = new WeakMap();

let john = { id: 1, name: "John" };

users.set(john, { address: "John's Address"}); // OK

// "John" is removed both, from the memory and the WeakMap
john = null;
```

Compare it to the Map:

```javascript
const users = new Map();

let john = { id: 1, name: "John" };

users.set(john, { address: "John's Address"}); // OK

// John is removed from the memory, but not from the Map
john = null;

// Map {{ id: 1, name: "John" } => { address: "John's Address" } }
console.log(users);
```

## Instance Methods of WeakMap

**WeakMap** supports only the following methods:

* `get(key)`
* `set(key)`
* `has(key)`
* `delete(key)`

This means that it is impossible to iterate or loop over the keys, values, entries, compute the size, or clear all values of a WeakMap.

To understand such limitations are necessary, we need to know how garbage-collection works in JavaScript.

When an object lost all its references, it has to be garbage-collected automatically, but we do not know when exactly that will happen.

It is decided by the JavaScript engine. The cleanup can happen immediately or after some time.

Since an object is deleted from the WeakMap as well, we do exactly know what elements does it contain, so we can not calculate the size or iterate over its elements. 

## When to use WeakMaps?

WeakMaps can be extremely useful to store information about the keys, which is only valuable if the key has not been garbage-collected.

They provide a way to extend objects from the outside without interfering with garbage collection.

Whenever you need to extend an object but can't because it is sealed, or taken from an external source - a WeakMap can be applied.

Consider the following example:

```javascript
const cache = new WeakMap();

function getData(key) {
  if (cache.has(key)) {
    console.log("Return from cache");
    return cache.get(key);
  } else {
    console.log("Calculate, cahce and return");
    
    // Calculate the value
    const result = 0;
    
    // Cache the result
    cache.set(key, result);
    
    // Return it
    return result;
  }
}

let user = { name: "John" };

// "Calculate, cahce and return"
getData(user);

// "Return from cache"
getData(user);

// "Return from cache"
getData(user);

// When the object is not needed anymore
// It will be removed from the cache as well
user = null;
```

In the example above, we implemented a simple cache, which holds the objects till they are garbage-collected.

If we used Map instead of the WeakMap, we could end up with a memory leak, because even if the object will be garbage-collected, it still will be stored in the cache.

## Summary