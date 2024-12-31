import { Stack } from 'expo-router'

import { Header } from '@/components/Header'

export const unstable_settings = {
  initialRouteName: 'application-info',
}

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: Header,
      }}
    />
  )
}
