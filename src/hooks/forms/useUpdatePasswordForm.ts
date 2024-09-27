import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { useAuthControllerUpdate } from '@/api/query/auth/auth'
import { AuthUpdateDto } from '@/api/types'
import { handleFormError, hapticImpact, showSuccessToast } from '@/utils'

const defaultValues: AuthUpdateDto = {
  oldPassword: '',
  password: '',
}

export const useUpdatePasswordForm = () => {
  const { t } = useTranslation()
  const { mutate: updatePasswordMutation, isLoading } = useAuthControllerUpdate()

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setFocus,
    setError: setFormError,
  } = useForm<AuthUpdateDto>({
    mode: 'onChange',
    defaultValues,
  })

  const onSubmit = (data: AuthUpdateDto) => {
    updatePasswordMutation(
      { data },
      {
        onSuccess: () => {
          showSuccessToast({ description: t('toast.success.profile_updated') })
          reset(defaultValues)
        },
        onError: (e) => {
          handleFormError<keyof AuthUpdateDto>(
            e as unknown as keyof AuthUpdateDto,
            ({ field, description }) => {
              setFormError(field, { message: description })
            }
          )
          hapticImpact()
        },
      }
    )
  }

  return {
    control,
    errors,
    isSubmitting: isLoading,
    setFocus,
    submit: handleSubmit(onSubmit),
  }
}
