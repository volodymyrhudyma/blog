---
title: Event Bubbling In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn about the concept of Event Bubbling in JavaScript. Event
  Bubbling is a process of running event handlers from the innermost element all
  the way up on its parents..
shareImage: /img/event-bubbling-in-javascript.jpg
teaser: Have you ever noticed that a click handler added to the parent node also
  fires when child elements are clicked? It may be confusing at first, but
  that's how Event Bubbling works in JavaScript. In order to be able to properly
  handle different types of events on DOM nodes...
date: 2021-05-23T07:05:21.928Z
---
Have you ever noticed that a click handler added to the parent node also fires when child elements are clicked?

It may be confusing at first, but that's how Event Bubbling works in JavaScript.

In order to be able to properly handle different types of events on DOM nodes, knowing this concept is a must for successful development of web products, even though we don't come across it very often.

## Event Bubbling

Event Bubbling is a type of event propagation where the event first triggers on the innermost target element (the one we clicked), and then triggers all the way up on parent elements until it reaches the outermost DOM element or window object.

> Window is not a DOM node but it implements the **EventTarget** interface, so we are handling it like it was the parent node of the document object.

Consider the following example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div>
      <button onclick="console.log('Button is clicked')">Click me</button>
    </div>
  </body>
</html>
```

We attached a simple click event listener to the button element and each time the button is clicked, we print "**Button is clicked**" text to the console.

But, due to the Event Bubbling, clicking the button element triggers events on each of its parents: **div**, **body**, **html**, **document**, **window**:

```html
<!DOCTYPE html>
<html lang="en" onclick="console.log('HTML clicked')">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div onclick="console.log('Div is clicked')">
      <button onclick="console.log('Button is clicked')">Click me</button>
    </div>
    <script>
      document.addEventListener('click', () => {
        console.log('Document is clicked');
      });
      window.addEventListener('click', () => {
        console.log('Window is clicked');
      });
    </script>
  </body>
</html>
```

 Now, when events listeners were attached to all button's parent elements, let's see what happens after clicking the button:

![Event Bubbling](/img/event-bubbling.gif "Event Bubbling")

A click on a button element runs click handler for:

* itself
* parent div
* body element
* html element
* document element
* window object

The main reason why the concept is called Event Bubbling is because events bubble from the inner element all the way up.

## Do All Events "Bubble"?

The short answer is - no.

Such events like: **focus**, **blur** and others, less frequently used, don't bubble up.

Consider the following example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div onfocus="console.log('Div is focused')">
      <button onfocus="console.log('Button is focused')">Click me</button>
    </div>
  </body>
</html>
```

And click the button:

![Focus Event Not Bubbles Up](/img/focus-bubbling.gif "Focus Event Not Bubbles Up")

The focus event is triggered only on the clicked element, it is not triggered on any of the parents.

The full list of all events that don't bubble can be found [here](https://en.wikipedia.org/wiki/DOM_events#Events).

## Prevent Bubbling

In some cases, when an event has been fully processed, it may be necessary to stop Event Bubbling.

Any handler may decide to stop it by executing **event.stopPropagation()** method:

```html
<!DOCTYPE html>
<html lang="en" onclick="console.log('HTML clicked')">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div onclick="console.log('Div is clicked')">
      <button
        onclick="console.log('Button is clicked'); event.stopPropagation();"
      >
        Click me
      </button>
    </div>
    <script>
      document.addEventListener('click', () => {
        console.log('Document is clicked');
      });
      window.addEventListener('click', () => {
        console.log('Window is clicked');
      });
    </script>
  </body>
</html>
```

> The above example is the same we used to show how Event Bubbling works, the only difference is using **event.stopPropagation()** method in the **onclick** assigned to the **button** element.

Now, clicking the button triggers only one event:

![Stop Event Propagation](/img/event-stop-propagation.gif "Stop Event Propagation")

**Important note:** If an element has multiple event handles on a single event attached, **event.stopPropagation()** will not stop executing them:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div onclick="console.log('Div is clicked')">
      <button>Click me</button>
    </div>
    <script>
      const button = document.getElementsByTagName('button')[0];
      button.addEventListener('click', () => {
        console.log('Button is cliked 1');
        event.stopPropagation();
      });
      button.addEventListener('click', () => {
        console.log('Button is clicked 2');
      });
    </script>
  </body>
