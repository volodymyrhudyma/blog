---
title: Enable Spell Checking With HTML Only
tag:
  - Other
promote: false
metaDescription: Learn a spellcheck HTML attribute used to check for spelling
  errors in input, textarea, and content-editable fields.
shareImage: /img/spell-checking-min.jpg
teaser: Recently, while browsing the web, I came across an interesting HTML
  attribute that allows you to spell check your input, text areas, and content
  editable fields. This can become an extremely useful addition to your website
  if you have...
date: 2021-03-13T14:39:24.270Z
---
Recently, while browsing the web, I came across an interesting HTML attribute that allows you to spell check your input, text areas, and content editable fields. 

This can become an extremely useful addition to your website if you have a lot of forms that need to be filled out by users. 

## The "spellcheck" attribute

The **spellcheck** attribute is an attribute that defines whether or not the element should be checked for spelling errors:

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

Obviously, the attribute can contain either the value **true** or **false**, which should indicate whether its contents should be checked for errors or not. 

**Important Note:** Explicit use of the boolean value is mandatory, shorthand is not allowed:

```html
<!-- Shorthand is not allowed -->
<input type="text" spellcheck placeholder="Type something here" />
```

Let's see the above code in action:

![Spellcheck Code](/img/spellcheck-min.gif "Spellcheck Code")

As you can see, the first three fields are validated and the last one is not.

## Browser Compatibility

According to [caniuse](https://caniuse.com/?search=spellcheck), the attribute is available in 98.95% of browsers:

![Can I Use Report](/img/screenshot-2021-03-12-at-15.58.06.png "Can I Use Report")

## Interesting Facts

* If the **spellcheck** is not set, the default value depends on the element and the browser

  In general, **contenteditable** and **textarea** behave as if it was set to **true**, and **input** as if it was set to **false**
* It does not affect validation in any way

And much more of them in [this article](https://www.wufoo.com/html5/spellcheck-attribute/).

## Summary

I was surprised when I saw this attribute, will definitely use it when creating forms.

Hopefully, it will improve the User Experience a tiny bit.