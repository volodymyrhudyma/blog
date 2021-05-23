---
title: Event Bubbling In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn about the concept of Event Bubbling in JavaScript. Event
  Bubbling is a process of executing event handlers from the innermost element
  all the way up to its parents.
shareImage: /img/event-bubbling-in-javascript.jpg
teaser: Have you ever noticed that a click handler added to the parent node
  fires even when child elements are clicked? It may be confusing at first, but
  that's how Event Bubbling works in JavaScript. In order to properly handle
  different types of events on DOM nodes...
date: 2021-05-23T07:05:21.928Z
---
Have you ever noticed that a click handler added to the parent node fires even when child elements are clicked?

It may be confusing at first, but that's how Event Bubbling works in JavaScript.

In order to properly handle different types of events on DOM nodes, knowing this concept is a must for successful web product development, even if we don't encounter it very often.

## Event Bubbling

Event Bubbling is a type of event propagation where the event fires first on the innermost target element (the one we clicked on), and then triggers all the way up on parent elements until it reaches the outermost DOM element or window object.

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

We attached a simple click event listener to the button element and output the text "**Button is clicked**" to the console each time the button is clicked.

But because of Event Bubbling, clicking the button element triggers events on each of its parents: **div**, **body**, **html**, **document**, **window**:

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

Now that the event listeners have been attached to all the parent elements of the button, let's see what happens after the click on it:

![Event Bubbling](/img/event-bubbling.gif "Event Bubbling")

A click on a button element executes the click handler for:

* itself
* parent div
* body element
* html element
* document element
* window object

The main reason the concept is called Event Bubbling is because events bubble up from the inner element all the way up.

## Do All Events "Bubble"?

The short answer is - no.

Such events as: **focus**, **blur** and others, less frequently used, do not bubble up.

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

The focus event is only fired on the clicked element, it is not triggered on any of the parent elements.

The full list of events that do not bubble can be found [here](https://en.wikipedia.org/wiki/DOM_events#Events).

## Prevent Bubbling

In some cases, when an event has been fully processed, it may be necessary to stop Event Bubbling.

Each handler can decide to stop it by executing the **event.stopPropagation()** method:

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

> The above example is the same one we used to show how Event Bubbling works, the only difference is the use of the **event.stopPropagation()** method in the **onclick** assigned to the **button** element.

Now, clicking the button only triggers one event:

![Stop Event Propagation](/img/event-stop-propagation.gif "Stop Event Propagation")

**Important note:** If an element has multiple event handlers of the same type attached to a single event, **event.stopPropagation()** will not stop their execution:

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

In the above example, even though we stopped the bubbling, it still prints "**Button is clicked 2**" to the console:

![Stop Propagation Does Not Cancel All Click Events](/img/stop-propagation-two-clicks.gif "Stop Propagation Does Not Cancel All Click Events")

To execute only the first event handler of a given type and prevent the remaining event handlers from executing, use the **event.stopImmediatePropagation()** method:

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

Now, check the console:

![Stop Immediate Propagation Cancels All Events](/img/event-stop-immediate-propagation.gif "Stop Immediate Propagation Cancels All Events")

## Stop Propagation vs. Stop Immediate Propagation

As we have already learned, both prevent events from bubbling.

* **event.stopPropagation()** does not cancel the execution of all events of the same type attached to the element 

  If the DOM node has two click events attached, both will continue to execute.
* **event.stopImmediatePropagation()** aborts the execution of all events of a single type attached to the element

  If the DOM node has multiple click events attached, only those that were triggered before this method was used will be executed.

## When To Prevent Bubbling And When Not?

As explained in the previous sections, Event Bubbling is cancelable, so it would be good to know when we should and should not cancel it.

In general, it is not a good idea to prevent Event Bubbling as this can lead to some inconsistencies.

For example, after using **event.stopPropagation()** for an element, we might not be able to track the user's clicks on it, which can cause problems if we want to track the user's behavior on the page.

However, it can be useful if you already have a click event on a parent element that cannot/should not be removed, and you need to place a button in it to perform another action:

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

Adding **event.stopPropagation()** prevents an event from firing on a parent, which may not be needed if we just click the button. 

Imagine that the parent element performs a redirection and a button element fires a modal.

We can't run both at the same time.

## Getting Event Target

The deepest nested element that was clicked (caused the event) is called the **target** element and is accessible at **event.target**. 

The current element on which the event click is performed is called **currentTarget** and is accessible at **event.currentTarget**.

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

Event Bubbling is a type of event propagation where the event fires first on the innermost target element (the one we clicked on), and then triggers all the way up on parent elements until it reaches the outermost DOM element or window object.

Remember that not all events bubble (the full list can be found [here](https://en.wikipedia.org/wiki/DOM_events#Events)).

Event Bubbling can be cancelled by using either **event.stopPropagation()** or **event.stopImmediatePropagation()** methods.

An element that has been clicked is accessible under the **event.target** property, an element that is currently executing an event is accessible under the **event.currentTarget** property.

Although we don't encounter this concept often, you should definitely be familiar with it if you want to avoid various strange problems with your event handlers.