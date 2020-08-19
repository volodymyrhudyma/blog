---
title: Immutable update patterns in JavaScript
tag:
  - JavaScript
metaDescription: Meta
teaser: Teaser
date: 2020-08-20T14:48:31.472Z
---
## Array

#### Add #1

```javascript
const users = ["John", "Andrew"];
const cars = ["Volvo", "Nissan"];

// "John", "Andrew", "Volvo", "Nissan"
const result = [...users, ...cars];
```

#### Add #2

```javascript
const users = ["John", "Andrew"];
const cars = ["Volvo", "Nissan"];

// "John", "Andrew", "Volvo", "Nissan"
const result = users.concat(cars);
```

#### Remove #1

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

// "John", "Mary"
const result = users.filter((user, i) => i !== index);
```

#### Remove #2

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

// "John", "Mary"
const result = [...users.slice(0, index), ...users.slice(index, 2)];
```

#### Update #1

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

// "John", "Mark", "Mary"
const result = users.map((user, i) => {
  if(i === index) {
    return "Mark";
  }
  return user;
});
```

#### Update #2

```javascript
const users = ["John", "Andrew", "Mary"];
const index = 1;

// "John", "Mark", "Mary"
const result = [...users.slice(0, index), "Mark", ...users.slice(index + 1)];
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

## Common mistakes

## Summary