---
title: How To Validate An Email Address In JavaScript?
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/validate-email-address-in-javascript.jpg
teaser: Web applications should block a possibility of inputting wrong data,
  especially when it comes to such an important information, like email address.
  Validating email address is a must for all websites, not only to prevent fake
  data to be...
date: 2021-08-09T13:48:16.000Z
---
Web applications should block a possibility of inputting wrong data, especially when it comes to such an important information, like email address.

Validating email address is a must for all websites, not only to prevent fake data to be sent to the server, but to improve the overall User Experience.

It is very easy to make an unintentional mistake and spend a few hours waiting for a confirmation email, which is never going to be sent to the correct address.

Of course, we can't prevent all mistakes, like doing a typo in the email prefix, but we can try our best to make sure that the the prefix does not contain any weird characters, format and email domain are correct.

But before we learn how to validate an email address in JavaScript - let's have a quick overview of the structure of email address and see a few examples of correct and wrong addresses.

## Email Address Structure

Email is a subset of ASCII characters, divided by two parts using the @ symbol.

The first part (email prefix) contains private information, while the second part (email domain) contains the domain name given email was registered in:

`<prefix>@<domain>`

Both parts have some criteria that need to be met for the email address to be considered valid.

#### Email Prefix Limitations

Email prefix should contain:

* Letters and numbers: **A-Z**, **a-z**, **0-9**
* Special characters: **!**, **\#**, **$**, **%**, **&**, **'**, **\***, **+**, **\-**, **/**, **\=**, **?**, **^**, **_**, **`**, **{**, **\|**
* Length up to 64 characters

**Important note**: special characters can't appear as the first or the last character in email prefix.

#### Email Domain Limitations

Email domain consists of a domain name and a top-level domain (**.com**, **.net**, **.org**) and should contain:

* Letters and numbers: **A-Z**, **a-z**, **0-9**
* Hyphen (**\-**) or period (**.**)
* Length up to 255 characters

#### Example Email Addresses

After learning the rules we can identify whether an email address is correct or wrong.

Correct email addresses:

* **johndoe@gmail.com**
* **john-doe@yahoo.com**
* **john-doe%123%@mailbox.org**

Wrong email addresses:

* **johndoegmail.com** - doesn't contain @ character
* **johndoe@.com** - missing domain name
* **johndoe@gmail** - missing top-level domain

So, let's begin with writing code that will validate an email address based on the above set of rules and output an information whether given email address is correct or not.

## Ways To Validate Email Address

It is important to mention that we will create a function that will check only whether an email address is of a proper format.

This function will not check if the given email address exists and if we can deliver messages to it.

There are a few ways yo validate an email address in JavaScript:

* Use a Regular Expression (*The preferred way*)
* Using built-in HTML email validation
* Using a third-party library

Each of those ways have its own advantages and disadvantages, which we will talk about later.

## Regular Expression

The most common and preferred way to validate an email address in JavaScript is to use a Regular Expression.

Unfortunately, there is no general pattern for that can be used to validate 100% of emails.

Every developer either has its own saved one, found in the Internet.

I am typically using the following one, which is pretended to be working for more than 99% of emails:

```javascript
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

Note that you don't need to memoize or understand the whole pattern, just save it somewhere for a future use.

Let's create a function that uses mentioned pattern:

```javascript
const isEmailValid = value => {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
  return pattern.test(value.toLowerCase());
};
```

In the above example, we check if passed **value** matches given **pattern** and return the boolean result.

Let's test our function:

```javascript
console.log(isEmailValid("johndoe@gmail.com")); // true
console.log(isEmailValid("john-doe@yahoo.com")); // true
console.log(isEmailValid("john-doe%123%@mailbox.org")); // true

console.log(isEmailValid("johndoegmail.com")); // false
console.log(isEmailValid("johndoe@.com")); // false
console.log(isEmailValid("johndoe@gmail")); // false
```

## Built-In HTML Validation

## Third-Party Library

## Summary