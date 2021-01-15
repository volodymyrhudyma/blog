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