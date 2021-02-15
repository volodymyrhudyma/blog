---
title: Delete A Branch In Git
tag:
  - Other
promote: false
metaDescription: Learn how to delete git branch, both local and remote and how
  to restore them by using reflog command.
teaser: Nowadays, it is hard to imaging product development without using Git
  branches to deliver a part of the functionality. A branch is an independent
  line of development that is used in order to not mess with the...
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

If the branch has been pushed to remote, you can use the following command to delete it:

`git push origin --delete <name>`

Example:

![Git Delete Remote Branch](/img/screenshot-2021-02-15-at-22.45.43.png "Git Delete Remote Branch")

Note, that the branch would not be deleted locally.

## Undo Branch Delete

If you accidentally deleted a local branch with some important changes, you can restore the changes by using the combination of the following commands:

`git reflog`

And

`git reset --hard HEAD@{n}`

Create a branch and delete it:

![Create And Delete Git Branch](/img/screenshot-2021-02-15-at-22.50.25.png "Create And Delete Git Branch")

Use reflog to see what has been recently done:

![Git Reflog Output](/img/screenshot-2021-02-15-at-22.52.48.png "Git Reflog Output")

And recover the commit:

![Git Recover Deleted Commit](/img/screenshot-2021-02-15-at-22.55.42.png "Git Recover Deleted Commit")

## Summary