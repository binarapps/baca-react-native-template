import { dimensionScales } from '@baca/screens/drafts/dimensionScales'
import { useWindowDimensions } from 'react-native'

export const useViewportDimensions = () => {
  const { width, height } = useWindowDimensions()
  let scale = dimensionScales.find((d) => d.width === width && d.height === height)?.scale || 1
  if (width < 400 && height >= 400 && height < 700) scale = 0.5
  return { viewportWidth: width * scale, viewportHeight: height * scale }
}
