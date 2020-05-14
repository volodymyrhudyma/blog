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

After resolving, `then` method is called, after rejecting - `catch`:

```javascript
const promise = new Promise((resolve, reject) => { 
  const success = true;
  if(success) { 
    resolve("Success"); 
  } else { 
    reject("Fail"); 
  } 
});

promise
  .then(result => console.log(result)) // Prints "Success"
  .catch(error => console.log(error));
```

```javascript
const promise = new Promise((resolve, reject) => { 
  const success = false;
  if(success) { 
    resolve("Success"); 
  } else { 
    reject("Fail"); 
  } 
});

promise
  .then(result => console.log(result))
  .catch(error => console.log(error)); // Prints "Fail"
```

## Promise consumers

Promises can be consumed by registering the following methods: `then` and `catch`.

#### `then`

For simplicity's sake we are used to say that `then` is fired only in case if promise is resolved. 

But that's not true, `then` is invoked when a promise is either resolved or rejected. It takes 2 functions as an arguments: the first function is executed if promise is resolved, the second one - if rejected:

```javascript
const promise = new Promise((resolve, reject) => { 
  const success = true;
  if(success) { 
    resolve("Success"); 
  } else { 
    reject("Fail"); 
  } 
});

promise
  .then(
    result => console.log(result), // Prints "Success
    error => console.log(error)
  );

```

```javascript
const promise = new Promise((resolve, reject) => { 
  const success = false;
  if(success) { 
    resolve("Success"); 
  } else { 
    reject("Fail"); 
  } 
});

promise
  .then(
    result => console.log(result),
    error => console.log(error) // Prints "Fail"
  );
```

**Important note:** remember, that errors should not be handled in `then` consumer, there is `catch` specifically for this case.

#### `catch`

`catch` is fired if promise is rejected or some error occurred at the execution.

`catch` takes one function as a parameter. This method is just a shorthand for `then(null, errorHandler)`.

```javascript
const promise = new Promise((resolve, reject) => { 
  const success = false;
  if(success) { 
    resolve("Success"); 
  } else { 
    reject("Fail"); 
  } 
});

promise
  .catch(error => console.log(error)); // Prints "Fail"
```