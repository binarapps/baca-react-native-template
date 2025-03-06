import React, { PropsWithChildren } from 'react'

import { FieldCheckbox } from './FieldCheckbox'
import { FieldCheckboxGroup } from './FieldCheckboxGroup'
import { FieldDatePicker } from './FieldDatePicker'
import { FieldInput } from './FieldInput'
import { FieldRadioGroup } from './FieldRadioGroup'
import { FieldSelect } from './FieldSelect'

type FieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof FieldInput
  CheckboxGroup: typeof FieldCheckboxGroup
  Checkbox: typeof FieldCheckbox
  RadioGroup: typeof FieldRadioGroup
  Select: typeof FieldSelect
  DatePicker: typeof FieldDatePicker
}

const Field: FieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

Field.Input = FieldInput
Field.CheckboxGroup = FieldCheckboxGroup
Field.Checkbox = FieldCheckbox
Field.RadioGroup = FieldRadioGroup
Field.Select = FieldSelect
Field.DatePicker = FieldDatePicker

export { Field }
export * from './types'
