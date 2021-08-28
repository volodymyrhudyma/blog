---
title: Type Guards In TypeScript
tag:
  - TypeScript
promote: false
metaDescription: Learn Type Guards in TypeScript that allow you to refine the
  variable type within a conditional block. Use Built-In or Custom (User
  Defined) Type Guards, which return Type Predicates.
shareImage: /img/type-guards-in-typescript.jpg
teaser: If you work with Typescript of a regular basis, you know that it
  provides developers with a large feature list that is frequently updated with
  new stuff. One of the things from that list that you may have been using for
  years without realizing it are Type Guards...
date: 2021-08-30T08:51:06.323Z
---
If you work with Typescript of a regular basis, you know that it provides developers with a large feature list that is frequently updated with new stuff.

One of the things from that list that you may have been using for years without realizing it are **Type Guards**.

## What Is A Type Guard?

A **Type Guard** is a special form of code that helps narrow down the type of variables within a conditional block, such as **if** ... **else if** ... **else** statement or **switch**.

It performs a runtime check that guarantees the type in a scope.

I fully understand that the above statements may sound unclear especially to less experienced programmers at this point, so let's take a look at the following TypeScript code:

```typescript
const formatPrice = (price: number | string) => {
  /* 
    ERROR:
    Property "toFixed" does not exist on type "string | number"
    Property "toFixed" does not exist on type "string" 
  */
  return price.toFixed(2);
};
```

The **formatPrice** function formats the provided value, which can be either a **number** or a **string**, into the **00.00** format, so that if the provided value is **10**, the output is **10.00**.

However, it contains an error and TypeScript warns us about it - *Property "toFixed" does not exist on type "string"*, which means that the **toFixed()** method can only be executed on **number** type.

Sure, it's possible to disallow accepting type **string**, but in some cases it's not obvious which type of a value is coming, so it's better to handle both to be safe.

The above code should be refactored with an **if** statement that checks for the **string** type and converts an argument to a number, so that the **toFixed()** method can be safely executed on it:

```typescript
const formatPrice = (price: number | string) => {
  // "price" is of a "number | string" type
  if (typeof price === "string") {
    // "price" is of a "string" type
    return parseInt(price, 10).toFixed(2);
  }
  // "price" is of a "number" type
  return price.toFixed(2);
};
```

Hovering over the **price** variable in different places in the function shows that the variable is of a different type.

TypeScript is smart enough to understand that the variable inside the **if** statement can only be of a **string** type.

Moreover, it understands that outside of the **if** statement, the variable is of a **number** type.

This is exactly when we hit the first Type Guard.

## Typeof

When the **typeof** operator is used inside the conditional, it is considered a special form of code by a TypeScript - Type Guard:

```typescript
if (typeof price === "string") {
  // ..
}
```

TypeScript follows all possible paths of code execution to analyze the possible type or types of a value at a given place of code.

When it encounters Type Guards or assignments, it tries to refine the types to more specific ones and this process is called narrowing.

> **Narrowing** is the process of going from an infinite number of possible cases to a smaller, finite number.

It is worth to mention that the **typeof** operator gives very limited information about the type of the value.

It is expected to return only one of the following values: **string**, **number**, **bigint**, **boolean**, **symbol**, **undefined**, **object**, **function**:

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

**Important Note:** Remember that **typeof** **null** is an **object**.

To get more precise information about the type of an object, use the **instanceof** operator, because in some cases it is necessary to check whether the specified value is an instance of **A** or **B**.

This is not possible to do with **typeof**, because it only returns **object**.

## Instanceof

The **instanceof** operator checks whether the value is an instance of another value or not:

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

Obviously, **instanceof** is also a Type Guard, since TypeScript is able to narrow down the type of a value in statements that are guarded with it:

