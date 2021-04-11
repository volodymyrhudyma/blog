---
title: Implement Queue In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-04-11T18:18:49.695Z
---
In JavaScript, there are many data structures designed to solve common problems.

Knowing them is a must for a good developer in order to be able to efficiently manipulate the data.

Today we will learn one of the most basic and popular data structures - Queue.

## The Queue

**Queue** is a sequentially ordered linear data structure of a **FIFO** (**First In - First Out**) type.

The first added element to the queue will be the first element to exit from it.

To better understand this data structure, think of a real-world queues, for example, to the restaurant.

If there is a queue of people in front of the restaurant, then the first person to get into the queue will be the first person to enter the restaurant, as simple as that.

![Queue To The Restaurant](/img/2942529.jpg "Queue To The Restaurant")

A Queue has two pointers:

* **head** - the oldest element in the queue
* **tail** - the latest element added to the queue

![Queue Image](/img/queue.png "Queue Image")

We can perform some basic operations on in, which will be described in the next section.

## The Basic Operations

There are two fundamental operations on a Queue data structure:

* **enqueue** - insert a new element to the queue, becomes the **tail** of the queue
* **dequeue** - remove the oldest element in the queue, the pre-oldest element of the queue becomes the **head**