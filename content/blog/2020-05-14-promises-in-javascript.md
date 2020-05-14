---
title: Promises in JavaScript
date: 2020-05-14T16:35:15.640Z
---
Promise - it is an object that produces some value in the future. This object represents the result of an asynchronous operation.

Promise has 3 states:

* **pending** - the initial state of the promise
* **fulfilled** - represents successful operation
* **rejected** - represents failed operation

Once a promise has been fulfilled or rejected, it is immutable which means it can't be changed.

## Motivation

In JavaScript, **callback functions** were initially used to handle asynchronous operations. However, managing callbacks tends to be tricky when you want to do some complex operations and you may end up in a callback hell. That's what is solved by promises.

## How to create a promise?

Promise is created using a constructor that takes a callback function with 2 arguments:

```javascript
const promise = new Promise((resolve, reject) => {
  // Your code
});
```

In the function body, we write some logic that if being executed successfully, results in resolving a promise. 

If something has failed, promise is rejected.