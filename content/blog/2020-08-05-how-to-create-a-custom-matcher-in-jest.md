---
title: How to create a custom matcher in Jest?
tag:
  - React
metaDescription: META
teaser: TEASER
date: 2020-08-05T15:32:20.997Z
---
It's good practice - to cover all your components with unit tests to be sure that adding new features won't break any of the existing ones.

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

// ensure that a mock function was called with specific arguments
expect(functionMock).toHaveBeenCalledWith("arg"); 
```

See the full list of available matchers [here](https://jestjs.io/docs/en/expect). 

## Create a custom matcher

While Jest is extremely powerful, there are always some project-specific things, which could be extracted somewhere to increase the readability of the tests.

For example, you may have a function that calculates min and max temperature of the day and calculates the diff if min is not equal to max, otherwise diff is not returned:

```typescript
import * as actions from './actions';

interface ITemperatureRange {
  date: Date;
  min: number;
  max: number;
  diff?: number;
}

export const getDayTemparatureRange = (date: Date): ITemperatureRange => {
  const { max, min } = actions.fetchTemp(date);

  return {
    date,
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
import * as actions from './actions';

import { getDayTemparatureRange } from './temp';

it('should return temperature range', () => {
  const response = {
    min: 10,
    max: 18,
  };
  jest.spyOn(actions, 'fetchTemp').mockImplementation(() => response);
  const date = new Date();

  const result = getDayTemparatureRange(date);

  expect(result).toEqual({
    date,
    min: response.min,
    max: response.max,
    diff: response.max - response.min,
  });
});

it('should skip diff if min and max are equal', () => {
  const response = {
    min: 18,
    max: 18,
  };
  jest.spyOn(actions, 'fetchTemp').mockImplementation(() => response);
  const date = new Date();

  const result = getDayTemparatureRange(date);

  expect(result).toEqual({
    date,
    min: response.min,
    max: response.max,
  });
});
```

Notice, how we duplicate `toEqual({ ... })` is those 2 unit tests.

We can extract that logic to a separate matcher, named `toEqualTemperatureRange`:



## Summary