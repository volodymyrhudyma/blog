---
title: Getting started with React
teaser: Having learnt some JavaScript basics and intermediate concepts we're
  ready to kick off with an advanced topics. Meet the React - a JavaScript
  library for building user interfaces.
date: 2020-06-04T14:35:00.882Z
---
React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called “components”.

> **Library** - is a file or project that contains some useful functions.

## Why react?

There are a lot of benefits, but we'll take a look at the most important ones:

* **Easy to learn and use**

  React comes with a good supply of tutorials and great documentation as well as big ecosystem and community.
* **Learn once, write anywhere**

  An experienced React developer can write native apps for Android and IOS using React Native framework.
* **Write once, use anywhere**

  In React you can create reusable components which help your code to be easier to maintain.
* **Implements Virtual DOM**

  React implements Virtual DOM which represents the real DOM as a JSON object and all operations on it are really fast.
* **Supports SSR(Server side rendering) as well as CSR(Client side rendering)**

  React can render both on server and client with minimum configurations.
* **Has great tools for developers**

  "React Developer Tools" is an extension for Chrome and Firefox that provides a set of inspection widgets to facilitate development. 

  If you're using Redux (state management library for react), you are provided with `redux-logger` library which is great for debugging.
* **React is popular**

  If you wonder whether to get your hands dirty with the new technology or not, try to find how many websites are using it. In case of React, we have: facebook, instagram, netflix, dropbox, codeacademy etc.

## Installing React

There are a couple of ways to create react application. Unless you are an experienced React developer, I recommend you to always use `create-react-app` tool which is developed and maintained by Facebook(as well as React itself).

It helps you to get started with coding without having to deal with some heavy configurations like **webpack** or **babel**.

Make sure to create a new folder for your React projects to keep them in one place(I created `/Users/volodymyrhudyma/Projects/blog`) and enter that folder.

**Important note**: make sure to have `NodeJS`, `npm` and `npx` installed before executing the following command.

Within the newly created folder execute:

`npx create-react-app my-first-app`

This will take some time, usually about 20-30 seconds. 

After successful installation open `my-first-app` in your favorite code editor and from the root folder execute:

`yarn start`

**Important note:** make sure to install `yarn` as well.

If everything wen well, your browser will open ``[`http://localhost:3000/`](http://localhost:3000/)`` and your first React application will be up and running:

![React application started](/img/screenshot-2020-06-04-at-17.35.41.png "Application successfully started")