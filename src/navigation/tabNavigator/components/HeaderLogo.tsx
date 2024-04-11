import { CompanyLogo } from '@baca/components'
import { useTheme } from '@baca/hooks'
import cssStyles from '@baca/styles'
import { Pressable } from '@bacons/react-views'
import { Link } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'

import { useUniversalWidth } from '../hooks'
import { cns } from '../utils'

export function HeaderLogo() {
  const { colors } = useTheme()
  const isLargeHorizontal = useUniversalWidth(1264)

  return (
    <View
      style={Platform.select({
        default: jsStyles.headerContainer,
        web: cns(cssStyles.headerContainer),
      })}
    >
      <Link style={jsStyles.headerLink} href="/" asChild>
        <Pressable>
          {({ hovered }) => (
            <View
              style={[
                jsStyles.headerLogo,
                {
                  backgroundColor: hovered ? colors.bg.tertiary : colors.Base.transparent,
                },
              ]}
            >
              <CompanyLogo
                height={40}
                style={Platform.select({
                  default: !isLargeHorizontal ? { display: 'none' } : {},
                  web: cns(cssStyles.wideVisible),
                })}
                type="binar"
                width={120}
              />
              <CompanyLogo
                height={40}
                style={Platform.select({
                  default: isLargeHorizontal ? { display: 'none' } : {},
                  web: cns(cssStyles.wideHidden),
                })}
                type="binarSygnet"
                width={40}
              />
            </View>
          )}
        </Pressable>
      </Link>
    </View>
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
    padding: 8,
  },
})
