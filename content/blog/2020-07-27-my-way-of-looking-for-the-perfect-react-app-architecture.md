---
title: My way of looking for the perfect React app architecture
tag:
  - React
metaDescription: The best React application architecture. This article describes
  some different approaches I have tried over the last 3 years.
teaser: 'When someone asked Dan Abramov what is an optimal structure for React
  applications, he replied: "Move files around until it feels right". I thought
  it was a joke at first, and started trying different architectural approaches
  until I realized he was absolutely right...'
date: 2020-07-27T18:11:58.078Z
---
When someone asked Dan Abramov what is an optimal structure for React applications, he replied: "Move files around until it feels right".

I thought it was a joke at first, and started trying different architectural approaches until I realized he was absolutely right.

The whole journey to understand such a simple concept took almost 3 years.

## The Oldie

The first methodology I used has nothing to do with good architectural principles.

Due to the lack of experience in the front-end area, all my components ended up in a directory called `components`.

Of course, these components had to be styled, so all my CSS files lived in a separate directory - `styles`.

Various configurations and utils were hardcoded into the components, which quickly grew in size and could not be maintained.

// Screenshot

## CSS-in-JS

A few months later, after we were tired of maintaining a bunch of CSS code with global styles that were constantly overlapping, long selectors with strange names and lots of dead code, we decided to try a new CSS-in JS approach that would eliminate these problems. 

Therefore a new library called `styled-components` was installed. 

The architecture had to be adapted to the new approach, so it was decided to create a separate folder for each component, containing 2 files: the component itself and its styles. 

This way, we did not have to browse through all the files within the `styles` directory to find styles for a specific component.

Seemed much better.

// Screenshot

## UI Kit

Time passed, the application grew and it turned out that a lot of logic could be reused. That was when reusable components came into play.

Having them in the same folder as all the other components did not sound like a good idea.

We came up with the solution to create a separate folder for reusable components and give it a name: `ui-kit`.

Components like inputs, labels, tables were placed there.

// Screenshot

## Redux

Managing state in a medium to large React application becomes difficult without a library that provides an easy way to do it. 

We were confronted with many problems related to the fact that we did not have good state management.

After we had spent some time doing research, Redux seemed like a good choice.

The installation and configuration take some time, especially if you have never used it before, brings a lot of benefits. 

A new application structure was as follows:

// Screenshot

## Containers/Presentational Components

Shortly after we added Redux to the project, we started connecting components to the store, and at first, it felt fine, but after a few days some of the drawbacks became apparent.

The components connected to the store were responsible for both, the retrieval and presentation of the data.

We lacked reusability because the components could only be reused under exactly the same circumstances.

So, the separation of data-fetching and rendering concerns has been made. 

The components were divided into 2 types: containers and presentational. 

The container components were responsible for interacting with an API and extracting data from the store, and the presentation components were rendering the layout based on the props they received.

We have made our presentational components reusable.

// Screenshot 

## Atomic Design

Once upon a time, I was reading React tutorials and stumbled upon a new design methodology named **Atomic Design**.

The idea is to separate the components in atoms, molecules, organisms, templates and pages. Each of the separated parts has its own responsibilities, let's find out what are they.

#### Atoms

Atoms are the smallest possible components, such as buttons, inputs, titles, etc.

#### Molecules

Molecules are the composition of one or more components of atoms. They can have their own properties and create functionalities by using atoms, which don’t have any function or action by themselves.

#### Organisms

Organisms are the combination of molecules that work together or molecules with atoms. At this level, the components begin to have the final shape, but they are still ensured to be independent, portable and reusable enough to be reusable in any content.

#### Templates

Templates create relationships between organisms and other components. This is where we begin to see the layout in action.

#### Pages

These are instances of templates where “gaps” are filled with content, resulting in the final view.

![Atomic design image](/img/atomic-design-process.png "Atomic design image")

This design approach helps us to build a good project structure that is easy to maintain and easy to understand, if it is set up correctly.

// Screenshot

## The Random

After using Atomic Design for a while, it was obvious that breaking up large projects into these small parts was an efficient way to work. 

But is it a good method for smaller projects? Does not this make the development process more complex? 

I constantly had the feeling that many things were too complicated for this simple work they had to do. 

That is why I ended up completely agreeing with Dan Abramov's statement.

I no longer spend as much time selecting the perfect design methodology as I did even a few months ago. 

Requirements change and there is a great chance that the "perfect" architecture will be rewritten/refactored/improved for the "better" one, and this is a never-ending story.

Start with the simplest directory structure you think is appropriate, create your components, deliver new functionality, keep the customer happy, but do not spend too much time thinking about the potential architecture problems you will most likely never face.

// Screenshot

## Summary

In summary, I cannot say that one architecture is better than another, because all of them have their strong and weak sides.

It is about being able to choose the one that is best suited to your situation. 

While you may have the misfortune to choose the inappropriate design with React, it's not that hard to change the approach.