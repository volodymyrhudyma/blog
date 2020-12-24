---
title: A Nice Tool To Run Your JavaScript Code Fast
tag:
  - JavaScript
promote: false
metaDescription: RunJS is a neat tool that allows you to quickly run your
  JavaScript/TypeScript code. It supports installing external dependencies,
  which is one of the most important features for me.
teaser: Since today is the day before Christmas. I thought I'd share with you a
  great tool I have been actively using for the past year to quickly run my
  JavaScript code. I often find myself in situations, where I need to experiment
  with some code I found on StackOverflow or somewhere...
date: 2020-12-24T11:00:33.517Z
---
Since today is the day before Christmas. I thought I'd share with you a great tool I have been actively using for the past year to quickly run my JavaScript code.

I often find myself in situations, where I need to experiment with some code I found on StackOverflow or somewhere else.

Before using the tool I am talking about, I was looking for a website that allows to run JavaScript code (*online JavaScript editor*), or worse, I was running the code in the browser's console.

But what if I had to install and use some external dependencies?

I am not sure if all JavaScript code editors allow that (if at all).

Well, after RunJS has been installed in my computer, things got much better.

## RunJS

> [RunJS](https://runjs.dev/) is a JavaScript and TypeScript playground / scratchpad for your desktop. It runs code as it's written and displays formatted results in the output panel on the right.

The design of the tool is perfect, nothing distracts you from focusing on the code:

![RunJS design](/img/screenshot-2020-12-24-at-12.12.44.png "RunJS design")

One of the most important features for me is the ability to install external dependencies with one click.

Let's say we need to quickly retrieve the data from an API and see if our code is good enough for it:

![RunJS Install Dependency](/img/screenshot-2020-12-24-at-12.23.38.png "RunJS Install Dependency")

As you can see, we have not installed the `apisauce` yet, so let's do that by clicking on an **Install** link and see what happens:

![RunJS Fetched Data](/img/screenshot-2020-12-24-at-12.24.13.png "RunJS Fetched Data")

Great, we were able to install the library and now we can see the fetch results on the right. Our code is working perfectly fine.

It also comes with a lot of available configurations like:

* Setting environment variables
* Setting the working directory
* Automatic code formatting
* Listing and removing installed **npm** packages
* Setting the theme (my favourite by far is Dracula, the one you can see on the screenshots)

## Summary

This is not a typical tutorial from me, but I hope you like it anyway.

I wanted to share this great tool that I use every day.

After reading this, you may notice that the vast majority of the code in the "code sections" on my blog is written in RunJS.