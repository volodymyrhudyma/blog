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

Imagine, you have to display how many **hours** passed between 2 given dates: "**2020-06-26 13:00**" and "**2020-06-28 18:00**" (date format is **YYYY-MM-DD HH:mm**).

The first solution, that came to my mind it the following:

```javascript
const calculateHoursAndMinutesDiff = (startDate, endDate) => {
  const diff = Math.abs(new Date(endDate) - new Date(startDate)) / 36e5;
  const [hours, minutes] = diff.toString().split(".");
  return `${hours} hours, ${minutes} minutes`;
};

// Prints "53 hours"
calculateHoursAndMinutesDiff(
  "2020-06-26 13:00",
  "2020-06-28 18:00",
);

```

Looks good, but hey, there are some helpful libraries for dealing with date and time in JavaScript. What if we try to use one of them?

#### Using moment.js library

```javascript
const calculateHoursAndMinutesDiff = (startDate, endDate) => {
  const diff = moment(endDate).diff(moment(startDate), 'hours');
  return `${diff} hours`;
};

// Prints "53 hours"
calculateHoursAndMinutesDiff(
  "2020-06-26 13:00",
  "2020-06-28 18:00",
);
```

Wow, much more readable.

```javascript
const calculateHoursAndMinutesDiff = (startDate, endDate) => {
    const diff = differenceInHours(new Date(endDate), new Date(startDate));
    return `${diff} hours`;
};

// Prints "53 hours"
calculateHoursAndMinutesDiff(
  "2020-06-26 13:00",
  "2020-06-28 18:00",
);
```

That's it.

## Readability over everything

## Read the documentation

## Write tests

## Learn from your team