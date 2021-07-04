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

The second way to mock axios in Jest is to use a helper library called [jest-mock-axios](https://www.npmjs.com/package/jest-mock-axios).

Firstly, install it:

`yarn add -D jest-mock-axios`

The next step is to setup a [manual Jest mock](https://jestjs.io/docs/manual-mocks):

* Create **\_\_mocks\_\_** directory in the project root (or whatever is configured in the **roots** in Jest config file)
* Create a file named **axios.js** in this directory with the following contents:

```javascript
import mockAxios from "jest-mock-axios";

export default mockAxios;
```

Finally, write your tests:

```javascript
import axios from "axios";
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
      expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
      expect(result).toEqual([]);
    });
  });
});

```

Let's explain the above example:

1. Reset the mocked axios object by calling: **mockAxios.reset()** after each test in the **afterEach** hook, so the state in the mock is cleared and each test starts fresh.
2. Create an example response and make mocked axios return it: **mockAxios.get.mockResolvedValueOnce(users)**.
3. Call the function you test (**fetchUsers()** in our example).
4. Assert that the request was sent to the correct endpoint and proper result is returned.

## Way #3 - axios-mock-adapter

The last way to mock axios in Jest is using [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) library.

To begin with, it needs to be installed:

`yarn add -D axios-mock-adapter`

And it is ready to be used without any configurations:

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

Let's example the example above example:

1. Set the Mock Adapter on the default axios instance: **new MockAdapter(axios)**.
2. Reset the mocked axios object by calling: **mock.reset()** after each test in the **afterEach** hook, so the state in the mock is cleared and each test starts fresh.
3. Create an example response and mock the call to the specific endpoint by using **mock.onGet()** function.
4. Call the function you test (**fetchUsers()** in our example).
5. Assert that the request was sent to the correct endpoint and proper result is returned.

## NPM Trends

In this article we learned two ways to mock axios using external libraries, so it would be good to know which library is more popular and safer to use.

According to the [](https://www.npmtrends.com/)[NPM Trends](https://www.npmtrends.com/jest-mock-axios-vs-axios-mock-adapter), **axios-mock-adapter** is much more popular with approximately **570 000** weekly downloads versus almost **90 000** for **jest-mock-axios**:

![NPM Trends jest-mock-axios vs axios-mock-adapter](/img/screenshot-2021-07-04-at-12.41.59.png "NPM Trends jest-mock-axios vs axios-mock-adapter")

## Which Way Is The Best?

The answer is - it depends on the requirements.

If you need to test a simple function that does one request to an API and returns a response - you probably don't need to install and configure any additional libraries, just go with the **Way #1** and **jest.mock()** function.

External libraries provide a lot of useful features that make testing harder cases much easier.

I suggest starting without any library and see if that works well.

If any difficulties are encountered, only then check if libraries can help in solving them.

## Summary