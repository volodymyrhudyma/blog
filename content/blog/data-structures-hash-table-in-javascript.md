---
title: "Data Structures: Hash Table In JavaScript"
tag:
  - JavaScript
promote: false
metaDescription: Learn how to implement a Hash Table in JavaScript - a Data
  Structure, which maps keys to values. It uses Hash Function - a function that
  can map data of any size to fixed-size values.
shareImage: /img/hash-table-in-javascript.jpg
teaser: Efficient data manipulation is a must for developers at any level, not
  only for successful project development, but also for passing job search
  interviews. With the rapid development of programming languages, frameworks
  and libraries, it is becoming easier to learn the technology to start coding
  right away. More and more employers...
date: 2021-06-19T18:45:21.508Z
---
Efficient data manipulation is a must for developers at any level, not only for successful project development, but also for passing job search interviews.

With the rapid development of programming languages, frameworks and libraries, it is becoming easier to learn the technology to start coding right away.

More and more employers are realizing this and requiring a good knowledge of the basics when interviewing applicants, especially for higher positions.

The topic of Data Structures is one of the most important among the basics that every developer should understand at some level.

In this article, we will learn about one of the most popular Data Structure - **Hash Table** which is used to store and retrieve key/value pairs efficiently.

## What Is Hash Table?

Hash Table is a Data Structure that implements an Associative Array, a structure that maps keys to values.

> **Associative Array** is an Abstract Data Type, which uses strings as indexes.
>
> In JavaScript, there is no Associative Arrays, we use Objects to create them.
>
> An **Abstract Data Type (ADT)** is a special kind of a data type, whose logical behaviour is defined by a set of values and a set of operations. The definition only mentions what operations can be performed, but not how those operations are implemented.
>
> The opposite of the ADT is a **Concrete Data Type (CDT)**, which gives the complete view of what operations can be performed and how they are implemented.

It uses a Hash Function, which converts given keys into numbers under which the data is stored.

> **Hash Function** is a function capable of mapping a string key (group of characters) into a value of a certain length (typically called a Hash Value).
>
> **Hash Value** represents the original string and is used to index  Hash Table of fixed-size.

An example of a Hash Table, which stores phone numbers:

![Hash Table Example (From Wikipedia)](/img/screenshot-2021-06-19-at-01.38.19.png "Hash Table Example (From Wikipedia)")

## What Is Hash Function?

As we already know, a Hash Function is a function that performs some complicated calculations to convert string keys into numbers so they can be used as Array indexes.

The arguments to the function are: key and a Hash Table size.

Let's look at a sample implementation of a Hash Function that adds all ASCII values of the key and performs a modulo operation with the Hash Table size.

> **American Standard Code for Information Interchange (ASCII)** is a character encoding for electronic communication.
>
> It assigns letters, numbers and other special characters in the 256 slots available in the 8-bit code.
>
> **Modulo Operation** is an operation that returns a remainder of a division after one number has been divided by another.

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

In the above example we use the **charCodeAt()** method to get the ASCII code of each character in **key**, sum all these codes, and use the modulo operator to ensure that the value of the hash does not exceed the size of a Hash Table (**97**).

If we did not use the modulo operator, our hashes would be equal to **937** and **821** respectively.

## How To Handle Collisions?

Hash Collisions tend to happen when the same Hash Value is generated for either different or the same keys:

```javascript
// Both print "64"
console.log(hash("firstName", 97));
console.log(hash("firstName", 97));

// Both print "1"
console.log(hash("ab", 97));
console.log(hash("ba", 97));
```

In the example above, Hash Function returns the same Hash value for the **firstName** key, causing the index to collide and overwrite the previous entry with the latest.

Fortunately, there are a few ways to resolve such collisions:

* **Separate Chaining**

  In this method, each bucket (Hash Table stores values in buckets) contains a pointer to a different data structure (e.g. [Linked List](/2020-08-23-algorithms-linked-list-in-javascript/)).

![Separate Chaining (From Wikipedia)](/img/screenshot-2021-06-19-at-01.36.30.png "Separate Chaining (From Wikipedia)")

* **Open Addressing**

  In this method, all values are stored in the bucket array itself. 

  When a new value is to be inserted, the buckets are examined until a free slot is found.

  The name "Open Addressing" refers to the fact that the storage location of a value is not determined by its Hash Value.

