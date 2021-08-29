---
title: Create Custom Middleware In Redux
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/custom-middleware-in-redux.jpg
teaser: // TEASERe what
date: 2021-09-03T11:46:10.273Z
---
Redux is one of the most popular state management libraries available for React applications.

It provides us with the store that holds the whole application's state, actions that describe what happens in the application and reducers that create new state object from the existing one based on the type of an action and given payload.

This flow can be extended using middlewares that allow executing code after dispatching an action, but before it reaches reducer.

Middlewares are typically used for logging, crash reporting, talking to an API, etc.

While there are a lot of middlewares in the npm registry, available to be instantly used, we are given a possibility to create and use our own custom ones.

Today we will learn how to create a custom middleware for logging actions with payload and a state computed right after they have been dispatched.

In other words, our own implementation of the [redux-logger](https://github.com/LogRocket/redux-logger) middleware.