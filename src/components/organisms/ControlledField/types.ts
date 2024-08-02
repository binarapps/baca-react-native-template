/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldCheckboxProps,
  FieldInputProps,
  RadioGroupProps,
  FieldSelectProps,
} from '@baca/components/molecules'
import { CheckboxProps, FormLabelProps } from '@baca/design-system'
import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

export type ControlledCheckboxGroupProps<T> = Omit<
  FieldCheckboxProps<T>,
  'onSelectItem' | 'selectedItems' | 'errorMessage'
> & {
  // TODO: Think how to change this to proper type
  // Could be helpful when solving
  // - https://fettblog.eu/typescript-react-generic-forward-refs/
  // - https://react-hook-form.com/ts#Control
  name: Path<any>
  control: Control<any>
  errors?: FieldErrors<any>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

export type ControlledCheckboxProps = FormLabelProps &
  Omit<CheckboxProps, 'onChange' | 'isChecked'> & {
    // TODO: Think how to change this to proper type
    // Could be helpful when solving
    // - https://fettblog.eu/typescript-react-generic-forward-refs/
    // - https://react-hook-form.com/ts#Control
    name: Path<any>
    control: Control<any>
    errors?: FieldErrors<any>
    rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
  }

export type ControlledInputProps = Omit<FieldInputProps, 'ref'> & {
  // TODO: Think how to change this to proper type
  // Could be helpful when solving
  // - https://fettblog.eu/typescript-react-generic-forward-refs/
  // - https://react-hook-form.com/ts#Control
  name: Path<any>
  control: Control<any>
  errors: FieldErrors<any>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

export interface RenderInputProps {
  field: ControllerRenderProps<FieldValues, string>
}

export type ControlledRadioProps<T> = Omit<RadioGroupProps<T>, 'selectedItem' | 'onSelectItem'> & {
  // TODO: Think how to change this to proper type
  // Could be helpful when solving
  // - https://fettblog.eu/typescript-react-generic-forward-refs/
  // - https://react-hook-form.com/ts#Control
  name: Path<any>
  control: Control<any>
  errors?: FieldErrors<any>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

export type ControlledSelectProps<T> = Omit<FieldSelectProps<T>, 'setValue' | 'value'> & {
  // TODO: Think how to change this to proper type
  // Could be helpful when solving
  // - https://fettblog.eu/typescript-react-generic-forward-refs/
  // - https://react-hook-form.com/ts#Control
  name: Path<any>
  control: Control<any>
  errors: FieldErrors<any>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}
