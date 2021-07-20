---
title: Replace All String Occurrences In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: "Learn a few ways to replace all string occurrences in
  JavaScript: replaceAll(), replace() and a combination of split() and join()
  methods."
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

While this method is good, there are better alternatives, let's take a look at them.

## Method: replace()

JavaScript contains built-in **string.replace(regExp/search, value)** method, which takes a [Regular Expression](/2020-05-10-regular-expressions-in-javascript/) or a **search** string as the first argument and the **value** as the second, and replaces occurrences of a Regular Expression in a string with the **value**.

Let's try to use it:

```javascript
const str = "Hello_world_I_am_front_end_developer";

// "Hello-world_I_am_front_end_developer"
console.log(str.replace(/_/, "-")); 
```

Wait, what? The method replaced only one occurrence.

What is we pass a string instead of a Regular Expression?

```javascript
const str = "Hello_world_I_am_front_end_developer";

// "Hello-world_I_am_front_end_developer"
console.log(str.replace("_", "-")); 
```

It worked the same way.

That happened, because, by default, this method replaces only the first occurrence.

To make the method replace all occurrences, we need to add a **g** (global) flag at the end of the Regular Expression literal:

`str.replace(/_/g, "_")`

Let's try once again:

```javascript
const str = "Hello_world_I_am_front_end_developer";

// "Hello-world-I-am-front-end-developer"
console.log(str.replace(/_/g, "-")); 
```

**Important note:** if the first argument of a **replace()** method is a string, it will only replace the first occurrence.

## Method: replaceAll()

A new addition to JavaScript, introduced with ES2021 is a **string.replaceAll(globalRegExp/search, value)** method.

As the name says, it replaces all occurrences of a Global Regular Expression (**globalRegExp**) or **search** argument without the need to provide any additional flags.

Why did we say "Global Regular Expression", not just "Regular Expression"?

That's because if we pass a Regular Expression without the **g** (global) flag, we will receive an error:

```javascript
const str = "Hello_world_I_am_front_end_developer";

// TypeError: String.prototype.replaceAll called with a non-global RegExp argument
console.log(str.replaceAll(/_/, "-")); 
```

But passing Global Regular Expression works fine:

```javascript
const str = "Hello_world_I_am_front_end_developer";

// "Hello-world-I-am-front-end-developer"
console.log(str.replaceAll(/_/g, "-")); 
```

Also, passing a string replaces all occurrences, not only the first one as in case with the **replace()** method:

```javascript
const str = "Hello_world_I_am_front_end_developer";

// "Hello-world-I-am-front-end-developer"
console.log(str.replaceAll("_", "-")); 
```

## Browser Support: replaceAll()

Since we mentioned that this method is a new addition to the JavaScript, let's see if it is supported by the most popular browsers:

![String.replaceAll() Browser Support](/img/screenshot-2021-07-20-at-22.44.45.png "String.replaceAll() Browser Support")

According to [caniuse.com](https://caniuse.com/?search=replaceAll), **string.replaceAll()** method is supported for almost 90% of users, as of 22.07.2021.

One thing worth mentioning is that it requires a [polyfill](https://github.com/es-shims/String.prototype.replaceAll) to work in IE.

## Summary

In this article, we have learned 3 most popular ways to replace all string occurrences in JavaScript:

* Using a combination of a **split()** and **join()** methods
* Using a **string.replace()** method with a Global Regular Expression
* Using a **string.replaceAll()** method with a string or a Global Regular Expression

While all of the above 3 methods are fine, I would definitely recommend the latest one, since this method already landed in the JavaScript with ES2021 and is available for a use.