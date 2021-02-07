---
title: Top 5 Git Commands For Experienced Developers
tag:
  - Other
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-02-10T09:35:15.628Z
---
Most applications cannot be successfully developed by one person - they usually require the collaboration of a few developers that work and share the same code.

To make the development easier and more robust - a version control system is needed that keeps track of all the changes made by the team members, even if a few of them worked with the same files.

Mastering Git commands is a must-have skill for successful collaboration and code delivery.

Today we will learn the top 5 git commands every experienced developer should know.

We will skip the basic commands, like **git config**, **git clone**, etc assuming that you used and know them.

## git cherry-pick

This command is extremely helpful for applying the changes from a specific commit by creating a new commit on the active branch.

`git cherry-pick <commit>`

Or skipping creating a commit if further changes to the applied code needed:

`git cherry-pick -n <commit>`

#### Example Usage

Imagine working with a component that displays a formatted date. The component is finished, but it is using the native **Date** object in JavaScript.

Suddenly you realize that someone from your team just added a library for handling dates, let's say [dayjs](https://www.npmjs.com/package/dayjs), and created a nice service that can be used in your component.

The code is not yet merged to the **dev** branch, it is still hanging as a Pull Request in Github, however, it got approved by your colleagues.

You can either wait for it to be merged, but what if the author is out of the office?

That's the moment cherry-pick comes into play.

Locate the commit that adds date handling service:

...

Copy its hash, navigate to the terminal and execute the following command:

...

And the changes are applied to your branch and can be used immediately:

...

## git reset

## git merge

## git rebase

## git reflog