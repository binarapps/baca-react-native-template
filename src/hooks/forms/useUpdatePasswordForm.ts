import { useAuthControllerUpdate } from '@baca/api/query/auth/auth'
import { AuthUpdateDto } from '@baca/api/types'
import { handleFormError, hapticImpact, showSuccessToast } from '@baca/utils'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
    setError: setFormError,
  } = useForm<AuthUpdateDto>({
    mode: 'onTouched',
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
    submit: handleSubmit(onSubmit),
  }
}
