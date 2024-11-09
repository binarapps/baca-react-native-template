// AlertBox.tsx
import { FC } from 'react'

import { Box } from '@/design-system/components/Box'
import { Icon } from '@/design-system/components/Icon'
import { Row } from '@/design-system/components/Row'
import { Text } from '@/design-system/components/Text'
import { IconNames } from '@/types'

type AlertStatus = 'info' | 'warning' | 'success' | 'error'

interface AlertProps {
  status?: AlertStatus
  title?: string
  description?: string
  children?: React.ReactNode
}

const statusToIcon: Record<AlertStatus, IconNames> = {
  info: 'information-line',
  warning: 'alert-fill',
  success: 'checkbox-circle-fill',
  error: 'error-warning-fill',
}

const statusToColor = {
  info: 'utility.brand',
  warning: 'utility.warning',
  success: 'utility.success',
  error: 'utility.error',
} as const

export const AlertBox: FC<AlertProps> = ({ status = 'info', title, description, children }) => {
  return (
    <Box
      bg={`${statusToColor[status]}.50`}
      borderRadius={8}
      borderWidth={1}
      borderColor={`${statusToColor[status]}.100`}
      p={4}
    >
      <Row gap={3} alignItems="flex-start">
        <Icon name={statusToIcon[status]} size={20} color={`${statusToColor[status]}.700`} />
        <Box flex={1}>
          {title && (
            <Text.MdSemibold color={`${statusToColor[status]}.700`} mb={description ? 1 : 0}>
              {title}
            </Text.MdSemibold>
          )}
          {description && (
            <Text.SmRegular color={`${statusToColor[status]}.500`}>{description}</Text.SmRegular>
          )}
          {children}
        </Box>
      </Row>
    </Box>
  )
}
