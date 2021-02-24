---
title: How To Make Your React Application SEO-Friendly?
tag:
  - React
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-26T21:08:53.550Z
---
**Search Engine Optimization** (SEO) is a process of improving the quality and quantity of website traffic to a website from search engines.

A tremendous number of people use Google as a tool to search for information, so it is extremely important for your website to be ranked as high in its search results as possible.

The higher you are ranked, the more traffic you get, as simple as that.

Before we start learning what are the problems with SEO and React and how to get rid of them, let's get a quick overview of how websites are indexed by Google.

## Step 1: Crawling

There is no single place where all websites are registered, so Google has to constantly search for new websites and add them to its list.

It uses a lot of [Google Bots](https://developers.google.com/search/docs/advanced/crawling/googlebot) (web crawlers) that do this kind of work.

This process is called **crawling**.

## Step 2: Indexing

After your website has been found, Google Bot tries to understand what is it about by processing the text content, key tags and attributes, images, videos, and even more.

This process is called **indexing**.

The results of indexing are stored in Google index, an enormously huge database.

## Step 3: Ranking

Google implements an algorithm that decides what results from its index should be shown in response to user queries.

There are hundreds of rules which are used to determine relevant results.

Some of them are page loading time and mobile-friendliness, so make sure that your website loads fast and works well on mobile devices.

Check your website on the [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) to get some important information on what can be improved to rank even higher.

To get a deeper understanding of how the whole process looks read "[How Google Search Works](https://developers.google.com/search/docs/beginner/how-search-works)" from Google.

## How Is JavaScript Processed By Google?

JavaScript is used in almost every application these days because it provides us with many great features that allow building better, faster, and more powerful websites.

Websites built with JavaScript can render on a client or on a server and the rendering type defines how easy it would be for a Google Bots to crawl your website.

Server-rendered applications return HTML in the HTTP response, while client-rendered applications do not.

HTTP response of a server-rendered application:

// IMAGE

HTTP response of a client-rendered application:

// IMAGE

if HTML is not returned, Google Bots execute JavaScript and wait for the completion to be able to see the website data, which is indexed and stored afterward.

This process is complicated and there are many things that can go wrong, therefore relying on it is a bit risky.

In summary, while your client-side JavaScript application can be indexed, it is still better to use server-side or pre-rendering, as it makes your website faster both, for users and crawlers.

## Tip 1: Use Pre-Rendering

Pre-rendering is a process of pre-loading of the website content with the help of Headless Chrome to prepare it for web crawlers.

> [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) is a way to run the Chrome browser in a headless environment. Essentially, running Chrome without chrome! It brings all modern web platform features provided by Chromium and the Blink rendering engine to the command line.

Typically pre-rendering done with the help of a service (like [prerender.io](https://prerender.io/)), or a library (like [react-snap](https://github.com/stereobooster/react-snap)) that intercepts all requests to your website and checks **user-agent** to determine whether a website is requested by a robot or a human.

If a viewer is a bot, it gets pre-rendered version of a website (cached HTML).

If a viewer is a human, a website is loaded normally.

#### Pros and Cons of Pre-Rendering

As with all other approaches, pre-rendering comes with its own advantages and disadvantages.

#### Pros

* allows Google to see the content for indexing
* easy-to-implement (in comparison to server-side rendering or isomorphic applications)
* lighter server payload (in comparison to server-side rendering)

#### Cons

* most services that can be used for pre-rendering are paid and work poorly with dynamic content

## Tip 2: Use Server-Side Rendering

## Tip 3: Build Isomorphic Applications

## Summary