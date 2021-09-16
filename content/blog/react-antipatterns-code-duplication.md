---
title: "React Antipatterns: Code Duplication"
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/react-antipatterns-code-duplication.jpg
teaser: // TEASER
date: 2021-09-18T14:44:30.946Z
---
Let's clarify one thing before we begin - code duplication is not necessarily a bad thing.

In some cases, it's much better to duplicate the code rather than create a reusable component that accepts tons of props to handle all edge cases, because it's very likely to get lost.

But in general, good code should be written once and used whenever needed.

That's what we are going to focus on today.

## The Problem

To begin with, imagine building complex website menu for a landing page, which looks completely different on desktop and mobile.

Any time users click on the menu item, they should be scrolled down to the specific section.

Pretty common scenario, right?

This is exactly the moment, when it's better to build two separate components - **DesktopMenu** and **MobileMenu**, even though we could create only one, but messy.