---
title: 3 Ways To Mock Axios In Jest
tag:
  - JavaScript
promote: false
metaDescription: Learn three ways to mock Axios in Jest and test API requests -
  jest.mock() function, jest-mock-axios, and axios-mock-adapter libraries.
shareImage: /img/mock-axios-in-jest.jpg
teaser: Every developer should know how to create a function that makes an API
  request, and how to test it properly. While creating such a function is a
  relatively simple task (if you use a good HTTP client, like Axios), testing it
  requires some effort. It's not always good practice to...
date: 2021-07-05T09:33:01.026Z
---
Every developer should know how to create a function that makes an API request, and how to test it properly.

While creating such a function is a relatively simple task (if you use a good HTTP client, like [](https://github.com/axios/axios)[Axios](https://github.com/axios/axios)), testing it requires some effort.

It's not always good practice to make calls to the real API in tests, so you need to mock them.

There are many ways to accomplish this in Jest, but today we'll focus on the three most popular ones.

## Function To Test

Assuming the environment is set up, [Jest](https://jestjs.io/) and [](https://github.com/axios/axios)[Axios](https://github.com/axios/axios) are installed and configured, here is the function we want to test.

Create a file **utils.js** in the root directory with the following content:

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

The function is pretty self-explanatory - it returns users fetched from the API if the request was successful, otherwise it returns an empty array.

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

Sounds good enough? Let's start with the easiest way.

**Important note:** All files containing tests are assumed to be placed in the same folder as **utils.js**.

## Way #1 - jest.mock()

The easiest and the most popular way to mock Axios in Jest is to use the **jest.mock()** function:

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

1. Mock Axios: **jest.mock("axios")**.
2. Create a sample response and make mocked axios instance return it: **axios.get.mockResolvedValueOnce(users)**.

   Note that we are testing GET request, so we use **axios.get** for mocking the response.

   If you were testing POST, **axios.post** should be used.
3. Call the function you are testing (**fetchUsers()** in our example).
4. Confirm that the request was sent to the correct endpoint and that the correct result is returned.

The second test follows the same pattern, with the only difference - we mock an error response to test if the correct data is received in case of an error.

## Way #2 - jest-mock-axios

The second way to mock Axios in Jest is to use a helper library called [jest-mock-axios](https://www.npmjs.com/package/jest-mock-axios).

First, install it:

`yarn add -D jest-mock-axios`

Then, to set up a [manual Jest mock](https://jestjs.io/docs/manual-mocks):

* Create **\_\_mocks\_\_** directory in the project root (or whatever is configured in the **roots** in the Jest configuration file)
* Create a file named **axios.js** in this directory with the following content:

```javascript
import mockAxios from "jest-mock-axios";

export default mockAxios;
```

Finally, write your tests:

```javascript
import mockAxios from "jest-mock-axios";

import { BASE_URL, fetchUsers } from "./utils";

describe("fetchUsers", () => {
  afterEach(() => {
    mockAxios.reset();
  });

  describe("when API call is successful", () => {
    it("should return users list", async () => {
      // given
      const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Andrew" },
      ];
      mockAxios.get.mockResolvedValueOnce(users);

      // when
      const result = await fetchUsers();

      // then
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(result).toEqual(users);
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", async () => {
      // given
      const message = "Network Error";
      mockAxios.get.mockRejectedValueOnce(new Error(message));

      // when
      const result = await fetchUsers();

      // then
      expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(result).toEqual([]);
    });
  });
});
```

Let's explain the above example:

1. Reset the mocked Axios object by calling: **mockAxios.reset()** after each test in the **afterEach** hook, so that the state in the mock is cleared and each test starts fresh.
2. Create a sample response and make mocked Axios return it: **mockAxios.get.mockResolvedValueOnce(users)**.
3. Call the function you are testing (**fetchUsers()** in our example).
4. Confirm that the request was sent to the correct endpoint and that the correct result is returned.

## Way #3 - axios-mock-adapter

The third way to mock Axios in Jest is to use the [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) library.

To begin with, it needs to be installed:

`yarn add -D axios-mock-adapter`

And it is ready to be used without any further configuration:

```javascript
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { BASE_URL, fetchUsers } from "./utils";

describe("fetchUsers", () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("when API call is successful", () => {
    it("should return users list", async () => {
      // given
      const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Andrew" },
      ];
      mock.onGet(`${BASE_URL}/users`).reply(200, users);

      // when
      const result = await fetchUsers();

      // then
      expect(mock.history.get[0].url).toEqual(`${BASE_URL}/users`);
      expect(result.data).toEqual(users);
    });
  });

  describe("when API call fails", () => {
    it("should return empty users list", async () => {
      // given
      mock.onGet(`${BASE_URL}/users`).networkErrorOnce();

      // when
      const result = await fetchUsers();

      // then
      expect(mock.history.get[0].url).toEqual(`${BASE_URL}/users`);
      expect(result).toEqual([]);
    });
  });
});
```

Let's explain the example above:

1. Set the Mock Adapter on the default Axios instance: **new MockAdapter(axios)**.
2. Reset the mocked Axios object by calling: **mock.reset()** after each test in the **afterEach** hook, so that the state in the mock is cleared and each test starts fresh.
3. Create a sample response and mock the call to the specific endpoint by using **mock.onGet()** function.
4. Call the function you are testing (**fetchUsers()** in our example).
5. Confirm that the request was sent to the correct endpoint and that the correct result is returned.

## NPM Trends

In this article we learned two ways to mock Axios using external libraries, so it would be good to know which library is more popular and safer to use.

According to the [](https://www.npmtrends.com/)[NPM Trends](https://www.npmtrends.com/jest-mock-axios-vs-axios-mock-adapter), **axios-mock-adapter** is much more popular with about **570,000** weekly downloads compared to almost **90,000** for **jest-mock-axios**:

![NPM Trends jest-mock-axios vs axios-mock-adapter](/img/screenshot-2021-07-04-at-12.41.59.png "NPM Trends jest-mock-axios vs axios-mock-adapter")

## Which Way Is Best?

The answer is - it depends on the requirements.

If you need to test a simple function that makes a request to an API and returns a response - you probably don't need to install and configure additional libraries, just go with the **Way #1** and **jest.mock()** function.

External libraries provide a lot of useful functionality that makes testing harder cases much easier.

I suggest starting without any library and see if that works well.

If any difficulties are encountered, only then see if libraries can help solve them.

## Summary

It's a good practice to mock API calls in tests, not only because we don't want to call the real API, but also to be able to easily test special cases, such as what happens if the request returns 200 or 404 or fails with the "Network Error" message. 

In this article, we learned the three most common ways to mock Axios in Jest:

* [jest.mock()](https://jestjs.io/docs/mock-functions) function
* [jest-mock-axios](https://www.npmjs.com/package/jest-mock-axios) library
* [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) library

Each of them has its own advantages and disadvantages, but I suggest starting with the first one without installing any additional external libraries and see if that works well for you.