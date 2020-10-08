---
title: Debounce in React
tag:
  - React
metaDescription: Learn about the most popular use cases for a Debounce function
  in JavaScript. The Debounce function is a higher-order function that limits
  the execution rate of the callback function.
teaser: React is often used for various tasks, including those that require a
  lot of complex calculations. Performing this type of calculation too often
  compromises the performance of the application. In most cases we can limit
  their number so that they are not executed too often...
date: 2020-10-08T20:59:14.958Z
---
React is often used for various tasks, including those that require a lot of complex calculations. 

Performing this type of calculation too often compromises the performance of the application. 

In most cases we can limit their number so that they are not executed too often. 

This is where the debouncing technique comes into play.

## What is debouncing?

**Debouncing** is a programming technique used to ensure that complex and time-consuming tasks are not executed too often.

The Debounce function is a higher-order function that limits the execution rate of the callback function.

> A **higher order function** is a function that takes a function as an argument, or returns a function.

## Example use cases

The article is worth nothing if it does not include some real-world use cases, which will help to understand why this concept is so important.

#### Use case #1

You implement a search input that waits for the user to enter some text and sends a request to the API to retrieve search results.

Every time the users enters a character, a request is sent.

Don not you feel there is no need to send a bunch of requests while the user is still typing a word?

A debounce function can be used here to send **one** request only after the user has **stopped typing for a certain amount of time**.

Basically, we say: "Hey, wait until the user stops typing for 500ms and send a request".

This prevents your UI from making unnecessary updates that slow down the application and are not really useful to the end user.

Look at the incorrect implementation:

```javascript
import React, { useState } from "react";

import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    handleSearch(value);
  };

  const handleSearch = (value) => axios.get(`search?query=${value}`);

  return <input value={value} onChange={handleChange} />;
};

export default App;
```

![Not debounced api call](/img/no-debounce.gif "Not debounced api call")

Note how many requests are sent to the backend.

Another implementation that uses the debounce technique:

```javascript
import React, { useState, useCallback } from "react";

import axios from "axios";
import debounce from "lodash/debounce";

const App = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    handleSearch(value);
  };

  const handleSearch = useCallback(
    debounce((value) => {
      axios.get(`search?query=${value}`);
    }, 500),
    []
  );

  return <input value={value} onChange={handleChange} />;
};

export default App;
```

Store each provided character in the state and execute **handleSearch**, which is a debounced function wrapper in the **useCallback** hook.

You know why?

When the function component is re-rendered, debouncing is performed over and over again, a new function is being created each time.

The **useCallback** hook caches the first debounced function for each subsequent render.

The above code in action:

![Debounced api call](/img/debounce.gif "Debounced api call")

Look how one request was sent after waiting 500ms from the time the user stopped typing.

This is a huge optimization.

#### Use case #2

Some code must be executed when the browser window is resized.

The following implementation is not quite correct, because the resize handler is called every time the screen is resized by 1 pixel:

```javascript
import React, { useEffect } from "react";

const App = () => {
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    console.log("Resize");
  };

  return <div />;
};

export default App;
```

![Window resize no debounce](/img/resize-ndb.gif "Window resize no debounce")

Correct implementation that uses the debounce technique:

```javascript
import React, { useEffect, useCallback } from "react";

import debounce from "lodash/debounce";

const App = () => {
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = useCallback(
    debounce(() => {
      console.log("Resize");
    }, 50),
    []
  );

  return <div />;
};

export default App;
```

![Window resize debounce](/img/resize-db.gif "Window resize debounce")

## Debounce function from scratch

In the examples above, we used the **debounce** function provided by **[lodash](https://lodash.com/)**.

To get a better understanding of how it works, look at its implementation:

```javascript
const debounce = (callback, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}
```

The explanation of the code:

* Debounce function receives two arguments: **callback** and **wait**. 

  The first argument is the actual function want to debounce, the second argument is the time we want to wait after the action is executed to trigger the callback.
* Define the **timeout** variable, which is currently set to **undefined**, but will hold a number representing the ID value of the set timer. 

  This value is passed to the **clearTimeout** method to cancel the timer.

  The timer is cancelled each time the function is called within the **wait** amount of time.
* Return an arrow function that is executed each time the debounce method is called.

  This function has an access to the arguments of the callback via **...args** syntax, which should not be lost.

  Apply **this** context for the scope of the **setTimeout** function (remember, that setTimeout creates its own execution context).
* Clear the timeout, if it exists.
* Create the timeout and apply the **callback** function to it by giving it the correct "this" context and arguments.

  The ID of the newly created timeout is assigned to the **timeout** variable, which is cleared if the debounce function is executed within the **wait** period.

## Summary

The debounce function limits the rate at which the callback function is executed.

The most common use cases for debouncing are to limit the number of requests sent to the API when the user enters something into the input, and to limit the number of times the event listener executes (resizing, scrolling).

It is a very powerful concept that helps to increase the performance of an application and is often neglected even by experienced developers.