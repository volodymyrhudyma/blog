---
title: How To Create A Discord Bot In 5 Minutes?
tag:
  - Node
promote: false
metaDescription: // META
shareImage: /img/discord-bot.jpg
teaser: // TEASER
date: 2021-09-26T10:05:02.352Z
---
Bots became increasingly popular in the last few years, because they allow to automate a lot of things that previously people had to do manually.

This way we can save a tremendous amount of time and focus on the most important tasks instead of doing the routine.

Today we are going to build a skeleton for a Discord bot that can reply on a user message.

## \#1 - Create Discord Application

To begin with, we need a Discord Application.

Navigate to the <https://discord.com/developers/applications> (sign up or sign in if you haven't yet) and click on the "**New Application**" button or the right top:

![New Application In Discord](/img/screenshot-2021-09-25-at-12.37.08.png "New Application In Discord")

Provide the name and you will be redirected to the Application's dashboard page.

Click on the "**Bot**" menu item at the left of the page and then click "**Add Bot**" at the right:

![Add Bot In Discord](/img/screenshot-2021-09-25-at-12.38.24.png "Add Bot In Discord")

After adding a bot you will be redirected to the Bot dashboard page.

Find a "**TOKEN**" section and click "**Copy**" button to copy the token that will be needed to integrate with the Discord API later:

![Bot Dashboard In Discord](/img/screenshot-2021-09-25-at-12.40.29.png "Bot Dashboard In Discord")

**Important note:** don't share this token with anyone. If you accidentally did, it can be regenerated.

## \#2 - Add Bot To Server

To add bot to a server, you will first need to create it.

#### \#2.1 - Create Discord Server

Navigate to the Discord application and click on the "Plus" icon at the left of the page (when you will hover over this item, you will notice a tooltip "**Add a server**").

After clicking it, you will be asked to choose a template for the server, but let's click on "**Create my own**":

![Create Server Discord](/img/screenshot-2021-09-25-at-12.55.54.png "Create Server Discord")

The next step is to tell Discord whether this server is meant for you and your friends only or for larger community:

![Create Server Discord - Step 2](/img/screenshot-2021-09-25-at-12.56.02.png "Create Server Discord - Step 2")

You can select either option, but I will just skip this question for now.

Then you will be asked to provide a name for your server:

![Create Server Discord - Step 3](/img/screenshot-2021-09-25-at-12.56.13.png "Create Server Discord - Step 3")

I will stick to the default and click "**Create**".

Congratulations on creating your own Discord server:

![Own Discord Server](/img/screenshot-2021-09-25-at-12.52.45.png "Own Discord Server")

#### \#2.2 - Invite Bot To Join A Server

Return back to the Discord Developer Portal, navigate to "**OAuth2**", find "**SCOPE**" section and check "**Bot**":

![Discord Add Bot OAuth2 Scope](/img/screenshot-2021-09-25-at-13.00.48.png "Discord Add Bot OAuth2 Scope")

Take a look at the bottom of the "**SCOPES**" section - you've been given a generated URL.

Open it in a new tab and you will be redirected to the following page:

![Discord Add Bot To Server](/img/screenshot-2021-09-25-at-13.02.49.png "Discord Add Bot To Server")

Click "Select a server" dropdown and choose the server you want to invite bot to, click "Authorize", fill the captcha and your bot will appear on your server.

You should see a confirmation message:

![Discord Invite Bot Confirmation](/img/screenshot-2021-09-25-at-13.04.09.png "Discord Invite Bot Confirmation")

Now open a Discord application, navigate to your server and verify that the bot has been added correctly:

![Discord Bot On Server](/img/screenshot-2021-09-25-at-13.07.50.png "Discord Bot On Server")

It's now offline, but don't worry, we will change that soon.

## \#3 - Create Node Application