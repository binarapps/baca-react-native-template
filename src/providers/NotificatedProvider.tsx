import { Box, Button, Text } from '@baca/design-system'
import { useCallback } from 'react'
import {
  createNotifications,
  FadeInFadeOut,
  useNotificationController,
} from 'react-native-notificated'
import { NotificationsType } from 'react-native-notificated/lib/typescript/types/config'

const notificationVariants: {
  [key in NotificationsType]: { bg: ColorNames; textColor: ColorNames }
} = {
  default: { bg: 'Blue.100', textColor: 'Blue.800' },
  error: { bg: 'Rosé.100', textColor: 'Rosé.800' },
  success: { bg: 'Green light.100', textColor: 'Green light.800' },
  warning: { bg: 'Yellow.100', textColor: 'Yellow.800' },
}

const createNotificationVariant =
  (status: NotificationsType) =>
  ({ title, description }: { title: string; description: string }): JSX.Element => {
    const { remove } = useNotificationController()
    const removeNotification = useCallback(() => remove(), [remove])

    const { bg, textColor } = notificationVariants[status]

    return (
      <Box bg={bg} p={3} borderRadius={8} w="100%">
        <Button.LinkGray
          onPress={removeNotification}
          position="absolute"
          right={4}
          rightIconName="close-line"
          size="lg"
          top={4}
          zIndex={4}
        />
        <Text.SmBold color={textColor} mb={2}>
          {title}
        </Text.SmBold>
        <Text.SmRegular color={textColor}>{description}</Text.SmRegular>
      </Box>
    )
  }

export const { NotificationsProvider } = createNotifications({
  defaultStylesSettings: {
    globalConfig: {
      defaultIconType: 'no-icon',
      multiline: 8,
    },
  },
  duration: 5000,
  gestureConfig: {
    direction: 'full',
    x: { activationDistances: 100, activationVelocities: 5 },
    y: { activationDistances: 100, activationVelocities: 5 },
  },
  isNotch: true,
  animationConfig: FadeInFadeOut,
  notificationPosition: 'top',
  variants: {
    error: {
      component: createNotificationVariant('error'),
    },
    info: {
      component: createNotificationVariant('default'),
    },
    success: {
      component: createNotificationVariant('success'),
    },
    warning: {
      component: createNotificationVariant('warning'),
    },
  },
})
