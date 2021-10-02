---
title: Connect Custom GoDaddy Domain To Netlify Website
tag:
  - React
promote: false
metaDescription: Learn an easy way to connect a custom domain on GoDaddy to the
  React application hosted on Netlify.
shareImage: /img/godaddy-netlify-custom-domain.jpg
teaser: The most fascinating part in creating a website from scratch is coding a
  technical part - that's what usually developers like the most. But apart from
  that there are a few more important steps that should be taken before your
  website goes live, like...
date: 2021-10-02T07:01:37.780Z
---
The most fascinating part in creating a website from scratch is coding a technical part - that's what usually developers like the most.

But apart from that there are a few more important steps that should be taken before your website goes live, like hosting it with one of the available providers or own VPS server, purchasing a domain name and connecting them both.

As a hosting provider I like to use [Netlify](https://www.netlify.com/) because of its simplicity and smooth deployment process you can create effortlessly.

As a domain registrar (a website where you can purchase a domain), I frequently use [GoDaddy](https://godaddy.com/).

It is relatively easy to deploy your website to a hosting and purchase a domain, but it can be hard (especially for not experienced developers) to connect purchased domain with a website.

In this article, we will focus exactly on that.

## Prerequisites

For the purposes of this tutorial I have:

\- Created a new React project (**npx create-react-app react-ninja**)

\- Created a new private Github repository and pushed the code there

\- Bought a [](http://react-ninja.com/)domain on GoDaddy ([react-ninja.com](https://react-ninja.com), expires on **02/10/2022**)

\- Deployed a simple React application on Netlify (<https://optimistic-poincare-0f17ae.netlify.app/>)

*Read one of my previous article - [Deploy Your React Application To Netlify](/2020-07-06-deploy-your-react-app-to-netlify-july-2020/) if you don't know how to do it yet.*

## The Netlify Part

To begin with, we need to figure out what is our default subdomain on Netlify.

It can be seen on the "**Site Overview**" page right after the application was deployed:

![Netlify Site Overview](/img/screenshot-2021-10-02-at-10.07.45.png "Netlify Site Overview")

Or you can also open "**Site Settings**" -> "**Domain Management**" and find the "**Custom Domains**" section:

![Netlify Custom Domain Section In Site Settings](/img/screenshot-2021-10-02-at-10.09.22.png "Netlify Custom Domain Section In Site Settings")

In my case, the default subdomain is: [optimistic-poincare-0f17ae.netlify.app](https://optimistic-poincare-0f17ae.netlify.app/ "Open site in a new tab").

## The GoDaddy Part

The next step is to sign in to the GoDaddy, click on "**My Products**" tab, find the domain you would like to use and click on the three dots next to the domain name:

![GoDaddy Select Domain](/img/screenshot-2021-10-02-at-10.13.29.png "GoDaddy Select Domain")

Choose the "**Manage DNS**" and you will end up on the following screen:

![GoDaddy Manage DNS](/img/screenshot-2021-10-02-at-10.14.23.png "GoDaddy Manage DNS")

Note that the "**Records**" table has already been populated with some default values for you.

The only Records we are interested in are:

* **A**

  The A record (stands for Address) maps a domain name to the IP address (Version 4) of the computer hosting the domain.
* **CNAME**

  The CNAME records (stands for Canonical Name) is used to create an alias from one domain name to another domain name.

Before we edit the **A** Record, we need to find out the IP Address for Netlify Servers.

According to the [Netlify docs](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/#configure-an-apex-domain), an IP Address is the following: **75.2.60.5**.

Edit the **A** Record, make it point to the IP above and click "**Save**":

![GoDaddy Edit "A" Record](/img/screenshot-2021-10-02-at-10.41.55.png "GoDaddy Edit \"A\" Record")

The next step is to edit the **CNAME** record and make it point to the default subdomain:

![GoDaddy Edit "CNAME" Record](/img/screenshot-2021-10-02-at-10.44.28.png "GoDaddy Edit \"CNAME\" Record")

After saving the changes, verify your DNS configuration:

![GoDaddy Verify DNS Configuration](/img/screenshot-2021-10-02-at-10.46.31.png "GoDaddy Verify DNS Configuration")

You have just finished the "GoDaddy Part" and we need to switch back to Netlify to finish the configuration.

## Back To Netlify

Now we need to add our custom domain in Netlify.

Open "**Site Settings**" -> "**Domain Management**", find the "**Custom Domains**" section and click on the "**Add Custom Domain**" button:

![Netlify Add Custom Domain](/img/screenshot-2021-10-02-at-10.27.53.png "Netlify Add Custom Domain")

Provide the name of the domain you have purchased and click "**Verify**":

![Netlify Provide The Name Of The Custom Domain](/img/screenshot-2021-10-02-at-10.35.57.png "Netlify Provide The Name Of The Custom Domain")

Most probably, you will see an information that the domain you are trying to add is already registered, but no worries, that was done by us, so just click the "**Add Domain**" button:

![Netlify Domain Already Registered](/img/screenshot-2021-10-02-at-10.36.23.png "Netlify Domain Already Registered")

And that's it!

To make sure the the domain was successfully added, check the "**Custom Domains**" section:

![Custom Domains Section](/img/screenshot-2021-10-02-at-10.38.26.png "Custom Domains Section")

And the "**SSL/TLS certificate**" section as well to make sure that Netlify has generated the certificate for your website:

![SSL/TLS Certificate Section](/img/screenshot-2021-10-02-at-10.39.25.png "SSL/TLS Certificate Section")

Congratulations on making it to the end and setting up your custom domain with GoDaddy and Netlify.

Share it with your friends!

## Bonus: Redirect "www" To "non-www"

You may have noticed that now if you type your domain in the URL, it will redirect you to "**www.<domain>**", which is perfectly fine, but in some cases we may want to get rid of the "**www**" part.

All we have to do to achieve that is to change the primary domain in the "**Custom Domains**" section in Netlify:

![Change Primary Domain](/img/screenshot-2021-10-02-at-10.52.44.png "Change Primary Domain")

Enter your website and verify that the primary domain does not contain "**www**" subdomain. 

## Summary

In this article, we learned how to connect a custom domain purchased on a GoDaddy domain registrar to a React application hosted on Netlify service.

Basically, all that needs to be done is:

* Configuring **A** and **CNAME** records in GoDaddy to point to the Netlify load balancer's IP address and our primary subdomain
* Adding a custom domain in "**Site Settings**" in Netlify

I hope you got it working and congratulations on your website going live!