---
title: Unit Testing React Components | Redux-Thunk | Redux-Saga (Full Guide,
  September 2020)
tag:
  - React
popular: true
promote: false
metaDescription: Learn what is Unit Testing and how to Test Stateful and
  Stateless React Components | Redux-Thunk actions, reducers, selectors |
  Redux-Saga sagas with Jest and Enzyme.
teaser: Each application must be automatically tested to ensure that everything
  works as intended and that the new features can be delivered without
  destroying the existing ones. Without testing, the functioning of your
  application is a matter of pure luck...
date: 2020-09-13T17:08:00.000Z
---
Each application must be automatically tested to ensure that everything works as intended and that the new features can be delivered without destroying the existing ones.

Without testing, the functioning of your application is a matter of pure luck.

Depending on your application, there are different types of tests that can be automated.

In this article we will learn about **Unit Testing** and why it is crucial for the majority of projects.

## What Is Unit Testing?

**Unit Testing** is a software testing method in which individual units of source code are tested to determine whether they function as expected separately.

Unit tests are automated tests written by the software developers to ensure that the specific application's section (unit) behaves as intended.

The main purpose of this type of testing is to isolate different parts of the program and ensure that they are correct.

## The Benefits Of Unit Testing

Testing is essential to guarantee the application works as expected.

Having the majority of your application's code covered with tests brings many benefits:

* **safe refactoring**

  Delivering new functionality to existing applications sometimes requires code changes, which are always risky because you may inadvertently break some existing functionality.

  The presence of unit testing allows existing code to be refactored with the assurance that nothing would fail as long as the tests pass after the refactoring.
* **code quality**

  Unit Testing forces you to write the code in good quality. The more difficult your code is to understand, the more difficult it is to test.
* **early bug reports**

  Writing tests forces developers to think thoroughly about the tested code, identify edge cases and potential problems, and to ensure that nothing would fail because of them.

  Failing unit tests are a sign that the software is not yet ready for production.
* **documentation**

  If the functionality provided by the specific code is unclear but well-tested, the developer can gain a basic understanding of it by reading unit tests.
* **reduce the costs of bug-fixing**

  The earlier bug is found, the lower the cost of fixing it. Imagine the cost of the error found in the payment system used by millions of users.
* **boost your reputation**

  By offering the top-quality software, you will enhance your reputation by the great customer's feedback.

## What Should Be Unit-Tested?

The answer to this question is simple - **everything**... in a perfect world.

But we do not live in a perfect world, and covering every part of your application with tests is extremely time-consuming and costly for customers.

It is, therefore, best to identify the parts of your application that contain some essential business-logic and make sure everything that works as expected. 

If you work on the MVP (Minimum Viable Product) and you know that some parts of your code will most likely be changed in the future, but the functionality remains the same, add some unit tests to make sure nothing is broken after refactoring.

Always write tests for edge cases, as they cause many errors.

Whenever you find a bug, fix it and cover it with the unit tests to ensure that the application does not crash twice at the same location.

## What Should Not Be Unit-Tested?

Of course, there is some stuff that does not to be unit tested.

You should not test code that has already been tested by others. 

A good example - popular libraries that are used in your project. 

Most of them have high code coverage and in most cases work as expected.

If you use third-party code, mock it and just make sure that the function is called under given circumstances and with given parameters.

Trivial code COULD not be tested as well, but that is the matter of preference. 

For example, we could trust a getter that delivers a constant value to be working fine, if that is the current business requirement. 

But it would not necessarily remain trivial.

Businesses tend to grow and change their requirements according to their needs, and trivial code acquires complexity and remains untested.

There is a high probability that the change would harm the project, so you either need to add a test for it, or verify that this piece of code is indirectly tested elsewhere.

## Test Coverage

What is test coverage?

> Test coverage is a measure used to describe the degree to which the source code of a program is executed when a particular test suite runs. 
>
> A program with high test coverage, measured as a percentage, has had more of its source code executed during testing, which suggests it has a lower chance of containing undetected software bugs compared to a program with low test coverage.

