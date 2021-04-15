---
title: Implement Stack In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to implement a Stack data structure in JavaScript.
  Stack is a linear data structure of a LIFO or FILO type.
shareImage: /img/stack-in-javascript.jpg
teaser: Stack is a linear data structure of a LIFO (Last In - First Out) or FILO
  (First In - Last Out) type, which means that the last element added to the
  stack is also the first to be taken out. Think of a stack as a constrained
  array - you can only...
date: 2021-04-15T18:32:50.293Z
---
Stack is a linear data structure of a **LIFO** (Last In - First Out) or **FILO** (First In - Last Out) type, which means that the last element added to the stack is also the first to be taken out.

Think of a stack as a constrained array - you can only **insert** and **remove** elements to the **top** of the stack.

A stack has a pointer, called **top**, that points to the last added element.

![Stack Image](/img/screenshot-2021-04-14-at-22.02.01.png "Stack Image")

## Basic Operations

There are two fundamental operations on a stack data structure:

* **push** - inserts a new element into the stack, becomes the **top**
* **pop** - returns the most recent element from the stack and removes it, the previous element becomes the **top**

## Time Complexity

The time complexity of pushing and popping an element from the stack is constant - **O(1)**, since you can only add to the top and retrieve the most recently added one.

However, if you want to fetch the oldest element from the stack, the complexity would become **O(n)**.

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

* **peek** - retrieves element from the stack without removing it
* **isEmpty** - checks if the stack is empty
* **getSize** - gets the size of the stack

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

The implementation is simple, **but not overflow-safe**. 

If the stack is full and no longer has enough space to hold an entity to be pushed, then the stack is considered to overflow. 

To create an overflow-safe stack, we need to change the algorithm of a **push** function a bit - we need to check if the stack is full before adding an element to it. 

If the stack is full, an error is returned:

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

Today, after learning about the stack, you may be wondering what the main differences are between the two data structures.

On the one hand, they are quite similar, linear data structures, but on the other hand - they are of different types.

The queue is of a FIFO (First In - First Out), which means that the first element that is added to the queue is also the first element that leaves leave it.

The stack is of a LIFO (Last In - First Out) or FILO (First In - Last Our) type, which means that the last item added to the stack is also the first one to leave it.

Another difference is that the insertions and deletions in the stack are performed only at the top and we need to keep only one pointer - to the **top** element, whereas in the queue we keep two pointers - **head** and **tail**.

Finally, stacks are used to solve recursive problems, queues - sequential elements processing.

## Summary

Stack is a very simple, linear data structure of a **LIFO** (Last In - First Out) or **FILO** (First In - Last Out) type.

When implementing stack, remember to set and check the maximum size to prevent overflow. 

Be sure to play around with the implementation to better understand the topic.