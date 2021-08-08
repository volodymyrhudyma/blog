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