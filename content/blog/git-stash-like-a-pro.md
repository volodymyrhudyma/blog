---
title: Git Stash Like A Pro
tag:
  - Git
promote: false
metaDescription: // META
shareImage: /img/git-stash-like-a-pro.jpg
teaser: // TEASER
date: 2021-07-18T08:44:14.759Z
---
Developer's work often gets interrupted with requests to implement more urgent features or even fix some critical bugs.

This situation leads to interrupting development and switching to another task, but what if you haven't managed to complete the current work and you are not ready to commit the changes?

You don't want to drop the changes and start over the next day, right?

Fortunately, Git provides a command for managing such situations in a simple way.

## Git Stash Command

The **git stash** command acts like a clipboard - it temporarily saves the current state of a working directory and reverts it, so you can start coding new features from scratch.

You can get back to stashed changes and re-apply them at any given point of time.

It is handy if you need to quickly switch context and work on something else without losing any unfinished work.

Remember, that **stash is local to your repository** - it is not transferred to the server after pushing the changes.

For example, I am working on a secret feature on a **feature/1** branch, when I receive a request to fix a bug, noticed by tester on production (in other words, on the **main** branch), but I am only half-done with my secret feature, so here is what I usually do:

* Check how many changes were done with a **git status** command:

![Git Status On A Secret Feature Branch](/img/screenshot-2021-07-17-at-11.55.24.png "Git Status On A Secret Feature Branch")

* Stash the changes with a **git stash** command:

![Git Stash On A Secret Feature Branch](/img/screenshot-2021-07-17-at-11.59.08.png "Git Stash On A Secret Feature Branch")

* Switch to the **main** branch with a **git checkout main** command and work on a bug fix:

![Git Checkout To The Main Branch](/img/screenshot-2021-07-17-at-12.01.44.png "Git Checkout To The Main Branch")

* Switch back to the **feature/1** branch after the bug has been finished and re-apply back stashed changes with a **git stash apply** command:

![Git Checkout To The Feature Branch And Re-Apply Stashed Changes](/img/screenshot-2021-07-17-at-12.03.27.png "Git Checkout To The Feature Branch And Re-Apply Stashed Changes")

## Staged And Unstaged Changes In Git

Before learning whether git stash works with both, staged and unstaged changes, let's learn what are staged and unstaged changes and how they differ.

#### Unstaged Changes

Unstaged changes are changes that exist in the working directory, but haven't been yet added to the Git version history:

![Git Unstaged Changes](/img/screenshot-2021-07-17-at-12.22.08.png "Git Unstaged Changes")

Git informs us that changes are unstaged with the following message: **Changes not staged for commit**.

#### Staged Changes

Staged changes are changes that are about to be committed the next time you execute **git commit** command. 

To move a file from unstaged to staged state, execute the **git add** command.

Staged changes are usually marked with a green color:

![Git Staged Changes](/img/screenshot-2021-07-17-at-12.28.10.png "Git Staged Changes")

#### Staged And Unstaged Changes In The Same File

It is also possible to have both, staged and unstaged changes in the same file:

![Git Staged And Unstaged Changes In The Same File](/img/screenshot-2021-07-17-at-12.32.22.png "Git Staged And Unstaged Changes In The Same File")

## Stashing Staged And Unstaged Changes

Now, after learning what are staged and unstaged changes, we can answer the question - **git stash** command saves both, staged and unstaged changes, but after re-applying them, all changes become unstaged:

![Git Stash Staged And Unstaged Changes](/img/screenshot-2021-07-17-at-12.38.07.png "Git Stash Staged And Unstaged Changes")

## Tracked And Untracked Files In Git

Now, after we know that **git stash** is able to work with both, staged and unstaged changes, we need to know if it works with both, untracked and tracked files.

But before answering that question, let's learn what are untracked and tracked files in Git.

#### Untracked Files

If you create a new file in your working directory, by default it will appear as untracked, because it is not in the Git version system.

I created a new **MyComponent.tsx** component and executed **git status** command:

