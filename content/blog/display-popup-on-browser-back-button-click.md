---
title: Show Alert On Page Reload And Browser Back Button Click
tag:
  - JavaScript
promote: false
metaDescription: Learn how to display alert on browser back button click or page
  reload using an event that is designed specifically for this purpose.
teaser: When website users are asked to provide a lot of input, it is important
  to make sure that the data will not be lost if something unexpected happens.
  One way to ensure that is to store the data somewhere (in the local storage,
  for example), so...
date: 2021-04-18T08:34:47.843Z
---
When website users are asked to provide a lot of input, it is important to make sure that the data will not be lost if something unexpected happens.

One way to ensure that is to store the data somewhere (in the [local storage](/the-limitations-and-security-of-localstorage-in-javascript/), for example), so in case when the page is left - the data still persists on the next visit.

But another way is to display a popup that warns user about losing the data when leaving the page.

In this article we will learn how to display such popup using JavaScript.

## Before Unload Event

The **beforeunload** event is fired when the window, the document and its resources are about to be unloaded. 

It enables a web page to trigger a confirmation dialog asking the user if they really want to leave the page. 

In case of the confirmation - the browser navigates to the new page, otherwise the navigation is cancelled.

According to the specification - for a popup to be shown, we just need to call **preventDefault** on an en event, however one important thing to remember is that it doesn't work for all browsers.

In order to support all browsers, apart from calling **preventDefault**, we still have to:

* Assign string to **returnValue** of an event
* Return a string from the event handler

A while ago, this returned string was displayed in the confirmation dialogue, but now it is not in most browsers.

So, even if you return a custom message, most browsers would still show the default one that can't be changed.

Also, remember that you can't change the design of that modal, you always have to stick with the default one.

## The Example

Let's write some code that listens to the **beforeunload** event and triggers a popup:

```jsx
 useEffect(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);

const handleBeforeUnload = (e) => {
  e.preventDefault();
  const message =
    "Are you sure you want to leave? All provided data will be lost.";
  e.returnValue = message;
  return message;
};
```

Even though the above code is written in React, is can be easily converted to the vanilla JavaScript.

## Browser Compatibility

![Beforeunload Browser Compatibility](/img/screenshot-2021-04-17-at-12.00.54.png "Beforeunload Browser Compatibility")

The solution with combining **preventDefault**, assigning string to **returnValue** and returning a string works in the majority of browsers.

See the [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#browser_compatibility) section to learn what browsers require which code in the event handler to work.

Also remember, that it is possible to disable browsers from listening to **beforeunload** event, with an extension or a native setting, like **dom.disable_beforeunload** in **about:config** in Firefox.

See [this section](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility) learn more about how the event behaves in different browsers.

## Summary

In this article, we learned how to display a confirmation dialogue when the user presses back button in the browser of reloads the page with the help of a **beforeunload** event.

The **beforeunload** event is fired when the window, the document and its resources are about to be unloaded.

It works fine in most browsers if you follow 3 simple rules in the event handler:

* Call **preventDefault**
* Assign string to the **returnValue**
* Return a string from the event handler