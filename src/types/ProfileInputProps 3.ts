import { Control, FieldErrors } from 'react-hook-form'

export type ProfileControlledInputProps = {
  label: string
  name: string
  placeholder: string
  control: Control
  errors: FieldErrors
  isDisabled?: boolean
  onFocus?: () => void
  onSubmitEditing?: () => void
}
