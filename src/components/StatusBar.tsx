import { useColorScheme } from '@baca/contexts'
import { StatusBar as ExpoStatusBar, StatusBarProps } from 'expo-status-bar'

export const StatusBar = (props: StatusBarProps): JSX.Element => {
  const { colorScheme } = useColorScheme()

  return (
    <ExpoStatusBar
      animated
      hideTransitionAnimation="fade"
      style={colorScheme === 'dark' ? 'light' : 'dark'}
      {...props}
    />
  )
}
