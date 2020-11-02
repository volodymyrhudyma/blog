---
title: Everything about Map and WeakMap in JavaScript
tag:
  - JavaScript
metaDescription: Learn everything you should know about Map and WeakMap objects
  in JavaScript that were introduced with the ES6 release. A Map is an object
  that contains key-value pairs. A WeakMap is a similar object with some
  important differences.
teaser: Map and WeakMap objects were introduced with the ES6 release. They were
  developed to be used as an alternative to Objects as key-value storage. Unlike
  Objects, that are limited to having a...
date: 2020-11-03T09:13:19.550Z
---
Map and WeakMap objects were introduced with the ES6 release.

They were developed to be used as an alternative to Objects as key-value storage.

Unlike Objects, that are limited to having a String or a Symbol as a key, Maps and WeakMaps allow you to use **any value as a key**.

## What is a Map?

A **Map** is an object in JavaScript that contains key-value pairs. 

It remembers the insertion order of keys and allows you to use any value either as a key or as a value.

#### Create a Map

A new Map object can be created using the `Map` constructor:

```javascript
// Create a new Map
const users = new Map();
```

#### Add an element

An element can be added to the Map by using the `set(key, value)` function. 

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

#### Retrieve an element

An element can be retrieved from the Map by using `get(key)` function.

*Returns the value that is associated with the key or undefined:*

```javascript
users.get("John"); // { address: "John's Address" }
users.get(obj); // { address: "Michael's Address" }
users.get(func); // { address: "Andrew's Address" }
users.get(NaN); // { address: "NaN's Address" }
users.get("Not existing item"); // undefined
```

#### Check whether Map contains an element

To check whether a value has been linked to the key, a `has(key)` function can be used.

*Returns true or false:*

```javascript
users.has("John"); // true
users.has(obj); // true
users.has(func); // true
users.has(NaN); // true
users.has("Not existing item"); // false
```

#### Remove an element

An element can be removed from the Map by using the `delete(key)` function.

*Returns true if an element has been removed, false if it does not exist:*

```javascript
users.delete("John"); // true
users.delete(obj); // true
users.delete(func); // true
users.delete(NaN); // true 
users.delete("Not existing item"); // false
```

#### Delete all values

To remove all key-value pairs from the Map object, a `clear()` method can be used:

```javascript
users.clear();

console.log(users); // Map {}
```

## Instance Properties and Methods of Map

#### Get the size

To determine the size of the Map, an instance property `size` can be accessed.

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

To get all entries of the Map, the `entries()` function is used.

*Returns an Iterator object that containing an array of all \[key, value] pairs in an insertion order:*

```javascript
// [Map Entries] {
//  [ "project1", { deadline: "2020-12-31" } ],
//  [ "project2", { deadline: "2020-12-31" } ]
// }
projects.entries();
```

#### Iterate over all key-value pairs

To iterate over all key-value pairs, a `forEach(callbackFn[, thisArg])` method is used:

*Calls callbackFn for each key-value pair in insertion order. If a thisArg is specified, it is used as this value for each callback:*

```javascript
// "project1" { deadline: "2020-12-31" }
// "project2" { deadline: "2020-12-31" }
projects.forEach((value, key) => {
  console.log(key, value);
});
```

## Map vs. Object

An **Object** is a collection of properties, defined as key-value pairs.

At first glance, it may seem that there are really no differences between Map and Object, but this assumption is completely wrong.

Objects are similar to Maps, both allow you to store, retrieve, and delete values, but there are important differences:

* **Map's** keys can contain any value, **Object's** keys must contain either a String or a Symbol 
* A **Map** allows us to easily determine the number of stored elements with the `size` property, an **Object** does not provide an easy way to do this
* A **Map** can be iterated directly due to being Iterable, an **Object** requires obtaining its keys and iterating over them
* A **Map** is optimized to perform better than an **Object** when adding or removing elements frequently

## What is a WeakMap?

A **WeakMap** is similar to the **Map** with some important differences:

* A value can only be accessed by having the key and the WeakMap itself
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

If an object is used as a key of the WeakMap and there are no other references to this object, it is automatically garbage-collected (removed from the WeakMap and the memory):

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

**WeakMap** only supports the following methods:

* `get(key)`
* `set(key)`
* `has(key)`
* `delete(key)`

This means that it is impossible to iterate or loop the keys, values and entries, calculate the size or delete all values of a WeakMap.

To understand that restrictions are necessary, we need to know how the garbage-collection works in JavaScript.

When an object has lost all its references, it has to be garbage-collected automatically, but we do not know when exactly when it will happen.

It is decided by the JavaScript engine. The cleanup can be done immediately or after some time.

Since an object is also deleted from the WeakMap, we do not exactly know what elements it contains, so we cannot calculate the size or iterate over its elements. 

## When to use WeakMaps?

WeakMaps can be extremely useful for storing information about the keys, which is only valuable if the key has not been garbage-collected.

They offer a possibility to extend objects from outside without interfering with garbage collection.

Whenever you need to extend an object but cannot do so because it is sealed or comes from an external source, a WeakMap can be applied.

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

In the example above, we have implemented a simple cache that holds the objects until they are garbage-collected.

If we would use Map instead of WeakMap, we could end up with a memory leak, because even if the object is garbage-collected, it still will be stored in the cache.

## Summary

Today we learned what is and how to work with Map and WeakMap in JavaScript.

When it comes to storing data, both can be considered as alternatives to Objects, because they are optimized to provide a better performance when adding/removing entries frequently.

It is definitely worth trying them and seeing what advantages can be achieved.