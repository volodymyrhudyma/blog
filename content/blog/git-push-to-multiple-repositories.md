---
title: Git Push To Multiple Repositories
tag:
  - Git
promote: false
metaDescription: Learn an easy way to push the changes to multiple repositories
  (remotes) at once using Git.
teaser: Git is probably the best tool for version control and successful
  collaboration of the development team. Typically, developers keep the codebase
  in one place, like GitHub or GitLab, but in some cases it may be needed to
  work with the project that is stored in different locations and keep...
date: 2021-05-07T17:48:19.335Z
---
Git is probably the best tool for version control and successful collaboration of the development team. 

Typically, developers keep the codebase in one place, like GitHub or GitLab, but in some cases it may be needed to work with the project that is stored in different locations and keep both of them in sync.

Today, after setting up two repositories, we will try to push the changes to both of them simultaneously with just one command.

## Push To Multiple Repositories

I have just created two empty repositories:

* GitLab - https://gitlab.com/vhudyma/original
* GitHub - https://github.com/volodymyrhudyma/copy

Let's assume that we develop a project and the client wants to have it on Gitlab, but for some reason we want to have the exact same copy on the GitHub.

From the root folder of your project, add both of your repositories to remotes:

```gitconfig
git remote add original git@gitlab.com:vhudyma/original.git
git remote add copy git@github.com:volodymyrhudyma/copy.git
```

> The **git remote** command is one piece of the broader system which is responsible for syncing changes. Records registered through the **git remote** command are used in conjunction with the **git** fetch, **git** push, and **git** pull commands.

Execute the **git remote -v** command to make sure that both remotes are successfully added:

```gitconfig
git remote -v

...

copy    git@github.com:volodymyrhudyma/copy.git (fetch)
copy    git@github.com:volodymyrhudyma/copy.git (push)
original    git@gitlab.com:vhudyma/original.git (fetch)
original    git@gitlab.com:vhudyma/original.git (push)
```

When listing remotes, we specified the **\-v** flag, which shows the URLs that Git has stored for the shortname to be used when reading and writing to that remote.

Now, you are able to push to the selected remote by specifying it in the **git push** command:

```gitconfig
git push original master
git push copy master
```

Now we know how to push changes to each repository separately, but how to push to both at once?

#### Step 1: Create a new remote named "all", and add GitLab and GitHub URLs to it

```gitconfig
git remote add all git@gitlab.com:vhudyma/original.git
git remote set-url all --add --push git@gitlab.com:vhudyma/original.git
git remote set-url all --add --push git@github.com:volodymyrhudyma/copy.git

...

all     git@gitlab.com:vhudyma/original.git (fetch)
all     git@gitlab.com:vhudyma/original.git (push)
all     git@github.com:volodymyrhudyma/copy.git (push)
copy    git@github.com:volodymyrhudyma/copy.git (fetch)
copy    git@github.com:volodymyrhudyma/copy.git (push)
original    git@gitlab.com:vhudyma/original.git (fetch)
original    git@gitlab.com:vhudyma/original.git (push)
```

#### Step 2: Push the changes to the "all" remote

```gitconfig
git push all master
```

And the change appears in both repositories.

## Summary

In this article, we figured out how to push code changes to multiple repositories in an easy way.

This is very helpful when your team has to maintain a few copies of the project in different locations.

To sum up, all you need to do is:

* Add a new remote "**all**" with multiple push urls
* Push the changes to it