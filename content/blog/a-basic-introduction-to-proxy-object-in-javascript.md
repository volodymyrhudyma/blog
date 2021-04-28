---
title: A Basic Introduction To Proxy Object In JavaScript
tag:
  - JavaScript
promote: false
metaDescription: Learn Proxy Object in JavaScript that allows various operations
  on a target object to be intercepted and redefined, such as getting or setting
  a property.
shareImage: /img/proxy-object-in-javascript.jpg
teaser: Accessing object properties is a very common operation in JavaScript. In
  some cases, it is extremely useful to perform an action just after the
  property is accessed, but before the result is returned, so that the result
  can be modified on the fly. One of the possible solutions is to create...
date: 2021-04-28T16:31:10.516Z
---
Accessing object properties is a very common operation in JavaScript.

In some cases, it is extremely useful to perform an action just after the property is accessed, but before the result is returned, so that the result can be modified on the fly.

One of the possible solutions is to create and call a custom function that contains some logic around the retrieved property:

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

However, a better solution would be to use Proxy Object in JavaScript, which is designed exactly for this purpose.

## The Proxy Object

The Proxy Object wraps another object and allows to intercept and redefine various operations, such as getting or setting a property, etc:

```javascript
const proxy = new Proxy(target, handler);
```

A **Proxy** is created with two parameters:

* **target** - an object to be wraped
* **handler** - an object that specifies which operations to intercept and how to do so

Consider the following example, where the handler object is empty, so all operations we perform on a Proxy Object will be performed on a Target Object:

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

But this example is kind of useless, so let's intercept the **get** handler and convert the retrieved string to lowercase:

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

So in the above example we used a get trap that contains the following arguments:

* **target** - wrapper object, the one that is passed as the first argument to the Proxy
* **property** - the name of the property that is being accessed

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

One important thing to remember - JavaScript enforces some conditions that must be met when using traps, but we will tie more detailed explanations to the appropriate sections.

## The "Get" Trap

*Can return any value.*

One of the most important and commonly used traps are, of course, get and set.

They are designed to intercept reading and writing object properties.

As we already know, the get trap is executed with the **target** and **property** arguments, which contain information about the target object and the retrieved property, respectively:

```javascript
const handler = {
  get: (target, property) => {
    // ...
  }
};
```

This trap is mostly used for to return a default value when the read value does not exist in the target object:

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

It becomes useful when an object contains translations and returns untranslated text instead of the **undefined** in case the translation is not found.

## The "Set" Trap

*Must return true if setting is successful, false otherwise.*

The set trap is triggered when a property is set on the target object.

It is executed with three arguments: **target**, **handler** and a **value** that represents the value of the property we want to set:

```javascript
const handler = {
  get: (target, property, value) => {
    // ...
  }
};
```

It may be useful to prevent a particular field from being set on an object:

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

*Must return a boolean value.*

The has trap is triggered when **in** operator is used with the following arguments: **target** and **property**:

```javascript
const handler = {
  has: (target, property) => {
    // ...
  }
};
```

We can create a Proxy Object that would allow us to use the **in** operator to check if the specified value exists in the target array:

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

*Must return true if deletion is successful, false otherwise.* 

The deleteProperty trap is triggered with the following arguments: **target** and **property,** when **delete** operator is used:

```javascript
const handler = {
  deleteProperty: (target, property) => {
    // ...
  }
};
```

Let's look at how we can block a property from being deleted:

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

*Must return an enumerable object.*

The ownKeys trap is triggered with only one argument: **target,** if any of the following methods have been called: **Object.getOwnPropertyNames**, **Object.getOwnPropertySymbols, for ... in, Object.keys, Object.values, Object.entries**.

It is only executed with a **target** object:

```javascript
const handler = {
  ownKeys: (target) => {
    // ...
  }
};
```

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

*Can return any value.*

The apply trap is triggered when a wrapped function is invoked.

It executes with the following arguments: **target**, **thisArg** - the value of **this**, **args** - a list of arguments:

```javascript
const handler = {
  apply: (target, thisArg, args) => {
    // ...
  }
};
```

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

*Must return an object.*

The construct trap is triggered when a **new** keyword is used.

It is executed with the following arguments: **target**, **args** - arguments of the constructor, **newTarget** - originally called constructor:

