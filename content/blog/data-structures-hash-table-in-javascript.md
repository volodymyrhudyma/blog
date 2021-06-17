---
title: "Data Structures: Hash Table In JavaScript"
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-06-19T18:45:21.508Z
---
Efficient data manipulation is a must know for developers of any level, not only for successful project development, but also for passing interviews while looking for a job.

With the rapid development of programming languages, frameworks and libraries, it becomes easier to learn the technology that can be used right away to start coding, so more and more employees realize this and require a good knowledge of basics when interviewing candidates, especially on a higher positions.

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

![Hash Table Example (From Wikipedia)](/img/screenshot-2021-06-17-at-21.43.07.png "Hash Table Example (From Wikipedia)")

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

![Separate Chaining (From Wikipedia)](/img/hash_table_5_0_1_1_1_1_1_ll.svg.png "Separate Chaining (From Wikipedia)")

* **Open Addressing**

  In this method, all values are stored in the bucket array itself. 

  When a new value is about to be inserted, we examine the buckets, until a free slot is found.

  The name "Open Addressing" refers to the fact that the location of a value is not determined by its hash value.

![Open Addressing (From Wikipedia)](/img/hash_table_5_0_1_1_1_1_0_sp.svg.png "Open Addressing (From Wikipedia)")

In the above picture, "Ted Baker" has a unique hash, even though collided with "Sandra Dee" that has previously collided with "John Smith".

While Separate Chaining and Open Addressing are great ways to handle collisions, they have a drawback - the number of stored entries cannot exceed the size of the Hash Table.

Even with good Hash Functions, their performance decreases when the Load Factor goes beyond **0.7**.

> **Load Factor** is a value that represents the current load of the Hash Table.
>
> It is calculated by dividing the current number of entries (**n**) by the size of the table (**s**) - **n / s**.

Therefore, in many cases, these restrictions force to use the Dynamic Resizing, with all its costs.

*  **Dynamic Resizing**

  In this method, we set a limit (Load Factor) and when inserting new value makes us to exceed it, we double Hash Table in size and copy all elements from the old Hash Table to the new one.

## Hash Table Time Complexity

Hash Table is a very efficient Data Structure, as it can be seen from the complexity table in Big O Notation (taken from [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)):

![Hash Table Time Complexity](/img/screenshot-2021-06-17-at-21.42.02.png "Hash Table Time Complexity")

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