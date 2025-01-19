import AsyncStorage from '@react-native-async-storage/async-storage'
import Reactotron from 'reactotron-react-native'

/**
 * Note:
 * If using an Android device or emulator run the following command to make sure it can connect to Reactotron:
 * adb reverse tcp:9090 tcp:9090
 * (9090 is the default port for Reactotron)
 * See: https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md#configure-reactotron-with-your-project
 */

Reactotron?.setAsyncStorageHandler?.(AsyncStorage)
  .configure({
    name: 'Reactotron In Expo demo',
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate|127.0.0.1/,
    },
    editor: false,
    errors: { veto: (stackFrame) => false },
    overlay: false,
  })
  .connect()
