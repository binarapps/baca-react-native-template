import { Stack } from 'expo-router'

import { LandingHeader } from '@/components'

export default function NotAuthorizedLayout() {
  return (
    <Stack
      screenOptions={{
        header: LandingHeader,
      }}
    />
  )
}
