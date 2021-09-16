---
title: "React Antipatterns: Code Duplication"
tag:
  - React
promote: false
metaDescription: Learn why code duplication is an antipattern in React and how
  to avoid it with utility functions, parent components, or custom hooks.
shareImage: /img/react-antipatterns-code-duplication.jpg
teaser: Let's clarify one thing before we start - code duplication is not
  necessarily a bad thing. In some cases, it's much better to duplicate code
  than to create a reusable component that accepts tons of props for handling
  all edge cases because it's very likely to...
date: 2021-09-17T14:44:30.946Z
---
Let's clarify one thing before we start - code duplication is not necessarily a bad thing.

In some cases, it's much better to duplicate code than to create a reusable component that accepts tons of props for handling all edge cases because it's very likely to get lost.

But in general, good code should be written once and used when needed.

And that's what we are going to focus on today.

## The Problem

First, imagine you are building a complex website menu for a landing page that looks completely different on desktop and mobile.

Each time the user clicks on the menu item, they should be scrolled down to the appropriate section.

A pretty common scenario, right?

This is exactly the moment when it's better to create two separate components - **DesktopMenu** and **MobileMenu**, even if we could create only one, but messy.

**DesktopMenu.jsx**

```jsx
// ...

const DesktopMenu = () => {
  const handleScrollTo = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    handleScrollTo("products");
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    handleScrollTo("aboutUs");
  };

  // ...
};
```

**MobileMenu.jsx**

```jsx
// ...

const MobileMenu = () => {
  const handleScrollTo = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    handleScrollTo("products");
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    handleScrollTo("aboutUs");
  };

  // ...
};
```

Note that the components are basically the same, but that's only because we have skipped where the key differences begin - the render function.

So what we see here is the duplication of three functions: **handleScrollTo**, **handleProductsClick** and **handleAboutUsClick**, which is not good at all.

What options do we have here to refactor the code?

* Extract all functions into a separate file called **utils.js**

  It is possible, but it's better to have event handlers inside the components than utility functions, especially if they depend on props
* Extract all functions into parent component

  Also possible, but in this case parent component will grow in size and as with the first option, it's better to have small components responsible for their own tasks than to have large components responsible for everything.
* Extract all functions to the custom hook

  This approach allows us to create reusable functions to share logic between functional components in React - custom hooks.

  Another benefit that does not apply to our example is that we can call other hooks within the custom hook, such as **useState**, **useEffect**, etc.

While you can choose any of the above options and it would work just fine for our example, let's stick with the last one and create a custom hook called **useScrollTo**.

## Custom Hook - "useScrollTo"

The custom hook is a simple JavaScript function that allows us to compose built-in hooks to reuse some logic between functional React components.

The custom hook name should start with **use** to follow the naming convention for hooks (all hooks in React start with this word, right?).

Create a file named **useScrollTo**:

```jsx
export const useScrollTo = () => {
  const handleScrollTo = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductsClick = (e) => {
    e.preventDefault();
    handleScrollTo('products');
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
    handleScrollTo('aboutUs');
  };

  return {
    handleProductsClick,
    handleAboutUsClick,
  };
};
```

It contains all the duplicated code and returns it so that it can be re-used in any component.

Now let's fix our components.

**DesktopMenu.jsx**

```jsx
// ...
import { useScrollTo } from "./useScrollTo";

const DesktopMenu = () => {
  const { handleProductsClick, handleAboutUsClick } =
    useScrollTo();

  // ...
};
```

**MobileMenu.jsx**

```jsx
// ...
import { useScrollTo } from "./useScrollTo";

const MobileMenu = () => {
  const { handleProductsClick, handleAboutUsClick } =
    useScrollTo();

  // ...
};
```

We imported and used the custom hook in both components, resulting in less code duplication and better readability.

## Summary

There are many ways to reduce code duplication in React, and one of the best is to create and use a custom hook. 

Remember to check if there is already a custom hook on the web before creating your own. 

Use them as often as you can, as they are a very useful addition to React and help you organize your code in a better way.