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

* Use a Regular Expression
* Using built-in HTML5 email validation
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

It works as expected for the email addresses mentioned earlier in this article.

## Built-In HTML5 Validation

The simplest way to validate an email address in JavaScript is to use a built-in HTML5 validation.

All you have to do is to use an **email** as the **type** of an **input** field:

```html
<form>
  <input type="email" placeholder="Email Address">
  <input type="submit" value="Submit">
</form>
```

The user will see a warning message when trying to input wrong email address:

![HTML5 built-in email validation warning](/img/screenshot-2021-08-08-at-17.19.06.png "HTML5 built-in email validation warning")

Browsers, that support **type="email"**, implement the algorithm, equal to the following Regular Expression, according to the [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#basic_validation):

```javascript
/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
```

If you need any further restrictions for the email address, like allowing emails only from the specific domain, you can use **pattern** HTML5 attribute:

```html
<form>
  <input type="email" pattern=".+@gmail\.com" placeholder="Email Address">
  <input type="submit" value="Submit">
</form>
```

Now, even though the following email: **johndoe@yahoo.com** is totally fine, we are given an error message, because only **gmail.com** is allowed:

![HTML5 built-in email pattern validation warning](/img/screenshot-2021-08-08-at-17.25.51.png "HTML5 built-in email pattern validation warning")

## Third-Party Library

Finally, the most reliable way of performing an email validation in JavaScript - is using an external library, which is proved to be working for hundreds of thousands of other developers.

In some of my projects I have been using [email-validator](https://www.npmjs.com/package/email-validator), which is popular, even though is most likely not maintained (the last publish was 3 years ago):

```javascript
import validator from "email-validator";

validator.validate("johndoe@gmail.com"); // true
```

You can visit the Github page of the library, open [index.js](https://github.com/manishsaraan/email-validator/blob/master/index.js) file and check what Regular Expression is used under the hood.

There are many more alternatives in the NPM registry, just go and search for a suitable one.

## Summary