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

This command is extremely helpful for applying the changes from the specific commit by creating a new commit on the active branch.

`git cherry-pick <commit>`

Or skipping creating a commit if further changes to the applied code needed:

`git cherry-pick -n <commit>`

#### Example Usage

Imagine working with a component that displays a formatted date. The component is finished, but it is using the native **Date** object in JavaScript:

```javascript
const date = new Date("2020/12/31");

const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Output format: YYYY-MM-DD
console.log(formattedDate);
```

Suddenly you realize that someone from your team just added a library for handling dates, let's say [dayjs](https://www.npmjs.com/package/dayjs), and created a nice service that can be used in your component.

The code is not yet merged to the **dev** branch, it is still hanging as a Pull Request in Github, however, it got approved by your colleagues.

You can either wait for it to be merged, but what if the author is out of the office?

That's the moment cherry-pick comes into play.

Locate the commit that adds date handling service:

![Add Date Service Commit](/img/screenshot-2021-02-07-at-12.14.24.png "Add Date Service Commit")

Copy its hash (from the URL), navigate to the terminal, and execute the following command:

`git cherry-pick bf6dd0785e7524314a1088a3fabf99b7296458c8`

See that the command finished successfully:

![Cherry Pick In Terminal](/img/screenshot-2021-02-07-at-12.16.22.png "Cherry Pick In Terminal")

And the changes are applied to your branch and can be used immediately:

```javascript
import { formatDate } from "./services/DateService";

const formattedDate = formatDate("2020/12/31");

// Output format: YYYY-MM-DD
console.log(formattedDate);
```

## git reset

This command allows resetting the current branch to the specific commit.

#### Examples

* A file has accidentally been added by **git add** command and needs to be reverted:

![Git Add Revert](/img/screenshot-2021-02-07-at-12.50.21.png "Git Add Revert")

* A file has accidentally been committed by **git commit** command and needs to be reverted or you realized that commit was incomplete (we do a soft reset):

![Git Commit Revert](/img/screenshot-2021-02-07-at-12.55.00.png "Git Commit Revert")

* Changes have been committed and you realize afterwards that they are not really needed and have to be removed completely (we do a hard reset):

![Git Commit Remove](/img/screenshot-2021-02-07-at-13.00.01.png "Git Commit Remove")

* Undo a merge or rebase (hard reset):



## git merge

## git rebase

## git reflog