```typescript
const formatDate = (value: Date | string) => {
  // "value" is of a "string | Date" type
  if (value instanceof Date) {
    // "value" is of a "Date" type
    return value.toUTCString();
  }
  // "value" is of a "string" type
  return new Date(value).toUTCString();
};

console.log(formatDate(new Date("2021-09-01"))); // "Wed, 01 Sep 2021 00:00:00 GMT"
console.log(formatDate("2021-09-01")); // "Wed, 01 Sep 2021 00:00:00 GMT"
```

## In

The **in** operator does not check the type, but does check if the object contains a property and can be used as Type Guard:

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
}

interface Animal {
  voice: () => void;
}

const saySomething = (being: Human | Animal) => {
  // "being" is of a "Human | Animal" type
  if ("speak" in being) {
    // "being" is of a "Human" type
    return being.speak();
  }
  // "being" is of a "Animal" type
  return being.voice();
};
```

In the above example, we used **in** operator to check if the **being** contains **speak()** property and TypeScript was able to narrow down the type in the "true" branch to **Human**.

Otherwise, in the "false" branch, the type was narrowed down to **Animal**, so we can safely call the **voice()** method without worrying whether **being** contains it or not.

This was a simple example, but what if we had more Union Types?

```typescript
interface Human {
  speak: () => void;
}

interface Dog {
  voice: () => void;
}

interface Cat {
  voice: () => void;
}

const saySomething = (being: Human | Dog | Cat) => {
  // "being" is of a "Human | Dog | Cat" type
  if ("speak" in being) {
    // "being" is of a "Human" type
    return being.speak();
  }
  // "being" is of a "Dog | Cat" type
  return being.voice();
};
```

The only difference is that in the "false" branch, **being** is of a **Dog | Cat** type, but fortunately both contain the **voice()** method, so no error is shown when we call it.

In the world where cats can not talk, we would have gotten an error because we may have called a non-existent method:

```typescript
// ...
interface Cat {
  voice?: () => void;
}

const saySomething = (being: Human | Dog | Cat) => {
  if ("speak" in being) {
    return being.speak();
  }
  /* 
    ERROR:
    Cannot invoke an object which is possibly "undefined".
  */
  return being.voice();
};
```

The simplest solution may be to check if the **voice()** method exists and call it if so:

```typescript
// ...

const saySomething = (being: Human | Dog | Cat) => {
  // ...

  return being.voice && being.voice();
};
```

## Literal Type Guards

TypeScript allows us to create Literal Types, which are more concrete subtypes of collective types.

To begin with, did you know that when you declare a string **const** variable, TypeScript assigns its type to a Literal Type, not a string?

```typescript
const greeting = "Hi"; // The type of "greeting" is "Hi", not "string"
```

On the other hand, when you declare a string **let** variable, which may change in the future, TypeScript assigns its type to string:

```typescript
let greeting = "Hi"; // The type of "greeting" is "string", not "Hi"
```

To distinguish between Literal Types, you can use one of these operators: **\===**, **!==**, **\==**, **!=**:

```typescript
type Car = "audi" | "bmw" | "mercedes";

const chooseCar = (car: Car) => {
  if (car === "audi") {
    return "Vorsprung durch Technik";
  } else if (car === "bmw") {
    return "Sheer Driving Pleasure";
  } else {
    return "The best or nothing";
  }
};
```

If we accidentally add a non-valid condition when the type has already been narrowed down, we will immediately get a hint from TypeScript:

```typescript
type Car = "audi" | "bmw" | "mercedes";

const chooseCar = (car: Car) => {
  if (car === "audi") {
    /* 
      ERROR:
      This condition will always return "false" 
      Since the types "audi" and "bmw" have no overlap
    */
    if (car === "bmw") {}
    return "Vorsprung durch Technik";
  } else if (car === "bmw") {
    return "Sheer Driving Pleasure";
  } else {
    return "The best or nothing";
  }
};
```

That should be clear, now let us look at a more advanced example with Unions containing Literal Types:

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
  if (car.type === "sedan") {
    // "car" is of a "Audi" type
    return car.drive();
  }
  // "car" is of a "Bmw" type
  return car.race();
};
```

