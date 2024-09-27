import { useState, useEffect } from 'react'
import { Dimensions } from 'react-native'

import { breakpoints } from '@/design-system/config'

type ReturnType = {
  webContentWidth: number
  shouldApplyDesktopStyles: boolean
  shouldApplyMobileStyles: boolean
}
const { desktop, tablet } = breakpoints

export const useWeb: () => ReturnType = () => {
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const setDimensions = (windowWidth: number, screenWidth: number) => {
      switch (true) {
        case windowWidth < tablet:
          setWidth(windowWidth)
          break
        case windowWidth >= tablet && windowWidth < desktop:
          setWidth(tablet)
          break
        case windowWidth >= desktop:
          setWidth(desktop)
          break
        default:
          setWidth(screenWidth)
      }
    }
    setDimensions(Dimensions.get('window').width, Dimensions.get('screen').width)
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window: { width: windowWidth }, screen: { width: screenWidth } }) => {
        setDimensions(windowWidth, screenWidth)
      }
    )

    return () => {
      subscription.remove()
    }
  }, [])

  return {
    webContentWidth: width,
    shouldApplyDesktopStyles: width >= desktop,
    shouldApplyMobileStyles: width < tablet,
  }
}
