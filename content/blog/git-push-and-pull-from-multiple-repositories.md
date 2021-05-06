---
title: Git Push/Pull From Multiple Repositories
tag:
  - Git
promote: false
metaDescription: // META
teaser: // TEASER
date: 2021-05-07T17:48:19.335Z
---
Git is probably the best tool for version control and successful collaboration of the development team. 

Typically, developers keep the codebase in one place, like GitHub or GitLab, but in some cases it may be needed to work with the project that is stored in different locations and keep both of them in sync.

Today, after setting up two repositories, we will try to push and pull the changes from both of them simultaneously with just one command.

## Push To Multiple Repositories

I have just created two empty repositories:

* GitLab - https://gitlab.com/vhudyma/original
* GitHub - https://github.com/volodymyrhudyma/copy

Let's assume that we develop a project and the client wants to have it on Gitlab, but for some reason we want to have the exact same copy on the GitHub.

From the root folder of your project, add both of your repositories to remotes:

```gitconfig
git remote add original https://gitlab.com/vhudyma/original
git remote add copy https://github.com/volodymyrhudyma/copy
```

> The **git remote** command is one piece of the broader system which is responsible for syncing changes. Records registered through the **git remote** command are used in conjunction with the **git** fetch , **git** push , and **git** pull commands.

Execute the **git remote -v** command to make sure that both remotes are successfully added:

```gitconfig
git remote -v

...

copy	https://github.com/volodymyrhudyma/copy (fetch)
copy	https://github.com/volodymyrhudyma/copy (push)
original	https://gitlab.com/vhudyma/original (fetch)
original	https://gitlab.com/vhudyma/original (push)
```

## Pull From Multiple Repositories

## Summary