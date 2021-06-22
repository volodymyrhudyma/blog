---
title: Check For Palindrome In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/palindrome-in-javascript.jpg
teaser: There are a lot of basic problems that have elegant solutions in
  JavaScript and one of them is checking for Palindromes. Palindrome is a word,
  number, phrase, or other sequence of characters which reads the same backward
  as forward, for example...
date: 2021-06-23T08:21:31.125Z
---
There are a lot of basic problems that have elegant solutions in JavaScript and one of them is checking for Palindromes.

**Palindrome** is a word, number, phrase, or other sequence of characters which reads the same backward as forward, for example: civic, race car, 123321, etc.

Today we will learn two ways - the first one that uses built-in JavaScript functions, but is a bit slow, the second one uses for loop and performs way more better.

## Prerequisites

Before proceeding to the implementation, we need to know how to remove all non-alphanumeric characters, so if we would check the following string "A man, a plan, a canal. Panama" - our function returns true.

The easiest ways to achieve this is to use [Regular Expressions](/2020-05-10-regular-expressions-in-javascript/):

* **\[\W_]** - to find any non-word characters
* **[^0-9a-z]** - equivalent to the above expression

  Matches numbers from 0-9 range, letters from A-Z and a-z and some special characters (underscore is included).

```javascript
const REGEX_1 = /[\W_]/g;
const REGEX_2 = /[^0-9a-z]/g;

console.log("__civic_".replace(REGEX_1, ""); // "civic"
console.log("__civic_".replace(REGEX_2, ""); // "civic"

```

As we can see, both Regular Expressions work perfectly fine.

## Way #1

```javascript
const isPalindrome = str => {
  const REGEX = /[\W_]/g;
  const lowRegStr = str.toLowerCase().replace(REGEX, '');
  const reverseStr = lowRegStr.split('').reverse().join(''); 
  return reverseStr === lowRegStr;
};

isPalindrome("I am not a palindrome"); // false
isPalindrome("Civic"); // true
isPalindrome("Race car"); // true 
```

#### Performance

Performance

## Way #2

```javascript
const isPalindrome = str => {
 const REGEX = /[\W_]/g;
 const newString = str.toLowerCase().replace(REGEX, '');
 const length = newString.length;
 for (var i = 0; i < Math.floor(length / 2); i++) {
   if (newString[i] !== newString[length - 1 - i]) {
       return false;
   }
 }
 return true;
};

isPalindrome("I am not a palindrome"); // false
isPalindrome("Civic"); // true
isPalindrome("Race car"); // true 
```

#### Performance

Performance

## Summary

Summary