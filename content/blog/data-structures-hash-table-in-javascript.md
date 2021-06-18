---
title: "Data Structures: Hash Table In JavaScript"
tag:
  - JavaScript
promote: false
metaDescription: // META
shareImage: /img/hash-table-in-javascript.jpg
teaser: Efficient data manipulation is a must know for developers of any level,
  not only for successful project development, but also for passing interviews
  while looking for a job. With the rapid development of programming languages,
  frameworks and libraries, it becomes easier to learn the technology that can
  be used right away to start coding, so more and more employers...
date: 2021-06-19T18:45:21.508Z
---
Efficient data manipulation is a must know for developers of any level, not only for successful project development, but also for passing interviews while looking for a job.

With the rapid development of programming languages, frameworks and libraries, it becomes easier to learn the technology that can be used right away to start coding, so more and more employers realize this and require a good knowledge of basics when interviewing candidates, especially on a higher positions.

Data Structures topic is one of the most important ones among the basics every developer should understand on some level.

In this article we will learn about one of the most popular Data Structure - **Hash Table**, which is used to efficiently store and retrieve key/value pairs.

## What Is Hash Table?

Hash Table is a data structure that implements an Associative Array, a structure that maps keys to values.

> **Associative Array** is an Abstract Data Type that uses strings as indexes.
>
> In JavaScript, there is no Associative Arrays, we use Objects to create them.
>
> An **Abstract Data Type (ADT)** is a special kind of a data type, whose logical behaviour is defined by a set of values and set of operations. The definition only mentions what operations can be performed, but not how these operations are implemented.
>
> The opposite to ADT is a **Concrete Data Type (CDT)**, which gives the full view on what operations can be performed and how they are implemented.

It uses a Hash Function that turns passed keys into numbers, under which the data is stored.

> **Hash Function** is a function that is capable of mapping a string key (group of characters) into a value of a certain length (typically called Hash Value).
>
> **Hash Value** represents the original string and is used to index a fixed-size Hash Table.

An example of a Hash Table that stores phone numbers:

![Hash Table Example (From Wikipedia)](/img/screenshot-2021-06-19-at-01.38.19.png "Hash Table Example (From Wikipedia)")

## What Is Hash Function?

As we already know, a Hash Function is a function that performs some complicated calculations to turn string keys into numbers, so they can be used as an Array indexes.

The arguments for the function are: key and a Hash Table size.

Let's see an example implementation of a Hash Function, which adds all the ASCII values of the key and performs a modulo operation by the Hash Table size.

> **American Standard Code for Information Interchange (ASCII)** is a character encoding for electronic communication.
>
> It assigns letters, numbers and other special characters in the 256 slots available in the 8-bit code.
>
> **Modulo Operation** is an operation that returns a remainder of a division after one number is divided by another.

```javascript
const hash = (key, size) => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash += key.charCodeAt(i);
  }
  return hash % size;
};

// Prints "64"
console.log(hash("firstName", 97));

// Prints "45"
console.log(hash("lastName", 97));
```

In the above example we use **charCodeAt()** method to get the ASCII code of each character in **key**, sum all of these codes and use the modulo operator to ensure that the value of the hash does not exceed the size of a Hash Table (**97**).

If we didn't use the modulo operator, our hashes would equal to **937** and **821** respectively.

## How To Handle Collisions?

Hash Collisions tend to happen when the same Hash Value is generated for either different or same keys:

```javascript
// Prints "64"
console.log(hash("firstName", 97));

// Prints "64"
console.log(hash("firstName", 97));
```

In the above example, Hash Function returns the same Hash value for the **firstName** key, which causes the index to collide and the previous entry will be overwritten with the newest one.

Fortunately, there are a few ways of resolving such collisions:

* **Separate Chaining**

  In this method, each bucket (Hash Table stores values in buckets) contains a pointer to another data structure (e.g. [Linked List](/2020-08-23-algorithms-linked-list-in-javascript/)).

![Separate Chaining (From Wikipedia)](/img/screenshot-2021-06-19-at-01.36.30.png "Separate Chaining (From Wikipedia)")

* **Open Addressing**

  In this method, all values are stored in the bucket array itself. 

  When a new value is about to be inserted, we examine the buckets, until a free slot is found.

  The name "Open Addressing" refers to the fact that the location of a value is not determined by its hash value.

![Open Addressing (From Wikipedia)](/img/screenshot-2021-06-19-at-01.37.18.png "Open Addressing (From Wikipedia)")

In the above picture, "Ted Baker" has a unique hash, even though collided with "Sandra Dee" that has previously collided with "John Smith".

