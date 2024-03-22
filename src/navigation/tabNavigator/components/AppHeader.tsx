import { CompanyLogo } from '@baca/components'
import { Platform, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TabColorsStrings } from '../navigation-config'

export function AppHeader() {
  const { top } = useSafeAreaInsets()

  const height = 60 + top
  return (
    <View style={[{ height, paddingTop: top }, jsStyles.appHeader]}>
      <CompanyLogo height={60} width={150} />
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
    ...Platform.select({ default: { display: 'none' }, web: { display: 'flex' } }),
  },
})
