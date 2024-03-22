import { darkLogo, lightLogo } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Center, Spacer, Text } from '@baca/design-system'
import { useScreenOptions } from '@baca/hooks'
import { Image, StyleSheet } from 'react-native'

export const CategoriesScreen = () => {
  useScreenOptions({
    title: 'Categories',
  })

  const { colorScheme } = useColorScheme()

  return (
    <Center flex={1} px={4}>
      <Image
        resizeMethod="resize"
        resizeMode="contain"
        source={colorScheme === 'light' ? lightLogo : darkLogo}
        style={styles.logo}
      />
      <Spacer y={4} />
      <Text.LgBold textAlign="center">Categories screen</Text.LgBold>
    </Center>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 50,
    width: '100%',
  },
})
