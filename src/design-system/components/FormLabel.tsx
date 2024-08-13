import { useTheme } from '@baca/hooks'
import React from 'react'
import { StyleSheet } from 'react-native'

import { Text } from './Text'
import { Touchable } from './Touchables'
import { FormLabelProps } from './types'

export const FormLabel = ({
  label,
  isRequired,
  labelStyle,
  testID,
  onLabelPress,
}: FormLabelProps) => {
  const { colors } = useTheme()

  const stylesForRequired =
    labelStyle &&
    Object.fromEntries(
      Object.entries(labelStyle).map(([key, value]) =>
        key === 'color' ? [key, 'red'] : [key, value]
      )
    )

  if (!label) {
    return null
  }

  return (
    <Touchable style={[styles.wrapper]} testID={testID} onPress={onLabelPress}>
      <Text.SmMedium style={[labelStyle, { color: labelStyle?.color || colors.text.secondary }]}>
        {label}
        {isRequired && (
          <Text.SmMedium style={[stylesForRequired, { color: colors.text.error.primary }]}>
            *
          </Text.SmMedium>
        )}
      </Text.SmMedium>
    </Touchable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
})
