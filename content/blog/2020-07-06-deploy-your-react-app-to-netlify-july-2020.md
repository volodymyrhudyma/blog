---
title: Deploy your React app to Netlify (July 2020)
tag:
  - React
teaser: Building a website is only the first step in the launching process.
  There are a few more steps to be taken before the site goes live, and one of
  them is to deploy it to the hosting...
date: 2020-07-08T20:50:37.712Z
---
Building a website is only the first step in the launching process.

There are a few more steps to be taken before the site goes live, and one of them is to deploy it to the hosting.

Having a smooth deployment process is crucial for being able to constantly deliver new features and maintain the website.

Today we are going to focus on how to deploy your **React** application to the **Netlify** hosting provider.

## Why Netlify?

Netlify is a service that automates builds, deployments, and manages your websites.

Nowadays it’s one of the fastest and easiest deployment solutions.

Furthermore, it offers a free plan which we are going to use. It is great for hosting personal projects, hobby sites, or experiments.

## Requirements

* An application, built with React
* Netlify account
* Github account
* Github repository containing an application

## Preparing an application

For the purposes of this tutorial, we can clone [boilerplate](https://github.com/volodymyrhudyma/react-redux-typescript-app) from the Github:

`git clone git@github.com:volodymyrhudyma/react-redux-typescript-app.git`

To install the necessary dependencies and run the app, execute:

`yarn && yarn start`

This is a simple app built in [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/), which shows a simple counter and allows to increase or decrease its value:

![Counter app screenshot](/img/screenshot-2020-07-07-at-17.48.43.png "Counter app screenshot")

To make in a little more complicated, let's add Router `react-router-dom` and 2 pages: **home** and **counter**:

`yarn add react-router-dom @types/react-router-dom`

Modify `src/App.tsx`:

```tsx
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Counter from './Counter';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/counter' component={Counter} />
    </Switch>
  </BrowserRouter>
);

export default App;
```

Create `src/Home.tsx`:

```tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <>
    <div>Home</div>
    <Link to='/counter'>Counter</Link>
  </>
);

export default Home;
```

Create `src/Counter.tsx`:

```tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCounterSelector } from './store/counter/selectors';
import { incrementCounter, decrementCounter } from './store/counter/actions';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(getCounterSelector);

  const handleIncrement = () => {
    dispatch(incrementCounter());
  };

  const handleDecrement = () => {
    dispatch(decrementCounter());
  };
  return (
    <>
      <div>
        <button onClick={handleIncrement}>Increment</button>
      </div>
      <div>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
      <div>{counter}</div>
      <Link to='/'>Home</Link>
    </>
  );
};

export default Counter;
```

And navigate to your app in the browser. You should see the following home page:

![New home page](/img/screenshot-2020-07-07-at-18.12.18.png "New home page")

Click on the **Counter** link and you should be redirected to the following page:

![New counter page](/img/screenshot-2020-07-07-at-18.12.23.png "New counter page")

## Creating Netlify account

To create an account on Netlify, go to <https://www.netlify.com/> and click the "Sign up" link at the right top of the page.

Then choose how you want to register, provide your data, and verify your email.

You should be able to log in and see the dashboard:

![Netlify dashboard](/img/screenshot-2020-07-07-at-17.52.16.png "Netlify dashboard")