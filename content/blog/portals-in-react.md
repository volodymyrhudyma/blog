---
title: Portals In React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-08T21:04:06.752Z
---
When building an application in React, sometimes it is necessary to put an element outside of the DOM hierarchy created by the parent component.

The simplest example are **modals** and **tooltips**.

If you render them inside of a normal React component, they will be attached to the nearest parent, which most likely will cause styling conflicts (especially if you have *z-index* or *overflow: hidden*) or wrong behaviour.