---
title: A simple guide to generics in TypeScript
tag:
  - JavaScript
teaser: One of the main tools in the toolbox for producing reusable code is
  generic types. They allow the code to be used with a variety of types rather
  than a single one...
date: 2020-07-20T16:23:55.982Z
---
One of the main tools in the toolbox for producing reusable code is generics.

It allows the code to be used not only with a single type, but with a variety of types. 

So basically you are allowing users to use **your** **code** with **their own types**.

## The problem

Consider the following situation: you are building a `Select` component and it receives some props. One of them is `options`, that contains all available options that are displayed on the list.

Due to the fact that you are using TypeScript, it is necessary to provide a type for each `option` item:

```typescript
type Option = {
  name: string;
  value: string;
};
```

So far the type looks good, but there is one potential problem: what if the `value` will contain a `number`?

Quick and dirty ways of fixing this issue:

```typescript
type Option = {
  name: string;
  value: string | number;
};

// Or create a type alias
type Value = string | number;

type Option = {
  name: string;
  value: Value;
};

// Or use any (do not even consider that!)
type Option = {
  name: string;
  value: any;
};
```

But this code leads to losing the type along the way, as when we will receive an `Option` (in `onChange` handler, for example) we would not be able to tell if the value is `string` or `number`.

## The solution

The solution is to use **generics:**

```typescript
type Option<T> = {
  name: string;
  value: T;
};

// Or, to allow only string or number
type Value = string | number;

type Option<T extends Value> = {
  name: string;
  value: T;
};
```

Now, to use the proper type for the `value`:

```typescript
const numberOptions: Option<number> = [
  {
    name: "One",
    value: 1,
  },
  {
    name: "Two",
    value: 2,
  },
];

const stringOptions: Option<string> = [
  {
    name: "John",
    value: "john",
  },
  {
    name: "Doe",
    value: "doe",
  },
];
```

As you may have noticed, we use type variable to retrieve a type from the user and use it as a `value` type.

## The identity function

> **The identity function** is a function that will return back whatever is passed in.

An example of an identity function without generics:

```typescript
const identity = (argument: number): number => {
  return argument;
};
```

 An example of an identity function with generics:

```typescript
const identity = <T>(argument: T): T => {
  return argument;
};
```

Once we have defined the identity function, we can use it in one of two ways:

```typescript
// Pass the type argument to the function
const result = identity<number>(10);

// Use type argument inference
// Compiler sets the type automatically, based on the type of provided value
const result = identity(10);

```

**Important note:** while type argument inference can be a helpful tool to keep code short and readable, you may better need to explicitly pass the type arguments for more complex types, as the compiler may fail to guess the proper type.

What if the identity function should receive an array and return its length?

```typescript
const identity = <T>(argument: T[]): T[] => {
  return argument.length;
};

// The second way
const identity = <T>(argument: Array<T>): Array<T> => {
  return argument.length;
};

// The third way
// We do not limit function to arrays only
// But allow to pass types which have length property
interface ILength {
  length: number;
}

const identity = <T extends ILength>(argument: T): T => {
  return argument.length;
};
```

## More complex examples

You can declare a type parameter that is constrained by another type parameter.

For example, let's create a function that gets a property value from an object by the name.

We would like to ensure that we’re not accidentally grabbing a property that does not exist so we’ll place a constraint between the two types:

```typescript
const getProperty = <T, K extends keyof T>(obj: T, key: K): number => {
  return obj[key];
}

const x = { a: 1, b: 2, c: 3 };

getProperty(x, "a"); // returns "1"
getProperty(x, "e"); // error: Argument of type "e" isn't assignable to "a" | "b" | "c".
```

## Summary

The main reason to use generics in TypeScript is to enable types to act as parameters.

It helps us to produce more reusable and maintainable code without any type duplicates.