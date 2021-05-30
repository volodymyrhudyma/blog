---
title: 13 Most Used Utility Types In TypeScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-06-01T10:10:16.611Z
---
TypeScript is very flexible and apart from only allowing us to create new types, it also provides a possibility to transform existing ones.

Such transformations are usually done with Utility Types, which are built-in and accessible globally.

In this article we will learn 13 most used Utility Types which will make your developer's life much easier.

## Partial<Type>

Partial creates a new type with all properties of given **Type** set to optional:

```typescript
type Type = { x: string, y: string };

// { x?: string; y?: string }
type PartialType = Partial<Type>;
```

It can be used to update an object of a given type with a subset of properties:

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

## Required<Type>

Required is the opposite of Partial.

It creates a new type with all properties of given **Type** set to required.:

```typescript
type Type = { x?: string, y?: string };

// { x: string; y: string }
type RequiredType = Required<Type>;
```

It can be used when we are sure that the internal variable has all fields set, to avoid doing unnecessary null checks later in the code:

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

## Readonly<Type>

Readonly creates a new type with all properties on Type set to readonly, which means that they can't be reassigned after initialization:

```typescript
type Type = { x: string, y: string };

// { readonly x: string; readonly y: string }
type ReadonlyType = Readonly<Type>;
```

It is useful when you need to freeze an object, so it can't be modified:

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

## Record<Keys, Type>

Record creates a new type whose property keys are Keys and values are Type:

```typescript
// { x: string; y: string }
type Type = Record<"x" | "y", string>;
```

It is useful when all items have similar type of value, especially when there is a large number of them:

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

## Pick<Type, Keys>

Pick creates a new type by picking the specified set of properties Keys from Type:

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

It is useful when you need to get only a subset of properties you are interested in:

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

## Omit<Type, Keys>

Omit creates a new type by picking all properties from Type and then removing Keys:

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

It is useful when you need to omit a subset of properties (some sensitive information, for example):

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

## Exclude<Type, ExcludedUnion>

Exclude creates a new type by excluding all union members from Type that are assignable to ExcludedUnion:

```typescript
// "x" | "y"
type ExcludedType = Exclude<"x" | "y" | "z", "z">;
```

It is useful for excluding specific keys from an object:

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

## Extract<Type, Union>

Extract can be considered as an opposite of Exclude.

It creates a new type by extracting all union members from Type that are assignable to Union:

```typescript
// "x" | "y"
type ExtractedType = Extract<"x" | "y" | "z", "x" | "y">;
```

It is useful for finding the common base of two types:

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

## NonNullable<Type>

NonNullable creates a new type by excluding **null** and **undefined** from **Type**.

Basically, it is a shorthand of **Exclude<T, null | undefined>**:

```typescript
type Type = string | null | undefined; 

// "string"
type NonNullableType = NonNullable<Type>;
```

## Parameters<Type>

Parameters constructs a tuple type from the types used in the parameters of a function type **Type**:

```typescript
const addNumbers = (x: number, y: number) => {
  return x + y;
};

// [x: number, y: number]
type FunctionParameters = Parameters<typeof addNumbers>;
```

You can also retrieve an individual parameter:

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

If is useful for getting a type of the function parameter to ensure type safety, especially when you are using an external library:

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

## ConstructorParameters<Type>

ConstructorParameters constructs a tuple or array type from the types of a constructor.

Basically, it is similar to the Parameters, but works on a class constructor:

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

Same, as Parameters type, it is useful for ensuring that our parameters will be accepted by the constructor, if we are using an external library:

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

## ReturnType<Type>

## InstanceType<Type>