import {
  CheckboxProps,
  FormLabelProps,
  InputProps,
  SelectProps,
  TouchableRef,
} from '@baca/design-system'
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

export type RadioItemProps<T> = {
  label: string
  value: T
}

export type FieldRadioProps<T> = FormLabelProps & {
  radioOptions?: RadioItemProps<T>[]
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  name?: string
  onChange: (val: T) => void
  radioRef?: LegacyRef<TouchableRef>
  label?: string
  isError?: boolean
  value?: string | number
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

export type FieldCheckboxProps<T> = CheckboxProps<T> &
  FormLabelProps & {
    errorMessage?: string
    isInvalid?: boolean
    isDisabled?: boolean
    name: string
  }
