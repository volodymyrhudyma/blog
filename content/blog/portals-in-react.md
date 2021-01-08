---
title: Portals In React
tag:
  - React
promote: false
metaDescription: Learn Portals In React - a way to render an element outside the
  DOM hierarchy created by the parent element. Portals can be used to render
  modals and tooltips.
teaser: When building an application in React, it is sometimes necessary to
  place an element outside the DOM hierarchy created by the parent component.
  The simplest example are modals and tooltips...
date: 2021-01-08T21:04:06.752Z
---
When building an application in React, it is sometimes necessary to place an element outside the DOM hierarchy created by the parent component.

The simplest examples are **modals** and **tooltips**.

If you render them inside a normal React component, they will be attached to the closest parent component, which will most likely cause styling conflicts (especially if you have *z-index* or *overflow: hidden*) or incorrect behaviour.

## The "Wrong" Way

Consider the following example:

```jsx
const App = () => {
  return (
    <div className="app">
      App Component
      <Modal />
    </div>
  );
};

const Modal = () => (
  <div className="modal">
    <div className="modal-inner">Modal Component</div>
  </div>
);
```

We render the **Modal** component inside an **App** and it is attached to the nearest parent (**div** with **App** class):

![DOM Structure](/img/screenshot-2021-01-08-at-16.21.43.png "DOM Structure")

Does not seem to be anything wrong at the moment, but normally a modal should be positioned in the middle of the viewport and overlap all the content, like this:

![Modal Example](/img/screenshot-2021-01-07-at-22.23.19.png "Modal Example")

You can do that with *absolute* position if the parent element does not have an *overflow: hidden* css rule. 

If it does - then the modal will be cut at the edges of the parent element:

![Overflow Hidden Example](/img/screenshot-2021-01-07-at-22.28.19.png "Overflow Hidden Example")

One way to solve this problem is to simply remove the css rule *overflow: hidden*, but that may break another part of the application.

Even if it does not break, the solution is fragile because someone can accidentally add that rule without knowing it would break the modal.

The most reliable solution is to append the modal directly to the **body** element to ensure that it is not affected by any of the parent element's styles.

This can be achieved with **Portals**.

## Portals

> [Portals](https://reactjs.org/docs/portals.html) provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

Portals can be created using `ReactDOM.createPortal(child, container)`.

* **child** is a React component to be rendered
* **container** is a class name of the parent DOM element that the React component should be attached to

```jsx
render() {
  return ReactDOM.createPortal(
    // The component
    Modal,
    // The DOM node
    document.getElementById("modal-root"),
  );
}
```

## The "Right" Way

Let's refactor our example from the "The Wrong Way" section using Portals.

**Step 1:** Create **modal-root** element as a sibling of **root** div in the `public/index.html` file:

```html
<body>
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
```

**Step 2:** Create **Portal** component and use it in the **Modal**:

```jsx
const App = () => {
  return (
    <div className="app">
      App Component
      <Modal />
    </div>
  );
};

const Modal = () => (
  <Portal>
    <div className="modal">
      <div className="modal-inner">Modal Component</div>
    </div>
  </Portal>
);

const Portal = (props) => {
  const node = document.getElementById("modal-root");
  return node ? createPortal(props.children, node) : props.children;
};
```

## Summary

Portals are definitely a very useful addition to React, used to render elements outside the DOM hierarchy created by the parent component.

It's entirely up to you whether you need Portals or not, depending on your project requirements and the DOM hierarchy.

But it's definitely worth a try.