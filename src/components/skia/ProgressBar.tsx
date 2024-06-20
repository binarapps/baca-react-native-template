import {
  Canvas,
  LinearGradient,
  Path,
  Skia,
  Text,
  useFont,
  useTouchHandler,
  vec,
} from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated'

type ProgressBarProps = {
  initialProgress: number
  height?: number
  width?: number
}

const FONT_SIZE = 24

export const ProgressBar = ({ height = 32, initialProgress, width = 200 }: ProgressBarProps) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const font = useFont(require('@baca/assets/fonts/Inter-Bold.ttf'), FONT_SIZE)

  const path = Skia.Path.Make()
  path.moveTo(0, height / 2)
  path.lineTo(width, height / 2)

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(initialProgress / 100, { duration: 1000 })
  }, [initialProgress])

  const onTouch = useTouchHandler({
    onStart: ({ x }) => setNewProgress(x),
    onActive: ({ x }) => setNewProgress(x),
  })

  const setNewProgress = (x: number) => {
    let newProgress
    if (x >= width) {
      newProgress = 1
    } else if (x <= 0) {
      newProgress = 0
    } else {
      newProgress = x / width
    }
    progress.value = newProgress
  }

  const text = useDerivedValue(() => `${Math.floor(progress.value * 100)}%`)

  const textX = useDerivedValue(() => {
    const size = font?.measureText(text.value)?.width

    return width / 2 - size! / 2
  })

  return (
    <>
      <Canvas style={{ height: FONT_SIZE + 12, width }}>
        <Text x={textX} y={FONT_SIZE} text={text} font={font} />
      </Canvas>
      <Canvas style={{ height, width }} onTouch={onTouch}>
        <Path color="black" path={path} style="stroke" strokeWidth={height} start={0} end={1} />
        <Path color="red" path={path} style="stroke" strokeWidth={height} start={0} end={progress}>
          <LinearGradient
            start={vec(width, 0)}
            end={vec(width, height)}
            colors={['yellow', 'red']}
          />
        </Path>
      </Canvas>
    </>
  )
}
