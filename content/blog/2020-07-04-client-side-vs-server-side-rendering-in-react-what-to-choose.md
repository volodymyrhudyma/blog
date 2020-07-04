---
title: Client-side vs server-side rendering. What to choose?
tag:
  - JavaScript
teaser: Server-side rendering has become increasingly popular in recent years.
  By using it, we can do many things that are not possible with a client-side
  rendering approach. However, it also has some drawbacks, like...
date: 2020-07-05T06:04:11.690Z
---
**Server-side rendering (SSR)** has become increasingly popular in recent years.

By using it, we can do many things that are not possible with a **client-side rendering (CSR)** approach. 

The main advantages of SSR are:

* Better SEO
* Better performance
* Better UX

Before we proceed with the detailed discussion of the benefits of both approaches, we should familiarise ourselves with them.

**Important note:** In the following sections we assume that the React library is used.

## Client-side rendering

**CSR** means that our page is rendered in the browser by JavaScript.

Instead of getting the HTML page populated with the content, we get an empty page that contains some JavaScript, which is responsible for filling the page with the content.

Example HTML response:

![Empty HTML response when using CSR](/img/screenshot-2020-07-04-at-12.24.25.png "Empty HTML response when using CSR")

**Important note:** notice, that `<div id="root"></div>` element is empty.

After executing JavaScript files, the whole React application will be rendered inside the `<div id="root></div>` unless you change that:

![HTML structure after executing JavaScript by the browser](/img/screenshot-2020-07-04-at-12.26.12.png "HTML structure after executing JavaScript by the browser")

**Important note:** notice, that `<div id="root"></div>` element is not empty now, React application is rendered inside.

The following steps are executed to make an application visible after the user opens a website:

1. The browser makes a request to the server:

   *\- "Hey, bro! Could you send me the contents of the website?"*
2. The server answers the browser with a simple HTML structure, containing links to all styles and JavaScript files:

   *\- "Ok, here you go!"*
3. The browser downloads all JavaScript files:

   *\- "Thanks, buddy. I see there are some JavaScript files. Let's download them first."*
4. The browser executes JavaScript:

   *\- "The download is complete. Time to run the scripts."*
5. If no errors occurred during the execution, the app is ready for use:

   *\- "Ok, I got it for you, my dear user. Now it is time to have a little rest."*

During the execution time of all the above steps, the app is not viewable, because we simply do not know yet what to display.

It is good practice to show the loading screen or some placeholders while the data is being retrieved to make the user feel that something is happening and the initial loading does not really take much time.

#### Pros

* After slow initial load, all next pages will be loaded much faster

  CSR manages the routing dynamically without refreshing the page every time a user requests a different route, that's why it's extremely fast after loading the first page.
* Lower server load

  CSR technologies use the processor on the client device to perform the bulk of the logic.

  That means processing power is offloaded from the server and transferred down to the client.

  **However, there is one potential drawback** of the CSR: the users with underpowered devices can experience lag issues as their devices struggle to render the page due to the lack of resources.

  Nowadays this drawback has become less of a concern, as CPUs get cheaper and more powerful.

#### Cons

* Slow initial load

  There is a need to download and execute JavaScript on the initial load. 
* SEO issues

  CSR requires a **two-wave process** for JS rendering and indexing in a browser.

  **The first wave** requests source code, crawls and indexes any present HTML and CSS, adds any present links to the crawl queue and downloads page response codes.

  When using the CSR approach, there’s basically nothing for Google to index in the source code, as all that we have is the simple HTML without any data yet.

  **The second wave** can occur a few hours to even a few weeks later, Google returns to the page when additional resources are available to fully render and index the JS generated content.

## Server-side rendering

**SSR** means that our page is rendered on the server.

When the user opens a website, the HTML received from the server is populated with the content:

![HTML structure after executing JavaScript on the server](/img/screenshot-2020-07-04-at-12.36.35.png "HTML structure after executing JavaScript on the server")

**Important note:** notice, that the React application is rendered inside `<div id="main"></div>`.

The following steps are executed to make an application visible after the user opens a website:

1. The browser makes a request to the server.
2. The server answers the browser with a **FULL** **HTML structure**, containing links to all styles and JavaScript files. **During this step, the user can already see the website content**.
3. The browser downloads all JavaScript files.
4. The browser executes JavaScript.
5. If no errors occurred during the execution, the **app becomes interactive**.

When using **SSR** user is able to see the website **during the second step**.

When using **CSR** user is able to see the website **during the fifth step**.

#### Pros

* Fast initial load

  For the first page load, it doesn’t take two round trips to the server before the user sees the content.

  In SSR, the application's performance depends on the server’s resources and the user’s network speed.

  Nowadays servers are considerably powerful, so the bundles of HTML pages are sent across very quickly.
* Good for SEO

  Search engine crawlers see the full HTML code and can easily index it.

#### Cons

* Full-page reloads

  Every user interaction requires a full-page reload. 

  User interactions, such as clicking on a button ofter trigger GET or POST requests on the web server and it always generates the entire HTML page.
* High server load

  Rendering a full app on the server is going to be CPU-intensive, so if you expect high traffic, prepare for corresponding server load and costs.
* Development constraints

  Some external libraries may need special treatment to be able to run in a server-rendered app.

## Choosing the right way

Choosing the right way of building your website is extremely important. 

The wrong choice can cost you a redevelopment of the whole application.

#### You may need CSR if

* SEO is not very important (e.g. you are building an application for internal use only)
* You require a lot of user interactions (your website is **interaction-focused**)

#### You may need SSR if

* Having good SEO is crucial
* You do not require a lot of user interactions (your website is **content-focused**)
* You accept higher server costs
* You require very quick initial loading time (most of your first-time users visit your site through **deep content links**)

## Summary

In summary, **CSR** makes the app faster and more interactive, **SSR** speeds up the initial render and improves the SEO.

But wait, what if we did not have to focus on choosing one thing, but get the best out of 2 approaches instead? 

This is possible, we can use the **Universal Web App**, which does the initial rendering on the server, and then **CSR** takes over.

It enables excellent SEO, fast first rendering, and good speed when browsing the site.

But that is the topic for the next article, so stay tuned.