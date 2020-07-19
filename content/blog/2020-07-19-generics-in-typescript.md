---
title: Generics in TypeScript
tag:
  - JavaScript
teaser: One of the main tools in the toolbox for producing reusable code is
  generic types. They allow the code to be used with a variety of types rather
  than a single one...
date: 2020-07-19T16:23:55.982Z
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

A quick way of fixing this issue:

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
```

But this code leads to losing the type along the way, as when we will receive an `Option` (in `onChange` handler, for example) we would not be able to tell if the value is `string` or `number`.

## The solution

The solution is to use **generics:**

```typescript
type Option<T> = {
  name: string;
  value: T;
};

// Or, to be more precise
type Value = string | number

// Value can be string or number
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