</html>
```

In the above example, even though we stopped bubbling, "**Button is clicked 2**" is still printed to the console:

![Stop Propagation Does Not Cancel All Click Events](/img/stop-propagation-two-clicks.gif "Stop Propagation Does Not Cancel All Click Events")

To stop both, **event.stopImmediatePropagation()** can be used:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div onclick="console.log('Div is clicked')">
      <button>Click me</button>
    </div>
    <script>
      const button = document.getElementsByTagName('button')[0];
      button.addEventListener('click', () => {
        console.log('Button is cliked 1');
        event.stopImmediatePropagation();
      });
      button.addEventListener('click', () => {
        console.log('Button is clicked 2');
      });
    </script>
  </body>
</html>
```

Now, only the first click handler is executed:

![Stop Immediate Propagation Cancels All Events](/img/event-stop-immediate-propagation.gif "Stop Immediate Propagation Cancels All Events")

## Stop Propagation vs. Stop Immediate Propagation

As we have already learned, both prevent events from bubbling.

* **event.stopPropagation()** does not cancel executing of all events of a single type that are attached to the element

  If the DOM node has two click events attached, both of them will still be executed.
* **event.stopImmediatePropagation()** cancels executing of all events of a single type that are attached to the element

  If the DOM node has a few click events attached, only ones that were triggered before we used this method will be executed.

## When To Prevent Bubbling And When Not?

As it was explained in the previous sections, Event Bubbling is cancelable, so it would be good to know when should we cancel it and when shouldn't.

In general, preventing Event Bubbling is not a good idea, since it may cause some inconsistencies.

For example, after using **event.stopPropagation()** on an element, you would not be able to track user clicks on it anymore, which may cause problems if we want to track user's behavior on the page.

However, it may be useful when you already have a click event on a parent element, which can/should not be removed and you need to place a button inside of it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div>
      <button>Click me</button>
    </div>
    <script>
      const parent = document.getElementsByTagName('div')[0];
      const button = document.getElementsByTagName('button')[0];
      parent.addEventListener('click', () => {
        console.log('Parent is cliked');
      });
      button.addEventListener('click', () => {
        event.stopPropagation();
        console.log('Button is cliked');
      });
    </script>
  </body>
</html>
```

Adding **event.stopPropagation()** will prevent triggering an event an a parent element, which may not be needed when we just click the button.

Imagine that the parent element performs redirect and a button element is triggering a modal.

## Getting Event Target

The most deeply nested element that was clicked (caused the event) is called a **target** element and is accessible under **event.target**.

The current element, event click is being executed on is accessible is called **currentTarget** and is accessible under **event.currentTarget**.

Consider the following example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Bubbling</title>
  </head>
  <body>
    <div>
      <button>Click me</button>
    </div>
    <script>
      const parent = document.getElementsByTagName('div')[0];
      const button = document.getElementsByTagName('button')[0];
      parent.addEventListener('click', () => {
        // button
        console.log(event.target);
        // div
        console.log(event.currentTarget);
        console.log('Parent is cliked');
      });
      button.addEventListener('click', () => {
        // button
        console.log(event.target);
        // button
        console.log(event.currentTarget);
        console.log('Button is cliked');
      });
    </script>
  </body>
</html>
```

The output:

![Target And Current Target](/img/target-and-current-target.gif "Target And Current Target")

## Summary

Event Bubbling is a type of event propagation where the event first triggers on the innermost target element (the one we clicked), and then triggers all the way up on parent elements until it reaches the outermost DOM element or window object.

Remember, that not all events bubble (the whole list can be found [here](https://en.wikipedia.org/wiki/DOM_events#Events)).

Event Bubbling can be cancelled by using either **event.stopPropagation()** or **event.stopImmediatePropagation()** methods.

An element that was clicked is accessible under the **event.target** property, an element that is currently running an event is accessible under the **event.currentTarget** property.

Even though this concept is not something we come across often, it should definitely we familiar to you if you want to prevent different weird issues with your event handlers.