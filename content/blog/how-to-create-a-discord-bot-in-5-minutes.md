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
:Bots became increasingly popular in the last few years, because they allow to automate a lot of things that previously people had to do manually.

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

It's now offline, but don't worry, we will change that in the next section.

## \#3 - Create Node Application

Create a new folder for the project:

`mkdir discord-bot`

Enter the folder:

`cd discord-bot`

Initialize a new project:

`npm init`

Install necessary libraries:

`yarn add discord.js dotenv`

* [discord.js](https://www.npmjs.com/package/discord.js) - a powerful Node.js module that allows you to easily interact with the Discord API
* [dotenv](https://www.npmjs.com/package/dotenv) - library that loads environment variables from **.env** file into **process.env**

Having all that done, we can start writing the logic for our bot.

Create **index.js** file in the root directory of the project with the following content:

```javascript
const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS, 
    Discord.Intents.FLAGS.GUILD_MESSAGES
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.CLIENT_TOKEN);
```

Create **.env** file and put the token we copied earlier inside:

```javascript
CLIENT_TOKEN=<YOUR_COPIED_TOKEN>
```

And run the project:

`node index.js`

If everything was done correctly, you should see the confirmation message in the console:

![Console Confirmation Log](/img/screenshot-2021-09-25-at-13.25.48.png "Console Confirmation Log")

And the status of the bot should be "ONLINE" now:

![Bot Is Online](/img/screenshot-2021-09-25-at-13.27.51.png "Bot Is Online")

## \#4 - Add Custom Command

The bot has been set up, but it can't do anything useful yet, so let's change it.

Typically, the very first thing people implement when creating bots is the "Ping - Pong" thingy.

You type "Ping", the bot replies with "Pong" - as simple as that.

Add the following code to the **index.js** file:

```javascript
client.on("message", (message) => {
  if (message.content === "Ping") {
    message.reply("Pong");
  }
});
```

Restart the application and send a new message containing "Ping" to the bot in Discord: