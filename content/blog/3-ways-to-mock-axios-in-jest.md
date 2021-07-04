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

Assuming the environment is set up, [Jest](https://jestjs.io/) and [axios](https://github.com/axios/axios) are installed and configured, here is the function we want to test.

Create a file **utils.js** in the root folder with the following contents:

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

I suggest writing two tests for these two cases.

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

**Important note:** All files containing tests are assumed to be placed in the same folder as **utils.js**.

## Way #1 - jest.mock()

The easiest and the most popular way to mock axios in Jest is using **jest.mock()** function:

```javascript
import axios from "axios";

import { BASE_URL, fetchUsers } from "./utils";

jest.mock("axios");

describe("fetchUsers", () => {
  describe("when API call is successful", () => {
    it("should return users list", async () => {
      // given
      const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Andrew" },
      ];
      axios.get.mockResolvedValueOnce(users);

      // when
      const result = await fetchUsers();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(result).toEqual(users);
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", async () => {
      // given
      const message = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await fetchUsers();

      // then
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(result).toEqual([]);
    });
  });
});
```

Let's explain the first test in the above example:

1. Mock axios: **jest.mock("axios")**.
2. Create an example response and make mocked axios return it: **axios.get.mockResolvedValueOnce(users)**.

   Note, that we are testing GET request, so we use **axios.get** for mocking the response.

   If you were testing POST, **axios.post** should be used.
3. Call the function you test (**fetchUsers()** in our example).
4. Assert that the request was sent to the correct endpoint and proper result is returned.

The second test follows the same pattern, with the only difference - we mock and error response to test if in case of an error the proper data is received.

## Way #2 - jest-mock-axios

## Way #3 - axios-mock-adapter

## Summary