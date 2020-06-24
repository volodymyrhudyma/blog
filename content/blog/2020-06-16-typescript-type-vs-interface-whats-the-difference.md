---
title: Typescript "type" vs "interface". What's the difference?
tag:
  - JavaScript
teaser: "One of the most asked interview questions for JavaScript developers is:
  \"What's the difference between type and interface in TypeScript?\". Even if
  you used both of them, the answer might not be obvious..."
date: 2020-06-16T17:43:12.103Z
---
One of the most asked interview questions for JavaScript developers is: "What's the difference between `type` and `interface` in TypeScript?".

Even if you used both of them, the answer might not be obvious, as both of them are correct:

```typescript
type User = {
  firstName: string;
  lastName: string;
};

interface IUser {
  firstName: string;
  lastName: string;
};

const user: User = {
  firstName: "John",
  lastName: "Doe",
};

const iUser: IUser = {
  firstName: "John",
  lastName: "Doe",
};
```

Let's see if we can clarify it a bit.

## Type

By using `type` keyword, **we create an alias to the type**.

```typescript
type FirstName = string;

type LastName = string;

type Age = string | number;

type User = {
  firstName: FirstName;
  lastName: LastName;
  age: Age;
};
```

Aliasing doesn't create a new type, it creates a name(alias) to refer to that type.

## Interface

By using `interface` keyword, **we create a new type**.

```typescript
interface User {
  firstName: string;
  lastName: string;
  age: number;
};
```

## The difference

As we have already mentioned, they are both very similar, however, there are some important differences:

* It's only possible to use `type` to alias primitive types:

```typescript
type MyString = string;

// "string" only refers to a type, but is being used as a value here
interface IMyString extends string {}

/* 
  WRONG!
  It's possible to extend "String", but don't forget
  "string" instanceof String === false
*/
interface IMyString extends String {}
```

**Important note:** `String` is the JavaScript String type, which could be used for creating new strings. `string` is the TypeScript string type, which you can use to type variables, parameters, etc.

* You can't declare **Tuples** with `interface`:

```typescript
type Tuple = [number, string];

interface ITuple {
  0: number;
  1: string;
};

/*
  Conversion of type "[number, string, string]" to type "Tuple" may be a mistake 
  because neither type sufficiently overlaps with the other. 
  If this was intentional, convert the expression to "unknown" first.
  Types of property "length" are incompatible.
  Type "3" is not comparable to type "2".
*/
[0, "second", "third"] as Tuple;

// No error is shown, but this is wrong 
[0, "second", "third"] as ITuple;
```

**Tuple** - new data type, introduced by TypeScript. It enables storing multiple fields of different types.

* You can declare only one `type` per scope:

```typescript
type User = {
  firstName: string;
};

// Duplicate identifier "User"
type User = {
  lastName: string;
};
```

But many `interface`s:

```typescript
interface User {
  firstName: string;
};

interface User {
  lastName: string;
};
```

All interfaces will be merged into one, containing all provided properties with their types.

* You can declare computed properties only using `type` keyword:

```typescript
type Fields = "firstName" | "lastName";

type User = {
  [field in Fields]: string;
}

/*
  A computed property name in an interface must refer to an expression 
  whose type is a literal type or a "unique symbol".
  A computed property name must be of type 
  "string", "number", "symbol", or "any".
*/
interface IUser {
  [field in Fields]: string;
};
```

* `type` does not have the functionality of extending, `interface` has:

```typescript
type Animal = {
  sound: string;
};

type Mammal = {};

// We can merge type aliases by using "&" operator
type Dog = Animal & Mammal & {
  name: string;
};

interface IDog extends Animal, Mammal {
  name: string;
};
```

**Important note:** We can merge `type` aliases using `&` operator, it's called an **intersection**.

## Summary

Having all the differences in mind, you are probably about to ask a question: "What should I use?" or "When should I use `type` and when `interface`?".

There's no strict answer, the point is just to be consistent.

Interfaces may be a better choice for defining an object or creating types for public API and types - for aliasing long custom types, like `number | string | boolean | null`.