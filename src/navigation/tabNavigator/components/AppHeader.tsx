import { Image, Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TabColorsStrings } from '../config'

import { darkLogoFull, lightLogoFull } from '~constants'
import { useColorScheme } from '~contexts'

export function AppHeader() {
  const { colorScheme } = useColorScheme()
  const { top } = useSafeAreaInsets()

  const height = 60 + top
  return (
    <View
      style={[
        { height, paddingTop: top },
        jsStyles.appHeader,
        Platform.select({ default: { display: 'none' }, web: { display: 'flex' } }),
      ]}
    >
      <Image
        resizeMethod="resize"
        resizeMode="contain"
        source={colorScheme === 'light' ? lightLogoFull : darkLogoFull}
        style={jsStyles.logoWide}
      />
    </View>
  )
}

const jsStyles = StyleSheet.create({
  appHeader: {
    alignItems: 'center',
    borderBottomColor: TabColorsStrings.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 10,
  },
  logoWide: { height: 60, width: 150 },
})
