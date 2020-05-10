---
title: Regular expressions in JavaScript
date: 2020-05-10T11:01:06.424Z
---
Regular expression is a sequence of characters that define search pattern that is used to search an occurrences in text and/or replace them. JavaScript has built-in regex support.

## How to create regex?

In JavaScript, there are 2 ways of defining regex: using `RegExp` constructor or literal notation:

```javascript
// Literal notation
/abc/i;
new RegExp(/abc/, i);

// Constructor
new RegExp('abc', 'i');
```

In the above example `i` is the flag.

Flags allow us to affect the search by defining how the search should behave. We'll cover this topic later on.

## Literal notation vs constructor

**Literal notation** results in compilation of the regular expression when the expression is evaluated. 

Use literal notation when the regular expression will remain constant. 

Example: if you use literal notation to construct a regular expression used in a loop, the regular expression won't be recompiled on each iteration.

**Constructor** of the regular expression object results in runtime compilation of the regular expression. 

Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

## Flags

**Important note:** flags are optional, if provided they can be combined.

As we already mentioned, flags affect the search. Let's see how by learning the most used of them:

* `g` - looks for all matches, not only for the first one (default behavior if this flag is not provided)
* `i` - makes the search case-insensitive (default behavior is case-sensitive)

Assume that we have the following string `abcabcabc` and this regex: `/abc/`. Let's see what will be matched using the flags above:

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