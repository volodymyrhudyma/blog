---
title: Debounce in JavaScript
tag:
  - JavaScript
metaDescription: // Meta
teaser: // Teaser
date: 2020-10-08T20:59:14.958Z
---
JavaScript is often used to accomplish different tasks, including the ones that need a lot of complex calculations.

Doing this kinds of calculations too often affects the application's performance.

In most cases, we can limit their number, not to perform them too often.

This is exactly where the debouncing technique comes into play.

## What is debouncing?

**Debouncing** is a programming technique used to ensure that complex and time-consuming tasks are not executed too often.

It limits the rate at which a function can be fired.

## Example use cases

The article is worth nothing if it does not include some real-world use cases, which will help to understand why this concept is so important.

#### Use case #1

You implement a search input that waits for the user to provide some text and sends request to the API to fetch search results.

Every time the users types a character, a request is sent.

Don't you feel like there is no need to send a bunch of requests while the user is still typing a word?

A debounce function can be used here to send only one request after user **stopped typing for a certain amount of time**.

Basically, we say: "Hey, wait for the user to stop typing for 500ms and sent a request".

This prevents your UI from doing unnecessary updates which slow the application down and do not really provide much value for the end user.

Let's look at the code:

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

![Debounced api call](/img/oct-07-2020-23-45-30.gif "Debounced api call")

Look, how one request was sent after waiting 500ms from the moment user stopped typing.

That's huge optimization.

#### Use case #2

## Debounce function from scratch

## Debounce in lodash

## Summary