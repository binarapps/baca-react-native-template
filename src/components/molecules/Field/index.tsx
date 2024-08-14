import React, { PropsWithChildren } from 'react'

import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'
import { Input } from './Input'
import { RadioGroup } from './RadioGroup'
import { Select } from './Select'

type FieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof Input
  CheckboxGroup: typeof CheckboxGroup
  Checkbox: typeof Checkbox
  RadioGroup: typeof RadioGroup
  Select: typeof Select
}

const Field: FieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

Field.Input = Input
Field.CheckboxGroup = CheckboxGroup
Field.Checkbox = Checkbox
Field.RadioGroup = RadioGroup
Field.Select = Select

export { Field }
export * from './types'
