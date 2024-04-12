import { Box } from '@baca/design-system'
import { Dispatch, FC, SetStateAction } from 'react'

import { AppleButton } from './AppleButton'
import { GoogleButton } from './GoogleButton'

type SocialButtonsProps = {
  isDisabled: boolean
  setIsDisabled: Dispatch<SetStateAction<boolean>>
}

export const SocialButtons: FC<SocialButtonsProps> = ({ isDisabled, setIsDisabled }) => {
  return (
    <Box gap={3} w="full">
      <GoogleButton {...{ isDisabled, setIsDisabled }} />
      <AppleButton {...{ isDisabled, setIsDisabled }} />
    </Box>
  )
}
