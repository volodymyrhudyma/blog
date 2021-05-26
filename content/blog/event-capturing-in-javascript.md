---
title: Event Capturing In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn about the concept of Event Capturing in JavaScript. Event
  Capturing is a process of executing event handlers from the outermost element
  all the way down to the target.
shareImage: /img/event-capturing-in-javascript.jpg
teaser: If you read the previous article about Event Bubbling, you probably know
  that the event propagation in HTML is done from the innermost element to all
  its parents. But what if I tell you that it is done vice versa first?...
date: 2021-05-27T19:36:16.361Z
---
If you read the previous article about Event Bubbling, you probably know that the event propagation in HTML is done from the innermost element to all its parents.

But what if I tell you that it is done vice versa first?

## Event Propagation Phases

Let me explain - there are three phases of event propagation in HTML DOM:

* Event Capturing - an event goes down
* Target Phase - an event reached the target element
* Event Bubbling - an event goes up

The following image perfectly illustrates all three phases:

![Event Propagation In HTML DOM](/img/eventflow.png "Event Propagation In HTML DOM")

When clicking on the **td** element, an event first goes down (Event Capturing), reaches the target element and triggers there (Target Phase) and goes up (Event Bubbling).

## Event Capturing

Event Capturing is a process of executing event handlers from the outermost element all the way down to the target.

Most of the time when talking about an event propagation phases, we mention only Event Bubbling and the reason is a very rare usage of Event Capturing, in most cases it is invisible to us.

Typically, when attaching an event listener to the element, we pass only two arguments: event name and event handler:

```javascript
button.addEventListener("click", handleClick);
```

And handlers like this know nothing about Event Capturing, they run only Target and Event Bubbling phases.

In order to run an event on the Capturing phase, we need to pass the third argument:

```javascript
// Run an event on the Capturing phase
button.addEventListener("click", handleClick, { capture: true );
                                               
// Shorthand
button.addEventListener("click", handleClick, true);
```

By default, **capture** option is set to **false**.

## Event Capturing Example

To better understand the phase, let's see the following example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Capturing</title>
  </head>
  <body>
    <div>
      <button>Click me</button>
    </div>
    <script>
      const nodes = document.querySelectorAll("*");
      for (const node of nodes) {
        node.addEventListener(
          "click",
          (e) => console.log(`Capturing: ${node.tagName.toLowerCase()}`),
          true
        );
      }
    </script>
  </body>
</html>
```

We select all DOM nodes and attach a listener that runs on the Capturing phase.

The output:

![Event Listener In The Capturing Phase](/img/event-capturing-example.gif "Event Listener In The Capturing Phase")

Note, how clicking on the **button** element triggers clicks on the parents first.

## Capturing Always Precedes Bubbling

The Capturing phase is always executed before Bubbling phase:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Event Capturing</title>
  </head>
  <body>
    <div>
      <button>Click me</button>
    </div>
    <script>
      const nodes = document.querySelectorAll("*");
      for (const node of nodes) {
        node.addEventListener(
          "click",
          (e) => console.log(`Capturing: ${node.tagName.toLowerCase()}`),
          true
        );
        node.addEventListener("click", (e) =>
          console.log(`Bubbling: ${node.tagName.toLowerCase()}`)
        );
      }
    </script>
  </body>
</html>
```

The output:

![Event Capturing Always Precedes Event Bubbling](/img/event-capturing-before-bubbling.gif "Event Capturing Always Precedes Event Bubbling")

## Remove Event Handler

One important thing to remember when removing event handlers added in the Capturing phase - is not to forget to pass the phase:

```javascript
// Add
button.addEventListener("click", handleClick, true);

// Remove
button.removeEventListener("click", handleClick, true);
```

If we do not pass the phase, an event handler will not be removed:

```javascript
button.addEventListener("click", handleClick, true);

// This will not work!
button.removeEventListener("click", handleClick);
```

## Summary

Event propagation in HTML DOM consists of three phases which are executed in the given order: Capturing, Target and Bubbling.

By default, when we attach an event to the element, it is executed in the Bubbling phase and that is the reason most of the time when talking about an event propagation phases, we mention only Event Bubbling.

To execute an event in the Capturing phase, we need to pass the third argument to the event listener.

Most probably, you won't use this phase too often, but still it doesn't mean you should not be aware of it.