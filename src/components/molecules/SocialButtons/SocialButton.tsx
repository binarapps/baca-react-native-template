import { appleIconDark, appleIcon, facebookIcon, googleIcon } from '@baca/constants'
import { useColorScheme } from '@baca/contexts'
import { Button, ButtonProps } from '@baca/design-system'
import i18n from '@baca/i18n'
import { FC } from 'react'
import { Image, ImageSourcePropType } from 'react-native'

type SocialMediaType = 'apple' | 'facebook' | 'google'

const socialButtonVariants: {
  [key in SocialMediaType]: {
    source: { light: ImageSourcePropType; dark?: ImageSourcePropType }
    text: () => string
  }
} = {
  apple: {
    source: { light: appleIcon, dark: appleIconDark },
    text: () => i18n.t('sign_in_screen.sign_in_by_apple'),
  },
  facebook: {
    source: { light: facebookIcon },
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

  return (
    <Button
      alignItems="center"
      justifyContent="center"
      leftElement={<Image source={source[colorScheme] || source['light']} width={24} height={24} />}
      variant="SecondaryGray"
      maxW={360}
      w="full"
      {...rest}
    >
      {text()}
    </Button>
  )
}
