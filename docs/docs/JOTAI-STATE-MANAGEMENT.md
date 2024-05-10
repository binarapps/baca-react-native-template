---
id: jotai
slug: /jotai
title: State management - jotai
sidebar_position: 3
tags:
  - Jotai
  - State management
  - React
  - React Native
description: State management - jotai -
---

# State management - Jotai

## Description

This starter comes with jotai state management tool. Please check documentation on how it work in details:

- https://jotai.org/docs/introduction

## Examples

### Create atom

```tsx
import { atom } from 'jotai'

export const isSignedInAtom = atom<boolean | null>(null)

export const userAtom = atom<User | null>(null)
export const userNameAtom = atom<string | null>((get) => {
  const user = get(userAtom)
  const userName = user.userName

  return userName
})
```

### Get atom value

Get with hook

```tsx
import { useAtomValue } from 'jotai'
import { isSignedInAtom, userNameAtom } from '@baca/store/auth'

export const UserName = () => {
  const isSignedIn = useAtomValue(isSignedInAtom)
  const userName = useAtomValue(userNameAtom)

  if (isSignedIn) {
    return <Text>{userName}</Text>
  }

  return <Text>No user</Text>
}
```

Get outside of component

```tsx
import { store } from '@baca/store'
import { isSignedInAtom, userNameAtom } from '@baca/store/auth'

const getUserName = () => {
  const isSignedIn = store.get(isSignedInAtom)
  const userName = store.get(userNameAtom)

  if (isSignedIn) {
    return userName
  }

  return null
}
```

### Update atom value

Update with hook

```tsx
import { isSignedInAtom } from '@baca/store/auth'

const SignInButton = () => {
  // Optionbally you can use `useSetAtom()`
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)

  const handleSignIn = () => {
    // Handle logic on backend

    setIsSignedIn(true)
  }

  if (isSignedIn) {
    return null
  }

  return <Button onPress={handleSignIn}>Sign in</Button>
}
```

Update outside of component

```tsx
import { store } from '@baca/store'
import { isSignedInAtom } from '@baca/store/auth'

const handleSignIn = () => {
  // Handle logic on backend

  store.set(isSignedInAtom, true)
}

const SignInButton = () => {
  const isSignedIn = useAtomValue(isSignedInAtom)

  if (isSignedIn) {
    return null
  }

  return <Button onPress={handleSignIn}>Sign in</Button>
}
```
