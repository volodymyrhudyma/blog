---
title: Exclamation Mark In TypeScript
tag:
  - JavaScript
promote: false
metaDescription: Learn about Exclamation Mark, aka Non-Null Asserion Operator in
  TypeScript and why it can be a useful addition to your project.
teaser: If you are using TypeScript, you might have noticed an Exclamation Mark
  (**!**) operator that does some kind of magic and makes your compiler ignore
  possible errors. Let's learn what the purpose of this operator is and how it
  can be a useful addition to...
date: 2021-04-04T09:23:41.408Z
---
If you are using TypeScript, you might have noticed an Exclamation Mark (**!**) operator that does some kind of magic and makes your compiler ignore possible errors.

Let's learn what the purpose of this operator is and how it can be a useful addition to our projects.

## Non-Null Assertion Operator

The "Exclamation Mark" operator is called **Non-Null Assertion Operator** and adding this operator causes the compiler to ignore **undefined** or **null** types.

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

This leads to the following TypeScript error:

**Argument of type 'string | undefined' is not assignable to parameter of type 'string'.**\
**Type 'undefined' is not assignable to type 'string'.**

That's right, because we expect **value** in the **prepareValue** function to be **undefined** or a **string**, but then we pass it to the **parseValue** function, which expects only **string**.

However, in certain cases we can be sure that the **value** will not be **undefined**, and that is exactly the case when we need the Non-Null Assertion Operator:

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

However, we should be extremely careful when using it, as it can lead to unexpected behavior if the **value** is actually **undefined**.

## When Is It Useful?

Now that we know what Non-Null Assertion Operator is, the next thing we need to do is learn some real-world use cases, because at first it may seem useless.

#### Search For An Item That Exists In A List

In some cases, you are sure that an element is present in a list, and you may want to search for it:

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

We have a list of configs and want to find the entire config object based on an id.

The code above does this perfectly fine, but if we look at the type of the variable **config**, it would be **Config | undefined**. 

We can use the Non-Null Assertion Operator to tell TypeScript that the **config** should exist, so we don't have to assume it can be **undefined**:

```typescript
// ...

const getConfig = (id: number) => {
  // Non-Null Assertion Operator is added at the end of this line
  return configs.find((config) => config.id === id)!;
};

// Type is "Config"
const config = getConfig(1);
```

Voila, if we are about to get any properties from the **config** object, we no longer need to check if it exists before doing so.

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

In the above example, we have created a simple component that has access to the **div** with the **App** class DOM node. 

We also have a button that, when clicked, displays the size of an element and its position in the viewport. 

In this simple example, we are sure that the element being accessed is mounted after clicking a **button**, so we can add a little hint in the TypeScript:

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

## When Is It Not Useful?

Basically, by using this operator, you're saying to TypeScript: "**I know better than you and I'll take responsibility for it**", so now you have much more responsibility for your code. 

If for some reason your assertion is not true, the runtime error will occur. 

That's why 99% of the time it's not the best idea to use it.

It is much safer to handle these cases in the code by making some additional checks.

## Summary

**Non-Null Assertion Operator** forces the compiler to ignore **undefined** or **null** types.

Developers must be extremely careful when using it, as misuse will result in a runtime error, which could be prevented by the TypeScript.

However, in some special cases, it makes your code a little less lengthy and allows you to skip writing some extra if checks.