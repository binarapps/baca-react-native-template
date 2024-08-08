import React, { PropsWithChildren } from 'react'

import { Checkbox } from './Checkbox'
import { CheckboxGroup } from './CheckboxGroup'
import { Input } from './Input'
import { RadioGroup } from './RadioGroup'
import { Select } from './Select'

type ControlledFieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof Input
  CheckboxGroup: typeof CheckboxGroup
  RadioGroup: typeof RadioGroup
  Checkbox: typeof Checkbox
  Select: typeof Select
}

const ControlledField: ControlledFieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

ControlledField.Input = Input
ControlledField.CheckboxGroup = CheckboxGroup
ControlledField.Checkbox = Checkbox
ControlledField.RadioGroup = RadioGroup
ControlledField.Select = Select

export { ControlledField }
export * from './types'
