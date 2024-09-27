import { LandingHeader } from '@/components/LandingHeader'
import { Center, Text } from '@/design-system'

export const BlogScreen = () => {
  return (
    <>
      <LandingHeader />
      <Center flex={1} px={4}>
        <Text>This is blog screen, and is visible by logged in and logged out users</Text>
      </Center>
    </>
  )
}
