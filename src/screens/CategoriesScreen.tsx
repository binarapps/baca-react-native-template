import { CompanyLogo } from '@baca/components'
import { Center, Text } from '@baca/design-system'
import { useScreenOptions } from '@baca/hooks'

export const CategoriesScreen = () => {
  useScreenOptions({
    title: 'Categories',
  })

  return (
    <Center flex={1} px={4}>
      <CompanyLogo />
      <Text.LgBold textAlign="center">Categories screen</Text.LgBold>
    </Center>
  )
}
