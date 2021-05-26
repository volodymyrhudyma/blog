---
title: Event Capturing In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-05-27T19:36:16.361Z
---
If you read the previous article about Event Bubbling, you probably know that the event propagation in HTML is done from the innermost element to all its parents.

But what if I tell you that it is done vice versa first?

Let me explain - there are three phases of event propagation in HTML DOM:

* Event Capturing - an event goes down
* Target Phase - an event reached the target element
* Event Bubbling - an event goes up

The following image perfectly illustrates all three phases:

![Event Propagation In HTML DOM](/img/eventflow.png "Event Propagation In HTML DOM")