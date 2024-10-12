import React from 'react'

import type { FieldSelectProps } from './types'

import {
  Select as CustomSelect,
  Box,
  FormErrorMessage,
  FormLabel,
  SelectKey,
} from '@/design-system/components'
import { useMemo } from '@/hooks'

const layoutPropsKeys = [
  'm',
  'margin',
  'mt',
  'marginTop',
  'mr',
  'marginRight',
  'mb',
  'marginBottom',
  'ml',
  'marginLeft',
  'mx',
  'my',
  'p',
  'padding',
  'pt',
  'paddingTop',
  'pr',
  'paddingRight',
  'pb',
  'paddingBottom',
  'pl',
  'paddingLeft',
  'px',
  'py',
]

export const Select = <T extends SelectKey>({
  isRequired,
  isInvalid,
  label,
  helperText,
  errorMessage,
  onOpen,
  labelStyle,
  ...props
}: FieldSelectProps<T>) => {
  const layoutProps = useMemo(
    () =>
      Object.fromEntries(Object.entries(props).filter(([key]) => layoutPropsKeys.includes(key))),
    [props]
  )

  if (props.children) {
    return <CustomSelect label={label} {...props} />
  }

  return (
    <Box width="100%" mb={2} gap={1} {...layoutProps}>
      <FormLabel
        label={label}
        isRequired={isRequired}
        labelStyle={labelStyle}
        onLabelPress={onOpen}
      />
      <CustomSelect label={label} {...props} />
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
