---
title: Closures In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: META
teaser: TEASER
date: 2021-03-14T17:13:28.656Z
---
The concept of closures is not an easy thing to wrap your head around. 

A lot of experienced developers still struggle to understand it, let alone explaining to a colleague or an interview for a new job.

Today we will learn it with simple and clear explanations and a lot of practical examples.

## What Is A Closure?

A **Closure** is a combination of a function bundled together with references to its surrounding state (Lexical Environment).

That definition sounds hard enough, so maybe the following one illustrates it better.

A **Closure** is a feature that gives access to an outer function's scope from an inner function.

Basically, an inner function has an access to all variables declared outside of it:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

const getFullName = () => {
  return `${user.name} ${user.surname}`;
};

// Prints "John Doe"
console.log(getFullName());
```

In the example above, the **getFullName** function has access to the **user** variable, declared outside of it.