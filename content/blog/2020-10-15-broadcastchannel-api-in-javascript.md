---
title: BroadcastChannel API in JavaScript
tag:
  - JavaScript
metaDescription: Learn BroadcastChannel API - a new Web API that enables
  cross-context communication between different windows/tabs/iframes **of the
  same origin**.
teaser: Imagine you open an application on two different tabs and perform an
  action on one of them. Normally, the action is expected to apply to all open
  tabs, but this is not the case for the vast majority of applications...
date: 2020-10-17T20:53:00.000Z
---
The **BroadcastChannel API** is a new Web API that enables the communication between different windows/tabs/iframes **of the same origin**.

> A **Web API** is an application programming interface for either a web server or a web browser. It is a set of functions that can be accessed via the HTTP protocol.
>
> A list of all available Web APIs can be found [here](https://developer.mozilla.org/en-US/docs/Web/API).

## Why is it needed?

The first question that came to my mind when I read about this concept was: "What purpose does it serve?".

Imagine you open an application on two different tabs and perform an action on one of them. Normally, the action is expected to apply to all open tabs, but this is not the case for the vast majority of applications.

The tabs do not communicate with each other, therefore they are not aware of their mutual state.

This can lead to some security problems, e.g. the user is not logged out on all open tabs, but only on the current one.

Fortunately, the BroadcastChannel API helps us to solve this problem.

Before we dig into the code, it is necessary to check the browser support to make sure that it is safe to use in production.

## Browser support

According to **[caniuse.com](https://caniuse.com/broadcastchannel)**, the BroadcastChannel API is available for **78,85%** of the users (as of 17/10/2020).

It is not supported in IE11, Safari and older versions of Edge, so if these browsers are widely used among your customers, you will either need to find a polyfill or choose another solution.

> In web development, a **polyfill** is code that implements a feature on web browsers that do not support it.

## API overview

First, create a channel and save a reference to it in a variable:

```javascript
const testChannel = new BroadcastChannel("test");
```

Once the channel is created, we can send a message to it:

```javascript
testChannel.postMessage("Test message");
```

**Important note:** `postMessage` takes **any object** as an argument, we are not limited to sending strings only.

After the message is sent to the BroadcastChannel, a `message` event is dispatched to each object that subscribes to that channel:

```javascript
testChannel.onmessage = event => { console.log(event); }
```

Finally, after the work is done, close the connection:

```javascript
testChannel.close();
```

Before we continue with the next section, let's get back to the argument of the **postMessage** function.

Actually, the claim that it can take any object is a bit wrong, because actually it can not, but in 99% of the cases, you should not worry about an argument type.

The data sent by the **postMessage** is serialized with the **Structured Clone algorithm**.

On the one hand, this means that you can transfer a variety of data without having to serialize yourself, but on the other hand you are limited to some set of types.

Things that do not work with the Structured Clone algorithm:

* Functions
* Symbols
* DOM Nodes
* Certain object properties, such as **lastIndex** of **RegExp**, getters, setters, prototype chain, etc

The following example throws an error:

```javascript
channel.postMessage(() => {});
```

Error message:

![BroadcastChannel API function error](/img/screenshot-2020-10-16-at-18.48.30.png "BroadcastChannel API function error")

## Structured Clone algorithm

The **Structured Clone algorithm** is a new algorithm defined by the HTML5 specification for serializing complex JavaScript objects.

The algorithm iterates over all fields of the original object, duplicating the values of each field into a new object.

If a field itself is an object with fields, these fields are traversed recursively until each field and sub-field is duplicated in the new object.

One of its purposes is the transmission of the data by **postMessage**.

#### Advantages over JSON

What are the advantages of the Structured Clone algorithm over the JSON method for copying data?

```javascript
JSON.parse(JSON.stringify(data));
```

The JSON approach has many limitations, which were fully covered in one of my [earlier articles](/2020-05-25-how-to-clone-an-object-in-javascript/#JSON-object). 

**JSON.stringify** has some problems with:

* Undefined values
* Symbols
* Date objects
* Circular dependencies
* Functions

To read more about the advantages of the Structured Clone approach, read [this article](http://man.hubwiz.com/docset/JavaScript.docset/Contents/Resources/Documents/developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm.html).

## Real-world example

Remember we talked about logging out users on all open tabs?

Let's add this feature to our website using the BroadcastChannel API:

```html
<button class="logout">Logout</button>

<script>  
  const logoutAction = () => {
    // Perform logout
    console.log("User was logged out");
  };

  // Create a new "logout" channel
  const channel = new BroadcastChannel("logout");

  // Find the button by class name
  const button = document.querySelector(".logout");

  // Listen for the button click
  button.addEventListener("click", (e) => {
    // If the button was clicked
    // First, perform logout manually
    // Because the channel would not broadcast to itself
    logoutAction();
    
    // Send message to all subscribers
    // You can send any object
    channel.postMessage({
        action: "logout",
        payload: "Eric Bidelman",
    });
  });

  // Listen for the "message" event
  channel.onmessage = function (e) {
    // If message event received
    // And action is "logout"
    if (e.data.action === "logout") {
      
      // Perform logout action
      logoutAction();
    }
  };
</script>
```

**Important note:** The channel would not broadcast to itself, which means that if the `doLogout` action is not performed manually after clicking the button, the user would not be logged out of the current tab.

## Npm library

There is an npm library called **[broadcast-channel](https://www.npmjs.com/package/broadcast-channel)** that behaves similarly to the BroadcastChannel API which is currently only available in a few browsers, but supports all of them and ... **Node environment**. 

Yes, you can also send messages between different Node processes. Such a cool feature.

To test if your browser is supported, please visit the [demo app](https://pubkey.github.io/broadcast-channel/e2e.html).

## Summary

The BroadcastChannel API is a very simple API that enables cross-context communication. 

It can be used to detect user actions in the current tab and transfer them to all other open tabs of the same origin.

It is widely supported between browsers, but there are both polyfills and npm packages that allow you to use this feature in both older browsers and Node processes.