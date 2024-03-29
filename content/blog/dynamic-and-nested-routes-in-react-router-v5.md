---
title: Dynamic And Nested Routes In React Router v5
tag:
  - React
promote: false
metaDescription: Learn how to use Dynamic and Nested Routes in React Router v5
  and access URL params using either the props object or React Hooks.
shareImage: /img/dynamic-and-nested-router-rrv5-min.jpg
teaser: In one of the previous articles, we installed and configured React
  Router v5 in the React application. We defined a few static routes (/,
  /contact, /users) that were responsible for displaying the home, contact and
  user pages. This may be enough for very...
date: 2021-02-22T08:18:24.094Z
---
In one of the [previous articles](/add-react-router-v-5-to-your-react-application/), we installed and configured React Router v5 in the React application.

We defined a few static routes (**/**, **/contact**, **/users**) that were responsible for displaying the home, contact and user pages.

This may be enough for very, very small projects, but if your application is anything larger than small, static routes are definitely not enough.

Imagine you are building an online store where you need to let your users see all the categories and products (**/products**, **/categories** pages), as well as navigate to the specific product and category details (**/products/:slug**, **/categories/:slug** pages).

## Nested Routes

It is common to nest the UI components several levels deep and define the URL that reflects the particular nested structure.

A good example for our online store can be the nesting of the **Product** components within the **Products**.

**App.jsx** component:

```jsx
import { initialProducts } from "./data";

const Product = ({ name }) => <div>{name}</div>;

const Products = ({ products }) =>
  products.map((product) => <Product key={product.id} name={product.name} />);

const App = () => <Products products={initialProducts} />;

export default App;
```

**data.js** file:

```javascript
export const initialProducts = [
  {
    id: 1,
    slug: "product1",
    name: "Product1",
  },
  {
    id: 2,
    slug: "product2",
    name: "Product2",
  },
];
```

The corresponding URLs may be the following: **/products/product1** and **/products/product2**.

## Defining Nested Routes

To define nested routes, we first define the static **/products** route.

**App.jsx** component:

```jsx
import { Switch, Route, Link } from "react-router-dom";

const Header = () => (
  <>
    Navigate to:
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
  </>
);

const Home = () => <div>Home</div>;

const Products = () => <div>Products</div>;

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/products" component={Products}></Route>
    </Switch>
  </>
);

export default App;
```

Now you can switch between the **Home** and **Products** page.

If you have a small list of products and don't store them anywhere in the database, you can create a separate route for each of them (this is not recommended though, it's better to use dynamic routes, but we'll talk about that in the next section).

Modify the **Products** component:

```jsx
// ...

const Product1 = () => <div>Product1</div>;

const Product2 = () => <div>Product2</div>;

const Products = () => (
  <div>
    <header>
      Select a product:
      <Link to="/products/product1">Product1</Link>
      <Link to="/products/product2">Product2</Link>
    </header>
    <Route path="/products/product1" component={Product1} />
    <Route path="/products/product2" component={Product2} />
  </div>
);

// ...
```

We know we are only seeing **Product1** and **Product2**, so we define their routes and components and render them.

But what if your product catalog contains thousands of items? 

It doesn't make sense to define a thousand routes, right?

That's where dynamic routing comes in.

## Dynamic Routes

Dynamic routing happens when the app **is rendering**.

An example of a dynamic route is the **/:slug** route, which matches anything that comes after the slash and make that value available in your component under the **slug** as defined:

```jsx
import { Switch, Route, Link } from "react-router-dom";

const Header = () => (
  <>
    Navigate to:
    <Link to="/">Home</Link>
    <Link to="/product1">Product</Link>
  </>
);

const Home = () => <div>Home</div>;

const Product = (props) => <div>Product: {props.match.params.slug}</div>;

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/:slug" component={Product}></Route>
    </Switch>
  </>
);

export default App;
```

If you click on a **Product** link, you would see the **Product product1** text printed on the screen.

Note that by calling **props.match.params.slug** on the **Product** component, you can access the **slug** parameter and get given product details based on its slug.

## "useRouteMatch", "useLocation", "useHistory" Hooks

When our component is passed to the **component** property of **Route**, it is automatically fed with the following props:

![Route Component Props](/img/screenshot-2021-02-21-at-15.30.42.png "Route Component Props")

* [history](https://reactrouter.com/web/api/history) - provides a minimal API to manage the history stack, navigate, and maintain state between sessions
* [location](https://reactrouter.com/web/api/location) - represents where the app is now, where it should go, or even where it has been
* [match](https://reactrouter.com/web/api/match)-contains information about how a <Route path> matched the URL

You can also access them with the [useRouteMatch](https://reactrouter.com/web/api/Hooks/useroutematch)**,** [useLocation](https://reactrouter.com/web/api/Hooks/uselocation) and [useHistory](https://reactrouter.com/web/api/Hooks/usehistory) hooks:

```jsx
import {
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";

const Product = (props) => {
  // Same as props.match
  const match = useRouteMatch();
  
  // Same as props.history
  const history = useHistory();
  
  // Same as props.location
  const location = useLocation();

  return <div>Product: {match.params.slug}</div>;
};
```

## "useParams" Hook

It is possible to get the **slug** parameter from the URL by using the [useParams](https://reactrouter.com/web/api/Hooks/useparams) hook.

This eliminates the need to use the **props** object or the **useRouteMatch** hook:

```jsx
import {
  useParams,
} from "react-router-dom";

const Product = () => {
  const params = useParams();

  return <div>Product: {params.slug}</div>;
};
```

## Nested Dynamic Routes

Knowing what nested and dynamic routes are, we can learn how to combine the two. 

Let's rewrite our example from the "Nested Routes" section to include dynamic routing.

Normally, online stores retrieve products from the API in the following format, which is stored in the **data.js** file, as you should remember from the first section:

```javascript
export const initialProducts = [
  {
    id: 1,
    slug: "product1",
    name: "Product1",
  },
  {
    id: 2,
    slug: "product2",
    name: "Product2",
  },
];
```

We should have a way to display all products under the **/products** URL and one product under the **/products/:slug** URL:

```jsx
import { useEffect, useState } from "react";
import { Switch, Route, Link, useParams } from "react-router-dom";

import { initialProducts } from "./data";

const Header = () => (
  <>
    Navigate to:
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
  </>
);

const Home = () => <div>Home</div>;

const Product = () => {
  const params = useParams();

  useEffect(() => {
    // Fetch single product here
  }, [params.slug]);

  return <div>Product: {params.slug}</div>;
};

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products here
    setProducts(initialProducts);
  }, []);

  return (
    <div>
      <header>
        Select a product:
        {products.map((product) => (
          <Link key={product.id} to={`/products/${product.slug}`}>
            {product.name}
          </Link>
        ))}
      </header>
      <Route path="/products/:slug" component={Product} />
    </div>
  );
};

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home}></Route>
      <Route path="/products" component={Products}></Route>
    </Switch>
  </>
);

export default App;
```

Note that we don't need to create a separate component for each product, we can render a generic component that retrieves the product details based on the **slug**.

The final example in action:

![React Router v5 Nested Dynamic Routes](/img/react-router.gif "React Router v5 Nested Dynamic Routes")

## Summary

React Router is a powerful tool to create a routing system in your React application.

In the [previous article](/add-react-router-v-5-to-your-react-application/), we learned how to set up and configure the library. 

Today we added some nested and dynamic routes to make our demo look like a real application.