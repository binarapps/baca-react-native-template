import { IconNames } from '@baca/types'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { RefObject } from 'react'

export type BottomSheetIconConfigProps = {
  name: IconNames
  color: ColorNames
  bgColor: ColorNames
}

export type BottomSheetProps = {
  bottomSheetRef: RefObject<BottomSheetModal>
  children: JSX.Element | JSX.Element[]
  isDivider?: boolean
  title?: string
  showCloseButton?: boolean
  numberOfTitleLines?: number
  iconConfig?: BottomSheetIconConfigProps
}

export type BottomSheetHeaderProps = {
  title?: string
  numberOfLines?: number
  showCloseButton?: boolean
  onClose?: () => void
  iconConfig?: BottomSheetIconConfigProps
}
