---
title: Open Mobile Application From The Browser
tag:
  - React
promote: false
metaDescription: // META
teaser: Launching mobile application of the specific page from the browser is
  called mobile app Deep Linking. It is very useful if you have both, web and
  mobile applications and want to make easy navigation between them. You may run
  an email campaign that contains a link to your mobile application, clicking on
  which...
date: 2021-01-29T21:21:22.418Z
---
Launching mobile application of the specific page from the browser is called **Mobile App Deep Linking**.

It is very useful if you have both, web and mobile applications and want to make easy navigation between them.

You may run an email campaign that contains a link to your mobile application, clicking on which users can read more about your products in your application.

There are a lot of use cases, but the general purpose is to optimize user experience and increase conversion rate.

## Deep Linking Types

There are two main types of Deep Links:

* Default

  The link opens an application if it is installed, otherwise shows an error message.
* Deferred

  The link opens an application if it is installed, otherwise redirects the user to Play or App Store (or to any other chosen location).

Besides of these, you may have heard about **Contextual Deep Linking**.

Contextual Deep Links are usually default or deferred with some additional parameters added to gather more information about users.

## Creating A Deep Link

Let's create a Deferred deep link to out mobile application that would open it, if installed, otherwise redirect to the Store, where the user can download it.

**Important note:** this solution may not work properly in all browsers or older Android/iOS versions. However, it should work fine with Chrome and Safari.

**ANDROID:**

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

For Android, Google provides the Intent URL.

Make sure to replace **APP_NAME** and **APP_PACKAGE** with the values that belong to your mobile application, **APP_HOST** is an optional host value, which may not be needed (but is required to open instagram app in the next example).

Example code for Instagram:

```javascript
// Open Instagram
const url = "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;end";

window.location.replace(url); 
```

**IOS:**

```javascript
window.location.replace("APP_NAME"); 

setTimeout(() => {
  window.location.replace("APP_STORE_URL"); 
}, 10000);
```

For iOS, try to open mobile app and set the timeout to a few seconds which will only run if an app is not installed.

Make sure to replace **APP_NAME** and **APP_STORE_URL** with the values that belong to your mobile application.

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

Install [react-device-detect](https://www.npmjs.com/package/react-device-detect) library that would help us to detect the user's operation system:

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
        If you have not been redirected automatically, click the following link:
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

## Summary

Mobile App Deep Linking is a very complicated topic. It is very hard to prepare a solution that works for every scenario.

Fortunately, you do not always have to take care of it by yourself - there are a lot of paid services that would generate links for you and handle all the redirect logic under the hood.