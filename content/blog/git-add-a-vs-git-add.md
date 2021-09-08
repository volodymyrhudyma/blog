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

This command stages:

* All changes
* In all directories

It is equivalent to **git add --all**.

![Command: git add -A](/img/screenshot-2021-09-08-at-15.09.12.png "Command: git add -A")

## \#2 - "git add ."

This command stages:

* All changes
* In the current directory and its subdirectories (if a file was changed outside of a directory you are running git commands from, it won't get staged)

![Command: git add .](/img/screenshot-2021-09-08-at-15.11.19.png "Command: git add .")

## \#3 - "git add -u"

This command stages

* All modifications and deletions (but does not stage new files)
* In all directories

It is equivalent to **git add --update**.

![Command: git add -u](/img/screenshot-2021-09-08-at-15.12.20.png "Command: git add -u")

## Bonus Commands

#### \#1 - Stage Single File

If you want to stage a single file, execute the **git add** command, providing the path to the file:

`git add src/components/Button/Button.tsx`

#### \#2 - Stage All Files Within A Specific Folder

If you want to stage all files inside of a specific folder, provide the path to the folder:

`git add src/components`

#### \#3 - Stage All Files With A Specific Extension

If you want to stage all files with a specific extension, let's say **.txt**, execute the following command:

`git add -A *.txt`

## Summary

In this article, we have learned the most important differences between the following commands: **git add -A**, **git add .** and **git add -u**.

You may never need to know the difference, if you don't want to, since it's fairly easy to restore incorrectly staged file by using the **git restore --staged <file>** command.