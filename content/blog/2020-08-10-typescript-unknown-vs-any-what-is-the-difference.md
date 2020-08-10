---
title: TypeScript - unknown vs. any. What is the difference?
tag:
  - JavaScript
metaDescription: "Learn the main differences between the TypeScript's 2 top
  types: unknown and any. Any represents every possible value, unknown is much
  less permissive and type-safe counterpart of any."
teaser: "In TypeScript, there are 2 top types: any and unknown, that are both
  very similar, but unknown is much less permissive..."
date: 2020-08-11T18:21:01.880Z
---
TypeScript has 2 so called top types - any and unknown.

> **Top type** is a supertype of every other type, which means that we can assign anything to it.

In the next sections we will get familiar with both keywords, determine the most important differences between them and find out when we can use each one.

## The "any" type

Sometimes we want to describe a variable we don’t know the type of. 

That’s exactly why we need **any** type. 

It represents **every possible value**:

```typescript
let a: any;

a = 1;
a = "string";
a = [];
a = {};
a = null;
a = undefined;
```

We are allowed to do any action on a variable of this type, which means that the following operations are all correct:

```typescript
const a: any;

a.b.c.d.e.f;
a.toString();
a();
a[0];
```

Using it allows us to escape from the type system and write code as if it was pure JavaScript, which gives us a lot of freedom.

But writing code in this manner leads to some unpredictable errors, TypeScript can easily prevent.

## The "unknown" type

Just like with **any**, we use the **unknown** type to describe a variable we don’t know the type of:

```typescript
let a: unknown;

a = 1;
a = "string";
a = [];
a = {};
a = null;
a = undefined;
```

All assignments are correct, but let's see what happens if we try to assign a variable of type **unknown** to any other type?

```typescript
const a: unknown;

const b: number = a; // Error: Type "unknown" is not assignable to type "number".
const c: string = a; // Error
const d: string[] = a; // Error
const e: object = a; // Error
const f: null = a; // Error

// But
const j: unknown = a; // Looks good!
const e: any = a; // Looks good!

```

The **unknown** type is only assignable to the **any** type and itself.

Now, let's see if we can perform the same operations as on **any** type:

```typescript
const a: unknown;

a.b.c.d.e.f; // Error: Object is of type "unknown"
a.toString(); // Error
a(); // Error
a[0]; // Error
```

None of these operations are allowed anymore. 

By switching from **any** to **unknown** we reduced the number of available actions from all possible to almost nothing.

We can't perform any operations on the **unknown** type without narrowing it down.

## Narrowing down the "unknown" type

There are a few ways to narrow down the **unknown** type, like: type assertions, **typeof**/**instanceof** operators.

#### Type assertion

```typescript
const a: unknown = "STRING";

// Perform type assertion
const b: string = a as string;

console.log(b.toLowerCase()); // Prints "string"
```

**Important note:** be aware that TypeScript would not check if your assertion is correct, is will think you know better, therefore the following error is likely to happen:

```typescript
const a: unknown = 1;

// Perform WRONG type assertion
const b: string = a as string;

console.log(b.toLowerCase()); // TypeError "b.toLowerCase" is not a function
```

In the example above `b` contains a number, but TypeScript receives an assertion it is a string and and error is thrown, when we try to access `toLowerCase` function on number.

#### Typeof

```typescript
const getValueType = (value: unknown) => {
  if(typeof value === "string") {
    return "String";
  }
  if(typeof value === "number") {
    return "Number";
  }
  return "Unknown";
}

console.log(getValueType(10)); // Prints "Number"
console.log(getValueType("string")); // Prints "String"
console.log(getValueType(false)); // Prints "Unknown"
```

#### Instanceof

```typescript
const getDateISOString = (value: unknown) => {
  if(value instanceof Date) {
    return value.toISOString();
  }
  return "Not a date";
}

console.log(getDateISOString(10)); // Prints "Not a date"
console.log(getDateISOString("string")); // Prints "Not a date"
console.log(getDateISOString(new Date())); // Prints "2020-08-10T18:51:51.673Z"
```

## Union types with "unknown"

In a union type, **unknown** absorbs every type. 

If any of the constituent types is **unknown**, the union type evaluates to **unknown**:

```typescript
type A = unknown | number; // uknown
type B = unknown | string; // uknown
type C = unknown | boolean; // uknown

// But
type D = unknown | any; // any
```

**Important note:** if union type contains **any**, it evaluates to **any**.

## Intersection types with "unknown"

In an intersection type, **unknown** is absorbed by every type. 

Any type which intersects with **unknown**, does not change:

```typescript
type A = unknown && number; // number
type B = unknown && string; // string
type C = unknown && boolean; // boolean

// But
type D = unknown && any; // any
```

**Important note:** if intersection type contains **any**, it evaluates to **any**.

## Summary

In TypeScript, there are 2 top types: **any** and **unknown**.

They are both very similar, but **unknown** is much less permissive.

We need to do some type checks before doing anything with a variable of an **unknown** type, which makes it more type-safe and preferred way of saying that the type value is not known. 

Try to avoid **any** as much as possible.

![Any vs Unknown explanation](/img/screenshot-2020-08-10-at-21.07.00.png "Any vs Unknown explanation")