---
title: Post A Tweet Using Twitter API
tag:
  - Other
promote: false
metaDescription: // META
shareImage: /img/twitter-api-in-nodejs.jpg
teaser: // TEASER
date: 2021-09-13T07:25:26.832Z
---
Growing a business requires big effort, including working a lot with the social media to gather an attention and promote your product to the end users.

Therefore, it necessary to automate as much things as possible in order not to spend your entire time preparing posts and manually replying to the comments.

If you use Twitter for a long time, you may have noticed the large amount of bots hanging around.

So, why don't create your own one?

## Prerequisites

Before we proceed to the coding part, we need to create a Twitter application that would provide us with the necessary stuff we need to integrate with the Twitter API.

#### \#1 - Log In To Twitter Developer's Portal

To begin with, log in to the [Twitter developer's portal](https://developer.twitter.com/) with the account you want to post Tweet from.

Next, click on the "**Developer Portal**" link at the top right corner.

Once you enter it, click "**Projects & Apps**" -> "**Overview**" -> "**Create App**".

Provide the required details of the application and in the end, you will end up on the screen with a set of keys, but don't copy them yet, as they would change later on.

Next, scroll down to the "**App permissions**" section:

![App Permissions](/img/screenshot-2021-09-12-at-09.48.28.png "App Permissions")

Click "**Edit**" and change to "**Read and Write**" in order to allow our application to post Tweets on your behalf:

![Updated App Permissions](/img/screenshot-2021-09-12-at-09.49.08.png "Updated App Permissions")

Click "**Save**", confirm the change and verify the change:

![Updated App Permissions](/img/screenshot-2021-09-12-at-09.50.01.png "Updated App Permissions")

## Twitter API

## Summary