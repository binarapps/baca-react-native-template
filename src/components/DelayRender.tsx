import { PropsWithChildren, useState } from 'react'
import { Button, View } from 'react-native'

export const DelayRender = ({ children }: PropsWithChildren) => {
  const [shouldRenderApp, setShouldRenderApp] = useState(false)

  if (!shouldRenderApp) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="renderApp" onPress={() => setShouldRenderApp(true)} />
      </View>
    )
  }

  return children
}

export const withDelayRender = (Component: React.FC) => () => {
  return (
    <DelayRender>
      <Component />
    </DelayRender>
  )
}

// This logic is used to render the component on button press, thanks to that we can profile javascript code in isolation
// To make this working do this steps:
// 1. wrap your component with `withDelayRender` function:
//    - const YourComponent = withDelayRender((props) => { ... })
//    - const YourComponent = (props) => {
//        return (
//          <DelayRender>
//            { ... }
//          </DelayRender>
//        )
//      }
// 2. Reload the app
// 3. Press the button to render the app

// If you are wrapping App.tsx with withDelayRender function, do this additional step:
// 1. go to AppLoading and comment out this line:
//    - SplashScreen.preventAutoHideAsync()
