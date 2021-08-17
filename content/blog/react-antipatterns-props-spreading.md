---
title: "React Antipatterns: Props Spreading"
tag:
  - React
promote: false
metaDescription: Learn why using Spread Operator to pass props to the child
  component can be considered an antipattern in React.
shareImage: /img/react-antipatterns-1.jpg
teaser: Most of the time we learn how to write code, we memorize best practices,
  design patterns, clean code principles, and that's perfectly fine, but
  learning how not to write code is no less important. Antipatterns, just like
  patterns, have been around for...
date: 2021-08-18T07:36:13.134Z
---
Most of the time we learn how to write code, we memorize best practices, design patterns, clean code principles, and that's perfectly fine, but learning how not to write code is no less important.

Antipatterns, just like patterns, have been around for a long time and it's worth learning and remembering them to avoid code smell.

With this article, we are starting a new chapter called "**React Antipatterns**", which will consist of a few articles showing how not to write code in React and explaining why.

Today we will learn why [Spread Operator](/2020-05-24-spread-operator-in-javascript/) is great, but better avoided when passing a set of props in React.

## Spread Operator Is Awesome

First, let's learn or remember what Spread Operator does and why it's awesome.

The Spread Operator is used to access all the elements within an Iterable:

```javascript
// Array
const numbers = [1, 2, 3, 5];
const numbersCopy = [...numbers]; // "[1, 2, 3, 5]"

// Object
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};
const userCopy = {...user}; // { name: "John", surname: "Doe", age: 18 }

// String
const string = "string";
const array = [...string]; // ["s", "t", "r", "i", "n", "g" ]
const obj = {...string}; // {"0": "s", "1": "t", "2": "r", "3": "i", "4": "n", "5": "g"}
```

**Important Note:** the Spread Operator makes a **shallow copy** of the Iterable.

Let's look at some usage examples for this operator.

#### \#1 - Merge Arrays

```javascript
const parents = ["John", "Andrew"];
const children = ["Ann", "Rose"];

const humans = [...parents, ...children];

console.log(humans); // Prints ["John", "Andrew", "Ann", "Rose"]
```

#### \#2 - Merge Objects

```javascript
const positiveNumbers = {
  one: 1,
  two: 2,
};

const negativeNumbers = {
  minusOne: -1,
  minusTwo: -2,
};

const numbers = {
  ...negativeNumbers,
  ...positiveNumbers,
};

// Prints "{ minusOne: -1, minusTwo: -2, one: 1, two: 2 }"
console.log(numbers);
```

#### \#3 - Pass arguments into a function

```javascript
const add = (number1, number2, number3) => number1 + number2 + number3;

const numbers = [1, 2, 3];

// Spreads array of numbers to a function arguments
const result = add(...numbers);

console.log(result); // Prints "6"
```

#### \#4 - Update Object Property Without Mutating It

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const newUser = {
  ...user,
  age: 22,
};

// Prints {name: "John", surname: "Doe", age: 18}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

## Props Spreading In React

If you have props as an object in React and want to pass them to the child component, you can use the Spread Operator to do so:

```jsx
const App = () => {
  const props = {
    name: "John", 
    surname: "Doe",
  };
  return <User {...props} />;
}
```

The above code is a shorthand for:

```jsx
const App = () => {
  const props = {
    name: "John", 
    surname: "Doe",
  };
  return <User name={props.name} surname={props.surname} />;
}
```

You can even combine it with explicit props passing:

```jsx
const App = () => {
  const props = {
    name: "John", 
    surname: "Doe",
  };
  return <User age={18} {...props} />;
}
```

Or override a property passed with the Spread Operator:

```jsx
const App = () => {
  const props = {
    name: "John", 
    surname: "Doe",
    age: 21,
  };
  return <User {...props} age={18} />;
}
```

It seems like using Spread Operator only brings benefits, shortening the code and making it more sophisticated, but that's not quite true.

There are a few things to remember about to get the most out of it.

## Why It Should Better Be Avoided?

While it's perfectly fine to use Spread Operator, you need to be very careful, as it's easy to accidentally pass unnecessary props, resulting in extra re-renders and greatly impacting the performance of the application.

The second drawback of this approach comes into play when you pass a lot of props to the child component - it's easy to get lost and spend a few minutes guessing what exactly is being passed, unless you use TypeScript and explicitly define what is expected by the child component.

#### \#1 - Extra Re-Renders And Performance Impact

Let's create an application that contains two components: **App** and **User**.

**App.jsx**

