---
title: How To Undo The Last Commit In Git?
tag:
  - Git
promote: false
metaDescription: // META
shareImage: /img/undo-last-commit-in-git.jpg
teaser: One of the most common tasks when collaborating with other developers
  using Git is adding and removing commits. While adding commits is a relatively
  simple task, undoing incorrect or unnecessary commits can cause problems...
date: 2021-08-12T07:49:31.125Z
---
One of the most common tasks when collaborating with other developers using Git is adding and removing commits.

While adding commits is a relatively simple task, undoing incorrect or unnecessary commits can cause problems.

Before you undo a commit, make sure you really need to do it, and not just edit the commit message.

If you want to edit a commit message, see one of my [previous articles](/two-ways-to-change-a-commit-message-in-git/) that explains how to change a commit message in Git.

## Undo The Last Commit

To undo the last commit, use one of the following commands:

`git reset --soft HEAD~1`

Or

`git reset --hard HEAD~1`

Or

`git reset HEAD~1` / `git reset --mixed HEAD~1`

They are pretty similar, with just one difference - using **\--soft**, **\--hard** or **\--mixed** flag.

#### \--soft

Does not touch the index file or the working tree at all (but resets the head to the previous commit, just like all modes do). 

This leaves all your changed files "Changes to be committed":

![Git Soft Reset](/img/screenshot-2021-08-09-at-10.51.42.png "Git Soft Reset")

#### \--hard

Resets the index and working tree. 

Any changes to tracked files in the working tree for the previous commit are discarded:

![Git Hard Reset](/img/screenshot-2021-08-09-at-10.53.08.png "Git Hard Reset")

#### \--mixed

Mixed is the default option, which means that if you just run **git reset HEAD~1**, it will be used.

Resets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports what has not been updated:

![Git Mixed Reset](/img/screenshot-2021-08-09-at-11.00.18.png "Git Mixed Reset")

## Undo Multiple Commits

If you want to undo multiple commits, you can either provide the number of commits or specify the commit hash you want to reset to.

Let's pretend we want to remove 3 last commits:

`git reset --hard HEAD~3`

Or

`git reset --hard <hash>`

Let's use the first command:

![Git Hard Reset Last 3 Commits](/img/screenshot-2021-08-09-at-11.04.58.png "Git Hard Reset Last 3 Commits")

And the second one:

![Git Hard Reset Last 3 Commits [2]](/img/screenshot-2021-08-09-at-11.06.15.png "Git Hard Reset Last 3 Commits [2]")

## Summary