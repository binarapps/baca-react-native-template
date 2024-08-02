import { useCallback, useMemo } from 'react'

import { Box } from './Box'
import { Center } from './Center'
import { Icon } from './Icon'
import { Text } from './Text'
import { Touchable } from './Touchables'
import { CheckboxProps } from './types'

const hitSlop = {
  top: 5,
  left: 5,
  bottom: 5,
}

const checkboxSizes = {
  sm: {
    boxSize: 4,
    iconSize: 12,
  },
  md: {
    boxSize: 5,
    iconSize: 14,
  },
} as const

export const Checkbox = ({
  checkboxLablel,
  disabled,
  isChecked,
  isError,
  onChange,
  size = 'md',
  pb,
  ...rest
}: CheckboxProps) => {
  const checkboxSize = useMemo(() => checkboxSizes[size], [size])

  const handleValueChange = useCallback(() => {
    return onChange(!isChecked)
  }, [onChange, isChecked])

  const iconColor = useMemo<ColorNames>(() => {
    if (disabled) {
      return 'fg.disabled_subtle'
    }

    return 'fg.white'
  }, [disabled])

  const bgColor = useMemo<ColorNames | undefined>(() => {
    if (disabled) {
      return 'bg.disabled_subtle'
    }

    if (!isChecked) {
      return undefined
    }

    return 'bg.brand.solid'
  }, [disabled, isChecked])

  const borderColor = useMemo<ColorNames | undefined>(() => {
    if (disabled) {
      return 'border.disabled'
    }
    if (isError) {
      return 'border.error'
    }

    if (isChecked) {
      return 'bg.brand.solid'
    }

    return 'border.primary'
  }, [isChecked, isError, disabled])

  return (
    <Box pb={pb}>
      <Touchable
        {...{ disabled, hitSlop }}
        activeOpacity={0.5}
        onPress={handleValueChange}
        alignItems="center"
        flexDirection="row"
        {...rest}
      >
        <Center
          bg={bgColor}
          borderColor={borderColor}
          borderRadius={4}
          borderWidth={1}
          height={checkboxSize.boxSize}
          mr={2}
          width={checkboxSize.boxSize}
        >
          {isChecked ? (
            <Icon color={iconColor} name="check-line" size={checkboxSize.iconSize} />
          ) : null}
        </Center>
        <Text.SmRegular>{checkboxLablel}</Text.SmRegular>
      </Touchable>
    </Box>
  )
}
