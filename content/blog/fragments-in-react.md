---
title: Fragments in React
tag:
  - React
promote: false
metaDescription: Learn React Fragment - a simple mechanism that allows you to
  wrap multiple child elements into a single parent without adding additional
  DOM nodes.
teaser: In React, returning multiple elements from a single component is a
  common scenario. For this to work properly, all of these elements should be
  wrapped in a parent element (we do not consider returning arrays from
  render...
date: 2020-12-29T12:00:00.000Z
---
In React, returning multiple elements from a single component is a common scenario.

For this to work properly, all of these elements should be wrapped in a parent element (we do not consider returning arrays from render).

Typically, this parent element is a simple **div** or **span**, which does not really provide any value and can even cause some problems.

## Problem

Consider the following example:

```jsx
const Table = () => (
  <table>
    <tbody>
      <tr>
        <Columns />
      </tr>
    </tbody>
  </table>
);

const Columns = () => (
  <div>
    <td>Column1</td>
    <td>Column2</td>
  </div>
);
```

You have just created two components: **Table** and **Columns**. 

The first is responsible for rendering the markup of a table, the second - for rendering the columns.

Since it is possible to have more than one column, the **Columns** component can return multiple **td** elements that need to be wrapped into a single parent element, in our example **div**.

But adding this **div** results in an invalid HTML structure:

![Invalid HTML Structure Markup](/img/screenshot-2020-12-29-at-12.44.04.png "Invalid HTML Structure Markup")

And the following warning:

![Invalid HTML Structure Warning](/img/screenshot-2020-12-29-at-12.42.57.png "Invalid HTML Structure Warning")

So, the question is: "How to fix that?".

## Fragment

The simple solution is to use **Fragment.**

> [Fragment](https://reactjs.org/docs/fragments.html) lets you group a list of children without adding extra nodes to the DOM.

React provides us with two ways of using Fragments:

```jsx
<React.Fragment>
  {/* Declare multiple elements here */}
</React.Fragment>

<>
  {/* Or here */}
</>
```

The second way is a short syntax that looks like an empty tag. 

**Important note:** The short syntax does not support **keys** or other attributes (which may be added by the React team in the future). 

## Keys

As we already know, when declaring fragments with the short syntax, it is not allowed to add a **key** attribute.

However, if we use the **React.Fragment** syntax, we can add a key, making it possible to map a collection to an array of fragments:

```jsx
const users = [
  {
    id: 1,
    name: "John",
    surname: "Doe",
  },
  {
    id: 2,
    name: "Andrew",
    surname: "Hopkins",
  },
];

const UserList = () => (
  <>
    {users.map((user) => (
      <React.Fragment key={user.id}>
        <span>{user.name}</span>
        <span>{user.surname}</span>
      </React.Fragment>
    ))}
  </>
);
```

## Performance

In some cases it is possible to use both, DOM nodes or Fragments as parent elements and nothing will break.

But then you might wonder which way is faster?

According to the [Dan Abramov](https://stackoverflow.com/questions/47761894/why-are-fragments-in-react-16-better-than-container-divs):

> 1. It’s a tiny bit faster and has less memory usage (no need to create an extra DOM node). This only has a real benefit on very large and/or deep trees, but application performance often suffers from death by a thousand cuts. This is one cut less.
> 2. Some CSS mechanisms like Flexbox and CSS Grid have a special parent-child relationship, and adding `div`s in the middle makes it hard to keep the desired layout while extracting logical components.
> 3. The DOM inspector is less cluttered. :-)

## Summary

There are many advantages to using fragments, such as:

* Cleaner HTML structure
* Slightly better performance (especially noticeable with larger trees)
* Avoidance of styling problems (which can occur because of having an additional DOM element within the specific HTML structure)

Fragments are definitely worth using and are a great replacement for DOM nodes as parent elements.

Make sure you use them as often as necessary.