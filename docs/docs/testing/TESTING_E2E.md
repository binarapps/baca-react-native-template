---
id: jotai
slug: /jotai
title: E2E tests - maestro
sidebar_position: 4
tags:
  - E2E
  - E2E tests
  - Testing
  - Maestro
description: E2E tests with maestro
---

# E2E tests with maestro

## Installing Maestro

To install Maestro, run the following :

```
# it's a simple npm script that runs the following command:  curl -Ls 'https://get.maestro.mobile.dev' | bash
yarn install-maestro
```

## Tutorial

<!-- TODO: Finish this tutorial  -->

1. Maestro works on normal apps that are already built on a device. This means we can skip the slow native builds by using Expo Go with `yarn start:e2e`.

Problem:

- Maestro tests are not running on clean app, that means if you were logged before we should logout user, fortunatelly we have solved making maestro e2e test: `logout-when-needed.yaml`
- Maestro tests for baca are build for expo go, that means we have to start server and build app before running tests. If you will not do that tests will not pass, because server is starting for ~1min and tests are runing instantly (the best option whould be to wait with tests, but for some reason maestro wait don't work properly)