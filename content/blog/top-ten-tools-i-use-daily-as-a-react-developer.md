---
title: Top 10 Tools I Use Daily As React Developer
tag:
  - React
promote: false
metaDescription: "Before you start playing around with a new
  library/framework/language, I suggest you first look at the tools available to
  help you in development. Read about the top 10 tools I find most helpful when
  developing various React projects.  "
teaser: Developers usually have a set of tools that they use on a daily basis
  when developing various projects. They help to set up the project, speed up
  the development process, test the final result, and make it accessible to the
  end-users...
date: 2020-12-16T14:50:00.000Z
---
Developers usually have a set of tools that they use on a daily basis when developing various projects.

They help to set up the project, speed up the development process, test the final result, and make it accessible to the end-users.

Today, I am going to share with you the tools that I personally use on daily basis and that I find most helpful for React developers.

## Visual Studio Code (VS Code)

For starters, we need a good code editor that runs on the desktop and comes with all the necessary features to start coding as soon as we download it.

**VS Code** meets these requirements as it comes with built-in support for JavaScript, TypeScript and Node.js and has a lot of available extensions that can be installed if needed.

![VS Code Screenshot](/img/screenshot-2020-12-15-at-16.26.50.png "VS Code Screenshot")

Here are some of the extensions I have installed and find useful:

* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - allows you to extend the Git capabilities built into Visual Studio Code

  My favorite use case is to take a look at who, why, and when changed a particular line of code. It is extremely useful when jumping into an existing project.
* [vscode-jest-runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) - allows you to run or debug a specific test or test-suite

  If only certain tests have been modified and need to be run to make sure they pass, you do not need to type `jest -t "it should do something"` into the terminal, but instead just click the button.
* [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) - allows real-time preview of Markdown
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - allows you to enforce a consistent style by parsing your code and re-printing it with its own rules

  Extremely useful when working in a team to ensure everyone produces the code that follows the same guidelines.

