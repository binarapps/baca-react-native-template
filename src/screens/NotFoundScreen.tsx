import { Center, Text } from '@/design-system'
import { useScreenOptions, useTranslation } from '@/hooks'

export const NotFoundScreen = (): JSX.Element => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.not_found'),
  })

  return (
    <Center>
      <Text>{t('errors.screen_not_found')}</Text>
    </Center>
  )
}
