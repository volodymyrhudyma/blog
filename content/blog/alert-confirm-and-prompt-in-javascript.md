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

An **alert()** method instructs the browser to display an alert box with a specified message and "OK" button:

```javascript
alert("Hello, world");
```

It is useful when you don't want your users to miss an important information because it prevents users from browsing the website until the button is pressed.

This is how it looks in Google Chrome:

![Alert In Google Chrome](/img/screenshot-2021-06-13-at-20.45.14.png "Alert In Google Chrom")

## Prompt

The **prompt(\[message], \[defaultValue])** method instructs the browser to display a dialog with an optional message and wait until either some input is provided or the dialog is cancelled:

```javascript
const age = prompt("How old are you?", 18);
```

It accepts two arguments, which are optional:

* **message** - text that is displayed to users
* **defaultValue** - default value of the input field in the dialog

  **Important note**: in IE always supply the default value, since if nothing is passed, it will display "undefined" text by default. You need to pass at least an empty string.

It returns a value that contains the text provided by users, or **null** if the dialog was cancelled.

This is how it looks in Google Chrome:

![Prompt In Google Chrome](/img/screenshot-2021-06-13-at-20.54.17.png "Prompt In Google Chrome")

Note that compared to Alert, it contains both, "OK" and  "Cancel" buttons.