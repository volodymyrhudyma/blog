---
title: Delete A Branch In Git
tag:
  - Other
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-18T21:17:43.819Z
---
Nowadays, it is hard to imaging product development without using Git branches to deliver a part of the functionality.

A branch is an independent line of development that is used in order to not mess with the main line that can be even used in production.

There is no limit in the number of branches you can have, but it is a good practice to delete the unused ones, both locally and on Github.

Today we will learn how to delete local and remote git branches, and also how to undo the delete operation if needed.

## Delete Local Branch

If the branch has not been pushed to the remote, it can easily be deleted with the following command:

`git branch -d <name>`

Let's create a new branch **feat/feature** and delete it:

![Git Delete Branch](/img/screenshot-2021-02-15-at-22.30.45.png "Git Delete Branch")

However, there are a few cases when Git will refuse to delete your local branch:

* When you are at the branch you want to delete

![Git Delete Branch Fail [1]](/img/screenshot-2021-02-15-at-22.31.41.png "Git Delete Branch Fail [1]")

* When it contains commits that have not been merged into any other branch or pushed to remote

![Git Delete Branch Fail [2]](/img/screenshot-2021-02-15-at-22.34.06.png "Git Delete Branch Fail [2]")

If there was no protection, you could have accidentally deleted the branch and lose all your data.

But if you are really sure the unmerged branch should be deleted anyway, you can use the following command:

`git branch -D <name>`

Example:

![Git Delete Unmerged Branch](/img/screenshot-2021-02-15-at-22.37.00.png "Git Delete Unmerged Branch")

## Delete Remote Branch

## Undo Branch Delete

## Summary