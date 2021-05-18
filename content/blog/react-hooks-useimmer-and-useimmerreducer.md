---
title: "React Hooks: UseImmer And UseImmerReducer"
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-05-19T20:53:25.845Z
---
Probably, every developer is familiar with a useState hook, which is used for adding a state to the functional components.

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
          age: user.family.father.age + 1,
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
lalala
```