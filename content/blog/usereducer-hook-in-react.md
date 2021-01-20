---
title: The useReducer Hook In React
tag:
  - React
promote: false
metaDescription: Learn about the useReducer hook in React, which is responsible
  for updating state in a sophisticated way, and the differences between
  useReducer, useState, and Redux.
teaser: One of the keys to getting good at React is mastering its most difficult
  part - state management. State is used for everything, from storing user input
  to reading and displaying data from external systems. There are many tools
  available that are designed to simplify state management in React, however...
date: 2021-01-20T18:52:31.212Z
---
One of the keys to getting good at React is mastering its most difficult part - state management.

State is used for everything, from storing user input to reading and displaying data from external systems.

There are many tools available that are designed to simplify state management in React, however, using them is not always the best choice.

Smaller applications usually suffer from adding complexity by installing redundant libraries instead of using the tools provided by React itself.

We all probably know one of the most popular React hooks - **useState**, which allows you to save and update the state of the component.

But what if the state is a complex object with many nested properties, whose next state may depend on the previous one? Is there an alternative for better managing of the state?

## An Example With "useState"

To better understand the problem, let's create a simple application that allows users to manage their ongoing / completed projects (with the **useState** hook).

Before we get our hands dirty with the code, let's define all the necessary typescript interfaces:

```typescript
// Project entity that contains only "id" and "name"
interface IProject {
  id: number;
  name: string;
}

// Complex state that contains user's "details" and "projects"
interface IState {
  details: {
    name: string;
    surname: string;
  };
  projects: {
    ongoing: IProject[];
    completed: IProject[];
  };
}
```

The next step is to create an initial state, which is reflected by the **IState** interface:

```typescript
const initialState: IState = {
  details: {
    name: "John",
    surname: "Doe",
  },
  projects: {
    ongoing: [
      {
        id: 1,
        name: "Blog",
      },
      {
        id: 2,
        name: "Chatbot",
      },
      {
        id: 3,
        name: "Startup",
      },
    ],
    completed: [
      {
        id: 4,
        name: "University Project",
      },
    ],
  },
};
```

As you can see, the user has three ongoing and one completed project. 

Our goal is to create a component for managing them:

```tsx
const App = () => {
  const [state, setState] = useState(initialState);

  // Move the project from "ongoing" to "completed"
  const handleCompleteProject = (projectToComplete: IProject) => {
    setState({
      ...state,
      projects: {
        ...state.projects,
        ongoing: state.projects.ongoing.filter(
          (project) => project.id !== projectToComplete.id
        ),
        completed: [...state.projects.completed, projectToComplete],
      },
    });
  };

  // Move the project from "completed" to "ongoing"
  const handleRevertProject = (projectToRevert: IProject) => {
    setState({
      ...state,
      projects: {
        ...state.projects,
        completed: state.projects.completed.filter(
          (project) => project.id !== projectToRevert.id
        ),
        ongoing: [...state.projects.ongoing, projectToRevert],
      },
    });
  };

  return (
    <div>
      <h2>
        Hello, {state.details.name} {state.details.surname}
      </h2>
      <div>Let's see what you have here</div>
      <h2>Ongoing projects</h2>
      {state.projects.ongoing.map((project) => (
        <div key={project.id}>
          {project.name}
          <button
            onClick={() => handleCompleteProject(project)}
          >
            +
          </button>
        </div>
      ))}
      <h2>Completed projects</h2>
      {state.projects.completed.map((project) => (
        <div key={project.id}>
          {project.name}
          <button
            onClick={() => handleRevertProject(project)}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};
```

Even though it looks like a lot of code, it's very easy to read.

We iterate through all ongoing and completed projects and display them with a button on the right (CSS styles are removed for simplicity sake):

![Working App](/img/screenshot-2021-01-19-at-20.49.50.png "Working App")

The component does its job perfectly fine.

But I have a feeling like there is a room for optimization, can you guess where?

In the current example, the state transitions are not collected in one place, but in separate functions.

While it may not be a big deal with the current code (state is not a very complex object), but it may not be handy when it is.

Keeping all state updates in one function is always a good idea, the reducer function could have encapsulated that logic perfectly.

## Yet Another "useState" Example

The same code might be rewritten in the following way:

```tsx
const App = () => {
  const [ongoingProjects, setOngoingProjects] = useState<IProject[]>([]);
  const [completedProjects, setCompletedProjects] = useState<IProject[]>([]);

  const handleCompleteProject = (projectToComplete: IProject) => {
    setCompletedProjects([...completedProjects, projectToComplete]);
    setOngoingProjects(
      ongoingProjects.filter((project) => project.id !== projectToComplete.id)
    );
  };

  const handleRevertProject = (projectToRevert: IProject) => {
    setOngoingProjects([...ongoingProjects, projectToRevert]);
    setCompletedProjects(
      completedProjects.filter((project) => project.id !== projectToRevert.id)
    );
  };

  return (
    // Return something
  );
};
```

Project data can be kept in separate state objects and updated separately. 

Imagine if you had to store and update tens of such objects. What a mess!

Another thing to think about is the number of times our component is re-rendered due to setting the state multiple times.

By default, React batches updates, which means that if we set the state twice in a row within the same function, it's smart enough to only do one update, not two:

```typescript
 const handleCompleteProject = (projectToComplete: IProject) => {
    // React batches these updates and re-renders the component only once
    setCompletedProjects([...completedProjects, projectToComplete]);
    setOngoingProjects(
      ongoingProjects.filter((project) => project.id !== projectToComplete.id)
    );
};
```

**However**, if the state is updated within the **asynchronous callback**, these updates are not batched:

