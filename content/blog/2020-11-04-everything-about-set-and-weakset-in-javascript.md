---
title: Everything About Set and WeakSet in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-11-06T19:35:43.818Z
---
- - -

title: Everything About Set and WeakSet in JavaScript
tag:

* JavaScript
  metaDescription: // META
  teaser: // TEASER
  date: 2020-11-06T19:35:43.818Z

- - -

## What is a Set?

A Set is an object that contains a collection of **unique values**. Each value can occur only once. 

It remembers the insertion order and allows you to store values of any type.

#### Create a set

```javascript

```

#### Add an element

An element can be added to the Set by using the `add(value)` function.

*Returns Set object:*

```javascript

```

**Important note:** **NaN** and **undefined** can also occur in Sets. All NaN values are equated, even though in JavaScript `NaN !== NaN`.

#### Check whether Set contains an element

To check whether a Set contains a value, `has(key)` function can be used.

*Returns true or false:*

```javascript

```

#### Remove an element

An element can be removed from the Set by using the `delete(key)` function.

*Returns true if an element has been removed, false if it does not exist:*

```javascript

```

#### Delete all values

To remove all values from the Set object, a `clear()` method can be used:

```javascript

```

## Instance Properties and Methods of Set

#### Get the size

To determine the size of the Set, an instance property `size` can be accessed.

*Returns the number of elements:*

```javascript

```

#### Get all keys/values

To get all keys or values of the Set, a `keys()` or `values()` method is used accordingly.

For Sets, both methods behave exactly the same way, returning stored elements.

*Returns an Iterator object that contains all keys or values in an insertion order:*

```javascript

```

#### Get all entries

To get all entries of the Set, the `entries()` function is used.

Remember that keys and values are equal in Sets. 

*Returns an Iterator object that containing an array of all \[key, value] pairs in an insertion order:*

```javascript

```

#### Iterate over all elements

To iterate over all elements, a `forEach(callbackFn[, thisArg])` method is used:

*Calls callbackFn for each value in insertion order. If a thisArg is specified, it is used as this value for each callback:*

```javascript

```

## Set vs. Array

The Main differences between both:

* **Sets** cannot contain duplicate elements, **Arrays** can
* An element in an **Array** is accessed using its index, in a **Set** it is not possible to retrieve a specific element without traversing the whole collection in the insertion order
* An Array is considered as an "indexed collection", a Set as a "keyed collection"

> **Indexed collection** is a collection of data which is ordered by an index value.
>
> **Keyed collection** is a collection of data which is indexed by a key.

## What is a WeakSet?

A **WeakSet** is similar to the **Set** with some important differences:

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

## Instance Methods of WeakSet

## When to use WeakSets?

## Summary