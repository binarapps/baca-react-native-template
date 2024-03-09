import { useAuthControllerRegister } from '@baca/api/query/auth/auth'
import { AuthRegisterLoginDto } from '@baca/api/types'
import { hapticImpact } from '@baca/utils'
import { isError } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const defaultValues: AuthRegisterLoginDto = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  // FIXME: hardcoded locale
  locale: 'en-US',
  termsAccepted: false,
  privacyPolicyAccepted: false,
}

export const useSignUpForm = () => {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { mutate } = useAuthControllerRegister()

  const { t } = useTranslation()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setFocus,
  } = useForm<AuthRegisterLoginDto>({
    mode: 'onTouched',
    defaultValues,
  })

  const onSubmit = async (data: AuthRegisterLoginDto) => {
    try {
      setIsSubmitting(true)
      setError('')

      mutate({ data })
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
    control,
    error,
    errors,
    isRegisterLoading: isSubmitting,
    setFocus,
    setIsSubmitting,
    register: handleSubmit(onSubmit),
  }
}
