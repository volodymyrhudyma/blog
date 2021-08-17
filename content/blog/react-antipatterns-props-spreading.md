---
title: "React Antipatterns: Props Spreading"
tag:
  - React
promote: false
metaDescription: Learn why using Spread Operator to pass props to the child
  component may be considered as an antipattern in React.
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

Today we will learn why [Spread Operator](/2020-05-24-spread-operator-in-javascript/) is great, but better avoided when passing down a set of props in React.

## Spread Operator Is Awesome

To begin with, let's learn or remind ourselves what Spread Operator does and why is it awesome.

The Spread Operator is used to access all elements inside of an Iterable:

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

**Important note:** the Spread Operator does a **shallow copy** of the Iterable.

Let's see some example use cases of this operator.

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

In React, if you have props as an object and you want to pass in to the child component, you can use the Spread Operator to do so:

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

Or overwrite a property, passed using the Spread Operator:

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

It seems like using the Spread Operator brings only benefits, shortens the code and makes it more sophisticated, but that's not entirely true.

## Why It Should Better Be Avoided?

While, in some cases, it is totally fine to use the Spread Operator, you have to be very careful, because it's easy to pass unnecessary props by accident, which will cause extra re-renders and will have a major impact on the application's performance.

The second drawback of this approach comes into play if you pass a lot of props to the child component - it is easy to get lost and spend a few minutes guessing what exactly is passed, unless you use TypeScript and explicitly define what is expected by the child component.

#### \#1 - Extra Re-Renders And Performance Impact

Let's build an application that contains two components: **App** and **User**.

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

* Changing the **counter** variable in state after button click
* Rendering the **User** component passing all necessary (and one extra!) props

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

**Important note:** We could have skipped **curly braces** and **return** in the **User** component for simplicity, but let's keep them for now. We also user **React.memo()** to make sure that the **User** component won't re-render unnecessarily with the **App**.

This component is responsible only for printing the name and the surname of the user to the screen.

The look of our application is nowhere near fancy, but the topic is not about the design, right?

![The look of an application](/img/screenshot-2021-08-15-at-11.31.09.png "The look of an application")

Let's take a close look at the **App.jsx**, especially at the following lines of code:

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

We know that the **User** component expects only two properties - **name** and **surname**, but we passed the whole **state**, adding an extra **counter**, which causes the **User** component to re-render unnecessarily. since the **counter** is not used, remember?

Let's verify this:

![User component re-renders unnecessarily](/img/antipatterns-two-renders.gif "User component re-renders unnecessarily")

See how both **App** and **User** components are wrapped into the borders, when updating, which means that both of them updated on button click, which is wrong, since the **User** component shouldn't update.

Let's change a bit the code of the **App** component to avoid using Spread Operator, but to explicitly pass **name** and **surname** props:

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

See how only one border, wrapping the whole **App** component appears.

If you are not familiar with the "Highlight updates when components render" feature of the React dev tools, you can add **console.log()** to both components and check the console.

#### \#2 - Easy To Get Lost In Passed Props

This drawback applies only to the applications not using TypeScript.

If you have a lot of props in an object, using Spread Operator makes passing them to the.child component easier, but it is easy to lose control of them:

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

* To figure out what is passed, you need to scroll to the place where **state** is defined (assuming the **User** component will not destructure props) or to the **User** component (if props are destructured):

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

* If you forget that the Spread Operator is used and add one more property to the **state**, it will be unnecessarily passed to the **User** component

## Wait, Is It Really An Antipattern?

Stating that using Spread Operator is an antipattern is **not 100% accurate**.

Using it equals to saying "**Pass all these props to this component**", so we should not complain that some extra properties are passed when using it with the intention to pass only a part of them.

I personally like to think about as of an antipattern, because it makes me to double check the code and ensure that I need or don't need the Spread Operator in the specific component, i.e., use it wisely.

However, it is totally safe to use it with TypeScript, since you will get a quick overview of what props are passed and an instant error if any unexpected property occurs.

## Summary

Learning how not to write code is as important as learning best practices and design patterns.

There are a lot of ways to write poor code in React, which are well-known and should be either avoided or known about.

Today we learned why using the Spread Operator to pass props to the child component in React can be considered as an antipattern:

* You may accidentally pass more props than needed
* It is hard to see what props are actually passed unless you use TypeScript

Definitely, Spread Operator makes your code look more elegant and shorter, but remember to use it wisely.