```jsx
import React, { useState } from "react";

import User from "./User";

const App = () => {
  const [state, setState] = useState({
    count: 0,
    name: "John",
    surname: "Doe",
  });

  const handleClick = () => {
    setState((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
  };

  return (
    <div className="App">
      App Component: count - {state.count}
      <button onClick={handleClick}>Add count</button>
      <User {...state} />
    </div>
  );
};

export default App;
```

This component is responsible for:

* Changing the **counter** variable in the state after the button is clicked
* Rendering the **User** component with all necessary (and one extra!) props

**User.jsx**

```jsx
import React from "react";

const User = (props) => {
  return (
    <div>
      User Component: name - {props.name}, Surname - {props.surname}
    </div>
  );
};

export default React.memo(User);
```

**Important Note:** For simplicity, we could have omitted **curly braces** and **return** in the **User** component, but we will keep them for now. We also use **React.memo()** to ensure that the **User** component is not unnecessarily re-rendered with the **App**.

This component is only responsible for outputting the name and the surname of the user to the screen.

The look of our application is far from fancy, but the topic is not about the design, is it?

![The look of an application](/img/screenshot-2021-08-15-at-11.31.09.png "The look of an application")

Let's take a closer look at **App.jsx**, specifically at the following lines of code:

```jsx
const App = () => {
  const [state, setState] = useState({
    count: 0,
    name: "John",
    surname: "Doe",
  });
  
  // ...
  return (
    // ...
      <User {...state} />
    // ...
  );
};
```

We know that the **User** component expects only two properties - **name** and **surname**, but we passed the entire **state** and added an extra **counter**, which causes the **User** component to be unnecessarily re-rendered since the **counter** isn't used, remember?

Let's verify this:

![User component re-renders unnecessarily](/img/antipatterns-two-renders.gif "User component re-renders unnecessarily")

See how both the **App** and **User** components are wrapped into the borders when they're updated, which means that both are refreshed when the button is clicked, which is wrong because the **User** component shouldn't be refreshed. 

Let's change the **App** component code a bit to avoid using Spread Operator, but to explicitly pass the **name** and **surname** props:

```jsx
const App = () => {
  const [state, setState] = useState({
    count: 0,
    name: "John",
    surname: "Doe",
  });
  
  // ...
  return (
    // ...
      <User name={state.name} surname={state.surname} />
    // ...
  );
};
```

And verify the change:

![User component does not re-render unnecessarily](/img/antipatterns-one-render.gif "User component does not re-render unnecessarily")

See how only one border, wrapping the entire **App** component appears.

If you are not familiar with the "Highlight updates when components render" feature of the React dev tools, you can add **console.log()** to both components and check the console.

#### \#2 - Easy To Get Lost In Passed Props

This drawback only applies to applications that do not use TypeScript.

If you have many props in an object, using Spread Operator makes it easier to pass them to the child component, but it's easy to lose control of them:

```jsx
const App = () => {
  const [state, setState] = useState({
    count: 0,
    name: "John",
    surname: "Doe",
    age: 18,
    address: {
      street: "Street, 1/3",
      postCode: "12-345",
    },
    showDetails: true,
    showSendButton: false,
    // ...
  });
  
  // ...
  return (
    // ...
      <User {...state} />
    // ...
  );
};
```

* To find out what is being passed, you need to scroll to where **state** is defined (assuming that the **User** component does not destructure the props) or to the **User** component (if the props are destructured):

```jsx
const User = (props) => { 
  // ... 
};

const User = ({
  count,
  name,
  surname,
  age,
  address: { street, postCode },
  showDetails,
  showSendButton,
}) => {
  // ... 
};
```

* If you forget that Spread Operator is used and add another property to **state**, it will be unnecessarily passed to the **User** component

## Wait, Is It Really An Antipattern?

The claim that using Spread Operator is antipattern is **not 100% accurate**.

The usage is equivalent to saying "**Pass all these props to this component**", and we complain that all properties are really passed, weird, isn't it?

Personally, I like to think of this as an antipattern because it makes me triple check the code and make sure Spread Operator is needed in the particular component, which means that I use it wisely. 

However, it's perfectly safe to use it with TypeScript because you get a quick overview of what props are being passed and get an error immediately if an unexpected property occurs.

## Summary

Learning how not to write code is as important as learning best practices and design patterns. 

here are many ways to write bad code in React that are well known and should either be avoided or at least known about.

Today we learned why using Spread Operator to pass props to the child component in React can be considered antipattern:

* You can accidentally pass more props than necessary
* It's hard to tell which props are actually being passed unless you use TypeScript

In any case, Spread Operator makes your code look more elegant and shorter, but remember to use it wisely.