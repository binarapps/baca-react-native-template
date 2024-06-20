import { Control, FieldErrors, RegisterOptions } from 'react-hook-form'

export type ProfileControlledInputProps = {
  control: Control
  errors: FieldErrors
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  label: string
  name: string
  onFocus?: () => void
  onSubmitEditing?: () => void
  placeholder: string
  rules?: RegisterOptions
  type?: 'text' | 'password' | undefined
}