```typescript
// These updates are NOT batched
// The component re-renders two times!
const handleCompleteProject = (projectToComplete: IProject) => {
   setTimeout(() => {
     setCompletedProjects([...completedProjects, projectToComplete]);
     setOngoingProjects(
       ongoingProjects.filter((project) => project.id !== projectToComplete.id)
     );
   }, 1000);
};

...

const handleCompleteProject = (projectToComplete: IProject) => {
  fetchSomething.then(() => {
     setCompletedProjects([...completedProjects, projectToComplete]);
     setOngoingProjects(
       ongoingProjects.filter((project) => project.id !== projectToComplete.id)
     );
  });
};

...

// Even this causes multiple re-renders
const handleCompleteProject = async (projectToComplete: IProject) => {
  await fetchSomething();
  setCompletedProjects([...completedProjects, projectToComplete]);
  setOngoingProjects(
    ongoingProjects.filter((project) => project.id !== projectToComplete.id)
  );
};
```

This is a concept that many developers are not aware of, leading to decrease in the performance of an application.

There are at least two ways to solve the problem:

* Unify state, as we did in the **An Example With "useState"** section
* Wrap updates in the `unstable_batchedUpdates` callback

## An Example With "useReducer"

This is exactly the moment where **useReducer** comes into play.

Create a sophisticated reducer function that is responsible for updating the state:

```typescript
const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "COMPLETE_PROJECT":
      return {
        ...state,
        projects: {
          ...state.projects,
          ongoing: state.projects.ongoing.filter(
            (project) => project.id !== action.payload.id
          ),
          completed: [...state.projects.completed, action.payload],
        },
      };
    case "REVERT_PROJECT":
      return {
        ...state,
        projects: {
          ...state.projects,
          completed: state.projects.completed.filter(
            (project) => project.id !== action.payload.id
          ),
          ongoing: [...state.projects.ongoing, action.payload],
        },
      };
    default:
      return state;
  }
};
```

It expects the **initial state** as the first argument and an **action** as the second.

An **action** is a plain JavaScript object that must have a **type** attribute to indicate the type of action being performed, and an **optional payload** that is passed to the reducer.

Do not forget to add the **Action** interface, which describes all available actions and their payload:

```typescript
// We are allowed to dispatch only two types of actions
// With an "IProject" object as a "payload"
type Action =
  | {
      type: "COMPLETE_PROJECT";
      payload: IProject;
    }
  | {
      type: "REVERT_PROJECT";
      payload: IProject;
    };
```

Next, create a component that implements the **useReducer** hook:

```tsx
const App = () => {
  // Pass the "reducer" function and "initialState"
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>
        Hello, {state.details.name} {state.details.surname}
      </h2>
      <div>Let's see what you have here</div>
      <h2>Ongoing projects</h2>
      {state.projects.ongoing.map((project) => (
        <div key={project.id}>
          {project.name}
          <button
            onClick={() =>
              dispatch({ type: "COMPLETE_PROJECT", payload: project })
            }
          >
            +
          </button>
        </div>
      ))}
      <h2>Completed projects</h2>
      {state.projects.completed.map((project) => (
        <div key={project.id}>
          {project.name}
          <button
            onClick={() =>
              dispatch({ type: "REVERT_PROJECT", payload: project })
            }
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};
```

The **useReducer** hook returns the current state paired with the **dispatch** method.

Triggering an update to the state is as simple as calling **dispatch** with an object as an argument that contains the required **type** and optional **payload** properties.

This is the preferred method for handling complex object updates, as it also allows you to optimize performance by not triggering deep updates when passing callbacks down the component tree.

You can pass **dispatch** instead, React will make sure it does not change between renders.

**Important note:** If you return the same value from reducer, React will not re-render the component or trigger any effectsm thanks to the use of the `Object.is` [comparison algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description) under the hood).

## The Third Argument

We have not yet mentioned that the useReducer hook allows the third argument to be passed.

This argument is called **initializer** and is useful for transforming the initial state:

```tsx
const initializer = (initialState: IState) => {
  // Do anything with the "initialState" and return the value
  // What is returned from here is set as "initialState"
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState, initializer);

  // ...
};
```

## "useState" vs. "useReducer"

It is not always obvious when to use **useState** and when **useReducer**, in some cases you may not find any advantages of one over the other.

The general rule is to avoid **useState** when you are working with complex objects, or when state updates may occur in child components (because you would have to pass callbacks down the tree that change between renders, which is not the case when passing the **dispatch** function).

Another nice benefit of using **reducer** is the simplicity of testing - the function can be easily exported to the test.

## "useReducer" vs. Redux

[Redux](https://redux.js.org/) is a library that allows us to easily and predictably manage the state of an application.

There are a number of differences between using Redux and the useReducer hook:

* Redux is a global state container that works "on top" of your application, while useReducer creates a local state container that belongs to a component

  **Important note**: You can use useContext with useReducer to create a simplified version of a global state container.
* Redux comes with great tools for debugging ([Redux Dev Tools](https://github.com/reduxjs/redux-devtools))
* Redux ships with a rich middleware ecosystem ([redux-logger](https://github.com/LogRocket/redux-logger), [redux-thunk](https://github.com/reduxjs/redux-thunk), [redux-saga](https://redux-saga.js.org/), etc.)
* Redux allows you to create separate reducers and combine them into one using `combineReducers` helper function
* Each useReducer ships its own dispatch function, currently there is no way to combine them all into one, as in Redux, which provides a dispatch function that can perform any action

In summary, useReducer is good for smaller applications, useReducer + useContext is good for small to medium applications, and Redux is only good for larger apps.

## Summary

In this article we learned how to use the useReducer hook and why it is needed, compared it to the useState and Redux, and found some similarities and differences.

Keep in mind, that in some cases, this hook can help optimize the performance of your application and make your code cleaner and easier to maintain.