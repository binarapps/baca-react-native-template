import { Stack } from 'expo-router'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackButtonDisplayMode: 'minimal' }}>
      <Stack.Screen name="(authorized)" />
      <Stack.Screen name="(not-authorized)" />
      <Stack.Screen name="(common)" />
      <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
    </Stack>
  )
}
