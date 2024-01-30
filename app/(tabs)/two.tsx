import { Box, Text } from '~components'

export default function TabTwoScreen() {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text.H3>Tab Two</Text.H3>
      <Box height={1} bg="blue.200" width="80%" />
    </Box>
  )
}
