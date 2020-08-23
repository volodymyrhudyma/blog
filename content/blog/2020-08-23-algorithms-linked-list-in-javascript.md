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

An element of the linked list is called a **node**, which is an object containing two items: **element** and a **reference** to the next node:

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
    element: 1,
    next: {
      element: 2,
      next: {
        element: 3,
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

## Implementation in JavaScript

In this section, we will implement a **Singly-linked list** using JavaScript.

#### The basic classes

To begin with, let's implement the main `LinkedList` class:

```javascript
class LinkedList {
  constructor() {
    // Stores the first node of the list
    this.head = null;
    
    // Stores the length of the list
    this.size = 0;
  }
}
```

And `Node` class:

```javascript
class Node {
  constructor(element) {
    // Stores the data
    this.element = element;
    
    // Stores the reference to the next element in the list
    this.next = null;
  }
}

```

Great, having the basic classes we can start implementing some necessary functions which are going to be located in the `LinkedList` class.

#### add(element)

This function adds an **element** to the end of the list:

```javascript
/**
 *
 * Add an element to the end of the list
 */
add(element) {
  // Create a new Node
  const node = new Node(element);

  // If the list is empty, make the "element" to be a "head"
  if (this.head == null) {
    this.head = node;
  } else {
    // Store the current node
    let current = this.head;

    // Iterate to the end of the list
    while (current.next) {
      current = current.next;
    }

    // Add node to the end of the list
    current.next = node;
  }

  // Update the size of the list
  this.size++;
}

```

To add an element to the end of the list we do the following:

**If the list is empty**

* add an element to the head

**If the list is not empty**

* iterate to the end of the list
* add an element

#### insertAt(element, index)

This function inserts an **element** at the given **index** in a list: 

```javascript
/**
 *
 * Insert an element at the given index in a list
 */
insertAt(element, index) {
  // If the index is bigger than 0 and the size of the list, it is wrong
  if (index > 0 && index > this.size) {
    return false;
  } else {
    // Create a new node
    const node = new Node(element);

    let current = this.head;
    let previous;

    // If the index is 0
    // We add a reference to the current head
    // And replace the current head with the new element
    if (index == 0) {
      node.next = this.head;
      this.head = node;
    } else {
      current = this.head;
      let i = 0;

      // Iterate over the list to find the insert position
      while (i < index) {
        i++;
        previous = current;
        current = current.next;
      }

      // Add an element
      node.next = current;
      previous.next = node;
    }

    // Update the size of the list
    this.size++;
  }
}

```

To insert an element at the given index in a list we do the following:

* If the index is not 0 and is bigger than the size of the list, do nothing
* If the index is 0, we add a reference to the current head element and replace the current head with the new element
* If the index is in range `[0; size - 1]` we iterate the list to find the insert position and add an element

#### removeFrom(index)

This function removes and returns an element from the given position (**index**):

```javascript
/**
 * Remove and return an element from the specified position
 */
removeFrom(index) {
  // If the index is bigger than 0 and the size of the list, it is wrong
  if (index > 0 && index > this.size) return -1;
  else {
    let current = this.head;
    let previous = current;
    let i = 0;

    // If the index is 0
    // We delete the head element by assigning it to null
    if (index === 0) {
      this.head = current.next;
    } else {
      // Iterate over the list to find the remove position
      while (i < index) {
        i++;
        previous = current;
        current = current.next;
      }

      // Remove the element
      previous.next = current.next;
    }

    // Update the size of the lit
    this.size--;

    // Return the removed element
    return current.element;
  }
}
```

To remove an element from the given position in a list we do the following:

* If the index is not 0 and is bigger than the size of the list, return `-1`
* If the index is 0, we remove the head by assigning it to `current.next` that equals to `null`
* If the index is in range `[0; size - 1]` we iterate the list to find the position and remove an element

#### remove(element)

This function removes and returns  an **element** from the list is it was found, otherwise returns `-1`:

```javascript
/**
 *
 * Remove and returns given element from the list
 */
removeElement(element) {
  let current = this.head;
  let previous = null;

  // Iterate over the list to find the position of the element
  while (current != null) {
    // Compare current element with given element
    // If found then remove and return it
    if (current.element === element) {
      
      // If previous is null that means we deleted the head
      // So update it
      if (previous == null) {
        this.head = current.next;
      } else {
        previous.next = current.next;
      }

      // Update the size of the list
      this.size--;

      // Return removed element
      return current.element;
    }
    previous = current;
    current = current.next;
  }

  // Return "-1" if element has not been found
  return -1;
}
```

To remove an element from the list we iterate the whole list and search for the given element.

**If the element is found:**

* Remove it and return the removed element

**If the element is not found:**

* return `-1`

That's pretty much it when it comes to implementation. Now let's use the above methods and create our first linked list.

## Usage in JavaScript

```javascript
// HOHO
```