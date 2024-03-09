import { isSignedInAtom } from '@baca/store/auth'
import { SignUpFormValues } from '@baca/types/authForms'
import { hapticImpact, wait } from '@baca/utils'
import { isError } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const defaultValues: SignUpFormValues = {
  user: '',
  email: '',
  password: '',
  agree: false,
  newsletter: false,
}

export const useSignUpForm = () => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { t } = useTranslation()

  const setIsSignedIn = useSetAtom(isSignedInAtom)

  const {
    control,
    formState: { errors },
    setFocus,
    handleSubmit,
  } = useForm<SignUpFormValues>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      setIsSubmitting(true)
      setError('')
      await wait(500)
      // TODO: Add some backend call here, you can use react query for this
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
    control,
    setFocus,
    errors,
    error,
  }
}
