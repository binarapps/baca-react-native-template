import { googleIcon } from '@baca/constants'
import { Image } from 'react-native'

import { Button } from '../Button'
import { Text } from '../Text'

type GoogleButtonProps = {
  onPress: () => void
  isDisabled?: boolean
}

export const GoogleButton = ({ onPress, isDisabled }: GoogleButtonProps) => {
  return (
    <Button mb={6} onPress={onPress} disabled={isDisabled}>
      <Image source={googleIcon} alt="google-icon" />
      <Text pl={3}>Log in with Google</Text>
    </Button>
  )
}
