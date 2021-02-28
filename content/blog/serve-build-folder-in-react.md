---
title: Serve Build Folder In React
tag:
  - React
promote: false
metaDescription: Learn how to serve React build folder locally in a few easy steps.
shareImage: /img/serve-build-folder-min.jpg
teaser: In some specific cases, you may need to run react production application
  locally. For example, if in the development environment the app is working
  fine, but the production environment contains some strange errors. Debugging
  on production is a generally bad and time-consuming option...
date: 2021-03-01T11:11:16.787Z
---
In some specific cases, you may need to run react production application locally.

For example, if in the development environment the app is working fine, but the production environment contains some strange errors.

Debugging on production is a generally bad and time-consuming option because to add some logs you would need to commit your changes and deploy them.

Fortunately, you can serve production build locally in a few easy steps

## Create React Application

To begin with, let's create React Application:

`npx create-react-app test-app`

And run it to verify that the installation process completed successfully:

`yarn start`

You should see the app up and running:

![React App Running](/img/screenshot-2021-02-28-at-12.36.49.png "React App Running")

## Build React Application

When you are ready to deploy to production, an application should be built.

Execute the following command:

`yarn build`

And observe the logs:

![Build React App Logs](/img/screenshot-2021-02-28-at-12.40.44.png "Build React App Logs")

The built application is available under the **build** folder.

Now we need to run pretending that our local environment is the production one.

## Serve Build Folder

The first way to serve the build folder can be noticed in the above logs.

React gives us a hint on how to do that:

![React Serve Build Folder Hint](/img/screenshot-2021-02-28-at-12.43.08.png "React Serve Build Folder Hint")

All we need to do is to install [serve](https://www.npmjs.com/package/serve) globally and execute it on our **build** folder:

`yarn global add serve`

And

`serve -s build`

After executing these commands you should see what port is your built application listening on:

![Served Built Folder Port](/img/screenshot-2021-02-28-at-12.45.50.png "Served Built Folder Port")

Now just open the URL (**http://localhost:5000**) in the browser and check what's happening there.

To add some logs, you would need to re-build an application and serve it once again.

## Summary

Today we learned how to serve the build folder in React.

It can be extremely useful if you need to quickly debug the production version of your React application without having to re-deploy it each time, adding unnecessary logs that can be potentially seen by your end users.