---
title: Unit Testing in React Applications
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-09-11T22:42:06.499Z
---
## What is unit testing?

**Unit testing** is a software testing method where individual units of the source code are tested to determine if they work as expected separately.

Unit tests are automated tests written by the software developers to make sure that the specific application's section (unit) behaves as intended.

The main goal of this kind of testing is to isolate different parts of the program and to ensure that they are correct.

## The benefits of having unit tests

Testing is essential to ensure the application works as it is expected to.

Having most of your application's code covered with tests brings many benefits:

* **safe refactoring**

  Delivering new features to the existing applications sometimes requires changes in code, which are always risky, as you can unintentionally break some existing functionality.

  Having unit tests in place allows to refactor existing code with confidence that nothing would fail as long as they pass after the refactoring.
* **code quality**

  Unit testing forces you to write the code of good quality. The more difficult your code is to understand, the more difficult it is to test.
* **early bug reports**

  Writing tests forces developers to think thoroughly about the tested code, identify edge cases and potential problems and to make sure that nothing would fail encountering them.

  Failing unit tests act as a sign that the software is not yet ready for the production.
* **documentation**

  If the functionality provided by the specific code is unclear, but it is well-tested, the developer can gain a basic understanding of it by reading unit tests.
* **reduce the bug-fixing costs**

  The earlier bug is found, the lower the cost of fixing it. Imagine the cost of the bug found in the payment system used by millions of users.
* **boost your reputation**

  By offering top-quality software, you will enhance your reputation by the great customer's feedback.

## What should be unit-tested?

The answer to this question is simple - **everything**... in a perfect world.

But we do not live in a perfect world and covering every part of your application with tests is extremely time and cost consuming for the customers.

Therefore, it is best to identify the parts of your application which contain some essential business-logic and make sure everything works as expected.

If you work on MVP (Minimum Viable Product) and know that some parts of your code will most likely be changed in the future, but the functionality will remain the same, add some unit tests to make sure that nothing is broken after the refactoring.

Always write tests for edge cases, as they cause a lot of bugs.

Whenever you find a bug, fix it and cover it with the unit tests to make sure the application will not crash twice in the same place.

## What should not be unit-tested?

Of course, there is some stuff that does not to be unit tested.

You should not test the code which has already been tested by others. 

A good example are popular libraries, which are used in your project. Most of them have extremely high code coverage and in most cases work as they are expected to.

If you code uses third-party, mock it and just make sure that the function is called under given circumstances and with given parameters.

Trivial code COULD not be tested as well, but that is the matter of the preference. For example, we could trust a getter that returns a constant value to be working fine, if that is the current business requirement. 

But it would not necessary remain trivial.

Businesses tend to grow and change their requirements according to their needs and the trivial code acquires complexity and remains untested.

There is a high chance that the change would cause a harm for the project, therefore you either have to add a test for it or check if this piece of code is indirectly tested somewhere else.

## Ideal code coverage

What is test coverage?

> Test coverage is a measure used to describe the degree to which the source code of a program is executed when a particular test suite runs. 
>
> A program with high test coverage, measured as a percentage, has had more of its source code executed during testing, which suggests it has a lower chance of containing undetected software bugs compared to a program with low test coverage.

## Testing simple component in React

## Testing complex component in React

## Testing container component in React

## Testing redux-thunk

## Testing redux-saga

## Summary