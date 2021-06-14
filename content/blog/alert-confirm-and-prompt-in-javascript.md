---
title: Alert, Confirm And Prompt In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to use Alert, Confirm and Prompt interaction methods
  in JavaScript to display an alert box that requires action from the user.
shareImage: /img/interaction-in-javascript.jpg
teaser: Interaction with users is one of the most important parts of any web
  application and can be done in a number of different ways. You can either
  create a nice looking custom form to collect data, or sometimes (when creating
  Minimum Viable Product) use some built-in functionality to trigger...
date: 2021-06-14T18:33:01.654Z
---
Interaction with users is one of the most important parts of any web application and can be done in a number of different ways.

You can either create a nice looking custom form to collect data, or sometimes (when creating Minimum Viable Product) use some built-in functionality to trigger standard browser popups that require a specific action.

## Alert

An **alert(text)** method tells the browser to display an alert box with a specific message and "OK" button:

```javascript
alert("Hello, world");
```

It's useful if you don't want your users to miss an important piece of information because it prevents users from browsing the site until the button is pressed.

Here's what it looks like in Google Chrome:

![Alert In Google Chrome](/img/screenshot-2021-06-13-at-20.45.14.png "Alert In Google Chrom")

## Confirm

The **confirm(message)** method tells the browser to display a dialogue with "OK" and "Cancel" buttons, and waits for the user to click either button:

```javascript
const result = confirm("Do you want to proceed?");
```

It accepts a value displayed to the user and returns **true** if the user pressed "OK" button, otherwise - **false**.

Here's what it looks like in Google Chrome:

![Confirm In Google Chrome](/img/screenshot-2021-06-13-at-22.02.56.png "Confirm In Google Chrome")

Compared to Alert, it contains both, "OK" and  "Cancel" buttons.

## Prompt

The **prompt(\[message], \[defaultValue])** method tells the browser to display a dialogue with an optional message and wait until either input is given or the dialogue is canceled:

```javascript
const result = prompt("How old are you?", 18);
```

Two arguments are accepted, which are optional:

* **message** - text that will be displayed to the user
* **defaultValue** - default value of the input field in the dialogue

  **Important note**: Always specify the default value in Internet Explorer, because if nothing is passed, it will display "undefined" text by default. You must pass at least an empty string.

A value will be returned containing the text specified by the user, or **null** if the dialogue was aborted.

Here's what it looks like in Google Chrome:

![Prompt In Google Chrome](/img/screenshot-2021-06-13-at-20.54.17.png "Prompt In Google Chrome")

## Summary

In this article, we learned 3 ways to quickly interact with users:

* **alert** - displays a dialogue with a message and "OK" button
* **confirm** - displays a dialogue with a message, "OK" and "Cancel" buttons
* **prompt** - displays a dialogue that waits for the user's input, "OK" and "Cancel" buttons

Importantly, all three methods interrupt the execution of a script and do not allow the user to interact with the site until the desired action has been performed.

There are also a few limitations:

* The design of the popup is browser specific and cannot be changed
* The position of the popup is determined by the browser, typically, it is the top center of the window.

I suggest using these methods if you are building the MVPs and you care more about functionality at a given point than design.