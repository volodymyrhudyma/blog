---
title: Algorithms | Linked List in JavaScript
tag:
  - JavaScript
metaDescription: META
teaser: TEASER
date: 2020-08-24T08:55:49.732Z
---
## The definition

A **linked list** is the linear collection of data whose order is not given by their physical placement in memory (unlike arrays). Instead, **each element contains a reference to the next one**.

An element of the linked list is called a **node**, which is an object containing two items: **data** and a **reference** to the next node:

![Linked list illustration](/img/singly-linked-list.svg "Linked list illustration")

The entry point of a list is called the **head**, which contains a reference to the next node and so on until we reach the last node, which is linked to a terminator used to signify the end of the list (`null`).

If a list is empty, the head is a `null` reference.

There are 3 types of linked lists, so far we have been talking about **Singly-linked list** where each node contains only one reference - to the next node.

## Doubly-linked list

**Doubly-linked list** is a linked list where each node contains two references - to the previous and next nodes:

![Doubly-linked list illustration](/img/doubly-linked-list.svg "Doubly-linked list illustration")

## Circular-linked list

**Circular-linked list** is a linked list where the last node points to the first node of the list:

![Circular-linked list illustration](/img/circularly-linked-list.svg "Circular-linked list illustration")

## Example in JavaScript

In JavaScript linked lists look the following way:

```javascript
// Empty linked list
const linkedList = {
  head: null,
};

// Linked list filled with values
const linkedList = {
  head: {
    data: 1,
    next: {
      data: 2,
      next: {
        data: 3,
        next: null,
      },
    },
  },
};
```

## Pros and Cons

Since the linked list is a very similar data structure to an array, in this section we will compare both of them.

#### Pros

* Nodes can be easily removed without having to re-organize the whole data structure. The data items do not need to be stored contiguously in memory or on disk, while restructuring an array at run-time is a much more expensive operation.

#### Cons

* Linked lists use more memory than arrays due to storage used by their pointers
* Linked lists do not allow random access to data, therefore search operations are expensive, as the data needs to be read in order from the beginning
* Singly-linked lists are cumbersome to navigate backward and while this might be a smaller problem with doubly-linked lists, more memory is consumed in allocating space for a reference to the previous node