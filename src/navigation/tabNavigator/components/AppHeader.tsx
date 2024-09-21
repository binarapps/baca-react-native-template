import { CompanyLogo } from '@baca/components'
import { ThemeSwitcherButton } from '@baca/components/ThemeSwitcherButton'
import { isWeb } from '@baca/constants'
import { Box } from '@baca/design-system'
import { useTheme } from '@baca/hooks'
import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function AppHeader() {
  const { colors } = useTheme()
  const { top } = useSafeAreaInsets()

  if (!isWeb) return null

  const height = 60 + top

  return (
    <Box
      justifyContent="space-around"
      style={[
        { borderBottomColor: colors.border.secondary, height, paddingTop: top },
        jsStyles.appHeader,
      ]}
    >
      <Box w="56px" h="24px" />
      <Box flex={1} />
      <CompanyLogo height={60} width={150} />
      <Box flex={1} />
      <ThemeSwitcherButton />
    </Box>
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
