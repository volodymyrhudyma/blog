---
title: Convert Float to Integer in JavaScript
tag:
  - JavaScript
metaDescription: // META
teaser: // TEASER
date: 2020-10-18T08:28:42.140Z
---
Converting floating numbers to integers is a common task when creating web applications.

Even though there are numerous ways to do this in JavaScript, often developers do not know other ways rather than using the **Math** object or **parseInt** function.

> The JavaScript **Math** object allows you to perform mathematical tasks on numbers.

## Math.ceil

```javascript
// Positive
Math.ceil(10.1); // 11
Math.ceil(10.5); // 11
Math.ceil(10.9); // 11

// Negative
Math.ceil(-10.1); // -10
Math.ceil(-10.5); // -10
Math.ceil(-10.9); // -10
```

## Math.floor

```javascript
// Positive
Math.floor(10.1); // 10
Math.floor(10.5); // 10
Math.floor(10.9); // 10

// Negative
Math.floor(-10.1); // -11
Math.floor(-10.5); // -11
Math.floor(-10.9); // -11
```

## Math.round

```javascript
// Positive
Math.round(10.1); // 10
Math.round(10.5); // 11
Math.round(10.9); // 11

// Negative
Math.round(-10.1); // -10
Math.round(-10.5); // -10
Math.round(-10.9); // -11
```

## Math.trunc

```javascript
// Positive
Math.trunc(10.1); // 10
Math.trunc(10.5); // 10
Math.trunc(10.9); // 10

// Negative
Math.trunc(-10.1); // -10
Math.trunc(-10.5); // -10
Math.trunc(-10.9); // -10
```

## parseInt

```javascript
// Positive
parseInt(10.1); // 10
parseInt(10.5); // 10
parseInt(10.9); // 10

// Negative
parseInt(-10.1); // -10
parseInt(-10.5); // -10
parseInt(-10.9); // -10
```

## Bitwise OR

```javascript
// Positive
console.log(10.1 | 0); // 10
console.log(10.5 | 0); // 10
console.log(10.9 | 0); // 10

// Negative
console.log(-10.1 | 0); // -10
console.log(-10.5 | 0); // -10
console.log(-10.9 | 0); // -10
```