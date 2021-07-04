---
title: 3 Ways To Mock Axios In Jest
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-07-06T09:33:01.026Z
---
Every developer should know how to create a function that makes an API request and how to test it properly.

While creating such function is a relatively simple task (if you use good HTTP client, like [axios](https://github.com/axios/axios)), testing it requires some effort.

You can't call the real API in tests, so the first thing you have to do is to mock them.

There are a lot of ways to achieve this in Jest, but today we will focus on three most popular ones.

## Function To Test

Assuming the environment is set up, [Jest](https://jestjs.io/) and [axios](https://github.com/axios/axios) are installed and configured, here is the function we want to test:

```javascript
import axios from "axios";

export const BASE_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async () => {
  try {
    return await axios.get(`${BASE_URL}/users`);
  } catch (e) {
    return [];
  }
};
```

The function is pretty self-explanatory - it returns users fetched from the API if the request is successful, otherwise it returns and empty array.

I suggest writing two tests for these two cases:

```javascript
describe("fetchUsers", () => {
  describe("when API call is successful", () => {
    it("should return users list", () => {
      // ...
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", () => {
      // ...
    });
  });
});
```

Sounds good enough? Let's begin with the easiest way.

## Way #1 - jest.mock()

## Way #2 - jest-mock-axios

## Way #3 - axios-mock-adapter

## Summary