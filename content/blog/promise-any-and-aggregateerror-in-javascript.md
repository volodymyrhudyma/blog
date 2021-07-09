---
title: Promise.any() And AggregateError In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: "Learn two new additions to JavaScript: Promise.any(), which
  waits for one Promise to fulfill and AggregateError, which groups together
  individual errors."
shareImage: /img/promise-any-aggregate-error.jpg
teaser: Nowadays, due to increasing the popularity of asynchronous programming,
  Promises became an essential part of software engineer's daily routine.
  Promise is an object that produces some value in the future, which represents
  the result of an asynchronous operation. It has 3 states...
date: 2021-07-10T12:44:20.171Z
---
Nowadays, due to increasing the popularity of asynchronous programming, Promises became an essential part of software engineer's daily routine.

Promise is an object that produces some value in the future, which represents the result of an asynchronous operation.

It has 3 states: **pending** - the initial state of a Promise, **fulfilled** - represents successful an operation, and **rejected** - represents failed operation.

Once a promise has been fulfilled or rejected, it is immutable, which means it can't be changed.

## Static Methods

Until recently, there were only a few built-in static methods available for a Promise object: **all**, **allSettled**, **race**, **reject** and **resolve**.

To learn more about them, please refer to [this article](/2020-05-14-promises-in-javascript/).

Now, after ES2021 has been approved and released in June 2021, there is a new static method available - **any**.

## Promise.any()

**Promise.any()** takes an iterable (e.g. Array) of Promise objects and waits until one of them fulfills. As soon as it happens - it instantly returns a single Promise that resolves with a value from that fulfilled Promise.

If no Promises fulfill (all of them are rejected), then the returned Promise rejects with the new type of an Error - **AggregateError** (we will learn it later on).

If you are familiar with the **Promise.all()** method, then you might have guessed that **Promise.any()** is an opposite to it.

For now we are done with a theory, let's make it to the practice.

#### All Promises Resolve Sequentially

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

Promise.any([promise1, promise2, promise3])
  .then(result => console.log(result)); // Prints "1"
```

A pending Promise is returned as soon as any of the passed Promises (**promise1**, **promise2** and **promise3**) fulfills.

The returned pending Promise resolves with a value from a previously fulfilled Promise (in our case the returned value is **1**, because **promise1** was the quickest to resolve).

#### The Last Promise Resolves First

In the world of asynchronous programming it may happen that the last Promise resolves first:

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 300);
});
const promise2 = new Promise((resolve, reject) => { 
  setTimeout(() => {
    resolve(2);
  }, 200);
});
const promise3 = new Promise((resolve, reject) => { 
  setTimeout(() => {
    resolve(3);
  }, 100);
});

Promise.any([promise1, promise2, promise3])
  .then(result => console.log(result)); // Prints "3"
```

The last Promise (**promise3**) if the fastest to resolve, therefore we get its value (**3**).

#### One Of The Promises Rejects

Nothing is perfect, and sometimes for various reasons, our asynchronous operations fail:

```javascript
const promise1 = new Promise((resolve, reject) => {
  reject("Something went wrong");
});
const promise2 = new Promise((resolve, reject) => { 
  reject("Something went wrong");
});
const promise3 = new Promise((resolve, reject) => { 
  resolve(3);
});

Promise.any([promise1, promise2, promise3])
  .then(result => console.log(result)); // Prints "3"
```

The first two Promises rejected (if they were API calls, we may assume that the server has responded with an error code), but the third one resolved, so we get the value of the resolved Promise (**3**). 

#### All Promises Reject

In the worst case, all Promises may fail and we should handle this as well:

```javascript
const promise1 = new Promise((resolve, reject) => {
  reject("Something went wrong");
});
const promise2 = new Promise((resolve, reject) => { 
  reject("Something went wrong");
});
const promise3 = new Promise((resolve, reject) => { 
  reject("Something went wrong");
});

Promise.any([promise1, promise2, promise3])
  .catch(error => console.log(error)); // Error: "All promises were rejected"
```

