---
title: Difference Between "git add -A", "git add ." and "git add -u"
tag:
  - Git
promote: false
metaDescription: Learn the difference between git add -A, git add . and git add -u commands.
shareImage: /img/git-add-a-vs-git-add-.-article.jpg
teaser: The very basic thing every developer does on a daily basis when working
  with Git is adding files to be committed. Most probably, the vast majority of
  us uses **git add -A** without the exact knowledge what is going on behind the
  scenes...
date: 2021-09-08T20:58:43.100Z
---
The most basic task any developer has when working with Git on a daily basis is adding files to be committed.

Probably the vast majority of us use **git add -A** without knowing exactly what is going on behind the scenes when we use the **\-A** flag, and whether there are not other options that suit our needs better.

## \#1 - "git add -A"

This command stages:

* All changes
* In all directories

It is equivalent to **git add --all**.

![Command: git add -A](/img/screenshot-2021-09-08-at-15.09.12.png "Command: git add -A")

## \#2 - "git add ."

This command stages:

* All changes
* In the current directory and its subdirectories (if a file has been changed outside the directory where you run the git commands, it will not be staged)

![Command: git add .](/img/screenshot-2021-09-08-at-15.11.19.png "Command: git add .")

## \#3 - "git add -u"

This command stages

* All modifications and deletions (**but no new files**)
* In all directories

It is equivalent to **git add --update**.

![Command: git add -u](/img/screenshot-2021-09-08-at-15.12.20.png "Command: git add -u")

## Bonus Commands

#### \#1 - Stage A Single File

If you want to stage a single file, run the **git add** command, specifying the path to the file:

`git add src/components/Button/Button.tsx`

#### \#2 - Stage All Files Within A Specific Folder

If you want to stage all files inside a specific folder, specify the path to that folder:

`git add src/components/`

#### \#3 - Stage All Files With A Specific Extension

If you want to stage all files with a specific extension, for example **.txt**, run the following command:

`git add -A *.txt`

#### \#4 - Stage All Files But Removed

If you want to stage all files excluding deleted, run the following command:

`git add --ignore-removal .`

## Summary

In this article, we have learned the main differences between the following commands: **git add -A**, **git add .** and **git add -u**.

You may never need to know the difference if you do not want to, as it is quite easy to restore an incorrectly deployed file using the **git restore --staged** command.