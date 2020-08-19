---
title: Immutable update patterns in JavaScript
tag:
  - JavaScript
metaDescription: "Immutable Update Patterns in JavaScript. Find how to update
  Objects and Arrays in an immutable way by using deep and shallow copies. "
teaser: Teaser
date: 2020-08-20T14:48:31.472Z
---
In this article, we will focus on practical examples of how to modify array/object in an immutable way.

Before we start learning, let's review what shallow and deep copies are and how they differ.

## Shallow copy

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

## Deep copy

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

## Things to remember

* Spread operator (`...`) only does a shallow copy of an object
* Use an external library to create a deep copy, for example **[lodash](https://lodash.com/)**
* `map`/`filter`/`slice`/`concat` return a new array
* `splice` modifies an array

## Array

#### Add #1

```javascript
const users = ["John", "Andrew"];
const cars = ["Volvo", "Nissan"];

const result = [...users, ...cars];

// "John", "Andrew", "Volvo", "Nissan"
console.log(result);
```

#### Add #2

```javascript
const users = ["John", "Andrew"];
const cars = ["Volvo", "Nissan"];

const result = users.concat(cars);

// "John", "Andrew", "Volvo", "Nissan"
console.log(result);
```

#### Remove #1

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

const result = users.filter((user, i) => i !== index);

// "John", "Mary"
console.log(result);
```

#### Remove #2

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

const result = [...users.slice(0, index), ...users.slice(index, 2)];

// "John", "Mary"
console.log(result);
```

#### Update #1

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

#### Update #2

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

const result = [...users.slice(0, index), "Mark", ...users.slice(index + 1)];

// "John", "Mark", "Mary"
console.log(result);
```

## Object

#### Add property

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

#### Remove property

```javascript
const user = {
  name: "John",
  surname: "Doe",
};

const { age, ...rest } = user;

// { name: "John", surname: "Doe" }
console.log(rest);
```

#### Update property

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

#### Add/Update nested property

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

## The most common mistake

The most common mistake people make is modifying the original array/object while thinking they are doing an update in an immutable way.

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

// This the proper way to update nested properties
const newUser = {
  ...user,
  other: {
    ...user.other,
    age: 22,
  }
};
```

## Summary