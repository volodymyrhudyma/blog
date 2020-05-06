---
title: JavaScript built-in array methods
date: 2020-05-05T15:41:23.309Z
---
In the [previous article](/2020-05-04-arrays-in-javascript/) we had a brief introduction to arrays in JavaScript. Today we are going to explore all built-in array methods that are available for a use by default. We'll start from the most used ones.

**Important note:** all examples will contain fat arrow functions instead of function declarations or function expressions:

```javascript
// Function expression
const multiply = function(x, y) {
  return x * y;
};

// Function declaration
function multiply(x, y) {
  return x * y;
};

// Fat arrow function
const multiply = (x, y) => {
  return x * y;
}

// Shorthand 
const multiply = (x, y) => x * y;
```

#### filter

Creates a new array with all elements that satisfy given condition:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Return numbers greater than 5
const filteredNumbers = numbers.filter(number => number > 5);

console.log(filteredNumbers); // Prints [8, 10]
```

#### map

Creates a new array with the result of calling function for each element:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Multiply each number by 2
const mappedNumbers = numbers.map(number => number * 2);

console.log(mappedNumbers); // Prints [0, 2, 4, 10, 16, 20]
```

#### find

Returns the value of the first element in an array that meets given condition:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Find the first number smaller than 5
const result = numbers.find(number => number < 5);

console.log(result); // Prints 0
```

**Important note:** remember, that `find` returns the first found element, in order to return all elements that meet the criteria, use `filter` method.

#### reduce

Reduces an array to a single value(going left-to-right):

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Find the sum of numbers array
const sum = numbers.reduce((accumulator, item) => accumulator + item);

console.log(sum); // Prints "26"
```

**Important note:** in order to reduce array to a single value going from right-to-left you can use `reduceRight` function.

#### push

Adds new elements to the end of an array and returns new length of an array:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const newLength = numbers.push(20);

console.log(newLength); // Prints "7"

console.log(numbers); // Prints "[0, 1, 2, 5, 8, 10, 20]"
```

#### pop

Removes last element of an array and returns it:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const removedNumber = numbers.pop();

console.log(removedNumber); // Prints "10"

console.log(numbers); // Prints "[ 0, 1, 2, 5, 8 ]"
```

#### unshift

Adds element to the beginning of an array and returns the new length:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const newLength = numbers.unshift(20);

console.log(newLength); // Prints "7"

console.log(numbers); // Prints "[20, 0, 1, 2, 5, 8, 10]"
```

#### shift

Removes the first element of an array and returns that element:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const removedNumber = numbers.shift();

console.log(removedNumber); // Prints "0"

console.log(numbers); // Prints "[ 1, 2, 5, 8, 10 ]"
```

#### includes

Checks if an array contains specified element:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const result = numbers.includes(10);

console.log(result); // Prints "true"
```

#### splice

Removes elements from an array and returns deleted elements:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Remove 2 elemnts, starting from index 0
const deletedElements = numbers.splice(0, 2);

console.log(deletedElements); // Prints "[0, 1]"

console.log(numbers); // Prints "[2, 5, 8, 10]"
```

Adds elements to an array and returns deleted elements(if some were deleted) or empty array(if no elements were deleted):

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Add 2 elements starting from index 0, do not delete anything
const deletedElements = numbers.splice(0, 0, 60, 80);

console.log(deletedElements); // Prints "[]" as no elements were deleted

console.log(numbers); // Prints "[60, 80, 0, 1, 2, 5, 8, 10]"
```

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Add 2 elements starting from index 0, delete 6 items
const deletedElements = numbers.splice(0, 6, 60, 80);

console.log(deletedElements); // Prins "[0, 1, 2, 5, 8, 10]" as those were deleted

console.log(numbers); // Prints "[60, 80, 0, 1, 2, 5, 8, 10]"
```

#### forEach

Calls a function for each element of an array:

```javascript
const numbers = [10, 20, 30];

numbers.forEach((number, index) => {
  console.log(index, number); // Prints "0" "10", "1" "20", "2" "30"
})
```

#### indexOf

Searches for an element and returns its position or `-1` if not found(goes from left-to-right):

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Search for "5"
const index = numbers.indexOf(5);

console.log(index); // Prints "3"
```

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Search for "100"
const index = numbers.indexOf(100);

console.log(index); // Prints "-1"
```

**Important note:** in order search for an element going from right-to-left you can use `lastIndexOf` function.

#### concat

Joins two or more arrays and returns a copy of them:

```javascript
const smallNumbers = [0, 1, 2];

const mediumNumbers = [10, 20, 30];

const bigNumbers = [100, 200, 300];

const result = smallNumbers.concat(mediumNumbers, bigNumbers);

console.log(result); // Prints "[0, 1, 2, 10, 20, 30, 100, 200, 300]"
```

