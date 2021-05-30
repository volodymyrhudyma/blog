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
      name: user.name || "Undefined",
      surname: user.surname || "Undefined",
      age: user.age || 0,
    };
  }

  getUser() {
    return this.user;
  }
}
```

## Readonly<Type>

## Record<Keys, Type>

## Pick<Type, Keys>

## Omit<Type, Keys>

## Exclude<Type, ExcludedUnion>

## Extract<Type, Union>

## NonNullable<Type>

## Parameters<Type>

## ConstructorParameters<Type>

## ReturnType<Type>

## InstanceType<Type>