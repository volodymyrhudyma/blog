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

This is exactly the moment we faced the first Type Guard - **typeof**.

## Type Guard: typeof