---
title: How To Mock Date/Moment in Jest?
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-10-31T08:53:44.007Z
---
In most cases, during project development, one has to deal with date and time.

It can be components, that display the current date, utility functions calculating something based on the current date, etc.

Testing any of these cases with Jest can be a challenge, especially when you have not yet learned how to deal with it in tests.

Today we will cover this topic by using some code examples.

## Example #1

Let's create a component that displays the current date in Unix millisecond timestamp using the [moment](https://momentjs.com/) library:

```jsx
import React from 'react';
import moment from 'moment';

const App = () => (
  <div>Current unix milisecond timestamp: {moment().format('x')}</div>
);

export default App;
```

The result of rendering:

![Current date rendered](/img/screenshot-2020-10-31-at-10.27.57.png "Current date rendered")

So far looks good. To be sure that the component does exactly what is expected, a neat test must be written:

```javascript
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import App from './App';

test('renders current date', () => {
  const app = mount(<App />);

  const text = `Current unix milisecond timestamp: ${moment().format('x')}`;

  expect(app.text()).toContain(text);
});
```

Run the test and... notice that it fails with the following error message:

![Failing test](/img/screenshot-2020-10-31-at-10.28.12.png "Failing test")

It fails because it takes some time to execute the code after the component has been mounted, and get the current timestamp with `moment().format('x')` function.

Obviously, writing the tests that do not mock the current date to a static value is not reliable.

## Mock Date to Rescue

Fortunately, there is an awesome library named [mockdate](https://www.npmjs.com/package/mockdate) that is designed exactly for the purpose of mocking the current date in tests.

Install the library:

`yarn add mockdate`

Refactor the test:

```javascript
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';

import App from './App';

// Before all tests
// Mock the current date
beforeAll(() => {
  MockDate.set('2020-10-31');
});

test('renders current date', () => {
  const app = mount(<App />);

  const text = `Current unix milisecond timestamp: ${moment().format('x')}`;

  // Just for the testing purposes
  // Let's print rendered strings
  console.log('Component: ', app.text());
  console.log('Test: ', text);

  expect(app.text()).toContain(text);
});

```

And run it:

![Passing test](/img/screenshot-2020-10-31-at-10.40.49.png "Passing test")

**Important note:** sometimes you need to mock the current date only for specific tests. It can be done by the `describe` blocks and putting `beforeAll` and `afterAll` inside of them:

```javascript
describe('with mocked date', () => {
  // Mock the current date 
  // Only inside of this block
  beforeAll(() => {
    MockDate.set('2020-10-31');
  });

  // Reset the mock
  afterAll(() => {
    MockDate.reset();
  });

  test('renders current date', () => {
    const app = mount(<App />);

    const text = `Current unix milisecond timestamp: ${moment().format('x')}`;

    expect(app.text()).toContain(text);
  });
});

// Outside of the block the current date is not mocked

```

## Summary

Using the [mockdate](https://www.npmjs.com/package/mockdate) library is definitely one of the easiest ones and the most preferable ways to mock the current date in tests.