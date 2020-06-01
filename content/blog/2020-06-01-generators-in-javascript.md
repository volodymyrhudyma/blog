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

Generator object can not be instantiated using **new** keyword, it only can be returned from the generator function:

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

The only way to exit the function is to use `return` keyword or `throw` an error:

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