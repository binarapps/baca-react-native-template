import { useMemo } from 'react'

import type { FieldSliderProps } from './types'

import { FormErrorMessage, FormLabel, Box, Slider } from '@/design-system/components'
import { getLayoutProps } from '@/design-system/utils/getLayoutProps'

export const FieldSlider = ({
  errorMessage,
  isInvalid,
  isRequired,
  label,
  labelStyle,
  testID,
  onChangeValue,
  value,
  ...props
}: FieldSliderProps) => {
  const { layoutProps, restProps: sliderProps } = useMemo(() => getLayoutProps(props), [props])

  return (
    <Box width="100%" gap={1} mb={2} {...layoutProps}>
      <FormLabel
        {...{ isRequired, label, labelStyle }}
        label={`${label}: ${value ? Math.round(value * 10) / 10 : 0}`}
        testID={testID + ':label'}
      />

      <Slider
        {...sliderProps}
        value={value}
        onChangeValue={onChangeValue}
        testID={testID + ':input'}
      />
      <FormErrorMessage {...{ errorMessage }} testId={testID + ':error_message'} />
    </Box>
  )
}
