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

![XSS Example](/img/xss.gif "XSS Example")

If attackers executed any JavaScript code on your page, they would have a possibility to read any sensitive data (stored in cookies or local storage) and send to their servers.

That's exactly why React prevents this situation by default.

## Way 1: dangerouslySetInnerHTML Prop