---
title: Implement Queue In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn how to implement Queue data structure in JavaScript.
  Queue is a linear data structure of a FIFO type.
shareImage: /img/queue-in-javascript.jpg
teaser: In JavaScript, there are many data structures designed to solve common
  problems. Knowing them is a must for a good developer in order to be able to
  efficiently manipulate the data. Today we will learn one of the most basic and
  popular data structures...
date: 2021-04-12T18:18:49.695Z
---
In JavaScript, there are many data structures designed to solve common problems.

Knowing them is a must for a good developer in order to be able to efficiently manipulate the data.

Today we will learn one of the most basic and popular data structures - Queue.

## The Queue

**Queue** is a linear data structure of a **FIFO** (**First In - First Out**) type.

> **Linear data structure** is a structure in which the elements are stored sequentially, and the elements are connected to the previous and the next element. As the elements are stored sequentially, so they can be traversed or accessed in a single run.

The first added element to the queue will be the first element to exit from it.

To better understand this data structure, think of a real-world queues, for example, to the restaurant.

If there is a queue of people in front of the restaurant, then the first person to get into the queue will be the first person to enter the restaurant, as simple as that.

A Queue has two pointers:

* **head** - the oldest element in the queue
* **tail** - the latest element added to the queue

![Queue Image](/img/screenshot-2021-04-11-at-21.43.17.png "Queue Image")

We can perform some basic operations on in, which will be described in the next section.

## Basic Operations

There are two fundamental operations on a Queue data structure:

* **enqueue** - insert a new element to the queue, becomes the **tail** of the queue
* **dequeue** - remove the oldest element in the queue, the pre-oldest element of the queue becomes the **head**

## Time Complexity

In order to maintain the performance, all operations on a queue must be performed in constant time (**O(1)** time complexity).

The constant time means that no matter what the size of the queue is, accessing any single element takes constant time as only one operation has to be performed to locate it.

## The Implementation

One of the possible implementations that **should be avoided**, we will later find out why:

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

JavaScript is a very powerful tool and it provides us with all the necessary things we need to easily implement the Queue data structure.

It ships with a **shift** array method that is used to remove the first element.

In the example above, we used it to implement the **dequeue** operation, however it is not efficient for a large amount of data.

The **shift** method removes the element at the zero index and shifts the values at consecutive indexes down, which results in **O(n)** time complexity.

The bigger array is - the more elements will be shifted.

In conclusion - it is better to avoid using **shift** method when implementing the Queue in JavaScript.

Let's see an implementation without using **shift** method:

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
  elements: { '0': 1, '1': 2, '2': 3 },
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
  elements: { '1': 2, '2': 3 },
  head: 1,
  tail: 3,
  __proto__: Queue {
    ...
  }
}
*/
console.log(queue);
```

Both, **enqueue** and **dequeue** methods, use property accessors and increment operation to manipulate the data, so the time complexity is maintained on a **O(1)** level.

## Summary

Data structures are relatively simple yet important concept to learn about.

They offer a great help in solving some common problems in an easy and efficient way.

Today we learned Queue - a linear data structure of a FIFO (First In - First Out) type and implemented it in JavaScript in two ways: an efficient one with **O(1)** time complexity and the one that should be avoided, with **O(n)** complexity.