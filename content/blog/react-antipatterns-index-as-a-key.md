---
title: "React Antipatterns: Index As A Key"
tag:
  - React
promote: false
metaDescription: Learn when using index as a key can be considered antipattern
  in React and when it is perfectly acceptable.
shareImage: /img/react-antipatterns-index-as-a-key.jpg
teaser: In modern web applications, lists are everywhere and knowing how to
  render them properly is one of the first things every developer should learn.
  Transforming lists into React elements is typically done using the map()
  method. It runs on an array of...
date: 2021-08-26T11:20:01.341Z
---
In modern web applications, lists are everywhere and knowing how to render them properly is one of the first things every developer should learn.

Transforming lists into React elements is typically done using the **map()** method.

It runs on an array of elements, performs certain operations, and returns a new array with the changes applied.

## The map() Method

Remember that **map()** does not modify the existing array, but returns a completely new one:

```javascript
const data = [1, 2, 3];

const result = data.map((element, index) => element + index);

console.log(result); // "[1, 3, 5]"
console.log(result === data); // "false"
```

The **map()** method returns a callback function that takes 3 arguments:

* **element** - the element currently being processed
* **index** - the index of the currently processed element
* **array** - the original array **map()** function was called on

The first argument is required, the last two are optional.

In the above example, which to be honest is a little more than useless, we added the current element with its index (index starts at 0, right?) and returned a new array with the results.

Let us take a look how we can use this awesome method to display the given numbers in React.

Basically, the code looks similar, except instead of incrementing the number by its index, we just return it wrapped in a React element:

```jsx
const data = [1, 2, 3];

const result = data.map((element) => <li>{element}</li>);
                        
console.log(result); // A list of React elements
```

Wondering why we call **li** a React element and not a DOM node?

