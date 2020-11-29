---
title: Cancel a Request in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/screenshot-2020-11-29-at-11.00.42.png
teaser: // TEASER
date: 2020-11-30T09:27:05.801Z
---
Canceling requests built on top of Promises was not possible until **AbortController** has been added to the JavaScript specification.

It allows the developers to use a signal to abort one or multiple requests.

## The AbortController

Create an instance of the **AbortController** and pull out the **signal**:

```javascript
const controller = new AbortController();
const { signal } = controller;
```

To cancel a request use the only available method of the controller - **abort**:

```javascript
controller.abort();
```

Aborting a request notifies the signal:

```javascript
signal.addEventListener("abort", () => {
  // Prints "true"
  console.log(signal.aborted);
});
```

## Browser Support

According to the [caniuse](https://caniuse.com/?search=abortcontroller), as of 30.11.2020, **AbortController** is available for more than **92%** of the users:

![AbortController caniuse](/img/screenshot-2020-11-29-at-11.00.42.png "AbortController caniuse")

## Fetch API

Knowing the API specification, let's take a look at the real-world example of using it with the `fetch` API:

```javascript
const controller = new AbortController();
const { signal } = controller;

// Abort request after 1s
setTimeout(() => controller.abort(), 1000);

fetch("http://localhost:8000", { signal }).then(() => {
  console.log("Response received");
}).catch(error => {
  console.log("An error occurred");
});
```

Fetch can take an **AbortSignal** which allows the request to be aborted if not already completed. If completed - fetch would simply ignore the signal.

It is also possible to react to the canceled request:

```javascript
fetch("http://localhost:8000", { signal }).then(() => {
  console.log("Response received");
}).catch(error => {
  if (err.name === "AbortError") {
    console.log("The request was aborted");
  } else {
    console.error("The real error happened");
  }
});
```

When an async operation is aborted, the promise rejects with a `DOMException` named `AbortError`.

## Axios

## Summary