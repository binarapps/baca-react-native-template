import { Link, Stack } from 'expo-router'

import { Box, Text } from '~components'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Box flex={1} justifyContent="center" alignItems="center" pl={6}>
        <Text.H1>This screen doesn&apos;t exist.</Text.H1>
        <Box pt={4} px={4}>
          <Link href="/">
            <Text.H6 color="blue.400">Go to home screen!</Text.H6>
          </Link>
        </Box>
      </Box>
    </>
  )
}
