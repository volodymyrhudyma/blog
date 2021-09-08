---
title: Difference Between "git add -A", "git add ." and "git add -u"
tag:
  - Git
promote: false
metaDescription: // META
shareImage: /img/git-add-a-vs-git-add-.-article.jpg
teaser: The very basic thing every developer does on a daily basis when working
  with Git is adding files to be committed. Most probably, the vast majority of
  us uses **git add -A** without the exact knowledge what is going on behind the
  scenes...
date: 2021-09-08T20:58:43.100Z
---
The very basic thing every developer does on a daily basis when working with Git is adding files to be committed.

Most probably, the vast majority of us uses **git add -A** without the exact knowledge what is going on behind the scenes when we use **\-A** flag and whether there are another options which may better suit our needs.

## \#1 - "git add -A"

This command stages all changes in all directories.

It is equivalent to **git add --all**.

![Command: git add -A](/img/screenshot-2021-09-08-at-15.09.12.png "Command: git add -A")

## \#2 - "git add ."

This command stages all changes in the current directory and its subdirectories.

![Command: git add .](/img/screenshot-2021-09-08-at-15.11.19.png "Command: git add .")

## \#3 - "git add -u"

This command stages all modifications and deletions in all directories, but does not stage new files.

It is equivalent to **git add --update**.

![Command: git add -u](/img/screenshot-2021-09-08-at-15.12.20.png "Command: git add -u")

## Summary