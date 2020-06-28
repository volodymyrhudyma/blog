---
title: 5 things I've learned during 3 years of React
tag:
  - React
teaser: Recently it turned out, that I have been working with React for a little
  over 3 years, so now is the perfect time to summarize what I learned during
  this adventure...
date: 2020-06-28T10:05:49.440Z
---
Recently it turned out, that I have been working with React for a little over 3 years, so now is the perfect time to summarize what I learned during this adventure.

Actually, all the things we are referring to here are not strictly related to the React library, they could be used by any software developer, regardless of their experience with any programming language.

Mastering them is one of the keys to becoming a good programmer and a valuable person in the team.

## Keep It Simple, Stupid

The first and most important principle is called "**KISS**" (Keep It Simple, Stupid).

It states that most systems work best if they are kept simple rather than made complicated, so simplicity should be a primary objective and any unnecessary complexions should be avoided wherever possible.

Usually the problems we face in a programming world have much, much more than the only solution. 

In most cases, the first way of reacting to the problem is not the most optimal one, but the one most often chosen.

There are various reasons for this, such as pressure from the client or the desire to complete this task faster and move on to the next one, etc.

It's extremely hard to avoid violating this principle, as we can see from the amount of legacy code developers have to support, but it's definitely possible.

So what do I do to keep things simple? The answer is - **write less code whenever possible without sacrificing readability**.

#### Real-world example

Imagine, you have to display how many **hours** passed between 2 given dates: "**2020-06-26 13:00**" and "**2020-06-28 18:20**" (date format is **YYYY-MM-DD HH:mm**).

The first solution, that came to my mind is to use the `Date` object:

```javascript
const calculateHoursDiff = (startDate, endDate) => {
  const diff = Math.abs(new Date(endDate) - new Date(startDate)) / 36e5;
  const [hours] = diff.toString().split(".");
  return `${hours} hours`;
};

// Prints "53 hours"
calculateHoursDiff(
  "2020-06-26 13:00",
  "2020-06-28 18:20",
);

```

Seems pretty clear, but hey, are all those lines of code are really necessary to complete such a simple task?

Do we really need the `Math.abs`? 

Why do we have to divide the diff result by `36e5`? 

Where does this strange number `36e5` come from? 

Why do we need to convert `diff` to string and split it?

Don't you feel like there are too many questions for 3 lines of code, even though they are easy to answer?

Let's search for alternative solutions.

#### Using moment.js library

```javascript
import moment from "moment";

const calculateHoursDiff = (startDate, endDate) => {
  const diff = moment(endDate).diff(moment(startDate), "hours");
  return `${diff} hours`;
};

// Prints "53 hours"
calculateHoursDiff(
  "2020-06-26 13:00",
  "2020-06-28 18:20",
);
```

Seems much better, as we use popular and tested external library, that implements diffing algorytm internally.

There is a small drawback in this solution, as it requires a bit of library knowledge.

#### Using date-fns library

> **date-fns** is a modern JavaScript date utility library. It provides the most comprehensive, yet simple and consistent toolset for manipulating **JavaScript dates** in **a browser** & **Node.js**.

```javascript
import { differenceInHours } from 'date-fns';

const calculateHoursDiff = (startDate, endDate) => {
  const diff = differenceInHours(new Date(endDate), new Date(startDate));
  return `${diff} hours`;
};

// Prints "53 hours"
calculateHoursDiff(
  "2020-06-26 13:00",
  "2020-06-28 18:20",
);
```

In the example above we import ready-to-use `differenceInHours` function that calculates the difference for us.

## Readability over everything

*The solution should not be more complex than the problem.*

This is the second most important thing I have learned in the last years.

**Your goal** is to write code that is **transparent** for any human being, who knows the programming language you use.

Why do we neglect readability?

* **in favor of performance**

  The truth is that the vast majority of the applications we build do not require strong performance optimizations, unless they are complex app that will be maintained for decades. 

  It doesn't really matter if your table component in the landing page does a few extra re-renders, as the user wouldn't even notice it.

  What matters is the client's budget, which will be spent on the refactoring.
* **we think it would be someone else's problem**

  You feel the pressure, the deadline is tight and the fix to the annoying bug that occurred just a few hours before the release has not yet been found.

  After hundreds of different solutions have been tried out, the one that works has been finally detected.

  As always, `// TODO refactor` comment is added, and the change is pushed to the repository.

  The partial success has been achieved at the price of unnecessary complexity, duplication, latent errors, and vast problems with long-term maintenance.

  We know, but choose to ignore the likelihood that most of our code is too complex to maintain over decades or longer.

  It will be someone else’s problem. 

  We live in the now.
* **we are not capable of finding better solution**

## Read the documentation

## Write tests

## Learn from your team