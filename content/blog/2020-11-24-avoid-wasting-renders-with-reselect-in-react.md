---
title: Avoid Wasting Renders with Reselect in React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2020-11-26T19:16:13.893Z
---
React and Redux are great tools that can be used together to build web or mobile applications of different size and complexity.

Even though React is extremely fast out-of-the-box, when the application is growing, it is hard to keep it as performant as the small one.

Larger applications, typically, are not well optimized to minimize the impact of rendering cycles on the performance, so in some places they tend to be slower than expected.

Rendering cycles always come with a cost, so it is best to have as small number of re-renders as it is possible (without giving up on readability and maintainability, of course).

In this article you will see how we can optimize the React application almost with no effort.

## Build and Configure an App

## Pull Data From The Store

## Observe Wasted Renders

## Add Reselect

## Observe Saved Renders

## Summary