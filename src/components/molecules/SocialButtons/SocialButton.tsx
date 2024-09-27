import { Image, ImageStyle, ImageSource } from 'expo-image'
import { FC, useCallback } from 'react'

import { googleIcon } from '@/constants'
import { useColorScheme } from '@/contexts'
import { Button, ButtonProps, Icon } from '@/design-system'
import i18n from '@/i18n'

type SocialMediaType = 'apple' | 'facebook' | 'google'

const socialButtonVariants: {
  [key in SocialMediaType]: {
    source?: { light: ImageSource; dark?: ImageSource }
    text: () => string
  }
} = {
  apple: {
    text: () => i18n.t('sign_in_screen.sign_in_by_apple'),
  },
  facebook: {
    text: () => i18n.t('sign_in_screen.sign_in_by_facebook'),
  },
  google: {
    source: { light: googleIcon },
    text: () => i18n.t('sign_in_screen.sign_in_by_google'),
  },
}

type SocialButtonProps = {
  onPress: () => void
  type: SocialMediaType
} & ButtonProps

export const SocialButton: FC<SocialButtonProps> = ({ type = 'google', ...rest }) => {
  const { colorScheme } = useColorScheme()

  const { source, text } = socialButtonVariants[type]

  const generateLeftElement = useCallback(
    (type: SocialMediaType) => {
      switch (type) {
        case 'apple':
          return (
            <Icon
              color={colorScheme === 'light' ? 'Base.black' : 'Base.white'}
              name="apple-fill"
              size={24}
            />
          )
        case 'facebook':
          // @ts-expect-error icon type accepts only ColorNames in order to make suggestion in code, but strings works as well
          return <Icon color="#1877F2" name="facebook-circle-fill" size={24} />
        case 'google':
          return (
            <Image
              source={source?.[colorScheme] || source?.['light']}
              style={{ width: 24, height: 24 } as ImageStyle}
            />
          )
      }
    },
    [colorScheme, source]
  )

  return (
    <Button
      alignItems="center"
      justifyContent="center"
      leftElement={generateLeftElement(type)}
      variant="SecondaryGray"
      maxW={360}
      w="full"
      {...rest}
    >
      {text()}
    </Button>
  )
}

SocialButton.displayName = 'SocialButton'
