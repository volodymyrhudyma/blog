---
title: Show Alert On Page Reload And Browser Back Button Click
tag:
  - JavaScript
promote: false
metaDescription: Learn how to display an alert when you click the back button in
  the browser or reload the page using an event specifically for this purpose.
shareImage: /img/alert-in-browser.jpg
teaser: When website users are asked to provide a lot of input, it is important
  to make sure that the data is not lost if something unexpected happens. One
  way to ensure this is to store the data somewhere (e.g. in the local storage),
  so that when the user leaves the page...
date: 2021-04-18T08:34:47.843Z
---
When website users are asked to provide a lot of input, it is important to make sure that the data is not lost if something unexpected happens.

One way to ensure this is to store the data somewhere (e.g. in the [local storage](/the-limitations-and-security-of-localstorage-in-javascript/)), so that when the user leaves the page - the data will persist on the next visit.

Another option is to display a popup that warns the user about the loss of the data when leaving the page.

In this article we will learn how to display such a popup using JavaScript.

## Before Unload Event

The **beforeunload** event is fired when the window, the document and its resources are about to be unloaded. 

It allows a web page to trigger a confirmation dialogue asking the user if they really want to leave the page. 

In case of confirmation - the browser navigates to the new page, otherwise the navigation is aborted.

According to the specification - in order for a popup to be displayed, we just need to call **preventDefault** on an en event, however, one important thing to note is that it does not work for all browsers.

To support all browsers, in addition to calling **preventDefault**, we need to:

* Assign a string to **returnValue** of an event
* Return a string from the event handler

Some time ago this returned string was displayed in the confirmation dialogue, but now it is not in most browsers.

So, even if you return a custom message, most browsers would still display the default message which cannot be changed.

Also remember that you can't change the design of this popup, you always have to stick with the default.

## The Example

Let's write some code that listens for the **beforeunload** event and triggers a popup:

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

Although the above code is written in React, it can easily be converted to vanilla JavaScript.

The above code in action (first I click a browser back button, second I refresh the page):

![Alert When Clicking Back Browser Button](/img/alert.gif "Alert When Clicking Back Browser Button")

## Browser Compatibility

![Beforeunload Browser Compatibility](/img/screenshot-2021-04-17-at-12.00.54.png "Beforeunload Browser Compatibility")

The solution with the combination **preventDefault**, assigning string to **returnValue** and returning a string works in most browsers.

See the [Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#browser_compatibility) section to find out which browsers require which code in the event handler to work.

Also remember that it is possible to prevent browsers from listening for the **beforeunload** event with an extension or native setting, such as **dom.disable_beforeunload** in **about:config** in Firefox.

See [this section](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload#browser_compatibility) to learn more about how the event behaves in different browsers.

## Summary

In this article, we learned how to display a confirmation dialogue when the user presses the back button in the browser or reloads the page using the **beforeunload** event.

The **beforeunload** event is fired when the window, the document and its resources are about to be unloaded.

It works fine in most browsers if you follow 3 simple rules in the event handler:

* Call **preventDefault**
* Assign a string to the **returnValue**
* Return a string from the event handler