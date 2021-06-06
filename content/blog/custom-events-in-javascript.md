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

Both, Event and CustomEvent receive constructor parameters, apart from describing the name of the Event, describe also the configuration.

#### Argument #1 - Name

The first argument, passed to the constructor is the name of the Custom Event, which is case-insensitive and can contain any string.

There is no difference in naming our event **onLogout** or **onlogout**, it will be always the same event.

#### Argument #2 - Configuration

The second argument describes the behaviour of the Custom Event:

* **bubbles** - specifies if an event should be propagated to the parent elements

  By default, this property is set to **false**, which means that the Event is not propagated.

  If set to **true**, any parent element can listen to the Custom Event, triggered by one of its children. 
* **cancelable** - specifies if an event should be cancelable

  It doesn't have a default value for each cases, since it can be set either to **true** or **false**, depending on a context of the execution.

  All Native DOM Events are cancelable by default, so we can execute **event.preventDefault()** or them and pretend that they never happened.

  If set to **false**, firing the **event.preventDefault()** has no effect.

## Event vs. CustomEvent

## Dispatch A Custom Event

## Listen A Custom Event

## Code Example

## Summary