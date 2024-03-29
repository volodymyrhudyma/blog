---
title: A Simple Guide To Currying In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn what is Currying in JavaScript, how and when to use it,
  with some real-world code examples.
shareImage: /img/currying-in-javascript.jpg
teaser: Currying is the technique of converting functions that take multiple
  arguments into a sequence of functions that each take a single argument. A
  curried function acts as Higher-Order Function, which allows functions to be
  created with some predefined data...
date: 2021-03-08T08:51:41.164Z
---
Currying is the technique of converting functions that take multiple arguments into a sequence of functions that each take a single argument.

A curried function acts as Higher-Order Function, which allows functions to be created with some predefined data in their closure scope.

For example, the function callable as **sum(a, b, c)** can be converted to **sum(a)(b)(c)**.

They work thanks to closures that preserve the enclosing function scopes after they return.

> A [closure](https://en.wikipedia.org/wiki/Closure_(computer_programming)) gives you access to an outer function’s scope from an inner function.

## The Basic Example

Let's look at the example with the **sum(a, b, c)** function:

```javascript
const sum = (a, b, c) => a + b + c;

// ES6 Syntax
const curriedSumES6 = a => b => c => a + b + c;

// ES5 Syntax
function curriedSumES5(a) {
    return function (b) {
        return function (c)  {
            return a + b + c;
        };
    };
};


// Prints "6"
console.log(sum(1, 2, 3));

// Prints "6"
console.log(curriedSumES6(1)(2)(3));

// Prints "6"
console.log(curriedSumES5(1)(2)(3));
```

A normal **sum** function is used to get the sum of three passed arguments.

A **curriedSumES5** or **curriedSumES6** functions use currying to do the same thing.

If we call a curried function with a smaller number of arguments than expected (3 in our case), we get back a callable function that we can call later with the next argument:

```javascript
const addOne = curriedSumES6(1);
const addTwo = addOne(2);
const addThree = addTwo(3);

// Prints "ƒ ()"
console.log(addOne);

// Prints "ƒ ()"
console.log(addTwo);

// Prints "6"
console.log(addThree);
```

## Curry Function

We can also create a **curry** function that takes a function as an argument and creates a curried version of it:

```javascript
// ES6 Syntax
const curryES6 = func => a => b => c => func(a, b, c);

// ES5 Syntax
function curryES5(func) {
  return function(a) {
    return function(b) {
      return function(c) {
        return func(a, b, c);
      };
    };
  };
}

const sum = (a, b, c) => a + b + c;

const curriedSumES6 = curryES6(sum);

// Prints "6"
console.log(curriedSumES6(1)(2)(3));

const curriedSumES5 = curryES5(sum);

// Prints "6"
console.log(curriedSumES5(1)(2)(3));
```

However, if you need to create curried functions, it is better to use the **curry** function from the [lodash](https://lodash.com/) library, as it allows you to call a curried function in a normal way as well:

```javascript
import curry from "lodash/curry";

const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

// Call normally, prints "6"
console.log(curriedSum(1, 2, 3));

// Call curried, prints "6"
console.log(curriedSum(1)(2)(3));
```

## Uncurry Function

It is also possible to uncurry the curried function:

```javascript
const sumCurried = a => b => c => a + b + c;

const sum = (a, b, c) => sumCurried(a)(b)(c);

// Prints "6"
console.log(sum(1, 2, 3));
```

Basically, we just create a new function that runs curried.

## When Do We Need Currying?

After learning the concept a bit, we might wonder why we need this thing at all?

Does it really bring any benefits?

The answer is simple - **Yes, it does**.

When we need to call a function with the same or almost the same parameters a few times, it can become handy to have a partial function with a predefined argument.

For example, if we are creating a website where users can buy a subscription, we might want to include some discounts for certain users that need to be taken into account when calculating the total price to be paid.

Imagine having a function called **calculateTotalPrice** that displays the total price:

```javascript
const discountTypes = {
  SMALL: 10,
}

const subscriptionTypes = {
  STANDARD: 20,
  PREMIUM: 50
}

const calculateTotalPrice = (discount, subscription) => subscription - discount;

// Prints "10"
console.log(
  calculateTotalPrice(
    discountTypes.SMALL, 
    subscriptionTypes.STANDARD
  )
);
```

Typically, the total price is not only shown on the summary page, but also on the other pages, so in order to include the discount, we always have to pass the same value:

```javascript
// "Plans" page
console.log(
  calculateTotalPrice(
    discountTypes.SMALL, 
    subscriptionTypes.STANDARD,
  )
);

// "Product" page
console.log(
  calculateTotalPrice(
    discountTypes.SMALL, 
    subscriptionTypes.STANDARD,
  )
);

// "Summary" Page
console.log(
  calculateTotalPrice(
    discountTypes.SMALL, 
    subscriptionTypes.STANDARD,
  )
);
```

To get rid of the repetition, we can use currying:

```javascript
const calculateTotalPrice = discount => subscription => subscription - discount;

const totalPriceWithSmallDiscount = calculateTotalPrice(discountTypes.SMALL);

// Prints "10"
console.log(totalPriceWithSmallDiscount(subscriptionTypes.STANDARD));
```

#### Function Composition

[Function Composition](https://en.wikipedia.org/wiki/Function_composition_(computer_science)) is a mechanism for combining simple functions to create more complicated ones.

In the chain of functions, the result of executing the current function is an argument to the next one:

```javascript
import flowRight from "lodash/flowRight";

const sum = a => b => a + b;
const multiply = a => b => a * b;

// 1$ fee
const addFee = sum(1);

// 19% tax
const addTax = multiply(1.19);

// 20% discount
const addDiscount = multiply(0.8);

const totalPrice = flowRight(
  addFee,
  addTax,
  addDiscount,
)(20);

// Prints "20.04"
console.log(totalPrice);
```

Let's break down the above example:

1. Import a **flowRight** function from **lodash** that creates a function that returns the result of calling the given functions from right to left with **this** binding of the created function, where each successive invocation is supplied the return value of the previous.

   Lodash contains also **flow** function that executes the given functions from left to right.
2. Prepare curried **sum** and **multiply** functions that would sum and multiply given values respectively.
3. Compose all functions with the **flowRight** and start executing them from right to left (from **addDiscount** to **addFee**).
4. See the output.

## Summary

Currying is a very important but often misunderstood concept in JavaScript. It allows you to convert a function callable as **sum(a, b, c)** to a function callable as **sum(a)(b)(c)**.

In this article, we learned what currying is and how to use it properly, with some real-world examples.