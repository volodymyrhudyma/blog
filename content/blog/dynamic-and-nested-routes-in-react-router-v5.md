---
title: Dynamic And Nested Routes In React Router v5
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-22T08:18:24.094Z
---
In one of the [previous articles](/add-react-router-v-5-to-your-react-application/) we installed and configured React Router v5 in the React application.

We defined a few static routes (**/**, **/contact**, **/users**) that were responsible for showing home, contact, and users pages.

That may be enough for very very small projects, but if your application is a little bigger than small, static routes are definitely not enough.

Imagine building an online store, where you need to let your users see all categories and products (**/products**, **/categories** pages), as well as navigate to the specific product and category details (**/products/:slug**, **/categories/:slug** pages).

## Nested Routes

It is a common thing to nest the UI components multiple levels deep and define the URL that reflects the certain nested structure.

A good example for our online store can be nesting the **Product** components inside of the **Products**:

```jsx
const Product = ({ name }) => <div>{name}</div>;

const Products = ({ products }) =>
  products.map((product) => <Product key={product.id} name={product.name} />);

const App = () => (
  <Products
    products={[
      {
        id: 1,
        name: "Product1",
      },
      {
        id: 2,
        name: "Product2",
      },
    ]}
  />
);

export default App;
```

The corresponding URL can be the following: **/products/product1**.

## Defining Nested Routes

To define nested routes, let's define static **/products** route first.

**App.js** component:

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

If you have a small list of products and don't store them anywhere in the database, you can create a separate route for each of them (however, that is not recommended, it is better to use dynamic routes, but we'll talk about them in the next section).

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

We know that we sell only **Product1** and **Product2**, so we define their routes and components and render them.

But what if your product catalog contains thousands of items? 

It doesn't make sense to define a thousand routes, right?

That's when dynamic routing comes into play.

## Dynamic Routes

Dynamic routing takes place when your app **is rendering**.

An example of a dynamic route is **/:slug** route that would match anything that comes after the slash and make this value available in your component under the **slug** as it is defined:

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

const Product = ({ match: { params } }) => <div>Product: {params.slug}</div>;

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

When you click on a **Product** link, you would see the **Product product1** text printed on the screen.

Note, that you have access to the **slug** parameter by calling **match.params.slug** on the **Product** component and can retrieve given product details based on its slug.

## Nested Dynamic Routes

Knowing what nested and dynamic routes are, we can learn how to combine both of them. 

Let's rewrite our example from the "Nested Routes" section to include dynamic routing as well.

Typically, online stores retrieve products from the API:

```javascript
const products = [
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

We should have a possibility to view all products under the **/products** URL and one product under the **/products/:slug** URL:

```jsx
import { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

const initialProducts = [
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

const Header = () => (
  <>
    Navigate to:
    <Link to="/">Home</Link>
    <Link to="/products">Products</Link>
  </>
);

const Home = () => <div>Home</div>;

const Product = ({ match: { params } }) => <div>Product: {params.slug}</div>;

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // ... (Fetch Products)
    setProducts(initialProducts);
  }, []);

  return (
    <div>
      <header>
        Select a product:
        {initialProducts.map((product) => (
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

Note, that we don't need to create a separate component for each product, we can render a generic one that would get the product details based on the **slug**.

## Summary