---
title: My way of looking for the perfect React app architecture
tag:
  - React
metaDescription: The best React application architecture. This article describes
  some different approaches I have tried over the last 3 years.
teaser: 'When someone asked Dan Abramov what is an optimal structure for React
  applications, he replied: "Move files around until it feels right". I thought
  it was a joke at first, and started trying different architectural approaches
  until I realized he was absolutely right...'
date: 2020-07-27T18:11:58.078Z
---
When someone asked Dan Abramov what is an optimal structure for React applications, he replied: "Move files around until it feels right".

I thought it was a joke at first, and started trying different architectural approaches until I realized he was absolutely right.

The whole journey to understand such a simple concept took almost 3 years.

## The oldie

The first methodology I used has nothing to do with good architectural principles.

Due to the lack of experience in the front-end area, all my components ended up in a directory called `components`.

Of course, these components had to be styled, so all my CSS files lived in a separate directory - `styles`.

Various configurations and utils were hardcoded into the components, which quickly grew in size and could not be maintained.

// Screenshot

## CSS-in-JS

A few months later, after we were tired of maintaining a bunch of CSS code with global styles that were constantly overlapping, long selectors with strange names and lots of dead code, we decided to try a new CSS-in JS approach that would eliminate these problems. 

Therefore a new library called `styled-components` was installed. 

Of course, the architecture had to be adapted to the new approach, so it was decided to create a separate folder for each component, containing 2 files: the component itself and its styles. 

This way, we did not have to browse through all the files within the `styles` directory to find styles for a specific component.

Seemed much better.

// Screenshot

## UI Kit

## With redux

## Containers/presentational components

## Atomic design

## The random

## Summary