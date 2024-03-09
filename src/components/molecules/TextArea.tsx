import { Input, InputProps } from '@baca/design-system/components'
import { forwardRef } from 'react'
import { TextInput } from 'react-native'

export const TextArea = forwardRef<TextInput, InputProps>((props, ref) => (
  <Input ref={ref} {...props} multiline height={20} />
))
