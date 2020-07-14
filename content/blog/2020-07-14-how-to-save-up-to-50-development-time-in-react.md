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

If you decide to build your own started pack, feel free to read [this article](/2020-06-09-the-best-tools-for-react-development/) that describes most of the tools you would want to have.

## Use available libraries

Most projects require "standard" features, like integration with an external API, displaying different lists, filtering or sorting them, etc.

We have to choose if we want to build them by ourselves or find ready-to-use solutions and integrate them into our project.

The option we end up with depends on the different factors.

If we have to meet tight deadlines, usually it is better to use external libraries, **to save some time and effort**.

#### Pros of using external libraries:

* **better quality** 

  Usually, an external library is of better quality than you would write (probably), as it is the result of the combined efforts of thousands of people.
* **well-tested solution**

  Usually, libraries are well-tested and have most of the edge-cases fixed.
* **library familiarity**

  It will take some time for new team members to get familiar with your custom code, however, they might have used the library before, so it will take much less effort to understand what is going on.
* **good documentation**

  If developers in your team are not familiar with the library, there is always good documentation they can refer to. Custom solutions, usually, lack the docs. 

#### Cons of using external libraries:

* **harder customization**

  In most cases, you are not allowed you to fully customize the code according to your needs.
* **security issues**

  There is a chance that the library will use the dependency version, that has some security issues and you would not be able to change it until the author decides to do so. 
* **licensing issues**

  While most libraries are free, before downloading each one you have to carefully check if you are allowed to use it in the commercial project for free.
* **size**

  If you need to use only a few functions from the specific library, you have to download the full library, which contains a lot of code you do not need.

#### To sum up:

Using external libraries could save you a lot of development time if you do not want to have full control over the code.

This is a perfect use case for building an **MVP** (Minimum Viable Product) or **PoC** (Proof of Concept).

## Build or use existing UI kit

React is perfect for creating reusable components, which can be either developed from scratch or used existing.

UI kits are reusable resource sets that could be used in your project. They allow creating an outstanding visual interface without having to design components from the very beginning.

This approach leads to reducing the time and costs of development.

There is a lot of ready-to-use UI kits, such as:

* ``[`material-ui`](https://github.com/mui-org/material-ui)``

  Set of React components, designed and developed by Google
* [`react-bootstrap`](https://github.com/react-bootstrap/react-bootstrap)``

  Bootstrap components, written in React
* ``[`ant-design`](https://github.com/ant-design/ant-design/)``

  Enterprise-class UI designed for web applications

#### Pros of using the existing UI kit:

* **speed of development**

  Integrating UI kit into your project is relatively easy and you are allowed to use the existing components just after all necessary configurations.
* **cross-browser and cross-device compatibility**

  Good UI kits ensure cross-browser and cross-device compatibility out of the box.

#### Cons of using the existing UI kit:

* **harder customization**

  In most cases, you are not allowed you to fully customize the code according to your needs.
* **need to purchase the PRO version**

  Not all existing UI kits give you all components for free.
* **generic look**

  Make sure it is acceptable for your project to look "standard"
* **size**

  UI kits tend to be big in size, therefore they may slow down your tiny project.

In the vast majority of projects, we create custom designs, which are based on the company's style guide.

It does not make sense to re-create the same components (Inputs, Checkboxes, Radio buttons) from scratch for every new project.

A custom UI kit could be created based on the given style guide.

This solution requires a lot of work at the beginning, but you will end up having a custom UI kit, which is highly customizable and can be used for any further projects.

#### To sum up:

Same, as for external libraries, using ready UI kits could save you a lot of development time, but would cost you harder customization.

This is a perfect use case for building an **MVP** (Minimum Viable Product) or **PoC** (Proof of Concept).

## Use storybook

## Use IDE hints