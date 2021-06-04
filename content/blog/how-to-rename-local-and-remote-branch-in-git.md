---
title: How To Rename Local And Remote Branch In Git?
tag:
  - Git
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-06-04T06:29:03.323Z
---
In some cases, for example when you named a branch that doesn't follow the project standard, you need to rename it.

It is super easy task, but often the developers forget how the command or the exact arguments order and they need to google it.

## Rename A Local Branch

To rename a local branch, follow these steps:

* **Switch to a branch you want to rename**

```gitconfig
git checkout <old_name>
```

* **Rename a branch**

```gitconfig
git branch -m <new_name>
```

The **\-m** flag stands for **move** and it is used to move/rename a branch and a corresponding reflog entry.

If the branchwith a **new_name** already exists, you should use **\-M** (**\--move** **\--force**) flag to force rename.

## Rename Branch Without Switching

Sometimes, you can't switch to the branch you want to rename.

The good thing is that you don't have to, use following command:

```gitconfig
git branch -m <old_name> <new_name>
```

## Rename A Remote Branch

If you managed to push the branch you want to rename to the remote, then things get slightly more complicated, because you need to remember to change the upstream as well.

Given you renamed the branch locally:

* **Push it to remote** (with **\-u** option):

```gitconfig
git push origin -u <new_name>
```

* **Delete old branch on remote**

```gitconfig
git push origin -d <old_name>
```

## Summary

Working with branches in Git is an essential part of successful software development process and knowing how to rename them properly is a must, since mistakes happen way too often.

Renaming a local branch is a matter of executing only one command, but if the branch has been pushed to remote, then you need to push the renamed local branch and delete the branch with an old name.