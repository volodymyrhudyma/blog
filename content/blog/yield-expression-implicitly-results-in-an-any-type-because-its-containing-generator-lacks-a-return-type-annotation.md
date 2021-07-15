---
title: "Error: 'yield' expression implicitly results in an 'any' type because
  its containing generator lacks a return-type annotation"
tag:
  - React
promote: false
metaDescription: "Learn two ways to fix the following error: 'yield' expression
  implicitly results in an 'any' type because its containing generator lacks a
  return-type annotation."
shareImage: /img/typescript-error.jpg
teaser: Due to the fact that my article on How To Add Redux Saga With TypeScript
  To The React Application became popular, I've been asked one question a few
  times already. After finishing the tutorial, you expect to have built a fully
  working application using the mentioned technologies, but suddenly you end up
  with a...
date: 2021-07-15T20:30:59.459Z
---
Due to the fact that my article on [How To Add Redux Saga With TypeScript To The React Application](/add-redux-saga-with-typescript-to-your-react-application-january-2021/) became popular, I've been asked one question a few times already.

After finishing the tutorial, you expect to have built a fully working application using the mentioned technologies, but suddenly you end up with a strange error in the console: **'yield' expression implicitly results in an 'any' type because its containing generator lacks a return-type annotation**:

![TypeScript 4.2 Breaking Changes Error](/img/screenshot-2021-07-14-at-22.33.51.png "TypeScript 4.2 Breaking Changes Error")

Let's find out what it means and how to fix it.

## A Bit Of History

The article was published on January 4, 2021 and written a couple of days before. 

I always double check all code to make sure it works properly and there are no errors anywhere.

So how is it possible that the same code works fine at the beginning of the year and breaks now?

The reason is simple, but not obvious - **TypeScript version**.

At the beginning of the year the latest TypeScript version was 4.1 and the whole tutorial was based on it, but in the meantime TypeScript 4.2 was released (on February 23, 2021) and it occurred that it has some breaking changes.

Let's dig deeper and find out what has changed.

## Breaking Changes

TypeScript 4.2 not only adds a number of features, but also includes changes that may affect your application when it uses generators.

If the value of a **yield** expression is captured, but TypeScript can't figure out what type to receive from the expression (for example, if it isn't contextually typed), it will throw an **implicit any error**, which is the exact same error we talked about at the beginning of the article.

Let's look at some code examples:

```typescript
/* 
   Error!
   'yield' expression implicitly results in an 'any' type
   because its containing generator lacks a return-type annotation
*/
function* generator1() {
  const result = yield 1;
}

/*
  No Error!
  The result of `yield 1` is unused
*/
function* generator2() {
  yield 1;
}

/*
  No Error!
  'yield 1' is contextually typed by 'string'
*/
function* generator3() {
  const result: string = yield 1;
}

/* 
  No Error!
  TypeScript can figure out the type of 'yield 1'
  from the explicit return type of 'generator4'
*/
function* generator4(): Generator<number, void, string> {
  const result = yield 1;
}
```

Here is the corresponding [Pull Request](https://github.com/microsoft/TypeScript/pull/41348) in the TypeScript Github repository.

## Possible Solutions

In this section we will learn two possible solutions to get rid of the above error.

I assume that you have completed [my tutorial](/add-redux-saga-with-typescript-to-your-react-application-january-2021/) and see an error right after.

An error occurs in the **fetchTodoSaga** that looks like this:

```typescript
function* fetchTodoSaga() {
  try {
    const response = yield call(getTodos);
    yield put(
      fetchTodoSuccess({
        todos: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchTodoFailure({
        error: e.message,
      })
    );
  }
};
```

A simple generator function that retrieves the data from the API and triggers an action.

The problem is that TypeScript is not able to figure out the type of the **response** variable, so we have to add it explicitly:

```typescript
function* fetchTodoSaga() {
  try {
    const response: AxiosResponse<ITodo[]> = yield call(getTodos);
    // ..
  } catch (e) {
    // ..
  }
};
```

The complete function, then, is as follows:

```typescript
function* fetchTodoSaga() {
  try {
    const response: AxiosResponse<ITodo[]> = yield call(getTodos);
    yield put(
      fetchTodoSuccess({
        todos: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchTodoFailure({
        error: e.message,
      })
    );
  }
};
```

And voila, an error has disappeared.

That was the first and the best solution to the problem.

As you remember, there is another one, which is to decrease the TypeScript version back to 4.1:

`yarn upgrade typescript@4.1`

Or:

`yarn add typescript@4.1`

Restart the application and the error is also gone.

Which solution is better? Certainly the first, because it is generally not a good idea to decrease versions of installed packages, because you will miss the features accessible with updates.

## Summary

In this article we have learned that the following error: **'yield' expression implicitly results in an 'any' type because its containing generator lacks a return-type annotation** happens due to breaking changes in TypeScript 4.2.

We have described two ways to quickly fix this error and continue development:

* Contextually type the **yield** expression - *recommended one*
* Decrease the TypeScript version to **4.1**

Be sure to proceed with contextual typing, as decreasing versions of installed packages is generally not a good idea.