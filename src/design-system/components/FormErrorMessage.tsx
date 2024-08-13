import { useTheme } from '@baca/hooks'
import React from 'react'
import { Text } from 'react-native'

export const FormErrorMessage = ({
  errorMessage,
  testId,
}: {
  errorMessage?: string
  testId?: string
}) => {
  const { colors } = useTheme()
  return (
    errorMessage && (
      <Text testID={testId} style={{ color: colors.text.error.primary }}>
        {errorMessage}
      </Text>
    )
  )
}