While Separate Chaining and Open Addressing are great ways to handle collisions, they have a drawback - the number of stored entries cannot exceed the size of the Hash Table.

Even with good Hash Functions, their performance decreases when the Load Factor goes beyond **0.7**.

> **Load Factor** is a value that represents the current load of the Hash Table.
>
> It is calculated by dividing the current number of entries (**n**) by the size of the table (**s**) - **n / s**.

Therefore, in many cases, these restrictions force to use the Dynamic Resizing, with all its costs.

* **Dynamic Resizing**

  In this method, we set a limit (Load Factor) and when inserting new value makes us to exceed it, we double Hash Table in size and copy all elements from the old Hash Table to the new one.

## Hash Table Time Complexity

The complexity table in Big O Notation (taken from [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)):

![Hash Table Time Complexity](/img/screenshot-2021-06-19-at-01.41.11.png "Hash Table Time Complexity")

Obviously, the Hash Table is a very efficient Data Structure.

On average, they are **O(1)**, however they suffer from **O(n)** worst case complexity due to the following reasons:

* Too many elements are hashed under the same key

  Looking inside of the key can take **O(n)** time, but it's very rare situation if you choose a good Hash Function.
* The Hash Table has to resize due to exceeding the Load Factor 

  However, it can most happen after **n/2** operations, which are all assumed **O(1)**.

## Hash Table In JavaScript

We just figured out that Hash Table stores the data exactly the same way Object in JavaScript does.

And that's correct, Objects are an example of implemented Hash Table, because they allow to associate the string key with a value:

```javascript
const phoneNumbers = {
  andrew: "123-456-789",
  john: "987-654-321",
};

// Prints "123-456-789"
console.log(phoneNumbers.andrew);

// Prints "987-654-321"
console.log(phoneNumbers["john"]);
```

## Implementation In JavaScript

We can use Object, but we don't search for an easy way of going forward, do we? 

Let's implement a basic version of a Hash Table without proper collision handling.

To start with, create a HashTable class that contains 97 buckets:

```javascript
class HashTable {
  constructor() {
    this.values = new Array(97);
    this.size = 0;
  };
};
```

Why exactly 97 you may ask? The answer is - the size doesn't matter unless it is a **Prime Number**, which is used to minimize the chance of collisions.

> **Prime Number** is a number that has only 2 factors: 1 and itself.
>
> **Composite Number** is a number that has more than 2 factors.

The next step is to add a hash function, which we already implemented at the beginning of an article:

```javascript
class HashTable {
  // ...
  
  hash(key, size) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % size;
  };
};
```

Now we need to allow setting key/value pairs in the Hash Table, so let's add a **set** method that accepts **key** and **value** as parameters:

```javascript
class HashTable {
  // ...
  
  set(key, value) {
    const index = this.hash(key, this.values.length);
    this.values[index] = [key, value];
    this.size++;
  };
};
```

A quick explanation how the **set** method works:

* Convert received **key** into **index** by running a **hash** function on it, passing the length of the table to perform modulo operation and make sure that the **index** will not be greater that the table length
* Assign a **\[key, value]** pair to the calculated index
* Increment the size of the table

After wrapping up the **set** method, it's time to implement the **get** functionality that would allow us to retrieve a specific value by key:

```javascript
class HashTable {
  // ...
  
  get(key) {
    const index = this.hash(key, this.values.length);
    return this.values[index];
  };
};
```

In the **get** method we:

* Hash the given **key** to get an **index**
* Return the value stored under retrieved **index**

Finally, let's implement a **remove** method that would allow us to remove a specific key/value pair from the Hash Table:

```javascript
class HashTable {
  // ...
  
  remove(key) {
    const index = this.hash(key, this.values.length);
    if(this.values[index]) {
      delete this.values[index];
      this.size--;
      return true;
    }
    return false;
  };
};
```

In the **remove** function we:

* Get the **index** based on a provided **key**
* Check if the table contains an item under the given **index**
* If it does, we remove the item, decrease the table size and return **true**
* Otherwise just return **false**

Having that finished, let's test our implementation and see if we can find any problems with it:

```javascript
const table = new HashTable();

table.set("firstName", "John");
table.set("lastName", "Doe");

// Prints ["firstName", "John"]
console.log(table.get("firstName"));

// Prints ["lastName", "Doe"]
console.log(table.get("lastName"));

table.remove("firstName");
table.remove("lastName");

// Prints "undefined"
console.log(table.get("firstName"));

// Prints "undefined"
console.log(table.get("lastName"));

// Prints "0"
console.log(table.size);
```

