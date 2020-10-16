---
title: BroadcastChannel API in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // This is a teaser
date: 2020-10-17T20:53:00.000Z
---
The **BroadcastChannel API** is a new Web API that allows communicating between different windows/tabs/iframes **of the same origin**.

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

**Important note:** `postMessage` takes **any object** as an argument, we are not limited to send only strings.

After posting the message to the BroadcastChannel, a `message` event is dispatched to each object subscribed to this channel:

```javascript
testChannel.onmessage = event => { console.log(event); }

```

Finally, after the work has been done, close the connection:

```javascript
testChannel.close();
```

Before proceeding to the next section, let's get back to the argument of the **postMessage** function.

Actually, saying that it can take any object is a bit incorrect, because really it can not, however, in 99% of the cases you should not worry about an argument type.

The data sent by the **postMessage** is serialized using the **Structured Clone algorithm**.

On the one hand, it means that you can pass a variety of data without having to do serialization by yourself, but on the other hand, you are limited to some set of types.

Thins that do not work with Structured Clone algorithm:

* Functions
* Symbols
* DOM nodes
* Certain object properties, like **lastIndex** of **RegExp**, getters, setters, prototype chain etc

The following example throws an error:

```javascript
channel.postMessage(() => {});
```

Error message:

![BroadcastChannel API function error](/img/screenshot-2020-10-16-at-18.48.30.png "BroadcastChannel API function error")

## Structured Clone algorithm

The **Structured Clone algorithm** is a new algorithm defined by the HTML5 specification for serializing complex JavaScript objects.

The algorithm iterates over all the fields of the original object, duplicating the values of each field into a new object.

If a field is, itself, an object with fields, those fields are walked over recursively until every field and sub-field is duplicated into the new object.

One of its uses is to transfer the data via **postMessage**.

#### Advantages over JSON

What advantages does the Structured Clone algorithm has over the JSON way of copying data?

```javascript
JSON.parse(JSON.stringify(data));
```

The JSON approach has way more limitations, which were fully covered in one of my [previous articles](/2020-05-25-how-to-clone-an-object-in-javascript/#JSON-object). 

**JSON.stringify** has some troubles with:

* Undefined values
* Symbols
* Date objects
* Circular dependencies
* Functions

To read more about the advantages of the Structured Clone approach, read [this article](http://man.hubwiz.com/docset/JavaScript.docset/Contents/Resources/Documents/developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm.html).

## Real-world example

Remember we were talking about logging user out on all opened tabs?

Let's add this feature to our website with the help of BroadcastChannel API:

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
    // Firstly, perform logout manually
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

**Important note:** The channel would not broadcast to itself, which means that if the `doLogout` action is not performed manually after clicking on the button, the user would not get logged out from the current tab.

## Summary