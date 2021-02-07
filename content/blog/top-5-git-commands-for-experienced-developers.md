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

#### Example

Imagine working with a component that displays a formatted date. The component is finished, but it is using the native **Date** object in JavaScript:

```javascript
const date = new Date("2020/12/31");

const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Output format: YYYY-MM-DD
console.log(formattedDate);
```

Suddenly you realize that someone from your team just added a library for handling dates, let's say [dayjs](https://www.npmjs.com/package/dayjs), and created a nice service that can be used in your component.

The code is not yet merged to the **main** branch, it is still hanging as a Pull Request in Github, however, it got approved by your colleagues.

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

* A file has accidentally been added by **git add** command and needs to be reverted

  Execute the following command:

  `git reset`

![Git Add Revert](/img/screenshot-2021-02-07-at-12.50.21.png "Git Add Revert")

* A file has accidentally been committed by **git commit** command and needs to be reverted or you realized that commit was incomplete (we do a soft reset)

  Execute the following command:

  `git reset --soft HEAD^`

![Git Commit Revert](/img/screenshot-2021-02-07-at-12.55.00.png "Git Commit Revert")

* Changes have been committed and you realize afterwards that they are not really needed and have to be removed completely (we do a hard reset)

  Execute the following command:

  `git reset --hard HEAD^`

![Git Commit Remove](/img/screenshot-2021-02-07-at-13.00.01.png "Git Commit Remove")

* Undo a merge or rebase (hard reset)

  Execute the following command:

  `git reset --hard HEAD@{<step>}`

![Git Undo Rebase](/img/screenshot-2021-02-07-at-13.08.20.png "Git Undo Rebase")

* Reset a local branch to the origin

  From time to time I forget that I work on the **main** branch instead of the feature branch and commit my changes.

  After I realize that something is wrong, I reset my local **main** branch to the remote with the following command:

  `git reset --hard origin/main`

![Git Reset Branch To Origin](/img/screenshot-2021-02-07-at-13.13.40.png "Git Reset Branch To Origin")

## git merge

![Git Merge](/img/git-merge.svg "Git Merge")

This command allows joining two or more branches together.

`git merge <branch>`

#### Example

Imagine you are developing a feature on a separate branch and in the meantime, the main branch was updated by a team member with the changes you need.

Then the main branch must be merged into the feature branch:

![Git Merge Example](/img/screenshot-2021-02-07-at-14.26.41.png "Git Merge Example")

This creates a new merge commit that contains the histories of both branches:

![Git Merge Commit](/img/screenshot-2021-02-07-at-14.27.02.png "Git Merge Commit")

To ensure that the history is preserved, let's check the histories of both branches before the merge.

**main**

![Main Branch History](/img/screenshot-2021-02-07-at-14.25.07.png "Main Branch History")

**feat/new-date-service**

![Feature Branch History](/img/screenshot-2021-02-07-at-14.25.55.png "Feature Branch History")

Note, how the **commit hashes are not changed** after the merge (still equal to `...7d5` and `...e92` for "Add date service" and "Add needed changes" commits respectively).

## git rebase

![Git Rebase](/img/git-rebase.svg "Git Rebase")

This command allows joining two branches together, just as **git merge** with some important differences.

`git rebase <branch>`

#### Example

Rebase the feature branch onto the main branch:

![Git Rebase Example](/img/screenshot-2021-02-07-at-14.29.57.png "Git Rebase Example")

Rebase rewrites commit history by creating brand new commits for each commit in the original branch:

![Git Rebase Overwritten History](/img/screenshot-2021-02-07-at-14.30.26.png "Git Rebase Overwritten History")

To ensure that the history is preserved, let's check the histories of both branches before the rebase.

**main**

![Git Main Branch History](/img/screenshot-2021-02-07-at-14.31.44.png "Git Main Branch History")

**feat/new-date-service**

![Git Feature Branch History](/img/screenshot-2021-02-07-at-14.32.57.png "Git Feature Branch History")

Note, how the **commit hashes for the original branch are changed** after the rebase (from `...17d` to `..ce6` for the "Add date service" commit).

One of the biggest benefits of using rebase strategy instead of merge - is a clean commit history. 

Unnecessary merge commits are skipped.

## Merge vs. Rebase

![Git Merge vs. Git Rebase](/img/merge-rebase.png "Git Merge vs. Git Rebase")

Merging and rebasing are both designed for applying changes from one branch into another, however, there are some important differences between the two commands.

They do their work in different ways.

**Merge**:

* Adds a new merge commit
* Preserves history

**Rebase**:

* Does not add a new merge commit
* Overwrites history by creating new commits for each commit in the original branch

As it was mentioned earlier, one of the biggest benefits of using rebase strategy instead of merge - is a clean commit history.

The second big benefit is a linear commit history, as it can be seen on the bottom image, so its easier to read commit history with **git log**.

But you need to be careful when using rebase, as overwriting project history can break your collaboration workflow.

Remember the **Golden Rule Of Rebasing** - never do it on **public branches**.

Read more about the differences between merge and rebase and the golden rule [here](https://dzone.com/articles/merging-vs-rebasing).

## git reflog

This command tracks when git references were updated locally.

`git reflog`

Reflogs are useful in various Git commands, to specify the old value of a reference. 

For example, **HEAD@{5}** means "where HEAD was five moves ago":

![Git Reflog Example](/img/screenshot-2021-02-07-at-16.23.06.png "Git Reflog Example")

Let's try to read a reflog above:

* I added a commit "Change App from main" to the **main** branch
* I switched to a **feat/app** branch
* I added a commit "Change App from feature branch" to the **feat/app** branch
* I started and finished a rebase by executing **git rebase main** from the **feat/app** branch

Imagine that for any reason the rebase was done unnecessarily, so now it is needed to roll the branch back to the original state.

If you have it untouched on the remote, then for sure you can execute:

`git reset --hard origin/feat/app`

To reset it to the remote state, but what if the branch exists only locally?

You can find a reference value before starting the rebase and reset to that moment (**HEAD@{3}** for our example):

`git reset --hard HEAD@{3}`

Voila, you just learned how to undo a rebase.

## Summary

Git is an extremely powerful tool and it provides us with a lot of possibilities.

There are many more important commands that every developer should know, but today we have learned some of the most popular ones (I use almost all of them on a daily basis!).

I know that at the beginning all of these commands are overwhelming, but with a lot of practice, you will eventually become good at each and every one of them.