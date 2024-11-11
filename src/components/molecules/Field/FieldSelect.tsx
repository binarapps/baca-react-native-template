import React from 'react'

import type { FieldSelectProps } from './types'

import { Select, Box, FormErrorMessage, FormLabel, SelectKey } from '@/design-system/components'
import { getLayoutProps } from '@/design-system/utils/getLayoutProps'
import { useMemo } from '@/hooks'

export const FieldSelect = <T extends SelectKey>({
  isRequired,
  isInvalid,
  label,
  helperText,
  errorMessage,
  onOpen,
  labelStyle,
  ...props
}: FieldSelectProps<T>) => {
  const { layoutProps } = useMemo(() => getLayoutProps(props), [props])

  if (props.children) {
    return <Select label={label} {...props} />
  }

  return (
    <Box width="100%" mb={2} gap={1} {...layoutProps}>
      <FormLabel
        label={label}
        isRequired={isRequired}
        labelStyle={labelStyle}
        onLabelPress={onOpen}
      />
      <Select label={label} {...props} />
      <FormErrorMessage errorMessage={errorMessage} />
    </Box>
  )
}
