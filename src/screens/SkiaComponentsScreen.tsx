import { ProgressBar } from '@baca/components/skia/ProgressBar'
import { StyleSheet, View } from 'react-native'

export const SkiaComponentsScreen = (): JSX.Element => {
  return (
    <View style={style.container}>
      <ProgressBar initialProgress={50} />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