![Open Addressing (From Wikipedia)](/img/screenshot-2021-06-19-at-01.37.18.png "Open Addressing (From Wikipedia)")

In the above picture, "Ted Baker" has a unique hash, although it has collided with "Sandra Dee", which previously collided with "John Smith".

While Separate Chaining and Open Addressing are great ways to deal with collisions, they have a drawback - the number of stored entries cannot exceed the size of Hash Table.

Even with good Hash Functions, their performance degrades when Load Factor goes beyond **0.7**.

> **Load Factor** is a value representing the current load of the Hash Table.
>
> It is calculated by dividing the current number of entries (**n**) by the size of the table (**s**) - **n / s**.

Therefore, in many cases, these constraints force us to use Dynamic Resizing, with all its costs.

* **Dynamic Resizing**

  In this method, we set a limit (Load Factor) and if we exceed it by inserting a new value, we double the size of Hash Table and copy all the elements from the old Hash Table to the new one.

## Hash Table Time Complexity

The complexity table in Big O notation (taken from [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)):

![Hash Table Time Complexity](/img/screenshot-2021-06-19-at-01.41.11.png "Hash Table Time Complexity")

Obviously, the Hash Table is a very efficient Data Structure.

On average they are **O(1)**, however they suffer from **O(n)** worst case complexity for the following reasons:

* Too many elements are hashed under the same key

  Searching within the key can take **O(n)** time, but this is a very rare situation if you choose a good Hash Function.
* The size of Hash Table must to be reduced due to exceeding the Load Factor 

  However, this can happen most often after **n/2** operations, all of which are assumed to be **O(1)**.

## Hash Table In JavaScript

We just found out that Hash Table stores data just like Object does in JavaScript. 

And that's right, Objects are an example of implemented Hash Table, because they allow you to associate the string key with a value:

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

We can use Object, but we're not looking for an easy way to get ahead, are we?

Let's implement a basic version of a Hash Table without proper collision handling.

First, create a HashTable class that contains **97** buckets:

```javascript
class HashTable {
  constructor() {
    this.values = new Array(97);
    this.size = 0;
  };
};
```

Why exactly **97** you may ask? 

The answer is - size doesn't matter, unless it's a **Prime Number** used to minimize the probability of collisions.

> **Prime Number** is a number that has only 2 factors: 1 and itself.
>
> **Composite Number** is a number that has more than 2 factors.

The next step is to add a hash function, which we have already implemented earlier today:

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

Now we need to enable setting key/value pairs in Hash Table, so we add a **set** method that accepts **key** and **value** as parameters:

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

A brief explanation of how the **set** method works:

* Convert the received **key** to an **index** by running a **hash** function on it and passing the length of the table to perform a modulo operation and ensure that the **index** is not greater that the table length
* Assign a **\[key, value]** pair to the calculated index
* Increment the size of the table

After the **set** method is complete, it's time to implement the **get** functionality that allows us to retrieve a specific value by key:

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

* Hash the given **key** to obtain an **index**
* Return the value stored under the retrieved **index**

Finally, let's implement a **remove** method to delete a specific key/value pair from the Hash Table:

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
* Check if the table contains an element under the given **index**
* If so, we remove the element, decrease the table size and return **true**
* Otherwise, we simply return **false**

With that done, let's test our implementation and see if we find any problems with it:

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

At first glance, there are no any problems with our solution and it works as expected, but what if we try to set the different values using the same keys?

```javascript
const table = new HashTable();

table.set("firstName", "John");
table.set("firstName", "Andrew");

// Prints ["firstName", "Andrew"]
console.log(table.get("firstName"));
```

It seems we are now in a problem, as **John** has been overwritten with **Andrew** for the **firstName** key. 

We are dealing with a collision.

#### Separate Chaining With Linked List To The Rescue

As mentioned earlier, there are a few methods to handle Hash Table collisions, and one of the most popular is Separate Chaining with Linked List Data Structure. 

To implement it, we need to create a **LinkedList** and a **Node** class that would represent Linked List and its Node respectively:

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

Next, the implemented methods need to be adjusted.

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

In this article, we learned what a Hash Table is and how to implement it in JavaScript avoiding possible collisions.

A Hash Table is a Data Structure, which allows us to store key/value pairs and work with them in a fast and efficient way.

Make sure you understand this Data Structure, as employers like to ask about during job interviews.