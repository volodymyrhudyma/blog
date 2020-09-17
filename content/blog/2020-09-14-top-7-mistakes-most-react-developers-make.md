---
title: Top 7 Mistakes Most React Developers Make
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-09-16T16:26:17.605Z
---
## Direct state modification

Every developer who starts working with React is being taught that the state should not be modified directly.

But what are the reasons behind it? What happens if the state is directly modified?

Consider the following example:

```jsx
import React, { Component, Fragment } from 'react';

import { Button, Text } from './styled';

class App extends Component {
  state = {
    count: 0,
  };

  handleMutableUpdate = () => {
    this.state.count = this.state.count + 1;
  };

  handleImmutableUpdate = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <>
        <button onClick={this.handleMutableUpdate}>Mutable update</button>
        <button onClick={this.handleImmutableUpdate}>Immutable update</button>
        <div>Count: {this.state.count}</div>
      </>
    );
  }
}

export default App;
```

Notice what happens when the "**Mutable update**" button is clicked **once**.

Nothing?

Then click on the "**Immutable update**" button and notice how the `count` has changed to `2`:

![Mutable vs Immutable state update](/img/mut-immut.gif "Mutable vs Immutable state update")

Obviously, we received `2` because the state has been updated two times: directly and via `setState` method.

Using `setState` re-renders the component, kicking off the process called reconciliation.

> **Reconciliation** is the process of updating DOM (Document Object Model) by making changes to the component based on the change in state.

You can think of `render` as of function that creates a tree of React elements.

When the state gets updated, it produces a different tree and React needs to figure out how to efficiently update the DOM to match the most recent tree.

The default created by the React for the example above:

```jsx
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {
    children: [
      {
        $$typeof: Symbol(react.element),
        key: null,
        props: {
          children: "Mutable update",
          onClick: Function,
        },
        ref: null,
        type: "button",
      },
      {
        $$typeof: Symbol(react.element),
        key: null,
        props: {
          children: "Immutable update",
          onClick: Function,
        },
        ref: null,
        type: "button",
      },
      {
        $$typeof: Symbol(react.element),
        key: null,
        props: {
          children: [
            "Count: ",
            0,
          ],
        },
        ref: null,
        type: "div",
      },
    ],
  },
  ref: null,
  type: Symbol(react.fragment),
}
```

This is how the new tree looks like, after clicking on the "**Immutable update**" button (it remained the same except for the element with a type of "**div**"):

```jsx
// The structure is the same, just this child element slightly changed
{
  $$typeof: Symbol(react.element),
  key: null,
  props: {
    children: [
      "Count: ",
      1,
    ],
  },
  ref: null,
  type: "div",
},
```

The problem to be solved: **transform one tree into another most efficiently**.

There are some generic algorithms that solve the given problem, however, all of them have `O(N3)` complexity which makes them inefficient.

Imagine having to do 1 million comparisons to display 1000 elements. 

Far too expensive to be used in real projects.

That is why React implements a heuristic algorithm with `O(N)` complexity based on the two assumptions.

#### Assumption #1: two elements of different types will produce different trees

For example, when the root elements have different types, React will tear down old tree an build a new one from scratch:

```jsx
<div>
  <MyComponent />
<div>
  
<span>
  <MyComponent />
<span>
  
<MyParent>
  <MyComponent />
</MyParent>
```

Old `MyComponent` will be destroyed and **destroy** lifecycle hook will be executed and a new one will be re-mounted executing **mount** hook even though nothing related to it has changed.

If there were any more child components, they all would also be destroyed and re-mounted.

When the DOM elements have the same type, React goes through their attributes and only updates the changed ones:

```jsx
<div className="parent" />
  
<div className="child" />
```

React knows to only modify `className`.

When the Component elements have the same type, the instance stays the same in order to maintain the state across the renders.

React updates the props of the underlying component instance to match the new element and calls the update lifecycle hook on it.

Then, the `render` method is called and the diff algorithm recurses.

When recursing on children of a DOM node, React iterates over both lists of children simultaneously and creates a mutation if any difference has been found.

For example, adding an element to the end of the list is efficient:

```jsx
<ul>
  <li>One</li>
  <li>Two</li>
</ul>

<ul>
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

React will match the first two elements and insert the third one.

But adding an element at the beginning or in the middle has worst performance:

```jsx
<ul>
  <li>One</li>
  <li>Two</li>
