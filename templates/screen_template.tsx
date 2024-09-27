import { Center, Text } from '@/design-system'
import { useTranslation } from '@/hooks'

export const _NAME_ = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Center flex={1}>
      <Text textAlign="center">_NAME_</Text>
      <Text textAlign="center">{t('hello')}</Text>
    </Center>
  )
}
