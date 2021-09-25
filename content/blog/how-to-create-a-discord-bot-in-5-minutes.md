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