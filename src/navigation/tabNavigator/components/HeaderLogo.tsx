import { darkLogoFull, darkLogoSygnet, lightLogoFull, lightLogoSygnet } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import cssStyles from '@baca/styles'
import { Pressable, Text } from '@bacons/react-views'
import { Link } from 'expo-router'
import { Image, Platform, StyleSheet, View } from 'react-native'

import { TabColorsStrings } from '../config'
import { useWidth } from '../hooks'
import { cns } from '../utils'

export function HeaderLogo() {
  const { colorScheme } = useColorScheme()
  const isLargeHorizontal = useWidth(1264)

  return (
    <View
      style={Platform.select({
        default: jsStyles.headerContainer,
        web: cns(cssStyles.headerContainer),
      })}
    >
      <Link
        style={Platform.select({
          default: jsStyles.headerLink,
          web: cns(cssStyles.headerLink),
        })}
        href="/"
        asChild
      >
        <Pressable>
          {({ hovered }) => (
            <Text
              style={[
                jsStyles.headerLogo,
                {
                  backgroundColor: hovered
                    ? TabColorsStrings.lightGray50
                    : TabColorsStrings.transparent,
                },
              ]}
            >
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                source={colorScheme === 'light' ? lightLogoFull : darkLogoFull}
                style={[
                  jsStyles.logoWide,
                  Platform.select({
                    default: !isLargeHorizontal ? { display: 'none' } : {},
                    web: cns(cssStyles.wideVisible),
                  }),
                ]}
              />
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                source={colorScheme === 'light' ? lightLogoSygnet : darkLogoSygnet}
                style={[
                  jsStyles.logoSygnet,
                  Platform.select({
                    default: isLargeHorizontal ? { display: 'none' } : {},
                    web: cns(cssStyles.wideHidden),
                  }),
                ]}
              />
            </Text>
          )}
        </Pressable>
      </Link>
    </View>
  )
}

const jsStyles = StyleSheet.create({
  headerContainer: {
    height: 96,
    minHeight: 96,
    paddingTop: 0,
  },
  headerLink: {
    alignItems: 'center',
  },
  headerLogo: {
    alignItems: 'center',
    borderRadius: 8,
    display: 'flex',
    margin: 0,
  },
  logoSygnet: { height: 60, width: 40 },
  logoWide: { height: 60, width: 150 },
})