#### sort

Sorts elements of an array

```javascript
const numbers = [2, 0, 1];

// By default sorts numbers in ascending order
numbers.sort();

console.log(numbers); // Prints "[0, 1, 2]"
```

```javascript
const chars = ["b", "w", "a"];

chars.sort();

console.log(chars); // Prints ["a", "b", "w"]
```

**Important note:** The sort order can be either alphabetic or numeric, and either ascending (up) or descending (down). By default, `sort` method sorts the values as strings in alphabetical and ascending order. You can provide compare function to change sort order:

```javascript
const numbers = [40, 100, 1, 5, 25, 10];

// Sort in descending order
numbers.sort((a, b) => b - a);

console.log(numbers); // Prints "[100, 40, 25, 10, 5, 1]"
```

#### reverse

Reverses the order of elements in an array:

```javascript
const numbers = [0, 1, 2, 3, 5];

numbers.reverse();

console.log(numbers); // Prints "[5, 3, 2, 1, 0]"
```

#### slice

Returns new array as a part of original one, sliced using given condition:

```javascript
const numbers = [0, 1, 2, 3, 5];

// Slice 2 elemnts, starting from index 0
const result = numbers.slice(0, 2);

console.log(result); // Prints "[0, 1]"
```

#### join

Joins all array elements into a string:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const result = numbers.join();

console.log(result); // Prints "0,1,2,5,8,10"
```

**Important note:** you can pass the separator as the only argument of `join` function and the elements will be separated by it. The default separator is comma (`,`).

#### keys

Returns `Array iterator object`, containing keys of the original array:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const keys = numbers.keys();

console.log(keys); // Prints "Object [Array Iterator] {}"
```

**Important note:** to access each key, just iterate through returned value:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const keys = numbers.keys();

for (const key of keys) {
  console.log(key); // Prints "0", "1", "2", "3", "4", "5"
}
```

#### toString

Converts an array to string and returns the result:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

const result = numbers.toString();

console.log(result); // Prints "0,1,2,5,8,10"
```

#### isArray

Checks if an object is an array. Returns `true` if array, `false` if not:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

console.log(Array.isArray(numbers)); // Prints "true"
```

#### some

Checks if any of array elements meet the specified criteria. Returns `true` if finds at least one match, otherwise returns `false`:

```javascript
const numbers = [0, 1, 2, 5, 8, 10];

// Check if at least one array element equals 5
const result = numbers.some(number => number === 5);

console.log(result); // Prints "true"
```

#### every

Checks if every element in an array meets the specified criteria:

```javascript
const numbers = [5, 5, 5];

// Check if every item in array is equal to 5
const result = numbers.every(number => number === 5);

console.log(result); // Prints "true"
```

#### entries

Returns key/value pair Array Iteration Object:

```javascript
const array = ["John", "Andrew", "Mike"];

const entries = array.entries();
 
for(const entry of entries) {
  console.log(entry); // Prints [0, "John"], [1, "Andrew"], [2, "Mike"]
}
```

#### fill

Fills elements in an array with a static value:

```javascript
const numbers = [0, 1, 2];

numbers.fill(10);

console.log(numbers); // Prints "[10, 10, 10]"
```

**Important note:** you can specify start and end position of an elements which should be filled. If not specified, all elements will be filled:

```javascript
const numbers = [0, 1, 2, 3, 5, 8];

// Start from 2-nd and fill till the 6-th element
numbers.fill(10, 2, 6);

console.log(numbers); // Prints "[0, 1, 10, 10, 10, 10]"
```

#### from

Creates an array from any object with a length property or an iterable object:

```javascript
const letters = Array.from('abcd');

console.log(letters); // Prints ["a", "b", "c", "d"]
```

#### valueOf

It is a default method of the Array that returns all the items in the same array: 

```javascript
const numbers = [0, 1, 2, 3, 5, 8]

const result = numbers.valueOf();

console.log(result); // Prints "[0, 1, 2, 3, 5, 8]"
```

#### findIndex

Returns the index of the first element in an array that meets the specified criteria or `-1`:

```javascript
const numbers = [0, 1, 2, 3, 5, 8]

const result = numbers.findIndex(item => item === 5);

console.log(result); // Prints "4"
```

#### copyWithin

Copies array elements within the array, to and from specified positions:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// insert position, start position, end position)
numbers.copyWithin(3, 1, 3);

console.log(numbers); // Prints "[1, 2, 3, 2, 3, 6, 7, 8]"
```

## Conclusion

We have just covered basic built-in array methods, so you should understand how they work and how to get use of them.

It's not necessary to learn them by heart, you can always refer to documentation in order to find some implementation details.