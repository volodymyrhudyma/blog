---
title: Capturing groups in regular expressions
date: 2020-05-12T16:21:57.902Z
---
So far, we have learnt how to define with regular expressions in order to check if the string contains specific pattern. 

But what if we don't only need to check it, but to get the part of a match?

You can easily do so by using so called **capturing groups**.

## How to create capturing group?

Capturing group can be created by using parentheses `()`. 

## Example #1

Imagine the following situation: you develop a project using font sizes in `em` units. Some requirements change and you have to use `rem` instead.

If the project has a lot of css code, replacing font size units manually probably would take the whole day. Too long, huh?

Capturing groups to rescue:

```javascript
const code = `
  body {
    font-size: 1.6em;
  }
  h1 {
    font-size: 3.2em;
  }
  h2 {
    font-size: 2.8em;
  }
  h3 {
    font-size: 2.4em;
  }
`;

const pattern = /(\d)em/g;

code.replace(pattern, '$1rem'); // Result: each em is relpaced with rem
```

**Important note:** to access the content of capturing group use dollar sign with the group number. Group numbers start with 1. In the example above we reference to the first captured group with `$1`. Groups are numbered from left to right.

## Example #2

Capturing groups are really helpful when it's necessary to swap some words/expressions. Consider the following example:

```javascript
const string = `Andrew, John`;

const pattern = /(\w+),\s(\w+)/;

string.replace(pattern, '$2, $1'); // Prints "John, Andrew"
```

Note, how we have an access to the first group using `$1` and to the second `$2` and how easy it is to swap their positions.

## Nested capturing groups

Capturing groups can be nested. As for not nested capturing groups, numbering also goes from left to right.

## Example #1

Assume you are given a task to search for `<div class="example" />` and get the tag name and tag attributes (class in our example):

```javascript
const str = '<div class="example" />';

const regexp = /<(([a-z]+)\s*([^>]*))>/;

const result = str.match(regexp);

console.log(result[0]); // Prints <div class="example">
console.log(result[1]); // Prints div class="example", (([a-z]+)\s*([^>]*)) group
console.log(result[2]); // Prints "div", ([a-z]+) group
console.log(result[3]); // Prints class="example", ([^>]*)) group
```

Note that `0` index always holds the full match, capturing groups are numbered from left to right.

The first group returned as `result[1]` encloses the whole tag content, second: `result[2]` holds tag name and the third one: `result[3]` - class attribute.