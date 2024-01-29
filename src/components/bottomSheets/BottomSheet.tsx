import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { RefObject, useCallback } from 'react'
import { Dimensions } from 'react-native'

import { BottomSheetHeader } from './BottomSheetHeader'

import { Box } from '~components/atoms/Box'
import { useColorScheme } from '~contexts'
import { useSafeAreaInsets } from '~hooks'

const screenHeight = Dimensions.get('screen').height

type Props = {
  bottomSheetRef: RefObject<BottomSheetModal>
  children: JSX.Element | JSX.Element[]
  title?: string
  showCloseButton?: boolean
  numberOfTitleLines?: number
}

export { BottomSheetScrollView }
export const BottomSheet = ({
  children,
  title,
  showCloseButton = true,
  numberOfTitleLines,
  bottomSheetRef,
}: Props) => {
  const { top } = useSafeAreaInsets()

  const { colorScheme } = useColorScheme()

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
          title={title}
          numberOfLines={numberOfTitleLines}
          showCloseButton={showCloseButton}
          onClose={handleClose}
        />
        <Box pb="1px" bg={colorScheme === 'dark' ? 'gray.900' : 'light'} />

        {children}
      </BottomSheetView>
    </BottomSheetModal>
  )
}
