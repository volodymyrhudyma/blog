---
title: Debounce in React
tag:
  - React
metaDescription: Learn the most popular use cases for a Debounce function in
  JavaScript. Debounce function is a higher-order function that limits the rate
  at which callback function is executed.
teaser: React is often used to accomplish different tasks, including the ones
  that need a lot of complex calculations. Doing this kinds of calculations too
  often affects the application's performance...
date: 2020-10-08T20:59:14.958Z
---
React is often used to accomplish different tasks, including the ones that need a lot of complex calculations.

Doing this kinds of calculations too often affects the application's performance.

In most cases, we can limit their number, not to perform them too often.

This is exactly where the debouncing technique comes into play.

## What is debouncing?

**Debouncing** is a programming technique used to ensure that complex and time-consuming tasks are not executed too often.

Debounce function in JavaScript is a higher-order function that limits the rate at which callback function is executed.

> A **higher order function** is a function that takes a function as an argument, or returns a function

## Example use cases

The article is worth nothing if it does not include some real-world use cases, which will help to understand why this concept is so important.

#### Use case #1

You implement a search input that waits for the user to provide some text and sends request to the API to fetch search results.

Every time the users types a character, a request is sent.

Don't you feel like there is no need to send a bunch of requests while the user is still typing a word?

A debounce function can be used here to send only one request after user **stopped typing for a certain amount of time**.

Basically, we say: "Hey, wait for the user to stop typing for 500ms and sent a request".

This prevents your UI from doing unnecessary updates which slow the application down and do not really provide much value for the end user.

Look at the wrong implementation:

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

Notice how many requests are sent to the backend.

Another implementation, using the debounce technique:

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

For each provided character, we save it to the state and execute **handleSearch**, which is a debounced function wrapper in **useCallback** hook.

Do you know why?

When functional component re-renders, the debounce will be executed again and again, we will get a new function each time.

The **useCallback** hook caches the first debounced function for any subsequent render.

The above code in action:

![Debounced api call](/img/debounce.gif "Debounced api call")

Look, how one request was sent after waiting 500ms from the moment user stopped typing.

That's huge optimization.

#### Use case #2

Some code needs to be run when the window of the browser is being resized.

The implementation below is not entirely correct, because the resize handler is called each time the screen is being resized for 1 pixel:

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

Correct implementation, using the debounce technique:

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

In the above examples we were using **debounce** function provided by **[lodash](https://lodash.com/)**.

To grasp a better understanding of how it works, look at its implementation:

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

The above example explained:

* Debounce function receives two arguments: **callback** and **wait**. 

  The first argument is the actual function we would like to debounce, the second one is the time we want to wait after the action has been executed to fire the callback.
* Define **timeout** variable, which is **undefined** at the time being, but will hold a number, representing the id value of the timer that is set. 

  This value is passed to the **clearTimeout** method to cancel the timer.

  The timer is cancelled each time the function is called within the **wait** amount of time.
* Return an arrow function that will be executed each time the debounce method is called.

  This function has an access to the arguments of the callback via **...args** syntax, which should not be lost.

  Apply **this** context for the scope of **setTimeout** function (remember, that setTimeout creates it own execution context).
* Clear the timeout if it exists.
* Create the timeout and apply the **callback** function to it, giving it the proper "this" context and provided arguments.

  The id of the newly created timeout is assigned to the **timeout** variable, which will be cleared if the debounce function is executed within the **wait** amount of time.

## Summary

Debounce function limits the rate at which callback function is executed.

The most common use cases for a debounce are limiting the number of the requests sent to the API when the user types something into the input and limiting the number of the event listener executions (resize, scroll).

It is very powerful concept that helps to boost the performance of an application and that is often neglected even by experienced developers.