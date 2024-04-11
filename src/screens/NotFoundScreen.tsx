import { Box, Button, Text } from '@baca/design-system'
import { useScreenOptions, useTranslation } from '@baca/hooks'
import { router } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const navigateToLogin = () => {
  router.navigate('/sign-in')
}

export const NotFoundScreen = (): JSX.Element => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.not_found'),
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <Box alignItems="center" flexGrow={1} gap={8} p={8}>
        <Text>{t('errors.screen_not_found')}</Text>
        <Button maxW={360} onPress={navigateToLogin} title={t('common.continue')} w="full" />
      </Box>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flexGrow: 1 },
})
