---
title: A Neat Tool To Quickly Run Your JavaScript Code
tag:
  - JavaScript
promote: false
metaDescription: RunJS is a neat tool that allows you to quickly run your
  JavaScript/TypeScript code. It supports installing external dependencies,
  which is one of the key features for me.
teaser: Since today is the day before Christmas. I thought I would share with
  you an awesome tool I've been actively using for the past year to quickly run
  my JavaScript code. Ofter I find myself in situation, where I need to
  experiment with a code found on the StackOverflow or...
date: 2020-12-24T11:00:33.517Z
---
Since today is the day before Christmas. I thought I would share with you an awesome tool I've been actively using for the past year to quickly run my JavaScript code.

Ofter I find myself in situation, where I need to experiment with a code found on the StackOverflow or somewhere else.

Before using the tool I am talking about, I was searching for a website that allows to execute JavaScript code (*online JavaScript editor*) or, what is even worse, I was executing code in the browser's console.

But what if I needed to install and use some external dependencies?

I am not sure if all JavaScript code editors allow to do that (if any at all).

Now, after I installed RunJS, the things got much better.

## RunJS

> [RunJS](https://runjs.dev/) is a JavaScript and TypeScript playground / scratchpad for your desktop. It runs code as it's written and displays formatted results in the output panel on the right.

The design of the tool is perfect, nothing distracts you from focusing on the code:

![RunJS design](/img/screenshot-2020-12-24-at-12.12.44.png "RunJS design")

One of the key features for me is an ability to install external dependencies in one click.

Let's say we need to quickly fetch the data from an api and see if our code is good enough to do that:

![RunJS Install Dependency](/img/screenshot-2020-12-24-at-12.23.38.png "RunJS Install Dependency")

As you can see, we do not yet have `apisauce` installed, so let's do that by clicking on an **Install** link and see what happens:

![RunJS Fetched Data](/img/screenshot-2020-12-24-at-12.24.13.png "RunJS Fetched Data")

Awesome, we were able to install the library and now we see the fetch results at the right side. Our code works perfectly fine.

It also ships with a lot of available configurations, like:

* Setting environment variables
* Setting working directory
* Auto code formatting
* Listing and removing installed npm packages
* Setting the theme (my fav by far is Dracula, the one you can see on the screenshots)

## Summary

This is not a typical tutorial from me, but I hope you like it anyways.

I wanted to share with you this awesome tool that I use on the daily basis.

After reading this you may notice that the vast majority of the code that is written in the "code sections" in my blog is written in RunJS.