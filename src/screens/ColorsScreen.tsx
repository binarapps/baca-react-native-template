import { Text, Center, ScrollView } from '~components'
import { useScreenOptions, useTranslation } from '~hooks'

const colorsVariants: NestedKeys<Colors>[] = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'success',
  'warning',
  'info',
  'light',
]

export const ColorsScreen = (): JSX.Element => {
  const { t } = useTranslation()

  useScreenOptions({
    title: t('navigation.screen_titles.colors'),
  })

  return (
    <ScrollView flexGrow={1} p={4}>
      {colorsVariants.map((colorVariant) => (
        <Center
          alignSelf="stretch"
          backgroundColor={colorVariant}
          height={8}
          key={colorVariant}
          mb={4}
          width="full"
        >
          <Text color="white">{colorVariant}</Text>
        </Center>
      ))}
    </ScrollView>
  )
}
