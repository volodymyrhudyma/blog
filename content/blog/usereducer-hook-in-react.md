---
title: useReducer Hook In React
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-01-20T18:52:31.212Z
---
One of the keys to becoming good at React is mastering its hardest part - state management.

State is used for everything, from storing the user's input, to reading and displaying data from external systems.

There are many available tools that are designed to simplify managing state in React, however using them is not always the best choice.

Smaller applications usually suffer from adding complexity by installing redundant libraries instead of using the tools provided by the React itself.

We all probably know, one of the most popular React hooks - **useState**, that allows to store and update the state of the component.

But what if the state is a complex object with a lot of nested properties, which next state may depend on the previous one? Is there any alternative for better managing purposes?

## An Example With "useState"

To understand better the problem, let's create a simple application that allows users to manage their ongoing / completed projects (with the **useState** hook).

Before getting our hands dirty with the code, define all necessary interfaces:

```tsx
// Project entity, contains only "id" and "name"
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

The next step is to create an initial state that is reflected by the **IState** interface:

```tsx
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

Our goal is to allow managing them by creating a component:

```tsx
import React, { useState } from "react";

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

Even though it looks like a lot of code, it is very easy-to-read.

We iterate through all ongoing and completed projects and display them with a button on the right side (CSS styles are removed for simplicity sake):

![Working App](/img/screenshot-2021-01-19-at-20.49.50.png "Working App")

The component does it job perfectly fine.