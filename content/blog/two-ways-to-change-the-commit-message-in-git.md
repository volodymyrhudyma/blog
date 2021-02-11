---
title: Two Ways To Change The Commit Message In Git
tag:
  - Other
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-13T21:25:32.600Z
---
Often you can find yourself in a situation where you misspelled the commit message being in a hurry to deliver a new feature.

While this is not any kind of a serious problem, it is nice to keep your commits history clean and understandable.

In this article, we will learn two ways to do it.

## Way 1: git commit --amend

The most recent commit message can be changed by using `git commit --amend -m "<New message>"` command.

This command will overwrite an existing commit with a completely new one with a different hash.

Let's see it in action:

![Git Commit Amend Command](/img/screenshot-2021-02-11-at-22.37.49.png "Git Commit Amend Command")

* Change the **App** component
* Add all changes and commit them with the following message: "Change App copmonent" (commit hash: **05679c9074cd6ec514beb98ee15830b0ca557278**)
* Notice a mistake and alter the commit (altered commit hash: **55fff7682f0997aeb99751d90c6f3d73081b8fcf**)

As you have noticed, the commit hash has changed which basically means that the old commit was deleted and a new one has been created.

If your commit exists only locally, everything is fine and you can push your branch to Github (**git push origin main**).

But what if you have already pushed a commit that contains a mistake and changed it with an amend command?

You can force push it (**git push origin main -f**) and it will be overwritten, but be careful with force pushes.

If someone depends on your branch, they would have to fix their history.

## Way 2: Interactive Rebase

If it is necessary to change the commit message for an old one or a bunch of commits, then an interactive rebase can be used:

`git rebase -i HEAD~n`

Where **n** is the number of commits to display.

Let's add a few commits and try to change the messages: