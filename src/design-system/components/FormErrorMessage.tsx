import { useTheme } from '@baca/hooks'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

export const FormErrorMessage = ({ errorMessage }: { errorMessage?: string }) => {
  const { colors } = useTheme()
  return (
    errorMessage && (
      <Text style={[styles.text, { color: colors.text.error.primary }]}>{errorMessage}</Text>
    )
  )
}

const styles = StyleSheet.create({
  text: {
    marginTop: 8,
  },
})
