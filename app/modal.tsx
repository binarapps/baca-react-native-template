import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'

import { Box, Text } from '~components'

export default function ModalScreen() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text.H2>Modal</Text.H2>
      <Box height={1} bg="blue.200" width="80%" />
    </Box>
  )
}
