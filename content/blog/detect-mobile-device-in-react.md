---
title: Detect Mobile Device In React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-04-23T12:29:18.283Z
---
In some cases you need to detect whether your application is being viewed from the desktop or from the mobile device.

It might be useful to prevent doing expensive calculations on mobile devices, since they are not as performant as the computers.

Today we will learn not only how to do it in React, but also what common approaches should be avoided and why.

## The Wrong Way

One of the most common ways of checking whether your application is rendered on mobile is checking the **User-Agent** request header.

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

However, this technique is considered unreliable, not only because it is likely that the User-Agent will change in the future releases of the browsers, but also because of UA spoofing.

**UA spoofing** is replacing the User-Agent string that is sent by your browser as an HTTP header with another value.

Why is that needed? Because a lot of websites are made to support well only specific browsers.

These websites include code that detects browser version and adjusts displayed content according to the received result, which means that using less popular browsers leads to potential missing of the important content.

To prevent that, various browsers have a feature to spoof their identification to force certain content to be shown.

For example, the Android browser identifies itself as Safari in order to aid compatibility.

Chrome allows this as well, read [this post](https://developer.chrome.com/docs/devtools/device-mode/override-user-agent/) to learn more.

## The Right Way #1

Thankfully, there are much better alternatives for detecting if your application is rendered on mobile or on desktop, like **Navigator.maxTouchPoints**.

> The [maxTouchPoints](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/maxTouchPoints) read-only property of the Navigator interface returns the maximum number of simultaneous touch contact points are supported by the current device.

It can be used to detect whether the device has touch screen or not, then, default back to checking the user agent screen only if there is no available **maxTouchPoints** property in **Navigator** object:

Here is full example of using it (taken from [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent), but adjusted for React):

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

Quite a lot of code, but works like a charm.

## The Right Way #2

When implementing a feature, always remember that you are, in 99% of the cases, not the only person to do that, so, most probably, there is a library that does exactly what you need.

Detecting mobile browser feature is not an exception, so let's search for a React library, designed for this purpose.