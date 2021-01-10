---
title: The Best MomentJS Alternatives
tag:
  - JavaScript
promote: false
metaDescription: Meet the most popular MomentJS alternatives. Dayjs, Date-fns
  and Luxon are lightweight, popular and fast libraries for handling dates.
teaser: When it comes to working with dates in JavaScript applications, nobody
  wants to mess with the Date object and looks for some ready-made libraries
  that allow easy handling of dates. One of the most popular libraries is
  MomentJS - a JavaScript date library...
date: 2021-01-11T09:15:58.726Z
---
When it comes to working with dates in JavaScript applications, nobody wants to mess with the Date object and looks for some ready-made libraries that allow easy handling of dates.

One of the most popular libraries is [MomentJS](https://momentjs.com/) - a JavaScript date library for parsing, validating, manipulating and formatting dates.

I used it for a long time without considering alternatives until I found out that it was too heavy for simple projects.

## MomentJS Overview

MomentJS is by far the most popular library for dealing with dates, but it has a lot of drawbacks compared to the newer libraries designed to work with dates.

Even the [project team](https://momentjs.com/docs/#/-project-status/) considers it a **completed** project and would not provide new features.

> We now generally consider Moment to be a legacy project in maintenance mode. It is not *dead*, but it is indeed *done*.

Moment's main drawbacks:

* **Mutability**

  The Moment object in MomentJS is mutable, meaning that operations such as add, subtract, or set change the original Moment object:

```javascript
const now = moment(); 
const tomorrow = now.add(1, "day"); 

// Prints "2021-01-11T11:01:09+01:00"
console.log(now.format());

// Prints "2021-01-11T11:01:09+01:00"
console.log(tomorrow.format());
```

To avoid such situations, you must remember to **clone** an object before doing anything with it:

```javascript
const now = moment();
const tomorrow = now.clone().add(1, "day"); 

// Prints "2021-01-10T11:02:59+01:00"
console.log(now.format());

// Prints "2021-01-11T11:02:59+01:00"
console.log(tomorrow.format());
```

* **Size**

  MomentJS does not work well with [tree shaking](https://webpack.js.org/guides/tree-shaking/) algorithms and gets very large, especially if you need full internationalization support.

  According to [Budnlephobia](https://github.com/pastelsky/bundlephobia) - a tool that shows the performance impact of including the npm package, **moment@2.29.1** takes **228.4Kb** minified and **71.2Kb** minified + gzipped:

![Bundlephobia Moment](/img/screenshot-2021-01-10-at-10.42.11.png "Bundlephobia Moment")

If you scroll down Bundlephobia, you will see that it suggests some lightweight alternatives, like **luxon**, **day-js**, **date-fns:**

![Moment Alternatives](/img/screenshot-2021-01-10-at-12.20.34.png "Moment Alternatives")

Let's go through them quickly and look at some sample code.

## Npm Trends Overview

According to the [npm trends](https://www.npmtrends.com/dayjs-vs-date-fns-vs-moment-vs-luxon), the most popular library for handling dates is still MomentJS, date-fns, dayjs and luxon are in the next places accordingly:

![Npm Trends Overview](/img/screenshot-2021-01-10-at-11.12.34.png "Npm Trends Overview")

If we look at the **Stats** section, we can see that dayjs is the youngest, lightest and highest rated alternative:

![Npm Trends Stats](/img/screenshot-2021-01-10-at-11.15.27.png "Npm Trends Stats")

## Dayjs

*Immutable*

[Dayjs](https://github.com/iamkun/dayjs) is a minimalist JavaScript library that parses, validates, manipulates, and displays date and time information for modern browsers using a largely MomentJS-compatible API.

If you are used to working with MomentJS and want to get out quickly, dayjs may be the best option to start with.

Example of adding a day to today's date:

```javascript
import dayjs from "dayjs";

const now = dayjs();
const tomorrow = now.add("1", "day");

// Prints "2021-01-10T11:28:17+01:00"
console.log(now.format());

// Prints "2021-01-11T11:28:17+01:00"
console.log(tomorrow.format())
```

By default, dayjs is shipped with the English locale only. 

If other locales are needed, they can be loaded on-demand:

```javascript
import "dayjs/locale/de";
```

Once imported, it becomes an active locale and you can switch to it or back to the default:

```javascript
// Switch to "de"
dayjs.locale("de");

// Switch back to "en"
dayjs.locale("en");
```

**Important note:** Changing the locale does not affect existing instances.

## Date-fns

*Immutable*

[Date-fns](https://github.com/date-fns/date-fns) is a library that provides the most comprehensive yet simple and consistent toolset\
for manipulating **JavaScript dates** in **a browser** & **Node.js**. Read the "Why date-fns" section available [here](https://date-fns.org/).

Example of adding a day to today's date:

```javascript
import { addDays, formatISO } from "date-fns";

const now = new Date(2020, 0, 10);
const tomorrow = addDays(now, 1);

// Prints "2020-01-10T00:00:00+01:00"
console.log(formatISO(now));

// Prints "2020-01-11T00:00:00+01:00"
console.log(formatISO(tomorrow));
```

Date-fns supports the most common locales by default. The full list can be found [here](https://github.com/date-fns/date-fns/tree/master/src/locale).

To use the locale, you must require it:

```javascript
import { de } from "date-fns/locale";
```

And then pass an option to the function:

```javascript
// "Januar"
format(now, "MMMM", { locale: de });

// "Januar"
format(tomorrow, "MMMM", { locale: de });
```

## Luxon

*Immutable*

[Luxon](https://github.com/moment/luxon) is a library for working with dates and times in JavaScript, created by one of the MomentJS maintainers. The full story behind the creation of this library is available [here](https://github.com/moment/luxon/blob/master/docs/why.md).

Example of adding a day to today's date:

```javascript
import { DateTime } from "luxon";

const now = DateTime.local();
const tomorrow = now.plus({ days: 1 });

// Prints "2021-01-10T11:23:30.305+01:00"
console.log(now.toISO());

// Prints "2021-01-11T11:23:30.305+01:00"
console.log(tomorrow.toISO());
```

Luxon uses the native **Intl API** to provide easy-to-use internationalization.

> [The Intl object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) is the namespace for the ECMAScript Internationalization API, which provides language sensitive string comparison, number formatting, and date and time formatting.

```javascript
const dateTime = DateTime.local()
  .setLocale("de")
  .toLocaleString(DateTime.DATE_FULL);
  
// Prints "10. Januar 2021"
console.log(dateTime);
```

Refer to the [installation guide](https://moment.github.io/luxon/docs/manual/install.html) for instructions on how to ensure that your platform has access to the Intl APIs and ICU data to power it. 

**This is especially important for Node, which does not ship with ICU data by default**.

To learn how locales work in luxon, see the [official documentation](https://moment.github.io/luxon/docs/manual/intl.html).

## Summary

In this article, we have reviewed some of the most popular MomentJS alternatives, such as **luxon, dayjs** and **date-fns**.

There are other lesser-used libraries for handling dates, but some of them do not fully ship with the necessary functionality, and others are no longer updated.

Always make sure to consider alternative date handling libraries before installing MomentJS, and your project will definitely benefit from that.