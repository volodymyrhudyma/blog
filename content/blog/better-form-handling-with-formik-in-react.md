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
          <label htmlFor="fullName">Full name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
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

## Why Formik?

Before adding Formik, let's try to understand why do we need it at all and what benefits does it bring.

If we were about to add a validation to our form, we could end up with the following code:

```jsx
// ...
const [fullNameError, setFullNameError] = useState("");

const handleFullNameChange = (e) => {
  const { value } = e.target;

  setFullName(value);

  if (!value) {
    setFullNameError("Full name is required");
  }

  if (/\d/.test(value)) {
    setFullNameError("Full name should not contain numbers");
  }

  if (value.length > 50) {
    setFullNameError("Are you really sure that your full name is that big?");
  }
};

// ...
<div className="form-group">
  <label htmlFor="fullName">Full name:</label>
  <input
    type="text"
    id="fullName"
    name="fullName"
    value={fullName}
    onChange={handleFullNameChange}
  />
  {fullNameError}
</div>

```

To store an error message for each field, we would need a separate state entry and the validation logic has to be implemented manually (however, we can use some helper libraries, like [Yup](https://github.com/jquense/yup)).

For a simple form, like this that contains only 5 fields, we would have to keep 10 state entries (5 for storing values, 5 for the validation).

Imagine if the form grows to 15-20 fields? That would result in a mess in the code.

That's the moment Formik comes into play - it manages state and validation for you.

Generally speaking, what is Formik?

As per the [documentation](https://formik.org/docs/overview):

**Formik** is a small group of React components and hooks for building forms in React and React Native. 

It helps with the three parts: 

* **Getting values in and out of form state** 
* **Validation and error messages** 
* **Handling form submission** 

By colocating all of the above in one place, Formik keeps things organized - making testing, refactoring, and reasoning about your forms a breeze.

## Step 2: Add Formik

To begin with, install the library:

`yarn add formik`

There are a few ways of integration Formik into your application:

* **useFormik** hook
* **Formik** component
* **withFormik** higher-order component

In this tutorial we will stick with the first and modern way - **useFormik** hook, as hooks are a great addition to React and I suggest using them whenever possible.

Let's import the hook and use it in our code:

```javascript
// ..
import { useFormik } from "formik";

// ..
const formik = useFormik({
  initialValues: {
    fullName: "",
    email: "",
    message: "",
    accept: false,
  },
  onSubmit: (values) => {
    console.log(values);
  },
});

console.log(formik);

// ..
```

We should pass **initialValues** and a submission function **onSubmit** to the **useFormik** hook.

The hook returns us all available properties (at the moment we only care about **handleSubmit** - function that is fired when the user clicks a submit button, **handleChange** - function that triggers whenever a field is changes, **values** - an object containing the current values of a form):

![Formik Object](/img/screenshot-2021-03-18-at-18.44.16.png "Formik Object")

The next step is to pass each of these to our form:

```jsx
// ..
<form onSubmit={formik.handleSubmit}>
  <div className="form-group">
    <label htmlFor="fullName">Full name:</label>
    <input
      type="text"
      id="fullName"
      name="fullName"
      value={formik.values.fullName}
      onChange={formik.handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
    />
  </div>
  <div className="form-group">
    <label htmlFor="message">Message:</label>
    <textarea
      id="message"
      name="message"
      value={formik.values.message}
      onChange={formik.handleChange}
    />
  </div>
  <div className="form-group">
    <div className="checkbox">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        value={formik.values.terms}
        onChange={formik.handleChange}
      />
      <label htmlFor="terms">I accept Terms And Conditions</label>
    </div>
  </div>
  <button>Submit</button>
</form>
// ..
```

And that's it, our form, powered by the Formik is working!

Now, look carefully at the code and notice that:

* The exact same **handleChange** function is passed for every input

  So, to let formik know what input are we changing, we must pass **id** or **name** properties. If we don't pass any of them, the following warning will be thrown and an input field would not be updated with the provided value:

![Formik Warning](/img/screenshot-2021-03-18-at-19.26.41.png "Formik Warning")

* **id** and **name** should match field name defined in the **initialValues**
* Field value is accessed by **formik.values.<field>**

## Step 3: Validate Form

Let's add validation using Formik, as it doesn't make sense to allow users to send an empty form.

To add validation, let's define a custom validation function and pass it to the **validate** field in the **useFormik** hook.

If an error should be shown, this custom function should return an object with the property names, same as passed to the **initialValues**:

```javascript
const customValidator = (values) => {
  const errors = {};

  // Validate firstName
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.length > 50) {
    errors.firstName = "Are you really sure that your full name is that big?";
  }

  // Validate email
  if (!values.email) {
    errors.email = "Email is required";
  } else if (values.lastName.length > 50) {
    errors.email = "Are you really sure that your email is that big?";
  }

  // Validate accept
  if (!values.accept) {
    errors.terms = "You should accept terms and conditions";
  }

  return errors;
};
```

Then pass it to the **useFormik** hook:

```jsx
// ..
const formik = useFormik({
  initialValues: {
    fullName: "",
    email: "",
    message: "",
    accept: false,
  },
  validate: customValidator,
  onSubmit: (values) => {
    console.log(values);
  },
});

// ..
```

And display an error message below each input (read it from **formik.errors.<field>**):

```jsx
<form onSubmit={formik.handleSubmit}>
  <div className="form-group">
    <label htmlFor="fullName">Full name:</label>
    <input
      type="text"
      id="fullName"
      name="fullName"
      value={formik.values.fullName}
      onChange={formik.handleChange}
    />
    {/* Show fullName error if exists */}
    {formik.errors.fullName}
  </div>
  <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
    />
    {/* Show email error if exists */}
    {formik.errors.email}
  </div>
  <div className="form-group">
    <label htmlFor="message">Message:</label>
    <textarea
      id="message"
      name="message"
      value={formik.values.message}
      onChange={formik.handleChange}
    />
  </div>
  <div className="form-group">
    <div className="checkbox">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        value={formik.values.terms}
        onChange={formik.handleChange}
      />
      <label htmlFor="terms">I accept Terms And Conditions</label>
    </div>
    {/* Show terms error if exists */}
    {formik.errors.terms}
  </div>
  <button>Submit</button>
</form>
```

As you may have noticed, we made all fields required, except of the **message**. Let it be optional.

By default, Formik validates the whole form after each change event, on blur and before submission, which has a negative impact on the user experience, because showing an error for the **email** field if user types the **fullName** is not correct:

![Formik Validation All At Once](/img/validation-all.gif "Formik Validation All At Once")

One more thing to remember - It will allow **handleSubmit** function to be executed only if the form does not contain any errors, if there is at least one, the form can't be submitted, unless an error is fixed.

#### Show errors for "touched" fields only

Showing the whole list of errors for the form when providing the data for only the first input is not good at all.

Let's fix it to show the errors only related to the current field, after user stops typing.

Formik keeps track of the "touched" fields, just like of the "errors" or "values".

To use this field, we have to pass **formik.handleBlur** function to each input (this function works similar to the **formik.handleChange**):

```jsx
// ..
<div className="form-group">
  <label htmlFor="fullName">Full name:</label>
  <input
    type="text"
    id="fullName"
    name="fullName"
    value={formik.values.fullName}
    onChange={formik.handleChange}
    {/* Pass "formik.handleBlur" to use "touched" field */}
    onBlur={formik.handleBlur}
  />
  {formik.errors.fullName}
</div>

// ..
```

And let's use **formik.touched.<field>** to see if the field has been touched and hide an error if the fields is not yet visited:

```jsx
// ..
<div className="form-group">
  <label htmlFor="fullName">Full name:</label>
  <input
    type="text"
    id="fullName"
    name="fullName"
    value={formik.values.fullName}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {/* Display an error only if the field was "touched" */}
  {formik.touched.fullName && formik.errors.fullName}
</div>

// ..
```

Works perfectly fine:

![Formik Validation One At A Time](/img/validation-one.gif "Formik Validation One At A Time")

## Summary