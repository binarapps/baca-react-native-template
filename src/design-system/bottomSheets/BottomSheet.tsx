import { Box } from '@baca/design-system/components/Box'
import { useSafeAreaInsets } from '@baca/hooks'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useCallback } from 'react'
import { Dimensions } from 'react-native'

import { BottomSheetScrollView } from './BootomSheetScrollables'
import { BottomSheetHeader } from './BottomSheetHeader'
import { BottomSheetProps } from './types'

const screenHeight = Dimensions.get('screen').height

export { BottomSheetScrollView }
export const BottomSheet = ({
  children,
  title,
  iconConfig,
  isDivider = true,
  showCloseButton = true,
  numberOfTitleLines,
  bottomSheetRef,
}: BottomSheetProps) => {
  const { top } = useSafeAreaInsets()

  const handleClose = useCallback(() => {
    bottomSheetRef?.current?.snapToPosition(-1)
  }, [bottomSheetRef])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
    ),
    []
  )

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={[screenHeight - top - 24]}
      backdropComponent={renderBackdrop}
      enableDynamicSizing
    >
      <BottomSheetView>
        <BottomSheetHeader
          iconConfig={iconConfig}
          title={title}
          numberOfLines={numberOfTitleLines}
          showCloseButton={showCloseButton}
          onClose={handleClose}
        />
        {isDivider && <Box pb="1px" bg="bg.brand.primary" />}
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  )
}
