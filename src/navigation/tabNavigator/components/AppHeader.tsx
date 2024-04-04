import { CompanyLogo } from '@baca/components'
import { isWeb } from '@baca/constants'
import { useTheme } from '@baca/hooks'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function AppHeader() {
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()

  if (!isWeb) return null

  const height = 60 + top

  return (
    <View
      style={[
        { borderBottomColor: colors.border.secondary, height, paddingTop: top },
        jsStyles.appHeader,
      ]}
    >
      <CompanyLogo height={60} width={150} />
    </View>
  )
}

const jsStyles = StyleSheet.create({
  appHeader: {
    alignItems: 'center',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
    zIndex: 10,
  },
})
