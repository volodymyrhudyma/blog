---
title: Implement Queue In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to implement a Queue data structure in JavaScript.
  Queue is a linear data structure of a FIFO type.
shareImage: /img/queue-in-javascript.jpg
teaser: In JavaScript, there are many data structures designed to solve common
  problems. Knowing them is a must for a good developer to be able to manipulate
  the data efficiently. Today we will learn about one of the most basic and
  popular data structures...
date: 2021-04-12T18:18:49.695Z
---
In JavaScript, there are many data structures designed to solve common problems.

Knowing them is a must for a good developer to be able to manipulate the data efficiently.

Today we will learn about one of the most basic and popular data structures - queue.

## The Queue

**Queue** is a linear data structure of a **FIFO** (**First In - First Out**) type.

> **Linear data structure** is a structure in which the elements are stored sequentially and the elements are connected to the previous and next elements. Since the elements are stored sequentially, they can be traversed or accessed in a single run.

The first element added to the queue is also the first element to leave it.

To better understand this data structure, think of a real-world queues, for example, to the restaurant.

If there is a queue of people outside the restaurant, then the first person to enter the queue will be the first person to enter the restaurant, it's that simple

A queue has two pointers:

* **head** - the oldest element in the queue
* **tail** - the latest element added to the queue

![Queue Image](/img/screenshot-2021-04-11-at-21.43.17.png "Queue Image")

We can perform some basic operations on it, described in the next section.

## Basic Operations

There are two fundamental operations on a queue data structure:

* **enqueue** - inserts a new element into the queue, becomes the **tail**
* **dequeue** - removes the oldest element in the queue, the previously oldest element becomes the **head**

## Time Complexity

To maintain performance, all operations on a queue must execute in constant time (**O(1)** time complexity).

The constant time means that regardless of the size of the queue, accessing each item takes constant time because only one operation needs to be performed to find it.

## The Implementation

One of the possible implementations that **should be avoided**, we'll find out why later:

```javascript
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

// Prints "1"
console.log(queue.dequeue());
```

JavaScript is a very powerful tool and it provides us with all the necessary things we need to easily implement the queue data structure.

It ships with a **shift** array method that is used to remove the first element.

In the above example, we used it to implement the **dequeue** operation, but it is not efficient when dealing with large amount of data.

The **shift** method removes the element at the zero index and shifts the values down at successive indexes, resulting in a time complexity of **O(n)**.

The larger the array - the more elements are shifted. 

In summary, it is better to avoid the **shift** method when implementing the queue in JavaScript. 

Let's look at an implementation without the **shift** method:

```javascript
class Queue {
  constructor() {
    // The actual queue
    this.elements = {};
    // The index of the head element
    this.head = 0;
    // The index of the tail element
    this.tail = 0;
  }
  enqueue(element) {
    // Add an element on the current tail index
    this.elements[this.tail] = element;
    // Increase the index of the tail element
    // So the next elements are added at the end
    this.tail++;
  }
  dequeue() {
    // If the queue is empty, return "undefined"
    if (this.tail === this.head) {
      return undefined;
    }
    // Pick an element
    const element = this.elements[this.head];
    // Delete it
    delete this.elements[this.head];
    // Increase the head index
    this.head++;
    // Return the element
    return element;
  }
}
```

And test it:

```javascript
const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

/* 
Queue {
  elements: { "0": 1, "1": 2, "2": 3 },
  head: 0,
  tail: 3,
  __proto__: Queue {
    ...
  }
}
*/

// Prints "1"
console.log(queue.dequeue());

/* 
Queue {
  elements: { "1": 2, "2": 3 },
  head: 1,
  tail: 3,
  __proto__: Queue {
    ...
  }
}
*/
console.log(queue);
```

Both methods, **enqueue** and **dequeue**, use property accessors and increment operations to manipulate the data, so the time complexity is kept at an **O(1)** level.

## Summary

Data structures are a relatively simple but important concept to learn about. 

They provide a great help to solve some common problems in a simple and efficient way. 

Today we learned about queue - a linear data structure of type FIFO (First In - First Out) and implemented in JavaScript in two ways: an efficient one with **O(1)** time complexity and the one to avoid with **O(n)** complexity.