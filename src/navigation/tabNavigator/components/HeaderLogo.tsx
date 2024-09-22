import { CompanyLogo } from '@baca/components'
import { useTheme } from '@baca/hooks'
import cssStyles from '@baca/styles'
import { makeBigerOnHover } from '@baca/utils/webStyling'
import { Pressable } from '@bacons/react-views'
import { Link } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'

import { useUniversalWidth } from '../hooks'
import { cns } from '../utils'

export function HeaderLogo() {
  const { colors } = useTheme()
  const isLargeHorizontal = useUniversalWidth(1264)

  return (
    <Link style={jsStyles.headerLink} href="/home">
      <Pressable>
        {({ hovered }) => (
          <View
            style={[
              jsStyles.headerLogo,
              makeBigerOnHover(hovered),
              {
                backgroundColor: hovered ? colors.bg.tertiary : colors.Base.transparent,
              },
            ]}
          >
            <View
              style={Platform.select({
                default: jsStyles.headerContainer,
                web: cns(cssStyles.headerContainer),
              })}
            >
              <CompanyLogo
                asImage
                height={40}
                style={Platform.select({
                  default: !isLargeHorizontal ? { display: 'none' } : {},
                })}
                type="binar"
                width={120}
              />
              <CompanyLogo
                asImage
                height={40}
                style={Platform.select({
                  default: isLargeHorizontal ? { display: 'none' } : {},
                })}
                type="binarSygnet"
                width={40}
              />
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  )
}

const jsStyles = StyleSheet.create({
  headerContainer: {
    paddingTop: 0,
  },
  headerLink: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  headerLogo: {
    alignItems: 'center',
    borderRadius: 8,
  },
})