There are many more great extensions, I recommend you to read [this article](https://x-team.com/blog/best-vscode-extensions/) for a larger list.

## Git / Github

![Git and Github Image](/img/1_mtsk3fq_bremfidhkel3da.png "Git and Github Image")

**Github** is a web-based platform used for version control. It allows you to store code, share it, and collaborate with different people.

One of the main advantages of Github is that it allows multiple people to work with the same code simultaneously and in an organized manner.

**Git** is an open-source version-control tool. It allows you to track changes in any file, save those changes, and send them to Github.

You can use Git in a CLI (Command Line Interface) or a GUI (Graphical User Interface).

#### CLI

You open the terminal, type in the commands that act as instructions for Git to know what to do.

#### GUI

You open a program that visualizes the state of your repository, commit history, and all branches. Instead of typing the commands manually, you click the buttons.

There are standalone programs like [Github Desktop](https://desktop.github.com/) or ones that can be integrated into your code editor (VS Code has it available by default).

Which is the best way of working with Git? I do not have an answer for that, but even if you only want to use the GUI, you should try CLI first and learn all the basic commands and concepts.

**Important note: Y**ou are not limited to just Github, there are many alternatives, like Gitlab, Bitbucket, etc.

The first thing I do in the morning is check if there were any changes made in the Github repository by other team members, and pull them to my local machine using Git.

Here is [a great article](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners) that explains working with Git and Github in detail.

## React Developer Tools

This article is written from the perspective of a React Developer, so the first thing I suggest to install after creating a project in React is [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

**React Developer Tools** is a Chrome DevTools extension for the React library. It allows you to inspect the React component hierarchies in Chrome Developer Tools.

After installation, you will see two additional tabs in Chrome DevTools: Components and Profiler:

![Components and Profiler Tabs](/img/screenshot-2020-12-15-at-16.53.57.png "Components and Profiler Tabs")

Read more about the new tabs [here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

Personally, I like the possibility to "*Highlight updates when components render*", which is included in the React Developer Tools.

It shows how often your components are rendered, and from that you can see if further optimizations are needed.

## Redux (Redux Thunk/Redux Saga)

![React and Redux Images](/img/1_vem-5lsatrrj4jxh96h5kg.png "React and Redux Images")

[Redux](https://redux.js.org/) is a library that allows us to manage an application's state easily and predictably.

With Redux, the state of your application is kept in one place, called Store and components can connect to the store and pull the needed data.

The main benefits of using it are the following:

* The state becomes predictable

  If the same state and actions are passed to the reducers, they produce the same result, since they are pure functions.
* The state becomes immutable

  Reducers always produce a new state, never mutating the original.
* Easy debugging

  Since the state is immutable, we can time-travel through the happened updates and view the state at any given moment.
* Easy testing

To add Redux to your React project, refer to [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/).

When working with Redux, most likely you will need to add a middleware for handling side effects and being able to integrate with the store more efficiently.

Both, **Redux Thunk** and **Redux Saga** libraries serve this purpose.

#### Redux Thunk

[Redux Thunk](https://github.com/reduxjs/redux-thunk) is a Thunk middleware for Redux. It allows you to write asynchronous logic that interacts with the store.

It allows you to write action creators that **return a function instead of an action**.

The Thunk can be used to delay an action execution or execute specific actions only when a certain condition is met.

#### Redux Saga

[Redux Saga](https://redux-saga.js.org/) is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

Saga represents a single thread in your application that is responsible only for handling side-effects.

To read more about Redux Thunk and Redux Saga refer to [this article](/2020-07-25-redux-thunk-vs-redux-saga-the-differences/).

## Redux Dev Tools

[Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) is a Chrome DevTools extension that helps in debugging the application's state.

![Redux DevTools](/img/screenshot-2020-12-15-at-18.02.22.png "Redux DevTools")

It allows to:

* Trace all dispatched actions and all their payload
* Time travel through all states of an application, so we can see what was going before the state reached the given point
* Dispatch a custom action without implementing it in the code
* Monitor only desired actions
* Persist store on page reload
* And much more

Make sure to install this extension and configure it to be used with the current project. Find out how to do it [here](https://github.com/zalmoxisus/redux-devtools-extension#1-with-redux).

## Jest / Enzyme

Covering your components and business logic with unit tests is never a bad idea. This will make sure that all of the existing features work as expected and adding some new ones would not break them.

![Jest and Enzyme Logos](/img/jest-enzyme.png "Jest and Enzyme Logos")

[Jest](https://jestjs.io/docs/en/getting-started) is a JavaScript test runner, library for creating, running, and structuring tests.

What is a test runner? It is a tool that picks up unit tests and a bunch of settings, executes all of them, and outputs test results to the console or files.

[Enzyme](https://enzymejs.github.io/enzyme/) is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output. 

The Enzyme is built explicitly for React, while Jest is designed for JavaScript in general.

The combination of both gives us a powerful set of tools that should be used in as many projects as possible.

## Prettier

![Prettier Logo](/img/prettier.png "Prettier Logo")

[Prettier](https://prettier.io/docs/en/) is used to autoformat the code and to enforce an opinionated code formatting. It helps to make sure that everyone in a team follows the same coding style.

Besides that, it also speeds up the development process, because you can skip formatting while writing code and focus on the issue itself.

Here is a quick example:

![Prettier Example](/img/ezgif.com-gif-maker-7-.gif "Prettier Example")

To learn how to add Prettier to your React project read [this section](/2020-06-09-the-best-tools-for-react-development/#Prettier).

## ESLint

![ESLint Logo](/img/eslint.png "ESLint Logo")

[ESLint](https://eslint.org/) is a tool for identifying and reporting on patterns found in ​JavaScript code, intending to make code more consistent and avoiding bugs.

Many issues found by it can be automatically fixed, but more complex ones require manual work.

Always make sure that Linter passes before even committing code to the remote repository on Github.

To learn how to add ESLint to your React project read [this section](/2020-06-09-the-best-tools-for-react-development/#ESlint).

## Github Actions

![Github Actions Image](/img/ga.webp "Github Actions Image")

[GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions) help you to automate tasks within your software development life cycle.

They are event-driven, which means that you can execute an Action after a specific event occurred.

One of the most common scenarios is executing ESLint and tests just after someone created a Pull Request in your repository.

**Important note:** Github Actions are free only for public repositories and self-hosted runners. If you want to introduce them to the private repo, you will receive a certain amount of free minutes and storage. Minutes are reset every month, storage is not. Any additional usage is billed.

Most developers have a Github Free pricing plan, which gives us 2000 minutes per month and 500MB of storage.

But we should remember that running jobs on Windows and macOS runners cost 2x and 10x more minutes accordingly than on Linux.

Further info about limits and billing can be found [here](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-billing-and-payments-on-github/about-billing-for-github-actions).

## Heroku / Netlify

![Heroku Logo](/img/heroku.png "Heroku Logo")

[Heroku](https://devcenter.heroku.com/categories/reference) is a cloud platform as a service (PaaS) supporting several programming languages.

> **Platform as a service** (PaaS) or **application platform as a service** (aPaaS) or **platform-based service** is a category of cloud computing services that provides a platform allowing customers to develop, run, and manage applications without the complexity of building and maintaining the infrastructure typically associated with developing and launching an app.

One of the biggest benefits of using Heroku for hosting React applications is configuration time.

You can deploy an app with almost no time in two ways: either by using a command line or Heroku UI (only if you are using Github).

**Important note:** Heroku is free only for non-commercial apps, if you want to deploy a business-focused app, you should purchase at least a "Production" plan. Further information about pricing is available [here](https://www.heroku.com/pricing).

There are a lot of alternatives to the Heroku and one of them is [](https://docs.netlify.com/)Netlify.

#### Netlify

![Netlify Logo](/img/netlify.png "Netlify Logo")

[Netlify](https://docs.netlify.com/) is a service that automates builds, deployments, and manages your websites.

**Important note:** Netlify includes a Free pricing plan that allows you to play around with the tool and decide if it fulfills all your requirements. Further information about pricing is available [here](https://www.netlify.com/pricing/).

Nowadays it is one of the fastest and easiest deployment solutions. As with the Heroku, you can deploy by either using a command line or Netlify UI (only if you are using Github).

Here is a [full guide](https://www.vhudyma-blog.eu/2020-07-06-deploy-your-react-app-to-netlify-july-2020/) on how to deploy your React application to Netlify.

## Summary

To sum up, before starting playing around with a new library/framework/language, I suggest first to check out available tools that will help you in development.

There is no room for a doubt that the number of available options will impress you.

I hope you liked it, make sure to try the tools I listed here and do not forget to comment your favorite ones!