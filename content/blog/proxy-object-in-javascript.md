---
title: Proxy Object In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: // META
teaser: Accessing object properties is a very common operation in JavaScript. In
  some cases, it is extremely useful to perform an action just after the
  property has been accessed, but before the result is returned, so the result
  can be modified on fly. One of the possible solutions is to create...
date: 2021-04-28T16:31:10.516Z
---
Accessing object properties is a very common operation in JavaScript.

In some cases, it is extremely useful to perform an action just after the property has been accessed, but before the result is returned, so the result can be modified on fly.

One of the possible solutions is to create and invoke a custom function that would contain some logic around retrieved property:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const getName = () => {
  return user.name.toLowerCase();
};

const name = getName();

// Prints "john"
console.log(name);
```

 But a better solution would be to use Proxy Object in JavaScript, which is designed exactly for this purpose.

## The Proxy Object

The Proxy Object wraps another object and allows to intercept and redefine different operations, like retrieving/setting a property, etc:

```javascript
const proxy = new Proxy(target, handler);
```

A **Proxy** is created with two parameters:

* **target** - an object to wrap
* **handler** - an object that specifies what operations should be intercepted and how it should be done

Consider the following example, where the handler object is empty, so all operations we perform on a Proxy Object are performed on a Target Object:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const handler = {};

const userProxy = new Proxy(user, handler);

// Prints "John"
console.log(userProxy.name);

// Prints "Doe"
console.log(userProxy.surname);

userProxy.street = "Example Street";

// Prints "Example Street"
console.log(userProxy.street);

// Prints "Example Street"
// Target object is modified
console.log(user.street);
```

But that example is kinda useless, so let's intercept the **get** handler and convert the retrieved string to lowercase:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const handler = {
  get: (target, property) => {
    return target[property].toLowerCase();
  }
};

const userProxy = new Proxy(user, handler);

// Prints "john"
console.log(userProxy.name);

// Prints "doe"
console.log(userProxy.surname);
```

Handlers are also called **traps**, because they also trap calls to the target object.

So in the above example we used a get trap, which contains the following arguments:

* **target** - wrapper object, the one that is passed as a first argument to the Proxy
* **property** - the name of the accessed property

## Traps

All Proxy traps, listed in the [specification](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots) and when they are triggered:

* **get** - reading a property
* **set** - setting a property
* **has** - using **in** operator
* **deleteProperty** - using **delete** operator
* **ownKeys** - using one of the following: **Object.getOwnPropertyNames**, **Object.getOwnPropertySymbols, for ... in, Object.keys, Object.values, Object.entries**
* **apply** - calling a function
* **construct** - using **new** operator
* **defineProperty** - using one of the following: **Object.defineProperty, Object.defineProperties**
* **getOwnPropertyDescriptor** - using one of the following: **Object.getOwnPropertyDescriptor, for .. in, Object.keys, Object.values, Object.entries**
* **preventExtensions** - using **Object.preventExtensions**
* **isExtensible** - using **Object.isExtensible**
* **getPrototypeOf** - using **Object.getPrototypeOf**
* **setPrototypeOf** - using **Object.setPrototypeOf**

One important thing to remember - JavaScript enforces some conditions to be fulfilled when using traps, but we will tie more detailed explanations to the corresponding sections.

## The "Get" Trap

One of the most important and commonly used traps are, of course, get and set.

They are designed for intercepting reading and writing object properties.

As we already know, the get trap is executed with the **target** and **property** arguments, which contain information about the target object and the retrieved property respectively:

```javascript
const handler = {
  get: (target, property) => {
    // ...
  }
};
```

This trap is mostly used for returning a default value if the read value does not exist in the target object:

```javascript
const user = {};

const handler = {
  get: (target, property) => {
    return target[property] || "Unknown";
  },
};

const userProxy = new Proxy(user, handler);

// Prints "Unknown"
console.log(userProxy.name);
```

It becomes useful when an object contains translations and in case if the translation is not found, return untranslated text instead of the **undefined**.

## The "Set" Trap

The set trap is triggered when a property is being set on the target object:

```javascript
const handler = {
  get: (target, property, value) => {
    // ...
  }
};
```

It is executed with three arguments: **target**, **handler** and a **value**, which represents the value of the property we want to set.

**Important note:** the set trap should return **true** if setting is successful, otherwise - **false**.

It might be useful to prevent setting specific field on an object:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const handler = {
  set: (target, property, value) => {
    if(property === 'age') {
      return false;
    }
    target[property] = value;
    return true;
  }
};

const userProxy = new Proxy(user, handler);

userProxy.name = "Andrew";
userProxy.surname = "Hopkins";

// "Age" will not be updated
userProxy.age = 20;

// { name: "Andrew", surname: "Hopkins", age: 18 }
console.log(user);

// { name: "Andrew", surname: "Hopkins", age: 18 }
console.log(userProxy);
```

