---
title: Add React Router v5 To Your React Application
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-15T09:31:51.682Z
---
A typical React application consists of many different views that are rendered when only some specific conditions are met.

While it is possible to conditionally render all your components under one URL address (`/` by default), it is not a good idea, because you will end up with plenty of unmaintainable code.

You need to have a possibility to declare application URLs and views that would be displayed when users enter the URL.

In other words, you need to keep your URLs and views in sync.

React is a library, not a framework, so it does not ship us with this feature.

Fortunately, there are a few available libraries that are designed specifically for this purpose.

The one we will be working with today is called [react-router](https://reactrouter.com/) and it is by far the most popular routing library for React with more than 4.4 million weekly downloads.

## React Router