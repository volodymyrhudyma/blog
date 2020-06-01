---
title: Generators in JavaScript
teaser: Generator function - a special kind of function that can stop midway and
  continue execution from the place where it stopped. This function returns
  generator object, which conforms to both - iterable and iterator protocol...
date: 2020-06-01T13:51:11.139Z
---
Generator function - a special kind of function that can stop midway and continue execution from the place where it stopped. 

This function returns generator object, which conforms to both - iterable and iterator protocol.

For creating a generator function, `function*` syntax is used.

**Important note:** it's not possible to create generator using arrow function.

Inside of the function body we have `yield` keywords which pause the function execution.

Every time a generator encounters this keyword, it returns the value specified after it.

We can also return from a generator. However, `return` keyword finishes the generator:

```javascript
function* exampleGenerator() { 
  yield 1;
};

function* exampleGenerator() { 
  yield 1;
  // The generator finishes at this moment
  return;
  // The following line of code is never accessed
  yield 2;
};
```

## Iterable protocol

This protocol defines the iteration behavior of objects. 

That means, the way an object iterates through it’s items, and also allows us to handle and customize that behavior.

*In order to learn more about it, refer to [this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol).*

## Iterator protocol

This protocol defines a standard way to produce a sequence of values (either finite or infinite), and potentially a return value when all values have been generated.

*In order to learn more about it, refer to [this article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol).*

## Generator object

Generator object can not be instantiated using `new` keyword, it only can be returned from the generator function:

```javascript
function* exampleGenerator() { 
  yield 1;
  yield 2;
  yield 3;
};

const result = exampleGenerator(); 

console.log(result); // Prints "Iterator [Generator] {}"
```

What is the difference between the `exampleGenerator` and the regular function?

Regular function can't be stopped in the middle of execution.

The only ways to exit the function are: to use `return` keyword or `throw` an error:

```javascript
function exampleFunction() { 
  console.log("1");
  console.log("2");
  console.log("3");
  return;
  console.log("4");
};

const result = exampleFunction(); // Prints "1", "2", "3"
```

## Generator methods

Generator object provides us with 3 built-in methods:

* `Generator.prototype.next()` - returns a value yielded by the `yield` expression:

```javascript
function* exampleGenerator() { 
  yield 1;
  yield 2;
  yield 3;
};

const result = exampleGenerator(); 

console.log(result.next()); // Prints "{value: 1, done: false}"
console.log(result.next()); // Prints "{value: 2, done: false}"
console.log(result.next()); // Prints "{value: 3, done: false}"
console.log(result.next()); // Prints "{value: undefined, done: true}"
```

**Important note:** Every invocation of `next` returns an object of shape: `{value: any, done: true|false}`. When the `done` is `true`, generator stops and won't generate any more values.

* `Generator.prototype.return()` - returns given value and finishes the generator:

```javascript
function* exampleGenerator() { 
  yield 1;
  yield 2;
  yield 3;
};

const result = exampleGenerator(); 

console.log(result.next()); // Prints "{value: 1, done: false}"
console.log(result.return(4)); // Prints "{value: 4, done: true}" 
```

* `Generator.prototype.throw()` - throws an error to the generator (finishes the generator as well, unless caught from within that generator):

#### Uncaught error example

```javascript
function* exampleGenerator() { 
  yield 1;
  yield 2;
  yield 3;
};

const result = exampleGenerator(); 

// Prints "{value: 1, done: false}"
console.log(result.next()); 

// Prints "Error: Something went wrong" 
console.log(result.throw(new Error("Something went wrong"))); 
```

#### Caught error example

```javascript
function* exampleGenerator() { 
  try {
    yield 1;
    yield 2;
    yield 3;   
  } catch(e) {
    console.log("Error caught");
  };
};

const result = exampleGenerator(); 

// Prints "{value: 1, done: false}"
console.log(result.next()); 

// "Error caught" is printed

// Prints "{value: undefined, done: true}"
console.log(result.throw(new Error("Something went wrong")));
```

## Usage of generators

When you start learning about the generators it may not be obvious where are they used, so let's take a look at the use cases:

#### Implementing iterables

Imagine that we want to create a custom iterable that returns a sequence of words.

Consider the following method using iterators:

```javascript
const iterable = {
  [Symbol.iterator]() {
    let step = 0;
    return {
      next() {
        step++;
        if (step === 1) {
          return { value: "Hello", done: false};
        } else if (step === 2) {
          return { value: "World", done: false};
        }
        return { value: undefined, done: true };
      },
    };
  },
};

/* 
  Prints:
    "Hello"
    "World"
*/
for (const result of iterable) {
  console.log(result);
}
```

And the same example using generators:

```javascript
  function* example() {
  yield "Hello";
  yield "World";
};

const generator = example();

/* 
  Prints:
    "Hello"
    "World"
*/
for (const result of generator) {
  console.log(result);
}
```

Compare the amount of code and simplicity of both examples, which do the same thing.

#### Waiting for promise to resolve

Let's assume we have to fetch user details using the following code, based on Promise:

```javascript
const fetchUser = () => {
    return axios("url")
      .then(user => JSON.parse(user))
      .catch(error => { console.log(error); });
};
```

The same code but using `async/await`:

```javascript
const fetchUser = async () => {
  try {
    const user = await axios("url");
    return JSON.parse(user);
  } catch(e) {
    console.log(error);
  }
};
```

And finally, using generators:

```javascript
function* fetchUser() {
  try {
    const user = yield axios.get("url");
    return JSON.parse(user);
  } catch(e) {
    console.log(error);
  }
};
```

#### Generating infinite/unique data streams

You can use generators to create infinite data stream of unique identifiers:

```javascript
function* idGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
};

const id = idGenerator();

console.log(id.next()); // Prints "{value: 0, done: false}"
console.log(id.next()); // Prints "{value: 1, done: false}"
console.log(id.next()); // Prints "{value: 2, done: false}"
```

## Summary

We've covered the very basics of generators, by now you should have an understanding what are they and how do they work.

* Generator - function that can be suspended and resumed later on
* Generator object is returned from the generator function, is can't be instantiated using `new` keyword
* Generator has 3 built-it methods: `next()`, `return()`, `throw()`
* Generators can be used for: implementing iterables, waiting for Promise to resolve, generating infinite data streams and much more