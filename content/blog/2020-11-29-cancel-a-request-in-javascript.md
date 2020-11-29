---
title: Cancel a Request in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to cancel fetch request in JavaScript using
  AbortController and AbortSignal. To abort a fetch request, pass AbortSignal to
  the options and use abort() method of the AbortController.
shareImage: ""
teaser: Aborting requests built on top of Promises was never an easy thing to do
  (if at all possible) until AbortController and AbortSignal were added to the
  JavaScript specification. They allow developers to use a signal to abort one
  or...
date: 2020-11-29T09:27:05.801Z
---
Aborting requests built on top of Promises was never an easy thing to do (if at all possible) until **AbortController** and **AbortSignal** were added to the JavaScript specification.

They allow developers to use a signal to abort one or more requests.

## The AbortController

Create an instance of the **AbortController** and pull out the **signal**:

```javascript
const controller = new AbortController();
const { signal } = controller;
```

To cancel a request, use the controller's only available method - **abort**:

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

According to [caniuse](https://caniuse.com/?search=abortcontroller), **AbortController** is available for more than **92%** of the users as of 29.11.2020:

![AbortController caniuse](/img/screenshot-2020-11-29-at-11.00.42.png "AbortController caniuse")

## Fetch API

Since we already know the API specification, let's take a look at the real example of using it with the Fetch API:

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

Fetch can receive an **AbortSignal** which can be used to abort the request if it is not already completed. If completed - Fetch would simply ignore the signal.

It is also possible to respond to the canceled request:

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

If an asynchronous operation is aborted, the promise is rejected with a **DOMException** called **AbortError**.

Handling this is important, because there is no reason to display an error message if the request was aborted intentionally. 

Passing the same **signal** to several requests aborts all of them:

```javascript
const controller = new AbortController();
const { signal } = controller;

// Abort 2 requests after 1s
setTimeout(() => controller.abort(), 1000);

fetch("http://localhost:8000/users", { signal }).then(() => {
  console.log("Response received");
}).catch(error => {
  console.log("An error occurred");
});

fetch("http://localhost:8000/projects", { signal }).then(() => {
  console.log("Response received");
}).catch(error => {
  console.log("An error occurred");
});
```

## Axios

An **Axios** has its own implementation for canceling requests. We need to generate a Cancel Token to do this:

```javascript
const cancelToken = axios.CancelToken;
const source = cancelToken.source();
```

Then the **source** generated is passed to the Axios request:

```javascript
const response = await axios.get("http://localhost:8000", {
  cancelToken: source.token,
});
```

The **source** contains a **cancel** method that can be called to cancel a request (the message parameter is optional):

```javascript
source.cancel("Axios request has been cancelled");
```

Axios offers **isCancel** method to check whether the request has been cancelled. The complete example:

```javascript
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios.get("http://localhost:8000", {
  cancelToken: source.token
}).catch((error) => {
  if (axios.isCancel(error)) {
    console.log("Request cancelled: ", error.message);
  } else {
    console.log("An error occurred");
  }
});

source.cancel("Axios request has been cancelled");
```

It is also possible to cancel multiple requests as well, by simply passing the same **cancelToken** to all of them.

There is also a second way to create a Cancel Token, see the [Axios documentation](https://github.com/axios/axios#cancellation) to find out more.

## Summary

Now we know how to abort a request when using either Fetch API or Axios HTTP client.

For better understanding, you may ask: "Why do we have to cancel requests at all?". The answer may not be obvious, but there are some specific cases where it will improve the performance and User Experience of your website.

Let's assume that the user browses your website and leaves the page **A** for the page **B.** If there are any ongoing requests related to the page **A**, they do not really need to be completed because the data is no longer needed, so they can be canceled.

Canceling requests has never been easier, so make sure to use it when needed!