</ul>

<ul>
  <li>Three</li>
  <li>One</li>
  <li>Two</li>
</ul>
```

React will mutate every `li` element instead of realizing that two of them can be kept.

Solving this issue is the topic of the next point.

#### **Assumption #2: the developer can hint at which child elements may be stable across different renders with a `key` prop**

React supports `key` attribute, which is used by the library to match children in the original tree with children in the subsequent tree:

```jsx
<ul>
  <li key="one">One</li>
  <li key="two">Two</li>
</ul>

<ul>
  <li key="three">Three</li>
  <li key="one">One</li>
  <li key="two">Two</li>
</ul>
```

Now React knows that the elements with the keys "**one**" and "**two**" have just changed their position and the element with the key "**three**" is the new one.

After general overview of how React performs updates, you might have guessed that modifying the state directly will not trigger the whole reconciliation process, therefore would not re-render the component.

## Not using "key" properly

After figuring out what `key` is used for, it is necessary to know the right way to set it, as not setting it properly results in unexpected errors.

#### Rule #1: "key" should be unique among siblings

In other words, each item within an array should have a unique key, but it should not be unique globally:

```jsx
<ul>
  {data.map((item) => (
    <li key={item.id}>
      {item.name}
      {item.children.map((child) => (
        <div key={child.id}>{child.name}</div>
      ))}
    </li>
  ))}
</ul>
```

`child.id` can be the same as `item.id` as they aren't siblings.

Wondering what happens if React encounters two elements with the same **key**?

The following warning will be shown in the console:

![React duplicated keys warning](/img/screenshot-2020-09-15-at-22.54.50.png "React duplicated keys warning")

#### Rule #2: Use "index" as a "key" only if the list is static (it is not possible to reorder/add/remove elements)

Using **index** as a key leads to unexpected errors when the order of your list elements can be changed:

React doesn't understand which item was added/removed/reordered since an **index** is given on each render based on the order of the items in the array.

Consider the following example:

```jsx
const initialData = [
  {
    id: 1,
    name: "First item",
  },
  {
    id: 2,
    name: "Second item",
  },
];

