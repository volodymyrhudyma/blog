---
title: What is "key" in React and why do we need it?
tag:
  - React
teaser: Almost each web application contains lists of elements printed to the
  screen. If you render list elements without defining the "key" prop, you will
  receive a warning message in the console. Let's find out why...
date: 2020-06-21T06:37:02.679Z
---
Almost each web application contains lists of elements printed to the screen. 

If you render list elements without defining the `key` prop:

```javascript
const List = ({ data }) => (
  <ul>
    {data.map(item => (
      <li>{item.name}</li>
    ))}
  </ul>
);

const App = () => (
  <List
    data={[
      {
        id: 1,
        name: 'One',
      },
      {
        id: 2,
        name: 'Two',
      },
    ]}
  />
);

```

You will receive a warning message in the console: `Each child in a list should have a unique "key" prop`.

This issue is easy to fix, just add a **unique** `key` prop for each `li` element which is being rendered inside of the loop:

```javascript
const List = ({ data }) => (
  <ul>
    {data.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

**Important note:** the `key` should always be unique, if React encounters 2 same keys being provided, it would show the same warning as if we didn't add it at all.

And the warning is gone! But do you know why?

Let's find out what happens behind the scenes.

## The key

> Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

Any value can be used as a key unless it's **unique**.

The most popular concept is to use `id` if you pull data from the database.

In case if you don't have `id`, it's also possible to use `index` of an element inside of the loop:

```javascript
const List = ({ data }) => (
  <ul>
    {data.map((item, index) => (
      <li key={index}>{item.name}</li>
    ))}
  </ul>
);
```

**Important note:** it's not recommended to use `index` as a `key` if an order of list elements may change. We'll see why later on.