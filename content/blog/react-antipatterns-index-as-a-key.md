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

const result = data.map((element, index) => element + index);

console.log(result); // "[1, 3, 5]"
console.log(result === data); // "false"
```

The **map()** method returns a callback function, which accepts 3 arguments:

* **element** - currently processed item
* **index** - the index of the currently processed item
* **array** - the original array **map()** function was called on

The first argument is required, the last two are optional.

In the above example, which is, to be honest, a little more than useless, we added current element to its index (index starts from 0, right?) and retuned a new array with results.

Let's see how we can use this beautiful method to display the given numbers in React.

Basically, the code looks similar, except that instead of incrementing the number by its index, we just return it wrapped in a React element:

```jsx
const data = [1, 2, 3];

const result = data.map((element) => <li>{element}</li>);
                        
console.log(result); // A list of React elements
```

Wondering why do we call **li** a React element instead of a DOM node?

The full explanation is available on the [official React documentation](https://reactjs.org/docs/rendering-elements.html), but in short, React uses JSX, which is a syntax extension to JavaScript and all elements in JSX are React elements, which represent DOM nodes and are very cheap to create and manipulate.

If you take a closer look to the **result** variable in the above example, you will make sure that the above statement is true:

![React Element in JSX](/img/screenshot-2021-08-22-at-22.59.49.png "React Element in JSX")

## Render A List In React

Let's create a component in React that uses the code from the example above to render a list of numbers on the screen:

```jsx
import React from "react";

const data = [1, 2, 3];

const App = () => data.map((element) => <li>{element}</li>);
```

Nothing fancy for now, the example seems to be working, but if you check the console, you will be given a warning - **Each child in a list should have a unique "key" prop**:

![React warning](/img/screenshot-2021-08-22-at-23.05.11.png "React warning")

React tells us: "*Hey, please add a "key" to each list element, so I can better understand your code*".

If you want to have a deeper understanding why does React require us to provide a key, read [this article](/2020-06-21-what-is-key-in-react-and-why-do-we-need-it/).

Let's get rid of the warning:

```jsx
import React from "react";

const data = [1, 2, 3];

const App = () => data.map((element, index) => <li key={index}>{element}</li>);
```

And it is gone, good job!