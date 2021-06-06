---
title: Custom Events In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to create, dispatch and listen for a Custom Event in
  JavaScript. Creating a Custom Event is easy and there are three ways of doing
  that.
shareImage: /img/custom-events-in-javascript.jpg
teaser: Events is the vital part of any web application, so knowing how to
  properly handle them is a must for a good web developer. There are many
  built-in Events, which can be used on any element that extends EventTarget
  interface, like...
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
const logoutEvent = new Event("logout", {
  bubbles: true,
  cancelable: true,
  composed: false
});
```

* **CustomEvent** constructor

```javascript
const logoutEvent = new CustomEvent("logout", {
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

There is no difference in naming our event **logout** or **Logout**, it will be always the same event.

#### Argument #2 - Configuration

The second argument describes the behaviour of the Custom Event:

* **bubbles** - specifies if an event should be propagated to the parent elements

  By default, this property is set to **false**, which means that the Event is not propagated.

  If set to **true**, any parent element can listen to the Custom Event, triggered by one of its children. 
* **cancelable** - specifies if an event should be cancelable

  It doesn't have a default value for each cases, since it can be set either to **true** or **false**, depending on a context of the execution.

  All Native DOM Events are cancelable by default, so we can execute **event.preventDefault()** or them and pretend that they never happened.

  If set to **false**, firing the **event.preventDefault()** has no effect.
* **composed** - specified whether or not the event will propagate across the shadow DOM boundary into the standard DOM

  This is useful if you need to dispatch an action in the Web Component and listen it on a parent element in your DOM.

  Note that the propagation only happens if **bubbles** property is set to **true**.

You may have noticed that we didn't say a word about the **detail** property, but don't worry, we will explain it in the following section.

## Event vs. CustomEvent

The main difference between Event and CustomEvent is the ability to pass the data to the listener.

When using CustomEvent, you are given the **detail** property that can be retrieved as **event.detail** later on:

```javascript
const logoutEvent = new CustomEvent("logout", {
  detail: {
    userId: "123456789",
  },
  bubbles: true,
  cancelable: true,
  composed: false,
});

// Button click handler
const handleClick = event => {
  // ...
  event.dipatchEvent(logoutEvent);
};

// Logout event handler
// We are able to get the data from the "event.detail"
const handleLogout = event => {
  console.log(event.detail);
  console.log("User has been logged out successfully");
};

// Find the button and attach click event listener
const button = document.getElementsByTagName("button")[0];
button.addEventListener("click", e => {
  e.currentTarget.dispatchEvent(logoutEvent);
});

// Listen for logout event and execute a handler
document.addEventListener("logout", handleLogout);
```

> A quick explanation what is going on in the above code:
>
> * We create a Custom **logout** Event
> * We search for a button element on the page and listen for a **click** on it
> * After the button is clicked, we fire **handleClick** that fires Custom Event by using **event.dispatchEvent(eventObject)**
> * We listen for a Custom **logout** Event on the **document**, since an event bubbles up, and execute **handleLogout** function that has an access to the **userId** we defined in the **detail** property

When using Event constructor, you can only get the data from the **event.target** element:

```javascript
const logoutEvent = new Event("logout", {
  bubbles: true,
  cancelable: true,
  composed: false,
});

// ...

// We can get the data only from the "event.target"
// Accessing "event.detail" returns "undefined"
const handleLogout = event => {
  console.log(event.target);
  console.log("User has been logged out successfully");
};
```

## Dispatch A Custom Event

Of course, after defining a Custom Event you need to be able to fire it.

This was partly shown in the previous section.

A Custom Event can be dispatched to any object that extends the **EventTarget** interface and it includes **document** and **window** objects as well:

```javascript
// Find the "button" element
const button = document.getElementsByTagName("button")[0];

// Listen for a "click" event and dispatch "logout" event
button.addEventListener("click", e => {
  // ..
  e.currentTarget.dispatchEvent(logoutEvent);
});
```

## Listen For A Custom Event

Listening for a Custom Event is no different than listening for any built-in event.

If the **bubbles** property is set to **true**, we can listen on any parent element:

```javascript
// Listen for a "logout" event on a "document"
document.addEventListener("logout", e => {
  console.log("User has been logged out successfully");
});
```

If set to **false**, we can listen on an element it was fired from:

```javascript
// Find the "button" element
const button = document.getElementsByTagName("button")[0];

// Listen for a "click" event on the element it was fired from
button.addEventListener("logout", e => {
  console.log("User has been logged out successfully");
});
```

## Full Code Example

The full working code example can be found below:

```html
<html lang="en">
  <head>
    <title>Custom Events In JavaScript</title>
  </head>
  <body>
    <div>
      <button>Log out</button>
    </div>
  </body>
  <script>
    const logoutEvent = new CustomEvent("logout", {
      detail: {
        userId: "123456789",
      },
      bubbles: true,
      cancelable: true,
      composed: false,
    });

    const handleClick = event => {
      event.dipatchEvent(logoutEvent);
    };

    const handleLogout = event => {
      console.log(event.detail);
      console.log("User has been logged out successfully");
    };

    const button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", e => {
      e.currentTarget.dispatchEvent(logoutEvent);
    });

    document.addEventListener("logout", handleLogout);
  </script>
</html>
```

## Browser Compatibility

One of the most important things to keep in mind when doing some custom stuff in JavaScript is Browser Compatibility.

Fortunately, according to [caniuse](https://caniuse.com/?search=customevent), Custom Event API is supported for the 94,91% of the users:

![Can I Use Custom Events](/img/screenshot-2021-06-06-at-13.21.04.png "Can I Use Custom Events")

If you need to build a support for it in IE9 and higher, you can use a [polyfill](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill).

## Summary

In this article we learned about Custom Events in JavaScript that enhance the developer's experience by its simplicity and easiness of usage.

Overall, JavaScript has awesome event system, but sometimes standard built-in events are not enough for building clean and maintainable code.

Make sure to play around with Custom Events and enjoy using them in your next projects.