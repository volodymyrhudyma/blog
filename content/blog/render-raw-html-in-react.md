---
title: Render Raw HTML In React
tag:
  - React
promote: false
metaDescription: Learn how to sanitize and render raw HTML code in React using
  the dangerouslySetInnerHTML prop or external libraries.
teaser: Sometimes it is necessary to display an HTML code in React, which comes
  from an external source or a WYSIWYG editor. By default, this is not allowed
  for security reasons, but there are a few ways to bypass this limitation...
date: 2021-02-06T21:09:38.994Z
---
Sometimes it is necessary to display an HTML code in React, which comes from an external source or a WYSIWYG editor.

By default, this is not allowed for security reasons, but there are a few ways to bypass this limitation.

In this article, we will learn how to inject HTML code into your React component.

## Default Behaviour

To better understand React's default behaviour, let's try embedding some HTML into the React component:

```jsx
const html = `
  <h1>Heading</h1>
  <p>Paragraph</p>
`;

const App = () => (
  <div>{html}</div>
);
```

It seems logical to expect "Heading" and "Paragraph" to be rendered in appropriate tags, but that's not how it works.

React treats html as a string and displays the following:

![HTML Displayed As A String](/img/screenshot-2021-02-04-at-22.23.44.png "HTML Displayed As A String")

The reason is simple - we prevent XSS attacks.

## XSS Protection

> [Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) is a type of security vulnerability typically found in web applications. XSS attacks enable attackers to inject client-side scripts into web pages viewed by other users.

To prevent this type of vulnerability, React disallows the rendering of embedded values in JSX by automatically escaping anything that is not explicitly written in the application and converting the embedded value to a string before rendering.

What would have happened if React had allowed it?

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

If attackers run any JavaScript code on your page, they have the ability to read any sensitive data (stored in cookies or local storage) and send it to their servers.

This is exactly why React prevents this situation by default.

## Way 1: dangerouslySetInnerHTML Prop

HTML elements in React can be given a `dangerouslySetInnerHTML` prop, which is a replacement for `innerHTML` and allows rendering HTML strings as their content.

It's called dangerous for a reason - using it exposes you to XSS attack:

```jsx
const html = `
  <h1>Heading</h1>
  <p>Paragraph</p>
`;

const App = () => <div dangerouslySetInnerHTML={{ __html: html }} />;
```

The prop receives an object with **__html** key.

If you decide to go this route, remember to clean up your HTML before rendering, even if it seems "safe" (it comes from an admin panel or other source you control).

> [HTML sanitization](https://en.wikipedia.org/wiki/HTML_sanitization) is the process of examining an HTML document and producing a new HTML document that preserves only whatever tags are designated "safe" and desired.

There are many external libraries for this, such as [dompurify](https://www.npmjs.com/package/dompurify), [sanitize-html](https://www.npmjs.com/package/sanitize-html), etc.

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

Read [the documentation](https://www.npmjs.com/package/dompurify) to find out which tags are allowed by default and how to allow/disallow specific ones.

## Way 2: Using Extrernal Libraries

One of the best libraries available is [html-react-parser](https://www.npmjs.com/package/html-react-parser). It allows parsing HTML code both in Node.js and in the browser.

Install the library:

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

**Important note:** Always check whether or not the library automatically sanitizes the HTML code. The library we use does not do this, so we still have to sanitize by ourselves.

## Choosing the right way

Choosing the right approach depends a lot on what you want to do with the HTML you receive. 

If you just want to display it to users as is, then you may not need any libraries for it, but just clean it up and display it with the **dangerouslySetInnerHTML** prop. 

However, if you want to replace some of the HTML tags with React components and display them, then an external library that allows you to do that is definitely a good solution.

Example: Replace all **div** elements with **data-report-id** with the component that retrieves and displays an actual report.

If you use a library, remember to check if it sanitizes HTML automatically for you.

## Summary

Parsing HTML code is a common task when building web applications.

Every developer needs to know how to do this in the best and safest way.

In this article, we have learned:

* Why React blocks rendering HTML code by default
* What is an XSS attack?
* Two ways to render HTML code in React
* Why we need to sanitize HTML code before rendering it with React