import React, { PropsWithChildren } from 'react'

import { Checkbox } from './Checkbox'
import { Input } from './Input'
import { RadioGroup } from './RadioGroup'
import { Select } from './Select'

type ControlledFieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof Input
  Checkbox: typeof Checkbox
  RadioGroup: typeof RadioGroup
  Select: typeof Select
}

const ControlledField: ControlledFieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

ControlledField.Input = Input
ControlledField.Checkbox = Checkbox
ControlledField.RadioGroup = RadioGroup
ControlledField.Select = Select

export { ControlledField }
export * from './types'
