---
title: Spell Checking Your Inputs With HTML Only
tag:
  - Other
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-03-13T14:39:24.270Z
---
Recently I was browsing the Internet and stumbled upon an interesting HTML attribute that allows performing a spell checking of your inputs, text areas, and content editable fields.

This can get an extremely useful addition to your website if you have a lot of forms to be filled by the users.

## The "spellcheck" attribute

The `spellcheck` is an attribute that defines whether the element should be checked for spelling errors or not:

```html
<!-- Input field -->
<input type="text" spellcheck="true" placeholder="Type something here" />

<!-- Textarea -->
<textarea spellcheck="true" placeholder="Type something here"></textarea>

<!-- Editable paragraph -->
<p contenteditable spellcheck="true">Type something here</p>

<!-- This would not be validated -->
<p contenteditable spellcheck="false">Type something here</p>
```

Obviously, the attribute can contain either **true** or **false** value, intended to tell whether its content should be validated for errors or not.

**Important note:** The explicit usage of boolean value is mandatory, shorthand is not allowed:

```html
<!-- Shorthand is not allowed -->
<input type="text" spellcheck placeholder="Type something here" />
```

Let's see the above code in action:

![Spellcheck Code](/img/spellcheck-min.gif "Spellcheck Code")

As you can see, the first three fields are validated and the last one is not.

## Browser Compatibility

According to the [caniuse](https://caniuse.com/?search=spellcheck), the attribute is available in 98,95% of the browsers:

![Can I Use Report](/img/screenshot-2021-03-12-at-15.58.06.png "Can I Use Report")

## Interesting Facts

* When the **spellcheck** is not set, the default value depends on the element and the browser

  In general, **contenteditable** and **textarea** behave as if it was set to **true**, and **input** as if it was set to **false**
* It does not affect validation in any way

And a lot more of them in [this article](https://www.wufoo.com/html5/spellcheck-attribute/).

## Summary