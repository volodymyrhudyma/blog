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

I have been using it for a long time without considering any alternatives, till I have found out that it is too heavy for simple projects.

## Moment Overview

Moment is by far the most popular library for handling dates, but it has a lot of disadvantages when comparing to the newer libraries that are intended to work with dates.

Even the [project team](https://momentjs.com/docs/#/-project-status/) considers it as a **finished** project and would not add any new features to it.

> We now generally consider Moment to be a legacy project in maintenance mode. It is not *dead*, but it is indeed *done*.

The main drawbacks of Moment:

* **Mutability**

  The moment object in Moment.js is mutable which means that operations like add, subtract, or set change the original moment object:

```javascript
const now = moment(); 
const tomorrow = now.add(1, "day"); 

// Prints "2021-01-11T11:01:09+01:00"
console.log(now.format());

// Prints "2021-01-11T11:01:09+01:00"
console.log(tomorrow.format());
```

To avoid situations like that, you need to remember to **clone** an object before performing any math on it:

```javascript
const now = moment();
const tomorrow = now.clone().add(1, "day"); 

// Prints "2021-01-10T11:02:59+01:00"
console.log(now.format());

// Prints "2021-01-11T11:02:59+01:00"
console.log(tomorrow.format());
```

* **Size**

  Moment does not work well with [tree shaking](https://webpack.js.org/guides/tree-shaking/) algorithms and grows really large, especially if you need the full internationalization support.

  According to the [Budnlephobia](https://github.com/pastelsky/bundlephobia) - a tool that shows the performance impact of including the npm package, **moment@2.29.1** takes **228.4Kb** minified and **71.2Kb** minified + gzipped:

![Bundlephobia Moment](/img/screenshot-2021-01-10-at-10.42.11.png "Bundlephobia Moment")

If you scroll down the Bundlephobia, you will see that it suggests some light weight alternatives, like **luxon**, **day-js**, **date-fns**.

Let's quickly check them and see if they can be real replacements for Moment.

## Npm Trends Overview

According to the [npm trends](https://www.npmtrends.com/dayjs-vs-date-fns-vs-moment-vs-luxon), still the most popular library for handling dates is Moment, date-fns, dayjs and luxon are on the next places accordingly:

![Npm Trends Overview](/img/screenshot-2021-01-10-at-11.12.34.png "Npm Trends Overview")

If we look at the **Stats** section, we can see that dayjs is the youngest, the most lightweight and the most rated alternative:

![Npm Trends Stats](/img/screenshot-2021-01-10-at-11.15.27.png "Npm Trends Stats")

## Luxon

[Luxon](https://github.com/moment/luxon) is a library for working with dates and times in JavaScript, created by one of the Moment maintainers. The whole history behind creating this library is available [here](https://github.com/moment/luxon/blob/master/docs/why.md).

```javascript
import { DateTime } from "luxon";

const now = DateTime.local();
const tomorrow = now.plus({ days: 1 });

// Prints "2021-01-10T11:23:30.305+01:00"
console.log(now.toISO());

// Prints "2021-01-11T11:23:30.305+01:00"
console.log(tomorrow.toISO());
```

## Dayjs

[Dayjs](https://github.com/iamkun/dayjs) is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.

If you are used to working with Moment and want to get out quickly, Dayjs can be the best option to start with.

```javascript
import dayjs from "dayjs";

const now = dayjs();
const tomorrow = now.add("1", "day");

// Prints "2021-01-10T11:28:17+01:00"
console.log(now.format());

// Prints "2021-01-11T11:28:17+01:00"
console.log(tomorrow.format())
```

## Date-fns

[Date-fns](https://github.com/date-fns/date-fns) is a library that provides the most comprehensive, yet simple and consistent toolset\
for manipulating **JavaScript dates** in **a browser** & **Node.js**.

Read the section "Why date-fns" available [here](https://date-fns.org/).

```javascript
import { addDays, formatISO } from "date-fns";

const now = new Date(2020, 1, 10);
const tomorrow = addDays(now, 1);

// Prints "2020-02-10T00:00:00+01:00"
console.log(formatISO(now));

// Prints "2020-02-11T00:00:00+01:00"
console.log(formatISO(tomorrow));
```