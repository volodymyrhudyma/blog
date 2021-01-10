---
title: The Best MomentJS Alternatives
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-10T09:15:58.726Z
---
When it comes to handling dates in JavaScript application, no one wants to bother with the Date object and looks for some ready-to-use libraries that allow them to easily deal with dates.

One of the most popular libraries is [MomentJS](https://momentjs.com/) - a JavaScript date library for parsing, validating, manipulating, and formatting dates.

I have been using it for a long time without considering any alternatives, till I have found out that it takes too much space for a simple helper library.

## Moment Overview

Moment is by far the most popular library for handling dates, but it has a lot of disadvantages when comparing to the newer libraries that are intended to work with dates.

Even the [project team](https://momentjs.com/docs/#/-project-status/) considers it as a **finished** project and would not add any new features to it.

> We now generally consider Moment to be a legacy project in maintenance mode. It is not *dead*, but it is indeed *done*.

The main drawbacks of Moment:

* **Mutability**

  The moment object in Moment.js is mutable which means that operations like add, subtract, or set change the original moment object:

```javascript
const today = moment("2020-01-10"); 
const tomorrow = today.add(1, "day"); 

// Prints "2020-01-11T00:00:00+01:00"
console.log(today.format());

// Prints "2020-01-11T00:00:00+01:00"
console.log(tomorrow.format());
```

To avoid situations like that, you need to remember to **clone** an object before performing any math on it:

```javascript
import moment from "moment"

const today = moment("2020-01-10");
const tomorrow = today.clone().add(1, "day"); 

// Prints "2020-01-10T00:00:00+01:00"
console.log(today.format());

// Prints "2020-01-11T00:00:00+01:00"
console.log(tomorrow.format());
```

* **Size**

  Moment does not work well with [tree shaking](https://webpack.js.org/guides/tree-shaking/) algorithms and grows really large, especially if you need the full internationalization support.

  According to the [Budnlephobia](https://github.com/pastelsky/bundlephobia) - a tool that shows the performance impact of including the npm package, **moment@2.29.1** takes **228.4KB** minified and **71.2KB** minified + gzipped:

![Bundlephobia Moment](/img/screenshot-2021-01-10-at-10.42.11.png "Bundlephobia Moment")