const List = () => {
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

This list is rendered based on an **index**. Let's try to remove the first value:

![Index as a key](/img/index-as-a-key.gif "Index as a key")

And it doesn't get removed!

Actually, it does but after we removed the first item, the second one received the key **0**, and React thinks that we removed the item with the key **1** as it's not on the list anymore.

Changing the `<li key={index}>` to `<li key={item.id}>` solves an issue:

![Id as a key](/img/id-as-a-key.gif "Id as a key")

Be very careful of that, as those kinds of issues are extremely hard to debug.

## Not batching updates

If you know React well, you might disagree with the above statement and you would be right.

Indeed, React batches updates.

But not all of them.

Consider the following example:

```jsx
import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState(0);

  const handleClick = () => {
    // These updates are batched
    setName('John');
    setSurname('Doe');
    setAge(18);
  };

  return (
    <>
      <button onClick={handleClick}>Fetch user</button>
      <div>Name: {name}</div>
      <div>Surname: {surname}</div>
      <div>Age: {age}</div>
    </>
  );
};

export default App;
```

Even though the state is modified three times, the updates are batched and the component re-renders only once.

But, if the state is updated inside of the **asynchronous callback**, those updates are not batched:

```jsx
// These updates are NOT batched
// The component re-renders three times!
const handleClick = () => {
  setTimeout(() => {
    setName('John');
    setSurname('Doe');
    setAge(18);
  }, 1000);
};

...

const handleClick = () => {
  fetchUser.then(() => {
    setName('John');
    setSurname('Doe');
    setAge(18);
  });
};

...

// Even this causes multiple re-renders
const handleClick = async () => {
  await fetchUser();
  setName('John');
  setSurname('Doe');
  setAge(18);
};
```

This is the concept a lot of developers are not aware of, which leads to unnecessary updates and poorer performance.

No worries, there are at least two ways to fix this issue.

#### Unify the state

It is possible to replace state variables: `name`, `surname` and `age` with just one object: `user` containing all those properties:

```jsx
// Unified state
const [user, setUser] = useState({
  name: '',
  surname: '',
  age: 0,
});

// Event handler
const handleClick = () => {
  setUser({
    name: "John",
    surname: "Doe",
    age: 18,
  });
};
```

#### Wrap updates in `unstable_batchedUpdates` callback

The name of the method is a bit concerning but it is safe to use in production.

One thing to remember when using this callback is that for the web it should be imported from the `react-dom` package:

```jsx
import { unstable_batchedUpdates } from 'react-dom';

...

const handleClick = () => {
  setTimeout(() => {
    unstable_batchedUpdates(() => {
      setName('John');
      setSurname('Doe');
      setAge(18);
    });
  }, 1000);
};

... 

const handleClick = () => {
  fetchUser.then(() => {
    unstable_batchedUpdates(() => {
      setName('John');
      setSurname('Doe');
      setAge(18);
    });
  });
};

...

const handleClick = async () => {
  await fetchUser();
  unstable_batchedUpdates(() => {
    setName('John');
    setSurname('Doe');
    setAge(18);
  });
};
```

## Misunderstanding deep and shallow copies

**Shallow copy** is a bit-wise copy of an object. 

A new object is created that has an exact copy of the values in the original object. 

If any of the fields of the object are references to other objects, just the reference addresses are copied i.e., only the memory address is copied:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

const newUser = {
  ...user,
};

newUser.other.age = 22;

// Prints {name: "John", surname: "Doe", age: 22}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

Modifying `other` object updates the original value, as the spread operator does only shallow copy.

To update nested property, **each level of nested data should be copied**:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

const newUser = {
  ...user,
  other: {
    ...user.other,
    age: 22,
  },
};

// Prints {name: "John", surname: "Doe", age: 22}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

**Deep copy** is the copy that is fully disconnected from the original variable:

```javascript
import cloneDeep from "lodash/cloneDeep";

const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

const newUser = cloneDeep(user);

newUser.other.age = 22;

// Prints {name: "John", surname: "Doe", age: 18}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

We can safely modify `other` object, as now it is not connected to the `user` object.

The best way to create a deep copy is to use an external library, like [lodash](https://lodash.com/).

## Calling functions instead of passing as a reference

Make sure you are not calling the function when you pass it to the component.

The following example contains **invalid code** because `handleClick` function is called instead of being passed as a reference:

```jsx
render() {
  return <button onClick={this.handleClick()}>Click Me</button>
}
```

Pass the function itself instead:

```jsx
render() {
  return <button onClick={this.handleClick}>Click Me</button>
}
```

This problem is often seen in a code of inexperienced developers, but it is not that uncommon.

## Forgetting to bind function declaration

To begin with, in JavaScript `bind` method is used to create a new function with given `this` context:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

function getFullName() {
  return this.name + " " + this.surname;
};

const boundFunction = getFullName.bind(user); // "bind" returns bound function

boundFunction(); // Prints "John Doe"
```

Consider the following example of the React component:

```jsx
import React, { Component } from 'react';

class Welcome extends Component<any> {
  handleClick() {
    console.log(this.props.greeting);
  }

  render() {
    return <button onClick={this.handleClick}>Greet me</button>;
  }
}

export default Welcome;
```

What would happen after clicking the button?

The following error will be thrown:

![Unbound function React error](/img/screenshot-2020-09-17-at-18.12.56.png "Unbound function React error")

The reason is obvious: **this** is **undefined**. 

But why? In the **render** function **this** refers to the current instance of the React component, that component contains **handleClick** function, so everything seems to be just fine.

But it is not that simple. Behind the scenes, React assigns **this.handleClick** to another variable:

```javascript
const onClick = this.sayName;

// We lose "this" context
onClick();
```

In the example above, when we call **onClick** function, the context of **this** is lost.

Its context is decided at the time function is called, not at the time it is defined.

#### Solution #1

One of the possible solutions to this problem is to bind the **handleClick** function in the constructor:

```javascript
constructor(props) {
  super(props);
  this.handleClick = this.handleClick.bind(this);
}
```

#### Solution #2

The second way of handling that is to use arrow functions instead of function declarations:

```jsx
handleClick = () => {
  console.log(this.props.greeting);
}
```

Arrow functions do not create their own **this** binding, they inherit it from the parent scope.

To learn more about the context of **this** refer to [this article](/2020-05-02-understanding-this-in-javascript/).

## Creating new functions every render

## Summary