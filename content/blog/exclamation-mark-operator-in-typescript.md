---
title: Exclamation Mark In TypeScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-04-04T09:23:41.408Z
---
If you used TypeScript, you could have noticed an Exclamation Mark (**!**) operator that does some kind of a magic and makes your compiler ignore possible errors.

Let's learn what is the purpose of it and how it can be useful in our projects.

## Non-Null Assertion Operator

The "Exclamation Mark" operator is called **Non-Null Assertion Operator** and adding it makes the compiler ignore **undefined** or **null** types.

Consider the following example:

```typescript
const prepareValue = (value?: string) => {
  // ...
  parseValue(value);
};

const parseValue = (value: string) => {
  // ...
};
```

It results in the following TypeScript error:

**Argument of type 'string | undefined' is not assignable to parameter of type 'string'.**\
**Type 'undefined' is not assignable to type 'string'.**

Which is true, because we expect **value** in the **prepareValue** function to be **undefined** or a **string**, but then we pass it to the **parseValue** function that expects only **string**.

However, in certain cases we can be sure that the **value** will not be **undefined** and that's exactly the case when we need the Non-Null Assertion Operator:

```typescript
const prepareValue = (value?: string) => {
  // ...
  parseValue(value!);
};

const parseValue = (value: string) => {
  // ...
};
```

The above code works just fine.

However, we should be extremely careful when using it, since it can produce unexpected behavior if the **value** is indeed **undefined**.

## When Is It Useful?

Now, when we know what is the Non-Null Assertion Operator, then next thing is to learn some real-world use cases, because it may seem useless at the beginning.

#### Search For An Item That Exists In A List

In some cases you are sure that an item exists in a list and you might want to search for it:

```typescript
interface Config {
  id: number;
  path: string;
}

const configs: Config[] = [
  {
    id: 1,
    path: "path/to/config/1",
  },
  {
    id: 2,
    path: "path/to/config/2",
  },
];

const getConfig = (id: number) => {
  return configs.find((config) => config.id === id);
};

// Type is "Config | undefined"
const config = getConfig(1);
```

We have a list of configs and having an id we want to find the whole config object.

The above code does this perfectly fine, however if we look at the type of the **config** variable, it would be **Config | undefined**.

We can use the Non-Null Assertion Operator to tell the TypeScript that the **config** should exist, so there is no need to assume that it can be **undefined**:

```typescript
// ...

const getConfig = (id: number) => {
  // Non-Null Assertion Operator is added at the end of this line
  return configs.find((config) => config.id === id)!;
};

// Type is "Config"
const config = getConfig(1);
```

Voila, if we are about to get any properties from the **config** object, we don't have to check if it exists before doing that.

#### Handling Refs In React

[Refs](https://reactjs.org/docs/refs-and-the-dom.html) in React provide a way to access DOM nodes or React elements:

```tsx
// ...

const App = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if(ref.current) {
      console.log(ref.current.getBoundingClientRect());
    }
  };

  return (
    <div className="App" ref={ref}>
      {/* ... */}
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};
```

In the example above we created a simple component that has an access to the **<div class="App">** DOM node.

We also have a button, clicking on which gets the size of an elements and its position in the viewport.

In this simple example we are sure that the accessed element is mounted after clicking on a **button**, so we can add a small hint to the TypeScript:

```tsx
// ...

const App = () => {
  // ..

  const handleClick = () => {
    console.log(ref.current!.getBoundingClientRect());
  };

  // ..
};
```

## When It Is Not Useful?

Basically, by using this operator, you say to the TypeScript: "I know better than you and I take all responsibility for it", therefore now you have way more responsibility for your code.

If for any reason, your assertion would not be true, the run-time error will happen.

That's the reason using it is not the best idea for 99% of the cases.

So, think twice before using it.

## Summary

**Non-Null Assertion Operator** forces the compiler to ignore **undefined** or **null** types.

Developers need to be extremely careful when using it, since a misuse leads to a run-time errors we are responsible for and that could be prevented by the TypeScript

However, in some special cases it makes your code a little less verbose and allows to skip writing some additional if checks.