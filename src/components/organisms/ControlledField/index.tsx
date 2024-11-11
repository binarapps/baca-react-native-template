import React, { PropsWithChildren } from 'react'

import { ControlledCheckbox } from './ControlledCheckbox'
import { ControlledCheckboxGroup } from './ControlledCheckboxGroup'
import { Input } from './Input'
import { RadioGroup } from './RadioGroup'
import { Select } from './Select'

type ControlledFieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof Input
  CheckboxGroup: typeof ControlledCheckboxGroup
  RadioGroup: typeof RadioGroup
  Checkbox: typeof ControlledCheckbox
  Select: typeof Select
}

const ControlledField: ControlledFieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

ControlledField.Input = Input
ControlledField.CheckboxGroup = ControlledCheckboxGroup
ControlledField.Checkbox = ControlledCheckbox
ControlledField.RadioGroup = RadioGroup
ControlledField.Select = Select

export { ControlledField }
export * from './types'
