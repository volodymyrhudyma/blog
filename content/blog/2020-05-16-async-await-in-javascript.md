---
title: async/await in JavaScript
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

```