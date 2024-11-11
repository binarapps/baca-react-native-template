import React, { PropsWithChildren } from 'react'

import { ControlledCheckbox } from './ControlledCheckbox'
import { ControlledCheckboxGroup } from './ControlledCheckboxGroup'
import { ControlledInput } from './ControlledInput'
import { ControlledRadioGroup } from './ControlledRadioGroup'
import { Select } from './Select'

type ControlledFieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof ControlledInput
  CheckboxGroup: typeof ControlledCheckboxGroup
  RadioGroup: typeof ControlledRadioGroup
  Checkbox: typeof ControlledCheckbox
  Select: typeof Select
}

const ControlledField: ControlledFieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

ControlledField.Input = ControlledInput
ControlledField.CheckboxGroup = ControlledCheckboxGroup
ControlledField.Checkbox = ControlledCheckbox
ControlledField.RadioGroup = ControlledRadioGroup
ControlledField.Select = Select

export { ControlledField }
export * from './types'
