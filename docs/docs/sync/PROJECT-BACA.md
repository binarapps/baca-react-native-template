---
id: sync-project-with-baca
slug: /sync/project-baca
title: PROJECT ← BACA
sidebar_position: 2
tags:
  - Bootstrap
  - Create new app
  - Quick start
  - Getting started
  - Project structure
description: Sync your project with baca
---

import Details from '@site/src/components/Details'

# Synchronize your project with BACA

:::warning
This was not tested, probably will not work as expected
:::

:::warning
You need to have git history from BACA, to make this working.
:::

## Step 1. Add baca git remote

```bash
git remote add baca git@github.com:binarapps/baca-react-native-template.git
```

## Step 2. Fetch changes from all remotes

This will fetch baca remote

```bash
git fetch --all
```

## Step 3. Sync changes

```bash
git checkout -b sync/baca
git merge baca/main --strategy-option ours
git push --set-upstream origin sync/baca
```

## Step 4. Merge branches

You have two ways to do that:

1. Create pull request
2. Merge branch locally

```bash
git checkout main
git merge origin/sync/baca
```
