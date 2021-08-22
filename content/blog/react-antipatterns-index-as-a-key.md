---
title: "React Antipatterns: Index As A Key"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/react-antipatterns-index-as-a-key.jpg
teaser: // TEASER
date: 2021-08-26T11:20:01.341Z
---
In modern web applications lists are everywhere and knowing how to render them properly is one of the first things every developer should learn.

Transforming lists into React elements is typically done via the **map()** method.

It takes an array of elements, performs specified operations and returns a new array with the applied changes.

## The map() Method

Remember, that **map()** does not mutate the existing array, it returns completely new one:

```javascript
const data = [1, 2, 3];

const result = data.map((item) => item + 1);

console.log(result); // "[2, 3, 4]"
console.log(result === data); // "false"
```