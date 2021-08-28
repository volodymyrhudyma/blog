---
title: Type Guards In TypeScript
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/type-guards-in-typescript.jpg
teaser: If you work with Typescript of a regular basis, you know that it
  provides developers with a large feature list that frequently gets updated
  with a new stuff. One of the things from that list you may have been using for
  years without even being aware of it are...
date: 2021-08-30T08:51:06.323Z
---
If you work with Typescript of a regular basis, you know that it provides developers with a large feature list that frequently gets updated with a new stuff.

One of the things from that list you may have been using for years without even being aware of it are **Type Guards**.

## What Is A Type Guard?

A **Type Guard** is a special form of code that helps to narrow down the type of the variable inside of a conditional block, such as **if** ... **else if** ... **else** statement or **switch**.

I totally understand that the above statement may sound unclear, especially for less experienced programmers, so let's take a look at the following TypeScript code:

```typescript
const formatPrice = (price: number | string) => {
  /* 
    ERROR:
    Property 'toFixed' does not exist on type 'string | number'.
    Property 'toFixed' does not exist on type 'string' 
  */
  return price.toFixed(2);
};
```

The **formatPrice** function formats passed value that can be either a **number** or a **string** to the **00.00** format, so if passed value is **10**, the output is **10.00**.

However, it contains a bug and TypeScript warns us about it - *Property 'toFixed' does not exist on type 'string'*, which means that the **toFixed()** method can be executed only on **number** type.

Surely, it is possible to forbid accepting the **string** type, but in some cases it may not be obvious what type of a value will come in, so to be safe, it is better to handle both of them.

The above code should be refactored with an **if** statement that checks for the **string** type and converts an argument to a number, so the **toFixed()** method can be safely run on it:

```typescript
const formatPrice = (price: number | string) => {
  // "price" is of a "number | string" type
  if(typeof price === "string") {
    // "price" is of a "string" type
    return parseInt(price, 10).toFixed(2);
  }
  // "price" is of a "number" type
  return price.toFixed(2);
};
```

Hovering over the **price** variable in different places of the function shows that the variable is of a different types.

TypeScript is smart enough to understand that within the **if** statement the variable can be only of a **string** type.

Moreover, it understands that outside of the **if** statement, the variable is of a **number** type.

This is exactly the moment we met the first Type Guard.

## \#1 - typeof

When the **typeof** operator is used within the condition, it is seen by a TypeScript as a special form of code - Type Guard:

```typescript
if(typeof price === "string") {
  // ..
}
```

TypeScript follows all possible paths of the code execution to analyze the possible type or types of a value at a given place of code.

When it encounters Type Guards or assignments, it tries to refine the types to more specific ones.

The whole process is called **Narrowing**.

It is worth to mention that the **typeof** operator gives a very limited information about the type of the value.

It is expected to only return one of the following values: **string**, **number**, **bigint**, **boolean**, **symbol**, **undefined**, **object**, **function**:

```typescript
const a = "a";
console.log(typeof a); // "string"

const b = 1;
console.log(typeof b); // "number"

const c = BigInt("1");
console.log(typeof c); // "bigint"

const d = false;
console.log(typeof d); // "boolean"

const e = new Symbol("a");
console.log(typeof e); // "symbol"

const f = undefined;
console.log(typeof f); // "undefined"

const g = new Date("2021-09-01");
console.log(typeof g); // "object"!!

const h = () => {};
console.log(typeof h); // "function"

const i = null;
console.log(typeof i); // "object"!!
```

**Important note:** Remember that **typeof** **null** is an **object**.

To get more precise information about the type of an object, use the **instanceof** operator, because in some cases there is a need to check whether the given value is an instance of **A** or **B**.

This is impossible to do with a **typeof**, since it returns only **object**.

## \#2 - instanceof

The **instanceof** operator checks whether or not the value is an instance of another value:

```typescript
const a = new Date("2021-09-01");
console.log(a instanceof Date); // "true"
console.log(typeof a); // "object"

class User {};

const b = new User();
console.log(b instanceof User); // "true"
console.log(typeof b); // "object"
```

When we write the following code: **a instanceof Date**, we check whether the prototype chain of **a** contains **Date.prototype**.

Obviously, **instanceof** is also a Type Guard, since TypeScript is able to narrow down the type of a value in statements, guarded by it:

```typescript
const formatDate = (value: Date | string) => {
  // "value" is of a "string | Date" type
  if(value instanceof Date) {
    // "value" is of a "Date" type
    return value.toUTCString();
  }
  // "value" is of a "string" type
  return new Date(value).toUTCString();
};

console.log(formatDate(new Date("2021-09-01"))); // "Wed, 01 Sep 2021 00:00:00 GMT"
console.log(formatDate("2021-09-01")); // "Wed, 01 Sep 2021 00:00:00 GMT"
```