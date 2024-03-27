import { forwardRef, useCallback, useMemo } from 'react'
import { View, Pressable, StyleSheet } from 'react-native'

import { Box } from './Box'
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
    boxSize: 16,
    iconSize: 12,
  },
  md: {
    boxSize: 20,
    iconSize: 14,
  },
} as const

export const Checkbox = forwardRef<View, CheckboxProps>(
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

    const bgColor = useMemo<ColorNames>(() => {
      if (!value) {
        return 'fg.white'
      }
      if (disabled) {
        return 'bg.disabled_subtle'
      }

      return 'bg.brand.solid'
    }, [disabled, value])

    const borderColor = useMemo<ColorNames>(
      () =>
        disabled
          ? 'border.disabled'
          : isError
          ? 'border.error'
          : value
          ? 'bg.brand.solid'
          : 'border.primary',
      [value, isError, disabled]
    )

    return (
      <Pressable
        {...{ disabled, hitSlop, ref }}
        onPress={handleValueChange}
        style={styles.mainContainer}
      >
        <View style={styles.row}>
          <Box
            style={[
              styles.checkbox,
              {
                height: checkboxSize.boxSize,
                width: checkboxSize.boxSize,
              },
            ]}
            bg={bgColor}
            {...{ ...props, borderColor }}
          >
            {isChecked ? (
              <Icon color={iconColor} name="check-line" size={checkboxSize.iconSize} />
            ) : null}
          </Box>
          <Text.SmRegular>{checkboxText}</Text.SmRegular>
        </View>
      </Pressable>
    )
  }
)

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
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
