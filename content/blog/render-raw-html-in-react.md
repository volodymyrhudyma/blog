---
title: Render Raw HTML In React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-06T21:09:38.994Z
---
Sometimes it is necessary to display an HTML code in React which may come from an external source or WYSIWYG editor.

By default, you are not allowed to do this for security reasons, but there are a few ways to bypass this restriction.

In this article, we will learn how to inject HTML code inside your React component.

## Default Behaviour

In order to better understand the default React behaviour, let's try to embed some HTML into the React component:

```jsx
const html = `
  <h1>Heading</h1>
  <p>Paragraph</p>
`;

const App = () => (
  <div>{html}</div>
);
```

Seems logical to expect "Heading" and "Paragraph" to be rendered in appropriate tags, but that is not how it works.

React will treat html as a string and display the following:

![HTML Displayed As A String](/img/screenshot-2021-02-04-at-22.23.44.png "HTML Displayed As A String")

The reasoning behind this is simple - we prevent XSS attacks.

## XSS Protection

[Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) is a type of security vulnerability typically found in web applications. XSS attacks enable attackers to inject client-side scripts into web pages viewed by other users.

In order to prevent this type of vulnerability, React does not allow to render any embedded value in JSX by auto-escaping anything that is not explicitly written in the application and converts the embedded value to a string before rendering it.

What would have happened if React allowed it?

```jsx
// Inject link, clicking which executes a script
// That can access any data on your website
// And sent to attackers
const html = `
  <h1>XSS Example</h1>
  <a href="javascript:alert(1)">Open Link</a>
`;

const App = () => <div>{html}</div>;
```

The page would have worked this way:

![XSS Example](/img/xss-attack.gif "XSS Example")

If attackers executed any JavaScript code on your page, they would have a possibility to read any sensitive data (stored in cookies or local storage) and send to their servers.

That's exactly why React prevents this situation by default.

## Way 1: dangerouslySetInnerHTML Prop

HTML elements in React can be given a `dangerouslySetInnerHTML` prop that is a replacement for `innetHTML` and allows rendering HTML string as their content.

It is called dangerous for a reason - by using it you are exposed to the XSS attack:

```jsx
const html = `
  <h1>Heading</h1>
  <p>Paragraph</p>
`;

const App = () => <div dangerouslySetInnerHTML={{ __html: html }} />;
```

The prop receives an object with **__html** key.

If you choose this way of going forward, remember to sanitize your HTML before rendering even if it seems "safe" (comes from an Admin panel, or any source controlled by you).

> [HTML sanitization](https://en.wikipedia.org/wiki/HTML_sanitization) is the process of examining an HTML document and producing a new HTML document that preserves only whatever tags are designated "safe" and desired.

There are a lot of external libraries available for this, like [dompurify](https://www.npmjs.com/package/dompurify), [sanitize-html](https://www.npmjs.com/package/sanitize-html), etc.

#### Sanitizing with "dompurify"

Install the library:

`yarn add dompurify`

Use it for your **App** component:

```jsx
import React from "react";
import DOMPurify from "dompurify";

// HTML received from the server
const dirtyHTML = `
  <h1>Heading</h1>
  <p>Paragraph</p>
`;

// The library allows HTML, SVG and MathML
// We only need HTML
const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
  USE_PROFILES: { html: true },
});

// Render sanitized HTML
const App = () => <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
```

Read [the documentation](https://www.npmjs.com/package/dompurify) to find out what tags are allowed by default and how to allow/disallow specific ones.

## Way 2: Using Extrernal Libraries

One of the best available libraries is [html-react-parser](https://www.npmjs.com/package/html-react-parser). It allows parsing HTML code in both, Node.js and browser.

Let's install this library:

`yarn add html-react-parser`

And add it to our example:

```jsx
import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

// HTML received from the server
const dirtyHTML = `
  <h1>Heading</h1>
  <p>Paragraph</p>
`;

// The library allows HTML, SVG and MathML
// We only need HTML
const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
  USE_PROFILES: { html: true },
});

// Render sanitized HTML
const App = () => <div>{parse(cleanHTML)}</div>;
```

**Important note:** Always check whether the library sanitized HTML automatically for you or not. The library we used is not doing this, so we still have to sanitize be ourselves.