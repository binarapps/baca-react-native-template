import { Text, Center, ScrollView } from '~components'
import { useScreenOptions, useTranslation } from '~hooks'

const colorsVariants: NestedKeys<Colors>[] = [
  'utility.success.500',
  'utility.warning.500',
  'utility.orange.500',
  'utility.error.500',
  'utility.pink.500',
  'utility.fuchsia.500',
  'utility.brand.500',
  'utility.purple.500',
  'utility.indigo.500',
  'utility.blue.500',
  'utility.blue.dark.500',
  'utility.gray.500',
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
          <Text color="text.primary">{colorVariant}</Text>
        </Center>
      ))}
    </ScrollView>
  )
}
