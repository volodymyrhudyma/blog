---
title: "'yield' expression implicitly results in an 'any' type because its
  containing generator lacks a return-type annotation"
tag:
  - React
promote: false
metaDescription: "Learn two ways to fix the following error: 'yield' expression
  implicitly results in an 'any' type because its containing generator lacks a
  return-type annotation."
teaser: Due to the fact that my article on How To Add Redux Saga With TypeScript
  To The React Application became popular, I have been asked one question
  already a few times. After finishing the tutorial, you expect to have fully
  working application built with the mentioned technologies, but suddenly you
  end up with a strange error in the console...
date: 2021-07-15T20:30:59.459Z
---
Due to the fact that my article on [How To Add Redux Saga With TypeScript To The React Application](/add-redux-saga-with-typescript-to-your-react-application-january-2021/) became popular, I have been asked one question already a few times.

After finishing the tutorial, you expect to have fully working application built with the mentioned technologies, but suddenly you end up with a strange error in the console: **'yield' expression implicitly results in an 'any' type because its containing generator lacks a return-type annotation**:

![TypeScript 4.2 Breaking Changes Error](/img/screenshot-2021-07-14-at-22.33.51.png "TypeScript 4.2 Breaking Changes Error")

Let's find out what does it mean and how can it be fixed.

## A Bit Of History

The article was published on January 4th, 2021 and written a couple of days before and for sure I have double checked the code to make sure that it works fine and no errors are thrown anywhere.

Then how is it possible for the same code to work fine at the beginning of the year and break now?

The reason is simple, however not obvious - **TypeScript version**.

At the beginning of the year, the latest TypeScript version was 4.1 and the whole tutorial was based on it, however in the meantime, TypeScript 4.2 was published (on February 23d, 2021) and it occurred that it has some breaking changes.

Let's dig deeper and find out what has changed.

## Breaking Changes

Apart from providing a bunch of features, TypeScript 4.2 contains breaking changes that may have an impact on your application if it uses generators.

If the value of a **yield** expression is captured, but TypeScript can't figure out what type should be received from the expression (for example, if it isn't contextually typed), it will throw an **implicit any error**, which is exactly the same error we were talking about at the beginning of the article.

Let's see some code examples:

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

In this section we will learn two possible solutions to get rid of the error above.

I would assume that you have completed [my tutorial](/add-redux-saga-with-typescript-to-your-react-application-january-2021/) and seeing an error right after having done that.

An error occurs in the **fetchTodoSaga** which looks the following way:

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

A simple generator function that fetches the data from API and fires an action.

The problem is that TypeScript is unable to figure out the type of the **response** variable, so we need to add it explicitly:

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

So the full function is the following:

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

And voila, an error is gone.

That was the first and the best solution to the problem.

As you remember, there is another one, which is to decrease the TypeScript version back to 4.1:

`yarn upgrade typescript@4.1`

Or:

`yarn add typescript@4.1`

Restart the application and the error is gone as well.

Which solution is better? For sure, the first one, because it is generally not a good idea to decrease versions of installed packages, because you will lack the features accessible with updates.

## Summary

In this article we learned that the following error: **'yield' expression implicitly results in an 'any' type because its containing generator lacks a return-type annotation** happens because of breaking changes in TypeScript 4.2.

We described two ways to quickly get rid of this error and continue development:

* Contextually type the **yield** expression - *recommended one*
* Decrease the TypeScript version to **4.1**

Make sure to proceed with contextual typing, since decreasing versions of installed packages is generally not a good idea.