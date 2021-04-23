---
title: Detect Mobile Device In React
tag:
  - React
promote: false
metaDescription: Learn a few ways to detect if a React app is rendering on a
  mobile device or on the desktop, and why you should never use User-Agent
  header for it.
shareImage: /img/detect-mobile-in-react.jpg
teaser: In some cases you need to identify whether your application is being
  viewed from the desktop or mobile device. It might be useful to prevent
  expensive computations from being performed on mobile devices, as they are not
  as...
date: 2021-04-23T12:29:18.283Z
---
In some cases you need to identify whether your application is being viewed from the desktop or mobile device.

It might be useful to prevent expensive computations from being performed on mobile devices, as they are not as performant as computers.

Today we'll not only learn how to do that in React, but also which common approaches to avoid and why.

## The Wrong Way

One of the most common ways of checking whether your application is rendering on mobile devices is to check the **User-Agent** request header of the navigator.

> The [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) request header is a characteristic string that lets servers and network peers identify the application, operating system, vendor, and/or version of the requesting user agent.

An example code:

```jsx
import { useState, useEffect } from "react";

const DeviceDetector = () => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Desktop");
    }
  }, []);

  return <div>I am rendered on: {deviceType}</div>;
};

export default DeviceDetector;
```

However, this technique is considered unreliable, not only because it is likely that User-Agent will change in future versions of browsers, but also because of UA spoofing.

**UA spoofing** is the replacement of the User-Agent string, which is sent by your browser as HTTP header, with another value.

Why is that needed? Because many websites are designed to support only certain browsers well.

These websites contain code that detects the browser version and adjusts the content displayed according to the result obtained, which means that using less common browsers may result in important content not being displayed.

To prevent that, various browsers have a function that fakes their identification to force the display of certain content.

For example, the Android browser identifies itself as Safari to aid compatibility.

Chrome also allows this, read [this post](https://developer.chrome.com/docs/devtools/device-mode/override-user-agent/) to learn more.

## The Right Way #1

Fortunately, there are much better alternatives to detect whether your app is rendering on mobile or desktop, like **Navigator.maxTouchPoints**.

> The [maxTouchPoints](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints) read-only property of the Navigator interface returns the maximum number of simultaneous touch contact points are supported by the current device.

It can be used to detect if the device has a touch screen or not, and then by default check the user agent screen only if there is no available **maxTouchPoints** property in the **Navigator** object. 

Here's a full example of how to use it (taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent), but adapted for React):

```jsx
import { useState, useEffect } from "react";

const DeviceDetector = () => {
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    if (hasTouchScreen) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Desktop");
    }
  }, []);

  return <div>I am rendered on: {deviceType}</div>;
};

export default DeviceDetector;
```

Quite a bit of code, but works like a charm.

## The Right Way #2

When implementing a feature, always remember that 99% of the time you're not the only person doing it, so there's most likely a library that does exactly what you need.

Detecting mobile browser feature is no exception, so let's look for a React library designed for this purpose.

The most popular one is [react-device-detect](https://www.npmjs.com/package/react-device-detect) with more than 290 thousand weekly downloads (pretty popular, right?).

Apart from just telling you if the rendering system is mobile or desktop, it provides a lot of helper methods that can be used for more accurate detection:

First, install the library:

`yarn add react-device-detect`

Next, use it:

```jsx
import { isMobile } from "react-device-detect";

const DeviceDetector = () => (
  <div>I am rendered on: {isMobile ? "Mobile" : "Desktop"}</div>
);

export default DeviceDetector;
```

 You can also use React components to differentiate between platforms:

```jsx
import { BrowserView, MobileView } from "react-device-detect";

const DeviceDetector = () => (
  <>
    <BrowserView>I am rendered on: Desktop</BrowserView>
    <MobileView>I am rendered on: Mobile</MobileView>
  </>
);

export default DeviceDetector;

```

And the code looks much, much cleaner and better.

## Summary

Device detection is a common task in web development, mostly used for performance optimizations.

There are many ways to detect the device, so you need to be aware of which ways are safe and which are better to be avoided.