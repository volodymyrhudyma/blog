---
title: Proxy Object In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: Accessing object properties is a very common operation in JavaScript. In
  some cases, it is extremely useful to perform an action just after the
  property has been accessed, but before the result is returned, so the result
  can be modified on fly. One of the possible solutions is to create...
date: 2021-04-28T16:31:10.516Z
---
Accessing object properties is a very common operation in JavaScript.

In some cases, it is extremely useful to perform an action just after the property has been accessed, but before the result is returned, so the result can be modified on fly.

One of the possible solutions is to create and invoke a custom function that would contain some logic around retrieved property:

```javascript
const user = {
  surname: "Doe",
  age: 18,
};

const getName = () => {
  return user.name || "Unknown";
};

const name = getName();

// Prints "Unknown"
console.log(name);
```

 But a better solution would be to use Proxy Object in JavaScript, which is designed exactly for this purpose.

## The Proxy Object