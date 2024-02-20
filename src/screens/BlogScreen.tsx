import { Center, Text } from '~components'
import { useScreenOptions, useTranslation } from '~hooks'

export const BlogScreen = () => {
  const { t } = useTranslation()

  useScreenOptions({
    // TODO: Add translation
    title: t('navigation.screen_titles.blog'),
  })

  return (
    <Center flex={1} px={4}>
      <Text>This is blog screen, and is visible by logged in and logged out users</Text>
    </Center>
  )
}
