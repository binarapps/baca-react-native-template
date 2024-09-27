import { CompanyLogo } from '@/components'
import { Center, Text } from '@/design-system'
import { useScreenOptions } from '@/hooks'

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
