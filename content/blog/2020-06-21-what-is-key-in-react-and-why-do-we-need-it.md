---
title: What Is "Key" In React And Why Do We Need It?
tag:
  - React
promote: false
metaDescription: Keys help React identify which items have changed, are added,
  or are removed. Keys should be given to the elements inside the array to give
  the elements a stable identity.
teaser: Almost each web application contains lists of elements printed to the
  screen. If you render list elements without defining the "key" prop, you will
  receive a warning message in the console. Let's find out why...
date: 2020-06-21T06:37:02.679Z
---
Almost each web application contains lists of elements printed to the screen. 

If you render list elements without defining the **key** prop:

```javascript
const List = ({ data }) => (
  <ul>
    {data.map(item => (
      <li>{item.name}</li>
    ))}
  </ul>
);

const App = () => (
  <List
    data={[
      {
        id: 1,
        name: "One",
      },
      {
        id: 2,
        name: "Two",
      },
    ]}
  />
);
```

You will receive a warning message in the console: `Each child in a list should have a unique "key" prop`.

This issue is easy to fix, just add a **unique** **key** prop for each **li** element which is being rendered inside of the loop:

```javascript
const List = ({ data }) => (
  <ul>
    {data.map(item => (
      <li key={item.id}>{item.name}</li>
    ))}
  </ul>
);
```

**Important note:** **key** should always be unique, if React encounters 2 same keys being provided, it would show the same warning as if we didn't add it at all.

And the warning is gone! But do you know why?

Let's find out what happens behind the scenes.

## Why Does React Need It?

To understand this better, let's learn a new term: **Reconciliation.**

**Reconciliation** - is a mechanism that keeps track of the changes in a component state and renders the updated state to the screen.

When the state of your component changes, the **render** function returns a new tree of React elements, which is obviously different from the previous one. 

The job of React is to figure out what has changed in the quickest possible way to efficiently update the UI.

Let's see how it works by using lists as an example.

Imagine rendering 2 list elements without any keys:

```phtml
<li>First element</li>
<li>Second element</li>
```

And then adding a new element to the end of the list:

```phtml
<li>First element</li>
<li>Second element</li>

<!-- New element -->
<li>Third element</li>
```

The new elements tree is produced and React now has to compare an old tree with the new one to identify what changes were made.

React iterates over both lists of children at the same time and generates a mutation whenever there’s a difference.

It will match the first 2 elements and generate a mutation for the third one.

Looks good, right?

But what if the new element was added to the beginning of the list?

```phtml
<!-- New element -->
<li>Third element</li>

<li>First element</li>
<li>Second element</li>
```

The things don't look right, as React will run 3 mutations instead of one because it won't know that the **First element** and the **Second element** weren't touched because they changed their position.

The main problem here is inefficiency.

We could have avoided 2 unnecessary mutations by providing a small hint to React: the **key** prop.

## The "Key" Prop

> Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.

Adding a **key** to an inefficient above example makes the tree conversion efficient:

```phtml
<!-- New element -->
<li key={3}>Third element</li>

<li key={1}>First element</li>
<li key={2}>Second element</li>
```

Now, React knows that the new element is the one with the key **3**, other elements have just changed their positions.

Any value can be used as a key unless it's **unique**.

The most popular concept is to use **id** if you pull data from the database.

In case if you don't have an **id**, it's also possible to use an **index** of an element inside of the loop:

```javascript
const List = ({ data }) => (
  <ul>
    {data.map((item, index) => (
      <li key={index}>{item.name}</li>
    ))}
  </ul>
);
```

**Important note:** it's not recommended to use an **index** as a **key** if an order of list elements may change.

## Index As A Key

Using **index** as a key leads to unexpected errors when the order of your list elements can be changed.

React doesn't understand which item was added/removed/reordered since an **index** is given on each render based on the order of the items in the array.

Consider the following example:

```javascript
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

![Index as a key .gif](/img/index-as-a-key.gif "Index as a key .gif")

And it doesn't get removed!

Actually, it does but after we removed the first item, the second one received the key **0**, and React thinks that we removed the item with the key **1** as it's not on the list anymore.

Changing the `<li key={index}>` to `<li key={item.id}>` solves an issue:

![Id as a key .gif](/img/id-as-a-key.gif "Id as a key .gif")

Be very careful of that, as those kinds of issues are extremely hard to debug.

## Uniqueness Among Siblings

Keys need to be unique, but only among their siblings.

In other words, each item within an array should have a unique key, but it should not be unique globally:

```javascript
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

## Keys Are Not Passed As A Prop

React doesn't automatically pass **key** as a prop to the component, which means that if you need access to it, you should pass it as another prop:

```javascript
<ul>
  {data.map((item) => (
    <ListItem key={item.id} id={item.id} />
  ))}
</ul>
```

To access `item.id` inside of the `ListItem` component, we should pass it separately.

## Summary

The most important thing is to remember that **key** prop should be used not only to get rid of an annoying warning in the console, but to help React identify what elements have changed, are added, or are removed.

* Always use a **unique** **key** prop when rendering lists
* Be careful when using an **index** as a **key**, try to avoid it if possible