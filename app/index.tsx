import { Redirect } from 'expo-router'

import { useAuth } from '~hooks'

export default function Root() {
  const { isSignedIn } = useAuth()

  if (isSignedIn === false) {
    return <Redirect href="/sign-in" />
  }

  return <Redirect href="/home" />
}
