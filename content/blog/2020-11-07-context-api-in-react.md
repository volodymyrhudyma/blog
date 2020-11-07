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

In order to create and use a Context, the following steps have to be taken:

* Create a **Context** (React component subscribes to this object and reads the current context value from the closest matching Provider above in the tree)
* Create a **Provider** (Provides a Context to all components down the tree and allows them to subscribe to the Context)
* Create a **Consumer** (Subscribes to the Context and retrieves the data)

#### Create a Context

A Context can be created using `React.creactContext(defaultValue)` function:

```javascript
const ExampleContext = React.createContext(defaultValue);
```

Then React component can subscribe to this context and read the current context value from the closest **Provider** above in the tree. If the Provider was not found, a **defaultValue** is used.

#### Create a Provider

Before subscribing to the Context, we must provide it to all components in the tree.

This is done by using `ExampleContext.Provider` component that accepts a **value** prop to be passed to all consumers:

```jsx
<MyContext.Provider value={ /* Provide a value here */ }>
  { /* Render children that are allowed to be consumers */ }
</MyContext.Provider>
```

All consumers that are descendants of a Provider will re-render when the value of the Provider changes.

#### Create a Consumer

As it was mentioned, to read the data from the Context, a component must subscribe to it.

This is done by using the `ExampleContext.Consumer` component that requires function as a child, which receives the **value** of the current context and returns a **React Node**:

```jsx
<ExampleContext.Consumer>
  {value => /* Use the "value" to render a React Node */}
</ExampleContext.Consumer>
```

## Example Usage

To get a better understanding of the whole concept, let's refactor our example with drilling the **user** prop to use React Context API:

```jsx
const UserContext = React.createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user
    setUser({ name: 'John' });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Header />
      {/* Content, Footer */}
    </UserContext.Provider>
  );
};

const Header = () => (
  <>
    {/* Logo */}
    <AuthButtons />
  </>
);

const AuthButtons = () => (
  <UserContext.Consumer>
    {(value) =>
      value ? (
        <div>Hello, {value.name}</div>
      ) : (
        <>
          <div>Log in</div>
          <div>Register</div>
        </>
      )
    }
  </UserContext.Consumer>
);
```

#### If Provider was not found

If for some reason we missed the **Provider**, then the **value** will fallback to the **defaultValue** passed as an argument of the **createContext** function:

```jsx
const UserContext = React.createContext({ name: "John" )};

const App = () => {
  // ...

  // Provider is missing 
  return (
    <>
      <Header />
      {/* Content, Footer */}
    </>
  );
};

const Header = () => (
  // ..
);

const AuthButtons = () => (
  <UserContext.Consumer>
    { /* value equals to { name: "John" ) */ }
    {(value) =>
      value ? (
        <div>Hello, {value.name}</div>
      ) : (
        <>
          <div>Log in</div>
          <div>Register</div>
        </>
      )
    }
  </UserContext.Consumer>
);
```

#### Handling Multiple Contexts

Of course, we are not limited to have only one Context:

```jsx
const ThemeContext = React.createContext(null);
const UserContext = React.createContext(null);

const App = () => {
  const [theme, setTheme] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get theme
    // Fetch user
    setTheme(themes.dark);
    setUser({ name: "John" });
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <Header />
        {/* Content, Footer */}
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
};

const Header = () => (
  // ..
);

const AuthButtons = () => (
  <ThemeContext.Consumer>
    {(theme) => (
      <UserContext.Consumer>
        {(user) => (
          <div style={{ backgroundColor: theme?.background }}>
            {user ? (
              <div>Hello, {user.name}</div>
            ) : (
              <>
                <div>Log in</div>
                <div>Register</div>
              </>
            )}
          </div>
        )}
      </UserContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

```

In the example above we have two contexts, the first one sets the background based on the currently selected theme, the second one displays greeting or links to "Login" and "Register" is the user has not been found.

## Summary