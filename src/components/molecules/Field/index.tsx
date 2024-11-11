import React, { PropsWithChildren } from 'react'

import { CheckboxGroup } from './CheckboxGroup'
import { FieldCheckbox } from './FieldCheckbox'
import { FieldInput } from './FieldInput'
import { RadioGroup } from './RadioGroup'
import { Select } from './Select'

type FieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof FieldInput
  CheckboxGroup: typeof CheckboxGroup
  Checkbox: typeof FieldCheckbox
  RadioGroup: typeof RadioGroup
  Select: typeof Select
}

const Field: FieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

Field.Input = FieldInput
Field.CheckboxGroup = CheckboxGroup
Field.Checkbox = FieldCheckbox
Field.RadioGroup = RadioGroup
Field.Select = Select

export { Field }
export * from './types'
