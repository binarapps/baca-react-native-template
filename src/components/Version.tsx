import * as Application from 'expo-application'
import * as Clipboard from 'expo-clipboard'
import Constants from 'expo-constants'
import * as Updates from 'expo-updates'
import { useCallback } from 'react'
import { Pressable } from 'react-native'

import { Spacer, Text } from '@/design-system/components'

const appName = Application?.applicationName ?? Constants?.expoConfig?.name
const appVersion = Application?.nativeApplicationVersion ?? Constants?.expoConfig?.version

export const Version = ({ onPress }: { onPress: () => void }) => {
  const version = `${appName}: ${appVersion} (${Application?.nativeBuildVersion ?? '-'}) ${
    Updates.updateId ? '\nupdate: ' + Updates.updateId : ''
  }`

  const handleShortPress = useCallback(async () => {
    await Clipboard.setStringAsync(version)
  }, [version])

  return (
    <Pressable onPress={handleShortPress} onLongPress={onPress} delayLongPress={1000}>
      <Text opacity={40} textAlign="center">
        {version}
      </Text>
      <Spacer y="1" />
    </Pressable>
  )
}
