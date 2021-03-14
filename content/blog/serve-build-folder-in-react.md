---
title: Serve Build Folder In React
tag:
  - React
promote: false
metaDescription: Learn how to serve React build folder locally in a few simple steps.
shareImage: /img/serve-build-folder-min.jpg
teaser: In some special cases, you may need to run the React production
  application locally. For example, if in the development environment the app
  works fine, but the production environment contains some strange errors.
  Debugging in the production is generally bad and time-consuming...
date: 2021-03-01T11:11:16.787Z
---
In some special cases, you may need to run the React production application locally.

For example, if in the development environment the app works fine, but the production environment contains some strange errors.

Debugging in the production is generally bad and time-consuming idea, because in order to add some logs, you would have to commit and re-deploy your changes.

Fortunately, you can serve production build locally in a few simple steps.

## Create React Application

Let's create React Application first:

`npx create-react-app test-app`

And run it to verify that the installation process completed successfully:

`yarn start`

You should see that the app is running:

![React App Running](/img/screenshot-2021-02-28-at-12.36.49.png "React App Running")

## Build React Application

When you are ready to deploy to production, an application should be built.

Run the following command:

`yarn build`

And watch the logs:

![Build React App Logs](/img/screenshot-2021-02-28-at-12.40.44.png "Build React App Logs")

The built application is available under the **build** folder.

Now we need to run an app pretending that our local environment is the production one.

## Serve Build Folder

The way to serve the build folder can be noticed in the above logs.

React gives us a hint on how to do this:

![React Serve Build Folder Hint](/img/screenshot-2021-02-28-at-12.43.08.png "React Serve Build Folder Hint")

All we need to do is install [serve](https://www.npmjs.com/package/serve) globally and run it on our **build** folder:

`yarn global add serve`

And

`serve -s build`

After running these commands, you should see which port your application is listening on:

![Served Built Folder Port](/img/screenshot-2021-02-28-at-12.45.50.png "Served Built Folder Port")

Now just open the URL (**localhost:5000**) in the browser and see what happens there.

To add some logs, you would have to re-build an application and serve it once again.

## Summary

Today we learned how to serve the build folder in React.

It can be extremely useful when you need to quickly debug the production version of your React application without having to redeploy it every time, which adds unnecessary logs that can potentially be seen by your end-users.