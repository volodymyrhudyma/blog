---
title: Objects in JavaScript
date: 2020-05-02T19:11:10.868Z
---
Everything in JavaScript, except Primitives are Objects. Understanding objects is essential in order to become  professional. 

In JavaScript, objects are collections of properties, defined as key-value pair.

## Create an object

There are a lot of different ways to create an object in JavaScript, but we'll take a look at the most popular and the shortest one:

```javascript
const user = {};
```

To create an object with properties, you have to use `key: value` syntax:

```javascript
const user = {
  name: "John",
  surname: "Doe"
};
```

In the example above `name` and `surname` are the keys and `John` and `Doe` are the values.