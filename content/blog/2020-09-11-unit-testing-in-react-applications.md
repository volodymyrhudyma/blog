---
title: Unit Testing in React Applications
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-09-11T22:42:06.499Z
---
## What is Unit Testing?

**Unit Testing** is a software testing method in which individual units of source code are tested to determine whether they function as expected separately.

Unit tests are automated tests written by the software developers to ensure that the specific application's section (unit) behaves as intended.

The main purpose of this type of testing is to isolate different parts of the program and ensure that they are correct.

## The benefits of having Unit Tests

Testing is essential to guarantee the application works as expected.

Having the majority of your application's code covered with tests brings many benefits:

* **safe refactoring**

  Delivering new functionality to existing applications sometimes requires code changes, which are always risky because you may inadvertently break some existing functionality.

  The presence of unit testing allows existing code to be refactored with the assurance that nothing would fail as long as the tests pass after the refactoring.
* **code quality**

  **Unit Testing forces you to write the code in good quality. The more difficult your code is to understand, the more difficult it is to test.**
* **early bug reports**

  Writing tests forces developers to think thoroughly about the tested code, identify edge cases and potential problems, and to ensure that nothing would fail because of them.

  Failing unit tests are a sign that the software is not yet ready for the production.
* **documentation**

  If the functionality provided by the specific code is unclear but well-tested, the developer can gain a basic understanding of it by reading unit tests.
* **reduce the costs of bug-fixing**

  The earlier bug is found, the lower the cost of fixing it. Imagine the cost of the error found in the payment system used by millions of users.
* **boost your reputation**

  By offering the top-quality software, you will enhance your reputation by the great customer's feedback.

## What should be unit-tested?

The answer to this question is simple - **everything**... in a perfect world.

But we do not live in a perfect world, and covering every part of your application with tests is extremely time consuming and costly for customers.

It is therefore best to identify the parts of your application which contain some essential business-logic and make sure everything that works as expected. 

If you work on the MVP (Minimum Viable Product) and you know that some parts of your code will most likely be changed in the future, but the functionality remains the same, add some unit tests to make sure nothing is broken after refactoring.

Always write tests for edge cases, as they cause many errors.

Whenever you find a bug, fix it and cover it with the unit tests to ensure that the application does not crash twice at the same location.

## What should not be unit-tested?

Of course, there is some stuff that does not to be unit tested.

You should not test code that has already been tested by others. 

A good example are popular libraries that are used in your project. Most of them have extremely high code coverage and in most cases work as expected.

If you use third-party code, mock it and just make sure that the function is called under given circumstances and with given parameters.

Trivial code COULD not be tested as well, but that is the matter of preference. For example, we could trust a getter that delivers a constant value to be working fine, if that is the current business requirement. 

But it would not necessary remain trivial.

Businesses tend to grow and change their requirements according to their needs, and trivial code acquires complexity and remains untested.

There is a high probability that the change would harm the project, so you either need to add a test for it, or verify that this piece of code is indirectly tested elsewhere.

## Ideal test coverage

What is test coverage?

> Test coverage is a measure used to describe the degree to which the source code of a program is executed when a particular test suite runs. 
>
> A program with high test coverage, measured as a percentage, has had more of its source code executed during testing, which suggests it has a lower chance of containing undetected software bugs compared to a program with low test coverage.

When we think about how many percent of the code should be tested, there is only one number that comes to mind: 100.

This number seems like a best effort, but even it is estimated to detect about half of the errors in the system.

On the one hand, a low test coverage indicates poor testing, but on the other hand - high guarantees nothing.

Developers should stop testing when it feels like the tests become contrived and you are focusing on getting higher test coverage numbers instead of finding bugs.

For most projects, figures such as 70-80% seem appropriate. Increasing these figures will result in slower bug-detection rate, which is not that cost-effective.

## Testing simple component in React

## Testing complex component in React

## Testing container component in React

## Testing redux-thunk

## Testing redux-saga

## Summary