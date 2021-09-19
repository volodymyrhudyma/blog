---
title: Write Parameterized Tests In Jest
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/parameterized-tests-in-jest.jpg
teaser: // TEASER
date: 2021-09-21T07:18:41.251Z
---
Unit tests are crucial - they help to confirm that the individual parts of applications work as intended.

On the one hand, without them you are never sure that everything works correctly either after refactoring or adding a new feature.

But on the other hand, writing them takes a lot of time, especially when the code is duplicated to test different edge cases.

Skipping tests is not an option, therefore we need to search for a way to speed up the whole process.

Fortunately, Jest provides us with a possibility to create **Parameterized Tests** that are designed exactly for this purpose.

## Tests Duplication

In this section we will write a few unit tests for a simple function that adds two values to see where the problem is.

Create a function **add(x, y)**:

```javascript
const add = (x, y) => x + y;
```

In order to verify that the function works as intended, let's choose random pairs numbers and use them is tests:

```javascript
describe("add function", () => {
  it("should return proper result when passed arguments are: 0, 0", () => {
    expect(add(0, 0)).toEqual(0);
  });

  it("should return proper result when passed arguments are: -1, -2", () => {
    expect(add(-1, -2)).toEqual(-3);
  });

  it("should return proper result when passed arguments are: 1, 2", () => {
    expect(add(1, 2)).toEqual(3);
  });

  it("should return proper result when passed arguments are: 99999, 99999", () => {
    expect(add(99999, 99999)).toEqual(199998);
  });
});
```

Run the tests to verify that they pass:

![Unit Tests Run](/img/screenshot-2021-09-19-at-10.05.42.png "Unit Tests Run")

Great, we just tested our **add(x, y)** function and we can move on to the next feature... but hey, haven't you noticed that we copied a lot of code unnecessarily?

The only things that change between the tests are arguments and the result.

It would be nice to be able to declare all of them in one place and just execute the assertion by iterating over them.

That's exactly what Jest allows us to do with the Parameterized Tests:

```javascript
// TEST
```