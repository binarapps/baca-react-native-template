import { CompanyLogo } from '@baca/components'
import { isWeb } from '@baca/constants'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { TabColorsStrings } from '../navigation-config'

export function AppHeader() {
  const { top } = useSafeAreaInsets()

  if (!isWeb) return null

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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 10,
  },
})
