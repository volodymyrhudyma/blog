---
title: Know The Import Cost In Advance
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-15T16:09:37.422Z
---
Keeping your bundle small is one of the most important things that could be done for performance optimization reasons.

The larger the bundle is, the more time it takes for users to download, which means they could not interact with you application until the download finishes.

There are many ways to optimize its size, but today we will talk about an awesome VS Code extension that allows to see the size of imported packages and warns us when it is too large.

Let's begin with specifying what is a bundle and why do users need to download it.

## What Is A Bundle?

A [bundle](https://www.vocabulary.com/dictionary/bundle) is a package of things wrapped together.

When you build the application, you create a lot of separate files (modules) that are responsible for various things, such as retrieving the data from the API, transforming it, etc.

Then the module bundler tool, like **Webpack** packs all modules into one file (or several) and makes it available to the browser. This file is called **bundle**.

The more files are in the project, the larger bundle is and it takes more time for the users to download it. Especially if they are browsing from the mobile device or with a slow internet connection.

We should strive for as small bundle size as possible.

One of the ways to achieve that is to choose libraries that are included in the project as carefully as possible.

## Analyze External Libraries

Feature development requires a lot of effort, so it does not make sense to create everything from scratch, knowing that someone has already done that job and shared the code.

One of the examples is working with Dates in JavaScript.

Only a small number of developers uses native Date object, most of us are accustomed to using different libraries.

It is important to remember that each external library has the cost it comes with. 

There are a lot of lightweight libraries available, which would not affect your bundle size almost at all, however there are a lot of heavy libraries, importing which leads to decreasing your application's performance.

Therefore it is always necessary to choose the ones that would have less impact on your application's size.

## Moment Example

There is one example that can show how important is to make a research before picking the library to proceed with.

Let's say you need to find a difference between two dates in hours.

Achieving this using the native Date object in JavaScript can be frustrating:

```javascript
const from = new Date('2020-01-10 17:00');
const to = new Date('2020-01-15 10:00');

const diffInTime = Math.abs(to - from);

const diffInHours = Math.ceil(diffInTime / (1000 * 60 * 60)); 

// Prints "Difference in hours is: 113"
console.log(`Difference in hours is: ${diffInHours}`);
```

Then you start searching for a suitable library, look through the most popular ones and see that **MomentJS** is a perfect choice:

```javascript
import moment from 'moment';

const from = moment("2020-01-10 17:00");
const to = moment("2020-01-15 10:00");

const diffInHours = to.diff(from, 'hours');

// Prints "Difference in hours is: 113"
console.log(`Difference in hours is: ${diffInHours}`);
```

Code looks much simpler and easier to maintain.

But have you noticed the impact MomentJS has on your bundle size?

## Import Cost - VS Code Extension

Import-Cost is a [Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) that shows you the size of an imported 3rd party library the moment you import it.

It is a great tool for identifying heavy packages and saving some KBs.

Enable this extension for the above code and notice how it complains about the size of the MomentJs:

![Import Cost Extension In Action](/img/screenshot-2021-01-15-at-17.58.08.png "Import Cost Extension In Action")

71.5 KB seems a lot for handling such a simple requirement. 

Let's search for alternatives.

> Refer to [this article](/the-best-momentjs-alternatives/) to learn more about MomentJS alternatives.

## Refactoring An Example

An example above can be easily refactored with another library that is designed for date handling called [dayjs](https://github.com/iamkun/dayjs):

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

By picking a different library we seem to save 68.5KB. That is A LOT!

## Summary