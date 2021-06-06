---
title: Custom Events In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to create, dispatch, and listen for a Custom Event in
  JavaScript. Creating a Custom Event is easy and there are three ways to do it.
shareImage: /img/custom-events-in-javascript.jpg
teaser: Events are the crucial part of any web application, so knowing how to
  handle them properly is a must for a good web developer. There are many
  built-in events that can be used on any element that extends the EventTarget
  interface, such as...
date: 2021-06-08T09:36:40.643Z
---
Events are the crucial part of any web application, so knowing how to handle them properly is a must for a good web developer.

There are many built-in events that can be used on any element that extends the **EventTarget** interface, such as **onload**, **onclick**, **onchange**, etc.

In some special cases they may not be sufficient, therefore JavaScript provides an extremely simple way to set up and trigger a Custom Event.

Consider a situation where you want to clean up some parts of your code after the user is logged out.

Unfortunately, there is no built-in **onlogout** event, so we may need to create our own custom one.

## Create A Custom Event

Creating a Custom Event is easy and there are three ways to do it:

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

* **document.createEvent** method (deprecated way, use one of the two above instead)

## Event/CustomEvent Constructor Parameters

Both Event and CustomEvent are given constructor parameters that describe the name and configuration of the event.

#### Argument #1 - Name

The first argument, passed to the constructor is the name of the Custom Event, which is case-insensitive and can contain any string.

It doesn't matter if we name it **logout** or **logout**, it will always be the same event.

#### Argument #2 - Configuration

The second argument describes the behaviour of the Custom Event:

* **bubbles** - specifies whether an event should be propagated to the parent elements

  By default, this property is set to **false**, which means that the Event is not propagated.

  When set to **true**, any parent element can listen to the Custom Event raised by one of its children. 
* **cancelable** - specifies whether an event should be cancelable

  It has no default value, as it can be set to either **true** or **false**, depending on the context of execution.

  All Native DOM events are cancelable by default, so we can run **event.preventDefault()** and pretend they never happened.

  If set to **false**, triggering **event.preventDefault()** has no effect.
* **composed** - specifies whether or not the event will propagate across the shadow DOM boundary into the standard DOM

  This is useful if you need to dispatch an action in the Web Component and listen it on a parent element in your DOM.

  Note that the propagation only occurs if **bubbles** property is set to **true**.

You may have noticed that we didn't say a word about the **detail** property, but don't worry, we'll explain it in the next section.

## Event vs. CustomEvent

The main difference between Event and CustomEvent is the ability to pass the data to the listener.

When using CustomEvent, you get the **detail** property, which can later be retrieved as **event.detail**:

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

> A brief explanation of what is going on in the above code:
>
> * We create a Custom **logout** Event
> * We look for a button element on the page and attach a **click** listener on it
> * After the button is clicked, we fire **handleClick**, which fires Custom Event by using **event.dispatchEvent(eventObject)**
> * We listen for a Custom **logout** Event on the **document**, as an event bubbles up, and execute the **handleLogout** function, which has access to the **userId** we defined in the **detail** property

If you use the Event constructor, you can only get the data from the **event.target** element:

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

After you define a Custom Event, you obviously need to be able to fire it.

This was partially shown in the previous section.

A Custom Event can be sent to any object that extends the **EventTarget** interface, and this includes **document** and **window** objects as well:

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

If set to **false**, we can listen on an element from which it was fired:

```javascript
// Find the "button" element
const button = document.getElementsByTagName("button")[0];

// Listen for a "click" event on the element it was fired from
button.addEventListener("logout", e => {
  console.log("User has been logged out successfully");
});
```

## The Complete Code Example

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

Fortunately, according to [caniuse](https://caniuse.com/?search=customevent), the Custom Event API is supported for the 94.91% of the users:

![Can I Use Custom Events](/img/screenshot-2021-06-06-at-13.21.04.png "Can I Use Custom Events")

If you need to build a support for it in IE9 and higher, you can use a [polyfill](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill).

## Summary

In this article, we have learned about Custom Events in JavaScript, which enhances the developer's experience with its simplicity and ease of use. 

Overall, JavaScript has a great event system, but sometimes the default built-in events are not enough to create clean and maintainable code. 

Be sure to play around with Custom Events and enjoy using it in your next projects.