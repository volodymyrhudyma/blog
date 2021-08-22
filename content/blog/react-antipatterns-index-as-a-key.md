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

**Let's ignore this warning for now**, developers often ignore warnings, aren't they?

Typical real-world applications do more than just rendering a list of numbers, so let's create a possibility to provide a number to be added to the list:

```jsx
import React, { useState } from "react";

const data = [1, 2, 3];

const App = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    data.push(value);
    setValue("");
  };

  return (
    <>
      {data.map((element) => (
        <li>{element}</li>
      ))}
      <input type="number" value={value} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
```

The above code in action:

![Real-World React Application](/img/feature-gif.gif "Real-World React Application")

Open the console and check the warning - React is still trying to tell something important to you, **ignore once again**.

Imagine that your application is working in production and some users try to use it and suddenly you receive a feedback - some of them added too long lists and they must scroll the page down to be able to add more.

Moreover, the last added element is on the bottom, so it's barely visible.

You have to change the code to add an element to the top of the list, instead of to the bottom:

```jsx
// ...

const App = () => {
 
  // ...
  const handleSubmit = () => {
    data.unshift(value);
    
    // ...
  };

  return (
    <>
      <input type="number" value={value} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      {data.map((element) => (
        <li>{element}</li>
      ))}
    </>
  );
};
```

We did a few changes:

* Changed **data.push()** to **data.unshift()** to add an element to the beginning of an array instead of to the end
* Changed the order of elements in the **return** block, so to render **input** and **button** on the top of the list

Let's make sure our application is still working:

![Real-World Application [2]](/img/feature-gif-2-.gif "Real-World Application [2]")

The warning is not gone yet, right?

Finally, it gets annoying and you have to find the time to investigate why this warning happens what issues we should be aware about? (Skip this if you read [this article](/2020-06-21-what-is-key-in-react-and-why-do-we-need-it/#Index-As-A-Key)).

## Why Does React Need A Key?

When the state of your component changes, the main job of the React library is to figure out what has changes in the fastest possible way to efficiently update the User Interface.

Let's see what steps are taken in the above examples, starting from the first one, where elements are added to the bottom of the list.

We render three **li** elements:

```html
<li>1</li>
<li>2</li>
<li>3</li>
```

And then append a new element to the end of the above list:

```html
<li>1</li>
<li>2</li>
<li>3</li>

<!-- New element -->
<li>4</li>
```

React now has to compare an old list with the new one to identify what changes were made.

It iterates over both lists at the same time and generates a mutation whenever there’s a difference.

It is smart enough to match the first 3 elements and generate a mutation for the fourth one.

Looks good, right?

But what if the new element was added to the beginning of the list, like in the second example?

```html
<!-- New element -->
<li>0</li>

<li>1</li>
<li>2</li>
<li>3</li>
```

React runs 4 mutations instead of 1 because it doesn't know that the elements rendering 1, 2 and 3 weren't touched because their position was changed.

The main problem here is inefficiency.

We could have avoided 3 unnecessary mutations by providing a small hint to React: the **key** prop.

## The "Key" Prop

> Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

Adding a **key** to an inefficient above example makes the tree conversion efficient:

```html
<!-- New element -->
<li key={3}>0</li>

<li key={0}>1</li>
<li key={1}>2</li>
<li key={2}>3</li>
```

Now, React knows that the new element is the one with the key **3**, other elements have just changed their positions.

Any value can be used as a key unless it's **unique**.

In case if you don't have any unique value (we can't add a number itself as a key, because someone can provide two identical numbers), it's also possible to use an **index** of an element inside of the loop (which is exactly what has been done in the above example).

Let's fix our React component:

```jsx
// ...

const App = () => {
  // ...
  return (
    <>
      {/*  // ... */}
      {data.map((element, index) => (
        <li key={index}>{element}</li>
      ))}
    </>
  );
};
```

Note how we added **key** to the **li** element.

Run the application and make sure that it still works fine, but even though we have added the **key**, nothing really changed.

React still runs 4 mutations, because after adding a new element, all indexes are changed:

```html
<!-- Original list -->
<li key={0}>1</li>
<li key={1}>2</li>
<li key={2}>3</li>

<!-- ---------- -->

<!-- New element -->
<li key={0}>4</li>

<li key={1}>1</li>
<li key={2}>2</li>
<li key={3}>3</li>
```

After adding a new element to the beginning of the array, it receives 0 as a key and all existing keys are shifted by 1.

These kinds of issues are extremely hard to debug, so remember the one thing in order to avoid them: **it's not recommended to use an index as a key if an order of list elements may change.**

## Not Sure Of The Impact?

It may still not be obvious how do extra mutations impact application, so let's extract **li** element to a separate component called **Element** and add a **useEffect()** with a **console.log()** to see when it's mounted and unmounted:

```jsx
const Element = ({ element }) => {
  useEffect(() => {
    console.log(`Element: ${element} mounted`);
    return () => {
      console.log(`Element: ${element} unmounted`);
    };
  }, [element]);

  return <li>{element}</li>;
};
```

And use newly created component in the **App**:

```jsx
// ...
import Element from "./Element";

const App = () => {
  // ...
  return (
    <>
      {/*  // ... */}
      {data.map((element, index) => (
        <Element key={index} element={element} />
      ))}
    </>
  );
};
```

Run the application and check the console:

![Index As A Key Problem](/img/index-as-a-key-problem.gif "Index As A Key Problem")

After the start of the application, we see how three elements are mounted and that's perfectly fine:

```html
Element: 1 mounted
Element: 2 mounted
Element: 3 mounted
```

But when we add a new element, we see how all three existing elements are unmounted and mounted once again including the newly added element:

```html
Element: 1 unmounted
Element: 2 unmounted
Element: 3 unmounted
Element: 0 mounted
Element: 1 mounted
Element: 2 mounted
Element: 3 mounted
```

We destroy and re-mount old elements, which is not what we want, since they were not changed, right?

If they contained some heavy logic, we will see a significant impact on the performance.

This is exactly the problem we will always face, when using index as a key in lists, which can change order of their elements.

## What Is The Solution?

We need to use a **unique** key, which is typically an **id** of an element, which we receive from the database.

However, in the above example we don't have any id, so we should generate one ourselves.

To do that, install a library called [nanoid](https://www.npmjs.com/package/nanoid):

`yarn add nanoid`