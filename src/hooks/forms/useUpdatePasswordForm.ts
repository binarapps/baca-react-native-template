import { useAuthControllerUpdate } from '@baca/api/query/auth/auth'
import { AuthUpdateDto } from '@baca/api/types'
import { handleFormError, hapticImpact, showSuccessToast } from '@baca/utils'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useUpdatePasswordForm = () => {
  const { t } = useTranslation()
  const { mutate: updateUserMutation, isLoading } = useAuthControllerUpdate()

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError: setFormError,
    setFocus,
  } = useForm<AuthUpdateDto>({
    mode: 'onTouched',
  })

  const onSubmit = (data: AuthUpdateDto) => {
    updateUserMutation(
      { data },
      {
        onSuccess: () => {
          showSuccessToast({ description: t('toast.success.password_updated') })
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
