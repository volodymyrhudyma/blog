---
title: The best tools for React development
teaser: After you decided to proceed with React, there is number of useful
  technologies that will help you to speed up the development process. Choosing
  the right ones is crucial for the project's success...
date: 2020-06-07T11:12:07.554Z
---
After you decided to proceed with React, there is number of useful libraries that will help you to speed up the development process.

Choosing the right ones is crucial for the project's success.

To begin with, it's necessary to know exactly what is the size of the project.

Is it going to be a small one? medium? big?

**Important note:** I assume the small project takes **up to 2 months** of development for 1 person, medium - **up to 12** and big - **more than 12**.

The technology stack, chosen for each project size can differ. It's generally a bad idea - to install a library which provides thousands of functions just to use a few of them. 

Large libraries tend to increase the application's size which leads to poorer performance.

Having that in mind, let's assume we are dealing with a medium-sized project.

## CRA (create-react-app)

First and foremost, you have to decide if you are going to use the boilerplate (provided by the React team - **[create-react-app](https://github.com/facebook/create-react-app)** or any other available) or set up the project by yourself.

*Unless you are en experienced React developer, I recommend to use CRA.*

Creating React application using CRA is as simple as executing one command:

`npx create-react-app my-app`

Where **my-app** is your application's name.

## Typescript

**Typescript** is a programming language developed by Microsoft, typed superset of JavaScript which is compiled to plain JavaScript.

After setting up the project, you have to make an important decision - whether you need types in the application or not.

Generally, it's a good idea to include typescript as it gives you a lot of benefits, like: enhancing code readability, allowing to catch code errors in compile time, easier refactoring and much, much more.

If you are using **create-react-app**, you can easily add typescript at the moment of creation:

`npx create-react-app my-app --template typescript`

Or to existing application, build with CRA:

* Install typescript

  `yarn add typescript @types/node @types/react @types/react-dom @types/jest`
* Rename any file to be a typescript file (for example `src/index.js`to `src/index.tsx`) and **restart your development server**

## **Styled components**

Styled Components is the library that enables writing of CSS in JavaScript using tagged template literals.

> CSS in JavaScript is a styling technique, where you use JavaScript code to define CSS styles.
>
> CSS in JS solves some errors, which couldn't be solved earlier due to CSS limitations:
>
> * Eliminating globals
> * Easily eliminating dead code
> * No class name bugs
> * State-based styling

See the example usage of **Wrapper** styled component:

```javascript
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Loader = () => (
  <Wrapper>
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </Wrapper>
);

export default Loader;
```

Basically, **Wrapper** is just a **div** element with randomly generated class name and styles applied:

![Inspected styled component](/img/screenshot-2020-06-07-at-16.31.27.png "Inspected styled component")

To read the installation guide, please refer to the [official docs](https://styled-components.com/docs/basics#installation).

## Jest + enzyme