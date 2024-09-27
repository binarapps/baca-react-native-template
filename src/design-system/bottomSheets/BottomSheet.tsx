import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { useCallback } from 'react'
import { Dimensions, Platform } from 'react-native'

import { BottomSheetHeader } from './BottomSheetHeader'
import { BottomSheetScrollView } from './BottomSheetScrollables'
import { BottomSheetProps } from './types'

import { Box } from '@/design-system/components/Box'
import { useSafeAreaInsets, useTheme } from '@/hooks'

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
  const { colors } = useTheme()

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
      accessible={Platform.select({
        // setting it to false on Android seems to cause issues with TalkBack instead
        // https://github.com/mobile-dev-inc/maestro/issues/1493
        ios: false,
      })}
      backgroundStyle={{
        // eslint-disable-next-line react-native/no-inline-styles
        backgroundColor: colors.bg.primary,
      }}
      handleIndicatorStyle={{
        // eslint-disable-next-line react-native/no-inline-styles
        backgroundColor: colors.alpha.black[100],
      }}
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
