---
title: Custom Events In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/custom-events-in-javascript.jpg
teaser: // TEASER
date: 2021-06-08T09:36:40.643Z
---
Events is the vital part of any web application, so knowing how to properly handle them is a must for a good web developer.

There are many built-in Events, which can be used on any element that extends **EventTarget** interface, like **onload**, **onclick**, **onchange** etc.

In some specific cases, they may be not sufficient, so JavaScript provides an extremely easy way to set up and trigger a Custom Event.

Consider a situation, where you want to clean some parts of your code after the user is logged out.

Unfortunately, there is no built-in **onlogout** event, so we may need to create our own custom one.

## Create A Custom Event

Creating a Custom Event is easy and there are three ways of doing that:

* **Event** constructor

```javascript
const onLogoutEvent = new Event("onlogout", {
  bubbles: true,
  cancelable: true,
  composed: false
});
```

* **CustomEvent** constructor

```javascript
const onLogoutEvent = new CustomEvent("onlogout", {
  detail: {},
  bubbles: true,
  cancelable: true,
  composed: false
});
```

* **document.createEvent** method (deprecated way, use one of the above two instead)

## Event/CustomEvent Constructor Parameters

## Dispatch A Custom Event

## Listen A Custom Event

## Code Example

## Summary