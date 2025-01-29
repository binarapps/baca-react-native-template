// TODO: there are tons of more interesting methods there!
import * as Application from 'expo-application'
import { useRouter } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'

import { isExpoGo, isDevelopment, isProduction, isMock } from '@/constants'
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
      <Text.MdBold>{t('application_info_screen.navigation_info')}</Text.MdBold>
      <Text>Application Id: {Application.applicationId}</Text>
      <Text>Application Name: {Application.applicationName}</Text>
      <Text>Native Application Version: {Application.nativeApplicationVersion}</Text>
      <Text>Native build Version: {Application.nativeBuildVersion}</Text>
      <Text>Allowed languages: {i18n.languages.join(', ')}</Text>
      <Text>isExpoGo: {isExpoGo ? 'true' : 'false'}</Text>
      <Text>isDevelopment: {isDevelopment ? 'true' : 'false'}</Text>
      <Text>isProduction: {isProduction ? 'true' : 'false'}</Text>
      <Text>isMock: {isMock ? 'true' : 'false'}</Text>

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
