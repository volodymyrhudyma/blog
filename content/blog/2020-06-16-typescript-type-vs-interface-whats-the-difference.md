---
title: Typescript "type" vs "interface". What's the difference?
tag:
  - JavaScript
teaser: "One of the most asked interview questions for JavaScript developers is:
  \"What's the difference between \"type\" and \"interface\" in typescript?\".
  Even if you used both of them, the answer might not be obvious..."
date: 2020-06-15T17:43:12.103Z
---
One of the most asked interview questions for JavaScript developers is: "What's the difference between "type" and "interface" in typescript?".

Even if you used both of them, the answer might not be obvious.

Let's see if we can clarify it a bit.

## Type

By using `type` keyword, **we create an alias to the type**.

```javascript
type FirstName = string;
type LastName = string;
type Age = string | number;

type User = {
  firstName: FirstName;
  lastName: LastName;
  age: Age;
};
```

Aliasing doesn't actually create a new type, it creates a name(alias) to refer to that type.

## Interface

By using `interface` keyword, **we create a new type**.

```javascript
interface User {
  firstName: string;
  lastName: string;
  age: number;
};
```

## The difference

As you might have noticed, they are both very similar, however, there are some important differences:

* It's only possible to use `type` to alias primitive types:

```javascript
type MyString = string;

// "string" only refers to a type, but is being used as a value here
interface IMyString extends string {}

/* 
  WRONG!
  It's possible to extend "String", but don't forget
  'string' instanceof String === false
*/
interface IMyString extends String {}
```

**Important note:** `String` is the JavaScript String type, which could be used for creating new strings. `string` is the TypeScript string type, which you can use to type variables, parameters, etc.