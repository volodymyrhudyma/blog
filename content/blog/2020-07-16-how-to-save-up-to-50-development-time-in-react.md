---
title: How to save up to 50% development time in React?
tag:
  - React
teaser: Custom software development can be expensive because the development
  team creates an application from scratch. But there are a few things you can
  do to reduce the cost of developing a custom software solution...
date: 2020-07-16T17:22:31.632Z
---
Custom software development can be expensive because the development team creates an application from scratch. 

But there are a few things you can do to reduce the cost of developing a custom software solution.

Let's go through them one by one.

## Prepare a boilerplate

The first thing that will save a lot of time is to use a boilerplate.

It is not necessary to set up each new project from scratch, since the installation and configuration of all common libraries takes a lot of time

The most popular React starter is [`create-react-app`](https://github.com/facebook/create-react-app). 

![Create React App image](/img/screenshot-2020-07-15-at-18.24.42.png "Create React App image")

I strongly recommend you to use it unless you are an experienced developer and can configure your own boilerplate that is customizable and meets your craziest needs.

If you decide to create your own started pack, feel free to read [this article](/2020-06-09-the-best-tools-for-react-development/) that describes most of the tools you will need.

## Use available libraries

Most projects require "standard" features, such as integration with an external API, displaying different lists, filtering or sorting them, etc.

We have to decide whether we want to build them by ourselves or find ready-to-use solutions and integrate them into our project.

Which option we have in the end depends on the various factors.

When we have to meet tight deadlines, it's usually better to use external libraries, **to save some time and effort**.

#### Pros of using external libraries:

* **better quality** 

  An external library is of better quality than you would (probably) write, as it is the result of the collective efforts of thousands of people.
* **well-tested solution**

  Usually, the libraries are well-tested and have most of the edge-cases fixed.
* **library familiarity**

  It will take some time for new team members to become familiar with your custom code. However, since they may have used the library before, it will take much less effort to understand what is going on.
* **good documentation**

  If developers in your team are not familiar with the library, there is always good documentation they can refer to. Custom solutions, usually, lack the docs. 

#### Cons of using external libraries:

* **harder customization**

  In most cases, you are not allowed to fully customize the code to your needs.
* **security issues**

  There is a chance that the library is using the dependency version, which has some security issues and you cannot change it until the author decides to do so. 
* **licensing issues**

  While most libraries are free, before downloading each one you must carefully check if you are allowed to use it for free in the commercial project.
* **size**

  If you only want to use a few functions from the specific library, you must download the full library, which contains a lot of unneeded code.

#### Summary:

Using external libraries can save you a lot of development time if you do not want to have full control over the code.

This is a perfect use case for building an **MVP** (Minimum Viable Product) or **PoC** (Proof of Concept).

## Build or use existing UI kit

React is perfect for creating reusable components that can either be developed from scratch or used existing.

UI kits are reusable sets of resources that could be used in your project. They allow you to create an outstanding visual interface without having to design components from the very beginning.

This approach leads to a reduction of time and cost of development.

There are a lot of ready-to-use UI kits available, such as:

* ``[`material-ui`](https://github.com/mui-org/material-ui)``

  Set of React components, designed and developed by Google
* [](https://github.com/react-bootstrap/react-bootstrap)``[`react-bootstrap`](https://github.com/react-bootstrap/react-bootstrap)``

  Bootstrap components written in React
* ``[`ant-design`](https://github.com/ant-design/ant-design)``

  Enterprise-class UI designed for web applications

#### Pros of using the existing UI kit:

* **speed of development**

  Integrating UI kit into your project is relatively simple and you are allowed to use the existing components just after all necessary configurations have been made.
* **cross-browser and cross-device compatibility**

  Good UI kits ensure cross-browser and cross-device compatibility right from the start.

#### Cons of using the existing UI kit:

* **harder customization**

  In most cases you are not allowed to fully customize the code to your needs.
* **need to purchase the PRO version**

  Not all available UI kits give you all the components for free.
* **generic look**

  Make sure that it is acceptable for your project to look "standard"
* **size**

  UI kits tend to be big, so they can slow down your tiny project.

In the vast majority of projects, we create custom designs, based on the company's style guide.

It does not make sense to re-create the same components (Inputs, Checkboxes, Radio buttons) from scratch for each new project.

A custom UI kit could be created on the basis of the given style guide.

This solution requires a lot of work in the beginning, but in the end you will have a tailor-made UI kit that is highly customizable and can be used for all further projects.

#### Summary:

Just, as with external libraries, using ready-made UI kits could save you a lot of development time, but would cost you harder customization.

This is a perfect use case for building an **MVP** (Minimum Viable Product) or **PoC** (Proof of Concept).

## Use storybook

**Storybook** is a tool that allows developers to create components in isolation in an isolated development environment.

Any React component can be added to the storybook for showcasing purposes.

![Storybook example](/img/sb.png "Storybook example")

In larger teams, it is extremely useful for a team member to have a quick overview of all available components in one place. Then it is much easier to decide whether to use existing components or create your own.

The other great advantage of using Storybook is that you are forced to produce a reusable code of high quality. 

By writing components in isolation without being bound to specific application requirements, you make them reusable, which results in having a lot of independent building blocks in your application.

The storybook could be used as documentation for the project, especially when a new person is introduced to the project.

In summary, installing and configuring Storybook takes some time, but once this is done, your project will benefit greatly.

## Use React snippets for your IDE

If you use the VS Code, there is a great extension: [Reactjs code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets) which could be installed to the IDE.

> In order to install an extension you need to launch the Command Palette (**Ctrl + Shift + P** or **Cmd + Shift + P**) and type Extensions. There you have either the option to show the already installed snippets or install new ones.
>
> Or you can click on the link above and then click to the **Install** button at the top.

After installation, go to the extension settings and check the list of available commands:

![Reactjs available snippets](/img/screenshot-2020-07-15-at-17.57.17.png "Reactjs available snippets")

And try to use them by simply typing and pressing Enter:

![Reactjs snippets example usage](/img/jul-15-2020-17-56-14.gif "Reactjs snippets example usage")

This means an enormous saving of time, as the skeleton does not have to be manually coded for each component.

## Use Prettier (code formatter)

The use of code formatters offers more significant advantages than just shortening development time, but it is definitely worth mentioning. 

You do not have to worry about indentations or spacing, just concentrate on writing code and let the formatter do the rest.

![Prettier in React](/img/jul-15-2020-18-17-15.gif "Prettier in React")

## Summary 

Using React as a library for your application is a good choice and allows you to optimize the time spent on building the application. 

One of the biggest advantages of React is its ecosystem. Almost everything you can think of exists within it and can be used in a few minutes.

There are many instruments that are a great help in accelerating the development process. In this article, we have reviewed the most important of them.