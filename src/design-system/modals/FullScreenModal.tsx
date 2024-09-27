import { RefObject } from 'react'
import { Modal, ModalProps } from 'react-native'

import { Box } from '@/design-system/components/Box'
import { useBoolean, useImperativeHandle } from '@/hooks'

export type ModalMethods = {
  present: () => void
  close: () => void
}

type Props = {
  modalRef: RefObject<ModalMethods>
} & ModalProps

export const FullScreenModal = ({ children, modalRef, ...rest }: Props) => {
  const [isOpen, setIsOpen] = useBoolean(false)

  useImperativeHandle(modalRef, () => ({
    present: setIsOpen.on,
    close: setIsOpen.off,
  }))

  return (
    <Modal
      {...rest}
      animationType="fade"
      transparent
      visible={isOpen}
      onRequestClose={setIsOpen.off}
    >
      <Box bg="bg.primary" w="100%" height="100%">
        {children}
      </Box>
    </Modal>
  )
}