```javascript
const handler = {
  construct: (target, args, newTarget) => {
    // ...
  }
};
```

**Important note:** the construct trap should return an **object**.

In the following example, we don't actually change the arguments passed to the constructor, we just display a log message to make sure the trap is working as we expect it to:

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

*Must return a boolean value.*

The defineProperty trap is triggered when any of the following methods are used: **Object.defineProperty** or **Object.defineProperties**.

> The static method **Object.defineProperty** defines a new property directly on an object, or modifies an existing property on an object, and returns the object:
>
> ```javascript
> // The syntax
> Object.defineProperty(obj, property, descriptor)
>
> // Usage example
> const user = {};
>
> Object.defineProperty(user, 'name', {
>   value: "John",
> });
>
> // Prints "John"
> console.log(user.name);
> ```

It is executed with the following arguments: **target**, **property**, **descriptor** - the descriptor for the property that is being defined or modified:

```javascript
const handler = {
  defineProperty: (target, property, descriptor) => {
    // ...
  }
};
```

In the following example, we use the **Object.defineProperty** method to define a new **nickName** property on a **user** object and trap it to lowercase:

```javascript
const user = {};

const handler = {
  defineProperty: (target, property, descriptor) => {
    target[property] = descriptor.value.toLowerCase();
    return true;
  }
}

const userProxy = new Proxy(user, handler);

const descriptor = { configurable: true, enumerable: true, value: "John" };
Object.defineProperty(userProxy, 'nickName', descriptor);

// Prints {nickName: "john"}
console.log(user);
```

## The "GetOwnPropertyDescriptor" Trap

*Must return an object or undefined.*

The getOwnPropertyDescriptor trap is triggered when one of the following functions is used: **Object.getOwnPropertyDescriptor, for .. in, Object.keys, Object.values** or **Object.entries**.

> The **Object.getOwnPropertyDescriptor** method returns an object describing the configuration of a specific property on a given object:
>
> ```javascript
> // The syntax
> Object.getOwnPropertyDescriptor(obj, property)
>
> // Usage example
> const user = {
>   name: "John",
> };
>
> // { value: "John", writable: true, enumerable: true, configurable: true }
> console.log(Object.getOwnPropertyDescriptor(user, 'name'));
> ```

It is executed with the following arguments: **target** and **property**:

```javascript
const handler = {
  getOwnPropertyDescriptor: (target, property) => {
    // ...
  }
};
```

In the following example we use the **Object.getOwnPropertyDescriptor** method to get a descriptor of a **nickName** property on a **user** object and convert it to lowercase in the trap:

```javascript
const user = {
  nickName: "John"
};

const handler = {
  getOwnPropertyDescriptor: (target, property) => {
    return { configurable: true, enumerable: true, value: target[property].toLowerCase() };
  }
}

const userProxy = new Proxy(user, handler);

// Prints "john"
console.log(Object.getOwnPropertyDescriptor(userProxy, 'nickName').value);
```

## The "PreventExtensions" Trap

*Must return a boolean value.*

The preventExtensions trap is triggered when **Object.preventExtensions** method is used.

> The **Object.preventExtensions** method prevents new properties from ever being added to an object:
>
> ```javascript
> // The syntax
> Object.preventExtensions(obj)
>
> // Usage example
> const user = {
>   name: "John",
> };
>
> Object.preventExtensions(user);
>
> // TypeError: Cannot define property surname, object is not extensible
> Object.defineProperty(user, 'surname', {
>  value: "Doe"
> });
> ```

It is only executed with the **target** argument:

```javascript
const handler = {
  preventExtensions: (target) => {
    // ...
  }
};
```

In the following example we prevent an object from being extensible, the **age** property cannot be added:

```javascript
const user = {
  nickName: "John"
};

const handler = {
  preventExtensions: (target) => {
    Object.preventExtensions(target);
    return true;
  }
}

const userProxy = new Proxy(user, handler);

Object.preventExtensions(userProxy);

// Age is not set, since an object is not extensible
userProxy.age = 18;

// Prints {nickName: "John"}
console.log(user);
```

## The "IsExtensible" Trap

*Must return a boolean value.* 

The isExtensible trap is triggered when **Object.isExtensible** method is used.

