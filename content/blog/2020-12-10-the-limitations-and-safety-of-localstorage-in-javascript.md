---
title: The Limitations and Safety of LocalStorage in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
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

#### Remove all values

```javascript
localstorage.clear();
```

* Clears all the key-value pairs stored in the Storage for the domain

## An Example

Here is a quick real-world example of a React component that interacts with the LocalStorage: