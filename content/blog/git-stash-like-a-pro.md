---
title: Git Stash Like A Pro
tag:
  - Git
promote: false
metaDescription: // META
shareImage: /img/git-stash-like-a-pro.jpg
teaser: // TEASER
date: 2021-07-18T08:44:14.759Z
---
Developer's work often gets interrupted with requests to implement more urgent features or even fix some critical bugs.

This situation leads to interrupting development and switching to another task, but what if you haven't managed to complete the current work and you are not ready to commit the changes?

You don't want to drop the changes and start over the next day, right?

Fortunately, Git provides a command for managing such situations in a simple way.

## Git Stash Command

The **git stash** command acts like a clipboard - it temporarily saves the current state of a working directory and reverts it, so you can start coding new features from scratch.

You can get back to stashed changes and re-apply them at any given point of time.

It is handy if you need to quickly switch context and work on something else without losing any unfinished work.

Remember, that **stash is local to your repository** - it is not transferred to the server after pushing the changes.

For example, I am working on a secret feature on a **feature/1** branch, when I receive a request to fix a bug, noticed by tester on production (in other words, on the **main** branch), but I am only half-done with my secret feature, so here is what I usually do:

* Check how many changes were done with a **git status** command:

![Git Status On A Secret Feature Branch](/img/screenshot-2021-07-17-at-11.55.24.png "Git Status On A Secret Feature Branch")

* Stash the changes with a **git stash** command:

![Git Stash On A Secret Feature Branch](/img/screenshot-2021-07-17-at-11.59.08.png "Git Stash On A Secret Feature Branch")

* Switch to the **main** branch with a **git checkout main** command and work on a bug fix:

![Git Checkout To The Main Branch](/img/screenshot-2021-07-17-at-12.01.44.png "Git Checkout To The Main Branch")

* Switch back to the **feature/1** branch after the bug has been finished and re-apply back stashed changes:

![Git Checkout To The Feature Branch And Re-Apply Stashed Changes](/img/screenshot-2021-07-17-at-12.03.27.png "Git Checkout To The Feature Branch And Re-Apply Stashed Changes")