// FIXME: see how why did you render works
// import './wdyr'

// This is added to support web for reaniamted: https://github.com/software-mansion/react-native-reanimated/issues/4140#issuecomment-1455209588
import 'setimmediate'
import 'react-native-reanimated'
// This is added to work jwt-decode for react-native: https://github.com/auth0/jwt-decode?tab=readme-ov-file#polyfilling-atob
import 'core-js/stable/atob'

// Rest imports
import '@baca/i18n'
import { enableAndroidBackgroundNotificationListener, startMockedServer } from '@baca/services'
import * as Device from 'expo-device'
import 'expo-router/entry'

const ENABLE_MOCKED_SERVER = false

if (ENABLE_MOCKED_SERVER) {
  startMockedServer()
}

// TODO: Uncomment reactotron setup when using
const isUsingReactotron = true
if (__DEV__ && isUsingReactotron && !process.env.JEST_WORKER_ID) {
  require('./ReactotronConfig')
}

// Workaround for the notifications received in background on android
// src: https://github.com/expo/expo/issues/14078#issuecomment-1041294084
if (Device.isDevice) {
  enableAndroidBackgroundNotificationListener()
}
