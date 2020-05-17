---
title: Template literals in JavaScript
date: 2020-05-17T16:00:02.738Z
---
Template literals are string literals which allow to embed an expression. It is possible to use string interpolation and multi-line string features with them.

> Replacing placeholders with values inside of a string literal is called **string interpolation**.

In JavaScript, there are 3 ways of defining a string:

```javascript
// Single quote
const single = 'I am a string';

// Double quotes
const double = "I am a string";

// Backticks
const backticks = `I am a string`;
```

You are probably familiar with those 2 at the top, but have you seen string in backticks ``` `` ``` before?

## Template literals

Template literals are enclosed by the backticks ``` `` ```.

They can contain placeholders, which are enclosed by the dollar sign along with curly braces `${...}`.

The expressions, that are passed as a placeholders are evaluated during the run-time and their result is inserted into the string.

## Placeholders

Placeholders can contain basically everything:

* numbers `${10}`
* operations `${10 + 10}`
* variables `${variable}`
* function calls `${example(10)}`

Example using addition operation:

```javascript
const string = `The result is: ${10 + 10}`;

console.log(string); // Prints "The result is: 20"
```

Example using function call:

```javascript
const evaluate = (nr1, nr2) => nr1 + nr2;

const string = `The result is: ${evaluate(10, 10)}`;

console.log(string); // Prints "The result is: 20"
```

The placeholder expression result is implicitly converted to a string:

```javascript
const number = 10;

// Variable "number" is evaluated to number "3.5"
// Afterwards, "3.5" is converted into a string
const string = `The result is: ${number}`;

console.log(string); // Prints "The result is: 10"
```

**Important note:** if the placeholder contains an object, method `toString` is applied to it:

```javascript
const numbers = [10, 20, 30];

// Method "numbers.toString()" is called
const string = `The result is: ${numbers}`;

console.log(string); // Prints "The result is: 10,20,30"
```

## Escaping placeholders

In the template strings, placeholder expressions has special meanings, so it's not possible to use the following pattern without escaping `` `I love ${apple}` ``.

Let's try:

```javascript
// ReferenceError: apple is not defined
const string = `I love ${apple}`;
```

In order to tell the interpreter to skip `${apple}` evaluation, you should use backslash before the placeholder, like this: `\${apple}`:

```javascript
const string = `I love \${apple}`;

console.log(string); // Prints "I love ${apple}"
```

## Multi-line strings

Before introducing template literal feature, JavaScript provided 3 ways of defining multi-line strings:

* Escaping newlines
* Concatenating strings
* Creating an array of strings

```javascript
// Escaping newlines
"I am \
multi-line \
string";

// Concatenating strings
"I am " +
"multi-line " +
"string";

// Array of strings
[
  "I am ",
  "multi-line ",
  "string"
].join('');
```

Those ways look ugly and contain some unnecessary markup. They can easily be rewrited using template literals:

```javascript
`I am 
multi-line
string`;
```