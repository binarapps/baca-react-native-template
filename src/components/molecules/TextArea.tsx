import { forwardRef } from 'react'
import { TextInput } from 'react-native'

import { Input, InputProps } from '@/design-system/components'

export const TextArea = forwardRef<TextInput, InputProps>((props, ref) => (
  <Input ref={ref} {...props} multiline height={20} />
))
