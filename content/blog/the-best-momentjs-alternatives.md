---
title: The Best MomentJS Alternatives
tag:
  - JavaScript
promote: false
metaDescription: Learn the most popular MomentJS alternatives. Dayjs, Date-fns
  and Luxon are lightweight, popular and fast libraries for handling dates.
teaser: When it comes to handling dates in JavaScript application, no one wants
  to bother with the Date object and looks for some ready-to-use libraries that
  allow them to easily deal with dates. One of the most popular libraries is
  MomentJS - a JavaScript date library...
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

## Dayjs

*Immutable*

[Dayjs](https://github.com/iamkun/dayjs) is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.

If you are used to working with Moment and want to get out quickly, Dayjs can be the best option to start with.

Example of adding one day to today's date:

```javascript
import dayjs from "dayjs";

const now = dayjs();
const tomorrow = now.add("1", "day");

// Prints "2021-01-10T11:28:17+01:00"
console.log(now.format());

// Prints "2021-01-11T11:28:17+01:00"
console.log(tomorrow.format())
```

By default, Dayjs comes with English locale only. 

If other locales are needed, they can be loaded on-demand:

```javascript
import "dayjs/locale/de";
```

Once it has been imported, it becomes an active locale and you can switch to it or back to the default:

```javascript
// Switch to "de"
dayjs.locale("de");

// Switch back to "en"
dayjs.locale("en");
```

**Important note:** Changing the locale does not affect the existing instances.

## Date-fns

*Immutable*

[Date-fns](https://github.com/date-fns/date-fns) is a library that provides the most comprehensive, yet simple and consistent toolset\
for manipulating **JavaScript dates** in **a browser** & **Node.js**. Read the section "Why date-fns" available [here](https://date-fns.org/).

Example of adding one day to today's date:

```javascript
import { addDays, formatISO } from "date-fns";

const now = new Date(2020, 1, 10);
const tomorrow = addDays(now, 1);

// Prints "2020-02-10T00:00:00+01:00"
console.log(formatISO(now));

// Prints "2020-02-11T00:00:00+01:00"
console.log(formatISO(tomorrow));
```

Date-fns has a support of the most common locales by default. The full list can be found [here](https://github.com/date-fns/date-fns/tree/master/src/locale).

To use the locale, you need to require it:

```javascript
import { de } from "date-fns/locale";
```

And then pass an option to function:

```javascript
// "Februar"
format(now, "MMMM", { locale: de });

// "Februar"
format(tomorrow, "MMMM", { locale: de });
```

## Luxon

*Immutable*

[Luxon](https://github.com/moment/luxon) is a library for working with dates and times in JavaScript, created by one of the Moment maintainers. The whole history behind creating this library is available [here](https://github.com/moment/luxon/blob/master/docs/why.md).

Example of adding one day to today's date:

```javascript
import { DateTime } from "luxon";

const now = DateTime.local();
const tomorrow = now.plus({ days: 1 });

// Prints "2021-01-10T11:23:30.305+01:00"
console.log(now.toISO());

// Prints "2021-01-11T11:23:30.305+01:00"
console.log(tomorrow.toISO());
```

## Summary

In this article we have reviewed some of the most popular MomentJS alternatives, like **luxon, dayjs** and **date-fns**.

There are more less used libraries for handling dates, but some of them are not fully shipped with necessary functionalities, some are not updated anymore.

Always make sure to consider alternative libraries for handling dates before installing Moment and your project will definitely benefit from that.