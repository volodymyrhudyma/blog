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

## Omit<Type, Keys>

## Exclude<Type, ExcludedUnion>

## Extract<Type, Union>

## NonNullable<Type>

## Parameters<Type>

## ConstructorParameters<Type>

## ReturnType<Type>

## InstanceType<Type>