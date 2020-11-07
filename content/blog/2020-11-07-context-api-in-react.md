---
title: Context API in React
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-11-08T09:19:00.000Z
---
React Context API was created to solve one big problem that almost any application was facing - **prop drilling**.

Well-written React applications contain many small components (having as small responsibilities as possible) communicating with each other and sharing some data via props.

Sometimes it is necessary to pass the props from the parent component to the child located deeply in the React tree.

Typically, this is done by passing them through the other components, which do not actually need the data, but just help in passing it around:

```jsx
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user
    setUser({ name: "John" });
  }, []);

  return (
    <>
      <Header user={user} />
      {/* Content, Footer */}
    </>
  );
};

// Header component does not need to know about user
// Moreover, it re-renders when the user changes
const Header = ({ user }) => (
  <>
    {/* Logo */}
    <AuthButtons user={user} />
  </>
);

const AuthButtons = ({ user }) =>
  user ? (
    <div>Hello, {user.name}</div>
  ) : (
    <>
      <div>Log in</div>
      <div>Register</div>
    </>
  );
```

It is relatively easy to follow the props if they are passed between two or three levels, like in the example above.

But what if the number of levels increases to 10, or even 20?

**React Context API** to rescue.

## What is a Context?

According to the [official React documentation](https://reactjs.org/docs/context.html), **Context** provides a way to pass data through the component tree without having to pass props down manually at every level.

#### Create a Context

A Context can be created using `React.creactContext(defaultValue)` function:

```javascript
const ExampleContext = React.createContext(defaultValue);
```

Then React component can subscribe to this context and read the current context value from the closest **Provider** above in the tree. If the Provider was not found, a **defaultValue** is used.

#### Subscribe to a Context

As it was mentioned, to read the data from the Context, a component must subscribe to it.

This is done by using the `ExampleContext.Consumer` component that requires function as a child, which receives the **value** of the current context and returns a **React Node**:

```jsx
<ExampleContext.Consumer>
  {value => /* Use the "value" to render a React Node */}
</ExampleContext.Consumer>
```

#### Provide a Context

Before subscribing to the Context, we must provide it to all components in the tree.

This is done by using `ExampleContext.Provider` component that accepts a **value** prop to be passed to all consumers:

```jsx
<MyContext.Provider value={ /* Provide a value here */ }>
  { /* Render children that are allowed to be consumers */ }
</MyContext.Provider>

```

All consumers that are descendants of a Provider will re-render when the value of the Provider changes.

## Example Usage

To get a better understanding of the whole concept, let's refactor our example with drilling the **user** prop to use React Context API:

```jsx
// CODE
```

## Summary