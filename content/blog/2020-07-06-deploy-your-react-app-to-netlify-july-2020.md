---
title: Deploy Your React Application To Netlify (Full Guide, July 2020)
tag:
  - React
promote: false
metaDescription: Learn how to deploy and host ReactJs application with Netlify.
  Netlify is a service that automates builds, deployments, and manages your
  websites.
teaser: Building a website is only the first step in the launching process.
  There are a few more steps to be taken before the site goes live, and one of
  them is the deployment on hosting...
date: 2020-07-08T20:50:37.712Z
---
Building a website is only the first step in the launching process.

There are a few more steps to be taken before the site goes live, and one of them is the deployment on hosting.

Having a smooth deployment process is crucial for being able to constantly deliver new features and maintain the website.

Today we are going to focus on how to deploy your **React** application to the **Netlify** hosting provider.

## Why Netlify?

Netlify is a service that automates builds, deployments, and manages your websites.

Nowadays it is one of the fastest and easiest deployment solutions.

It provides:

* free plan to play around with the platform
* HTTPS for each website by default 
* built-in DNS management

## Preparing An Application

For the purposes of this tutorial, we can clone [boilerplate](https://github.com/volodymyrhudyma/react-redux-typescript-app) from the Github:

`git clone git@github.com:volodymyrhudyma/react-redux-typescript-app.git`

To install the required dependencies and run the app, execute:

`yarn && yarn start`

This is a simple app built in [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/), which shows a simple counter and allows you to increment or decrement its value:

![Counter app screenshot](/img/screenshot-2020-07-07-at-22.20.49.png "Counter app screenshot")

To make it a little more complicated, we will add Router `react-router-dom` and 2 pages: **home** and **counter**:

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

And navigate to your app in the browser. You should see the following homepage:

![New home page](/img/screenshot-2020-07-07-at-22.21.25.png "New home page")

Click on the **Counter** link and you should be redirected to the following page:

![New counter page](/img/screenshot-2020-07-07-at-22.22.02.png "New counter page")

The last step is to create a build for our application by executing:

`yarn build`

## Creating Netlify Account

To create an account on Netlify, go to <https://www.netlify.com/> and click the "Sign up" link at the top right of the page.

Then choose how you want to register, enter your details, and verify your email.

You should be able to log in and see the empty dashboard:

![Netlify dashboard](/img/screenshot-2020-07-07-at-17.52.16.png "Netlify dashboard")

## Deploying From The Terminal

We will start with `netlify-cli` library, which is a command-line interface (CLI) that allows you to deploy sites or configure continuous deployment directly from the command line.

`yarn add netlify-cli -g`

**Important note**: We will install the library globally in order to be able to access it in the future projects.

After successful installation, we can run `yarn netlify` from any directory.

To deploy our app, let's execute from the root folder:

`yarn netlify deploy`

We are asked to grant access to the **Netlify CLI**:

![Netlify grant an access to Netlify CLI](/img/screenshot-2020-07-07-at-18.35.52.png "Netlify grant an access to Netlify CLI")

Click **Authorize** and go back to the terminal and follow the instructions:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.38.29.png "Netlify terminal instructions")

In this step, select the **Create & configure a new site** option, since we are deploying a new project.

You will then be asked to select your team:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.40.44.png "Netlify terminal instructions")

Since most probably you will have only one team, select it.

Next, choose a name for your website:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.42.16.png "Netlify terminal instructions")

I leave it up to Netlify to choose the random name, so just click **Enter**, without typing anything (you can provide any available name).

The next step is to specify a path to the directory we want to publish. In our case, it is going to be `build`, so type it in and press enter:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.46.45.png "Netlify terminal instructions")

At this point, our website has already been deployed to the **draft URL**, which is viewable in the browser:

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.48.44.png "Netlify terminal instructions")

In my case the URL is the following: `https://5f04a75593f5867055fe6f8d--vibrant-brahmagupta-1ba4c2.netlify.app`, yours will be different.

Make sure to check the website by opening it.

If everything works as you expect, go back to the terminal and deploy it to your main URL, which was randomly chosen by Netlify for you (or defined by you) in one of the previous steps:

`yarn netlify deploy --prod`

You will be asked once again to provide publish directory, so make sure to type `build` and click **Enter**.

![Netlify terminal instructions](/img/screenshot-2020-07-07-at-18.53.19.png "Netlify terminal instructions")

Notice the 3 URLs we received in the terminal:

* Logs

  Represents current deploy's logs
* Unique Deploy URL

  Represents the unique URL of the current deploy
* Website URL

  Represents the production URL with the latest deployed changes

## Deploying From GitHub

Netlify provides us with the possibility to deploy the website directly from Github.

To do this, login to the Netlify, go to the dashboard and click **New site from Git** button at the right.

Then, select Github (you are allowed to deploy from Gitlab and Bitbucket as well):

![Netlify deploy from Github](/img/screenshot-2020-07-07-at-22.28.05.png "Netlify deploy from Github")

The next step is to pick the repository you want to deploy:

![Netlify deploy from Github](/img/screenshot-2020-07-07-at-22.43.01.png "Netlify deploy from Github")

**Important note:** if you can not find your repository in the list, you need to provide Netlify with access to it. To do that, click on the link below the list: **Can’t see your repo here? Configure the Netlify app on GitHub.**

Finally, provide the deploy settings. The most important ones are: which branch to deploy (we will deploy `master`), which command to execute to build the project (in our case `yarn build`), and which folder to deploy (in our case `build` folder):

![Netlify deploy from Github](/img/screenshot-2020-07-07-at-22.33.40.png "Netlify deploy from Github")

Now it's time to relax a little and have a coffee.

Netlify will build and deploy the website for you.

Once the deployment is complete, your site will accessible:

![Netlify site deploy success](/img/screenshot-2020-07-07-at-22.37.23.png "Netlify site deploy success")

## Summary

In this article, we have learned how to deploy React application to the Netlify platform in 2 different ways: by using a terminal or Netlify admin panel. 

Both ways are done with almost no configuration and in almost no time, which is a great developer's experience.

I personally use Netlify to host 8 different projects (which are not only coded in React) and I am more than satisfied with using this platform.