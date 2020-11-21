---
title: Learn and Invert a Binary Search Tree in JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/tree.png
teaser: // TEASER
date: 2020-11-22T07:38:01.934Z
---
Among the most popular questions, software developers are asked in an interview is: "How to invert a Binary Search Tree?".

The truth is that many of us do not even know what a Binary Search Tree, let alone inverting it.

So let's start with the basics.

## What is a Tree?

A **Tree** is a widely-used data structure that consists of nodes connected by edges:

![Tree Data Structure](/img/perfect.jpg "Tree Data Structure")

It is just a collection of nodes, where each node is a data structure containing a value and references to its child nodes with the constraints of no duplicated references and no pointing to the root. 

## Terminology

In order to better understand trees, it is necessary to know at least basic terminology.

**Node** - a structure that contains a value and pointers to the child nodes.

**Root Node** - topmost node of the tree.

**Internal Node** - any node of the tree that contains at least one child node.

**External/Leaf Node** - any node of the tree that does not contain a child node.

**Height of a Node** - a length of the longest downward path from that node to a leaf node.

**Depth of a Node** - a length of the path to its root node.

**Height of a Tree** - a length from the root node to the deepest node down the tree. 

**Size of a Tree** - a number of all nodes.

To learn more, read [Wikipedia](https://en.wikipedia.org/wiki/Tree_(data_structure)).

## Tree Implementation in JavaScript

The implementation of a simple tree in JavaScript is straightforward:

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
  
  addChild(node) {
    this.children.push(node);
  }
}

const root = new Node("root");
const child1 = new Node("child1");
const child2 = new Node("child2");
const child3 = new Node("child2");

root.addChild(child1);
root.addChild(child2);
child1.addChild(child3);

// Node {
//  value: "root",
//  children: [
//    Node {
//      value: "child1",
//      children: [ Node { value: "child2", children: [] } ]
//   },
//    Node { value: "child2", children: [] }
//  ]
// }
console.log(root);
```

## What is a Binary Tree?

Knowing the basics of a tree, let's take a look at a Binary Tree, which is a specialized version of a tree.

In a **Binary Tree,** each node has **at most two children**, which are called **left** and **right** child.

Depending on the arrangement of the nodes, there are several types of Binary Trees:

* **Full** - each node has either 0 or 2 children (1 is not allowed)

![Full Binary Tree](/img/full.png "Full Binary Tree")

* **Complete** - every level, except possibly the last, is full of nodes and all nodes in the last level are as left as possible

![Complete Binary Tree](/img/complete.png "Complete Binary Tree")

* **Perfect** - every level is full of nodes and all leaves have the same depth

![Perfect Binary Tree](/img/perfect.jpg "Perfect Binary Tree")

## What is a Binary Search Tree?

A **Binary Search Tree** is a special type of Binary Tree, which contains at most 2 nodes (like all Binary Trees) with a major difference - the values are placed in such a way that the **left children must be smaller** than the parent, the **right children - bigger**:

![Binary Search Tree](/img/bst.jpg "Binary Search Tree")

## Binary Search Tree Implementation in JavaScript

The basic implementation of Binary Search Tree in JavaScript (allows to create a tree and insert nodes): 

```javascript
class Node { 
  constructor(data) {
    this.data = data; 
    this.left = null; 
    this.right = null; 
  } 
}

class BinarySearchTree { 
  constructor() { 
    this.root = null; 
  }
  
  insert(data) {
    const node = new Node(data);
    
    if(this.root === null) {
      this.root = node;
    } else {
      // Find the correct position
      // And insert the node
      this.insertNode(this.root, node);
    }
  }
  
  insertNode(rootNode, newNode) {
    // If the data is smaller than the root
    // Move to the left
    if(newNode.data < rootNode.data) {
      // If left is null
      // Insert here
      if(rootNode.left === null) {
        rootNode.left = newNode;
      // If left is not null
      // Recur untill null if found
      } else {
        this.insertNode(rootNode.left, newNode);
      }
    // If the data is greater than the root
    // Move to the right
    } else {
      if(rootNode.right === null) {
        rootNode.right = newNode;
      } else {
        this.insertNode(rootNode.right, newNode);
      }
    }
  }
}
```

Create the same tree as in the above example:

```javascript
const binarySearchTree = new BinarySearchTree();

binarySearchTree.insert(8);
binarySearchTree.insert(3);
binarySearchTree.insert(10);
binarySearchTree.insert(14);
binarySearchTree.insert(6);
binarySearchTree.insert(1);
binarySearchTree.insert(4);
binarySearchTree.insert(7);
binarySearchTree.insert(13);
```

## Invert a Binary Search Tree

Now, having the initial knowledge on the given topic, it is finally possible to proceed with inverting a Binary Search Tree.

But first, what does it mean to invert a Binary Search Tree? 

Basically, it means to swap left and right children:

```javascript

```

Inverted tree created in the example above:

![Inverted Binary Search Tree](/img/bst-1-1-1-1-1-.jpg "Inverted Binary Search Tree")

## Summary