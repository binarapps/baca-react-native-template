/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Control,
  ControllerRenderProps,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form'

import {
  FieldCheckboxGroupProps,
  FieldInputProps,
  RadioGroupProps,
  FieldSelectProps,
  FieldCheckboxProps,
} from '@/components/molecules'

// -----------------------
// -------- INPUT --------
// -----------------------

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

// -----------------------
// ------- SELECT --------
// -----------------------

export type ControlledSelectProps<T> = Omit<
  FieldSelectProps<T>,
  'selectedItems' | 'onSelectItem'
> & {
  // TODO: Think how to change this to proper type
  // Could be helpful when solving
  // - https://fettblog.eu/typescript-react-generic-forward-refs/
  // - https://react-hook-form.com/ts#Control
  name: Path<any>
  control: Control<any>
  errors: FieldErrors<any>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

// -----------------------
// -------- RADIO --------
// -----------------------

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

// -----------------------
// --- CHECKBOX GROUP ----
// -----------------------

export type ControlledCheckboxGroupProps<T> = Omit<
  FieldCheckboxGroupProps<T>,
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

// -----------------------
// ------ CHECKBOX -------
// -----------------------

export type ControlledCheckboxProps = Omit<FieldCheckboxProps, 'onChange' | 'isChecked'> & {
  // TODO: Think how to change this to proper type
  // Could be helpful when solving
  // - https://fettblog.eu/typescript-react-generic-forward-refs/
  // - https://react-hook-form.com/ts#Control
  name: Path<any>
  control: Control<any>
  errors?: FieldErrors<any>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}
