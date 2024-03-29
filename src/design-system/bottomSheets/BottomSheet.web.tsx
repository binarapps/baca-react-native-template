import { Modal } from '@baca/components/Modal'
import { useBoolean, useWeb } from '@baca/hooks'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { RefObject, useCallback, useImperativeHandle } from 'react'
import { ScrollView } from 'react-native'

import { BottomSheetHeader } from './BottomSheetHeader'
import { Box } from '../components/Box'

type Props = {
  bottomSheetRef: RefObject<BottomSheetModal>
  children: JSX.Element | JSX.Element[]
  title?: string
  showCloseButton?: boolean
  numberOfTitleLines?: number
}

export const BottomSheetScrollView = ScrollView
export const BottomSheet = ({
  children,
  title,
  showCloseButton = true,
  numberOfTitleLines,
  bottomSheetRef,
}: Props) => {
  const [isOpen, setIsOpen] = useBoolean(false)
  const { webContentWidth } = useWeb()

  useImperativeHandle(bottomSheetRef, () => ({
    snapToPosition: (index: string | number) => {
      if (index === -1) {
        setIsOpen.off()
      }
    },
    present: setIsOpen.on,
    dismiss: setIsOpen.off,
    close: setIsOpen.off,
    collapse: setIsOpen.off,
    expand: setIsOpen.on,
    forceClose: setIsOpen.off,
    snapToIndex: (index: string | number) => {
      if (index === -1) {
        setIsOpen.off()
      }
    },
  }))
  const closeModalHandler = useCallback(() => {
    setIsOpen.off()
  }, [setIsOpen])

  return (
    <Modal transparent visible={isOpen} onRequestClose={closeModalHandler}>
      <Box
        mx="auto"
        bg="bg.brand.primary"
        borderRadius={8}
        borderColor={'border.primary'}
        borderWidth={1}
        maxW={webContentWidth}
      >
        <BottomSheetHeader
          title={title}
          numberOfLines={numberOfTitleLines}
          showCloseButton={showCloseButton}
          onClose={setIsOpen.off}
        />
        <Box pb="1px" bg="bg.brand.primary" />
        {children}
      </Box>
    </Modal>
  )
}
