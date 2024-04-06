import { useCallback, useRef } from 'react'

import { FullScreenModal, ModalMethods } from './FullScreenModal'

export const useFullScreenModal = () => {
  const modalRef = useRef<ModalMethods>(null)

  const modalComponentRenderFunction = (children: JSX.Element | JSX.Element[]) => {
    return <FullScreenModal modalRef={modalRef}>{children}</FullScreenModal>
  }

  const presentFullScreenModal = useCallback(() => {
    modalRef.current?.present?.()
  }, [])

  const closeFullScreenModal = useCallback(() => {
    modalRef.current?.close?.()
  }, [])

  return {
    modalComponentRenderFunction,
    presentFullScreenModal,
    closeFullScreenModal,
  }
}
