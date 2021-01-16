---
title: Know The Import Cost In Advance
tag:
  - JavaScript
promote: false
metaDescription: Learn a simple way to keep your JavaScript bundle small and
  optimized early in the development process using the Import Cost VS Code
  extension.
teaser: Keeping your bundle small is one of the most important things that can
  be done for performance optimization reasons. The larger the bundle, the more
  time it takes users to download, which means they cannot....
date: 2021-01-16T16:09:37.422Z
---
Keeping your bundle small is one of the most important things that can be done for performance optimization reasons.

The larger the bundle, the more time it takes users to download, which means they cannot interact with your app until the download is complete.

There are many ways to optimize size, but today we are going to talk about a great VS Code extension that allows us to see the size of imported packages and warns us when it's too big.

Let's start by defining what the bundle is and why users need to download it.

## What Is A Bundle?

A [bundle](https://www.vocabulary.com/dictionary/bundle) is a package of things wrapped together.

When you build the application, you create a bunch of separate files (modules) that are responsible for different things, like getting the data from the API, transforming it, and so on.

Then the module bundler tool, like **Webpack** packs all modules into one file (or several) and makes it available to the browser. This file is called **bundle**.

The more files in the project, the larger the bundle and it takes longer time for users to download it. Especially if they are browsing from a mobile device or with a slow internet connection.

We should strive to keep the bundle size as small as possible.

One of the ways to achieve this is to choose the libraries that are included in the project as carefully as possible.

## Analyze External Libraries

Feature development takes a lot of effort, so it does not make sense to build everything from scratch when you know that someone has already done the work and shared the code.

One of the examples is working with Dates in JavaScript.

Only a small number of developers use the native Date object, most of us are used to external libraries.

It's important to remember that every library has the costs it comes with. 

There are many lightweight libraries that have almost no impact on the size of your package, but there are also many heavyweight ones.

Therefore it is always necessary to choose the libraries that have less impact on the size of your application.

## MomentJS Example

There is an example that shows the importance of doing research before choosing which library to proceed with. 

Suppose you need to find a difference between two dates in hours. 

Doing this with the native Date object in JavaScript can be frustrating:

```javascript
const from = new Date("2020-01-10 17:00");
const to = new Date("2020-01-15 10:00");

const diffInTime = Math.abs(to - from);

const diffInHours = Math.ceil(diffInTime / (1000 * 60 * 60)); 

// Prints "Difference in hours is: 113"
console.log(`Difference in hours is: ${diffInHours}`);
```

Then set out to find a suitable library, look at the most popular ones and see that **MomentJS** is a perfect choice:

```javascript
import moment from "moment";

const from = moment("2020-01-10 17:00");
const to = moment("2020-01-15 10:00");

const diffInHours = to.diff(from, "hours");

// Prints "Difference in hours is: 113"
console.log(`Difference in hours is: ${diffInHours}`);
```

The code looks much simpler and is easier to maintain.

But have you noticed the impact MomentJS has on the size of your bundle?

## Import Cost - VS Code Extension

Import-Cost is a [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) that shows you the size of an imported 3rd party library the moment you import it.

It's a great tool to identify heavy packages and save some KBs. 

Enable this extension for the code above and notice how it complains about the size of MomentJS:

![Import Cost Extension In Action](/img/screenshot-2021-01-15-at-17.58.08.png "Import Cost Extension In Action")

71.5 KB seems a lot for handling such a simple requirement. 

Let's look at alternatives.

> Refer to [this article](/the-best-momentjs-alternatives/) to learn more about MomentJS alternatives.

## Refactoring An Example

The above example can be easily refactored with another library designed to handle date values - [dayjs](https://github.com/iamkun/dayjs):

```javascript
import dayjs from "dayjs";

const from = dayjs("2020-01-10 17:00");
const to = dayjs("2020-01-15 10:00");

const diffInHours = to.diff(from, "hour");

// Prints "Difference in hours is: 113"
console.log(`Difference in hours is: ${diffInHours}`);
```

And the Import Cost extension really likes the library:

![Dayjs Import Cost](/img/screenshot-2021-01-15-at-17.59.01.png "Dayjs Import Cost")

By picking a different library, we seem to save 68.5KB. This is A LOT!

## Summary

We usually tend to analyze the size of the bundle at the end of development, when we face performance issues and some optimizations are needed. 

The Import Cost VS Code extension shows the cost of importing external libraries in advance, so you can decide whether a library is necessary or not. 

Read [this article](https://citw.medium.com/keep-your-bundle-size-under-control-with-import-cost-vscode-extension-5d476b3c5a76) by an author of the extension who explains why and how this tool was developed.