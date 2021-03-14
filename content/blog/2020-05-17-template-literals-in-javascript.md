---
title: Template Literals In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: In JavaScript, there are 3 ways of defining a string and one of
  them is using template literals. Template literals are string literals that
  allow embedding an expression.
teaser: Template literals are string literals that allow embedding an
  expression. It is possible to use string interpolation and multi-line string
  features with them. In JavaScript, there are 3 ways of defining a string...
date: 2020-05-17T16:00:02.738Z
---
Template literals are string literals that allow embedding an expression. It is possible to use string interpolation and multi-line string features with them.

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

You are probably familiar with those 2 at the top but have you seen string in backticks ``` `` ``` before?

## Template Literals

Template literals are enclosed by the backticks ``` `` ```.

They can contain placeholders, which are enclosed by the dollar sign along with curly braces `${...}`.

The expressions, that are passed as placeholders are evaluated during the run-time and their result is inserted into the string.

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

## Escaping Placeholders

In the template strings, placeholder expressions have special meanings, so it's not possible to use the following pattern without escaping `` `I love ${apple}` ``.

Let's try:

```javascript
// ReferenceError: apple is not defined
const string = `I love ${apple}`;
```

In order to tell the interpreter to skip `${apple}` evaluation, you should use a backslash before the placeholder, like this: `\${apple}`:

```javascript
const string = `I love \${apple}`;

console.log(string); // Prints "I love ${apple}"
```

## Multi-Line Strings

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

Those ways look ugly and contain some unnecessary markup. They can easily be rewritten using template literals:

```javascript
`I am 
multi-line
string`;
```

## Nesting Placeholders

Nesting placeholders sometimes is the best and easiest method to get things done. 

You are allowed to use single/double quotes or backticks inside of the placeholder:

```javascript
const number10 = 10;
const number20 = 20;

const showNumber10 = true;
const showNumber20 = false;

const string = `
  The result is: ${showNumber10 ? number10 : showNumber20 ? number20 : ``}
`;

console.log(string); // Prints: "The result is 10"
```

## Tagged Templates

Tagged templates is a more advanced form of template literals.

Tags allow you to parse template literals with a function. The first argument of a tag function contains an array of string values. The remaining arguments are related to the expressions.

The tag function executes provided logic on the passed string and returns manipulated string:

```javascript
const age = 18;

function cookieCounter(strings, personExp, ageExp) {
  /*
    These variables won't be used later on
    They are present to show how you can access the input
  */
  const str0 = strings[0]; // "The person is "
  const str1 = strings[1]; // " years old"

  let cookiesNumber = 0;
  if (age >= 18){
    cookiesNumber = 5;
  }

  return `Allowed number of cookies: ${cookiesNumber}`;
};

const result = cookieCounter`The person is ${age} years old`;

console.log(result); // Prints "Allowed number of cookies: 5"
```

**Important note:** the first argument `strings` in the function above contains `raw` method which can be used to access raw input string:

```javascript
const age = 18;

function cookieCounter(strings, personExp, ageExp) {
  // Prints ["The person is ", " years old"]
  console.log(strings.raw);
};

cookieCounter`The person is ${age} years old`;
```

## Summary

Template literals allow us to put values inside of a string in a very readable and concise way and allow a clumsy concatenation approach.

* Template literal is wrapped by backticks ``` `` ``` 
* Template literal can be given a value by putting it into the placeholder `${...}` 
* Placeholder can be escaped by using backslash `\${apple}`
* Template literals are great to create a multi-line string
* Template literals can be nested
* Template literals can be tagged