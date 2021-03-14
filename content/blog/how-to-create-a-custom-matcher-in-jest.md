---
title: How To Create A Custom Matcher In Jest?
tag:
  - React
promote: false
metaDescription: Learn how to use API provided by Jest to create custom
  matchers. Jest is a JavaScript test runner, library for creating, running, and
  structuring tests.
teaser: A matcher (or an assertion) is a function used to check for a particular
  condition. Jest offers a variety of matchers out-of-the-box, but sometimes
  there is a need to extend their functionality...
date: 2020-08-06T15:32:20.997Z
---
It's good practice - to cover all your components with unit tests to be sure that adding new features would not break any of the existing ones.

While there are many tools available for JavaScript and React.js unit testing, we will focus on **Jest**.

**Jest** is a JavaScript test runner, library for creating, running, and structuring tests.

## Install Jest

To install jest, run the following command in the root folder of the project:

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

Look at the test again . The `expect(result)` function returns an "expectation" object, on which a matcher `toEqual` is called.

When Jest is running, it keeps track of all the failed matchers so it can print nice error messages for you.

## What Is A Matcher?

A **matcher** (or an **assertion**) is a function used to check for a particular condition. 

Jest offers a variety of matchers out-of-the-box, some of the most commonly used ones:

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

## Create A Custom Matcher

Although Jest is extremely powerful, there are always some project-specific things that could be extracted somewhere to increase the readability of the tests.

For example, you can have a function that calculates the minimum and maximum temperature of the day and calculates the diff if min is not equal to max, otherwise the diff is not returned:

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

We can extract this logic into a separate matcher, called `toEqualTemperatureRange` which is responsible for checking the correctness of the returned result.

To do that, create `jest.config.js` with the following content:

```javascript
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
```

The next step is to create a file named `setupTests.ts` in the root directory and put the following code inside:

```typescript
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

This is a cool feature, it's definitely worth a try.