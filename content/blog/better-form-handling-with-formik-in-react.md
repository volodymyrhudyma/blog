---
title: Better Form Handling With Formik In React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-03-22T08:33:32.355Z
---
Forms play a crucial role in modern web development, by enabling a possibility to gather information from the customers.

Good handling of them is a must in order not to lose any data by a stupid validation mistake or bug in the code, which is not always an easy task, especially if forms are of a big size.

While React definitely eases working with forms, it is still hard to build a maintainable, scalable, and testable solution without adding any helper libraries.

There are a lot of libraries, designed to make handling forms better, like [formik](https://www.npmjs.com/package/formik), [react-hook-form](https://www.npmjs.com/package/react-hook-form), [redux-form](https://www.npmjs.com/package/redux-form), or [react-final-form](https://www.npmjs.com/package/react-final-form).

Each one comes with its own pros and cons, but today we will focus on the most used and popular one - [Formik](https://formik.org/docs/overview).

## Step 1: Build A Basic Login Form

Before we begin digging into Formik and stuff, we need a simple form, built with raw React:

```jsx
import { useState } from "react";

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [terms, setTerms] = useState(false);

  return (
    <div className="App">
      <form>
        <div className="form-group">
          <label htmlFor="full-name">Full name:</label>
          <input
            type="text"
            id="full-name"
            name="full-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <div className="checkbox">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              value={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            <label htmlFor="terms">I accept Terms And Conditions</label>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;
```

The structure is very simple, we have a wrapper **div**, then a **form** containing 5 elements: text input, email input, textarea, checkbox and a submit button.

We will skip CSS for the simplicity, but at the end of an article I will post a link to the github repository which will contain the full code (with CSS).

Our form looks the following way:

![React Form](/img/screenshot-2021-03-18-at-18.18.43.png "React Form")

Notice, that we store the value of inputs in the local state of a React component, which means that inputs are **controlled**.

If we don't use **value** and **onChange** properties and let the inputs keep their state internally, they will be called **uncontrolled**, because we are not in control of their state, but DOM is.

Read more about Controlled vs. Uncontrolled components [here](/2020-06-26-controlled-and-uncontrolled-components-in-react/).

## Step 2: Add Formik

## Step 3: Validate Form

## Summary