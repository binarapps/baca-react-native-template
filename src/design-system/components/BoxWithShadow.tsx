import { FC, PropsWithChildren, useMemo } from 'react'

import { Box, BoxProps } from './Box'
import { theme } from '../config'

const { errorShadow, focusShadow } = theme.light.shadows

type BoxWithShadowProps = {
  isInvalid?: boolean
  isFocused?: boolean
} & BoxProps

export const BoxWithShadow: FC<PropsWithChildren> = ({
  children,
  isInvalid,
  isFocused,
  style,
  ...rest
}: BoxWithShadowProps) => {
  const shadowProps = useMemo(
    () => (isInvalid ? errorShadow : isFocused ? focusShadow : {}),
    [isInvalid, isFocused]
  )

  return (
    <Box borderRadius={8} style={[style, shadowProps]} {...rest}>
      {children}
    </Box>
  )
}
