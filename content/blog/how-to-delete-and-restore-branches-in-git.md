---
title: How To Delete And Restore Branches In Git?
tag:
  - Git
promote: false
metaDescription: Learn how to delete Git branches, both local and remote, and
  how to restore them using the reflog command.
shareImage: /img/manage-branches-git-min.jpg
teaser: Nowadays, it's hard to imagine product development without using Git
  branches to deliver a part of the functionality. A branch is an independent
  line of development used in order not to interfere with the main line, which
  can...
date: 2021-02-17T21:17:43.819Z
---
Nowadays, it's hard to imagine product development without using Git branches to deliver a part of the functionality.

A branch is an independent line of development used in order not to interfere with the main line, which can even be used in production.

There is no limit to the number of branches you can have, but it is a good practice to delete the unused branches, both locally and on Github.

Today we'll learn how to delete local and remote Git branches, and also how to undo the delete operation if needed.

## Delete Local Branch

If the branch has not been pushed to the remote, it can be easily deleted with the following command:

`git branch -d <name>`

Let's create a new branch **feat/feature** and delete it:

![Git Delete Branch](/img/screenshot-2021-02-15-at-22.30.45.png "Git Delete Branch")

However, there are a few cases where Git refuses to delete your local branch:

* When you are on the branch you want to delete

![Git Delete Branch Fail [1]](/img/screenshot-2021-02-15-at-22.31.41.png "Git Delete Branch Fail [1]")

* When it contains commits that have not been merged into another branch or pushed to remote

![Git Delete Branch Fail [2]](/img/screenshot-2021-02-15-at-22.34.06.png "Git Delete Branch Fail [2]")

If there was no protection, you could have accidentally deleted the branch and lost all your data.

But if you are really sure that you want the unmerged branch to be deleted anyway, you can use the following command:

`git branch -D <name>`

Example:

![Git Delete Unmerged Branch](/img/screenshot-2021-02-15-at-22.37.00.png "Git Delete Unmerged Branch")

## Delete Remote Branch

If the branch has been pushed to remote, you can delete it with the following command:

`git push origin --delete <name>`

Example:

![Git Delete Remote Branch](/img/screenshot-2021-02-15-at-22.45.43.png "Git Delete Remote Branch")

Note that the branch is not deleted locally.

## Undo Branch Delete

If you have accidentally deleted a local branch with some important changes, you can restore the changes with a combination of the following commands:

`git reflog`

And

`git checkout -b <name> <hash>`

Create a branch and delete it:

![Create And Delete Git Branch](/img/screenshot-2021-02-15-at-22.50.25.png "Create And Delete Git Branch")

Use reflog to see what has been done recently:

![Git Reflog Output](/img/screenshot-2021-02-15-at-22.52.48.png "Git Reflog Output")

And create a new branch with the deleted commit:

![Git Recover Deleted Commit](/img/screenshot-2021-02-15-at-23.01.42.png "Git Recover Deleted Commit")

## Summary

In this article, we learned how to delete local and remote Git branches and also how to undo the deletion if it happened accidentally.

Be sure to play around with the commands to learn and understand them better.