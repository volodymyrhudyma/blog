---
title: Write Parameterized Tests In Jest
tag:
  - React
promote: false
metaDescription: // META
shareImage: /img/parameterized-tests-in-jest.jpg
teaser: // TEASER
date: 2021-09-21T07:18:41.251Z
---
Unit tests are crucial - they help to confirm that the individual parts of applications work as intended.

On the one hand, without them you are never sure that everything works correctly either after refactoring or adding a new feature.

But on the other hand, writing them takes a lot of time, especially when the code is duplicated to test different edge cases.

Skipping tests is not an option, therefore we need to search for a way to speed up the whole process.

Fortunately, Jest provides us with a possibility to create **Parameterized Tests** that are designed exactly for this purpose.