---
title: The Limitations and Safety of LocalStorage in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn LocalStorage in JavaScript - a widely used Web Storage,
  which is used for keeping the data locally within the user's browser and all
  its limitations and safety concerns.
teaser: "**LocalStorage** is a widely used Web Storage, which is used for
  keeping the data locally within the user's browser. The data stored there has
  no expiration time, which means that that it persists until..."
date: 2020-12-11T16:38:10.184Z
---
**LocalStorage** is a widely used Web Storage, which is used for keeping the data locally within the user's browser.

The data stored there has no expiration time, which means that it persists until it is cleared with the code or manually by the user.

Stored data is specific to the protocol of the page. Saving a value on `http://example.com` would result in using a different LocalStorage than on `https://example.com`.

The same rule applies to the domain names, you cannot access anything stored in the LocalStorage on another domain.

## The "localStorage" property

The read-only `localStorage` property allows you to access a Web Storage for the specific domain.

#### Store a value

```javascript
localStorage.setItem(key, value);
```

* **key** is a string containing the name under which the value can be accessible
* **value** is a string containing the actual value to be stored
* Returns `undefined`
* Throws an exception if the Storage is full

#### Retrieve a value

```javascript
const value = localStorage.getItem(key);
```

* **key** is a string containing the name of the key you want to get the value of
* Returns string **value** or **null** if the key does not exist

#### Remove a value

```javascript
localStorage.removeItem(key);
```

* **key** is a string containing the name of the key you want to get rid of
* If the **key** does not exist, the method will do nothing
* Returns `undefined`

#### Remove all values

```javascript
localstorage.clear();
```

* Clears all the key-value pairs stored in the Storage for the domain
* Returns `undefined`

## Limitations

The API is pretty simple and straightforward, so it may seem like you can store anything there without any limits and it's safe. 

But that's not entirely true:

* LocalStorage is synchronous

  It blocks the main thread from being executed until the operation is complete, which has a negative impact on the performance of an application, especially if there are a lot of operations.
* LocalStorage can contain strings only

  However, the data can be serialized with `JSON.stringify`:

```javascript
localStorage.setItem(key, JSON.stringify(object));
```

* LocalStorage is limited to 5MB only (across all major browsers)

  This may seem like a huge limit for storing strings, but there are certain types of applications that have to store a bunch of data to support an offline mode, etc.
* LocalStorage is not accessible from the Web or Service Workers

  If the application takes advantage of different Workers, the data stored in LocalStorage cannot be accessed within the Worker.

## Security

Any JavaScript code within your page has access to the LocalStorage, which means that it is open for different kinds of attacks (for example Cross-Site Scripting).

> **Cross-site scripting (XSS)** is a type of security vulnerability typically found in web applications. 
>
> XSS attacks enable attackers to inject client-side scripts into web pages viewed by other users.

If someone injects his own JavaScript code into your website, he can retrieve all the data stored in the LocalStorage and send it anywhere.

Any sensitive data that is stored in the LocalStorage can be stolen.

## What am I Allowed To Store?

The answer is simple - any publicly available, not sensitive data that needs to be shared across different tabs or windows on the same domain.

One of the most common use cases is to store the JSON Web Tokens (JWTs).

That's not secure, because if someone gets your token, he will be able to make requests on your behalf.

Treat the token as a password and secure it as much as you can.

## Summary

In summary, if you need to store publicly available, non-sensitive data, which can be converted to a string, is less than 5MB, should not be accessible from the Workers, and is not fetched often, then the LocalStorage is a good and safe way to go.

Otherwise, other options should be considered.