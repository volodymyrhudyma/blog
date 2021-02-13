---
title: Add React Router v5 To Your React Application
tag:
  - React
promote: false
metaDescription: Learn how to add React Router v5 to your React Application.
  Configure React Router v5 and find out two ways of navigating between the
  Routes.
teaser: A typical Single Page Application built with React consists of many
  different views that are rendered when only some specific conditions are met.
  While it is possible to conditionally render all your components under one URL
  address...
date: 2021-02-15T09:31:51.682Z
---
A typical Single Page Application built with React consists of many different views that are rendered when only some specific conditions are met.

While it is possible to conditionally render all your components under one URL address ("**/**" by default), it is not a good idea, because you will end up with plenty of unmaintainable code.

You need to have a possibility to declare application URLs and views that would be displayed when users enter the URL.

In other words, you need to keep your URLs and views in sync.

React is a library, not a framework, so it does not ship us with this feature.

Fortunately, there are a few available libraries that are designed specifically for this purpose.

The one we will be working with today is called [react-router](https://reactrouter.com/) and it is by far the most popular routing library for React with more than 4 million weekly downloads.

## SPA vs. MPA

Before getting our hands dirty with the React Router, let's figure out the differences between a traditional Multi-Page Application and a Single-Page Application that we create with React.

> A **single-page application** (**SPA**) is a web application or website that interacts with the user by dynamically rewriting the current [](https://en.wikipedia.org/wiki/Web_page "Web page")web page with new data from the [](https://en.wikipedia.org/wiki/Web_server "Web server")web server, instead of the default method of the browser loading entire new pages. The goal is faster transitions that make the website feel more like a [n](https://en.wikipedia.org/wiki/Application_software "Application software")ative app.

In a Single-Page Application, navigating to different URL addresses does not require a full-page reload, whereas in a Multi-Page application the page is being fully reloaded.

There are many benefits of using SPA instead of MPA:

* **Speed**

  SPA reloads the content within the browser, it works and feels much smoother and faster
* **Loose Coupling**

  With the SPA approach, the front-end and back-end are separate. You just need an API to be exposed to feed your front-end with the data.
* **Code Reusability**

  Create back-end once and use it for as many front-ends as you want. If you have a mobile application, the same back-end can be used to fetch the data for it as well.
* **Mobile-friendly**

  SPA is more mobile-friendly and usually works much faster on mobile phones.
* **Offline mode**

  Implementing caching in SPA allows you to create an application that can work offline.

 But also, let's not forget about the drawbacks:

* **SEO**

  SPA is not as friendly to SEO as MPA, primarily because SPA is written in JavaScript that most search engines do not support yet.
* **Smaller Scalability**

  Both, in SPA and MPA there are no limits in the number of pages or amount of added content, but making changes to the architecture of SPA typically leads to more refactoring because it contains some components that are spread across the full application.
* **Heavily Dependent On JavaScript**

  A small number of people disable JavaScript in their browsers for security concerns. SPA would not work properly for them (a partial solution is to use Server-Side Rendering for the initial load, but all other functionality that uses JavaScript still won't be available).

Seeing all these pros and cons, it may be hard to pick the right approach until you have a clear vision of what is the purpose of your application.

SPA could be a better choice for websites promoting a single service or product.

MPA could be a better choice for websites with a lot of content that require good SEO, or for websites that promote a lot of services or products (such as Amazon, eBay, etc.)

## Add React Router

React Router is a routing library for React that keeps your UI in sync with the URL and prevents pages from a full reload.

The library includes three packages:

* [react-router](https://www.npmjs.com/package/react-router)

  The core package for the Router.
* [react-router-dom](https://www.npmjs.com/package/react-router-dom)

  Router for Web applications.
* [react-router-native](https://www.npmjs.com/package/react-router-native)

  Router for Mobile applications using React Native.

The one we are interested in now is **react-router-dom**, since we are building Web application.

Run the following code to install the library:

`yarn add react-router-dom`

It should be successfully installed, so now let's configure it.

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

Next, open the **App.js** component, import **Route** and **Switch** components, and declare your routes:

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

As you see, at the very top we render the **Header** component that will allow us to navigate between different pages.

Then we declare "**/**" route that renders the **Home** component on **exact** match and "**/contact**" route that renders the **Contact** component.

All matched routes are rendered inclusively, therefore if we don't add **exact** to the "**/**" route, then the "**/contact**" route will render not only the **Contact** component, but also **Home**.

The **Switch** component renders the first route that matches the URL.

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

Pretending that **UserList** and **User** components will render some text, navigating to the "**/users**" route will render both, **UserList** and **User** component, however, we expect only **UserList** to be rendered:

![Route Without Switch](/img/screenshot-2021-02-13-at-16.21.27.png "Route Without Switch")

In the above example, both dynamic route "**/:id**" and **"/users*"*** match **"/users**" URL.

To change that, wrap the route list in a **Switch** component:

```jsx
// ..
import { Switch, Route } from "react-router-dom";

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/users" component={UserList}></Route>
      {/* Route for displaying specific user's details */}
      <Route path="/:id" component={User}></Route>
    </Switch>
  </>
);
```

After creating missing components, our **App.js** looks the following way:

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

Rendering routes without having the ability to navigate between them is just a waste of time.

React Router provides us with two ways to navigate between the pages:

* **Link** component

Import **Link** component from the **react-router-dom** library and add **to** property that indicates which route the user should be navigated to after the click:

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

Components that are passed to the **component** prop in **Route** component receive **history** prop that can be used to programmatically navigate the user to a specific page:

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

In this article, we have learned how to install, configure and use React Router v5 in React application.

Subscribe to the newsletter to not miss the next article, in which we will learn how to create nested routes.