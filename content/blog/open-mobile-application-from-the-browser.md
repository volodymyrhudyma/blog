---
title: Open Mobile Application From The Browser
tag:
  - React
promote: false
metaDescription: Learn how to open any mobile app from the browser or redirect
  to Play/App Store or any fallback URL if it is not installed.
teaser: Launching the mobile application of the specific page from the browser
  is called Mobile App Deep Linking. It is very useful if you have both web and
  mobile applications and want to easily navigate between them. You can launch
  an email campaign that contains a link that users can click to...
date: 2021-01-30T21:21:22.418Z
---
Launching the mobile application of the specific page from the browser is called **Mobile App Deep Linking**.

It is very useful if you have both web and mobile applications and want to easily navigate between them.

You can launch an email campaign that contains a link that users can click to read more about your products in your mobile app.

There are many use cases, but the general purpose is to optimize user experience and increase conversion rates.

## Deep Linking Types

There are two main types of Deep Links:

* Default

  The link opens an application if it is installed, otherwise an error message will be displayed.
* Deferred

  The link opens an application if it is installed, otherwise the user is redirected to Play or App Store (or another chosen location).

Besides these, you may have heard of **Contextual Deep Linking**.

Contextual Deep Links are usually default or deferred with some additional parameters added to collect more information about users.

## Creating A Deep Link

Let's create a Deferred Deep Link to our mobile app that will open it if it's installed, otherwise redirect to the Store where the user can download it.

**Important note:** This solution may not work in all browsers or older Android/iOS versions. However, it should work fine with Chrome and Safari.

**ANDROID**

For Android, Google provides the Intent URL:

```javascript
// Android Intent Syntax
intent:  
  HOST/URI-path // Optional Host  
  #Intent;  
    package=\[string\];  
    action=\[string\];  
    category=\[string\];  
    component=\[string\];  
    scheme=\[string\];  
  end;

// Android Code
const url = "intent://APP_HOST/#Intent;scheme=APP_NAME;package=APP_PACKAGE;end";

window.location.replace(url); 
```

Be sure to replace **APP_NAME** and **APP_PACKAGE** with the values that belong to your mobile app, **APP_HOST** is an optional host value that may not be needed (but is required to open the instagram app in the next example).

Example code for Instagram:

```javascript
// Open Instagram
const url = "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";

window.location.replace(url); 
```

**IOS**

On iOS, try opening the mobile app and set the timeout to a few seconds, which only runs when an app is not installed:

```javascript
window.location.replace("APP_NAME"); 

// Wait 10s and redirect to App Store if app was not opened
setTimeout(() => {
  window.location.replace("APP_STORE_URL"); 
}, 10000);
```

Be sure to replace **APP_NAME** and **APP_STORE_URL** with the values that belong to your mobile application.

Example code for Instagram:

```javascript
window.location.replace("instagram://"); 

setTimeout(() => {
  window.location.replace("https://apps.apple.com/us/app/instagram/id389801252"); 
}, 10000);
```

## The Complete Example

To put all the code together, let's create a simple React application:

`npx create-react-app deep-linking`

Install the [react-device-detect](https://www.npmjs.com/package/react-device-detect) library, which would help us detect the user's operating system:

`yarn add react-device-detect`

Open the **App** component and replace it with the following code:

```jsx
import React, { useEffect } from "react";
import { isAndroid, isIOS } from "react-device-detect";

const App = () => {
  useEffect(() => {
    if (isAndroid) {
      const url =
        "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";

      window.location.replace(url);
    } else if (isIOS) {
      window.location.replace("instagram://");

      setTimeout(() => {
        window.location.replace(
          "https://apps.apple.com/us/app/instagram/id389801252"
        );
      }, 10000);
    } else {
      window.location.replace("https://instagram.com");
    }
  }, []);

  return (
    <div className="App">
      <div>
        If you have not been automatically redirected, click on the following link:
      </div>
      {isAndroid ? (
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android">
          Open Android app
        </a>
      ) : isIOS ? (
        <a href="https://apps.apple.com/us/app/instagram/id389801252">
          Open iOS app
        </a>
      ) : (
        <a href="https://instagram.com">Open Web app</a>
      )}
    </div>
  );
};

export default App;
```

**Important note:** Do not try to test it on either iOS or Android by manually typing the url into the browser, as it will not work. Create a link somewhere that points to your React app and test by clicking on it.

## Summary

Mobile App Deep Linking is a very complicated subject. 

It is very hard to prepare a solution that works for every scenario.

Fortunately, you do not always have to take care of it yourself - there are a lot of paid services that would generate links for you and do all the redirect logic under the hood.