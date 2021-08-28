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

It performs a runtime check that guarantees the type in a scope.

I totally understand that the above statements may sound unclear, especially for less experienced programmers, so let's take a look at the following TypeScript code:

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

When it encounters Type Guards or assignments, it tries to refine the types to more specific ones and this process is called narrowing.

> **Narrowing** is the process of going from an infinite number of potential cases to a smaller, finite number of potential case.

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

## \#3 - in

The **in** operator does not check the type, but it checks whether or not the object contains a property and can be used as a Type Guard:

```typescript
const user = {
  name: "John",
};

console.log("name" in user); // "true"
console.log("surname" in user); // "false" branch
```

Consider the following example:

```typescript
interface Human {
  speak: () => void;
};

interface Animal {
  voice: () => void;
}

const saySomething = (being: Human | Animal) => {
  // "being" is of a "Human | Animal" type
  if("speak" in being) {
    // "being" is of a "Human" type
    return being.speak();
  } 
  // "being" is of a "Animal" type
  return being.voice();
};
```

In the example above, we used **in** operator to check whether the **being** contains **speak()** property and TypeScripted was able to narrow down the type within the "true" branch to **Human**.

Otherwise, in the "false" branch, the type was narrowed down to **Animal**, so we can safely call the **voice()** method without being worried whether **being** contains it or not.

This was an easy example, but what if we had more Union Types?

```typescript
interface Human {
  speak: () => void;
};

interface Dog {
  voice: () => void;
}

interface Cat {
  voice: () => void;
}

const saySomething = (being: Human | Dog | Cat) => {
  // "being" is of a "Human | Dog | Cat" type
  if("speak" in being) {
    // "being" is of a "Human" type
    return being.speak();
  }
  // "being" is of a "Dog | Cat" type
  return being.voice();
};
```

The only difference is that in the "false" branch, **being** is of a **Dog | Cat** type, but fortunately both of them contain **voice()** method, so no error is shown when we call it.

In the world, where cats can not speak, we would have received an error, since we may have called not existing method:

```typescript
// ...
interface Cat {
  voice?: () => void;
}

const saySomething = (being: Human | Dog | Cat) => {
  if("speak" in being) {
    return being.speak();
  }
  /* 
    ERROR:
    Cannot invoke an object which is possibly "undefined".
  */
  return being.voice();
};
```

The simplest solution may be to check whether the **voice()** method exists and call it if so:

```typescript
// ...

const saySomething = (being: Human | Dog | Cat) => {
  // ...
  
  return being.voice && being.voice();
};
```

## \#4 - Literal Type Guard

TypeScript allows us to create Literal Types, which are more concrete sub-types of collective types.

To begin with, did you know that when declaring a string **const** variable, TypeScript assigns its type to a Literal Type, not string?

```typescript
const greeting = "Hi"; // The type of "greeting" is "Hi", not "string"
```

On the other hand, when declaring a string **let** variable, which potentially may change in the future, TypeScript assigns its type to string:

```typescript
let greeting = "Hi"; // The type of "greeting" is "string", not "Hi"
```

To distinguish between Literal Types, you can use any of those operators: **\===**, **!==**, **\==**, **!=**:

```typescript
type Car = "audi" | "bmw" | "mercedes";

const chooseCar = (car: Car) => {
  if(car === "audi") {
    return "Vorsprung durch Technik";
  } else if(car === "bmw") {
    return "Sheer Driving Pleasure";
  } else {
    return "The best or nothing";
  }
};
```

If we accidentally add not valid condition when the type has already been narrowed down, we will instantly get a hint from TypeScript:

```typescript
type Car = "audi" | "bmw" | "mercedes";

const chooseCar = (car: Car) => {
  if(car === "audi") {
    /* 
      ERROR:
      This condition will always return "false" 
      Since the types "audi" and "bmw" have no overlap
    */
    if(car === "bmw") {}
    return "Vorsprung durch Technik";
  } else if( car === "bmw") {
    return "Sheer Driving Pleasure";
  } else {
    return "The best or nothing";
  }
};
```

That should be clear, now let's see more advanced example with Unions containing Literal Types:

```typescript
interface Audi {
  type: "sedan";
  drive: () => void;
}

interface Bmw {
  type: "hatchback";
  race: () => void;
}

const chooseCar = (car: Audi | Bmw) => {
  // "car" is of a "Audi | Bmw" type
  if(car.type === "sedan") {
    // "car" is of a "Audi" type
    return car.drive();
  }
  // "car" is of a "Bmw" type
  return car.race();
};
```

Now, inside of the **if** statement the type of the **car** is **Audi**, outside - **Bmw**.

## Custom Type Guards

If the built-in Type Guars are not enough, which may happen in some special cases, there is a possibility to create custom, or User Defined Type Guards.

To create a custom Type Guard, you need to define a function whose return type is a Type Predicates.

A Type Predicate takes the following form: **parameterName is Type**, where **parameterName** must be the name of a parameter from the current function signature.

Let's create a custom Type Guard with the **car is Audi** Predicate:

```typescript
interface Audi {
  drive: () => void;
}

interface Bmw {
  race: () => void;
}

const isAudi = (car: Audi | Bmw): car is Audi => {
  return (car as Audi).drive() !== undefined;
};
```

Basically, we check whether the **car** argument contains **drive()** method.

If it does - then we know that the type of a **car** is **Audi**, otherwise - **Bmw**.

Let's refactor the last example from the previous section with a custom Type Guard:

```typescript
interface Audi {
  drive: () => void;
}

interface Bmw {
  race: () => void;
}

const isAudi = (car: Audi | Bmw): car is Audi => {
  return (car as Audi).drive() !== undefined;
};

const chooseCar = (car: Audi | Bmw) => {
  // "car" is of a "Audi | Bmw" type
  if(isAudi(car)) {
    // "car" is of a "Audi" type
    return car.drive();
  }
  // "car" is of a "Bmw" type
  return car.race();
};
```

To sum up, any time the **isAudi()** is called, TypeScript will narrow down passed variable to the **Audi** type if the original type is compatible.

## A Generic Type Guard

If you are familiar with Generics in TypeScript, you could have noticed that the Type Guard above can be refactored using them.

While it is not obvious, because we created only one Type Guard, but the pattern is similar if we would like to add more:

```typescript
interface Audi {
  drive: () => void;
}

interface Bmw {
  race: () => void;
}

const isAudi = (car: Audi | Bmw): car is Audi => {
  return (car as Audi).drive() !== undefined;
};

const isBmw = (car: Audi | Bmw): car is Bmw => {
  return (car as Bmw).race() !== undefined;
};
```

We don't respect the **DRY(Don't Repeat Yourself)**, one of the most important principles in software development.

Let's create a generic Type Guard:

```typescript
const isOfType = <T>(value: any, property: keyof T): value is T =>
  (value as T)[property] !== undefined;

```

And use it:

```typescript
interface Audi {
  drive: () => void;
}

interface Bmw {
  race: () => void;
}

const isOfType = <T>(value: any, property: keyof T): value is T =>
  (value as T)[property] !== undefined;

const chooseCar = (car: Audi | Bmw) => {
  // "car" is of a "Audi | Bmw" type
  if (isOfType<Audi>(car, "drive")) {
    // "car" is of a "Audi" type
    return car.drive();
  }
  // "car" is of a "Bmw" type
  return car.race();
};
```

Now you don't need to create a new function each type a new type arrives, just use the existing **isOfType()** method and be confident that you are type-safe at a run-time.

## Summary