import { isError } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { setToken } from '~services'
import { isSignedInAtom } from '~store/auth'
import { SignInFormValues } from '~types/authForms'
import { hapticImpact, wait } from '~utils'

const defaultValues: SignInFormValues = {
  // TODO: Reset this values when building production app
  email: 'test@example.com',
  password: '123456',
  confirm: false,
}

export const useSignInForm = () => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { t } = useTranslation()

  const setIsSignedIn = useSetAtom(isSignedInAtom)

  const {
    control,
    formState: { errors },
    setFocus,
    handleSubmit,
  } = useForm<SignInFormValues>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: SignInFormValues) => {
    try {
      setIsSubmitting(true)
      setError('')
      // Errors are handled on UI side
      // if you want to stop this function with error just throw new Error.
      // Remember to pass readable error message for user, because this error will be displayed for him

      // TODO: Add some backend call here, you can use react query for this
      await wait(500)

      if (data.email !== 'test@example.com' || data.password !== '123456') {
        throw new Error('Incorrect email or password')
      }
      await setToken('token_here')
      setIsSignedIn(true)
    } catch (e) {
      if (isError(e)) {
        setError(e.message)
      } else {
        setError(t('errors.something_went_wrong'))
      }
      hapticImpact()
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submit: handleSubmit(onSubmit),
    isSubmitting,
    setIsSubmitting,
    setFocus,
    control,
    errors,
    error,
  }
}
