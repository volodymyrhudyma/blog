---
title: 2 Ways To Change A Commit Message In Git
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

Let's add 3 commits and try to change the messages:

![Git Interactive Rebase Command [1]](/img/screenshot-2021-02-11-at-23.13.07.png "Git Interactive Rebase Command [1]")

Click enter end you would end up on the following screen:

![Git Interactive Rebase Command [2]]( "Git Interactive Rebase Command [2]")

Read the hints below the last commit and notice the following:

```gitconfig
# r, reword <commit> = use commit, but edit the commit message
```

Replace **pick** with **reword** for every commit you want to change message for:

![Git Interactive Rebase Command [3]](/img/screenshot-2021-02-11-at-23.18.46.png "Git Interactive Rebase Command [3]")

Save and close this file.

Afterwards, you will see a commit file for each changed commit.

Change the message, them save and close each of them:

![Git Interactive Rebase Command [4]](/img/screenshot-2021-02-11-at-23.19.58.png "Git Interactive Rebase Command [4]")

![Git Interactive Rebase Command [5]](/img/screenshot-2021-02-11-at-23.22.06.png "Git Interactive Rebase Command [5]")

And you are done. Check the terminal for a success message:

![Git Interactive Rebase Command [5]](/img/screenshot-2021-02-11-at-23.22.49.png "Git Interactive Rebase Command [5]")

When you are done with the changes, force push them to Github over the old commits.

## Amend vs. Interactive Rebase

Altering commits with both "Interactive Rebase" and "Amend" results in deleting old commits and creating new, with new hashes.

However, there is one important difference.

When doing interactive rebase, every commit that follows the changed commit will get a new hash, because each commit contains the id of its parent.