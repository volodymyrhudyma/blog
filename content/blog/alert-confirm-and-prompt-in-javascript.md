---
title: Alert, Confirm And Prompt In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to use Alert, Confirm and Prompt interaction methods
  in JavaScript to display an alert box that requires some action from users.
shareImage: /img/interaction-in-javascript.jpg
teaser: Interaction with users is one of the most important parts of any web
  application and it can be done in a few different ways. You can either create
  a nice-looking, custom form to gather data, or use some built-in functions to
  trigger....
date: 2021-06-14T18:33:01.654Z
---
Interaction with users is one of the most important parts of any web application and it can be done in a few different ways.

You can either create a nice-looking, custom form to gather data, or, sometimes (when building Minimum Viable Product) use some built-in functions to trigger default browser popups that require some action to be taken.

## Alert

An **alert(text)** method instructs the browser to display an alert box with a specified message and "OK" button:

```javascript
alert("Hello, world");
```

It is useful when you don't want your users to miss an important information because it prevents users from browsing the website until the button is pressed.

This is how it looks in Google Chrome:

![Alert In Google Chrome](/img/screenshot-2021-06-13-at-20.45.14.png "Alert In Google Chrom")

## Confirm

The **confirm(message)** method instructs the browser to display a dialog with "OK" and "Cancel" buttons and waits for user to click one of two buttons:

```javascript
const result = confirm("Do you want to proceed?");
```

It accepts a value that is displayed to users and returns **true** if the user pressed "OK" button, otherwise - **false**.

This is how it looks in Google Chrome:

![Confirm In Google Chrome](/img/screenshot-2021-06-13-at-22.02.56.png "Confirm In Google Chrome")

Compared to Alert, it contains both, "OK" and  "Cancel" buttons.

## Prompt

The **prompt(\[message], \[defaultValue])** method instructs the browser to display a dialog with an optional message and wait until either some input is provided or the dialog is cancelled:

```javascript
const result = prompt("How old are you?", 18);
```

It accepts two arguments, which are optional:

* **message** - text that is displayed to users
* **defaultValue** - default value of the input field in the dialog

  **Important note**: in IE always supply the default value, since if nothing is passed, it will display "undefined" text by default. You need to pass at least an empty string.

It returns a value that contains the text provided by users, or **null** if the dialog was cancelled.

This is how it looks in Google Chrome:

![Prompt In Google Chrome](/img/screenshot-2021-06-13-at-20.54.17.png "Prompt In Google Chrome")

## Summary

In this article we learned 3 ways to quickly interaction with users:

* **alert** - displays a dialogue with a message and "OK" button
* **confirm** - displays a dialogue with a message, "OK" and "Cancel" buttons
* **prompt** - displays a dialogue that waits for the user's input "OK" and "Cancel" buttons

Important thing to remember is that all three methods pause the execution of a script and don't allow users to interact with the website until the required action is taken.

There are also a few limitations:

* The design of the popups is browser-specific and it can't be changed
* The location of the popup is determined by the browser, typically, it is the top center of the window.

I suggest using these methods when building the MVPs and you care more about the functionality at a given point rather than at the design.