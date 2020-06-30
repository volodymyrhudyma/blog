---
title: 5 things I have learned during 3 years of React
tag:
  - React
teaser: Recently it turned out, that I have been working with React for a little
  over 3 years, so now is the perfect time to summarize what I have learned
  during this adventure...
date: 2020-07-01T10:05:49.440Z
---
Recently it turned out, that I have been working with React for a little over 3 years, so now is the perfect time to summarize what I learned during this adventure.

All the principles we are referring to here are not strictly related to the React library, they can be used by any software developer, regardless of their experience with any programming language.

Mastering them is one of the keys to becoming a good programmer and a valuable person in the team.

## Keep It Simple, Stupid

*The first and most important principle is called "**KISS**" (Keep It Simple, Stupid).*

It states that most systems work best if they are kept simple rather than made complicated, so simplicity should be a primary objective and any unnecessary complexities should be avoided wherever possible.

Usually, the problems we face in a programming world have much, much more than the only solution. 

In most cases, the first way of reacting to the problem is not the most optimal one, but the one most often chosen.

There are various reasons for this, such as pressure from the client or the desire to complete this task faster and move on to the next one, etc.

It is extremely hard to avoid violating this principle, as we can see from the amount of legacy code developers have to support, but it is definitely possible.

So what do I do to keep things simple? The answer is - **write less code whenever possible without sacrificing readability**.

#### Real-world example

Imagine, you have to display how many **hours** passed between 2 given dates: "**2020-06-26 13:00**" and "**2020-06-28 18:20**" (the date format is **YYYY-MM-DD HH:mm**).

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

It looks pretty clear, but hey, are all these lines of code really necessary to complete such a simple task?

Do we really need the `Math.abs`? 

Why do we have to divide the diff result by `36e5`? 

Where does this strange number `36e5` come from? 

Why do we have to convert `diff` into a string and split it?

Do not you feel that there are too many questions for 3 lines of code, even though they are easy to answer?

Let us look for alternative solutions.

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

Looks much better, because we use a popular and tested external library, that implements diffing algorithm internally.

This solution has a small disadvantage - it requires a bit of library knowledge.

#### Using date-fns library

> **date-fns** is a modern JavaScript date utility library. It provides the most comprehensive, yet simple and consistent toolset for manipulating **JavaScript dates** in **a browser** & **Node.js**.

```javascript
import { differenceInHours } from "date-fns";

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

In the example above we import the ready-to-use function `differenceInHours`, which calculates the difference for us.

## Readability over everything

*The solution should not be more complex than the problem.*

This is the second most important thing I have learned in the last few years.

**Your goal** is to write code that is **transparent** to everyone, who knows the programming language you use.

Why do we neglect readability?

* **for the sake of performance**

  The truth is that the vast majority of the applications we build do not require strong performance optimizations unless they are very complex. 

  It does not really matter if your table component on the landing page does a few extra re-renders, as the user would not even notice it.
* **we think it would be someone else's problem**

  You feel the pressure, the deadline is tight and the fix to the annoying bug that occurred just a few hours before the release has not yet been found.

  After hundreds of different solutions have been tried out, the one that works has been finally detected.

  As always, `// TODO refactor` comment is added, and the change is pushed to the repository.

  Partial success has been achieved at the price of unnecessary complexity, duplication, latent errors, and vast problems with long-term maintenance.

  We know, but choose to ignore the likelihood that most of our code is too complex to maintain over decades or longer.

  It will be someone else’s problem. 

  We live in the now.
* **we lack the expertise**

  This is one of the reasons why legacy code is produced because finding the most elegant solutions requires a certain amount of knowledge.

#### Bad

```typescript
const getActiveUsers = (users) => {
  let activeUsers = [];
  for(let i = 0; i < users.length; i++) {
    const user = users[i];
    if(user.isActive) {
      activeUsers.push(user);
    }
  }
  return activeUsers;
};
```

#### Good

```typescript
const getActiveUsers = (users) => {
  return users.filter(user => user.isActive);
};
```

## Read the documentation

*Documentation is a gift. Make sure you open it, read it, and use it.*

