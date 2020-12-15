---
title: Top 10 Tools For Successful React Development
tag:
  - React
promote: false
metaDescription: // META
teaser: // Teaser
date: 2020-12-16T14:49:17.572Z
---
The developers usually have a set of tools that they use on a daily basis during the development of different projects.

They help to set up the project, speed up the development process, test the final result and make it accessible for the end users.

Today I am going to share with you the tools I personally use daily and find most helpful for the React developers.

## Visual Studio Code (VS Code)

To begin with, we need a good code editor that runs on the desktop and ships all necessary functionality that allows to start coding immediately after downloading.

**VS Code** fulfils these requirements, as it comes with a built-in support of a JavaScript, TypeScript and Node.js and has a lot of available extensions that could be installed on demand.

![VS Code Screenshot](/img/screenshot-2020-12-15-at-16.26.50.png "VS Code Screenshot")

Here are some of the extensions I installed and find useful:

* [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - allows to supercharge the Git capabilities built into Visual Studio Code

  My favourite use case is to glimpse into whom, why, and when a line or code block was changed, jump back through history to see how and why the code changed. Extremely useful when you jump into the existing project.
* [vscode-jest-runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) - allows to runn or debug a specific test or test-suite

  When only a specific tests were changed and need to be run to make sure they pass, you do not have to execute `jest -t 'it should do something'` but just click on the button instead.
* [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) - allows to preview the Markdown in the realtime
* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - allows to enforce a consistent style by parsing your code and re-printing it with its own rules

  Extremely useful when working within a team to make sure everyone produces the code that follows the same guidelines.

There are way more amazing extensions, I recommend you to check [this article](https://x-team.com/blog/best-vscode-extensions/) for a bigger list.

## Git / Github

![Git and Github Image](/img/1_mtsk3fq_bremfidhkel3da.png "Git and Github Image")

**Github** is a web-based platform used for version control. It allows to store the code, share it and collaborate with different people.

One of the main advantages of the Github is that it allows for multiple persons to work with the same code simultaneously and in organized manner.

**Git** is an open-source tool for version-control. It allows to track changes in any files, save those changes and send them to the Github.

You can use Git in a CLI (Command LIne Interface) or a GUI (Graphical User Interface).

#### CLI

You open the terminal, type the commands which act like instructions for Git, so it knows what to do.

#### GUI

You open a program that visualizes the state of your repository, commit history and all branches. Instead of manually typing the commands, you click on the buttons.

There are standalone programs like [Github Desktop](https://desktop.github.com/) or they can be integrated into your code editor (VS Code has it available by default).

Which is the best way of working with Git? I do not have an answer for that, but even if you want to use only GUI, make sure to try CLI first and learn all basic commands. and concepts.

**Important note:** you are not limited to Github only, there are many alternatives, like Gitlab, Bitbucket, etc.

The first thing I do in the morning is checking if there were any changes in the Github repository made by other team members and pull them to my local machine by using Git.

Here is [a great article](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners) explaining how to work with both, Git and Github in details.

## React Developer Tools

This article is written from the point of view of a React Developer, so the first thing I suggest to install after creating a project in React is [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

**React Developer Tools** is a Chrome DevTools extension for the React library. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.

After the installation, you will see two additional tabs in Chrome DevTools: Components and Profiler:

![Components and Profiler Tabs](/img/screenshot-2020-12-15-at-16.53.57.png "Components and Profiler Tabs")

Read more about the new tabs [here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

I personally love the possibility to "Highlight updates when components render.", which is included in the React Developer Tools.

It shows how many times your components is rendered and based on this information you can see if any further optimizations are needed.

## Redux (Redux Thunk/Redux Saga)

![React and Redux Images](/img/1_vem-5lsatrrj4jxh96h5kg.png "React and Redux Images")

**Redux** is a library that allows us to manage an application's state easily and predictably.

With Redux, the state of your application is kept in one place, called Store and components can connect to the store and pull the needed data.

The main benefits of using it are the following:

* The state becomes predictable

  If the same state and actions are passed to the reducers, they produce the same result, since they are pure functions.
* The state becomes immutable

  Reducers always produce new state, never mutating the original.
* Easy debugging

  Since the state is immutable, we can time-travel through the happened updates and view the state at any given moment.
* Easy testing

To add Redux to your React project, refer to [this article](/2020-06-11-add-redux-with-typescript-to-your-react-applicaton-june-2020/).

When working with Redux, most likely you will need to add a middleware for handling side effects and being able to integrate with the store more efficiently.

This purpose serve Redux Thunk and Redux Saga libraries.

#### Redux Thunk

**Redux Thunk** is a Thunk middleware for Redux. It allows you to write asynchronous logic that interacts with the store.

It allows you to write action creators that **return a function instead of an action**.

The Thunk can be used to delay an action execution or execute specific actions only when a certain condition is met.

To read more about Redux Thunk refer to [this article](/2020-07-25-redux-thunk-vs-redux-saga-the-differences/).

#### Redux Saga

**Redux Saga** is a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and better at handling failures.

Saga represents a single thread in your application that is responsible only for handling side-effects.

To read more about Redux Saga refer to [this article](/2020-07-25-redux-thunk-vs-redux-saga-the-differences/).

## Redux Dev Tools

[Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)is a Chrome DevTools extension that helps in debugging the application's state.

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

[Jest](https://jestjs.io/docs/en/getting-started) is a JavaScript test runner, library for creating, running, and structuring tests.

[Enzyme](https://enzymejs.github.io/enzyme/) is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

## Prettier

## Linter

## CI/CD Tools

## Hosting Provider

## Bonus Tools

## Summary