If all of the passed Promises fail, an **Aggregate Error** is returned.

#### No Promises Passed

If no Promises passed to the **Promise.any()** method, then we receive an asynchronously rejected Promise:  

```javascript
Promise.any([])
  .catch(error => console.log(error)); // Error: "All promises were rejected"
```

## Short Circuit

The **Promise.any()** method short-circuits after the first resolved Promise, which means that it does not wait for any more Promises to complete.

It is extremely useful if we want to receive only one value and don't care which one will it be.

As we already mentioned, this method is an opposite to **Promise.all()**, which waits for all passed Promises to complete.

## Promise.any() vs. Promise.race()

You may know about the **Promise.race()** method, that acts in a very similar way, but with a slight difference - it returns the first **settled** value (either fulfilled or rejected).

Our **Promise.any()** method returns the first **fulfilled** value and ignores all rejections.

#### An Example Of Promise.race()

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
  .catch(error => console.log(error)); // Prints "Error"
```

#### An Example Of Promise.any()

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

Promise.any([promise1, promise2, promise3])
  .then(result => console.log(result)); // Prints "2"
```

## AggregateError

In this article we have mentioned a few times this new type of an Error - **AggregateError**.

Like **Promise.any()**, this is also a new addition to JavaScript, and it is a new subclass of an Error that groups together individual errors.

It is thrown when multiple errors occurred within a single operation (e.g when all Promises passed to **Promise.any()** reject).

It contains two Instance Properties:

* **name** - the name of an Error, defaults to AggregateError
* **message** - the message of an Error, defaults to an empty string ("")

#### Catch An AggregateError

```javascript
const promise1 = new Promise((resolve, reject) => {
  reject("Something went wrong");
});

Promise.any([promise1])
  .catch(error => {
    console.log(error instanceof AggregateError); // "true"
    console.log(error.message);                   // "All Promises rejected"
    console.log(error.name);                      // "AggregateError"
    console.log(error.errors);                    // [ Error: "Something went wrong" ]
  });
```

#### Create An AggregateError

```javascript
try {
  throw new AggregateError([
    new Error("Something went wrong1"),
    new Error("Something went wrong2")
  ], "MyErrorName");
} catch (e) {
  console.log(e instanceof AggregateError); // "true"
  console.log(e.message);                   // "MyErrorName"
  console.log(e.name);                      // "AggregateError"
  console.log(e.errors);                    // [ Error: "Something went wrong" ]
}
```

## Browser Compatibility

Since both of these features are pretty fresh, we need to make sure that they are supported by the most popular browsers.

#### Promise.any()

According to [caniuse.com](https://caniuse.com/?search=promise.any), it is available for slightly more than 85% of the users as of 10.07.2021.

![Promise.any() Browser Compatibility](/img/screenshot-2021-07-09-at-16.13.11.png "Promise.any() Browser Compatibility")

#### AggregateError

According to [](https://caniuse.com/?search=promise.any)[caniuse.com](https://caniuse.com/?search=aggregateerror), it is available for slightly more than 85% of the users as of 10.07.2021, so the browser support is pretty similar to the support of **Promise.any()** method.

![AggregateError Browser Compatibility](/img/screenshot-2021-07-09-at-16.14.04.png "AggregateError Browser Compatibility")

It is worth mentioning that both features don't work in **IE11**, **Opera**, **Opera Mobile** and **Samsung Internet**.

However, there is an available polyfill in [](https://github.com/zloirock/core-js#ecmascript-promise)[core-js](https://github.com/zloirock/core-js#ecmascript-promise).

## Summary

In this article, we learned two useful features ES2021 brings to the table: **Promise.any()** and **AggregateError**.

Make sure to understand them and use whenever needed, in some cases they can make your developer's life easier and code cleaner.