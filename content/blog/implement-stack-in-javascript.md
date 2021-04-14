---
title: Implement Stack In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to implement a Stack data structure in JavaScript.
  Stack is a linear data structure of a LIFO or FILO type.
teaser: Stack is a linear data structure of a LIFO (Last In - First Out) of FILO
  (First In - Last Out) type, which means that the last item added to the stack
  will be the first one to be taken out. Think about a stack as of an array with
  limited capabilities - you can only...
date: 2021-04-14T18:32:50.293Z
---
Stack is a linear data structure of a **LIFO** (Last In - First Out) or **FILO** (First In - Last Out) type, which means that the last item added to the stack will be the first one to be taken out.

Think about a stack as of an array with limited capabilities - you can only **insert** and **remove** elements to the **top** of the stack.

A stack has one pointer, called **top**, which points to the last added element.

## Basic Operations

There are two fundamental operations on a stack data structure:

* **push** - inserts a new element to the stack, becomes the **top**
* **pop** - returns the most recent element from the stack and removes it, previous element becomes the **top**

## Time Complexity

The time complexity of popping an element from the stack is constant - **O(1)**, since you can only retrieve the most recently added one.

However, if you would like to get the oldest element from the stack, the complexity would become **O(n)**.