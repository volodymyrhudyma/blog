---
title: Check For Palindrome In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn Two Ways to check for Palindrome in JavaScript, measure
  their performance, and find the most optimal one for smaller and larger
  strings.
shareImage: /img/palindrome-in-javascript.jpg
teaser: There are a lot of basic problems that have elegant solutions in
  JavaScript and one of them is checking for Palindromes. Palindrome is a word,
  number, phrase, or other string that reads the same backward as it does
  forward, for example...
date: 2021-06-23T08:21:31.125Z
---
There are a lot of basic problems that have elegant solutions in JavaScript and one of them is checking for Palindromes.

**Palindrome** is a word, number, phrase, or other string that reads the same backward as it does forward, for example: civic, race car, 123321, etc.

Today we'll learn two ways - the first, which uses built-in JavaScript functions but is a bit slow, and the second, which uses a for loop and performs much better.

## Prerequisites

Before we proceed with the implementation, we need to know how to remove all non-alphanumeric characters, so if we check the following string "A man, a plan, a canal. Panama" - our function returns true.

The easiest way to do this is to use [Regular Expressions](/2020-05-10-regular-expressions-in-javascript/):

* **\[\W_]** - to find all non-word characters
* **[^0-9a-z]** - equivalent to the expression above

  Matches numbers from the range 0-9, letters from A-Z and a-z and some special characters (underscore is included).

```javascript
const REGEX_1 = /[\W_]/g;
const REGEX_2 = /[^0-9a-z]/g;

console.log("_civic_".replace(REGEX_1, ""); // "civic"
console.log("_civic_".replace(REGEX_2, ""); // "civic"
```

As we can see, both Regular Expressions work perfectly fine.

## Way #1

In the following implementation we:

* Convert passed value to lowercase (**\_Civic\_** -> **\_civic\_**)
* Replace all non-alphanumeric characters with an empty string (**\_civic\_** -> **civic**)
* Split value into an array of strings, reverse them and convert back to a string (**civic** -> **\["c", "i", "v", "i", "c"]** -> **\["c", "i", "v", "i", "c"]** -> **civic**)
* Check if the original value (converted to lowercase and without non-alphanumeric characters) matches the inverse and return the comparison result (**civic** === **civic**)

```javascript
const isPalindrome = value => {
  const REGEX = /[\W_]/g;
  const cleanValue = value.toLowerCase().replace(REGEX, "");
  const reverseValue = cleanValue.split("").reverse().join(""); 
  return cleanValue === reverseValue;
};

isPalindrome("I am not a palindrome"); // false
isPalindrome("_Civic_"); // true
isPalindrome("Race car"); // true 
```

## Way #2

In the following implementation we:

* Convert passed value to lowercase (**\_Civic\_** -> **\_civic\_**)
* Replace all non-alphanumeric characters with an empty string (**\_civic\_** -> **civic**)
* Get the length of a clean lowercase string (**civic** -> **5**)
* Loop halfway through the length of a value and check if characters from the beginning and end match

  **Math.floor(5 / 2)** is **2**, so the iterations are:

  1-st: **i = 0**, **cleanValue\[0] = c**, **cleanValue\[5 - 1 - 0] = c**, match

  2-nd: **i = 1**, **cleanValue\[1] = i**, **cleanValue\[5 - 1 - 1] = i**, match
* If they do not match - return false, otherwise - true

```javascript
const isPalindrome = value => {
 const REGEX = /[\W_]/g;
 const cleanValue = value.toLowerCase().replace(REGEX, "");
 const { length } = cleanValue;
 for (let i = 0; i < Math.floor(length / 2); i++) {
   if (cleanValue[i] !== cleanValue[length - 1 - i]) {
     return false;
   }
 }
 return true;
};

isPalindrome("I am not a palindrome"); // false
isPalindrome("_Civic_"); // true
isPalindrome("Race car"); // true 
```

## Performance

If we measure performance for both implementations, we will see some significant differences, not only for larger values, but also for smaller ones.

The case of a simple "\_Civic\_" value:

```javascript
// Way #1 (average from 5 runs)
0.0100000761449337 ms

// Way #2 (average from 5 runs)
0.00500003807246685 ms

// Difference
2 times
```

The case of a large value (length is equal to 500 000):

```javascript
// Way #1 (average from 5 runs)
28.234999859705567 ms

// Way #2 (average from 5 runs)
7.844999898225069 ms

// Difference
3.6 times
```

Obviously, the first way, which is cleaner and easier to read, is a few times slower than the second way with a loop, especially when working with larger strings.

## Summary

In this article, we learned about two ways to check for palindromes in JavaScript, measured their performance, and found the most optimal way. 

There are far more possible implementations, but knowing these two basic ones is a good start to being able to successfully answer this question in an interview.