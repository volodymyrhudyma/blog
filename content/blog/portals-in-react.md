---
title: Portals In React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-08T21:04:06.752Z
---
When building an application in React, sometimes it is necessary to put an element outside of the DOM hierarchy created by the parent component.

The simplest example are **modals** and **tooltips**.

If you render them inside of a normal React component, they will be attached to the nearest parent, which most likely will cause styling conflicts (especially if you have *z-index* or *overflow: hidden*) or wrong behaviour.

## The Wrong Way

Consider the following example:

```jsx
const App = () => {
  return (
    <div className="App">
      App Component
      <Modal />
    </div>
  );
};

const Modal = () => <div className="Modal">Modal Component</div>;
```

We render **Modal** component inside of an **App** and it gets attached to the nearest parent (**div** with **App** class):

![DOM Structure](/img/screenshot-2021-01-07-at-22.17.17.png "DOM Structure")

Seems like nothing is wrong at the moment, but typically a modal should be positioned at the center of the viewport, overlapping the whole content, like this:

![Modal Example](/img/screenshot-2021-01-07-at-22.23.19.png "Modal Example")

That can be done using **absolute** position, if the parent element does not contain *overflow: hidden* css rule.

If it does - then the modal will be cut to the edges of the parent:

![Overflow Hidden Example](/img/screenshot-2021-01-07-at-22.28.19.png "Overflow Hidden Example")

One way to resolve this is to just remove *overflow: hidden* css rule, but that may break another part of the application.

Even if it does not break, the solution is fragile, because someone can accidentally add that rule without knowing that it would break the modal.

The most reliable solution is to append the modal directly to the **body** element to make sure that it would not be affected by any of the parent element styles.

It can be achieved using **Portals**.

## Portals

> [Portals](https://reactjs.org/docs/portals.html) provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

Portals can be created by using `ReactDOM.createPortal(child, container)`.

* **child** is a React component to be rendered
* **container** is a class name of the parent DOM element React component should be attached to

```jsx
render() {
  return ReactDOM.createPortal(
    // The component
    Modal,
    // The DOM node
    "modal-root",
  );
}
```

## The Right Way

Let's refactor our example from the "The Wrong Way" section using Portals:

```jsx

```

## Summary