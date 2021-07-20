---
title: Replace All String Occurrences In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/replace-all-occurrences0in-javascript.jpg
teaser: Replacing all occurrences of a string is a pretty common task in
  JavaScript. I would not believe you, if you told that you have never written a
  code to replace underscores with dashes or vice-verca. There are a few ways of
  doing that...
date: 2021-07-22T14:58:21.602Z
---
Replacing all occurrences of a string is a pretty common task in JavaScript.

I would not believe you, if you told that you have never written a code to replace underscores with dashes or vice-versa.

There are a few ways of doing that in JavaScript and today we will learn them all.

## Combination Of: split() And join()

One of the most popular, however, not obvious methods is a combination of:

* **split(separator)** method, which splits a string into an array of substrings using **separator**:

```javascript
const str = "Hello_world_I_am_front_end_developer";
const arr = str.split("_");

// ["Hello", "world", "I", "am", "front", "end", "developer"]
console.log(arr);
```

* **join(separator)** method, which converts array elements into a string using **separator**:

```javascript
const arr = ["Hello", "world", "I", "am", "front", "end", "developer"]
const str = arr.join("-");

// "Hello-world-I-am-front-end-developer"
console.log(str);
```

Let's combine the two methods above and create a function named **replaceAll**, which will look for a **search** in a **string** and replace it with the **replace** value:

```javascript
const replaceAll = (string, search, replace) => {
  return string.split(search).join(replace);
};

const str = "Hello_world_I_am_front_end_developer";

// "Hello-world-I-am-front-end-developer"
console.log(replaceAll(str, "_", "-"));
```

While this method is fine, there are better alternatives, let's take a look at them.

## Method: replace()

## Method: replaceAll()

## Summary