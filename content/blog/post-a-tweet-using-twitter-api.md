---
title: Post A Tweet Using Twitter API
tag:
  - Node
promote: false
metaDescription: Learn how to create a simple Twitter Bot using Twitter API and
  Node.js that posts a Tweet on your behalf.
shareImage: /img/twitter-api-in-nodejs.jpg
teaser: Growing a business requires big effort, including working a lot with the
  social media to gather an attention and promote your product to the end users.
  Therefore, it necessary to automate as much things as possible in order not to
  spend your entire time...
date: 2021-09-13T07:25:26.832Z
---
Growing a business requires big effort, including working a lot with the social media to gather an attention and promote your product to the end users.

Therefore, it necessary to automate as much things as possible in order not to spend your entire time preparing posts and manually replying to the comments.

If you use Twitter for a long time, you may have noticed the large amount of bots hanging around.

So, why don't create your own one?

## Prerequisites

Before we proceed to the coding part, we need to create a Twitter application that would provide us with the necessary stuff we need to integrate with the Twitter API.

#### \#1 - Create A Twitter Application

To begin with, log in to the [Twitter developer's portal](https://developer.twitter.com/) with the account you want to post Tweet from.

Next, click on the "**Developer Portal**" link at the top right corner.

Once you enter it, click "**Projects & Apps**" -> "**Overview**" -> "**Create App**".

Provide the required details of the application and in the end, you will end up on the screen with a set of keys, but don't copy them yet, as they would change later on.

#### \#2 - Update Application's Permissions

Next, scroll down to the "**App permissions**" section:

![App Permissions](/img/screenshot-2021-09-12-at-09.48.28.png "App Permissions")

Click "**Edit**" and change to "**Read and Write**" in order to allow our application to post Tweets on your behalf:

![Updated App Permissions](/img/screenshot-2021-09-12-at-09.49.08.png "Updated App Permissions")

Click "**Save**", confirm the change and verify the change:

![Updated App Permissions](/img/screenshot-2021-09-12-at-09.50.01.png "Updated App Permissions")

#### \#3 - (Re)generate Tokens

Click on the "**Keys and tokens**" on the right side of the "**Settings**" and regenerate "**Api Key and Secret**", since we didn't copy them from one of the previous screens:

![Regenerate Api Key And Secret](/img/screenshot-2021-09-12-at-09.55.17.png "Regenerate Api Key And Secret")

Confirm the action and you will see a modal with keys, save them somewhere on your computer for a future use.

Next, regenerate "**Access Token and Secret**", since old tokens were valid for old permissions (**Read**), now they were changed to "**Read and Write**".

If you don't have a "**Regenerate**" button, like on the screenshot below, just click "**Generate**", it will still be perfectly fine:

![Generate Access Token And Secret](/img/screenshot-2021-09-12-at-09.56.34.png "Generate Access Token And Secret")

Save them and move on.

**Important note:** It should be instantly seen that "**Access Token and Secret**" were created with the "**Read and Write**" permissions:

![Verify Permissions For Access Token And Secret](/img/screenshot-2021-09-12-at-10.00.25.png "Verify Permissions For Access Token And Secret")

Finally, we have everything to move to the most fun part of this tutorial - coding.

We will create a Node.js application, since it is not safe to integrate directly with the Twitter API from the React application.

Why? Because we need to use all the generated tokens, keys and secrets and it is not safe to store them on the client side, since in this case they are visible to everyone, which is definitely not what we want.

We need to have a Proxy API that communicates with the Twitter API and stores all sensitive data for us.

## Twitter API Integration

Initialize a new project with the default settings:

`npm init -y`

Install the Twitter client for Node:

`yarn add twit`

And a module that loads environment variables from **.env** file to the **process.env**:

`yarn add dotenv`

That's it, now create **.env** file in the root of your project with the following content:

```javascript
API_KEY=
API_SECRET=
ACCESS_TOKEN=
ACCESS_TOKEN_SECRET=
```

Add the saved keys to the above file and save it.

Next, create **index.js** file in the root of your project and import installed dependencies:

```javascript
const Twit = require("twit");
const dotenv = require("dotenv");
dotenv.config();
```

The next step is to create a Twitter client, passing all the keys as parameters:

```javascript
// ...

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});
```

Finally, create a function that is responsible for integration with the Twitter API and posting a tweet:

```javascript
// ..

const tweet = () => {
  const text = "Hey!";

  const onFinish = (err, reply) => {
    if (err) {
      console.log("Error: ", err.message);
    } else {
      console.log("Success: ", reply);
    }
  };

  T.post("statuses/update", { status: text }, onFinish);
};

tweet();
```

And that's it!

We used "**statuses/update**" method, which is described in the [official documentation](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update).

Read it to find out what other parameters we could have added to make a tweet containing even more information that just a plain text.

Finally, open the **package.json** file and add a new script to run an application:

```json
// ...

"scripts": {
  "start": "node ./index.js",
  // ...
},

// ...
```

## Verify The Result

To verify the result, run the application:

`yarn start`

If the are no errors in the console, open Twitter, navigate to the Profile and see a newly created Tweet:

![Twit Posted Programatically](/img/screenshot-2021-09-12-at-10.29.31.png "Twit Posted Programatically")

Pretty cool, huh?

Imagine what else could be done using the Twitter API, which is really easy-to-use and well documented.

## Summary

Congratulations on creating your first Twitter Bot that posts a Tweet for you.

I suggest to start reading the [official Twitter API documentation](https://developer.twitter.com/en/docs) and playing around with the Twitter API to see what else can be automated, so your business can benefit from that.

The vast majority of other social networks have their APIs and allow to do similar things, so by learning one (Twitter), you know how to handle others as well.