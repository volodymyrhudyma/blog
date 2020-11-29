---
title: Cancel a Request in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to cancel fetch request in JavaScript by using
  AbortController and AbortSignal. To cancel a fetch request, pass AbortSignal
  to the options and use abort() method of the AbortController.
shareImage: ""
teaser: Canceling requests built on top of Promises was never an easy thing (if
  possible at all) until AbortController and AbortSignal have been added to the
  JavaScript specification. They allow the developers to use a signal to abort
  one or...
date: 2020-11-30T09:27:05.801Z
---
Canceling requests built on top of Promises was never an easy thing (if possible at all) until **AbortController** and **AbortSignal** have been added to the JavaScript specification.

They allow the developers to use a signal to abort one or multiple requests.

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

Handling this is important because there is no reason for showing an error message if the request was canceled intentionally. 

Passing the same **signal** to multiple requests aborts all of them:

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

An **Axios** has its own implementation for canceling requests. We need to generate a cancel token to be able to do that:

```javascript
import axios from "axios";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();
```

Then the generated **source** is passed to the Axios request:

```javascript
const response = await axios.get("http://localhost:8000", {
  cancelToken: source.token,
});
```

The **source** contains a **cancel** method which can be invoked to abort a request (the message parameter is optional):

```javascript
source.cancel("Axios request has been cancelled");
```

To check if the request was canceled, an Axios provides **isCancel** method. The complete example:

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

It is possible to cancel multiple requests as well, just pass the same **cancelToken** to all of them.

There is also a second way to create a Cancel Token, refer to the [Axios documentation](https://github.com/axios/axios#cancellation) to read more.

## Summary

Now we know how to cancel a request when using either `fetch` API or `axios` HTTP client.

For better understanding purposes, you may ask: "Why do we need to cancel requests at all?". The answer might not be obvious, but there are some specific cases where it will improve the performance and User Experience of your website.

Let's assume that the user browses your website and leaving page **A** for page **B.** If there are any fetch calls related to page **A** in progress, they do not really have to be completed, as the data is no longer needed, so they can be canceled.

Canceling requests has never been so simple, make sure to use it in your next project if needed!