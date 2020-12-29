---
title: Fragments in React
tag:
  - React
promote: false
metaDescription: Learn React Fragment - a simple mechanism that allows you to
  wrap multiple children element in a single parent without adding an extra DOM
  element.
teaser: In React, it is a common scenario to return multiple elements from a
  single component. In order to work properly, all those elements should be
  wrapped in one parent element (we are not taking in consideration returning
  arrays from render...
date: 2020-12-29T12:00:00.000Z
---
In React, it is a common scenario to return multiple elements from a single component.

In order to work properly, all those elements should be wrapped in one parent element (we are not taking in consideration returning arrays from render).

Typically, that parent element is a simple **div** or **span**, that does not really provide any value and even can cause a harm.

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

You just created two components: **Table** and **Columns**. 

The first one is responsible for rendering table's markup, the second one - for rendering columns.

Since it is possible to have more than one column, the **Columns** component can return multiple **td** elements, that have to be wrapper in a single parent element, **div** in our example.

But adding that div results in having an invalid HTML structure:

![Invalid HTML Structure Markup](/img/screenshot-2020-12-29-at-12.44.04.png "Invalid HTML Structure Markup")

And the following warning:

![Invalid HTML Structure Warning](/img/screenshot-2020-12-29-at-12.42.57.png "Invalid HTML Structure Warning")

So, the question is: "How to fix that?".

## Fragment

The simple solution is just to use **Fragment.**

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

The second one is a short syntax that looks like an empty tag. 

**Important note:** Short syntax does not support **keys** or any other attributes (which may possibly be added in the future). 

## Key

As we already know, when Fragment is declared using the short syntax, we are not allowed to add a **key** attribute.

But if we use **React.Fragment** syntax, we can add a key, which makes it possible to map a collection to an array of fragments:

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

In some cases, it is possible to use both, DOM nodes or Fragments as a parent elements and nothing will be broken.

But you may wonder then, which way is faster?

According to the [Dan Abramov](https://stackoverflow.com/questions/47761894/why-are-fragments-in-react-16-better-than-container-divs):

> 1. It’s a tiny bit faster and has less memory usage (no need to create an extra DOM node). This only has a real benefit on very large and/or deep trees, but application performance often suffers from death by a thousand cuts. This is one cut less.
> 2. Some CSS mechanisms like Flexbox and CSS Grid have a special parent-child relationship, and adding `div`s in the middle makes it hard to keep the desired layout while extracting logical components.
> 3. The DOM inspector is less cluttered. :-)

## Summary

Using Fragments brings a lot of advantages, like cleaner HTML structure, slightly better performance, especially noticeable with the larger trees and avoiding styling problems which may occur because of having an extra DOM element within the specific HTML structure.

Fragments are definitely worth using and are a great replacement for DOM nodes as a parent elements.