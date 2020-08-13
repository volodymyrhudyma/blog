---
title: Immutability in JavaScript
tag:
  - JavaScript
metaDescription: META
teaser: TEASER
date: 2020-08-15T16:40:12.111Z
---
Immutability is a very important concept in the programming world. It's been around for a long time, but has recently grown into the JavaScript community.

To understand it better, lets firstly find out what is mutability and why it should be avoided.

## Mutability

**Mutability** is a liability or tendency to change.

Assume that you create copies of the variables:

```javascript
const num = 10;
const str = "string";
const arr = ["a", "r", "r", "a", "y"];
const obj = { a: "a", b: "b" };

// Copy
const numCopy = num;

// Copy
const strCopy = str;

// Reference
const arrCopy = arr;

// Reference
const objCopy = obj;
```

With **Primitive values**, assigning the original variable to a new variable **creates a copy**.

With **Objects and Arrays**, assigning the original variable to a new one **creates a reference** to the original variable.

That's why you can modify the copies of Primitives without affecting the original value:

```javascript
const num = 10;

let numCopy = num;

numCopy = 100;

console.log(num); // Prints 10
console.log(numCopy); // Prints 100
```

But modifying the copies of an object or an array changes the original value as well:

```javascript
const foo = {
  a: "a",
  b: "b",
};

// Creates a reference
const bar = foo;

foo.a = "A";
foo.b = "B";

console.log(foo); // Prints: { a: "A", b: "B" } as it was expected
console.log(bar); // Prints: { a: "A", b: "B" } but we did not change that!
```

Notice, how `bar` object changed as well, however we have not touched it at all.

If an item is **mutable**, modifying the copy also modifies the original. As simple as that.

## Immutability

**Immutable** is unchanging over time or unable to be changed.

Modifying the copy of an immutable object does not change the original:

```javascript
let foo = {
  a: "a",
  b: "b",
};

const bar = {
  ...foo,
  a: "A",
  b: "B",
};

console.log(foo); // Prints: { a: "a", b: "b" } as it was expected
console.log(bar); // Prints: { a: "A", b: "B" } good!
```

The `bar` object remains unchanged.