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

The above example is a little more than useless, so let's see how we can use this beautiful method to display those numbers in React.

Basically, the code would look exactly the same, except that instead of incrementing the number by 1, we would return React element:

```jsx
const data = [1, 2, 3];

const result = data.map((item) => <li>{item}</li>);
                        
console.log(result); // A list of React elements
```

Wondering why do we call **li** a React element instead of a DOM node?

The full explanation is available on the [official React documentation](https://reactjs.org/docs/rendering-elements.html), but in short, React uses JSX, which is a syntax extension to JavaScript and all elements in JSX are React elements, which represent DOM nodes and are very cheap to create and manipulate.

If you take a closer look to the **result** variable in the above example, you will make sure that the above statement is true:

![React Element in JSX](/img/screenshot-2021-08-22-at-22.59.49.png "React Element in JSX")

## The React Example