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