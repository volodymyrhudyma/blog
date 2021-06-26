---
title: Navigate To The Previous/Next Page in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-06-27T08:03:36.170Z
---






Redirecting users from one page to another is a very common in web applications. 

In most cases, we know exactly on what page users should land after clicking a link, but sometimes we don't.

Imagine implementing a profile page that is accessible both, from the page A and page B.

If it contained a button that should redirect to the previous page, it is hard to find out what page users came from, so we just need a way to tell the browser: "Hey, I don't know what page did they come from, so just redirect them one step back" without specifying the redirect path.

## History API

**History API** provides an access to the browser's history via the **window.history** by exposing useful methods and properties that let you navigate back and forth through the user's history, and manipulate contents of the history stack.

For the purpose of our today's task it provides three methods:

* **window.history.back()**

  This method acts exactly the same way as the browser's back button.
* **window.history.forward()**

  This method acts exactly the same way as the browser's forward button.
* **window.history.go(\[delta])**

  This method loads specific page from the browser's history.

  One argument that is accepted, is called **delta** and it specifies the position in the history we want to move at.

  For example:

  * **window.history.go(-1)** is equal to **window.history.back()**
  * **window.history.go(\[0])** reloads the current page
  * **window.history.go(1)** is equal to **window.history.forward()**

## **Navigate Back**

As you already know, to navigate back, we use **window.history.back()** or **window.history.go(-1)** methods:

```javascript
const navigateBack1 = () => {
  window.history.back();
};

const navigateBack2 = () => {
  window.history.go(-1);
};
```

## Navigate Forward

To navigate forward in the history, we use **window.history.forward()** or **window.history.go(1)**:

```javascript
const navigateForward1 = () => {
  window.history.forward();
};

const navigateForward2 = () => {
  window.history.go(1);
};
```

## Summary

Summary