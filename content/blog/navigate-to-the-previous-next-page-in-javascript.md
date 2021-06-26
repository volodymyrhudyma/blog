---
title: Navigate To The Previous/Next Page in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-06-27T08:03:36.170Z
---
Redirecting users from one page to another is a very common in web applications. 

In most cases, we know exactly on what page users should land after clicking a link, but sometimes we don't.

Imagine implementing a profile page that is accessible both, from the page A and page B.

If it contained a button that should redirect to the previous page, it is hard to find out what page users came from, so we just need a way to tell the browser: "Hey, I don't know what page did they come from, so just redirect them one step back" without specifying the redirect path.

## History API