When we think about how many percent of the code should be tested, there is only one number that comes to mind: **100**.

This number seems like the best effort, but even it is estimated to detect about half of the errors in the system.

On the one hand, low test coverage indicates poor testing, but on the other hand - high guarantees nothing.

Developers should stop testing when it feels like the tests become contrived and you are focusing on getting higher test coverage numbers instead of finding bugs.

For most projects, figures such as 70-80% seem appropriate. Increasing these figures will result in a slower bug-detection rate, which is not that cost-effective.

## Testing Stateless Components In React

This section summarizes all the findings we have gained so far and puts them into practice.

Let's create a simple React component that prints the **title**, **teaser** and **publish date** of the article on the screen:

```tsx
import React, { FC } from "react";

import { Wrapper, Title, Teaser, Date } from "./styled";

export interface Props {
  title: string;
  teaser: string;
  publishDate: string;
}

const Article: FC<Props> = ({ title, teaser, publishDate }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Teaser>{teaser}</Teaser>
    <Date>{publishDate}</Date>
  </Wrapper>
);

export default Article;
```

**Important note:** the above example assumes that the [styled-components](https://styled-components.com/docs) library is used.

We will be using **Jest** and **Enzyme**, a delightful testing framework with a popular testing utility that provides us with the best testing experience. 

> The complete installation and configuration guide for both is available [here](/2020-06-09-the-best-tools-for-react-development/#Jest-+-enzyme).

Before we create the tests, we should find out what needs to be tested.

We should test everything that gives the product any value.

The `Article` component displays title, teaser and publish date? Test them all! 

Test if the expected data is displayed on the user's screen.

Missing teasers could cause the user to skip the article, resulting in the loss of a potential customer.

Finally, add some tests:

```tsx
import React from "react";
import { shallow } from "enzyme";

import { Title, Teaser, Date } from "./styled";

import Article, { Props } from "./Article";

const props: Props = {
  title: "Title",
  teaser: "Teaser",
  publishDate: "2020-09-12",
};

it("should render title", () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Title).text()).toEqual(props.title);
});

it("should render teaser", () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Teaser).text()).toEqual(props.teaser);
});

it("should render date", () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Date).text()).toEqual(props.publishDate);
});
```

As you probably noticed, we could have created one test that checks all three fields instead of three:

```tsx
it("should render title, teaser and date", () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Title).text()).toEqual(props.title);
  expect(wrapper.find(Teaser).text()).toEqual(props.teaser);
  expect(wrapper.find(Date).text()).toEqual(props.publishDate);
});
```

But this solution has a disadvantage - if one of the fields was not rendered, it would take more time to find out what exactly failed, because your test is responsible for checking three fields.

We use Shallow Rendering to test the component as a unit, in isolation. 

By using `shallow` method we do not render any child components.

## Collecting Test Coverage With Jest

Before we proceed to the next section, let's measure the test coverage of the `Article` component.

This can be easily done with Jest.

Update the **scripts** section in **package.json** file with the following line:

`"test:coverage": "jest --coverage --coverageDirectory=test-cov"`

From now on we can execute this script via the command line to get the coverage report:

`yarn test:coverage`

Go to the **test-cov** directory where Jest outputs its coverage files and open **icov-report/index.html**:

![Jest test coverage report](/img/знімок-екрана-о-00.37.29.png "Jest test coverage report")

Observe the test coverage for `Article` component, it is **100%**.

## Testing Stateful Components In React

We already know how to perform simple React Components tests that are only responsible for rendering text on the screen. 

Now let's look at a more complex example with a `useState` usage and conditional logic in it:

```tsx
import React, { FC, useState, ChangeEvent } from "react";

import { Wrapper, Input, Text } from "./styled";

const Search: FC = () => {
  const [query, setQuery] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Wrapper>
      <Input type="text" value={query} onChange={handleChange} />
      <Text>{query ? query : "No query provided"}</Text>
    </Wrapper>
  );
};

export default Search;
```

There is a `Seach` component that allows the user to enter any value into the input and see it printed below. 

If no value has been entered, the text "*No query provided*" is displayed.

Let us first think about what needs to be tested in this case.

Firstly, check whether the user actually sees the `Input` component on the screen.

Secondly, make sure that if the user has not touched the input, the default text is displayed.

Finally, simulate entering a text into the input and check whether this text is actually rendered on the screen:

```tsx
import React from "react";
import { shallow } from "enzyme";

import { Input, Text } from "./styled";

import Search from "./Search";

it("should render input", () => {
  const wrapper = shallow(<Search />);

  expect(wrapper.find(Input).length).toBeTruthy();
});

it("should render no query text", () => {
  const wrapper = shallow(<Search />);

  expect(wrapper.find(Text).text()).toEqual("No query provided");
});

it("should render provided text", () => {
  const wrapper = shallow(<Search />);
  const input = wrapper.find(Input);

  // We simulate typing "Hello, world!" into the input
  input.simulate("change", {
    target: {
      value: "Hello, world!",
    },
  });

  expect(wrapper.find(Text).text()).toEqual("Hello, world!");
});
```

If all these tests are passed and green, you can be sure that the component works and delivers its value to users.

## Testing Complex Components In React

In this section we will test the React Component, which retrieves data from an external API based on the input provided by the user and displays it in a list:

```tsx
import React, { FC, useState, ChangeEvent } from "react";

import { Wrapper, Input, Button, Item } from "./styled";

import * as api from "./api";

export interface ApiData {
  name: string;
}

const UserList: FC = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<ApiData[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const data = await api.fetchUsers(query);
    setData(data);
  };

  return (
    <Wrapper>
      <Input type="text" value={query} onChange={handleChange} />
      <Button onClick={handleSearch}>Search</Button>
      {data.map((item, index) => (
        <Item key={index}>{item.name}</Item>
      ))}
    </Wrapper>
  );
};

export default UserList;
```

Here the following things should be tested:

* `Input` component should be rendered
* `Button` component should be rendered
* By default, we do not show any `Item` components
* **fetchUsers** function should be called after clicking on the `Button` if the user has not provided any **query**
* **fetchUsers** function should be called with a **query** as an argument after clicking on the `Button` if the user has provided it
* The correct number of `Item` components with the correct data should be displayed after performing a search 

```tsx
import React from "react";
import { shallow, mount } from "enzyme";

import { Input, Button, Item } from "./styled";

import * as api from "./api";

import UserList, { ApiData } from "./UserList";

it("should render input", () => {
  const wrapper = shallow(<UserList />);

  expect(wrapper.find(Input).length).toBeTruthy();
});

it("should render button", () => {
  const wrapper = shallow(<UserList />);

  expect(wrapper.find(Button).length).toBeTruthy();
});

it("should not render any items by default", () => {
  const wrapper = shallow(<UserList />);

  expect(wrapper.find(Item).length).toBeFalsy();
});

it("should call fetchUsers function with empty query", () => {
  const wrapper = shallow(<UserList />);
  const button = wrapper.find(Button);
  // Mock "fetchUsers" function not to call the real API
  // "spyOn" returns mocked function so we can track calls
  const fetchUsersSpy = jest.spyOn(api, "fetchUsers").mockResolvedValue([]);

  button.prop("onClick")();

  expect(fetchUsersSpy).toBeCalledWith("");
});

it("should call fetchUsers function with passed query", () => {
  const wrapper = shallow(<UserList />);
  const input = wrapper.find(Input);
  const button = wrapper.find(Button);
  const fetchUsersSpy = jest.spyOn(api, "fetchUsers").mockResolvedValue([]);

  input.prop("onChange")({
    target: {
      value: "John",
    },
  });
  button.prop("onClick")();

  expect(fetchUsersSpy).toBeCalledWith("John");
});

it("should display found items", () => {
  const wrapper = shallow(<UserList />);
  const users: ApiData[] = [
    {
      name: "John",
    },
    {
      name: "Andrew",
    },
  ];
  jest.spyOn(api, "fetchUsers").mockResolvedValue(users);
  const button = wrapper.find(Button);

  button.simulate("click");

  const items = wrapper.find(Item);
  expect(items.length).toEqual(2);
  expect(items.first().text()).toEqual("John");
  expect(items.last().text()).toEqual("Andrew");
});
```

## Testing Redux Thunk

**Redux Thunk** is one of the most popular middlewares for Redux. It allows you to write asynchronous logic that interacts with the store.

> The complete installation and configuration guide for Redux Thunk is available [](/2020-06-09-the-best-tools-for-react-development/#Jest-+-enzyme)[here](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/).

#### Testing action creators

**Action creators** are functions that return plain objects. When testing action creators, we want to test whether the correct action was returned.

```typescript
import { Dispatch } from "redux";

import * as api from "./api";

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: "FETCH_USERS",
    });
    try {
      const data = await api.fetchUsers("");
      dispatch({
        type: "FETCH_USERS_FULFILLED",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_USERS_REJECTED",
        payload: error.toString(),
      });
    }
  };
};
```

The action calls `fetchUsers` function that uses `axios` to make a call to an API (`/users` endpoint).

When testing, we do not want to send a real request, but only mock it and return a sample response. 

Install the following libraries:

* `redux-mock-store`

  A mock store for testing Redux async action creators and middleware. 

  The Mock Store will create a series of sent actions that will serve as an action log for tests.

  `axios-mock-adapter`  
* Axios adapter that allows us to easily mock requests.[](https://github.com/ctimmerm/axios-mock-adapter#installation)

`yarn add -D redux-mock-store axios-mock-adapter`

```typescript
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { fetchUsers } from "./actions";

// Create axios mock
const axiosMock = new MockAdapter(axios);

// Mock store
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("fetchUsers action", () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it("should fire FETCH_USERS and FETCH_USERS_FULFILLED in case of success", async () => {
    const data = [
      {
        name: "John",
      },
    ];

    // Mock the request sent to "/users" endpoint
    // Return 200 with mocked data
    axiosMock.onGet("/users").reply(200, data);

    const expectedActions = [
      { type: "FETCH_USERS" },
      { type: "FETCH_USERS_FULFILLED", payload: data },
    ];

    const store = mockStore();

    await store.dispatch(fetchUsers());

    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should fire FETCH_USERS and FETCH_USERS_REJECTED in case of an error", async () => {
    
    // Mock the request sent to "/users" endpoint
    // Return "Network Error"
    axiosMock.onGet("/users").networkError();

    const expectedActions = [
      { type: "FETCH_USERS" },
      {
        type: "FETCH_USERS_REJECTED",
        payload: "Error: Network Error",
      },
    ];

    const store = mockStore();

    await store.dispatch(fetchUsers());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
```

#### Testing reducers

A reducer should return the new state after applying the action to the previous state.

```javascript
import { UserState, UserActions } from "./types";

const initialState: UserState = {
  pending: false,
  data: [],
  error: "",
};

export default (state = initialState, action: UserActions) => {
  switch (action.type) {
    case "FETCH_USER": {
      return {
        ...state,
        pending: true,
      };
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: "",
      };
    }
    case "FETCH_USER_REJECTED": {
      return {
        ...state,
        pending: false,
        data: [],
        error: action.payload,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
```

Call `reducer` function and apply the initial state and action you want to test as parameters:

```tsx
import reducer from "./reducer";

import { UserState } from "./types";

const initialState: UserState = {
  pending: false,
  data: [],
  error: "",
};

describe("User reducer tests", () => {
  it("should handle FETCH_USER", () => {
    expect(
      reducer(initialState, {
        type: "FETCH_USER",
      })
    ).toEqual({
      pending: true,
      data: [],
      error: "",
    });
  });

  it("should handle FETCH_USER_FULFILLED", () => {
    expect(
      reducer(initialState, {
        type: "FETCH_USER_FULFILLED",
        payload: [
          {
            name: "John",
          },
        ],
      })
    ).toEqual({
      pending: false,
      data: [
        {
          name: "John",
        },
      ],
      error: "",
    });
  });

  it("should handle FETCH_USER_REJECTED", () => {
    expect(
      reducer(initialState, {
        type: "FETCH_USER_REJECTED",
        payload: "Something went wrong",
      })
    ).toEqual({
      pending: false,
      data: [],
      error: "Something went wrong",
    });
  });
});
```

#### Testing selectors

A selector is a function that accepts Redux state as an argument and returns data that is derived from that state.

```tsx
import { createSelector } from "reselect";

import { AppState } from "./rootReducer";

const users = (state: AppState) => state.user.data;

export const usersSelector = createSelector(users, (users) => users);
```

To test selector, create the state, apply it as an argument and check if the correct result has been returned:

```tsx
import { usersSelector } from "./selectors";

import { AppState } from "./rootReducer";

describe("usersSelector tests", () => {
  it("should return users", () => {
    const state: AppState = {
      user: {
        pending: false,
        data: [{ name: "John" }],
        error: "",
      },
    };

    const users = usersSelector(state);

    expect(users).toEqual(state.user.data);
  });
});
```

## Testing Redux Saga

**Redux Saga** is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

#### Testing sagas

```typescript
import { call, put, takeLatest } from "redux-saga/effects";

import * as api from "./api";

export function* fetchUsersSaga = () => {
   yield put({
     type: "FETCH_USERS_STARTED", 
   });
   try {
      const data = yield call(api.fetchUsers);
      yield put({
        type: "FETCH_USERS_FULFILLED", 
        payload: data,
      });
   } catch (error) {
      yield put({
        type: "FETCH_USERS_REJECTED", 
        error: error.toString(),
      });
   }
};

function* usersSaga() {
  yield takeLatest("FETCH_USERS_REQUESTED", fetchUsersSaga);
}

export default usersSaga;
```

```typescript
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { runSaga } from "redux-saga";

import api from "./api";

import { fetchBuildingShape } from "./actions";

const axiosMock = new MockAdapter(axios);

describe("fetchUsersSaga tests", () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it("should fire FETCH_USERS_STARTED and FETCH_USERS_FULFILLED in case of success", async () => {
    const data = [
      {
        name: "John",
      },
    ];

    axiosMock.onGet("/users").reply(200, data);

    const dispatched = [];

    const saga = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchUsers
    );
    await saga.toPromise();

    expect(dispatched).toEqual([
      {
        type: "FETCH_USERS_STARTED",
      },
      {
        type: "FETCH_USERS_FULFILLED",
        payload: data,
      },
    ]);
  });

  it("should fire FETCH_USERS_STARTED and FETCH_USERS_REJECTED in case of success", async () => {
    axiosMock.onGet("/users").networkError();

    const dispatched = [];

    const saga = await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchUsers
    );
    await saga.toPromise();

    expect(dispatched).toEqual([
      {
        type: "FETCH_USERS_STARTED",
      },
      {
        type: "FETCH_USERS_REJECTED",
        payload: "Error: Network Error",
      },
    ]);
  });
});
```

## Summary

I hope, you enjoyed our journey through the world of testing.

We learned why and how to test **React Components** / **Redux-Thunk** / **Redux-Saga** with the help of **Jest** test runner and **Enzyme** testing utility.

If testing is new to you, it may seem overwhelming at first, but I swear if you learn this subject will bring an enormous number of benefits to each of your projects.