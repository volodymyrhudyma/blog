---
title: 13 Most Used Utility Types In TypeScript
tag:
  - JavaScript
promote: false
metaDescription: Learn the 13 most commonly used Utility Types in TypeScript
  that you can start using immediately for your next TypeScript project.
shareImage: /img/utility-types-in-typescript.jpg
teaser: TypeScript is very flexible, and in addition to the ability to create
  new types, it also offers the ability to transform existing types. Such
  transformations are usually done with Utility Types, which are built-in and
  globally accessible...
date: 2021-05-31T10:10:16.611Z
---
TypeScript is very flexible, and in addition to the ability to create new types, it also offers the ability to transform existing types.

Such transformations are usually done with Utility Types, which are built-in and globally accessible.

In this article, we will learn about the 13 most used Utility Types, which will make your developer's life much easier.

## `Partial<Type>`

Partial creates a new type with all properties of the specified **Type** set to optional:

```typescript
type Type = { x: string, y: string };

// { x?: string; y?: string }
type PartialType = Partial<Type>;
```

It can be used to update an object of a particular type with a subset of properties:

```typescript
interface User {
  name: string;
  surname: string;
  age: number;
}

const updateUser = (user: User, fields: Partial<User>): User => ({
  ...user,
  ...fields,
});

const user1: User = {
  name: "John",
  surname: "Doe",
  age: 17,
};

const user2 = updateUser(user1, { age: 18 });

// { name: "John", surname: "Doe", age: 18 }
console.log(user2);
```

## `Required<Type>`

Required is the opposite of Partial.

A new type is created with all properties of the specified **Type** set to required:

```typescript
type Type = { x?: string, y?: string };

// { x: string; y: string }
type RequiredType = Required<Type>;
```

It can be used when we are sure that the internal variable has all fields set, to avoid unnecessary null checks later in the code:

```typescript
interface User {
  name?: string;
  surname?: string;
  age?: number;
}

class UserManager {
  private user: Required<User>;

  constructor(user: User) {
    this.user = {
      name: user.name || "Not Set",
      surname: user.surname || "Not Set",
      age: user.age || 0,
    };
  }

  getUser() {
    return this.user;
  }
}
```

## `Readonly<Type>`

Readonly creates a new type with all properties of Type set to readonly, which means that they cannot be reassigned after initialization:

```typescript
type Type = { x: string, y: string };

// { readonly x: string; readonly y: string }
type ReadonlyType = Readonly<Type>;
```

It is useful when you need to freeze an object so that it cannot be changed:

```typescript
interface User {
  name: string;
  surname: string;
  age: number;
}

const user: User = {
  name: "John",
  surname: "Doe",
  age: 18,
};

function freeze<T>(obj: T): Readonly<T> {
  return Object.freeze(obj);
}

const readonlyUser = freeze(user);

// Cannot assign to "name" because it is a read-only property
readonlyUser.name = "Andrew";
```

## `Record<Keys, Type>`

Record creates a new type whose property keys are Keys and values are Type:

```typescript
// { x: string; y: string }
type Type = Record<"x" | "y", string>;
```

It is useful if all items have a similar type of value, especially if there are a large number of them:

```typescript
interface UserInfo {
  age: number;
}

type UserName = "john" | "andrew" | "elon" | "jack";

const userList: Record<UserName, UserInfo> = {
  john: { age: 18 },
  andrew: { age: 20 },
  elon: { age: 49 },
  jack: { age: 56 },
};
```

## `Pick<Type, Keys>`

Pick creates a new type by selecting the specified set of properties Keys from Type:

```typescript
type LongType = {
  a: string;
  b: string;
  c: string;
  d: string;
};

// { a: string; b: string }
type ShortType = Pick<LongType, "a" | "b">;
```

It is useful if you only need to get a subset of properties you are interested in:

```typescript
interface User {
  name: string;
  surname: string;
  street: string;
  house: number;
}

type UserAddress = Pick<User, "street" | "house">;

const address: UserAddress = {
  street: "Street",
  house: 1,
};
```

## `Omit<Type, Keys>`

Omit creates a new type by selecting all properties of Type and then removing Keys:

```typescript
type LongType = {
  a: string;
  b: string;
  c: string;
  d: string;
};

// { c: string; d: string }
type ShortType = Omit<LongType, "a" | "b">;
```

It is useful when you need to omit a subset of properties (e.g. some sensitive information):

```typescript
interface User {
  name: string;
  surname: string;
  personalNumber: number;
}

type CleanUser = Omit<User, "personalNumber">;

const getUserData = (user: User): CleanUser => {
  const { personalNumber, ...rest } = user;
  return rest;
};
```

## `Exclude<Type, ExcludedUnion>`

Exclude creates a new type by excluding all union members from Type that are assignable to ExcludedUnion:

```typescript
// "x" | "y"
type ExcludedType = Exclude<"x" | "y" | "z", "z">;
```

It is useful to exclude certain keys from an object:

