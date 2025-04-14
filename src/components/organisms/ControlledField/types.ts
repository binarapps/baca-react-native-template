import { Control, FieldErrors, FieldValues, Path, RegisterOptions } from 'react-hook-form'

import {
  FieldCheckboxGroupProps,
  FieldInputProps,
  FieldRadioGroupProps,
  FieldSelectProps,
  FieldCheckboxProps,
  FieldEmojiPickerProps,
} from '@/components/molecules'

// -----------------------
// ---- HELPER TYPES -----
// -----------------------

type ControlledFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>
  control: Control<TFieldValues>
  errors: FieldErrors<TFieldValues>
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

// -----------------------
// -------- INPUT --------
// -----------------------

export type ControlledInputProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldInputProps,
  'ref'
> &
  ControlledFieldProps<TFieldValues>

// -----------------------
// ------- SELECT --------
// -----------------------

export type ControlledSelectProps<T, TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldSelectProps<T>,
  'selectedItems' | 'onSelectItem'
> &
  ControlledFieldProps<TFieldValues>

// -----------------------
// -------- RADIO --------
// -----------------------

export type ControlledRadioProps<T, TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldRadioGroupProps<T>,
  'selectedItem' | 'onSelectItem'
> &
  ControlledFieldProps<TFieldValues>

// -----------------------
// --- CHECKBOX GROUP ----
// -----------------------

export type ControlledCheckboxGroupProps<T, TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldCheckboxGroupProps<T>,
  'onSelectItem' | 'selectedItems' | 'errorMessage'
> &
  ControlledFieldProps<TFieldValues>

// -----------------------
// ------ CHECKBOX -------
// -----------------------

export type ControlledCheckboxProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldCheckboxProps,
  'onChange' | 'isChecked'
> &
  ControlledFieldProps<TFieldValues>

// -----------------------
// ----- EMOJI PICKER ----
// -----------------------

export type ControlledEmojiPickerProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  FieldEmojiPickerProps,
  'ref' | 'onChangeEmoji' | 'emoji'
> &
  ControlledFieldProps<TFieldValues>
