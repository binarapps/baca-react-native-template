// FIXME: see how why did you render works
// import './wdyr'

// This is added to support web for reaniamted: https://github.com/software-mansion/react-native-reanimated/issues/4140#issuecomment-1455209588
import 'setimmediate'
import 'react-native-reanimated'

// Rest imports
import '@baca/i18n'
import { startMockedServer } from '@baca/services'
import 'expo-router/entry'

// FIXME: moking not working on mobile app - follow this discussion https://github.com/mswjs/msw/issues/2026
const ENABLE_MOCKED_SERVER = true

if (ENABLE_MOCKED_SERVER) {
  startMockedServer()
}
