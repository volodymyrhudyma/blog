---
title: How To Rename Local And Remote Branch In Git?
tag:
  - Git
promote: false
metaDescription: Learn how to rename a branch in Git, both locally and on the
  remote. Renaming a branch is super easy, but we need to keep a few things in
  mind.
shareImage: /img/rename-branch-in-git.jpg
teaser: In some cases, such as when you have named a branch that does not
  conform to the project standard, you need to rename it. It's a super simple
  task, but often developers forget either the commands or the exact order of
  arguments and they have to...
date: 2021-06-04T06:29:03.323Z
---
In some cases, such as when you have named a branch that does not conform to the project standard, you need to rename it.

It's a super simple task, but often developers forget either the commands or the exact order of arguments and they have to spend time googling it.

## Rename Local Branch

To rename local branch, follow these steps:

* **Switch to a branch you want to rename**

```gitconfig
git checkout <old_name>
```

* **Rename a branch**

```gitconfig
git branch -m <new_name>
```

The **\-m** flag stands for (**\--move**) and it is used to move/rename a branch and a corresponding reflog entry.

If the branch with a **new_name** already exists, you should use **\-M** (**\--move** **\--force**) flag to force the rename.

#### One-Step Approach

Sometimes you can't move to the branch you want to rename.

The good thing is that you don't have to, use the following command:

```gitconfig
git branch -m <old_name> <new_name>
```

## Rename A Remote Branch

Once you've managed to push the branch you want to rename to the remote branch, things get a little more complicated because you have to remember to change the upstream as well.

Given you have renamed the branch locally:

* **Push it to the remote** (with **\-u**, or **\--set-upstream** option):

```gitconfig
git push origin -u <new_name>
```

* **Delete an old branch on remote**

```gitconfig
git push origin -d <old_name>
```

## Summary

Working with branches in Git is an essential part of a successful software development process and knowing how to rename them properly is a must, as mistakes happen far too often.

Renaming a local branch is a matter of just one command, but if the branch has been pushed to a remote, then you need to push the renamed local branch and delete the branch with the old name.