import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'

import { Center, Text } from '@/design-system'
import { useScreenOptions, useTranslation } from '@/hooks'

export const _NAME_ = (): JSX.Element => {
  // Screen params
  // To use parameters check this docs: https://docs.expo.dev/router/reference/url-parameters/
  const glob = useGlobalSearchParams()
  const local = useLocalSearchParams()

  console.log('Local Params:', local.user)
  console.log('Global Params:', glob.user)

  // Getting translation function
  const { t } = useTranslation()

  // Setting screen title
  useScreenOptions({
    title: '_NAME_',
  })

  // Render
  return (
    <Center flex={1}>
      <Text textAlign="center">_NAME_</Text>
      <Text textAlign="center">{t('hello')}</Text>
    </Center>
  )
}
