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

export const CheckboxButton = ({
  label,
  isDisabled,
  isSelected,
  isError,
  onChange,
  size = 'md',
  pb,
  ...rest
}: CheckboxProps) => {
  const checkboxSize = useMemo(() => checkboxSizes[size], [size])

  const handleValueChange = useCallback(() => {
    return onChange(!isSelected)
  }, [onChange, isSelected])

  const iconColor = useMemo<ColorNames>(() => {
    if (isDisabled) {
      return 'fg.disabled_subtle'
    }

    return 'fg.white'
  }, [isDisabled])

  const bgColor = useMemo<ColorNames | undefined>(() => {
    if (isDisabled) {
      return 'bg.disabled_subtle'
    }

    if (!isSelected) {
      return undefined
    }

    return 'bg.brand.solid'
  }, [isDisabled, isSelected])

  const borderColor = useMemo<ColorNames | undefined>(() => {
    if (isDisabled) {
      return 'border.disabled'
    }
    if (isError) {
      return 'border.error'
    }

    if (isSelected) {
      return 'bg.brand.solid'
    }

    return 'border.primary'
  }, [isSelected, isError, isDisabled])

  return (
    <Box pb={pb}>
      <Touchable
        {...{ disabled: isDisabled, hitSlop }}
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
          {isSelected ? (
            <Icon color={iconColor} name="check-line" size={checkboxSize.iconSize} />
          ) : null}
        </Center>
        <Text.SmRegular>{label}</Text.SmRegular>
      </Touchable>
    </Box>
  )
}
