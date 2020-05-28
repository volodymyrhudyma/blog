---
title: async/await in JavaScript
teaser: These keywords act as a syntactic sugar built on top of Promises, making
  asynchronous code look and feel like synchronous, therefore easier to produce
  and maintain. Async function - it's function, declared using...
date: 2020-05-16T08:14:59.458Z
---
These keywords act as a syntactic sugar built on top of Promises, making asynchronous code look and feel like synchronous, therefore easier to produce and maintain.

**Important note:** before proceeding with this article make sure you understand Promises and how to use them. Refer to [this article](/2020-05-14-promises-in-javascript/) if you don't.

## Async function

Async function - it's function, declared using `async` keyword. This function always returns a Promise which will be resolved or rejected and knows how to handle `await` inside of it:

```javascript
const example = async () => 1;

console.log(example()); // Prints "Promise { 1 }"
```

Note, how the returned value is converted into the Promise. So, how do we actually retrieve the value? (By using `then` Promise consumer):

```javascript
const example = async () => 1;

example()
  .then(result => console.log(result)); // Prints "1"
```

## Await keyword

The real benefits of using `async` keyword become apparent when you start combining is with `await`. In fact, `await` is only valid inside of `async` functions, you won't be able to get use of this keyword in regular function,.

The keyword `await` makes JavaScript wait until that Promise settles(either resolves or rejects) and returns its result.

```javascript
const example = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 1000);
  });
  console.log("Before await");
  const result = await promise;
  console.log("After await");
  return result;
};


/* 
  Prints:
    "Before await"
    Promise { <pending> }
    "After await"
    "Success"
*/
example()
  .then(result => console.log(result));
```

**Important note:** The function execution “pauses” at the line (`const result = await promise`) and resumes when the promise settles, with `result` becoming its result.

Let's consider the exact same example, but without using `async/await` keywords:

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success");
    }, 1000);
  });
  console.log("Before await");
  const result = promise;
  console.log("After await");
  return result;
};


/* 
  Prints:
    "Before await"
    "After await"
    Promise { <pending> }
    "Success"
*/
example()
  .then(result => console.log(result));
```

Note, how the order of logging **"Before await"** and **"After await"** has changed.

Have you noticed that something is wrong? Why do we still use `then` when we are talking about `async/await`? 

Actually, there's good reason for that: `await` won’t work in the top-level code, so basically we can't do that (as you remember, `await` has to be used in pair with `async`):

```javascript
const result = await example(); // Bad
```

But it can be wrapped into an anonymous function and executed immediately:

```javascript
(async () => {
  const result = await example(); // Good
})();
```

## Error handling

If the Promise resolves, `await promise` returns the result, if it rejects - an error is thrown:

```javascript
const example = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("Error");
    }, 1000);
  });
  const result = promise;
  return result;
};

example()
  .catch(error => console.log(error)); // Prints "Error"
```

Basically, both following examples are equivalent:

```javascript
const exampleReject = async () => {
  await Promise.reject("Error");
}

const exampleThrow = async () => {
  throw new Error("Error");
}
```

Thrown error can easily be caught by using `try...catch` block:

```javascript
async function example() {
  try {
    let response = await fetch("http://notexistingresource");
  } catch(error) {
    console.log(error);
  }
}

example(); // TypeError: Failed to fetch
```

## The downsides

Async/await is really useful to know about, but there are a couple of downsides to consider.

These keywords make your code to look and behave in synchronous manner. The `await` keyword blocks code execution until the Promise settles, exactly as it would with the synchronous operation.

**Important note:** it does allow other tasks to continue, just you own code is blocked. That doesn’t cost any CPU resources, because the engine can do other jobs in the meantime: execute other scripts, handle events, etc.

In case of having multiple `await` statements, you code execution is slowed down due to waiting for each promise to resolve.

Fortunately, this issue can be resolved by storing each Promise in variable and using `Promise.all` method to wait until all promises complete.

Try to avoid this:

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

(async () => {
  await promise1;
  await promise2;
  await promise3;
})();
```

Use `Promise.all`:

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
  .then(result => console.log(result));
```

## Summary

Async/await is very powerful tool and it strongly helps you to increase the readability of your code.

Things to remember:

* Async/await is just a syntactic sugar for Promises
* Async function always returns Promise
* Await keyword can't be used outside of the `async` function
* Await keyword blocks your code execution until the Promise resolves, however other tasks can be done in the meantime
* Errors can be handled using `try...catch` block
* Always remember not to overuse `await` keyword. Consider using `Promise.all` instead