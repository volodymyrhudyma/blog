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

**Important note:** to access the content of capturing group use dollar sign with the group number. Group numbers start with 1. In the example above we reference to the first captured group with `$1`.

## Example #2

Capturing groups are really helpful when it's necessary to swap some words/expressions. Consider the following example:

```javascript
const string = `Andrew, John`;

const pattern = /(\w+),\s(\w+)/;

string.replace(pattern, '$2, $1'); // Prints "John, Andrew"
```

Note, how we have an access to the first group using `$1` and to the second `$2` and how easy it is to swap their positions.