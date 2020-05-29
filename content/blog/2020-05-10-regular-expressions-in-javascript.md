---
title: Regular expressions in JavaScript
teaser: Regular expression is a sequence of characters that define search
  pattern that is used to search an occurrences in text and/or replace them.
  There are 2 ways of defining regex in JavaScript...
date: 2020-05-10T11:01:06.424Z
---
Regular expression is a sequence of characters that define search pattern that is used to search an occurrences in text and/or replace them. JavaScript has built-in regex support.

## How to create regex?

In JavaScript, there are 2 ways of defining regex: using `RegExp` constructor or literal notation:

```javascript
// Literal notation, searches for "abc" occurrence
/abc/i;
new RegExp(/abc/, i);

// Constructor, searches for "abc" occurrence
new RegExp("abc", "i");
```

In the above example `i` is the flag. Flags allow us to affect the search by defining how the search should behave. 

We'll cover this topic later on.

## Literal notation vs constructor

**Literal notation** results in compilation of the regular expression when the expression is evaluated. 

Use literal notation when the regular expression will remain constant. 

**Example**: if you use literal notation to construct a regular expression used in a loop, the regular expression won't be recompiled on each iteration.

**Constructor** of the regular expression object results in runtime compilation of the regular expression. 

Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

## Flags

**Important note:** flags are optional, if provided they can be combined.

As we already mentioned, flags affect the search. Let's see how by learning the most used of them:

* `g` - looks for all matches, not only for the first one (default behavior if this flag is not provided)
* `i` - makes the search case-insensitive (default behavior is case-sensitive)

Assume that we have the following string `abcabcabc`. Let's see what will be matched using the flags above:

```javascript
/abc/ // Matches only the first occurrence of "abc"
/ABC/ // Does not match anything

/abc/g // Matches all 3 occurrences of "abc"
/ABC/g // Does not match anything

/abc/i // Matches only the first occurrence of "abc"
/ABC/i // Matches only the first occurrence of "abc"

/abc/gi // Matches all 3 occurrences of "abc"
/ABC/gi // Matches all 3 occurrences of "abc"
```

## Regex patterns

There are a lot of different regex patterns that can be used. There is no need to remember them all, it's totally fine to refer to the [cheat sheet](https://www.keycdn.com/support/regex-cheatsheet) from time to time.

Let's take a look at the most popular patterns.

#### Meta-characters

Meta-characters are building blocks of regular expressions with a special meaning:

* `\d` - match any digit character `[0-9]`
* `\D` - match any non-digit character `[^0-9]`
* `\w` - match any alphanumeric character plus underscore `[A-Za-z_0-9]`
* `\W` - match any non-alphanumeric character `[^A-Za-z_0-9]`
* `\s` - match any whitespace character: spaces, tabs, newlines and unicode spaces
* `\S` - match any character that is not a whitespace

#### Quantifiers

Quantifiers are symbols that indicate the scope of search string:

* `+` - match the preceding expression 1 or more times
* `*` - match the preceding expression 0 or more times
* `?` - match the preceding expression 0 or 1 time, preceding pattern is optional
* `^` - match the beginning of the string, the regex that follows should be at the start of the test string
* `$` - match the end of the string, the regex that precedes it should be at the end of the test string
* `{N}` - match exactly **N** occurrences of the preceding regex
* `{N,}` - match at least **N** occurrences of the preceding regular expression
* `{N,M}` - Match at least **N** occurrences and at most **M** occurrences of the preceding regex (if **M** > **N**)
* `X|Y` - match either **X** or **Y**

## Regex methods

When testing regex, we use one of the following methods: **Regex.prototype.test(string)** or **Regex.prototype.exec(string)**:

#### `Regex.prototype.test(string)`

This method is used to test if a match has been found or not. It returns `true` if match found, `false` if not:

```javascript
const pattern = /abc/;

pattern.test("It contains abc"); // Prints "true"

pattern.test("Simple text"); // Prints "false"
```

#### `Regex.prototype.exec(string)`

This method is used to return an array of all matches or `null`:

```javascript
const pattern = /abc/;

/* 
Prints:
[
  "abc", 
  index: 12, 
  input: "It contains abc", 
  groups: undefined
] 
*/
console.log(pattern.exec("It contains abc")); 
```

## Examples

It is always important to use something you are learning in practice, so let's take a look at the following cases:

* Match any 9-digit number

```javascript
const pattern = /\d{9}/;

const string = "My phone number is: 123456780, call me tomorrow";

/* 
Prints: 
[
  "123456789", 
  index: 20, 
  input: "My phone number is: 123456789",  
  groups: undefined
] 
*/
console.log(pattern.exec(string));
```

* Match *YYYY-MM-DD* date format

```javascript
const pattern = /\d{4}-\d{2}-\d{2}$/

const string = "It is going to happen on 2020-09-09";

/* 
Prints:
[
  "2020-09-09", 
  index: 25, 
  input: "It is going to happen on 2020-09-09",  
  groups: undefined
] 
*/
console.log(pattern.exec(string));
```

## Capturing groups

But wait, what if we don't only need to check it, but to get the part of a match? Check out the [next article,](/2020-05-12-capturing-groups-in-regular-expressions/) which explains capturing groups in-depth.

## Summary

If you only start learning regular expressions, it can seem like it's very complex topic, but as soon as you dive into it deeper you would have solid understanding of all its principles and you will finally enjoy using them.

**P.S.** You can have fun with regular expressions online, make sure to check out <https://regex101.com/>.