> The **Object.isExtensible** method determines if an object is extensible (whether it can have new properties added to it):
>
> ```javascript
> // The syntax
> Object.isExtensible(obj)
>
> // Usage example
> const user = {
>   name: "John",
> };
>
> Object.preventExtensions(user);
>
> // Prints "false"
> console.log(Object.isExtensible(user));
> ```

It is only executed with the **target** argument:

```javascript
const handler = {
  isExtensible: (target) => {
    // ...
  }
};
```

The following example illustrates a very basic usage example, we prevent an object from being extensible and return false from the trap:

```javascript
const user = {
  nickName: "John"
};

const handler = {
  isExtensible: (target) => {
    Object.preventExtensions(target);
    return false;
  }
}

const userProxy = new Proxy(user, handler);

// Prints "false"
console.log(Object.isExtensible(userProxy));
```

## The "GetPrototypeOf" Trap

*Must return an object or null.*

The getPrototypeOf trap is triggered when **Object.getPrototypeOf** method is used.

> The **Object.getPrototypeOf** method returns the prototype (the value of the internal **\[[Prototype]]** property) of the specified object:
>
> ```javascript
> // The syntax
> Object.getPrototypeOf(obj)
>
> // Usage example
> const userPrototype = {
>   name: "John",
> };
>
> const user = Object.create(userPrototype);
>
> // Prints "true"
> console.log(Object.getPrototypeOf(user) === userPrototype);
> ```

It is only executed with the **target** argument:

```javascript
const handler = {
  getPrototypeOf: (target) => {
    // ...
  }
};
```

In the following example, we have created a prototype of the **user** object and returned it from the trap:

```javascript
const user = {
  nickName: "John",
};

const userPrototype = Object.create(user);

const handler = {
  getPrototypeOf: (target) => {
    return userPrototype;
  }
}

const userProxy = new Proxy(user, handler);

// Prints "true"
console.log(Object.getPrototypeOf(userProxy) === userPrototype);
```

## The "SetPrototypeOf" Trap

*Must return true if prototype has successfully been changed, false otherwise.*

The setPrototypeOf trap is triggered when **Object.setPrototypeOf** method is used.

> The **Object.setPrototypeOf** method sets the prototype (i.e., the internal **\[[Prototype]]** property) of a specified object to another object or null:
>
> ```javascript
> // The syntax
> Object.setPrototypeOf(obj, prototype)
>
> // Usage example
> const user = {
>   name: "John",
> };
>
> const userPrototype = {
>   surname: "Doe",
> };
>
> Object.setPrototypeOf(user, userPrototype);
>
> // Prints "true"
> console.log(Object.getPrototypeOf(user) === userPrototype);
> ```

It is executed with the arguments **target** and **prototype**. The latter contains the new prototype of the target object or null:

```javascript
const handler = {
  setPrototypeOf: (target) => {
    // ...
  }
};
```

In the following example, we disallowed setting a new prototype for the **userProxy** object by returning **false** from the trap:

```javascript
const user = {
  nickName: "John",
};

const handler = {
  setPrototypeOf: (target, prototype) => {
    return false;
  }
}

const userProxy = new Proxy(user, handler);

// TypeError: "setPrototypeOf" on proxy: trap returned falsish for property "undefined"
console.log(Object.setPrototypeOf(userProxy, user));
```

## Proxy Limitations

Aside from providing a simple and reliable way to intercept objects, proxy has its own limitations. 

For example, to make it work with built-in objects like **Map**, **Set**, **Date**, etc, we need to do some extra magic, a simple example like this won't work:

```javascript
const users = new Map();

const handler = {};

const usersProxy = new Proxy(users, handler);

// TypeError: Method Map.prototype.set called on incompatible receiver [object Object]
usersProxy.set("user1", "John");
```

To learn how to fix the above example and some more limitations, read [this article](https://javascript.info/proxy#proxy-limitations).

## Summary

The Proxy Object wraps another object and allows to intercept and redefine different operations.

We can intercept many operations, like:

* Reading a property
* Setting a property
* Deleting a property
* And many more, see the full list at the beginning of an article

The interception is useful if we want to perform any kind of an action after the operation has started, but before the result is returned.

This is very interesting concept that developers should definitely learn more about and use whenever applicable.

In my personal experience, I have almost never worked with a projects that used Proxy objects, however they could have benefited a lot from them.