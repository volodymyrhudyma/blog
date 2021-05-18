---
title: "React Hooks: UseImmer And UseImmerReducer"
tag:
  - React
promote: false
metaDescription: Learn useImmer and useImmerReducer hooks that allow you to
  handle state updates in a more convenient way than just using the useState
  hook.
shareImage: /img/use-immer-in-react.jpg
teaser: Probably, every React developer is familiar with a useState hook, which
  is used for adding a state to the functional components. But updating a state
  using it can be a nightmare when you store an object with a lot of...
date: 2021-05-19T20:53:25.845Z
---
Probably, every React developer is familiar with a useState hook, which is used for adding a state to the functional components.

But updating a state using it can be a nightmare when you store an object with a lot of nested properties, one of which should be changed.

You have to copy each level of abstraction using a spread operator until you reach the desired property and it often looks like a mess:

```jsx
const App = () => {
  const [user, setUser] = useState({
    name: "John",
    family: {
      father: {
        name: "Andrew",
        age: 57,
      },
    },
  });

  const incrementFatherAge = () => {
    setUser({
      ...user,
      family: {
        ...user.family,
        father: {
          ...user.family.father,
          age: user.family.father.age++,
        },
      },
    });
  };

  return (
    <button onClick={incrementFatherAge}>
      Click me (age is: {user.family.father.age})
    </button>
  );
};
```

Updating **user.family.father.age** is not super easy.

## "useImmer" To Rescue

Before we learn how useImmer hook can help us in this situation, it's worth mentioning that this hook is not a part of a React, as useState.

It comes with a separate library, called [use-immer](https://github.com/immerjs/use-immer), which is built to allow us to use [immer](https://github.com/immerjs/immer) as a React hook to manipulate the state in a better way.

Immer is a helper library that exports a function that takes a state as a parameter and produces a draft state that can be modified directly, and then creates a new state object based on all applied changes.

To learn more about immer, read [this article](/improve-your-state-handling-with-immer/).

Install use-immer library:

`yarn add use-immer`

And use it:

```jsx
// ...
import { useImmer } from "use-immer";

const App = () => {
  const [user, setUser] = useImmer({
    name: "John",
    family: {
      father: {
        name: "Andrew",
        age: 57,
      },
    },
  });

  const incrementFatherAge = () => {
    setUser((draft) => {
      draft.family.father.age++;
    });
  };

  return (
    <button onClick={incrementFatherAge}>
      Click me (age is: {user.family.father.age})
    </button>
  );
};
```

We reduced boilerplate code due to the fact that useImmer hook returns a tuple, which contains the current state as the first argument and the updater function, that accepts an immer producer function, which creates a draft object that could be mutated.

If we don't pass a function to the setUser in the above example, but a simple value, the updater function would behave as a normal useState hook:

```jsx
// ...
const [count, setCount] = useImmer(0);

const incrementFatherAge = () => {
  setCount(count + 1);
};
// ...
```

Of course, there is no point of using the useImmer hook in the above example, but just demonstrate its behaviour when passing a value instead of a function.

## The "useImmerReducer" Hook

This hook is very similar to the useReducer hook, most of us have probably used.

The reducer receives a draft state, which can be freely modified:

```jsx
// ...
import { useImmerReducer } from "use-immer";

const initialState = { count: 0 };

const reducer = (draft, action) => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case "INCREMENT":
      return void draft.count++;
    case "DECREMENT":
      return void draft.count--;
  }
};

const App = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </>
  );
};
```

It allows to reduce a lot of boilerplate code as well.

## Summary

When it comes to dealing with a complex state objects in the local component's state, there is probably no better alternatives than using hooks, provided by the use-immer library.

They create a copy of the current state for us as a draft, which can be modified as needed and at the end return a new object as a next state.

If you haven't yet played around with them, I encourage you to carefully read the documentation and start right away.