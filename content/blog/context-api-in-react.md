---
title: Context API in React
tag:
  - React
metaDescription: Learn Context API in React - an easy way to create and share a
  global state throughout the application, which is very useful for eliminating
  the need for props drilling. React Context API requires Context, Provider and
  Consumer to be created.
teaser: React Context API was created to solve a major problem that almost every
  application has faced - Prop Drilling. Well-written React applications contain
  many small components that communicate with...
date: 2020-11-08T09:20:00.000Z
---
React Context API was created to solve a major problem that almost every application has faced - **Prop Drilling**.

Well-written React applications contain many small components (with the smallest possible responsibilities) that communicate with each other and share some data via props.

Sometimes it is necessary to pass the props from the parent component to the child that is deep in the React tree.

Usually, this is done by passing them through the other components that do not actually need the data, but only help to pass it on:

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
      { /* Content, Footer */ }
    </>
  );
};

// Header component does not need to know about user
// Moreover, it re-renders when the user changes
const Header = ({ user }) => (
  <>
    { /* Logo */ }
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

It is relatively easy to follow the props when they are passed between two or three levels, as in the example above.

But what if the number of levels increases to 10, or even 20?

**React Context API** to the rescue.

## What is a Context?

According to the [official React documentation](https://reactjs.org/docs/context.html), **Context** provides a way to pass data through the component tree without having to pass props down manually at each level.

To create and use a Context, the following steps must be taken:

* Create a **Context** (React component subscribes to this object and reads the current context value from the closest matching Provider above in the tree)
* Create a **Provider** (provides a Context for all components down the tree and allows them to subscribe to the Context)
* Create a **Consumer** (subscribes to the Context and retrieves the data)

#### Create a Context

A Context can be created using `React.creactContext(defaultValue)` function:

```javascript
const ExampleContext = React.createContext(defaultValue);
```

Then the React component can subscribe to this context and read the current context value from the nearest Provider at the top. If the Provider was not found, a **defaultValue** is used.

#### Create a Provider

Before subscribing to the Context, we need to make it available to all components in the tree.

This is done by using the `ExampleContext.Provider` component, which accepts a **value** prop that is passed to all consumers:

```jsx
<MyContext.Provider value={ /* Provide a value here */ }>
  { /* Render children that are allowed to be consumers */ }
</MyContext.Provider>
```

All consumers that are descendants of a Provider are re-rendered when the value of the Provider changes.

#### Create a Consumer

As already mentioned, to read the data from the Context, a component must subscribe to it.

This is done by using the `ExampleContext.Consumer` component, which requires function as a child, which receives the **value** of the current context and returns a **React Node**:

```jsx
<ExampleContext.Consumer>
  {value => ( /* Use the "value" to render a React Node */ )}
</ExampleContext.Consumer>
```

## Example Usage

To get a better understanding of the whole concept, let's refactor our example by drilling the **user** prop to use React Context API:

```jsx
const UserContext = React.createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user
    setUser({ name: "John" });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Header />
      { /* Content, Footer */ }
    </UserContext.Provider>
  );
};

const Header = () => (
  <>
    { /* Logo */ }
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

If for some reason we missed the **Provider**, the **value** will fall back to the **defaultValue** passed as argument to the **createContext** function:

```jsx
const UserContext = React.createContext({ name: "John" )};

const App = () => {
  // ...

  // Missing Provider
  return (
    <>
      <Header />
      { /* Content, Footer */ }
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

Of course, we are not limited to having only one Context:

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
        { /* Content, Footer */ }
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

In the example above we have two contexts, the first one sets the background color based on the currently selected theme, the second one displays a welcome message or links to "Log in" and "Register" if the user was not found.

## React Hooks: useContext

In the Function Components `useContext(Context)` hook can be used to subscribe to the Context.

Using this hook corresponds to writing `<Context.Consumer>{value => ()}</Context.Consumer>`. 

A component that uses it is always re-rendered when the Context value changes:

```jsx
const AuthButtons = () => {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
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
  );
};
```

## Summary

The Context API in React is a way to create and share a global state throughout the application, which is very useful for eliminating the need for props drilling.

There are alternatives, such as Redux, a library for managing the state of the application, but unlike to the Context API, it requires a lot of configuration to get started.

Quick recap:

* Create a Context: **const Context = React.createContext(defaultValue)**
* Provide a Context to the children: **<Context.Provider value={ /\* Value here \*/ }>{ /\* Child tree \*/ }</Context.Provider>**
* Subscribe to the Context: **<Context.Consumer>{value => ()}</Context.Consumer>** or use the **useContext(Context)** hook