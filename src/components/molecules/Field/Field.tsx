import React, { PropsWithChildren } from 'react'

import { FieldCheckbox } from './FieldCheckbox'
import { FieldCheckboxGroup } from './FieldCheckboxGroup'
import { FieldEmojiPicker } from './FieldEmojiPicker'
import { FieldInput } from './FieldInput'
import { FieldRadioGroup } from './FieldRadioGroup'
import { FieldSelect } from './FieldSelect'

type FieldComposition = React.FC<PropsWithChildren> & {
  Input: typeof FieldInput
  CheckboxGroup: typeof FieldCheckboxGroup
  Checkbox: typeof FieldCheckbox
  RadioGroup: typeof FieldRadioGroup
  Select: typeof FieldSelect
  EmojiPicker: typeof FieldEmojiPicker
}

const Field: FieldComposition = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

Field.Input = FieldInput
Field.CheckboxGroup = FieldCheckboxGroup
Field.Checkbox = FieldCheckbox
Field.RadioGroup = FieldRadioGroup
Field.Select = FieldSelect
Field.EmojiPicker = FieldEmojiPicker

export { Field }
export * from './types'
