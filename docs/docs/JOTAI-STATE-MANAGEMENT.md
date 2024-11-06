---
id: state-management
slug: /state-management
title: State management
sidebar_position: 5
tags:
  - Jotai
  - State management
  - React
  - React Native
description: State management - jotai
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
import { isSignedInAtom, userNameAtom } from '@/store/auth'

export const UserName = () => {
  // success-line
  const isSignedIn = useAtomValue(isSignedInAtom)
  // success-line
  const userName = useAtomValue(userNameAtom)

  if (isSignedIn) {
    return <Text>{userName}</Text>
  }

  return <Text>No user</Text>
}
```

Get outside of component

```tsx
import { store } from '@/store'
import { isSignedInAtom, userNameAtom } from '@/store/auth'

const getUserName = () => {
  // success-line
  const isSignedIn = store.get(isSignedInAtom)
  // success-line
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
import { isSignedInAtom } from '@/store/auth'

const SignInButton = () => {
  // Optionbally you can use `useSetAtom()`
  // success-line
  const [isSignedIn, setIsSignedIn] = useAtom(isSignedInAtom)

  const handleSignIn = () => {
    // Handle logic on backend

    // success-line
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
import { store } from '@/store'
import { isSignedInAtom } from '@/store/auth'

const handleSignIn = () => {
  // Handle logic on backend

  // success-line
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