You can find the full explanation on the [official React documentation](https://reactjs.org/docs/rendering-elements.html), but in short, React uses JSX, which is a syntax extension to JavaScript, and all elements in JSX are React elements, which represent DOM nodes and are very cheap to create and manipulate.

If you take a closer look at the **result** variable in the above example, you will verify that the above statement is true:

![React Element in JSX](/img/screenshot-2021-08-22-at-22.59.49.png "React Element in JSX")

## Render A List In React

Let's create a component in React that uses the code from the example above to display a list of numbers on the screen:

```jsx
import React from "react";

const data = [1, 2, 3];

const App = () => data.map((element) => <li>{element}</li>);
```

Nothing fancy for now, the example seems to work fine, but when you check the console, you get a warning - **Each child in a list should have a unique "key" prop**:

![React warning](/img/screenshot-2021-08-22-at-23.05.11.png "React warning")

React tells us: "*Hey, please add a "key" to each list element, so I can better understand your code*".

If you want a deeper understanding of why React requires us to provide a key, read [this article](/2020-06-21-what-is-key-in-react-and-why-do-we-need-it/).

**Let's ignore this warning for now**, developers often ignore warnings, don't they?

Typical real-world applications do more than just render a list of numbers, so let's create a way to provide a number to add to the list:

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

Open the console and check the warning - React is still trying to tell you something important, **ignore once again**.

Imagine that your application is working in production and some users try to use it and suddenly you get a feedback - some of them have added too long lists and need to scroll down the page to be able to add more.

Moreover, the most recently added element is at the bottom, so it's barely visible.

You need to change the code to add an element to the top of the list instead of the bottom:

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

We have made a few changes:

* Changed **data.push()** to **data.unshift()** to add an element to the beginning of an array instead of the end
* Changed the order of the elements in the **return** block so that **input** and **button** appear at the top of the list

Let's make sure our application still works:

![Real-World Application [2]](/img/feature-gif-2-.gif "Real-World Application [2]")

The warning has not gone away yet, right?

Eventually, it gets annoying and you need to find the time to investigate why this warning is occurring, what should we look out for? (Skip this if you read [this article](/2020-06-21-what-is-key-in-react-and-why-do-we-need-it/#Index-As-A-Key)).

## Why Does React Need A Key?

When the state of your component changes, the main job of the React library is to figure out what has changed in the fastest possible way to efficiently update User Interface.

Let's see what steps are taken in the examples above, starting with the first one where elements are added to the end of the list.

We render three **li** elements:

```html
<li>1</li>
<li>2</li>
<li>3</li>
```

And then add a new element to the end of the list above:

```html
<li>1</li>
<li>2</li>
<li>3</li>

<!-- New element -->
<li>4</li>
```

React now needs to compare an old list with the new one to identify what changes have been made.

It iterates over both lists at once and generates a mutation whenever there is a difference.

It is smart enough to match the first 3 elements and generate a mutation for the fourth element.

Looks good, doesn't it?

But what if the new element was added at the beginning of the list, like in the second example?

```html
<!-- New element -->
<li>0</li>

<li>1</li>
<li>2</li>
<li>3</li>
```

React performs 4 mutations instead of 1 because it does not know that the elements reflecting 1, 2 and 3 have not been touched because their position was changed.

The main problem here is inefficiency.

We could have avoided 3 unnecessary mutations by giving React a small hint: the **key** prop.

## The "Key" Prop

> Keys help React identify which elements have changed, been added, o removed. Keys should be given to the elements within the array to give the elements a stable identity.

Adding a **key** to the inefficient example above makes the tree conversion efficient:

```html
<!-- New element -->
<li key={3}>0</li>

<li key={0}>1</li>
<li key={1}>2</li>
<li key={2}>3</li>
```

Now React knows that the new element is the one with the key **3**, other elements have only changed their position.

Any value can be used as a key unless it is **unique**.

In case you do not have a unique value (we can not add a number itself as a key because someone can supply two identical numbers), it's also possible to use an **index** of an element inside the loop (which is exactly what was done in the example above).

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

Run the application and make sure it still works fine, but even though we added the **key**, nothing really changed.

React is still performing 4 mutations, because after adding a new element, all indexes are changed:

```html
<!-- Original list -->
<li key={0}>1</li>
<li key={1}>2</li>
<li key={2}>3</li>

<!-- ---------- -->

<!-- New element -->
<li key={0}>4</li>

<li key={1}>1</li> <!-- Previously: <li key={0}>1</li> -->
<li key={2}>2</li> <!-- Previously: <li key={1}>2</li> -->
<li key={3}>3</li> <!-- Previously: <li key={2}>3</li> -->
```

After adding a new element to the beginning of the array, it gets 0 as a key and all existing keys are shifted by 1.

These kinds of issues are extremely hard to debug, so remember the one thing to avoid them: **it's not recommended to use an index as a key when the order of the list elements may change.**

## What Happens If I Don't Pass The Key?

If you are wondering what happens if you don't pass the key, the answer is simple - apart from showing a warning, React will use indexes as keys as a fallback.

In any case, skipping a key is not recommended.

## Not Sure Of The Impact?

It may still not be clear how additional mutations affect the application, so we extract the **li** element into a separate component called **Element** and add a **useEffect()** with a **console.log()** to see when it is mounted and unmounted:

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

And use the newly created component in the **App**:

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

After starting the application, we see three elements being mounted and that is perfectly fine:

```html
Element: 1 mounted
Element: 2 mounted
Element: 3 mounted
```

But when we add a new element, we see all three existing elements being unmounted and mounted once again including the newly added element:

```html
Element: 1 unmounted
Element: 2 unmounted
Element: 3 unmounted
Element: 0 mounted
Element: 1 mounted
Element: 2 mounted
Element: 3 mounted
```

We destroy and re-mount old elements, which is not what we want, since they have not been changed, right?

If they contained some heavy logic, we will see a significant impact on the performance.

This is exactly the problem we will always face when we use index as a key in lists that can change the order of their elements.

## What Is The Solution?

We need to use a **unique** key, which is typically an **id** of an element that we get from the database.

However, in the above example, we do not have any id, so we should generate one ourselves.

To do this, install a library called [nanoid](https://www.npmjs.com/package/nanoid):

`yarn add nanoid`

And use it to generate unique identifiers for each of the existing elements as well as for newly created ones:

```jsx
// ...
import { nanoid } from "nanoid";

const data = [
  {
    id: nanoid(),
    value: 1,
  },
  {
    id: nanoid(),
    value: 2,
  },
  {
    id: nanoid(),
    value: 3,
  },
];

const App = () => {
  // ...

  const handleSubmit = () => {
    data.unshift({
      id: nanoid(),
      value,
    });
    // ...
  };

  // ...
};
```

Next, check the application - existing elements are no longer re-mounted:

![Identifiers, Generated With Npm Package](/img/nanoid-to-rescue.gif "Identifiers, Generated With Npm Package")

## Yet Another Example (Homework)

Hopefully by this point you understand what the key is, how to use it, and what problems can occur if you use it incorrectly.

Take a look at one more example:

```jsx
import React, { useState } from "react";

const initialData = [
  {
    id: 1,
    name: "First",
  },
  {
    id: 2,
    name: "Second",
  },
];

const App = () => {
  const [data, setData] = useState(initialData);

  const handleRemove = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <input type="text" defaultValue={item.name} />
          <button
            onClick={() => {
              handleRemove(item.id);
            }}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};
```

Run it, find a problem, understand why it occurs and fix it.

This is your homework, time to feel like a student.. again.

I strongly recommend that you do not skip this exercise, because only when you put your knowledge into practice will you gain confidence in what you are doing.

Please, let me know in the comments below if you managed to solve it or not.

## Summary

In this article, we learned why it's better to avoid using indexes as keys for React elements when rendering lists, which can change the order of their elements. 

However, it's perfectly safe to use indexes as keys for static lists (if you do not have another unique value that can be used instead).

Remember, though, that these static lists can never be reordered, filtered, searched, or removed.