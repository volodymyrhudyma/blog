---
title: Implement Stack In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to implement a Stack data structure in JavaScript.
  Stack is a linear data structure of a LIFO or FILO type.
shareImage: /img/stack-in-javascript.jpg
teaser: Stack is a linear data structure of a LIFO (Last In - First Out) or FILO
  (First In - Last Out) type, which means that the last item added to the stack
  will be the first one to be taken out. Think about a stack as of an array with
  limited capabilities - you can only...
date: 2021-04-15T18:32:50.293Z
---
Stack is a linear data structure of a **LIFO** (Last In - First Out) or **FILO** (First In - Last Out) type, which means that the last item added to the stack will be the first one to be taken out.

Think about a stack as of an array with limited capabilities - you can only **insert** and **remove** elements to the **top** of the stack.

A stack has one pointer, called **top**, which points to the last added element.

![Stack Image](/img/stack.png "Stack Image")

## Basic Operations

There are two fundamental operations on a stack data structure:

* **push** - inserts a new element to the stack, becomes the **top**
* **pop** - returns the most recent element from the stack and removes it, previous element becomes the **top**

## Time Complexity

The time complexity of pushing and popping an element from the stack is constant - **O(1)**, since you can only add to the top and retrieve the most recently added one.

However, if you would like to get the oldest element from the stack, the complexity would become **O(n)**.

## The Implementation

The basic stack implementation in JavaScript, using the functionality of arrays:

```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
}

const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

// Prints "3"
console.log(stack.pop());
```

We can also add some helper methods:

* **peek** - get an element from the stack without removing it
* **isEmpty** - check if the stack is empty
* **getSize** - get the size of the stack

```javascript
class Stack {
  // .. 
  peek() {
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  getSize() {
    return this.items.length;
  }
}
```

The implementation is simple, **yet not overflow-safe**.

If the stack is full and does not contain enough space to accept an entity to be pushed, the stack is then considered to be in an overflow state.

In order to make an overflow-safe stack, we need to change a bit al algorithm of a **push** function - we have to check if the stack is full before adding any element to it.

In case if the stack is full - throw an error:

```javascript
class Stack {
  constructor() {
    // .. 
    this.MAX_SIZE = 100;
  }
  push(element) {
    if(this.getSize() >= this.MAX_SIZE) {
      throw new Error("Stack Overflow Exception");
    }
    this.items.push(element);
  }
  // ..
}

const stack = new Stack();

stack.push(1);
stack.push(2);
// Error: Stack Overflow Exception
stack.push(3);
```

## Stack vs. Queue

In the [previous article](/implement-queue-in-javascript/), we learned about the queue in JavaScript.

Today, after getting to know stack, you may wonder what are the key differences between both data structures.

On the one hand, they are quite similar, linear data structures, but on the other hand - they are of different types.

The queue is of a FIFO (First In - First Out), which means that the first element added to the queue is also the first element to leave it.

The stack is of a LIFO (Last In - First Out) or FILO (First In - Last Our) type, which means that the last item added to the stack will be the first one to be taken out.

Another difference is that the insertion and deletion processes in stack are performed only at the top and we have to maintain only one pointer - to the **top** element, when in the queue we maintain two pointers - **head** and **tail**. 

Lastly, stacks are used to solve recursive problems, queues - sequential elements processing.

## Summary

Stack is a very basic, linear data structure of a **LIFO** (Last In - First Out) or **FILO** (First In - Last Out) type.

When implementing stack, remember about setting and checking max size to prevent it from being in an overflow state.

Make sure to play around with the implementation to understand the data structure better.