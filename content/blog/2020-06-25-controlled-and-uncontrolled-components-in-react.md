---
title: What are the controlled and uncontrolled components in React?
tag:
  - React
teaser: Almost every React application requires the user to fill in some kind of
  form, which can consist of different elements, like inputs, text areas,
  selects, etc. There are 2 ways of defining those elements, the controlled and
  uncontrolled way...
date: 2020-06-26T14:12:36.458Z
---
Almost every React application requires the user to fill in some kind of form, which can consist of different elements, like `<input />`, `<textarea />`, `<select />`, etc. 

There are 2 ways of defining those elements, the controlled and uncontrolled way.

## The controlled way

The element is controlled when **its state is controlled by us**, or to be more precise, **by the React component**.

The state becomes the **"Single Source of Truth"**, which is something we should always strive for.

**Important note:** basically, it can be said that the element is controlled, when the `value` property is provided. However, you should remember that providing `value` property without `onChange` handler leads to a warning: 

![Value prop without onChange handler warning](/img/screenshot-2020-06-25-at-20.47.03.png "Value prop without onChange handler warning")

Take a look at the following `Example` component:

```javascript
const Example = () => {
  const [name, setName] = useState('');

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return <input type="text" value={name} onChange={handleChange} />;
};
```

We store the user's input inside of the `name` variable, which is updated every time the user types something inside of the input.

The `name` variable can be printed below to see how it gets updated:

```javascript
const Example = () => {
  const [name, setName] = useState('');

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  return (
    <>
      <input type="text" value={name} onChange={handleChange} />
      <div>Input: {name}</div>
    </>
  );
};
```

![Controlled input gif](/img/controlled-input.gif "Controlled input gif")

When the user types something in the input, **the component is re-rendered**. 

## The uncontrolled way

The uncontrolled components act like traditional HTML elements.

The state of each component is stored inside of the **DOM**(Document Object Model), not in the component, which means that you don't have to take care of updating the state.

The only thing you should take care of is pulling out that state to your React component.

How can you do that? 

By using a reference (`ref`).

> **Refs** provide a way to access DOM nodes or React elements created in the render method.

Let's see an example of getting the value using `ref`:

```javascript
const Example = () => {
  const [name, setName] = useState('');

  const ref = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    setName(ref.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={ref} />
      <button>Submit</button>
      <div>Input: {name}</div>
    </form>
  );
};
```

![Uncontrolled input gif](/img/uncontrolled.gif "Uncontrolled input gif")

Note, that we have access to the `input` element by using `ref.current` and to its value by `ref.current.value`.

**Important note:** uncontrolled components aren't re-rendered when the user types something, therefore they have a little bit better performance.

## Which approach is better?

As it's officially stated in the [React documentation](https://reactjs.org/docs/uncontrolled-components.html), we should use controlled components **as much as possible**.

Then, why do we even have a possibility to define uncontrolled components?

They are useful if:

* you have a simple form that doesn't need any instant validation(validation can be done only after the user presses submit button)
* you have to retrieve form values after the user presses submit button
* the fields inside of your form don't depend on each other
* you are interacting with libraries that don't follow the "React pattern". Using uncontrolled components will help you to "speak the same language"

The answer to the question above is: "**it depends**".

Don't be afraid to make a mistake by making the wrong choice. Migrating components from one type to another isn't hard at all.

## Summary

* We call component **controlled** if we manage its state
* We call component **uncontrolled** if its state is managed by the DOM
* Controlled components force us to follow the "**Single Source of Truth**" principle
* [Official React documentation](https://reactjs.org/docs/uncontrolled-components.html) advises to avoid uncontrolled components and use controlled whenever is possible