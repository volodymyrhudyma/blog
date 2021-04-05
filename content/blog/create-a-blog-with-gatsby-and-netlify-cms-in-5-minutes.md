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

## Picking Up A Template