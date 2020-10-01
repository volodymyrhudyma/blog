---
title: Yarn vs. Npm in 2020
tag:
  - Other
metaDescription: // META
teaser: // TEASER
date: 2020-10-02T16:39:17.688Z
---
In the JavaScript world, people share millions of pieces of code in order to avoid spending time on some necessary functionalities, which are already done by others.

Shared code, in turn, may depend on another piece of shared code and so on.

All these dependencies are managed by package managers, the primary function of which is to install some code from a global registry into an engineer's local environment.

Both, **yarn** and **npm**, are package managers for JavaScript applications.

## Npm

**Npm** is a default package manager for Node.js runtime environment.

It was written in JavaScript and initially released in January 2010 by Isaac Z. as a result of having "*seen module packaging done terribly*" and with inspiration from other similar projects such as PEAR (PHP) and CPAN (Perl).

It consists of the command line client and online database of private and public packages called the npm registry.

This registry is accessed via the client, and all available packages can be browsed via the [npm website](https://www.npmjs.com/).

The package manager belongs to npm, Inc. that was acquired by the Github in March 2020.

## Install npm

Npm is installed automatically with Node.js.

There are a few ways of installing it on your system:

* Using **nvm** (Node Version Manager) -> the recommended approach

  Refer to [this article](https://tecadmin.net/install-nodejs-with-nvm/) for the full guide.
* Using Node installer -> can lead to permission errors

  Download and install Node.js from [here](https://nodejs.org/).

In order to verify the installation, execute the following commands:

`node -v`

And

`npm -v`

If they work and print the version installed, everything is fine:

![Npm version check](/img/screenshot-2020-10-01-at-22.26.33.png "Npm version check")

## Yarn

**Yarn** is a package manager developed by Facebook as an alternative to npm.

Do not think of this tool as a replacement for the npm, as it relies on the modules from the npm registry (you use it to install the dependencies hosted on npm, right?).

Consider it as a new installer that relies on the same npm structure and has a different installation method.

It was developed when the team of Facebook developers faced some npm limitations.

> Many of our projects at Facebook, like React, depend on code in the npm registry. However, as we scaled internally, we faced problems with consistency when installing dependencies across different machines and users, the amount of time it took to pull dependencies in, and had some security concerns with the way the npm client executes code from some of those dependencies automatically. We attempted to build solutions around these issues, but they often raised new issues themselves...

Read more about the reasons for creating yarn [here](https://engineering.fb.com/web/yarn-a-new-package-manager-for-javascript/).

## Latest versions comparison

According to these [benchmarks](https://github.com/pnpm/benchmarks-of-javascript-package-managers), the latest versions of npm and yarn are not much different in terms of speed.

In general, yarn tends to be a little faster than the npm in the most popular use cases.

But if you really care about the performance - consider using **[pnpm](https://github.com/pnpm/pnpm)** instead.

## The Differences

The main differences between npm and yarn are:

* **Npm** is installed automatically with Node.js, **yarn** has to be installed manually.
* N**pm** has 17.2K stars on Github, **yarn** has 39K (at the moment this article is written).
* The latest **yarn** version is a little faster than the latest **npm** for most cases.

  In the past, **yarn** was much, much faster, until the **npm** version **5.0** came out, which claims to be 5x times faster than its previous versions.
* Y**arn** is more secure because **npm** automatically executes a code which allows other packages to get included in the fly.

  Yarn installs those files which are only from the **yarn.lock** or **package.json** files. 

  It has been deemed as a more secure solution.
* **Npm** generates **package-lock.json** file, **yarn** generates **yarn-lock.json.**
* **Npm** uses **\-g** flag to install package globally, **yarn** uses the word **global.**

  Global installation drops modules in `{prefix}/lib/node_modules`, and puts executable files in `{prefix}/bin`, where `{prefix}` is usually something like `/usr/local`. 

  It also installs man pages in `{prefix}/share/man`, if they are supplied.

  > **A man page** (short for **manual page**) is a form of software documentation usually found on a Unix or Unix-like operating system.

  The local installation installs your package in the current working directory. Node modules end up in `./node_modules`, executables are put in `./node_modules/.bin/`, and man pages are not installed at all.
* **Yarn** has **why** command which checks why dependency is present in the project.

  It also checks which other packages depend upon it, or whether it was explicitly marked as a dependency in the **package.json** manifest.
* **Yarn** allows checking the licenses for all installed packages using the **yarn licenses list** command.

  After this command has been executed, yarn will print out all installed packages in alphabetical order along with the license information.
* Both package managers have a cache, but, according to the benchmarks, **yarn** cache is faster.

## Summary

Both tools are great to be used for managing the project dependencies.

Yarn brings some improvements, like more security or a little better speed and some new commands, like checking why the given package is installed and printing out the licenses for each installed dependency.

That is why I personally prefer to use it over the npm.