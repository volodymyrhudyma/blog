---
title: The Limitations and Security of LocalStorage in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn about LocalStorage in JavaScript - a widely used Web
  Storage, used to store the data locally in the user's browser with all its
  limitations and security concerns.
teaser: LocalStorage is a widely used Web Storage that is used to keep the data
  local in the user's browser. The data stored there has no expiry date, i.e. it
  remains stored until it is deleted with the code or manually by the...
date: 2020-12-11T16:38:10.184Z
---
**LocalStorage** is a widely used Web Storage that is used to keep the data local in the user's browser. 

The data stored there has no expiry date, i.e. it remains stored until it is deleted with the code or manually by the user.

Stored data is specific to the protocol of the page. Storing a value on `http://example.com` would result in a different LocalStorage being used than on `https://example.com`.

The same rule applies to domain names, you cannot access anything stored in the LocalStorage on another domain.

## The "localStorage" property

The read-only `localStorage` property allows you to access a Web Storage for the specific domain.

#### Store a value

```javascript
localStorage.setItem(key, value);
```

* **key** is a string containing the name under which the value is accessible
* **value** is a string containing the actual value to be stored
* Returns `undefined`
* Throws an exception when the Storage is full

#### Retrieve a value

```javascript
const value = localStorage.getItem(key);
```

* **key** is a string containing the name of the key from which you want to get the value of
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

The API is pretty simple and straightforward, so it may seem like you can store everything there without any restrictions and it is safe. 

But that is not entirely true:

* LocalStorage is synchronous

  LocalStorage is synchronous It blocks the execution of the main thread until the operation is complete, which has a negative effect on the performance of an application, especially when there are many operations.
* LocalStorage can only contain only

  However, the data can be serialized with `JSON.stringify`:

```javascript
localStorage.setItem(key, JSON.stringify(object));
```

* LocalStorage is limited to only 5MB (across all major browsers)

  This may seem like a huge limit for storing strings, but there are certain types of applications that need to store a lot of data to support offline mode, etc.
* LocalStorage is not accessible from the Web or Service Workers

  If the application uses different Workers, the data stored in LocalStorage cannot be accessed within the Worker.

## Security

Any JavaScript code within your page has access to the LocalStorage, which means that it is open to various types of attacks (for example Cross-Site Scripting).

> **Cross-Site Scripting (XSS)** is a type of vulnerability typically found in web applications. 
>
> XSS attacks allow attackers to inject client-side scripts into Web pages viewed by other users.

If someone injects their own JavaScript code into your website, they can retrieve all the data stored in the LocalStorage and send it anywhere.

All sensitive data stored in LocalStorage can be stolen.

## What am I Allowed To Store?

The answer is simple - all publicly available, non-sensitive data that needs to be shared across different tabs or windows in the same domain.

One of the most common use cases is to store JSON Web Tokens (JWTs).

This is not secure, because if someone gets your token, they can make requests on your behalf.

Treat the token like a password and secure it as well as possible.

## Summary

In summary, LocalStorage is a good and secure way to store publicly accessible, non-sensitive data that can be converted to a string, is less than 5 MB in size, should not be accessible by workers, and is not accessed often. 

Otherwise, other options should be considered.