```typescript
interface User {
  name: string;
  surname: string;
  personalNumber: number;
}

type AllowedKeys = Exclude<keyof User, "personalNumber">;

const getUserProperty = (user: User, key: AllowedKeys) => user[key];

const user: User = {
  name: "John",
  surname: "Doe",
  personalNumber: 999999999,
};

const nameProp = getUserProperty(user, "name");
const surnameProp = getUserProperty(user, "surname");

// Argument of type "personalNumber" is not assignable to parameter of type "name" | "surname"
const personalNumberProp = getUserProperty(user, "personalNumber");
```

## `Extract<Type, Union>`

Extract can be considered the opposite of Exclude.

It creates a new type by extracting all union members from Type that are assignable to Union:

```typescript
// "x" | "y"
type ExtractedType = Extract<"x" | "y" | "z", "x" | "y">;
```

It is useful to find the common base of two types:

```typescript
interface Human {
  id: string;
  name: string;
  surname: string;
}

interface Cat {
  id: string;
  name: string;
  sound: string;
}

// "id" | "name"
type CommonKeys = Extract<keyof Human, keyof Cat>;
```

## `NonNullable<Type>`

NonNullable creates a new type by excluding **null** and **undefined** from **Type**.

Basically, it's a short form of **Exclude<T, null | undefined>**:

```typescript
type Type = string | null | undefined; 

// "string"
type NonNullableType = NonNullable<Type>;
```

## `Parameters<Type>`

Parameters constructs a tuple type from the types used in the parameters of a function type **Type**:

```typescript
const addNumbers = (x: number, y: number) => {
  return x + y;
};

// [x: number, y: number]
type FunctionParameters = Parameters<typeof addNumbers>;
```

You can also retrieve a single parameter:

```typescript
const addNumbers = (x: number, y: number) => {
  return x + y;
};

// "number"
type FirstParam = Parameters<typeof addNumbers>[0];

// "number"
type SecondParam = Parameters<typeof addNumbers>[1];

// "undefined"
type ThirdParam = Parameters<typeof addNumbers>[2];
```

If is useful to get a type of the function parameter to ensure type safety, especially if you are using an external library:

```typescript
const saveUser = (user: { name: string; surname: string; age: number }) => {
  // ...
};

const user: Parameters<typeof saveUser>[0] = {
  name: "John",
  surname: "Doe",
  age: 18,
};
```

## `ConstructorParameters<Type>`

ConstructorParameters constructs a tuple or array type from the types of a constructor.

Basically, it is similar to Parameters, but works on a class constructor:

```typescript
class UserManager {
  private name: string;
  private surname: string;

  constructor(user: { name: string; surname: string }) {
    this.name = user.name;
    this.surname = user.surname;
  }
}

// "[user: { name: string, surname: string} ]"
type UserManagerConstructorParams = ConstructorParameters<typeof UserManager>;
```

Same, as Parameters type, it is useful for ensuring that our parameters are accepted by the constructor when we use an external library:

```typescript
class UserManager {
  private name: string;
  private surname: string;

  constructor(user: { name: string; surname: string }) {
    this.name = user.name;
    this.surname = user.surname;
  }
}

const params: ConstructorParameters<typeof UserManager>[0] = {
  name: "John",
  surname: "Doe",
};
```

## `ReturnType<Type>`

ReturnType constructs a type of the return type of the function **Type**:

```typescript
const getUser = () => ({
  name: "John",
  surname: "Doe",
  age: 18,
});

// { name: string; surname: string; age: number; }
type FunctionReturnType = ReturnType<typeof getUser>;
```

As with Parameters and ConstructionParameters, it is useful when you are working with an external library and want to get a return type of the imported function:

```typescript
const getUser = () => ({
  name: "John",
  surname: "Doe",
  age: 18,
});

type User = ReturnType<typeof getUser>;

const user: User = {
  name: "Andrew",
  surname: "Hopkins",
  age: 20,
};
```

## `InstanceType<Type>`

InstanceType constructs a type consisting of the instance type of a constructor function in **Type**.

Basically, it is similar to ReturnType, but acts on a class constructor:

```typescript
class UserManager {
  name: string;
  surname: string;

  constructor(user: { name: string; surname: string }) {
    this.name = user.name;
    this.surname = user.surname;
  }
}

// { name: string; surname: string }
type UserMangerInstanceType = InstanceType<typeof UserManager>;
```

You probably wouldn't do this, since you can just use the **UserManager** type:

```typescript
class UserManager {
  name: string;
  surname: string;

  constructor(user: { name: string; surname: string }) {
    this.name = user.name;
    this.surname = user.surname;
  }
}

const user2: UserManager = {
  name: "John",
  surname: "Doe",
};
```

The example above is similar to:

```typescript
class UserManager {
  name: string;
  surname: string;

  constructor(user: { name: string; surname: string }) {
    this.name = user.name;
    this.surname = user.surname;
  }
}

type UserMangerInstanceType = InstanceType<typeof UserManager>;

const user: UserMangerInstanceType = {
  name: "John",
  surname: "Doe",
};
```

However, it is also possible to create dynamic classes in TypeScript, where **InstanceType** can be used to retrieve the type of the dynamic instances.

## Summary

TypeScript comes with built-in Utility Types, which can be accessed globally and used to transform existing types effortlessly.

However, I recommend using them whenever possible instead of manual implementations, as they increase code readability and maintainability.

Make sure you know all of today's 13 Utility Types as they are the most common and you will most likely need to use some of them in every project.