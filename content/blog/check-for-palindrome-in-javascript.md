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