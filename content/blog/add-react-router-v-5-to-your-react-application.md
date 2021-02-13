---
title: Add React Router v5 To Your React Application
tag:
  - React
promote: false
metaDescription: Learn how to add React Router v5 to your React Application.
  Configure React Router v5 and learn two ways to navigate between Routes.
teaser: A typical Single Page Application built with React consists of many
  different views that are rendered only when some specific conditions are met.
  While it is possible to conditionally render all your components under one...
date: 2021-02-15T09:31:51.682Z
---
A typical Single Page Application built with React consists of many different views that are rendered only when some specific conditions are met.

While it is possible to conditionally render all your components under one URL address ("**/**" by default), this is not a good idea as you will end up with a lot of unmaintainable code.

You need to have a way to declare application URLs and views that will be displayed when users enter the URL.

In other words, you need to keep your URLs and views in sync.

React is a library, not a framework, so it does not ship us with this feature.

Fortunately, there are a few available libraries specifically designed for this purpose.

The one we will be working with today is called [react-router](https://reactrouter.com/) and is by far the most popular routing library for React, with more than 4 million weekly downloads.

## SPA vs. MPA

Before we get our hands dirty with the React Router, let's find out the differences between a traditional Multi-Page Application and a Single-Page Application, which we will create with React.

> A **single-page application** (**SPA**) is a web application or website that interacts with the user by dynamically rewriting the current [](https://en.wikipedia.org/wiki/Web_page "Web page")web page with new data from the [](https://en.wikipedia.org/wiki/Web_server "Web server")web server, instead of the default method of the browser loading entire new pages. The goal is faster transitions that make the website feel more like a [n](https://en.wikipedia.org/wiki/Application_software "Application software")ative app.

In a Single-Page Application, navigating to different URL addresses does not require a full page reload, whereas in a Multi-Page application, the page is being fully reloaded.

There are many advantages to using SPA instead of MPA:

* **Speed**

  SPA reloads content within the browser, it works and feels much smoother and faster
* **Loose Coupling**

  With the SPA approach, the front-end and back-end are separate. All you have to do is expose an API to feed your front-end with the data.
* **Code Reusability**

  Create the back-end once and use it for as many front-ends as you want. If you have a mobile app, the same back-end can be used to retrieve the data for it as well.
* **Mobile-Friendly**

  SPA is more mobile-friendly and usually works much faster on mobile phones.
* **Offline Mode**

  The implementation of caching in SPA allows you to create an application that can work offline.

But let's not forget the disadvantages either:

* **SEO**

  SPA is not as friendly to SEO as MPA, mainly because SPA is written in JavaScript, which most search engines do not support yet.
* **Lower Scalability**

  Both SPA and MPA have no limits on the number of pages or amount of content added, but changes to the architecture of SPA typically lead to more refactoring because it contains some components that are distributed throughout the application.
* **Heavy Dependency On JavaScript**

  A small number of people disable JavaScript in their browsers for security reasons. SPA would not work properly for them (a partial solution is to use Server-Side Rendering for initial loading, but all other functions that use JavaScript will still be unavailable).

Considering all these pros and cons, it can be difficult to choose the right approach until you have a clear vision of what the purpose of your application is.

SPA might be a better choice for websites that promote a single service or product.

MPA might be a better choice for websites with a lot of content that require good SEO, or for websites that promote many of services or products (like Amazon, eBay, etc.).

## Add React Router

React Router is a routing library for React that keeps your UI in sync with the URL and prevents pages from a full reload.

The library includes three packages:

* [react-router](https://www.npmjs.com/package/react-router)

  The core package for the Router.
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)

  Router for Web applications.
* [react-router-native](https://www.npmjs.com/package/react-router-native)

  Router for Mobile applications with React Native.

The one we are interested in now is **react-router-dom**, since we are building a Web application.

Run the following code to install the library:

`yarn add react-router-dom`

It should be installed successfully, so let's configure it now.

Open **index.js**, import **BrowserRouter** and wrap the **App** component with it:

```jsx
// ...
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// ...
```

Next, open the **App.js** component, import the **Route** and **Switch** components, and declare your routes:

```jsx
// ..
import { Switch, Route } from "react-router-dom";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/contact" component={Contact}></Route>
    </Switch>
  </>
);
```

As you can see, at the very top, the **Header** component is rendered, which allows us to navigate between different pages.

Then we declare "**/**" route which renders the **Home** component on **exact** match, and "**/contact**" route which renders the **Contact** component.

All matched routes are rendered inclusively, therefore if we don't add **exact** to the "**/**" route, the "**/contact**" route will render not only the **Contact** component, but also **Home**.

The **Switch** component will render the first route that matches the URL.

Consider the following example without **Switch**:

```jsx
// ..
import { Route } from "react-router-dom";

const App = () => (
  <>
    <Header />
    <Route exact path="/" component={Home}></Route>
    <Route path="/users" component={UserList}></Route>
    {/* Route for displaying specific user's details */}
    <Route path="/:id" component={User}></Route>
  </>
);
```

Assuming that the **UserList** and **User** components will render some text, navigating to the "**/users**" route will render both, **UserList** and **User** component, however, we expect only **UserList** to be rendered:

![Route Without Switch](/img/screenshot-2021-02-13-at-16.21.27.png "Route Without Switch")

In the above example, both dynamic route "**/:id**" and **"/users*"*** match the **"/users**" URL.

To change this, wrap the route list in a **Switch** component:

```jsx
// ..
import { Switch, Route } from "react-router-dom";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/users" component={UserList}></Route>
      {/* Route to display details of a specific user */}
      <Route path="/:id" component={User}></Route>
    </Switch>
  </>
);
```

After creating the missing components, our **App.js** looks like this:

```jsx
import { Switch, Route, Link } from "react-router-dom";

const Header = () => (
  <>
    Navigate to:
    <Link to="/">Home</Link>
    <Link to="/contact">Contact</Link>
  </>
);

const Home = () => <div>Home</div>;

const Contact = () => <div>Contact</div>;

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/contact" component={Contact}></Route>
    </Switch>
  </>
);

export default App;
```

And the application works as expected:

![React Router v5 In Action](/img/router.gif "React Router v5 In Action")

## Navigate Between Pages

Rendering routes without having the ability to navigate between them is a waste of time.

React Router gives us two ways to navigate between pages:

* **Link** component

Import the **Link** component from the **react-router-dom** library and add **to** property, which specifies which route the user should be navigated to after the click:

```jsx
// ...
import { Link } from "react-router-dom";

const Header = () => (
  <>
    Navigate to:
    <Link to="/">Home</Link>
    <Link to="/contact">Contact</Link>
  </>
);
```

* **history.push** function

Component passed to the **component** prop in the **Route** component receives **history** prop, which can be used to programmatically navigate the user to a specific page:

```jsx
const Home = ({ history }) => (
  <>
    <div>Home</div>
    <button onClick={() => history.push("/contact")}>
      Navigate to Contact
    </button>
  </>
);
```

## Summary

In this article, we learned how to install, configure, and use React Router v5 in a React application.

Subscribe to the newsletter to not miss the next article, where we will learn how to create dynamic and nested routes.