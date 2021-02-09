---
title: Top 5 Git Commands For Experienced Developers
tag:
  - Other
promote: false
metaDescription: Learn The Top 5 Git Commands Every Experienced Developer Should
  Know - cherry-pick, reset, merge, rebase and reflog.
teaser: Most applications cannot be successfully developed by one person - they
  usually require the collaboration of multiple developers working on and
  sharing the same code. To make development easier and more robust - a version
  control system is needed that...
date: 2021-02-09T09:35:15.628Z
---
Most applications cannot be successfully developed by one person - they usually require the collaboration of multiple developers working on and sharing the same code.

To make development easier and more robust - a version control system is needed that keeps track of all changes made by team members, even if some of them work with the same files.

Mastering Git commands is a must for successful collaboration and code delivery.

Today, we'll learn the 5 most important Git commands that every experienced developer should know.

We'll skip the basic commands like **git config**, **git clone**, etc. assuming you've already used them.

## git cherry-pick

This command is extremely useful for applying the changes from the particular commit by creating a new commit on the active branch.

`git cherry-pick <commit>`

#### Example

Imagine you are working with a component that displays a formatted date. 

The component is ready, but it uses the native **Date** object in JavaScript:

```javascript
const date = new Date("2020/12/31");

const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

// Output format: YYYY-MM-DD
console.log(formattedDate);
```

