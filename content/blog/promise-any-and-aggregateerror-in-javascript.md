---
title: Promise.any And AggregateError In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-07-10T12:44:20.171Z
---
Nowadays, due to increasing the popularity of asynchronous programming, Promises became an essential part of software engineer's daily routine.

Promise is an object that produces some value in the future, which represents the result of an asynchronous operation.

It has 3 states:

* **pending** - the initial state of the promise
* **fulfilled** - represents successful operation
* **rejected** - represents failed operation

Once a promise has been fulfilled or rejected, it is immutable, which means it can't be changed.