At the first sight, there aren't any problems with our solution and it works as expected, but what if we try to set the different values using the same keys?

```javascript
const table = new HashTable();

table.set("firstName", "John");
table.set("firstName", "Andrew");

// Prints ["firstName", "Andrew"]
console.log(table.get("firstName"));
```

It seems like we are in a trouble now, since **John** was overwritten with **Andrew** for the **firstName** key.

We just faced a collision.

#### Separate Chaining with Linked List to rescue

As it has already been said, there are a few methods to handle the Hash Table collisions and one of the most popular is Separate Chaining using Linked List Data Structure.

To implement it, we will need to create a **LinkedList** and **Node** classes that would represent Linked List and its Node respectively:

```javascript
class LinkedList {
  constructor(node) {
    this.head = node;
    this.size = 0;
  };
};

class Node {
  constructor(value) {
    this[key] = value;
    this.next = null;
  };
};
```

The next thing is to change implemented method.

#### Methods: set

```javascript
class HashTable {
  // ...
  
  set(key, value) {
    const index = this.hash(key, this.values.length);
    
    // Create a Linked List Node
    const node = new Node(key, value);
    
    // If no value stored under the given index
    if(!this.values[index]) {
      
      // Add a Linked List there
      this.values[index] = new LinkedList(node);
      
    // If a value is stored under the given index
    } else {
      
      // Get the head of the Linked List
      let current = this.values[index].head;
      
      // Iterate the Linked List till the last element is reached
      // And assign this element to the "current"
      while(current.next) {
        current = current.next;
      }
      
      // Replace the last element with the Node
      current.next = node;
    }
    
    // Increase the number of items in Linked List 
    this.values[index].size++;
    
    // Increase the Hash Table size
    this.size++;
  };
};
```

#### Methods: get

```javascript
class HashTable {
  // ...
  
  get(key) {
    const index = this.hash(key, this.values.length);
    const value = this.values[index];
    
    // The "value" is a Linked List, so get the "head"
    let current = value.head;
    
    // If the "head" contains a "key", return its value
    if(current.hasOwnProperty(key)) {
      return current[key];
    }
    
    // Otherwise, check if the "next" Linked List element
    // Contains a "key" and return its value if so
    while(current.next) {
      if(current.next.hasOwnProperty(key)) {
        return current.next[key];
      }
      
      // Loop till the very last element
      current = current.next;
    }
    
    // Return "undefined" if a "key" was not found
    return undefined;
  };
};
```

#### Methods: remove

```javascript
class HashTable {
  // ...
  
  remove(key) {
    const index = this.hash(key, this.values.length);
    const value = this.values[index];
    
    // The "value" is a Linked List, so get the "head"
    let current = value.head;
    
    // If the "head" contains a "key"
    if(current.hasOwnProperty(key)) {
      
      // Assign the "next" element to the "head"
      value.head = current.next;
      
      // Decreate the size of a Linked List
      value.size--;
      
      // Decrease the size of a Hash Table
      this.size--;
      return true;
    }
    
    // If the "head" does not contain a "key"
    // Iterate over the "next" elements
    while(current.next) {
      
      // If the "next" element contains a "key"
      if(current.next.hasOwnProperty(key)) {
        
        // Assign the next "next" element instead of the current one
        current.next = current.next.next;
        
        // Decreate the size of a Linked List
        value.size--;

        // Decrease the size of a Hash Table
        this.size--;
        return true;
      }
    }
    
    // Otherwise, if nothing was removec, return "false"
    return false;
  };
};
```

And test the new implementation:

```javascript
const table = new HashTable();

table.set("firstName", "John");
table.set("firstName", "Andrew");

// Prints "John", which means that
// It gets the first stored element properly
console.log(table.get("firstName"));

// "ab" and "ba" have the same ASCII code - "1"
// Nevertheless, we are able to properly retrieve their values
table.set("ab", "abValue");
table.set("ba", "baValue");

// Prints "abValue"
console.log(table.get("ab"));

// Prints "baValue"
console.log(table.get("ba"));
```

And it seems to work perfectly fine!

## Why Hash Tables Are Useful?

This Data Structure is used in many kinds of a computer software to implement:

* Associative Arrays
* Database Indexing
* Caching
* Sets
* Representing Objects in some programming languages (like JavaScript)
* Representing unique data
* Transposition Tables

## Summary

In this article, we learned what is a Hash Table and how to implement it in JavaScript avoiding possible collisions.

Hash Table is a Data Structure that allows us to store key/value pairs and work with them in a fast and an efficient way.

Make sure you understand this Data Structure, since employers love to ask about it on interviews.