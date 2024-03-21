import { useTheme } from '@baca/hooks'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Text } from './Text'
import { FormLabelProps } from './types'

export const FormLabel = ({ label, isRequired, labelStyle }: FormLabelProps) => {
  const { colors } = useTheme()

  const stylesForRequired =
    labelStyle &&
    Object.fromEntries(
      Object.entries(labelStyle).map(([key, value]) =>
        key === 'color' ? [key, 'red'] : [key, value]
      )
    )

  return (
    <View style={[styles.wrapper, { ...(label && styles.wrapperWithLabel) }]}>
      {label && (
        <Text.SmMedium style={[labelStyle, { color: labelStyle?.color || colors.text.secondary }]}>
          {label}
          {isRequired && (
            <Text.SmMedium style={[stylesForRequired, { color: colors.text.error.primary }]}>
              *
            </Text.SmMedium>
          )}
        </Text.SmMedium>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  wrapperWithLabel: {
    marginBottom: 8,
    marginTop: 4,
  },
})
