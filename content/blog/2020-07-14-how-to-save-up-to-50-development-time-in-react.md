---
title: How to save up to 50% development time in React?
tag:
  - React
teaser: How to save up to 50% development time in React?
date: 2020-07-14T17:22:31.632Z
---
## Prepare a boilerplate

The first thing that will save a lot of time is using a boilerplate.

There is no need to set up each new project from scratch, as it takes a lot of time to install and configure all common libraries.

The most popular React starter is [`create-react-app`](https://github.com/facebook/create-react-app). 

I strongly recommend you to use it unless you are an experienced developer and can configure your own boilerplate that is customizable and fulfills your craziest needs.

## Use available libraries

Most projects require "standard" features, like integration with an external API, displaying different lists, filtering or sorting them, etc.

We have to choose if we want to build them by ourselves or find ready-to-use solutions and integrate them into our project.

The option we end up with depends on the different factors.

If we have to meet tight deadlines, usually it is better to use external libraries, **to save some time and effort**.

Using an external library means using a tool, that is of better quality than you would write (probably), as it is the result of the combined efforts of thousands of people.

Usually, libraries are well-tested and have most of the edge-cases fixed.

It will take some time for new team members to get familiar with your custom code, however, they might have used the library before, so it will take much less effort to understand what is going on.

If they would not be familiar with the library, there is always a good documentation they can refer to.

Custom solutions, usually, lack the docs. 

There are also some drawbacks of using external libraries, like:

* harder customization

  In most cases, you are not allowed you to fully customize the code according to your needs.
* security issues

  There is a chance that the library will use the dependency version, that has some security issues and you would not be able to change it until the author decides to do so. 
* licensing issues

  While most libraries are free, before downloading each one you have to carefully check if you are allowed to use it in the commercial project for free.
* the size

  If you need to use only a few functions from the specific library, you have to download the full library, which contains a lot of code you do not need.

To sum up, using external libraries could save you a lot of development time if you do not want full control over the code.

This is a perfect use case for building an MVP.

## Build UI kit

## Use storybook

## Use IDE hints