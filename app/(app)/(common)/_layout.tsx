import { Stack } from 'expo-router'

import { LandingHeader } from '@/components'

export default function CommonLayout() {
  return (
    <Stack
      screenOptions={{
        header: LandingHeader,
      }}
    />
  )
}
