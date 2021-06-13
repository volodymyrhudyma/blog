---
title: Alert, Confirm And Prompt In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-06-14T18:33:01.654Z
---
Interaction with users is one of the most important parts of any web application and it can be done in a few different ways.

You can either create a nice-looking, custom form to gather data, or, sometimes (when building Minimum Viable Product) use some built-in function to trigger default browser popups that require some action to be taken.

## Alert

An **alert()** method displays an alert box with a specified message and "Ok" button:

```javascript
alert("Hello, world");
```

It is useful when you don't want your users to miss an important information, because the focus is being taken away from the current window and forces the browser to read a message.

Basically, it prevents users from browsing the website until the popup is closed.

This is how it looks in Google Chrome:

![Alert In Google Chrome](/img/screenshot-2021-06-13-at-20.45.14.png "Alert In Google Chrome")