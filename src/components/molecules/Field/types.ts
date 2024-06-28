import { CheckboxProps, FormLabelProps, InputProps, SelectProps } from '@baca/design-system'

export type FieldInputProps = InputProps &
  FormLabelProps & {
    helperText?: string
    errorMessage?: string
    errorIcon?: JSX.Element
    onFocus?: () => void
  }

export type FieldRadioProps = FormLabelProps & {
  radioOptions?: string[]
  errorMessage?: string
  isInvalid?: boolean
  isDisabled?: boolean
  name: string
  onChange: (val: string) => void
  label?: string
  isError?: boolean
  value?: string | number
  size?: 'sm' | 'md'
}

export type FieldSelectProps<T> = SelectProps<T> &
  FormLabelProps & {
    helperText?: string
    errorMessage?: string
    errorIcon?: JSX.Element
    isInvalid?: boolean
  }

export type FieldCheckboxProps = CheckboxProps &
  FormLabelProps & {
    checkboxes?: string[]
    errorMessage?: string
    isInvalid?: boolean
    isDisabled?: boolean
    name: string
  }
