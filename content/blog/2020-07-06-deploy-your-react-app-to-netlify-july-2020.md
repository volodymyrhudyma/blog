---
title: Deploy your React app to Netlify (July 2020)
tag:
  - React
teaser: Building a website is only the first step in the launching process.
  There are a few more steps to be taken before the site goes live, and one of
  them is to deploy it to the hosting...
date: 2020-07-08T20:50:37.712Z
---
uilding a website is only the first step in the launching process.

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
* Installed `netlify-cli` library

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

You should be able to log in and see the empty dashboard:

![Netlify dashboard](/img/screenshot-2020-07-07-at-17.52.16.png "Netlify dashboard")

## Install netlify-cli

We will start with `netlify-cli` library, which is a command line interface (CLI) that lets you deploy sites or configure continuous deployment straight from the command line.

`yarn add netlify-cli -g`

**Important note**: We will install the library globally in order to be able to access it in the upcoming projects.

After the successful installation, we can run `netlify` command from any directory.

To deploy our app, let's execute from the root folder:

`yarn netlify deploy`

We will be asked to grant an access to the **Netlify CLI**:

![Netlify grant an access to Netlify CLI](/img/screenshot-2020-07-07-at-18.35.52.png "Netlify grant an access to Netlify CLI")

Click **Authorize** and go back to the terminal and follow the instructions:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.38.29.png "Netlify terminal instructions")

In this step, select the **Create & configure a new site** option, since we are deploying a new project.

Then you will be asked to select your team:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.40.44.png "Netlify terminal instructions")

Since most probably you will have only one team, select it.

Next, choose a name for your website:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.42.16.png "Netlify terminal instructions")

I will leave it for Netlify to pick the random name, so just click **Enter**, without typing anything (you can provide any available name).