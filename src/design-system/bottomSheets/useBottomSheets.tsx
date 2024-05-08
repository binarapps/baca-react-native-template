import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useCallback, useRef } from 'react'

import { BottomSheet } from './BottomSheet'
import { BottomSheetIconConfigProps } from './types'

export const useBottomSheet = ({ title = '', isDivider = true }) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const bottomSheetComponentRenderFunction = (
    children: JSX.Element | JSX.Element[],
    iconConfig?: BottomSheetIconConfigProps
  ) => {
    return (
      <BottomSheet
        title={title}
        isDivider={isDivider}
        bottomSheetRef={bottomSheetRef}
        iconConfig={iconConfig}
      >
        {children}
      </BottomSheet>
    )
  }

  const presentBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present?.()
  }, [])

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close?.()
  }, [])

  return {
    bottomSheetComponentRenderFunction,
    closeBottomSheet,
    presentBottomSheet,
  }
}