Documentation is the only resource that covers all aspects of the technology. 

You will never learn as much by browsing through articles or viewing tutorials, as by simply reading the documentation from start to finish.

Reading it takes time, just like any other learning process. 

If you feel exhausted, take a short break, do a few short exercises, and clear your head. 

Remember, that it is impossible to learn everything thoroughly and in a very short time.

As the saying goes, **Rome was not built in a day**.

Personally, I did not like to read the docs, because I wanted to use the technology as soon as possible until I realized that my approach leads to bad code due to my ignorance.

Times are changing and now there is no room for doubt about how to start learning new technologies.

## Write tests

*\- Should I write tests?*\
*\- Yes, yes, and yes!*

Covering an application with tests has many advantages. Here are some of them:

* tests provide a convenient way to ensure the application is not broken unless they all pass
* tests allow us to spend less time on manual testing
* tests ensure that your code is of good quality

The only possible answer to the question: "**Should I write tests?**" should be: "**Yes!**", unless you are just checking the market fit.

One of the main reasons, why we do not write tests is the lack of budget. 

Typically, having good test coverage requires 20-30% more time spent on development.

They just seem too expensive.

This may be true in the short term, but if we take into consideration the time you will need to fix all the annoying bugs that could be avoided by writing tests, then writing tests can actually save a lot of time and money.

Do not get me wrong, tests will not eliminate all errors, but they can drastically reduce their number.

They give you and your partners much greater confidence in applying the changes, refactoring the code, deploying to the production as having all of them passing ensures that nothing is broken.

#### Test bug fixes

Unfortunately, we are not able to prevent all errors in our applications.

But we can prevent them from showing up a second time. 

**Cover each fix with unit tests** to ensure that it does not break again at this point once more.

Suppose that we have the following component, which is not rendering proper content:

```javascript
const Example = ({ isFetching, data }) => (
  <Wrapper>
    {!isFetching ? <Loader /> : <DataTable data={data} />
  </Wrapper>
);
```

Have you succeeded in discovering a mistake?

Right, we should have written `isFetching` instead of `!isFetching`.

Imagine this bug was noticed on the production and you have to make a quick fix.

To ensure that this situation never happens again, it is good practice to cover this case with a simple unit test:

```javascript
describe("Example component", () => {
  it("should render loader if fetching", () => {
    const component = shallow(<Example isFetching />);
    expect(component.find(Loader)).toBeTruthy();
  });
  
  it("should render data table if not fetching", () => {
    const component = shallow(<Example isFetching={false} />);
    expect(component.find(DataTable)).toBeTruthy();
  });
});
```

## Do not make everything reusable

*Messy, but reusable code should not be produced.*

Reusable components are those that can be used multiple times in your React application.

In general, it is a good idea to create as many reusable components as possible to produce less code and thus fewer errors.

But we do not live in a perfect world, so the components we try to reuse, sometimes do not look exactly the same on various pages, but differ only slightly.

So how should we deal with such inconsistencies? 

By creating new props that indicate what exactly is to be reflected in a different way.

Having a lot of these props makes the code messy and not clear enough to be considered readable.

If it is necessary, you may need to **consider creating separate components**.

#### Bad

```javascript
<Card
  title={title}
  subTitle={subTitle}
  showReadMore={isRowLayout}
  readMoreIcon={isRowLayout && icon}
  columns={isColumnLayout && 2}
/>
```

One `Card` component handles 2 layouts that are completely different.

#### Good

```javascript
<ColumnCard
  title={title}
  subTitle={subTitle}
  columns={2}
/>
    
<RowCard
  title={title}
  subTitle={subTitle}
  readMoreIcon={icon}
/>
```

We have created separate `ColumnCard` and `RowCard` components. 

Each of them is responsible for rendering their own layout.

## Summary

In this article, I have shared with you some principles that I consider to be the most important takeaways from the last few years of working with React.

They all seem obvious, but it is really important to keep them in mind when building different types of applications.

The truth is that most of us will not be able to understand them until we fail each one.

**Do not be afraid to fail, be afraid not to learn from your mistakes.**