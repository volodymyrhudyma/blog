---
title: Default vs. Named Export. What is the difference?
tag:
  - JavaScript
popular: false
metaDescription: "Named Exports vs. Default Exports.The differences between both
  approaches: names exports are used to export several values from the module,
  default - only one value."
teaser: Back in the days when JavaScript programs were small pieces of scripts
  that added a little interactivity to websites, there was no need to break the
  code into pieces. Today, JavaScript applications are rapidly growing in
  size...
date: 2020-09-29T20:30:23.187Z
---
Back in the days when JavaScript programs were small pieces of scripts that added a little interactivity to websites, there was no need to break the code into pieces. 

Today, JavaScript applications are rapidly growing in size, prompting programmers to consider providing mechanisms for extracting the code into separate files that can be imported on demand, making the code more maintainable and reusable. 

This is exactly why modules were introduced in ES6 (2015).

## Module in JavaScript

What is a module? A module is just a file.

Take a look at the trivial example of two modules (**user** and **project**):

```javascript
index.html
index.js
modules/
  user.js
  project.js
```

The **user** module encapsulates the logic related to the user, like the retrieval and manipulation of the data, the **project** module manipulates projects.

#### Module file extension

If you are familiar with modules in JavaScript, you may have noticed that some resources recommend `.mjs` extension over the `.js`.

On the Web, the extension does not matter, as long as modules are served with JS MIME type - **text/javascript**.

But the use of the `.mjs` extension brings some advantages:

* It is crystal clear that the file is a module
* It ensures that your files are parsed as modules by **Node.js** and **Babel**

For the sake of simplicity, we will stick with the `.js` extension in this article.

## Named export

After adding first modules containing some functions to an application, there is a need to have a reliable way of accessing them.

First of all, the functions we should have access to should be exported from the file.

The easiest way to export function is to simply add **export** in front of it:

```javascript
// user.js

export const fetchUsers = () => {
  ...
};
```

Basically everything can be exported - **functions**, **var**, **let**, **const** and event **classes**.

The only thing we should remember is that the exported items must be top-level items, you can not export anything within the function, for example.

We can export as many values as we want from a single file:

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

After the functions have been exported, you must import them in order to use.

The easiest way is to use the **import** keyword followed by a list of comma-separated functions that you want to import.

```javascript
import { fetchUsers, transformUsers, getAdminUsers } from "./users";
```

Sometimes a module can export dozens of functions and you can import them all by using an asterisk (**\***):

```javascript
import * as userFunctions from "./users";

// All exported functions are available under "userFunctions"
// Example: "userFunctions.fetchUsers()"
```

This type of import creates a **module object** that grabs all exports and makes them available as members of a **userFunctions** object. 

In this chapter we used named exports - each value in the module has been referred by its name, and this name was also used to refer to it during import.

For named exports there is no limit to the number of values exported from a single file.

## Default export

There is another type of export that is only allowed once per file - **default export**:

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

For default export, it is possible to export only a single value per file.

## Combining both approaches

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

Sometimes, it can happen that the name of the imported function may already be used in your code:

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

In summary, named exports are used to export multiple values. 

During the import, it will be possible to use the same name to refer to the exported value.

Default exports are used to export a single value from the file. 

During the import, the name of the value can be different from the exported one.

It is possible to combine both approaches in a single file.