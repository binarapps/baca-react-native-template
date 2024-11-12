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
  FieldRadioGroupProps,
  FieldSelectProps,
  FieldCheckboxProps,
} from '@/components/molecules'

// -----------------------
// -------- INPUT --------
// -----------------------

export type ControlledInputProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldInputProps,
  'ref'
> & {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

export interface RenderInputProps {
  field: ControllerRenderProps<FieldValues, string>
}

// -----------------------
// ------- SELECT --------
// -----------------------

export type ControlledSelectProps<T, TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldSelectProps<T>,
  'selectedItems' | 'onSelectItem'
> & {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

// -----------------------
// -------- RADIO --------
// -----------------------

export type ControlledRadioProps<T, TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldRadioGroupProps<T>,
  'selectedItem' | 'onSelectItem'
> & {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

// -----------------------
// --- CHECKBOX GROUP ----
// -----------------------

export type ControlledCheckboxGroupProps<T, TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldCheckboxGroupProps<T>,
  'onSelectItem' | 'selectedItems' | 'errorMessage'
> & {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

// -----------------------
// ------ CHECKBOX -------
// -----------------------

export type ControlledCheckboxProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldCheckboxProps,
  'onChange' | 'isChecked'
> & {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  errors?: FieldErrors<TFieldValues>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}
