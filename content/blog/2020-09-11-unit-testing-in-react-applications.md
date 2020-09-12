---
title: Unit Testing in React Applications
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-09-11T22:42:06.499Z
---
## What is Unit Testing?

**Unit Testing** is a software testing method in which individual units of source code are tested to determine whether they function as expected separately.

Unit tests are automated tests written by the software developers to ensure that the specific application's section (unit) behaves as intended.

The main purpose of this type of testing is to isolate different parts of the program and ensure that they are correct.

## The benefits of having Unit Tests

Testing is essential to guarantee the application works as expected.

Having the majority of your application's code covered with tests brings many benefits:

* **safe refactoring**

  Delivering new functionality to existing applications sometimes requires code changes, which are always risky because you may inadvertently break some existing functionality.

  The presence of unit testing allows existing code to be refactored with the assurance that nothing would fail as long as the tests pass after the refactoring.
* **code quality**

  **Unit Testing forces you to write the code in good quality. The more difficult your code is to understand, the more difficult it is to test.**
* **early bug reports**

  Writing tests forces developers to think thoroughly about the tested code, identify edge cases and potential problems, and to ensure that nothing would fail because of them.

  Failing unit tests are a sign that the software is not yet ready for the production.
* **documentation**

  If the functionality provided by the specific code is unclear but well-tested, the developer can gain a basic understanding of it by reading unit tests.
* **reduce the costs of bug-fixing**

  The earlier bug is found, the lower the cost of fixing it. Imagine the cost of the error found in the payment system used by millions of users.
* **boost your reputation**

  By offering the top-quality software, you will enhance your reputation by the great customer's feedback.

## What should be unit-tested?

The answer to this question is simple - **everything**... in a perfect world.

But we do not live in a perfect world, and covering every part of your application with tests is extremely time consuming and costly for customers.

It is therefore best to identify the parts of your application which contain some essential business-logic and make sure everything that works as expected. 

If you work on the MVP (Minimum Viable Product) and you know that some parts of your code will most likely be changed in the future, but the functionality remains the same, add some unit tests to make sure nothing is broken after refactoring.

Always write tests for edge cases, as they cause many errors.

Whenever you find a bug, fix it and cover it with the unit tests to ensure that the application does not crash twice at the same location.

## What should not be unit-tested?

Of course, there is some stuff that does not to be unit tested.

You should not test code that has already been tested by others. 

A good example are popular libraries that are used in your project. Most of them have extremely high code coverage and in most cases work as expected.

If you use third-party code, mock it and just make sure that the function is called under given circumstances and with given parameters.

Trivial code COULD not be tested as well, but that is the matter of preference. For example, we could trust a getter that delivers a constant value to be working fine, if that is the current business requirement. 

But it would not necessary remain trivial.

Businesses tend to grow and change their requirements according to their needs, and trivial code acquires complexity and remains untested.

There is a high probability that the change would harm the project, so you either need to add a test for it, or verify that this piece of code is indirectly tested elsewhere.

## Ideal test coverage

What is test coverage?

> Test coverage is a measure used to describe the degree to which the source code of a program is executed when a particular test suite runs. 
>
> A program with high test coverage, measured as a percentage, has had more of its source code executed during testing, which suggests it has a lower chance of containing undetected software bugs compared to a program with low test coverage.

When we think about how many percent of the code should be tested, there is only one number that comes to mind: 100.

This number seems like a best effort, but even it is estimated to detect about half of the errors in the system.

On the one hand, a low test coverage indicates poor testing, but on the other hand - high guarantees nothing.

Developers should stop testing when it feels like the tests become contrived and you are focusing on getting higher test coverage numbers instead of finding bugs.

For most projects, figures such as 70-80% seem appropriate. Increasing these figures will result in slower bug-detection rate, which is not that cost-effective.

## Testing simple component in React

This section summarizes all the knowledge we have gained so far and puts them into practice.

Let's create a simple React component that prints the title, teaser and publish date of the article on the screen:

```tsx
import React, { FC } from 'react';

import { Wrapper, Title, Teaser, Date } from './styled';

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

**Important note:** in the example above, we assume that the [styled-components](https://styled-components.com/docs) library is used.

In this article we will be use **Jest** and **Enzyme**, a delightful testing framework with a popular testing utility that provides us with the best testing experience. 

The complete installation and configuration guide for both is available [here](/2020-06-09-the-best-tools-for-react-development/#Jest-+-enzyme).

Before we create the tests, we should find out what needs to be tested.

We should test everything that gives the product any value.

The `Article` component displays title, teaser and date? Test it! Test if the expected data is displayed on the user's screen.

Missing teasers could cause the user to skip the article, resulting in the loss of a potential customer.

Finally, add some tests:

```tsx
import React from 'react';
import { shallow } from 'enzyme';

import { Title, Teaser, Date } from './styled';

import Article, { Props } from './Article';

const props: Props = {
  title: 'Title',
  teaser: 'Teaser',
  publishDate: '2020-09-12',
};

it('should render title', () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Title).text()).toEqual(props.title);
});

it('should render teaser', () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Teaser).text()).toEqual(props.teaser);
});

it('should render date', () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Date).text()).toEqual(props.publishDate);
});
```

As you probably noticed, we could have created one test that checks all three fields instead of three:

```tsx
it('should render title, teaser and date', () => {
  const wrapper = shallow(<Article {...props} />);

  expect(wrapper.find(Title).text()).toEqual(props.title);
  expect(wrapper.find(Teaser).text()).toEqual(props.teaser);
  expect(wrapper.find(Date).text()).toEqual(props.publishDate);
});
```

But this solution has a disadvantage - if one of the fields was not rendered, it would take more time to find out what exactly failed, because your test is responsible for checking three fields.

We use Shallow Rendering to test the component as a unit, in isolation. 

By using `shallow` method we do not render any child components.

## Testing complex component in React

We already know how to perform simple React Components tests that are only responsible for rendering text on the screen. 

Now let's look at a more complex example with a `useState` usage and conditional logic in it:

```tsx
import React, { FC, useState, ChangeEvent } from 'react';

import { Wrapper, Input, Text } from './styled';

const Search: FC = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Wrapper>
      <Input type='text' value={query} onChange={handleChange} />
      <Text>{query ? query : 'No query provided'}</Text>
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
import React from 'react';
import { shallow } from 'enzyme';

import { Input, Text } from './styled';

import Search from './Search';

it('should render input', () => {
  const wrapper = shallow(<Search />);

  expect(wrapper.find(Input).length).toBeTruthy();
});

it('should render no query text', () => {
  const wrapper = shallow(<Search />);

  expect(wrapper.find(Text).text()).toEqual('No query provided');
});

it('should render provided text', () => {
  const wrapper = shallow(<Search />);
  const input = wrapper.find(Input);

  // We simulate typing "Hello, world!" into the input
  input.simulate('change', {
    target: {
      value: 'Hello, world!',
    },
  });

  expect(wrapper.find(Text).text()).toEqual('Hello, world!');
});

```

If all these tests are passed and green, you can be sure that the component works and delivers its value to users.

## Testing container component in React

## Testing redux-thunk

## Testing redux-saga

## Summary