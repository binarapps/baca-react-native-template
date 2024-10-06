import { Center, Text } from '@/design-system'
import { useScreenOptions, useTranslation } from '@/hooks'

export const _NAME_ = (): JSX.Element => {
  const { t } = useTranslation()

  useScreenOptions({
    title: '_NAME_',
  })

  return (
    <Center flex={1}>
      <Text textAlign="center">_NAME_</Text>
      <Text textAlign="center">{t('hello')}</Text>
    </Center>
  )
}
