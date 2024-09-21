import { darkBinarLogo, darkLogoSygnet, lightBinarLogo, lightLogoSygnet } from '@baca/constants'
import { ColorSchemeName, useColorScheme } from '@baca/contexts'
import { Image, ImageStyle, ImageProps } from 'expo-image'
import { Link } from 'expo-router'
import { Platform, StyleSheet } from 'react-native'

type LogoTypes = 'binarSygnet' | 'binar'

const LOGO: {
  [key in ColorSchemeName]: { [key in LogoTypes]: ImageProps['source'] }
} = {
  light: { binarSygnet: lightLogoSygnet, binar: lightBinarLogo },
  dark: { binarSygnet: darkLogoSygnet, binar: darkBinarLogo },
}

export const CompanyLogo = ({
  height = 100,
  type = 'binar',
  width = '100%',
  style,
  asImage = false,
}: {
  height?: ImageStyle['height']
  type?: LogoTypes
  width?: ImageStyle['width']
  style?: ImageStyle
  asImage?: boolean
}) => {
  const { colorScheme } = useColorScheme()

  const source = LOGO[colorScheme][type]

  if (Platform.OS !== 'web' || asImage) {
    return <Image contentFit="scale-down" source={source} style={[{ height, width }, style]} />
  }

  return (
    <Link
      href="/"
      style={[
        {
          height,
          width,
        },
        styles.image,
      ]}
    >
      <Image contentFit="scale-down" source={source} style={[{ height, width }, style]} />
    </Link>
  )
}

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    display: 'flex',
    // flex: 1,
    justifyContent: 'center',
  },
})
