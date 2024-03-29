---
title: Immutability In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn the difference between Immutable and Mutable data types.
  Immutable means unchanging over time or unable to be changed, so modifying the
  copy of an immutable object does not change the original.
teaser: Immutability is one of the core principles of functional programming. It
  has been around for a long time, but has recently evolved into the JavaScript
  community. To understand it better, let's first find out what is mutability
  and why it should be avoided...
date: 2020-08-15T16:40:12.111Z
---
Immutability is one of the core principles of functional programming. 

It has been around for a long time, but has recently evolved into the JavaScript community.

To understand it better, let's first find out what is mutability and why it should be avoided.

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

That is why you can modify the copies of Primitives without affecting the original value:

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

## Creating Immutable Objects

In this section we will review the tools JavaScript provides to create immutable objects.

Primitives are already immutable, but for Arrays and Object we have some built-in methods.

#### Spread operator

Spread operator (`...`) allows to create a new object using the own properties of an existing object:

```javascript
const user = {
  name: "John",
};

const newUser = {
  ...user,
};

console.log(user === newUser); // Prints "false" as the are different objects
```

#### Object.assign

The `Object.assign(target, source)` copies all enumerable own properties from one or more source objects to a target object and returns it:

```javascript
const source = { 
  name: "John",
  surmame: "Doe",
};

const result = Object.assign({}, source);

console.log(source === result); // Prints "false"
```

**Important note:** do not forget that the `target` object is modified, so in order to properly copy `source`, you will need to pass an empty object as a first argument.

#### External libraries

There are a lot of external libraries available to deal with immutability, like [immutable.js](https://github.com/immutable-js/immutable-js) and [immer.js](https://github.com/immerjs/immer).

## The Benefits Of Immutability

What are the good parts about writing the code in immutable way?

* **Increasing predictability**

  Mutation hides change which creates unexpected side effects leading to nasty bugs. 
* **Change tracking**

  Objects can be compared by reference and if they are equal, it means that nothing has changed, because changing an object in an immutable way creates a new instance that contains another reference.
* **History preview**

  History entries can be collected in separate (immutable) objects and the state can be replaced with them at any given moment. Need to undo something? Just restore the state saved while undoing and that is it.

## The Drawbacks Of Immutability

We already know that you need to create a new object instance to modify it.

But is not that much more expensive than a simple modification of the original instance?

That would have been the case if we did not have **structural sharing** and **garbage collection**.

#### Structural sharing

Structural sharing means that all updates return new values, but internal structures are shared to drastically reduce memory usage.

Consider the following example:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  address: {
    street: "Example street",
    house: "7",
  },
};

const newUser = {
  ...user,
  name: "Mary",
  surname: "Jane",
};

console.log(user === newUser); // Of course, prints "false"
console.log(user.address === newUser.address); // Prints "true", do you understand why?
```

Do you already know why we received `true` when compared `user.address` with `newUser.address`?

The `address` object did not need to mutate, it was shared in order to reduce memory usage.

Then, how we can change the nested object? Consider the following example:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  address: {
    street: "Example street",
    house: "7",
  },
};

const newUser = {
  ...user,
  name: "Mary",
  surname: "Jane",
  address: {
    ...user.address,
    street: "Long avenue",
  },
};

console.log(user === newUser); // Prints "false"
console.log(user.address === newUser.address); // Prints "false"
```

We recreate only the parts we need, so the memory is not wasted.

#### Garbage collection

A mechanism named **garbage collector** efficiently looks for all objects that are not used anymore, then disposes of them. 

After creating new versions of our immutable objects, as soon as GC it realises that our code would not need old ones, the memory will be quickly freed.

```javascript
// The "user" variable references the object {name: "John"}
let user = {
  name: "John"
};

// Some logic here...

// The value of "user" is overwritten, therefore the reference is lost
user = null;

// Garbage collector will junk the data and free the memory
```

## Summary

**Every time we want to change the content of an object (remember that arrays are also objects in JavaScript), we create a new object with updated content.**

Immutability provides the right way to change the data or state of an application.

Immutable states allow the code to quickly determine whether a change has occurred. 

We do not need to perform a recursive comparison, the comparison of references is sufficient.

Even though it may sound like an advanced concept at first, try it out and you will be excited.