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
    terms: false,
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

  // Validate terms
  if (!values.terms) {
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
    terms: false,
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

## Step 4: Show errors for "touched" fields only

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

## Step 5: Maybe A Better Validation?

The validation is left up to you, so you have a plenty of space to do whatever is needed, either use a popular library or create validators yourself.

However, Formik authors love [Yup](https://github.com/jquense/yup) - JavaScript schema builder for value parsing and validation, so the integration between two libraries is awesome.

The **useFormik** hook allows us to pass **validationSchema**, which is a special Yup-related property that allows to pass Yup validation schema to Formik.

Let's install Yup first:

`yarn add yup`

Then, let's define a Yup validation schema for our form:

```javascript
const validationSchema = Yup.object({
  fullName: Yup.string()
    .max(50, "Are you really sure that your full name is that big?")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .max(50, "Are you really sure that your email is that big?"),
  terms: Yup.bool().oneOf([true], "You should accept terms and conditions"),
});
```

And pass it to the **useFormik** hook:

```jsx
// ..
const formik = useFormik({
  initialValues: {
    fullName: "",
    email: "",
    message: "",
    terms: false,
  },
  // Pass schema as "validationSchema"
  validationSchema,
  onSubmit: (values) => {
    console.log("Submitted!");
  },
});

// ..
```

Looks so much cleaner and better.

## Step 6: Reducing Some Boilerplate Code

Notice, how we duplicated a lot of things in the code above, like explicit passing of the **onChange**, **onBlur**, etc.

Formik provides us with a **getFieldProps()** method that makes wiring up inputs much faster.

Given some field-level info, it returns to you the exact group of **onChange**, **onBlur**, **value**, **name**.

We can replace this:

```jsx
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
  {formik.errors.fullName}
</div>
```

With this:

```jsx
<div className="form-group">
  <label htmlFor="fullName">Full name:</label>
  <input
    type="text"
    id="fullName"
    {...formik.getFieldProps('fullName')}
  />
  {formik.errors.fullName}
</div>
```

## Step 7: Using A Bit Of React Context

In the above code we have to manually pass **formikProps** to inputs (even if we use **getFieldProps**, it still has to be present).

It leads to a lot of code repetition, which can be avoided if we use React Context.

Fortunately, Formik uses it internally and exposes components, like **Formik**, **Form**, **Field**, **ErrorMessage**.

All of them use React Context to connect with the **Formik** state and methods:

```jsx
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .max(50, "Are you really sure that your full name is that big?")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required")
    .max(50, "Are you really sure that your email is that big?"),
  terms: Yup.bool().oneOf([true], "You should accept terms and conditions"),
});

const ContactForm = () => (
  <div className="App">
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        message: "",
        terms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <div className="form-group">
          <label htmlFor="fullName">Full name:</label>
          <Field type="text" name="fullName" />
          <ErrorMessage name="fullName" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <Field type="text" name="email" />
          <ErrorMessage name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <Field as="textarea" name="message" />
        </div>
        <div className="form-group">
          <div className="checkbox">
            <Field type="checkbox" name="terms" />
            <label htmlFor="terms">I accept Terms And Conditions</label>
          </div>
          <ErrorMessage name="terms" />
        </div>
        <button>Submit</button>
      </Form>
    </Formik>
  </div>
);

export default ContactForm;
```

Note, that the **Field** component renders an input by default with given name and implicitly grabs **handleChange**, **handleBlur** and **value** and pass in to the input along with your custom props.

If you want to render **textarea**, pass **as** prop to the **Field** component.

## Step 8: Pre-Populating Initial State

Some forms are pre-populated with the data that comes from an external systems, so let's see how it can be added to our form.

First of all, the data must be fetched, so let's simulate it in the **useEffect** hook:

```jsx
const [initialValues, setInitialValues] = useState({
  fullName: "",
  email: "",
  message: "",
  accept: false,
});

useEffect(() => {
  // Simulate call to an external API
  setTimeout(() => {
    setInitialValues({
      fullName: "John Doe",
      email: "johndoe@gmail.com",
      message: "Hello, I am John Doe, nice to meet you!",
      accept: true,
    });
  }, 1000);
}, []);
```

We keep the initial state of the form in state and update it with the values fetched from an external API.

The next thing we have to do is to pass **initialValues** to Formik:

```jsx
<Formik
  initialValues={initialValues}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    console.log(values);
  }}
>
```

Try it and see how it ... doesn't work! Can you guess why?

By default, Formik doesn't reset the form if **initialValues** prop changes, but we can force him to reset it by passing **enableReinitialize={true}**.

Default value for this prop is **false**. 

it controls whether Formik should reset the form if **initialValues** changes (using deep equality):

```jsx
<Formik
  initialValues={initialValues}
  // Equals to "false" by default
  enableReinitialize={true}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    console.log(values);
  }}
>
```

And we see how the form is pre-populated with our data, good job!

## Summary

In this article we have created a simple Contact Form using React, Formik and Yup libraries.

I hope you liked these awesome library stack and will try it in your next project.

However, remember that we have touched only a little part of all feature that are provided by Formik, so make sure to check the [documentation](https://formik.org/docs/overview) out to learn more.

P.S. All code is accessible in Github repository.