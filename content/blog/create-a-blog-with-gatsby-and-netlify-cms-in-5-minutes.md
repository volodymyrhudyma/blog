---
title: Create A Blog With Gatsby And Netlify CMS In 5 Minutes
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-04-06T09:40:43.824Z
---
Building a website has never been easier than today.

There are a tremendous amount of tools available for building a website of a different complexity - from a small landing page to a huge web application handling hundreds of thousands requests per second.

Today we will build a simple blog using [Gatsby](https://www.gatsbyjs.com/) for the Front-End, and [NetlifyCMS](https://www.netlifycms.org/) for the Content Management.

## Gatsby

**Gatsby** is a powerful framework and [Jamstack](https://jamstack.org/) delivery platform, based on React, for building amazingly fast, secure, and beautiful websites.

The reasons we will use it over the plain React for the blog are the following:

* **Gatsby is optimized for performance**

  It loads only critical HTML, CSS and JavaScript code and prefetches other pages you can possibly navigate to, so clicking around a website built with Gatsby feels like blazing fast.
* **Gatsby is optimized for Search Engines**

  Gatsby pages are rendered on the server, so Search Engine Crawlers would see the full content of your website and would be able to index it properly, which is extremely important for our blog.
* **Gatsby comes with many plugins that speed up the development**

  There are tons of available plugins for different purposes that could be instantly installed and used. Click [here](https://www.gatsbyjs.com/plugins) to see the full list.

## NetlifyCMS

**NetlifyCMS** is an Open-Source Content Management System, a perfect choice for Static-Site Generators, like Gatsby.

> A **Static Site Generator** is a software application that creates HTML pages from templates or components and a given content source.

It is a tool for content editors that will make commits to your repository without having them to learn or even touch Git.

Each blog entry that is created is added to the repository in a separate commit.

The main reason of using it - a quick installation and configuration process.

## Prerequisites

Before proceeding, let's install Gatsby CLI that let's you build websites with Gatsby:

`yarn global add gatsby-cli`

As soon as the installation process completed successfully, we are ready to start building a blog.

Obviously, apart from the Gatsby CLI we also need **Node.js** and **Git** installed to be able to run the JavaScript code outside of the browser and push it to the repository.

## Pick Up A Template

We have two options of building a blog available: either create it from scratch or use an existing template that has a lot of things done for you.

Both approaches have their pros and cons.

If we choose creating from scratch - we would have more control over the website, however we would spend a lot of time configuring some basic things that could already be configured for you.

If we choose to use an existing template - we would save a lot of time on a things that are already done for you, however we would have a little less control over the website and changing any of the existing configuration would take slightly more time, because it wasn't done by us.

In this tutorial, since we are setting up a blog in 5 minutes, choosing the second option is a must.

Gatsby provides us with a lot of starters we can use for our blog.

Click [here](https://www.gatsbyjs.com/starters/?c=Blog) to see the full list.

I have chosen [](https://www.gatsbyjs.com/starters/stackrole/gatsby-starter-foundation)this template, since it it the official template for a blog build by the Gatsby team:

![Chosen Blog Template](/img/screenshot-2021-04-05-at-12.52.03.png "Chosen Blog Template")

## Install A Template

The next step is to install a template.

Create a folder that would contain all your projects if you don't have any, open it and execute the following inside:

`gatsby new my-blog https://github.com/gatsbyjs/gatsby-starter-blog`

Let's break the above command in parts:

* **gatsby new** - creates a new Gatsby project
* **my-blog** - a name of your project, you can type any name
* **URL**(https://github.com/gatsbyjs/gatsby-starter-blog) - the URL to the starter repository 

Once the installation process completes, let's navigate to the project:

`cd blog`

And run it locally:

`yarn develop`

And it should be accessible under the **localhost:8000**.

## Create Github Repository

The next step is to create a Github Repository and put the template's code inside.

I prefer to keep it in the "Private" repository, so let's create one:

![Create Github Private Repository](/img/screenshot-2021-04-05-at-14.39.15.png "Create Github Private Repository")

And follow these instructions to push the code:

```javascript
git remote add origin https://github.com/volodymyrhudyma/my-blog.git
git branch -M main
git push -u origin main
```

Alright, let's add NetlifyCMS then.

## Configure NetlifyCMS

To begin with, we have to install the following dependencies:

* [netlify-cms-app](https://www.npmjs.com/package/netlify-cms-app) - a CMS for static site generators, gives users a simple way to edit and add content to any site built with a static site generator
* [gatsby-plugin-netlify-cms](https://www.gatsbyjs.com/plugins/gatsby-plugin-netlify-cms/) - automatically generates an admin/index.html with a default Netlify CMS implementation

`yarn add netlify-cms-app gatsby-plugin-netlify-cms`

To configure the CMS, create a **static/admin/config.yml**:

```yaml
 backend:
  name: github
  repo: volodymyrhudyma/my-blog
  branch: main

media_folder: "static/img"
public_folder: "/img"

collections:
  - name: "article"
    label: "Article"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    editor:
      preview: false
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Publish Date", name: "date", widget: "datetime" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Body", name: "body", widget: "markdown" }
```

The configuration looks scary, so let's see what each of these lines does:

* **backend** section -  specifies how to access the backend of your website

  * **repo** - the name of your Github repository, including user name.
  * **branch** - the main branch of your blog.
* **media_folder** - specifies the folder path where uploaded files should be saved, relative to the base of the repo
* **public_folder** - specifies the folder path where the files uploaded by the media library will be accessed, relative to the base of the built site. Defaults to the value of media_folder, with an opening / if one is not already included
* **collections** section - determines how content types and editor fields in the UI generate files and content in your repository

  * **name** - unique identifier for the collection, used as the key when referenced in other contexts
  * **label** - label for the collection in the editor UI; defaults to the value of **name**
  * **folder** - specifies the location of the collection
  * **create** - allows users to create new items in the collection if set to **true**, defaults to **false**
  * **slug** - specifies a template for generating new filenames
  * **editor** section - changes options for the editor view of a collection or a file inside a files collection

    * **preview** - the only option so far, set **false** to disable the preview pane for this collection or file, defaults to  **true**
  * **fields** section - maps editor UI widgets to field-value pairs, accepts a list of collection objects, some (but not all) available options:

    * **name** (required): unique identifier for the field, used as the key when referenced in other contexts
    * **label**: label for the field in the editor UI; defaults to the value of **name**
    * **widget**: defines editor UI and inputs and file field data types (see all widgets [here](https://www.netlifycms.org/docs/widgets/))

Next, add the plugin to your **gatsby-config.js**:

```javascript
plugins: [
  `gatsby-plugin-netlify-cms`,
  // ...
],
```

And push the changes to the Github.

```javascript
git add -A
git commit -m "Add NetlifyCMS config"
git push
```

## Login To CMS

Basically, that's it with the configuration, now you can login and check the CMS we have just added.

Type in the browser: **localhost:8000/admin** and you will see the following screen:

![NetlifyCMS Login Page](/img/screenshot-2021-04-05-at-15.37.55.png "NetlifyCMS Login Page")

You can login to the CMS via Github, so click on the button, authorize the application and you will end up on the dashboard page:

![NetlifyCMS Dashboard Page](/img/screenshot-2021-04-05-at-15.30.03.png "NetlifyCMS Dashboard Page")

## Add New Blog Post

Are you eager to test adding a new blog post to our CMS?

Before doing that, let's clean the existing posts that are stored under **content/blog** directory.

Make sure that the directory exists, but is empty and let's add content for a new article:

![New Article Content](/img/screenshot-2021-04-05-at-15.30.42.png "New Article Content")

And click **Publish**.

You should now see the entry in the list:

![New Article In The List](/img/screenshot-2021-04-05-at-15.31.33.png "New Article In The List")

Then switch to the code editor and make a pull:

`git pull`

You should see the article appeared in the **content/blog** folder:

![Article Visible In The Code](/img/screenshot-2021-04-05-at-15.34.09.png "Article Visible In The Code")

NetlifyCMS did a commit to our **my-blog** repository:

![NetlifyCMS Commit On Github](/img/screenshot-2021-04-05-at-15.35.35.png "NetlifyCMS Commit On Github")

Also, let's check the UI to make sure that the article is visible:

![New Article Appeared In The UI](/img/screenshot-2021-04-05-at-15.36.12.png "New Article Appeared In The UI")

## Deploy Your Blog To Netlify

[Netlify](https://www.netlify.com/) is a service that automates builds, deployments, and manages your websites.

Nowadays it is one of the fastest and easiest deployment solutions.

Folks from Netlify created NetlifyCMS, so it is really easy to integrate them both together.

Create an account if you don't have any, log in and click on a **New site from Git** button:

![New Site From Git Button](/img/screenshot-2021-04-05-at-15.42.26.png "New Site From Git Button")

In the next step, choose the Github as your Git provider:

![Choose Git Provider](/img/screenshot-2021-04-05-at-15.42.57.png "Choose Git Provider")

And pick a repository:

![Pick A Repository](/img/screenshot-2021-04-05-at-15.44.12.png "Pick A Repository")

**Important note:** if you can not find your repository in the list, you need to provide Netlify with access to it. To do that, click on the link below the list: **Can’t see your repo here? Configure the Netlify app on GitHub:**

![Adding Repo To Be Seen By Netlify](/img/screenshot-2021-04-05-at-15.45.48.png "Adding Repo To Be Seen By Netlify")

Finally, provide the deploy settings. The most important ones are: which branch to deploy (we will deploy **main**), which command to execute to build the project (in our case **yarn build**), and which folder to deploy (in our case **public** folder):

![Deploy Site Configuration](/img/screenshot-2021-04-05-at-15.47.17.png "Deploy Site Configuration")

And click on a **Deploy site** button.

Now it's time to relax a little and have a coffee.

Netlify will build and deploy the website for you.

Once the deployment is complete, your site will accessible:

![Accessible Website](/img/screenshot-2021-04-05-at-15.50.22.png "Accessible Website")