Now, inside of the **if** statement the type of **car** is **Audi**, outside - **Bmw**.

## Custom Type Guards

If the built-in Type Guards are not enough, which can happen in some special cases, there is a possibility to create custom, or User Defined Type Guards.

To create a custom Type Guard, you must define a function whose return type is a Type Predicates.

A Type Predicate has the following form: **parameterName is Type**, where **parameterName** must be the name of a parameter from the current function signature.

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

Basically, we check whether the **car** argument contains the **drive()** method.

If yes - then we know that the type of a **car** is **Audi**, otherwise - **Bmw**.

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
  if (isAudi(car)) {
    // "car" is of a "Audi" type
    return car.drive();
  }
  // "car" is of a "Bmw" type
  return car.race();
};
```

In summary, every time **isAudi()** is called, TypeScript will narrow the passed variable down to **Audi** type if the original type is compatible.

## Generic Type Guards

If you are familiar with Generics in TypeScript, you might have noticed that the above Type Guard can be refactored with them.

While it's not obvious because we only created one Type Guard, the pattern is similar if we want to add more:

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

Now you don't need to create a new function for each new type that arrives, just use the existing **isOfType()** method and be sure to be type-safe at runtime.

#### Pitfall

Make sure you use Type Guards wisely, as it can rely heavily on the assumption that the specific method or property only applies to the given type, which may or may not be true, but may also change in the future.

Consider the following example:

```typescript
interface Audi {
  drive: () => void;
}

interface Bmw {
  race: () => void;
}

interface Mercedes {
  drive: () => void;
}

const isOfType = <T>(value: any, property: keyof T): value is T =>
  (value as T)[property] !== undefined;

const chooseCar = (car: Audi | Bmw | Mercedes) => {
  // "car" is of a "Audi | Bmw | Mercedes" type
  if (isOfType<Audi>(car, "drive")) {
    /* 
      We think that the "car" is of a "Audi" type
      But in fact, it can be "Audi | Mercedes"
      Since both interfaces contain "drive()" method
    */
    return car.drive();
  }
  // "car" is of a "Bmw" type
  return car.race();
};
```

Adding a new **Mercedes** type that contains the same method as **Audi** does not break the code, but TypeScript now shows that the **car** inside the **if** statement is **Audi**, but it can also be **Mercedes**.

This can be a big and hard to debug problem in more complex applications, so be aware of it.

## Type Guards With Callbacks

It is not assumed by TypeScript that Type Guards remain active in callbacks, as such an assumption can lead to unexpected bugs:

```typescript
interface User {
  name: string;
  address?: {
    street: string;
  };
}

const user: User = {
  name: "John",
};

const formatStreet = (callback: () => void) => {
  callback();
};

if (user.address) {
  formatStreet(() => {
    // Object is possibly "undefined"
    console.log(user.address.street);
  });
}
```

Although we checked if the **user.address** exists, we get an error in the callback function, passed to **formatStreet()**.

There is a simple solution - declare a local variable that stores the **user.address**:

```typescript
// ...

if (user.address) {
  const { address } = user;
  formatStreet(() => {
    console.log(address.street);
  });
}
```

If you want to learn even more about Type Guards and type narrowing in TypeScript, read the [official documentation](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), which is the most accurate and complete source.

## Summary

**Type Guards** are special forms of code that help narrow down the type of the variable within a conditional block, such as **if** ... **else if** ... **else** statement or **switch**.

They are executed at runtime and guarantee the type in a scope.

Narrowing down types with Type Guards is extremely useful when you get a bunch of types and need to run code that differs for different types.

You can't use the same built-in function for numbers and strings as was shown in the first example, can you?

The good thing is that besides the built-in function Type Guards, there is also the possibility to define your own functions by using Type Predicates.

Be sure to check if the given Type Guard is suitable for your needs, because there are some non-obvious cases that can easily break your app if it is at least a little more complex than simple.

Hope you learned something new today and see you in the next article!