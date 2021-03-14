---
title: Immutable Update Patterns In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: "Immutable Update Patterns in JavaScript. Find the best ways to
  update nested Objects and Arrays in an immutable way by using deep and shallow
  copies. "
teaser: Today we will learn how to update (nested) Arrays/Objects in an
  immutable way. This is a must-know, especially if you create your projects in
  React using the Redux library, so prepare well and let's get started...
date: 2020-08-20T14:48:31.472Z
---
In this article we will focus on practical examples of how to modify an Array/Object in an immutable way.

Before we start learning, let's remember what shallow and deep copies are and how they differ.

## Shallow Copy

**Shallow copy** is a bit-wise copy of an object. A new object is created that has an exact copy of the values in the original object. 

If any of the fields of the object are references to other objects, just the reference addresses are copied:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

const newUser = {
  ...user,
};

newUser.other.age = 22;

// Prints {name: "John", surname: "Doe", age: 22}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

Property `other` references to an object which contains `age`.

When doing a shallow copy, just the reference address of `other` is copied, not the value itself.

That's why when we modify `other.age` it gets updated in both `user` and `newUser`.

## Deep Copy

**Deep copy** is a full copy of an object. The newly copied object is completely independent of the original one:

```javascript
import cloneDeep from "lodash/cloneDeep";

const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

const newUser = cloneDeep(user);

newUser.other.age = 22;

// Prints {name: "John", surname: "Doe", age: 18}
console.log(user);

// Prints {name: "John", surname: "Doe", age: 22}
console.log(newUser);
```

Modifying `other.age` does not affect the `user` object, as `newUser` is a deep copy.

## Things To Remember

