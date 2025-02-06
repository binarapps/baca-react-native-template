import { Redirect, Stack } from 'expo-router'
import i18next from 'i18next'
import { useAtomValue } from 'jotai'

import { isSignedInAtom } from '@/store/auth'

export const unstable_settings = {
  initialRouteName: '(tabs)',
}

export default function AuthorizedLayout() {
  const isSignedIn = useAtomValue(isSignedInAtom)

  if (isSignedIn === false) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen
        name="big-form"
        options={{
          presentation: 'modal',
          title: i18next.t('navigation.screen_titles.test_form'),
        }}
      />
    </Stack>
  )
}
