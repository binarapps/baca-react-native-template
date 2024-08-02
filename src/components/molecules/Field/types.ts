import { FormLabelProps, InputProps, SelectProps, TouchableRef } from '@baca/design-system'
import { LegacyRef } from 'react'

// -----------------------
// -------- INPUT --------
// -----------------------

export type FieldInputProps = InputProps &
  FormLabelProps & {
    helperText?: string
    errorMessage?: string
    errorIcon?: JSX.Element
    onFocus?: () => void
  }

// -----------------------
// -------- RADIO --------
// -----------------------

export type RadioGroupItemProps<T> = {
  label: string
  value: T
}

export type RadioGroupProps<T> = FormLabelProps & {
  // Items logic
  items?: RadioGroupItemProps<T>[]
  onSelectItem: (val: T) => void
  selectedItem?: string | number

  // UI logic
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  name?: string
  radioRef?: LegacyRef<TouchableRef>
  label?: string
  isError?: boolean
  size?: 'sm' | 'md'
}

// -----------------------
// ------- SELECT --------
// -----------------------

export type FieldSelectProps<T> = SelectProps<T> &
  FormLabelProps & {
    helperText?: string
    errorMessage?: string
    errorIcon?: JSX.Element
    isInvalid?: boolean
  }

// -----------------------
// ------- CHECKBOX ------
// -----------------------

export type CheckboxItemProps<T> = {
  label: string
  value: T
}

export type FieldCheckboxProps<T> = FormLabelProps & {
  // Items logic
  items: CheckboxItemProps<T>[]
  onSelectItem: (val: T[]) => void
  selectedItems?: T[]

  // UI logic
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  name: string
  label?: string
  isError?: boolean
  size?: 'sm' | 'md'
}
