---
title: Implement Queue In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
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

![Queue To The Restaurant](/img/2942529.jpg "Queue To The Restaurant")

A Queue has two pointers:

* **head** - the oldest element in the queue
* **tail** - the latest element added to the queue

![Queue Image](/img/queue.png "Queue Image")

We can perform some basic operations on in, which will be described in the next section.

## Basic Operations

There are two fundamental operations on a Queue data structure:

* **enqueue** - insert a new element to the queue, becomes the **tail** of the queue
* **dequeue** - remove the oldest element in the queue, the pre-oldest element of the queue becomes the **head**

## Time Complexity

In order to maintain the performance, all operations on a queue must be performed in constant time(**O(1)** time complexity).

The constant time means that no matter what the size of the queue is, accessing any single element takes constant time as only one operation has to be performed to locate it.

JavaScript provides us with a **shift** array method that is used to remove the first element.

It can be used to implement the **dequeue** operation, however it is not efficient for a large amount of data.

The **shift** method removes the element at the zero index and shifts the values at consecutive indexes down, which results in **O(n)** time complexity.

The bigger array is - the more elements will be shifted.

In conclusion - it is better to avoid using **shift** method when implementing the Queue in JavaScript.

## The Implementation