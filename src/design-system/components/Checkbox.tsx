import { forwardRef, useCallback, useMemo } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { Center } from './Center'
import { Icon } from './Icon'
import { Text } from './Text'
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

export const Checkbox = forwardRef<TouchableOpacity, CheckboxProps>(
  (
    {
      checkboxes,
      checkboxText,
      disabled,
      isChecked,
      isError,
      onChange,
      size = 'sm',
      value,
      ...props
    },
    ref
  ) => {
    const checkboxSize = useMemo(() => checkboxSizes[size], [size])

    const handleValueChange = useCallback(() => {
      return checkboxes ? onChange(value) : onChange(!value)
    }, [onChange, value, checkboxes])

    const iconColor = useMemo<ColorNames>(() => {
      if (disabled && value) {
        return 'fg.disabled_subtle'
      }

      return 'fg.white'
    }, [disabled, value])

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
      <TouchableOpacity
        {...{ disabled, hitSlop, ref }}
        onPress={handleValueChange}
        style={styles.mainContainer}
      >
        <View style={styles.row}>
          <Center
            bg={bgColor}
            borderColor={borderColor}
            borderRadius={4}
            borderWidth={1}
            height={checkboxSize.boxSize}
            mr={2}
            width={checkboxSize.boxSize}
            {...{ ...props }}
          >
            {isChecked ? (
              <Icon color={iconColor} name="check-line" size={checkboxSize.iconSize} />
            ) : null}
          </Center>
          <Text.SmRegular>{checkboxText}</Text.SmRegular>
        </View>
      </TouchableOpacity>
    )
  }
)

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  row: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
})
