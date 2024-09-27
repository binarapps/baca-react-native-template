// TODO: there are tons of more interesting methods there!
import * as Application from 'expo-application'
import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'

import { Box, Button, Text } from '@/design-system'
import { usePreventGoBack, useSafeAreaInsets, useScreenOptions, useTranslation } from '@/hooks'

export const ApplicationInfoScreen = (): JSX.Element => {
  const { i18n, t } = useTranslation()
  const { bottom } = useSafeAreaInsets()
  const { canGoBack, back } = useRouter()

  useScreenOptions({
    title: t('navigation.screen_titles.application_info'),
  })

  usePreventGoBack()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text bold>{t('application_info_screen.navigation_info')}</Text>
      <Text>{Application.applicationId}</Text>
      <Text>{Application.applicationName}</Text>
      <Text>{Application.nativeApplicationVersion}</Text>
      <Text>{Application.nativeBuildVersion}</Text>
      <Text>{i18n.languages.join(', ')}</Text>
      {canGoBack() && (
        <>
          <Box flexGrow={1} />
          <Button my={2} onPress={back}>
            {t('common.go_back')}
          </Button>
          <Box pb={`${bottom}px`} />
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
})