![Git Untracked File](/img/screenshot-2021-07-17-at-12.45.38.png "Git Untracked File")

Git informs us that file is untracked with the following message: **Untracked files**.

#### Tracked Files

Tracked files are files that are about to be committed the next time you execute **git commit** command. 

To move a file from untracked to tracked state, execute the **git add** command.

Tracked files are usually marked with a green color:

![Git Tracked File](/img/screenshot-2021-07-17-at-12.48.14.png "Git Tracked File")

## Stashing Tracked And Untracked Files

By default, **git stash** command does not store untracked files:

![Git Stash Tracked And Untracked Files](/img/screenshot-2021-07-17-at-12.52.41.png "Git Stash Tracked And Untracked Files")

When we tried to stash untracked file, Git replied with a message: **No local changes to save**.

That's because untracked files are not in Git.

If the file is added to tracked by using **git add** command, it can be stashed and re-applied later:

![Git Stash Tracked File](/img/screenshot-2021-07-17-at-12.54.10.png "Git Stash Tracked File")

However, there is a magic flag that enabled stashing untracked files - (**\-u**, or **\--include-untracked**):

![Git Stash Untracked File](/img/screenshot-2021-07-17-at-12.57.19.png "Git Stash Untracked File")

## Stashing Ignored Files

Another good question is whether **git stash** works with ignored files (ignored file is a file that is tracked in a special file named **.gitignore**).

Obviously, by default it doesn't but we can make it work, again, by using a magic flag - (**\-a** or **\-all**).

Let's add newly added **MyComponent.tsx** to the **.gitignore**:

```javascript
// ..
MyComponent.tsx
```

And verify that it is indeed ignored (**git status** command shows that we only modified **.gitignore** file, but it doesn't show **MyComponent.tsx** as untracked file):

![Git Check If File Is Ignored](/img/screenshot-2021-07-17-at-13.13.49.png "Git Check If File Is Ignored")

Try to stash ignored file by executing **git stash -a** command and see that it has been re-applied after running **git stash apply**, even though it is ignored by Git.

## Apply Stashed Changes

Stashed changes can be applied with one of the following commands:

`git stash apply`

Or

`git stash pop`

They both do the same thing, however there is one important difference between them.

The first command (**git stash apply**) applies changes and does nothing after, while the second one (**git stash** **pop**) removes the changes from the stash list after applying them.

## List Stashed Changes

You are not limited to a single stash, instead you can run **git stash** command a few times and create multiple stashes:

![Git Multiple Stashes](/img/screenshot-2021-07-17-at-13.39.47.png "Git Multiple Stashes")

To view all stashes, execute the following command:

`git stash list`

Note, that each stash is identified as WIP (Work In Progress) and a commit that the stash was created from:

![Git Stash List](/img/screenshot-2021-07-17-at-13.41.43.png "Git Stash List")

By looking at the stash list above, it is hard to guess what changes are included in each stash, so it is a good practice to provide a description for each stash.

## Describe Stash

Use the following command to add a description to the stash:

`git stash save "<message>"`

Let's do a small change in one file and stash it with a custom description:

![Git Stash With Custom Message](/img/screenshot-2021-07-17-at-13.45.37.png "Git Stash With Custom Message")

Now, it is much easier to guess what given stash is about.

## View Stash Changes

Sometimes it is necessary to view the details of a given stash to make sure that all changes are still valid and have to be applied.

It can be done with a following command:

`git stash show stash@{<index>}`

A shorthand to check the latest stash is:

`git stash show` (equals to `git stash show stash@{0}`)

Let's quickly check what changes were done in each stash from the list:

![Git View Stash Changes](/img/screenshot-2021-07-17-at-13.51.26.png "Git View Stash Changes")

If we want to dig even deeper and check what lines of code were modified, we can add a **\-p** or **\--patch** flag:

`git stash show -p`

Let's quickly check what lines of code were changes in the last stash:

![Git View Stash Changes With -p (Or --patch) Option](/img/screenshot-2021-07-17-at-13.54.31.png "Git View Stash Changes With -p (Or --patch) Option")