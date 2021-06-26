---
title: Navigate To The Previous/Next Page In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to navigate to the Previous and Next page using the
  History API in JavaScript.
shareImage: /img/navigsation-in-javascript.jpg
teaser: Redirecting users from one page to another is a very common operation in
  web applications. In most cases we know exactly which page the user should
  land on after clicking a link, but sometimes we don't. Imagine you are
  implementing a profile page that is accessible from both, page A and page B...
date: 2021-06-26T08:03:36.170Z
---
Redirecting users from one page to another is a very common operation in web applications. 

In most cases we know exactly which page the user should land on after clicking a link, but sometimes we don't.

Imagine you are implementing a profile page that is accessible from both, page A and page B.

If it contained a button that should redirect to the previous page, it's hard to figure out which page users came from, so we need a way to tell the browser: "Hey, I don't know which page they came from, so just redirect them one step back", without specifying the redirect path.

## History API

The **History API** provides access to browsing history via **window.history** by providing useful methods and properties that allow you to navigate back and forth through the user's history and manipulate the contents of the history stack.

For the purpose of our today's task it provides three methods:

* **window.history.back()**

  This method behaves exactly like the browser's back button.
* **window.history.forward()**

  This method behaves exactly like the browser's forward button.
* **window.history.go(\[delta])**

  This method loads a specific page from the browser's history.

  One argument that is accepted is called **delta** and specifies the position in the history we want to go to.

  For example:

  * **window.history.go(-1)** is equal to **window.history.back()**
  * **window.history.go(\[0])** reloads the current page
  * **window.history.go(1)** is equal to **window.history.forward()**

## Navigate Back

As you already know, to navigate back, we use the **window.history.back()** or **window.history.go(-1)** methods:

```javascript
const navigateBack1 = () => {
  window.history.back();
};

const navigateBack2 = () => {
  window.history.go(-1);
};
```

## Navigate Forward

To navigate forward in history, we use **window.history.forward()** or **window.history.go(1)**:

```javascript
const navigateForward1 = () => {
  window.history.forward();
};

const navigateForward2 = () => {
  window.history.go(1);
};
```

## The Demo

To see how the History API works, let's use the browser's console to run the above methods:

![History API Demo](/img/history-api-demo.gif "History API Demo")

Actions taken in the above demo:

* Navigate from **google.com** to **vhudyma-blog.eu**
* Check the History state
* Navigate to the first article
* Check the History state
* Go back by executing **window.history.back();**
* Move forward by executing **window.history.forward();**

## Summary

In this article, we learned how to use the History API to move back and forward programatically in the web application.

These methods are useful when you have more than one entry point to a particular page that contains a back button to redirect users to their previous location, which may be unknown.