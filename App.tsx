// FIXME: see how why did you render works
// import './wdyr'

// This is added to support web for reaniamted: https://github.com/software-mansion/react-native-reanimated/issues/4140#issuecomment-1455209588
import 'setimmediate'
import 'react-native-reanimated'

// Rest imports
import '@baca/i18n'
import { enableAndroidBackgroundNotificationListener, startMockedServer } from '@baca/services'
import * as Device from 'expo-device'
import 'expo-router/entry'

// FIXME: moking not working on mobile app - follow this discussion https://github.com/mswjs/msw/issues/2026
const ENABLE_MOCKED_SERVER = false

if (ENABLE_MOCKED_SERVER) {
  startMockedServer()
}

// TODO: Uncomment reactotron setup when using
// const isUsingReactotron = true
// if (__DEV__ && isUsingReactotron && !process.env.JEST_WORKER_ID) {
//   require('./ReactotronConfig')
// }

// Workaround for the notifications received in background on android
// src: https://github.com/expo/expo/issues/14078#issuecomment-1041294084
if (Device.isDevice) {
  enableAndroidBackgroundNotificationListener()
}
