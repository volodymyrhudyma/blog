---
title: Context API in React
tag:
  - React
metaDescription: // META
teaser: // TEASER
date: 2020-11-08T09:18:30.617Z
---
React Context API was created to solve one big problem that almost any application was facing - **prop drilling**.

Well-written React applications tend to contain many small components (having as small responsibilities as possible) that need to communicate with each other and share some data via props.

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

## When to Use It?

## Example Usage

## Summary