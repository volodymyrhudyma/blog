---
title: How to create a custom matcher in Jest?
tag:
  - React
metaDescription: META
teaser: TEASER
date: 2020-08-05T15:32:20.997Z
---
It's good practice - to cover all your components with unit tests to be sure that adding new features would not break any of the existing ones.

While there are many tools available for JavaScript and React.js unit testing, we will focus on **Jest**.

**Jest** is a JavaScript test runner, library for creating, running, and structuring tests.

## Install jest

To install jest, execute the following command in the project's root folder:

`yarn add --dev jest`

To check if everything works, create a sample test:

```typescript
const sum = (a, b) => a + b;

it("should return sum", () => {
  const a = 10;
  const b = 20;
  
  const result = sum(a, b);
  
  expect(result).toEqual(a + b);
});
```

Take a look at the test once more. The `expect(result)` function returns an "expectation" object, on which a matcher `toEqual` is called.

When Jest runs, it tracks all the failing matchers so that it can print out nice error messages for you.

## What is a matcher?

A **matcher** (or an **assertion**) is a function that is used to check for a specific condition.

Jest provides a lot of matchers out-of-the-box, some of the most commonly used ones:

```javascript
// Ensure that the value is truthy
expect(true).toBeTruthy(); 

// Ensure that the value is falsy
expect(false).toBeFalsy();

// Deep value equality 
expect({ name: "John" }).toEqual({ name: "Andrew" });

// Ensure that a mock function was called with specific arguments
expect(functionMock).toHaveBeenCalledWith("arg"); 
```

See the full list of available matchers [here](https://jestjs.io/docs/en/expect). 

## Create a custom matcher

While Jest is extremely powerful, there are always some project-specific things, which could be extracted somewhere to increase the readability of the tests.

For example, you may have a function that calculates min and max temperature of the day and calculates the diff if min is not equal to max, otherwise diff is not returned:

```typescript
import * as actions from "./actions";

interface ITemperatureRange {
  min: number;
  max: number;
  diff?: number;
}

export const getDayTemparatureRange = (date: Date): ITemperatureRange => {
  const { max, min } = actions.fetchTemp(date);

  return {
    min,
    max,
    ...(max !== min && {
      diff: max - min,
    }),
  };
};
```

And some unit tests for it:

```typescript
import * as actions from "./actions";

import { getDayTemparatureRange } from "./temp";

it("should return temperature range", () => {
  const response = {
    min: 10,
    max: 18,
  };
  jest.spyOn(actions, "fetchTemp").mockImplementation(() => response);

  const result = getDayTemparatureRange(new Date());

  expect(result).toEqual({
    min: response.min,
    max: response.max,
    diff: response.max - response.min,
  });
});

it("should skip diff if min and max are equal", () => {
  const response = {
    min: 18,
    max: 18,
  };
  jest.spyOn(actions, "fetchTemp").mockImplementation(() => response);

  const result = getDayTemparatureRange(new Date());

  expect(result).toEqual({
    min: response.min,
    max: response.max,
  });
});
```

Notice, how we duplicate `toEqual({ ... })` is those 2 unit tests.

While in our case this is not a big deal, in case of having more complex `getDayTemparatureRange` function, it could be.

We can extract that logic to a separate matcher, named `toEqualTemperatureRange` that would be responsible for checking if the returned result is correct or not.

To do that, create `jest.config.js` with the following content:

```javascript
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
```

The next step is to create a file named `setupTests.ts` in the root directory and put the following code inside:

```typescript
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

expect.extend({
  toEqualTemperatureRange(result) {
    const { min, max, diff } = result;

    // If no min temp or
    // No max temp or
    // Min and max are present and not equal, but diff is not here
    // The code is wrong
    if (!min || !max || (min && max && min !== max && !diff)) {
      return {
        pass: false,
        message: () => "Returned structure is not expected",
      };
    }

    // If min is equal to max, make sure diff is not returned
    if (min === max) {
      // If diff is returned, the code is wrong
      if (diff !== undefined) {
        return {
          pass: false,
          message: () => "Diff should not be present if min is equal to max",
        };
      }
    }
    return {
      pass: true,
      message: () => "The result is equal to the temparature range object",
    };
  },
});
```

And the custom matcher is ready-to-use:

```typescript
import * as actions from "./actions";

import { getDayTemparatureRange } from "./temp";

it("should return temperature range", () => {
  const response = {
    min: 10,
    max: 18,
  };
  jest.spyOn(actions, "fetchTemp").mockImplementation(() => response);

  const result = getDayTemparatureRange(new Date());

  expect(result).toEqualTemperatureRange();
});

it("should skip diff if min and max are equal", () => {
  const response = {
    min: 18,
    max: 18,
  };
  jest.spyOn(actions, "fetchTemp").mockImplementation(() => response);

  const result = getDayTemparatureRange(new Date());

  expect(result).toEqualTemperatureRange();
});

```

The `toEqualTemperatureRange` function receives one argument, which comes from the `expect` function.

It can accept more arguments, which will come directly from the custom matcher:

```typescript
// Test
expect(arg1).customMatcher(arg2, arg3);

// Custom matcher
expect.extend({
  toEqualTemperatureRange(arg1, arg2, arg3) {}
});
```

The matcher has to return an object with 2 properties: `pass` and `message`.

The first one indicates whether there was a match or not, and the second provides a function with no arguments that returns an error message in case of failure.

Thus, when `pass` is false, `message` should return the error message for when `expect(x).customMatcher()` fails. And when `pass` is true, `message` should return the error message for when `expect(x).not.yourMatcher()` fails.

## Summary

Using custom matchers can save many lines of code and increase the readability and maintainability of tests.

This is a cool feature, that is definitely worth trying.