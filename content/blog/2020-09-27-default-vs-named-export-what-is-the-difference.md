---
title: Default vs. Named Export. What is the difference?
tag:
  - JavaScript
popular: false
metaDescription: "Named Exports vs. Default Exports.The differences between both
  approaches: names exports are used to export several values from the module,
  default - only one value."
teaser: // TEASERR
date: 2020-09-29T20:30:23.187Z
---
## Module in JavaScript

In recent years, JavaScript applications rapidly grew in size, which made the coders start thinking about providing mechanisms to split JavaScript programs up into separate modules that can be imported on-demand.

Take a look at the trivial example of two modules (**user** and **project**):

```javascript
index.html
index.js
modules/
  user.js
  project.js
```

The **user** module encapsulates the logic related to the user, like fetching and manipulating the data, the **project** module manipulates projects.

#### Module file extension

If you are familiar with modules in JavaScript, you may have noticed that some resources recommend `.mjs` extension over the `.js`.

On the Web, the extension does not matter, as long as modules are served with JS MIME type - **text/javascript**.

But using `.mjs` extension brings some benefits:

* It is crystal clear that the file is a module
* It ensures that your files are parsed as modules by **Node.js** and **Babel**

For simplicity sake, we will stick with `.js` extension throughout this article.

## Named export

After configuring the application to use modules and adding some functions to the module files, there is a need to have a reliable way of accessing them.

To begin with, the functions we should have access to should be exported from the file.

The easiest way to export function is to just add **export** in front of it:

```javascript
// user.js

export const fetchUsers = () => {
  ...
};
```

Basically, everything can be exported - **functions**, **var**, **let**, **const** and event **classes**.

The only thing we should remember is that exported items need to be top-level items, you can not export something inside of the function.

We can export as many items as we want from a single file:

```javascript
// user.js

export const fetchUsers = () => {
  ...
};

export const transformUsers = () => {
  ...
};
  
export const getAdminUsers = () => {
  ...
};
```

A more convenient way is to combine all exports at the end of the file:

```javascript
// user.js

const fetchUsers = () => {
  ...
};

const transformUsers = () => {
  ...
};
  
const getAdminUsers = () => {
  ...
};
  
export { fetchUsers, transformUsers, getAdminUsers };
```

Once the functions were exported, you need to import them in order to be able to use.

The simplest way is to use the **import** keyword followed by a list of comma-separated functions you want to import.

```javascript
import { fetchUsers, transformUsers, getAdminUsers } from "./users";
```

Sometimes, one module can export dozens of functions and you can import all of them by using an asterisk (**\***):

```javascript
import * as userFunctions from "./users";

// All exported functions are available under "userFunctions"
// Example: "userFunctions.fetchUsers()"
```

This way of importing creates a **module object** that grabs all exports and makes them available as members of an object **userFunctions**. 

In this chapter, we used named exports - each item in the module has been referred by its name, and this name was used to refer to it on import as well.

With named exports, there is no limit on the number of exported items from a single file.

## Default export

There is another type of export, that is allowed only one per file - **default export**:

```javascript
// project.js

export default () => {
  ...
};
```

Or alternative syntax:

```javascript
// project.js

const fetchProjects = () => {
  ...
};
  
export default fetchProjects;
```

To import the function that was exported using the default export:

```javascript
// The naming is completely independent
// We can use any name we like
import fetchProjects from "./projects";

// OR
import anyNameWeLike from "./projects";


```

## Using both

It is also possible to combine both approaches in the single file:

```javascript
// user.js

const fetchUsers = () => {
  ...
};

export const transformUsers = () => {
  ...
};
  
export const getAdminUsers = () => {
  ...
};
  
export { transformUsers, getAdminUsers };
export default fetchUsers;
```

Import statement:

```javascript
import fetchUsers, { transformUsers, getAdminUsers } from "./users";
```

## Renaming imported function

Sometimes, especially when using external libraries, it can happen that the name of the imported function is already used in your code:

```javascript
import { isObject } from "./lodash";

// SyntaxError: Identifier "isObject" has already been declared
const isObject = () => {
  ...
};
```

The solution is to rename the import by using **as** keyword followed by the new function name:

```javascript
import { isObject as lodashIsObject } from "./lodash";

// OK
const isObject = () => {
  ...
};
```

**Important note:** exports can be renamed as well:

```javascript
export { function1 as fn1, function2 as fn2 };
```

## Summary

In summary, named exports are used to export several values. 

During the import, it will be possible to use the same name to refer to the exported value.

Default exports are used to export a single value from the file. 

During the import, the name of the value can be different from the exported one.

It is possible to combine both approaches in a single file.