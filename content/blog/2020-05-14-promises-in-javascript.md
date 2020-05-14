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

## Promise `finally`

There is one more promise consumer - `finally`. This method is used to execute the code once the promise is settled, no matter if it was resolved or rejected. 

It can be very useful when you have to clean up the resources no matter what the outcome is:

```javascript
const promise = new Promise((resolve, reject) => { 
  // Your code
});

promise
  .then(result => {
    // handle success
  })
  .catch(error => {
    // Handle error
  })
  .finally(() => {
    // Clean up the resources
  });
```

You can also achieve the same result without using `finally` method, but then you have to deal with the code duplication:

```javascript
const promise = new Promise((resolve, reject) => { 
  // Your code
});

promise
  .then(result => {
    // handle success
    // Clean up the resources
  })
  .catch(error => {
    // Handle error
    // Clean up the resources
  });
```

## Chaining promises

Each of those methods: `then`, `catch`, `finally` returns a newly generated promise, which means that it can be chained:

```javascript
const promise = new Promise((resolve, reject) => { 
  const numbers = [1, 2, 3, 5, 8];
  if(numbers.includes(8)) {
    resolve(8);
  }
  reject("No 8 found")
});

promise
  .then(result => result / 2)
  .then(result => console.log(result)) // Prints "4"
  .catch(error => console.log(error));
```

## Static methods

#### `Promise.all(iterable)`

Waits for all promises to be resolved, or for any to be rejected. 

If the returned promise resolves, it is resolved with an aggregating array of the values from the resolved promises, in the same order as defined in the iterable of multiple promises.

If it rejects, it is rejected with the reason from the first promise in the iterable that was rejected.

```javascript
const promise1 = new Promise((resolve, reject) => { 
  resolve(1);
});
const promise2 = new Promise((resolve, reject) => { 
  resolve(2);
});
const promise3 = new Promise((resolve, reject) => { 
  resolve(3);
});

Promise.all([promise1, promise2, promise3])
  .then(result => console.log(result)); // Prints "[1, 2, 3]"
```

```javascript
const promise1 = new Promise((resolve, reject) => { 
  resolve(1);
});
const promise2 = new Promise((resolve, reject) => { 
  reject("Error");
});
const promise3 = new Promise((resolve, reject) => { 
  resolve(3);
});

Promise.all([promise1, promise2, promise3])
  .then(result => console.log(result))
  .catch(error => console.log(error)); // Prints "Error"
```

#### `Promise.allSettled(iterable)`

Waits until all promises have settled (each may resolve or reject). 

Returns a promise that resolves after all of the given promises have either resolved or rejected, with an array of objects that each describe the outcome of each promise.

```javascript
const promise1 = new Promise((resolve, reject) => { 
  resolve(1);
});
const promise2 = new Promise((resolve, reject) => { 
  reject("Error");
});
const promise3 = new Promise((resolve, reject) => { 
  resolve(3);
});

Promise.allSettled([promise1, promise2, promise3])
  /*
    Prints:
    [
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 'Error' },
      { status: 'fulfilled', value: 3 }
    ]
  */
  .then(result => console.log(result));
```

#### `Promise.race(iterable)`

Waits until any of the promises is resolved or rejected. 

If the returned promise resolves, it is resolved with the value of the first promise in the iterable that resolved. 

If it rejects, it is rejected with the reason from the first promise that was rejected.

```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve(1);
});
const promise2 = new Promise((resolve, reject) => { 
  reject("Error");
});
const promise3 = new Promise((resolve, reject) => { 
  resolve(3);
});

Promise.race([promise1, promise2, promise3])
  .then(result => console.log(result)) // Prints "1"
  .catch(error => console.log(error));
```

```javascript
const promise1 = new Promise((resolve, reject) => {
  reject("Error");
});
const promise2 = new Promise((resolve, reject) => { 
  resolve(2);
});
const promise3 = new Promise((resolve, reject) => { 
  resolve(3);
});

Promise.race([promise1, promise2, promise3])
  .then(result => console.log(result))
  .catch(error => console.log(error)); // Prints "Error"
```

#### `Promise.resolve(value)`

Returns a new Promise object that is resolved with the given value.

If the value is a thenable (i.e. has a `then` method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise the returned promise will be fulfilled with the value. 

Generally, if you don't know if a value is a promise or not, `Promise.resolve(value)` it instead and work with the return value as a promise.

```javascript
const promise1 = new Promise((resolve, reject) => {
  resolve(1);
});

promise1.then(result => console.log(result)); // Prints "1"
```

#### `Promise.reject(reason)`

Returns a new Promise object that is rejected with the given reason.

```javascript
const promise1 = new Promise((resolve, reject) => {
  reject("Error");
});

promise1.catch(error => console.log(error)); // Prints "Error"
```

## Callback hell

Do you remember that promises were designed in order to avoid using callbacks to handle asynchronous operations? 

That's true, but it does not mean that you can't experience the same callback hell using promises.

Real-world example:

```javascript
fetchUser()
  .then(user => 
    fetchSettings(user.id)
      .then(settings => 
        fetchStatistics(settings.showStatistics)
          .then(statistics => console.log(statistics));
      );
  );
```

In the example above we fetch user, then after fetch is successfully completed, we fetch settings, after settings fetched we get the statistics and so on.

The code gets messy due to a lot of nesting.

Imagine you have to handle errors here. Not pretty obvious how to do that properly.

`async/await` to rescue. It is another alternative for consuming promises, which makes asynchronous code look and behave more like synchronous code.

But that's the topic for the next article.