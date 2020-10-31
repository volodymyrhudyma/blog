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

![Current date rendered](/img/screenshot-2020-10-31-at-10.23.25.png "Current date rendered")

So far looks good. To be sure that the component does exactly what is expected, a neat test must be written:

```javascript
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';

import App from './App';

test('renders current date', () => {
  // given
  const app = mount(<App />);

  // when
  const text = `Current unix milisecond timestamp: ${moment().format('x')}`;

  // then
  expect(app.text()).toContain(text);
});

```

Run the test and... notice that it fails with the following error message:

![Failing test](/img/screenshot-2020-10-31-at-10.25.45.png "Failing test")

## Mock Date

## Summary