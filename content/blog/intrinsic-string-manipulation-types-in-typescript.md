---
title: Intrinsic String Manipulation Types In TypeScript
tag:
  - JavaScript
promote: false
metaDescription: "Learn about the Intrinsic String Manipulation Types in
  TypeScript: Uppercase, Lowercase, Capitalize and Uncapitalize with simple code
  examples. "
shareImage: /img/intrinsic-types-in-typescript.jpg
teaser: "In TypeScript 4.1, apart from a bunch of cool additions, there are four
  new types that help us better handle various string manipulations. The most
  common manipulations are: converting the string to uppercase or lowercase,
  capitalizing and..."
date: 2021-05-04T07:45:40.595Z
---
In TypeScript 4.1, apart from a bunch of cool additions, there are four new types that help us better handle various string manipulations. 

The most common manipulations are: converting the string to uppercase or lowercase, capitalizing and uncapitalizing it. 

With newly added types it is possible to check if the received string is capitalized, for example, and output a TypeScript error if it is not.

## Uppercase

Converts each character of a string to uppercase:

```typescript
type NickName = "user2069";

// "USER2069"
type ModifiedNickName = Uppercase<NickName>;
```

## Lowercase

Converts each character of a string to lowercase:

```typescript
type NickName = "USER2069";

// "user2069"
type ModifiedNickName = Lowercase<NickName>;
```

## Capitalize

Converts the first character of a string to uppercase:

```typescript
type NickName = "user2069";

// "User2069"
type ModifiedNickName = Capitalize<NickName>;
```

## Uncapitalize

Converts the first character of a string to lowercase:

```typescript
type NickName = "USER2069";

// "uSER2069"
type ModifiedNickName = Uncapitalize<NickName>;
```

## What Is An Intrinsic Type?

To begin with, these new types are drilled into the compiler, which means that can't create our own implementation of them.

That is the reason why they are called intrinsic.

> **Intrinsic types** and their operations are predefined and always accessible. 
>
> Their implementations are provided by the **TypeScript** compiler.

They are defined with a special **intrinsic** keyword:

```typescript
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
```

As it is said in the "[Glossary of TypeScript](https://gist.github.com/ruizb/55e1fc37cb198dccfdaf81450c3ebd43#intrinsic-type)", more intrinsic types could be added in the future.

## How Is That Possible?

You may ask - how is this possible with TypeScript?

As of TypeScript 4.1, these intrinsic functions use JavaScript string runtime functions for string manipulation:

```typescript
function applyStringMapping(symbol: Symbol, str: string) {
    switch (intrinsicTypeKinds.get(symbol.escapedName as string)) {
        case IntrinsicTypeKind.Uppercase: return str.toUpperCase();
        case IntrinsicTypeKind.Lowercase: return str.toLowerCase();
        case IntrinsicTypeKind.Capitalize: return str.charAt(0).toUpperCase() + str.slice(1);
        case IntrinsicTypeKind.Uncapitalize: return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return str;
}
```

## Summary

In this short but sweet article, we learned about four intrinsic types in TypeScript that were added in version 4.1 and are meant to handle string manipulations:

* Uppercase
* Lowercase
* Capitalize
* Uncapitalize.

Make sure you keep your TypeScript version up to date to take advantage of these great additions.