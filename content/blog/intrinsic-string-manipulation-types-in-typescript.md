---
title: Intrinsic String Manipulation Types In TypeScript
tag:
  - JavaScript
promote: false
metaDescription: "Learn intrinsic string manipulation types in TypeScript:
  Uppercase, Lowercase, Capitalize and Uncapitalize with code examples. "
shareImage: /img/intrinsic-types-in-typescript.jpg
teaser: "In TypeScript 4.1, apart from a lot of new cool additions, there are
  four new types that help us to better deal with different string
  manipulations. The most common manipulations are: transforming the string to
  either uppercase or lowercase, capitalize and..."
date: 2021-05-04T07:45:40.595Z
---
In TypeScript 4.1, apart from a lot of new cool additions, there are four new types that help us to better deal with different string manipulations.

The most common manipulations are: transforming the string to either uppercase or lowercase, capitalize and uncapitalize it.

Now, it is possible to check if the received string is, for example, capitalized and throw TypeScript error if it is not.

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

To begin with, these new types are drilled into the compiler, which means that we can't create our own implementation of them.

That's the reason they are called intrinsic.

> **Intrinsic types** and their operations are predefined and always accessible. Its implementation is provided by the **TypeScript** compiler.

They are defined using a special **intrinsic** keyword:

```typescript
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;
```

As it is stated in the "[Glossary of TypeScript](https://gist.github.com/ruizb/55e1fc37cb198dccfdaf81450c3ebd43#intrinsic-type)", more intrinsic types could be added in the future.

## How Is That Possible?

You may be wondering - how is that possible with TypeScript?

As of the TypeScript 4.1, these intrinsic functions use JavaScript string runtime functions for string manipulations:

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

In this short, but sweet article we have learned four intrinsic types in TypeScript, added in 4.1 version and designed for dealing with string manipulations:

* Uppercase
* Lowercase
* Capitalize
* Uncapitalize

Make sure to keep your TypeScript version up-to-date to get use of such a great additions.