## The "Has" Trap

The has trap is triggered when **in** operator is used with the following arguments: **target** and **property**:

```javascript
const handler = {
  has: (target, property) => {
    // ...
  }
};
```

**Important note:** the has trap should return a boolean value.

We can create a Proxy Object that would allow us to use **in** operator for checking if the given value is present in the target array:

```javascript
const users = ["John", "Andrew", "Michael"];

const handler = {
  has: (target, property) => {
    return target.includes(property)
  }
};

const userProxy = new Proxy(users, handler);

// Prints "true"
console.log("John" in userProxy);

// Prints "false"
console.log("Unknown" in userProxy);
```

## The "DeleteProperty" Trap

The has trap is triggered with the following arguments: **target** and **property,** when **delete** operator is used:

```javascript
const handler = {
  deleteProperty: (target, property) => {
    // ...
  }
};
```

**Important note:** the deleteProperty trap should return **true** if deleting is successful, otherwise - **false**.

Let's see how we can block a property from being deleted:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const handler = {
  deleteProperty: (target, property) => {
    if(property === 'age') {
      return false;
    }
    delete target[property];
    return true;
  }
};

const userProxy = new Proxy(user, handler);

delete userProxy.name;
delete userProxy.surname;

// Would not be deleted
delete userProxy.age;

// Prints "{ age: 18 }"
console.log(user);

// Prints "{ age: 18 }"
console.log(userProxy);
```

## The "OwnKeys" Trap

The ownKeys trap is triggered with only one argument: **target,** when one of the following methods was invoked: **Object.getOwnPropertyNames**, **Object.getOwnPropertySymbols, for ... in, Object.keys, Object.values, Object.entries**.

It executes only with a **target** object:

```javascript
const handler = {
  ownKeys: (target) => {
    // ...
  }
};
```

**Important note:** the ownKeys trap should return an **array**.

It can be used to exclude some properties when iterating the target object:

```javascript
const user = {
  name: "John",
  surname: "Doe",
  age: 18,
};

const handler = {
  ownKeys: (target) => {
    return Object.keys(target).filter(key => key !== "age");
  }
};

const userProxy = new Proxy(user, handler);

const keys = [];
for(const key in userProxy) {
  keys.push(key);
}

// Prints: ["name", "surname"]
console.log(keys);
```

## The "Apply" Trap

The apply trap is triggered when a wrapped function is invoked.

It executes with the following arguments: **target**, **thisArg** - the value of **this**, **args** - a list of arguments:

```javascript
const handler = {
  apply: (target, thisArg, args) => {
    // ...
  }
};
```

**Important note:** the apply trap can return **any** value.

In the following example we get the result of executing the target function and multiply it by 2:

```javascript
const sum = (x, y) => {
  return x + y;
}

const handler = {
  apply: (target, thisArg, args) => {
    return target(args[0], args[1]) * 2;
  }
};

const sumProxy = new Proxy(sum, handler);

// Prints "3"
console.log(sum(1, 2));

// Prints "6"
console.log(sumProxy(1, 2));
```

## The "Construct" Trap

The construct trap is triggered when a **new** keyword is used.

It executes with the following arguments: **target**, **args** - arguments of the constructor, **newTarget** - originally called constructor:

```javascript
const handler = {
  construct: (target, args, newTarget) => {
    // ...
  }
};
```

**Important note:** the construct trap should return an **object**.

In the following example we don't really modify arguments passed to the constructor, but just display a log message to ensure that the trap works as we expect it to:

```javascript
function Cat(name, age) {
  this.name = name;
  this.age = age;
}

const handler = {
  construct(target, args) {
    console.log('Cat constructor is called');
    return new target(...args);
  }
};

const CatProxy = new Proxy(Cat, handler);

// Prints "Cat constructor is called"
const friend = new CatProxy("Barsik", 1);

// Prints "Barsik"
console.log(friend.name);

// Prints "1"
console.log(friend.age);
```

## The "DefineProperty" Trap

The defineProperty trap is triggered when one of the following is used: **Object.defineProperty** or **Object.defineProperties**.

It executes with the following arguments: **target**, **property**, **descriptor** - the descriptor for the property being defined or modified:

```javascript
const handler = {
  defineProperty: (target, property, descriptor) => {
    // ...
  }
};
```

**Important note:** the defineProperty trap should return a boolean.

// TODO example

## The "GetOwnPropertyDescriptor" Trap

## The "PreventExtensions" Trap

## The "IsExtensible" Trap

## The "GetPrototypeOf" Trap

## The "SetPrototypeOf" Trap

## Summary