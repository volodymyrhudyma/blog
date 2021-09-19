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

## Parameterized Tests - Array Syntax

That's exactly what Jest allows us to do with the Parameterized Tests:

```javascript
describe("add function", () => {
  it.each([
    [0, 0, 0],
    [-1, -2, -3],
    [1, 2, 3],
    [99999, 99999, 199998],
  ])(
    `should return proper result when passed arguments are: %i, %i`,
    (x, y, result) => {
      expect(add(x, y)).toEqual(result);
    }
  );
});
```

Not sure what's going one here? Let me explain.

We use build-in **it.each** function that accepts a table as an argument:

```javascript
[
  [0, 0, 0],
  [-1, -2, -3],
  [1, 2, 3],
  [99999, 99999, 199998],
]
```

The table contains rows, each of which is passed into the test function (the arguments order is preserved):

```javascript
// Syntax
(x, y, result) => {
  expect(add(x, y)).toEqual(result);
}

// 1-st Iteration
(0, 0, 0) => {
  expect(add(0, 0)).toEqual(0);
}

// 2-nd Iteration
(-1, -2, -3) => {
  expect(add(-1, -2)).toEqual(-3);
}

// 3-d Iteration
(1, 2, 3) => {
  expect(add(1, 2)).toEqual(3);
}

// 4-th Iteration
(99999, 99999, 199998) => {
  expect(add(99999, 99999)).toEqual(199998);
}
```

Let's run the tests to verify that nothing is broken after small refactoring:

![Jest Run Tests After Refactoring To It.Each](/img/screenshot-2021-09-19-at-10.56.42.png "Jest Run Tests After Refactoring To It.Each")

Works perfectly fine!

Also, you might have notices that we used **%i** in the test title. 

This is used to positionally inject integer parameters with printf formatting.

If we remove it, then the test title would not contain the arguments and it would be hard to understand what values are actually being tested:

```javascript
describe("add function", () => {
  // ...
    'should return proper result when passed arguments are: ...',
  // ...
});

```

Run tests with changed title:

![Jest Run Tests With Changed Title](/img/screenshot-2021-09-19-at-10.59.06.png "Jest Run Tests With Changed Title")

That's why it is always better to explicitly define what values are tested unless they are some complex objects (however, even in this case we can inject properties of this object).

View the full list of available injecting parameters and their formatting [here](https://jestjs.io/docs/api#1-testeachtablename-fn-timeout).

## Parameterized Tests  - Tagged Template Literal Syntax

In the previous section, we defined the table argument as a multidimensional array and that's perfectly fine.

But there is another way to define it - using Tagged Template Literal Syntax:

```javascript
describe("add function", () => {
  it.each`
    x        | y        | result
    ${0}     | ${0}     | ${0}
    ${-1}    | ${-2}    | ${-3}
    ${1}     | ${2}     | ${3}
    ${99999} | ${99999} | ${199998}
  `(
    `should return proper result when passed arguments are: $x, $y`,
    ({ x, y, result }) => {
      expect(add(x, y)).toEqual(result);
    }
  );
});
```

It may look a little more complex, but trust me, it isn't.

We pass a Tagged Template Literal with the following structure:

* The first row contains variable name column headings
* Subsequent rows contain data, supplied as Template Literal Expressions using **${value}** syntax

Then in the test title we have an access to the data by using **$x**, **$y** or **$result** syntax and the **$#** to display an index of the current row.

Inside of the test, we have an access to the data by destructuring the first argument.

Finally, run the tests:

![Jest Table Syntax Run](/img/screenshot-2021-09-19-at-11.22.44.png "Jest Table Syntax Run")

Still works fine.