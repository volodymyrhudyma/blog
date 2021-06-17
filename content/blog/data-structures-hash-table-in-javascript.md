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
> An **Abstract Data Type (ADT)** is a special kind of a data type, whose logical behaviour is defined by a set of values and set of operations. The definition only mentions what operations can be performed, but not how these operations are implemented.
>
> The opposite to ADT is a **Concrete Data Type (CDT)**, which gives the full view on what operations can be performed and how they are implemented.

It uses a Hash Function that turns passed keys into numbers, under which the data is stored.

> **Hash Function** is a function that is capable of mapping a string key (group of characters) into a value of a certain length (typically called Hash Value).
>
> **Hash Value** represents the original string and is used to index a fixed-size Hash Table.

An example of a Hash Table that stores phone numbers:

![Hash Table Example (From Wikipedia)](/img/hash_table_3_1_1_0_1_0_0_sp.svg.png "Hash Table Example (From Wikipedia)")

## Hash Table Time Complexity

Hash Table is a very efficient Data Structure, as it can be seen from the complexity table in Big O Notation (taken from [Wikipedia](https://en.wikipedia.org/wiki/Hash_table)):

![Hash Table Time Complexity](/img/screenshot-2021-06-17-at-21.34.09.png "Hash Table Time Complexity")

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
console.log(phoneNumbers.john);
```