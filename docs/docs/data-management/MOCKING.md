---
id: mocking-data
slug: /mocking-data
title: Mocking data
sidebar_position: 5
tags:
  - Backend
  - MSW
  - Mocking
  - react-query
  - axios
  - react native
  - orval
description: Mocking - check how to mock data from backend and display it for users
---

# Mocking data

This template uses [MSW](https://mswjs.io/docs) to mock data.

Mocks are automatically generated with orval script - you can check [docs here](/api-connection)

## Enabling mocks

Go to `App.tsx` and change `ENABLE_MOCKED_SERVER` variable from false to true

```tsx title="/App.tsx"
// FIXME: moking not working on mobile app - follow this discussion https://github.com/mswjs/msw/issues/2026
// error-line
const ENABLE_MOCKED_SERVER = false
// success-line
const ENABLE_MOCKED_SERVER = true

if (ENABLE_MOCKED_SERVER) {
  startMockedServer()
}
```

This will start msw server and api calls will be mocked!
