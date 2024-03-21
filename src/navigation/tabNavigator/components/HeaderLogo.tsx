import { CompanyLogo } from '@baca/components'
import cssStyles from '@baca/styles'
import { Pressable, Text } from '@bacons/react-views'
import { Link } from 'expo-router'
import { Platform, StyleSheet, View } from 'react-native'

import { useWidth } from '../hooks'
import { TabColorsStrings } from '../navigation-config'
import { cns } from '../utils'

export function HeaderLogo() {
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
    marginVertical: 8,
    padding: 8,
  },
})