* Spread operator (`...`) only does a shallow copy of an object
* Use an external library to create a deep copy, for example [`lodash`](https://lodash.com/)``
* `map`/`filter`/`slice`/`concat` return a new array
* `splice` modifies an array

## Array

#### Add an item

\#1 - using spread operator (`...`):

```javascript
const users = ["John", "Andrew"];
const cars = ["Volvo", "Nissan"];

const result = [...users, ...cars];

// "John", "Andrew", "Volvo", "Nissan"
console.log(result);
```

\#2 - using `concat`:

```javascript
const users = ["John", "Andrew"];
const cars = ["Volvo", "Nissan"];

const result = users.concat(cars);

// "John", "Andrew", "Volvo", "Nissan"
console.log(result);
```

#### Remove an item

\#1 - using `filter`:

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

const result = users.filter((user, i) => i !== index);

// "John", "Mary"
console.log(result);
```

\#2 - using spread operator (`...`) and `slice`:

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

const result = [...users.slice(0, index), ...users.slice(index, 2)];

// "John", "Mary"
console.log(result);
```

#### Update an item

\#1 - using `map` operator:

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

const result = users.map((user, i) => {
  if(i === index) {
    return "Mark";
  }
  return user;
});

// "John", "Mark", "Mary"
console.log(result);
```

\#2 - using spread operator (`...`) and `slice`:

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

const result = [...users.slice(0, index), "Mark", ...users.slice(index + 1)];

// "John", "Mark", "Mary"
console.log(result);
```

## Object

#### Add property

To add a property, that is **one-level deep**, make a shallow copy using the spread operator (`...`) and append the property:

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

const updatedUser = {
  ...user,
  age: 18,
};

// { name: "John", surname: "Doe", age: 18 }
console.log(updatedUser);
```

#### Update property

To update a property, that is **one-level deep**, make a shallow copy using the spread operator (`...`) and append it.

Update process looks exactly the same as create:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const updatedUser = {
  ...user,
  age: 19,
};

// { name: "John", surname: "Doe", age: 19 }
console.log(updatedUser);
```

#### Remove property

To remove a property, that is **one-level deep**, destructure it from an object and use **rest parameter** to retrieve all other properties.

> **The rest parameter** gathers all remaining arguments.

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

const { age, ...rest } = user;

// { name: "John", surname: "Doe" }
console.log(rest);
```

#### Add/Update nested property

To add/update nested property, **create a copy of each level of nested data**:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  address: {
    street: "Example street",
    house: 1
  }
};

const updatedUser = {
  ...user,
  address: {
    ...user.address,
    house: 2
  }
};

// {
//   name: "John",
//   surname: "Doe",
//   address: { street: "Example street", house: 2 }
// }
console.log(updatedUser); 
```

#### Remove nested property

To remove nested property, you can create a **deep copy** using an external library and use the `delete` operator:

```javascript
import cloneDeep from "lodash/cloneDeep";

const user = {
  name: "John",
  surname: "Doe",
  address: {
    street: "Example street",
    house: {
      name: "Example house",
      number: 1,
    }
  }
};

// Create a deep copy
const userCopy = cloneDeep(user);

// Delete nested item
delete userCopy.address.house;

//  { 
//    name: "John", 
//    surname: "Doe", 
//    address: { street: "Example street" } 
//  }
console.log(userCopy);
```

#### Add nested array item

```javascript
const user = {
  name: "John",
  surname: "Doe",
  addresses: [
    {
      street: "Example street",
      house: 1
    }
  ]
};

const updatedUser = {
  ...user,
  addresses: [
    ...user.addresses, 
    {
      street: "Random street",
      house: 2
    },
  ],
};

// {
//   name: "John",
//   surname: "Doe",
//   addresses: [
//     { street: "Example street", house: 1 },
//     { street: "Random street", house: 2 }
//   ]
// }
console.log(updatedUser);
```

#### Update nested array item

```javascript
const user = {
  name: "John",
  surname: "Doe",
  addresses: [
    {
      street: "Example street",
      house: 1
    },
    {
      street: "Random street",
      house: 7
    },
  ]
};

const updatedUser = {
  ...user,
  addresses: user.addresses.map(address => {
    if(address.house === 7) {
      return {
        ...address,
        house: 2
      }
    }
    return address;
  })
};

// {
//   name: "John",
//   surname: "Doe",
//   addresses: [
//     { street: "Example street", house: 1 },
//     { street: "Random street", house: 2 }
//   ]
// }
console.log(updatedUser);
```

#### Remove nested array item

```javascript
const user = {
  name: "John",
  surname: "Doe",
  addresses: [
    {
      street: "Example street",
      house: 1
    },
    {
      street: "Random street",
      house: 7
    },
  ]
};

const updatedUser = {
  ...user,
  addresses: user.addresses.filter(address => address.house !== 7),
};

// {
//   name: "John",
//   surname: "Doe",
//   addresses: [
//     { street: "Example street", house: 1 },
//   ]
// }
console.log(updatedUser);
```

## The Most Common Mistake

The most common mistake people make is modifying the original array/object while believing they are doing an update in an immutable way.

In most cases, it results from a poor understanding of what are shallow and deep copies and how they differ:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

// This is a shallow copy
const newUser = {
  ...user,
};

// Don't do that, as it modifies the original object
newUser.other.age = 22;
```

The right way to update the nested property:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  other: {
    age: 18,
  },
};

// This is the proper way to update nested properties
const newUser = {
  // Copy each level
  ...user,
  other: {
    ...user.other,
    age: 22,
  }
};
```

## Summary

In this article we reviewed how to modify Array/Object in an immutable way. 

I remember how difficult it was at first to learn these simple patterns, but after having some practice, everything became clear.

Quick recap:

* Spread operator only makes a shallow copy
* To update nested data, all levels must be copied

Copying all levels results in a lot of code being produced and reduced readability, so there are a lot of tools that make immutable updates much less complicated, such as [immutablejs](https://github.com/facebook/immutable-js/) and [immerjs](https://github.com/immerjs/immer).

Give them a try!