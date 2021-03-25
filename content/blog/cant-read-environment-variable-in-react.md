---
title: Can't Read Environment Variable In React?
tag:
  - React
promote: false
metaDescription: Learn how to define and read Environment Variables in React
  application bootstrapped with create-react-app and why sometimes you can't
  access them in your code.
teaser: Many developers use create-react-app to generate a boilerplate needed
  for a quick start of developing React application. It provides you with a
  possibility to define Environment Variables is a special file, named .env. All
  variables defined in...
date: 2021-03-26T18:23:38.881Z
---
Many developers use [create-react-app](https://github.com/facebook/create-react-app) to generate a boilerplate needed for a quick start of developing React application.

It provides you with a possibility to define Environment Variables is a special file, named **.env**.

All variables defined in this file are accessible in the code via **process.env.<VARIABLE_NAME>**.

## Define Environment Variable

To begin with, open the project and create **.env** file in the root directory:

![Create .env File](/img/screenshot-2021-03-25-at-19.39.42.png "Create .env File")

To define Environment Variable, open the **.env** file and put the following code inside:

```javascript
MY_ENVIRONMENT_VARIABLE=test
```

We defined our first variable, great. 

Next, save changes, close the file and navigate to the **App.jsx** and read the variable:

```jsx
const App = () => {
  console.log(process.env.MY_ENVIRONMENT_VARIABLE);
  return <div className="App">Hello, world</div>;
};
```

Start the project:

`yarn start`

And note that **undefined** was printed to the console:

![Undefined In The Console](/img/screenshot-2021-03-25-at-19.45.26.png "Undefined In The Console")

Do you know why?

## Gotcha #1

The first mistake we have made is not reloading our app after defining an Environment Variable.

Remember, that Environment Variables are embedded during the build time.

Every change in the **.env** file requires reloading of an application.

Let's reload and try again:

![Undefined Once Again](/img/screenshot-2021-03-25-at-19.45.26.png "Undefined Once Again")

Still no success, let's find out why.

## Gotcha #2

Second thing you should remember about is that for security reasons, create-react-app doesn't allow you to define Environment Variables which do not start with the **REACT\_APP\_** prefix.

Our name: **MY_ENVIRONMENT_VARIABLE** is definitely wrong and won't work.

Let's change it:

```javascript
REACT_APP_MY_ENVIRONMENT_VARIABLE=test
```

And in the **App.jsx**:

```jsx
const App = () => {
  console.log(process.env.REACT_APP_MY_ENVIRONMENT_VARIABLE);
  return <div className="App">Hello, world</div>;
};

export default App;
```

Reload an application and check the console:

![Variable Works](/img/screenshot-2021-03-25-at-19.48.48.png "Variable Works")

Hooray, we got it working.

## Summary

The two most important things to remember about when defining Environment Variables in a project, bootstrapped with create-react-app are:

* Always reload you application after making any change in the **.env** file
* Always prefix your variables with **REACT\_APP\_**