Suddenly you realize that someone in your team has just added a date handling library, say [dayjs](https://www.npmjs.com/package/dayjs), and created a nice service that can be used in your component.

The code is not yet included in the **main** branch, it is still hanging in Github as Pull Request, but has been approved by your colleagues.

You can either wait for it to be merged, but what if the author is out of the office?

That's when cherry-pick comes into play.

Find the commit that adds the date handling service:

![Add Date Service Commit](/img/screenshot-2021-02-07-at-12.14.24.png "Add Date Service Commit")

Copy its hash (from the URL), navigate to the terminal, and run the following command:

`git cherry-pick bf6dd0785e7524314a1088a3fabf99b7296458c8`

See that the command completed successfully:

![Cherry Pick In Terminal](/img/screenshot-2021-02-07-at-12.16.22.png "Cherry Pick In Terminal")

The changes are applied and can be used immediately:

```javascript
import { formatDate } from "./services/DateService";

const formattedDate = formatDate("2020/12/31");

// Output format: YYYY-MM-DD
console.log(formattedDate);
```

## git reset

This command allows the current branch to be reset to the specific commit.

#### Examples

* A file was accidentally added with the **git add** command and needs to be reverted

  Run the following command:

  `git reset`

![Git Add Revert](/img/screenshot-2021-02-07-at-12.50.21.png "Git Add Revert")

* A file was accidentally committed with the **git commit** command and needs to be undone, or you realized that commit was incomplete (we'll do a soft reset)

  Run the following command:

  `git reset --soft HEAD^`

![Git Commit Revert](/img/screenshot-2021-02-07-at-12.55.00.png "Git Commit Revert")

* Changes have been committed and you realize afterward that they are not really needed and have to be removed completely (we do a hard reset)

  Run the following command:

  `git reset --hard HEAD^`

![Git Commit Remove](/img/screenshot-2021-02-07-at-13.00.01.png "Git Commit Remove")

* Undoing a merge or rebase (hard reset)

  Run the following command:

  `git reset --hard HEAD@{<step>}`

![Git Undo Rebase](/img/screenshot-2021-02-07-at-13.08.20.png "Git Undo Rebase")

* Reset a local branch to the origin

  From time to time I forget that I'm working on the **main** branch instead of the feature branch, and I commit my changes.

  After I realize something is wrong, I reset my local **main** branch to the remote one with the following command:

  `git reset --hard origin/main`

![Git Reset Branch To Origin](/img/screenshot-2021-02-07-at-13.13.40.png "Git Reset Branch To Origin")

## git merge

![Git Merge](/img/git-merge.svg "Git Merge")

This command is used to join two or more branches together.

`git merge <branch>`

#### Example

Imagine you are developing a feature on a separate branch and in the meantime. the main branch has been updated by a team member with the changes you need.

Then the main branch needs to be merged into the feature branch:

![Git Merge Example](/img/screenshot-2021-02-07-at-14.26.41.png "Git Merge Example")

This creates a new merge commit containing the histories of both branches:

![Git Merge Commit](/img/screenshot-2021-02-07-at-14.27.02.png "Git Merge Commit")

To ensure that the history is preserved, let's check the histories of both branches before merging.

**main**

![Main Branch History](/img/screenshot-2021-02-07-at-14.25.07.png "Main Branch History")

**feat/new-date-service**

![Feature Branch History](/img/screenshot-2021-02-07-at-14.25.55.png "Feature Branch History")

Note that the **commit hashes are not changed** after the merge (they are still the same `...7d5` and `...e92` for the "Add date service" and "Add needed changes" commits, respectively).

## git rebase

![Git Rebase](/img/git-rebase.svg "Git Rebase")

This command allows two branches to be merged together, just like **git merge** with some important differences.

`git rebase <branch>`

#### Example

Rebase the feature branch to the main branch:

![Git Rebase Example](/img/screenshot-2021-02-07-at-14.29.57.png "Git Rebase Example")

Rebase rewrites the commit history by creating entirely new commits for each commit in the original branch:

![Git Rebase Overwritten History](/img/screenshot-2021-02-07-at-14.30.26.png "Git Rebase Overwritten History")

To ensure that new commits were created in the original branch, let's check the histories of both branches before rebasing.

**main**

![Git Main Branch History](/img/screenshot-2021-02-07-at-14.31.44.png "Git Main Branch History")

**feat/new-date-service**

![Git Feature Branch History](/img/screenshot-2021-02-07-at-14.32.57.png "Git Feature Branch History")

Note how the **commit hashes for the original branch were changed** after rebase (from `...17d` to `..ce6` for the "Add date service" commit).

One of the biggest advantages of using the rebase strategy instead of merge - is a clean commit history. 

Unnecessary merge commits are skipped.

## Merge vs. Rebase

![Git Merge vs. Git Rebase](/img/merge-rebase.png "Git Merge vs. Git Rebase")

Merging and rebasing are both intended to apply changes from one branch to another, however, there are some important differences between the two commands.

They do their work in different ways.

**Merge**:

* Adds a new merge commit
* Preserves history

**Rebase**:

* Does not add a new merge commit
* Overwrites history by creating new commits for each commit in the original branch

As mentioned earlier, one of the biggest advantages of using the rebase strategy instead of merge - is a clean commit history.

The second major advantage is a linear commit history, as seen in the image above, so it is easier to read the commit history with **git log**.

But you need to be careful when using rebase, as overwriting the project history can break your collaboration workflow.

Remember the **Golden Rule Of Rebasing** - never do it on **public branches**.

Read more about the differences between merge and rebase and the golden rule [here](https://dzone.com/articles/merging-vs-rebasing).

## git reflog

This command tracks when Git references have been updated locally.

`git reflog`

Reflogs are useful in various Git commands, to specify the old value of a reference. 

For example, **HEAD@{5}** means "where HEAD was five moves ago":

![Git Reflog Example](/img/screenshot-2021-02-07-at-16.23.06.png "Git Reflog Example")

Let us try to read a reflog above:

* I added a commit "Change App from main" to the **main** branch
* I switched to a **feat/app** branch
* I added a commit "Change App from feature branch" to the **feat/app** branch
* I started and finished a rebase by running **git rebase main** from the **feat/app** branch

Imagine that the rebase was done unnecessarily for some reason, so now it is necessary to restore the branch to its original state.

If you have the branch untouched on the remote, you can safely reset it:

`git reset --hard origin/feat/app`

But what if the branch exists only locally?

You can find a reference value before starting the rebase and reset to that point in time (**HEAD@{3}** for our example):

`git reset --hard HEAD@{3}`

Voila, you have just learned how to undo a rebase.

## Summary

Git is an extremely powerful tool and offers us a lot of possibilities.

There are many more important commands that every developer should know, but today we learned about some of the most popular ones (I use almost all of them daily!).

I know all of these commands are overwhelming at first, but with a lot of practice, you will eventually get good at each of them.