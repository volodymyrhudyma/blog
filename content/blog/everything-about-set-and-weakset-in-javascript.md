---
title: Everything About Set And WeakSet In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn Sets and WeakSets - objects that contain a collection of
  unique values. Sets can contain values of any type, WeakSets can only contain
  objects. Objects in WeakSets are "weakly held", which means that they can be
  garbage-collected.
teaser: The ES6 release introduced two new JavaScript objects - Set and WeakSet,
  which are very similar to Arrays in that they allow elements to be stored.
  Unlike Arrays, however, Sets and WeakSets cannot store...
date: 2020-11-05T19:35:43.818Z
---
The ES6 release introduced two new JavaScript objects - Set and WeakSet, which are very similar to Arrays in that they allow elements to be stored.

Unlike Arrays, however, Sets and WeakSets cannot store duplicate values.

Let's start learning how to work with both.

## What Is A Set?

A Set is an object that contains a collection of **unique values**. Each value can only occur once. 

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
users.add(0); // Set { 0 }

users.add("John"); // Set { 0, "John" }

const obj = { name: "John" };
users.add(obj); // Set { 0, "John", { name: "John" } }

// Function
const func = () => "John";
users.add(func); // Set { 0, "John", { name: "John" }, [Function: func] }

// NaN
users.add(NaN); // Set { 0, "John", { name: "John" }, [Function: func], NaN }

// Undefined
users.add(undefined); // Set { 0, "John", { name: "John" }, [Function: func], NaN, undefined }
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

## Instance Properties And Methods Of Set

#### Get the size

To determine the size of the Set, an instance property `size` can be accessed.

*Returns the number of elements:*

```javascript
const projects = new Set();

projects.add("project1");
projects.add("project2");

projects.size; // 2
```

#### Get all keys/values

To get all keys or values of the Set, a `keys()` or `values()` method is used accordingly.

For Sets, both methods behave exactly the same way, returning stored elements.

*Returns an Iterator object that contains all keys or values in an insertion order:*

```javascript
projects.keys(); // [Set Iterator] { "project1", "project2" }

projects.values(); // [Set Iterator] { "project1", "project2" }
```

#### Get all entries

To get all entries of the Set, the `entries()` function is used.

Remember that keys and values are equal in Sets. 

*Returns an Iterator object that containing an array of all \[key, value] pairs in an insertion order:*

```javascript
// [Set Entries] {
//  [ "project1", "project1" ],
//  [ "project2", "project2" ]
// }
projects.entries();
```

#### Iterate over all elements

To iterate over all elements, a `forEach(callbackFn[, thisArg])` method is used:

*Calls callbackFn for each value in insertion order. If a thisArg is specified, it is used as this value for each callback:*

```javascript
// "project1" "project1"
// "project2" "project2"
projects.forEach((value, key) => {
  console.log(key, value);
});
```

## Set vs. Array

The main differences between the two:

* **Sets** cannot contain duplicate elements, **Arrays** can
* An element in an **Array** is accessed via its index, in a **Set** it is not possible to retrieve a specific element without traversing the entire collection in the insertion order
* An **Array** is considered an "indexed collection", a **Set** is considered a "keyed collection"

> **Indexed collection** is a collection of data ordered by an index value.
>
> **Keyed collection** is a collection of data indexed by a key.

## Remove Duplicates From Array Using Set

There are several ways to remove duplicates from an Array, but one of the simplest and cleanest is to use Set object:

```javascript
const users = ["John", "Andrew", "Mike", "John", "John"];

const uniqueUsers = [...new Set(users)];

console.log(uniqueUsers); // [ "John", "Andrew", "Mike" ]
```

## What Is A WeakSet?

A **WeakSet** is similar to the **Set** with some important differences:

* A value can only be accessed by having the key and the WeakSet itself
* The keys of a WeakSet must be Objects
* The keys are "weakly held", which means that they can be garbage-collected

An example of a WeakSet:

```javascript
const users = new WeakSet();

const john = { id: 1, name: "John" };
const andrew = { id: 2, name: "Andrew" };

users.add(john); // OK
users.add(andrew); // OK

// TypeError: Invalid value used in weak set
users.add("John");
```

If an object is added to the WeakSet and there are no other references to this object, it is automatically garbage-collected (removed from the WeakSet and the memory):

```javascript
const users = new WeakSet();

let john = { id: 1, name: "John" };

users.add(john);

// "John" is removed both, from the memory and the WeakSet
john = null;
```

Compare it to the Set:

```javascript
const users = new Set();

let john = { id: 1, name: "John" };

users.add(john);

// John is removed from the memory, but not from the Set
john = null;

// Set { { id: 1, name: "John" } }
console.log(users);
```

## Instance Methods Of WeakSet

**WeakSet** only supports the following methods:

* `add(key)`
* `has(key)`
* `delete(key)`

This means that it is impossible to iterate or loop the keys, values and entries, calculate the size or delete all values of a WeakSet.

To understand that restrictions are necessary, we need to know how the garbage-collection works in JavaScript.

When an object has lost all its references, it has to be garbage-collected automatically, but we do not know when exactly when it will happen.

It is decided by the JavaScript engine. The cleanup can be done immediately or after some time.

Since an object is also deleted from the WeakSet, we do not exactly know what elements it contains, so we cannot calculate the size or iterate over its elements.

## When To Use WeakSets?

WeakSets can be used to tag objects without mutating them:

```javascript
let isMarked = new WeakSet();

class Node {
  constructor(id) {
    this.id = id;
  }
  
  mark() {
    isMarked.add(this);
  }
};

let node1 = new Node("node1");
node1.mark();

isMarked.has(node1); // true

node1 = null;

isMarked.has(node1); // false
```

Some more examples are to be found in [this discussion](https://esdiscuss.org/topic/actual-weakset-use-cases).

## Summary

In this article we got to know Set and WeakSet in JavaScript, talked about the differences between Array and Set and found out a good way to remove duplicates from an Array.

Both objects can be considered as alternatives to Arrays.

Try them out and see what benefits they can bring to your project.