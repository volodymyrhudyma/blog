---
title: "React Hooks: UseImmer And UseImmerReducer"
tag:
  - React
promote: false
metaDescription: Learn useImmer and useImmerReducer hooks, which allow you to
  handle state updates in a more convenient way than just the useState hook.
shareImage: /img/use-immer-in-react.jpg
teaser: Probably every React developer is familiar with a useState hook, which
  is used to add state to functional components. But updating a state with it
  can be a nightmare when you store an object with many nested properties, one
  of which...
date: 2021-05-19T20:53:25.845Z
---
Probably every React developer is familiar with a useState hook, which is used to add state to functional components.

But updating a state with it can be a nightmare when you store an object with many nested properties, one of which you want to change.

You have to copy each level of abstraction with a spread operator until you reach the property you want, and that often looks like a mess:

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

Before we learn how the useImmer hook can help us in this situation, it's worth mentioning that this hook, unlike useState, is not part of a React.

It comes with a separate library, called [use-immer](https://github.com/immerjs/use-immer), built to allow us to use [immer](https://github.com/immerjs/immer) as a React hook to manipulate state in a better way.

Immer is a helper library that exports a function that takes state as a parameter and creates a design state that can be changed directly, and then creates a new state object based on any changes applied.

To learn more about immer, please read [this article](/improve-your-state-handling-with-immer/).

Install the use-immer library:

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

We reduced the boilerplate code because the useImmer hook returns a tuple containing the current state as the first argument and the updater function, which accepts an immer producer function that creates a draft object that can be mutated. 

If we don't pass a function to the setUser in the above example, but instead pass a simple value, the updater function would behave like a normal useState hook:

```jsx
// ...
const [count, setCount] = useImmer(0);

const incrementFatherAge = () => {
  setCount(count + 1);
};
// ...
```

Of course, it makes no sense to use the useImmer hook in the above example, but only to demonstrate its behaviour when passing a value instead of a function.

## The "useImmerReducer" Hook

This hook is very similar to the useReducer hook that most of us have probably used.

The reducer is given a draft state that can be freely modified:

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

When it comes to dealing with complex state objects in local component state, there is probably no better alternative than using hooks provided by the use-immer library. 

They create a copy of the current state for us as a draft that can be modified if needed, and return a new object as the next state at the end. 

If you haven't played around with them yet, I recommend you read the documentation carefully and get started right away.