---
title: BroadcastChannel API in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // This is a teaser
date: 2020-10-17T20:53:00.000Z
---
The **BroadcastChannel API** is a new Web API that allows communicating between different windows/tabs/iframes of the same origin.

> A **Web API** is an application programming interface for either a web server or a web browser. It is a set of functions which can be accessed using the HTTP protocol.
>
> A list of all available Web APIs can be found [here](https://developer.mozilla.org/en-US/docs/Web/API).

## Why is it needed?

The first question that came to my mind when I was reading about this concept was: "What purpose does it serve?".

Imagine opening an application on two different tabs and performing an action on one of them. Normally, the action is expected to be propagated to all opened tabs, but on the vast majority of applications it is not.

The tabs are not communicating, therefore they are not aware of the state of each other.

This can lead to some security problems, like not logging the user out on all opened tabs, but just on the current one.

Fortunately, the BroadcastChannel API helps us to solve this issue.

Before we dig into the code, it is necessary to check the browser support to be sure it is safe to use in production.

## Browser support

According to **[caniuse.com](https://caniuse.com/broadcastchannel)**, the BroadcastChannel API is available for **78,85%** of the users (as for 16.10.2020).

It is not supported in IE11, Safari and older versions of Edge, so if these browsers are widely used among your clients, you have either to find a polyfill or choose another solution.

> In web development, a **polyfill** is code that implements a feature on web browsers that do not support the feature.

## API overview

To begin with, create a channel and store a reference to it in a variable:

```javascript
const testChannel = new BroadcastChannel("test");

```

After the channel was created, we can send a message to it:

```javascript
testChannel.postMessage("Test message");
```

**Important note:** `postMessage` takes any object as an argument, we are not limited to send only strings.

After posting the message to the BroadcastChannel, a `message` event is dispatched to each object subscribed to this channel:

```javascript
testChannel.onmessage = event => { console.log(event); }

```

Finally, after the work has been done, close the connection:

```javascript
testChannel.close();
```

## Real-world example

Remember we were talking about logging user out on all opened tabs?

Let's add this feature to our website with the help of BroadcastChannel API:

```javascript
Lala
```

## Structured clone algorithm

## Browser context

## Browser support

## Summary