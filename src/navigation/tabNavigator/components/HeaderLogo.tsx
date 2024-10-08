import { Pressable } from '@bacons/react-views'
import { Link } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'

import { useUniversalWidth } from '../hooks'
import { cns } from '../utils'

import { CompanyLogo } from '@/components'
import { useTheme } from '@/hooks'
import cssStyles from '@/styles'
import { makeBigerOnHover } from '@/utils/webStyling'

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
