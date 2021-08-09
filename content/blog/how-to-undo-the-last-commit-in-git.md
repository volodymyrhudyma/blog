---
title: How To Undo The Last Commit In Git?
tag:
  - Git
promote: false
metaDescription: Learn a few easy ways to undo the last commit in Git using the
  git reset command with different flags (--soft, --hard, --mixed).
shareImage: /img/undo-last-commit-in-git.jpg
teaser: One of the most common tasks when collaborating with other developers
  using Git is adding and removing commits. While adding commits is a relatively
  simple task, undoing incorrect or unnecessary commits can cause problems...
date: 2021-08-12T07:49:31.125Z
---
One of the most common tasks when collaborating with other developers using Git is adding and removing commits.

While adding commits is a relatively simple task, undoing incorrect or unnecessary commits can cause problems.

Before you undo a commit, make sure you really need to do so, and not just edit the commit message.

If you want to edit a commit message, read one of my [previous articles](/two-ways-to-change-a-commit-message-in-git/) that explains how to change a commit message in Git.

## Undo The Last Commit

To undo the last commit, use one of the following commands:

`git reset --soft HEAD~1`

Or

`git reset --hard HEAD~1`

Or

`git reset HEAD~1` / `git reset --mixed HEAD~1`

They are pretty similar, with only one difference - the use of **\--soft**, **\--hard** or **\--mixed** flag.

#### \--soft

Does not touch the index file or working tree at all (but resets the head to the previous commit, like all modes). 

This leaves all changed files as "Changes to be committed":

![Git Soft Reset](/img/screenshot-2021-08-09-at-10.51.42.png "Git Soft Reset")

#### \--hard

Resets the index and working tree. 

All changes to tracked files in the working tree for the previous commit are discarded:

![Git Hard Reset](/img/screenshot-2021-08-09-at-10.53.08.png "Git Hard Reset")

#### \--mixed

Mixed is the default option, so if you simply run **git reset HEAD~1**, this option will be used.

Resets the index but not the working tree (i.e., the changed files are preserved but not marked for commit) and reports what was not updated:

![Git Mixed Reset](/img/screenshot-2021-08-09-at-11.00.18.png "Git Mixed Reset")

## Undo Multiple Commits

If you want to revert multiple commits, you can specify either the number of commits or the commit hash you want to revert to.

Let's say we want to revert the last 3 commits:

`git reset --hard HEAD~3`

Or

`git reset --hard <hash>`

Let's use the first command:

![Git Hard Reset Last 3 Commits](/img/screenshot-2021-08-09-at-11.04.58.png "Git Hard Reset Last 3 Commits")

And the second one:

![Git Hard Reset Last 3 Commits [2]](/img/screenshot-2021-08-09-at-11.06.15.png "Git Hard Reset Last 3 Commits [2]")

## Summary

In this article, we learned how to undo one or more commits in Git by using the **git reset** command and giving it different flags, depending on whether you want to keep the changes or not.

Before you undo a commit, make sure you really need to do so, and not just edit the commit message.

If you want to edit a commit message, read one of my [previous articles](/two-ways-to-change-a-commit-message-in-git/) that explains how to change a commit message in Git.

Read my other articles about Git:

* [Top 5 Git Commands For Experienced Developers](/top-5-git-commands-for-experienced-developers/)
* [How To Delete And Restore Branches In Git?](/how-to-delete-and-restore-branches-in-git/)
* [Git Push To Multiple Repositories](/git-push-to-multiple-repositories/)
* [How To Rename Local And Remote Branch In Git?](/how-to-rename-local-and-remote-branch-in-git/)
* [Git Stash Like A Pro](/git-stash-like-a-pro/)