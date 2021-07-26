---
title: "React Hooks: usePrevious"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/useprevious-hook-in-react.jpg
teaser: Getting the previous state of the component is a must in some specific
  cases. While class based components provide a simple and convenient way to do
  this, via the componentDidUpdate() lifecycle hook, function components
  don't...
date: 2021-07-28T20:12:08.436Z
---
Getting the previous state of the component is a must in some specific cases.

While class based components provide a simple and convenient way to do this, via the **componentDidUpdate()** lifecycle hook, function components don't and you need to write a bit of custom logic to handle it.

This custom logic can be extracted to a reusable hook, let's call it **usePrevious()**, which may even land into one of the next React versions.