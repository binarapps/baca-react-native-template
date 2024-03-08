import { darkLogo, lightLogo } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Center, Text } from '@baca/design-system'
import { useScreenOptions } from '@baca/hooks'
import { Image, StyleSheet } from 'react-native'

export const ProfileScreen = () => {
  useScreenOptions({
    title: 'Profile',
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
      <Text.H1Bold textAlign="center">Profile screen</Text.H1Bold>
    </Center>
  )
}

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: '100%',
  },
})
