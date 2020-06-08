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

To read more about CRA, please refer to the [official documentation](https://create-react-app.dev/).

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

Read more about typescript [here](https://www.typescriptlang.org/docs/home.html).

## Styled components

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

To read the installation guide, please refer to the [official documentation](https://styled-components.com/docs).

## Jest + enzyme

It's good practice - to cover all your components with unit tests to be sure that adding new features won't break any of the existing ones.

**Jest** is a JavaScript test runner, library for creating, running and structuring tests.

If you're using CRA, **jest** will already be installed and configured, if not - you have to install it manually:

`yarn add --dev jest`

Read the [official documentation](https://jestjs.io/docs/en/getting-started) to find out how to use it.

**Enzyme** is a JavaScript Testing utility for React that makes it easier to test your React Components' output. You can also manipulate, traverse, and in some ways simulate runtime given the output.

To install enzyme, run:

`yarn add enzyme enzyme-adapter-react-16`

> As of Enzyme 3, you will need to install Enzyme along with an Adapter corresponding to the version of React you are using. (The examples above use the adapter for React 16.).

After successful installation, you have to configure the adapter in the *global setup file.* Create `src/setupTests.js` with the following content:

```javascript
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

If you're using CRA, then modifying the existing file `src/setupTests.js` will be enough.

If not, you have to let **jest** know the path to this file.

Open your **package.json** and add a new section to it with the following content:

```javascript
"jest": {
  "setupFilesAfterEnv": ["<rootDir>/src/setupTests.js"]
 }
```

That's it! Now you have everything configured to write your first unit test:

```javascript
import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('renders welcome message', () => {
  const wrapper = shallow(<App />);
  const welcome = <h2>Welcome to React</h2>;
  expect(wrapper.contains(welcome)).toEqual(true);
});
```

The test above is just an example, it checks if the **App** component contains welcome message.

Please, refer to the [official documentation](https://enzymejs.github.io/enzyme/docs/api/) to read more about **Enzyme**.

## ESlint

**ESLint** is a tool for identifying and reporting on patterns found in ​JavaScript code, with the goal of making code more consistent and avoiding bugs.

It's extremely useful when there are a lot of developers working with the project, as it allows to have one centralized code style configuration.

**Important note**: we cover the installation process assuming that **typescript** is used.

To install eslint along with all necessary libraries for react, run:

`yarn add -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser`

* eslint - the core JavaScript linter
* eslint-plugin-react - React specific linting rules for ESLint
* eslint-plugin-react-hooks - This ESLint plugin enforces t[](https://reactjs.org/docs/hooks-rules.html)he [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
* @typescript-eslint/parser and @typescript-eslint/eslint-plugin - an ESLint-specific plugins which allow for TypeScript-specific linting rules to run

After the installation, create a new file named **.eslintrc** in the root folder of your app and put the following content inside:

```javascript
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": { "jsx": true }
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    // Configure eslint rules
  }
}
```

And the final step is to add 2 scripts to the **package.json** file:

`"lint": "./node_modules/.bin/eslint ."`

`"lint:fix": "./node_modules/.bin/eslint --fix ."`

The first script checks if all your files meet the specified criterias and throws errors in the terminal, if not.

The second one does exactly the same job, but it also tries to fix whatever can be fixed without the developer's help.

**Important note:** the following scripts run eslint for all files. If you want to run it agains specific folder, replace `.` with the path to the folder, for example: `eslint src/`.

## Prettier

Prettier is an opinionated code formatter.

## Path aliases

## Storybook

## Axios

**Axios** - Promise based HTTP client for the browser and node.js.

To install the library, execute:

`yarn add axios`

Example GET request:

```javascript
axios.get('/endpoint-url')
  .then(function (response) {
    // handle success
  })
  .catch(function (error) {
    // handle error
  });
```

It's possible to use **async/await** instead of **Promise**. Just remember to use **try ... catch** block to handle errors:

```javascript
const example = async () => {
  try {
    const response = await axios.get('/endpoint-url');
    // handle success
  } catch (error) {
    // handle error
  }
};
```

Refer to the [official documentation](https://github.com/axios/axios) to find out more.

## Redux

## Cypress

**Cypress** - JavaScript end-to-end testing tool.

> **End-to-end testing** is a technique that tests the entire software product from beginning to end to ensure the application flow behaves as expected

To install cypress, run:

`yarn add -D cypress`

After successful installation, add a new script to your **package.json**:

`"test:e2e": "./node_modules/.bin/cypress open"`

And, finally, run in your terminal:

`yarn test:e2e`

When you run Cypress for the first time, it will create **cypress** folder, which contains all configurations along with some default test examples and **cypress.json** file.

Finally, new chrome window will be opened with some example tests:

![Cypress opened](/img/screenshot-2020-06-08-at-19.05.25.png "Opened cypress window")

Click on **Run all specs** button the the right top of the browser's window to check if they all pass.

Refer to the [official documentation](https://www.cypress.io/) to find out more.

## Husky

**Husky** is a tool that runs defined commands before **git commit** or **push**.

It can be used to execute linter or run all your tests before pushing changes to repo, to make sure that you haven't broken anything unintentionally.

To install husky, run:

`yarn add -D husky`

Then open your **package.json** and create a separate block for husky config:

```javascript
{
  "husky": {
    "hooks": {
      // Run linter and all tests before making a commit
      "pre-commit": "yarn lint && yarn test",
      // Run all tests before pushing changes to repo
      "pre-push": "yarn test",
      "...": "..."
    }
  }
}
```

Then try to commit anything or make a push to the repository and enjoy how the defined commands are being executed!

Refer to the [official documentation](https://github.com/typicode/husky) to find out more.

## React i18next

**react-i18next** is a powerful internationalization framework for React / React Native which is based on **i18next**.

It allows you to easily add multiple languages to your application.

Install it by executing:

`yarn add i18next react-i18next`

After the installation, create `src/i18next.js` configuration file with the following content:

```javascript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./translations/en.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
```

Then, create file `src/translations/en.json` with the following content:

```javascript
{
  "app": {
    "greeting": "Hello, world!"
  }
}
```

**react-i18next** provides us with `useTranslation` hook, which gives us an access to the `t` function, which is used to get the translation.

Your **App** component can look like:

```javascript
import React from "react";

const App = () => {
  const { t } = useTranslation();

  return <h1>{t("app.greeting")}</h1>;
}
  
export default App;
```

`t` function receives translation key as an argument and searches that key in the translation file.

Refer to the [official documentation](https://react.i18next.com/) to find out more.

## Moment.js

**Moment.js** is a JavaScript library which helps in parsing, validating, manipulating and displaying date and time in JavaScript.

It's extremely useful if your app has to display date and time in different formats, using different languages etc, as working with **Date** object in JavaScript is nowhere near as good as with **moment**.

Install it by executing:

`yarn add moment`

Refer to the [official documentation](https://momentjs.com/docs/) to find out more.