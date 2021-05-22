---
title: Event Bubbling In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: "> // TEASER"
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

Now, only the first click handles is executed:

![Stop Immediate Propagation Cancels All Events](/img/event-stop-immediate-propagation.gif "Stop Immediate Propagation Cancels All Events")