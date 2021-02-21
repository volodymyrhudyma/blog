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

Imagine building an online store, where you need to let your users see all categories and products (**/products**, **/categories** pages), as well as navigate to the specific product and category details (**/products/:name**, **/categories/:name** pages).

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

The corresponding URL can be the following: **/products/adidas-shoes-of-a-specific-type**.

## Dynamic Routes

## Nested Dynamic Routes

## Summary