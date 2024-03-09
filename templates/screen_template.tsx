import { Center, Text } from '@baca/design-system'
import { useTranslation } from '@baca/hooks'
// @ts-expect-error: it's a template and will be removed
export const _NAME_ = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Center flex={1}>
      <Text textAlign="center">_NAME_</Text>
      <Text textAlign="center">{t('hello')}</Text>
    </Center>
  )
}
