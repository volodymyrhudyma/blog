---
title: "React Antipatterns: Code Duplication"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/react-antipatterns-code-duplication.jpg
teaser: // TEASER
date: 2021-09-18T14:44:30.946Z
---
Let's clarify one thing before we begin - code duplication is not necessarily a bad thing.

In some cases, it's much better to duplicate the code rather than create a reusable component that accepts tons of props to handle all edge cases, because it's very likely to get lost.

But in general, good code should be written once and used whenever needed.

That's what we are going to focus on today.

## The Problem

To begin with, imagine building complex website menu for a landing page, which looks completely different on desktop and mobile.

Any time users click on the menu item, they should be scrolled down to the specific section.

Pretty common scenario, right?

This is exactly the moment, when it's better to build two separate components - **DesktopMenu** and **MobileMenu**, even though we could create only one, but messy.

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

  return (
    <div>
      {/* ... */}
      <a href="#" onClick={handleAboutUsClick}>
        About us
      </a>
      <a href="#" onClick={handleProductsClick}>
        Products
      </a>
      {/* ... */}
    </div>
  );
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

  return (
    <div>
      {/* ... */}
      <a href="#" onClick={handleAboutUsClick}>
        About us
      </a>
      <a href="#" onClick={handleProductsClick}>
        Products
      </a>
      {/* ... */}
    </div>
  );
};
```

Note that the components are basically the same, but that's only for the simplicity.

In the real-world applications they would differ a lot.

So, what we see here is duplicating three functions: **handleScrollTo**, **handleProductsClick** and **handleAboutUsClick**, which is not a good thing at all.

What options do we have here?

* Extract all of them to the separate file, called **utils.js**

  It is possible, but it's better to have event handlers inside of the components rather than utility functions, especially if they depend on props
* Extract all of them to the parent component

  Also possible, but in this case parent component will grow in size and, as with the first option, it's better to have small components responsible for their own things rather than big ones responsible for everything
* Extract all of them to the custom hook

  This approach allows us to create reusable functions to share the logic between functional components in React - custom hooks.

  One more benefit, which does not apply to our example, is that inside of the custom hook we can call other hooks, like **useState**, **useEffect**, etc.

While it is possible to choose any of the above options and it would work just fine for our example, let's stick with the last one and create a custom hook called **useScrollTo**: